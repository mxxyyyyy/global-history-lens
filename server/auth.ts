import type { Express, Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

type Provider = "email" | "github";

interface StoredUser {
  id: string;
  email: string;
  name: string;
  passwordHash?: string;
  providers: Partial<Record<Provider, string>>;
  createdAt: string;
  updatedAt: string;
}

interface AuthStore {
  users: StoredUser[];
}

interface SessionPayload {
  sub: string;
  exp: number;
}

const SESSION_COOKIE = "ghl_session";
const GITHUB_STATE_COOKIE = "ghl_github_state";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;

const dataFile = process.env.AUTH_DATA_FILE
  ? path.resolve(process.env.AUTH_DATA_FILE)
  : path.resolve(process.cwd(), ".data", "auth-users.json");

const authSecret =
  process.env.AUTH_SECRET ||
  process.env.SESSION_SECRET ||
  "development-only-change-me";

if (process.env.NODE_ENV === "production" && authSecret === "development-only-change-me") {
  console.warn("AUTH_SECRET is not set. Set a long random secret in Render Environment.");
}

function normalizeEmail(email: unknown) {
  return typeof email === "string" ? email.trim().toLowerCase() : "";
}

function normalizeName(name: unknown, email: string) {
  if (typeof name === "string" && name.trim()) {
    return name.trim().slice(0, 80);
  }
  return email.split("@")[0] || "User";
}

function publicUser(user: StoredUser) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    providers: Object.keys(user.providers),
    createdAt: user.createdAt,
  };
}

async function readStore(): Promise<AuthStore> {
  try {
    const content = await fs.readFile(dataFile, "utf8");
    const parsed = JSON.parse(content) as AuthStore;
    return { users: Array.isArray(parsed.users) ? parsed.users : [] };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return { users: [] };
    }
    throw error;
  }
}

async function writeStore(store: AuthStore) {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

async function findUserById(id: string) {
  const store = await readStore();
  return store.users.find(user => user.id === id) || null;
}

function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("base64url");
  const hash = crypto.scryptSync(password, salt, 64).toString("base64url");
  return `scrypt$${salt}$${hash}`;
}

function verifyPassword(password: string, storedHash?: string) {
  if (!storedHash) return false;
  const [algorithm, salt, hash] = storedHash.split("$");
  if (algorithm !== "scrypt" || !salt || !hash) return false;

  const expected = Buffer.from(hash, "base64url");
  const actual = crypto.scryptSync(password, salt, expected.length);
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

function sign(value: string) {
  return crypto.createHmac("sha256", authSecret).update(value).digest("base64url");
}

function createSessionToken(userId: string) {
  const payload: SessionPayload = {
    sub: userId,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

function readSessionToken(token?: string): SessionPayload | null {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature || sign(body) !== signature) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
    if (!payload.sub || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

function parseCookies(req: Request) {
  const header = req.headers.cookie;
  if (!header) return new Map<string, string>();

  return new Map(
    header.split(";").map(cookie => {
      const [name, ...value] = cookie.trim().split("=");
      return [name, decodeURIComponent(value.join("="))];
    })
  );
}

function cookie(name: string, value: string, maxAgeSeconds: number) {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${maxAgeSeconds}`,
  ];

  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }

  return parts.join("; ");
}

async function getCurrentUser(req: Request) {
  const token = parseCookies(req).get(SESSION_COOKIE);
  const payload = readSessionToken(token);
  return payload ? findUserById(payload.sub) : null;
}

function setSessionCookie(res: Response, userId: string) {
  res.setHeader("Set-Cookie", cookie(SESSION_COOKIE, createSessionToken(userId), SESSION_MAX_AGE_SECONDS));
}

function clearSessionCookie(res: Response) {
  res.setHeader("Set-Cookie", cookie(SESSION_COOKIE, "", 0));
}

function getPublicBaseUrl(req: Request) {
  if (process.env.PUBLIC_APP_URL && ABSOLUTE_URL_PATTERN.test(process.env.PUBLIC_APP_URL)) {
    return process.env.PUBLIC_APP_URL.replace(/\/$/, "");
  }

  const proto = req.headers["x-forwarded-proto"]?.toString().split(",")[0] || req.protocol;
  return `${proto}://${req.get("host")}`;
}

function redirectWithError(res: Response, message: string) {
  res.redirect(`/login?error=${encodeURIComponent(message)}`);
}

async function upsertGithubUser(profile: { id: string; email: string; name: string }) {
  const store = await readStore();
  const email = normalizeEmail(profile.email);
  const now = new Date().toISOString();

  let user = store.users.find(item => item.providers.github === profile.id);
  if (!user) {
    user = store.users.find(item => item.email === email);
  }

  if (user) {
    user.email = email || user.email;
    user.name = profile.name || user.name;
    user.providers.github = profile.id;
    user.updatedAt = now;
  } else {
    user = {
      id: crypto.randomUUID(),
      email,
      name: profile.name,
      providers: { github: profile.id },
      createdAt: now,
      updatedAt: now,
    };
    store.users.push(user);
  }

  await writeStore(store);
  return user;
}

export function registerAuthRoutes(app: Express) {
  app.use("/api/auth", (req, res, next) => {
    if (req.method === "GET") return next();
    expressJson(req, res, next);
  });

  app.get("/api/auth/me", async (req, res, next) => {
    try {
      const user = await getCurrentUser(req);
      res.json({ user: user ? publicUser(user) : null });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/auth/register", async (req, res, next) => {
    try {
      const email = normalizeEmail(req.body?.email);
      const password = typeof req.body?.password === "string" ? req.body.password : "";
      const name = normalizeName(req.body?.name, email);

      if (!email || !email.includes("@")) {
        res.status(400).json({ message: "请输入有效邮箱。" });
        return;
      }

      if (password.length < 8) {
        res.status(400).json({ message: "密码至少需要 8 位。" });
        return;
      }

      const store = await readStore();
      if (store.users.some(user => user.email === email)) {
        res.status(409).json({ message: "该邮箱已经注册。" });
        return;
      }

      const now = new Date().toISOString();
      const user: StoredUser = {
        id: crypto.randomUUID(),
        email,
        name,
        passwordHash: hashPassword(password),
        providers: { email },
        createdAt: now,
        updatedAt: now,
      };

      store.users.push(user);
      await writeStore(store);
      setSessionCookie(res, user.id);
      res.status(201).json({ user: publicUser(user) });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/auth/login", async (req, res, next) => {
    try {
      const email = normalizeEmail(req.body?.email);
      const password = typeof req.body?.password === "string" ? req.body.password : "";
      const store = await readStore();
      const user = store.users.find(item => item.email === email);

      if (!user || !verifyPassword(password, user.passwordHash)) {
        res.status(401).json({ message: "邮箱或密码不正确。" });
        return;
      }

      setSessionCookie(res, user.id);
      res.json({ user: publicUser(user) });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/auth/logout", (_req, res) => {
    clearSessionCookie(res);
    res.status(204).end();
  });

  app.get("/api/auth/github/start", (req, res) => {
    const clientId = process.env.GITHUB_CLIENT_ID;
    if (!clientId || !process.env.GITHUB_CLIENT_SECRET) {
      redirectWithError(res, "GitHub 登录尚未配置。");
      return;
    }

    const state = crypto.randomBytes(24).toString("base64url");
    const redirectUri = `${getPublicBaseUrl(req)}/api/auth/github/callback`;
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: "read:user user:email",
      state,
    });

    res.setHeader("Set-Cookie", cookie(GITHUB_STATE_COOKIE, state, 60 * 10));
    res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
  });

  app.get("/api/auth/github/callback", async (req, res, next) => {
    try {
      const code = typeof req.query.code === "string" ? req.query.code : "";
      const state = typeof req.query.state === "string" ? req.query.state : "";
      const savedState = parseCookies(req).get(GITHUB_STATE_COOKIE);

      if (!code || !state || !savedState || state !== savedState) {
        redirectWithError(res, "GitHub 登录校验失败。");
        return;
      }

      const redirectUri = `${getPublicBaseUrl(req)}/api/auth/github/callback`;
      const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: redirectUri,
        }),
      });
      const tokenData = await tokenResponse.json() as { access_token?: string; error_description?: string };

      if (!tokenData.access_token) {
        redirectWithError(res, tokenData.error_description || "GitHub 授权失败。");
        return;
      }

      const githubUser = await githubFetch<{ id: number; login: string; name?: string; email?: string }>(
        "https://api.github.com/user",
        tokenData.access_token
      );
      const emails = await githubFetch<Array<{ email: string; primary: boolean; verified: boolean }>>(
        "https://api.github.com/user/emails",
        tokenData.access_token
      );
      const primaryEmail = emails.find(item => item.primary && item.verified)?.email || githubUser.email;

      if (!primaryEmail) {
        redirectWithError(res, "GitHub 账号没有可用邮箱。");
        return;
      }

      const user = await upsertGithubUser({
        id: String(githubUser.id),
        email: primaryEmail,
        name: githubUser.name || githubUser.login,
      });

      res.setHeader("Set-Cookie", [
        cookie(SESSION_COOKIE, createSessionToken(user.id), SESSION_MAX_AGE_SECONDS),
        cookie(GITHUB_STATE_COOKIE, "", 0),
      ]);
      res.redirect("/login?connected=github");
    } catch (error) {
      next(error);
    }
  });
}

async function githubFetch<T>(url: string, token: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function expressJson(req: Request, res: Response, next: (error?: unknown) => void) {
  let body = "";
  req.setEncoding("utf8");
  req.on("data", chunk => {
    body += chunk;
    if (body.length > 1024 * 1024) {
      res.status(413).json({ message: "请求内容过大。" });
      req.destroy();
    }
  });
  req.on("end", () => {
    try {
      req.body = body ? JSON.parse(body) : {};
      next();
    } catch {
      res.status(400).json({ message: "请求 JSON 格式不正确。" });
    }
  });
  req.on("error", next);
}
