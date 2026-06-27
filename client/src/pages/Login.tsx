import { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { Github, LogIn, LogOut, Mail, ShieldCheck, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

type Mode = "login" | "register";

export default function Login() {
  const { user, loading, login, register, logout } = useAuth();
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const queryMessage = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("connected") === "github") return t("GitHub 登录成功。", "GitHub sign-in succeeded.");
    return params.get("error") || "";
  }, [t]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register({ email, password, name });
      }
      navigate("/");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : t("账号请求失败。", "Account request failed."));
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="container py-24">
        <div className="border-2 border-border bg-card p-8 shadow-brutal font-mono">{t("账号加载中...", "ACCOUNT LOADING...")}</div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="container py-20">
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
          <div>
            <div className="inline-flex items-center gap-2 border-2 border-primary bg-background px-4 py-2 shadow-brutal-sm font-mono text-sm font-bold uppercase">
              <ShieldCheck className="h-4 w-4" />
              {t("账号已验证", "Account Verified")}
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tighter">{t("账号中心", "Account Center")}</h1>
            <p className="mt-4 max-w-xl text-muted-foreground font-typewriter leading-relaxed">
              {t("你已登录 Global History Lens，可以继续使用档案库、AI 对话和历史交互功能。", "You are signed in to Global History Lens and can continue using the archive, AI dialogue, and story map features.")}
            </p>
          </div>

          <div className="border-2 border-border bg-card p-6 md:p-8 shadow-brutal">
            <div className="flex items-start justify-between gap-6 border-b-2 border-border pb-6">
              <div>
                <p className="font-mono text-xs uppercase text-muted-foreground">{t("当前用户", "Current User")}</p>
                <h2 className="mt-2 text-2xl font-bold">{user.name}</h2>
                <p className="mt-1 font-typewriter text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center border-2 border-border bg-primary text-primary-foreground font-mono text-xl font-bold">
                {user.name.slice(0, 1).toUpperCase()}
              </div>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 font-typewriter text-sm">
              <div className="border border-border bg-background p-4">
                <dt className="text-muted-foreground">{t("登录方式", "Sign-in Method")}</dt>
                <dd className="mt-2 font-mono font-bold uppercase">{user.providers.join(" / ") || "email"}</dd>
              </div>
              <div className="border border-border bg-background p-4">
                <dt className="text-muted-foreground">{t("注册时间", "Created")}</dt>
                <dd className="mt-2 font-mono font-bold">{new Date(user.createdAt).toLocaleDateString()}</dd>
              </div>
            </dl>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/archive" className="flex-1">
                <Button className="w-full rounded-none border-2 border-primary shadow-brutal-sm">{t("进入档案库", "Enter Archive")}</Button>
              </Link>
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-none border-2 border-border shadow-brutal-sm"
                onClick={() => logout()}
              >
                <LogOut className="h-4 w-4" />
                {t("退出登录", "Sign Out")}
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="container py-16 md:py-24">
      <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-stretch">
        <div className="border-2 border-border bg-primary text-primary-foreground p-8 md:p-12 shadow-brutal flex flex-col justify-between min-h-[520px]">
          <div>
            <div className="inline-flex items-center gap-2 border-2 border-primary-foreground px-4 py-2 font-mono text-sm font-bold uppercase">
              <ShieldCheck className="h-4 w-4" />
              Global History Lens
            </div>
            <h1 className="mt-8 text-4xl md:text-6xl font-bold tracking-tighter leading-none">
              {t("建立你的历史研究账号", "Create Your Historical Research Account")}
            </h1>
            <p className="mt-6 max-w-xl font-typewriter text-primary-foreground/80 leading-relaxed">
              {t("登录后可为后续的收藏、对话历史同步、个人研究档案和跨设备访问保留账号基础。", "Sign in to prepare for future collections, dialogue history sync, personal research files, and cross-device access.")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10">
            {["EMAIL", "GITHUB", "SESSION"].map(item => (
              <div key={item} className="border border-primary-foreground/40 p-4 font-mono text-xs uppercase">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="border-2 border-border bg-card p-6 md:p-8 shadow-brutal">
          <div className="grid grid-cols-2 border-2 border-border mb-6">
            <button
              type="button"
              className={`h-12 font-mono text-sm font-bold ${mode === "login" ? "bg-primary text-primary-foreground" : "bg-background"}`}
              onClick={() => setMode("login")}
            >
              {t("登录", "Sign In")}
            </button>
            <button
              type="button"
              className={`h-12 font-mono text-sm font-bold border-l-2 border-border ${mode === "register" ? "bg-primary text-primary-foreground" : "bg-background"}`}
              onClick={() => setMode("register")}
            >
              {t("注册", "Register")}
            </button>
          </div>

          {(error || queryMessage) && (
            <div className="mb-5 border-2 border-border bg-secondary p-3 font-typewriter text-sm">
              {error || queryMessage}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {mode === "register" && (
              <div className="space-y-2">
                <Label htmlFor="name" className="font-mono uppercase">{t("名称", "Name")}</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={event => setName(event.target.value)}
                  className="h-12 rounded-none border-2 border-border bg-background font-typewriter"
                  placeholder={t("你的名字", "Your name")}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="font-mono uppercase">{t("邮箱", "Email")}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                className="h-12 rounded-none border-2 border-border bg-background font-typewriter"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-mono uppercase">{t("密码", "Password")}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                className="h-12 rounded-none border-2 border-border bg-background font-typewriter"
                placeholder={t("至少 8 位", "At least 8 characters")}
                minLength={8}
                required
              />
            </div>

            <Button
              type="submit"
              className="h-12 w-full rounded-none border-2 border-primary bg-primary text-primary-foreground shadow-brutal-sm"
              disabled={submitting}
            >
              {mode === "login" ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
              {submitting ? t("处理中...", "Processing...") : mode === "login" ? t("邮箱登录", "Sign in with Email") : t("创建账号", "Create Account")}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-xs uppercase text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <a href="/api/auth/github/start" className="block">
            <Button
              type="button"
              variant="outline"
              className="h-12 w-full rounded-none border-2 border-border bg-background shadow-brutal-sm"
            >
              <Github className="h-4 w-4" />
              {t("使用 GitHub 登录", "Sign in with GitHub")}
            </Button>
          </a>

          <p className="mt-6 flex items-center gap-2 font-typewriter text-xs text-muted-foreground">
            <Mail className="h-3.5 w-3.5" />
            {t("邮箱注册暂不发送验证邮件，后续可接入邮件服务。", "Email registration does not send verification mail yet. A mail service can be connected later.")}
          </p>
        </div>
      </section>
    </div>
  );
}
