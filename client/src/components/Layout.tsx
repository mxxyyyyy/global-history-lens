import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  BookOpen,
  Glasses,
  Globe,
  Info,
  LogIn,
  LogOut,
  Mail,
  Map as MapIcon,
  Menu,
  Search,
  UserRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const CONTACT_EMAIL = "mxxyyyyy@gmail.com";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, loading, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();

  const navItems = [
    { name: t("首页", "Home"), path: "/", icon: Globe },
    { name: t("AI 对话", "AI Dialogue"), path: "/dialogue", icon: Glasses },
    { name: t("档案库", "Archive"), path: "/archive", icon: BookOpen },
    { name: t("历史交互", "Story Map"), path: "/travel", icon: MapIcon },
    { name: t("对话历史", "History"), path: "/dialogue-history", icon: BookOpen },
    { name: t("关于", "About"), path: "/about", icon: Info },
  ];

  const isActive = (path: string) => location === path || (path !== "/" && location.startsWith(`${path}/`));

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between gap-3">
          <Link href="/" className="flex shrink-0 items-center gap-2 group">
            <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center font-mono font-bold text-xl border-2 border-transparent group-hover:border-primary group-hover:bg-background group-hover:text-primary transition-all duration-300">
              G
            </div>
            <span className="font-mono font-bold text-lg tracking-tighter uppercase hidden sm:inline-block">
              Global History Lens
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 shrink-0">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 whitespace-nowrap px-2 lg:px-3 py-2 font-mono text-xs lg:text-sm font-medium transition-colors hover:bg-secondary border-2 border-transparent hover:border-border",
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:border-primary"
                    : "text-foreground/80",
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="border-2 border-border rounded-none hover:bg-secondary shadow-brutal-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">{t("搜索档案", "Search archives")}</span>
            </Button>

            <button
              type="button"
              onClick={toggleLanguage}
              className="flex h-9 shrink-0 items-center gap-1 border-2 border-border bg-background px-3 font-mono text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-colors shadow-brutal-sm"
              aria-label={t("切换到英文", "Switch language")}
              title={t("切换到英文", "Switch language")}
            >
              <Globe className="h-4 w-4" />
              <span>{language === "en" ? "中" : "EN"}</span>
            </button>

            {!loading && (
              user ? (
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href="/account"
                    className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-border bg-secondary font-mono text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
                    title={user.name}
                    aria-label={`账号：${user.name}`}
                  >
                    <UserRound className="h-4 w-4" />
                  </Link>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-2 border-border rounded-none hover:bg-secondary shadow-brutal-sm"
                    onClick={() => logout()}
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="sr-only">{t("退出登录", "Sign out")}</span>
                  </Button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex h-9 items-center gap-2 border-2 border-border bg-background px-3 font-mono text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-colors shadow-brutal-sm"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("登录/注册", "Sign in")}</span>
                </Link>
              )
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden border-2 border-transparent hover:border-border rounded-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-b-2 border-border bg-background animate-in slide-in-from-top-5">
            <nav className="container py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 font-mono text-sm font-medium border-2 transition-all",
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground border-primary shadow-brutal-sm"
                      : "border-border hover:bg-secondary hover:shadow-brutal-sm",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}

              {!loading && (
                user ? (
                  <>
                    <Link
                      href="/account"
                      className="flex items-center gap-3 px-4 py-3 font-mono text-sm font-medium border-2 border-border hover:bg-secondary hover:shadow-brutal-sm transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserRound className="w-4 h-4" />
                      {user.name}
                    </Link>
                    <button
                      type="button"
                      className="flex items-center gap-3 px-4 py-3 font-mono text-sm font-medium border-2 border-border hover:bg-secondary hover:shadow-brutal-sm transition-all text-left"
                      onClick={() => {
                        void logout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      {t("退出登录", "Sign out")}
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-3 px-4 py-3 font-mono text-sm font-medium border-2 border-border hover:bg-secondary hover:shadow-brutal-sm transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="w-4 h-4" />
                    {t("登录", "Sign in")}
                  </Link>
                )
              )}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col">{children}</main>

      <footer className="border-t-2 border-border bg-secondary/30">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-foreground text-background flex items-center justify-center font-mono font-bold text-sm">
                  G
                </div>
                <span className="font-mono font-bold text-lg tracking-tighter uppercase">
                  Global History Lens
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs font-typewriter leading-relaxed">
                {t(
                  "基于 AI 的全球多视角历史研学平台。",
                  "A multi-perspective history learning platform powered by AI.",
                )}
                <br />
                {t(
                  "解构单一叙事，重构历史全像。",
                  "Break single narratives. Rebuild the whole historical picture.",
                )}
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex h-9 items-center gap-2 border border-border px-3 font-mono text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className="space-y-4">
              <h3 className="font-mono font-bold text-sm uppercase tracking-wider border-b border-border pb-2 inline-block">
                {t("探索", "Explore")}
              </h3>
              <ul className="space-y-2 text-sm font-typewriter">
                <li><Link href="/archive" className="hover:underline decoration-primary decoration-2 underline-offset-4">{t("历史档案库", "Historical Archive")}</Link></li>
                <li><Link href="/dialogue-history" className="hover:underline decoration-primary decoration-2 underline-offset-4">{t("对话历史", "Dialogue History")}</Link></li>
                <li><Link href="/dialogue" className="hover:underline decoration-primary decoration-2 underline-offset-4">{t("AI 多视角对话", "AI Multi-perspective Dialogue")}</Link></li>
                <li><Link href="/travel" className="hover:underline decoration-primary decoration-2 underline-offset-4">{t("历史交互路线", "Story Map Routes")}</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-mono font-bold text-sm uppercase tracking-wider border-b border-border pb-2 inline-block">
                {t("关于", "About")}
              </h3>
              <ul className="space-y-2 text-sm font-typewriter">
                <li><Link href="/about#vision" className="hover:underline decoration-primary decoration-2 underline-offset-4">{t("项目愿景", "Vision")}</Link></li>
                <li><Link href="/about#partners" className="hover:underline decoration-primary decoration-2 underline-offset-4">{t("合作伙伴", "Partners")}</Link></li>
                <li><Link href="/about#contact" className="hover:underline decoration-primary decoration-2 underline-offset-4">{t("联系我们", "Contact")}</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-muted-foreground">
            <p>{t("© 2026 全球历史透视镜。保留所有权利。", "© 2026 Global History Lens. All rights reserved.")}</p>
            <div className="flex gap-6">
              <a href="/about#contact" className="hover:text-foreground transition-colors">{t("联系团队", "Contact")}</a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-foreground transition-colors">{t("合作咨询", "Partnership Inquiry")}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
