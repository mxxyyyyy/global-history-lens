import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, Globe, BookOpen, Map as MapIcon, Glasses, LogIn, LogOut, UserRound } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, loading, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();

  const navItems = [
    { name: t("首页", "Home"), path: "/", icon: Globe },
    { name: t("AI对话", "AI Dialogue"), path: "/dialogue", icon: Glasses },
    { name: t("档案库", "Archive"), path: "/archive", icon: BookOpen },
    { name: t("历史交互", "Story Map"), path: "/travel", icon: MapIcon },
    { name: t("对话历史", "History"), path: "/dialogue-history", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Top Navigation Bar - Brutalist Style */}
      <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center font-mono font-bold text-xl border-2 border-transparent group-hover:border-primary group-hover:bg-background group-hover:text-primary transition-all duration-300">
                G
              </div>
              <span className="font-mono font-bold text-lg tracking-tighter uppercase hidden sm:inline-block">
                Global History Lens
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 shrink-0">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}
                className={cn(
                  "flex shrink-0 items-center gap-2 whitespace-nowrap px-3 lg:px-4 py-2 font-mono text-sm font-medium transition-colors hover:bg-secondary border-2 border-transparent hover:border-border",
                  location === item.path
                    ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:border-primary"
                    : "text-foreground/80"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Button variant="outline" size="icon" className="border-2 border-border rounded-none hover:bg-secondary shadow-brutal-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
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

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-b-2 border-border bg-background animate-in slide-in-from-top-5">
            <nav className="container py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 font-mono text-sm font-medium border-2 transition-all",
                    location === item.path
                      ? "bg-primary text-primary-foreground border-primary shadow-brutal-sm"
                      : "border-border hover:bg-secondary hover:shadow-brutal-sm"
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Footer - Archival Style */}
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
                {t("基于AI与VR技术的全球多视角历史交互平台。", "A multi-perspective history platform powered by AI and immersive technology.")}
                <br />
                {t("解构单一叙事，重构历史全像。", "Break single narratives. Rebuild the whole historical picture.")}
              </p>
              <div className="pt-4 flex gap-4">
                <div className="h-8 w-8 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </div>
                <div className="h-8 w-8 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-mono font-bold text-sm uppercase tracking-wider border-b border-border pb-2 inline-block">{t("探索", "Explore")}</h3>
              <ul className="space-y-2 text-sm font-typewriter">
                <li><Link href="/archive" className="hover:underline decoration-primary decoration-2 underline-offset-4">{t("历史档案库", "Historical Archive")}</Link></li>
                <li><Link href="/dialogue-history" className="hover:underline decoration-primary decoration-2 underline-offset-4">{t("对话历史", "Dialogue History")}</Link></li>
                <li><Link href="/dialogue" className="hover:underline decoration-primary decoration-2 underline-offset-4">{t("AI多视角对话", "AI Multi-perspective Dialogue")}</Link></li>
                <li><Link href="/travel" className="hover:underline decoration-primary decoration-2 underline-offset-4">{t("历史交互路线", "Story Map Routes")}</Link></li>
                <li><Link href="/vr" className="hover:underline decoration-primary decoration-2 underline-offset-4">{t("VR情境体验", "VR Scene Experience")}</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-mono font-bold text-sm uppercase tracking-wider border-b border-border pb-2 inline-block">{t("关于", "About")}</h3>
              <ul className="space-y-2 text-sm font-typewriter">
                <li><Link href="/about" className="hover:underline decoration-primary decoration-2 underline-offset-4">{t("项目愿景", "Vision")}</Link></li>
                <li><Link href="/team" className="hover:underline decoration-primary decoration-2 underline-offset-4">{t("研究团队", "Research Team")}</Link></li>
                <li><Link href="/partners" className="hover:underline decoration-primary decoration-2 underline-offset-4">{t("合作伙伴", "Partners")}</Link></li>
                <li><Link href="/contact" className="hover:underline decoration-primary decoration-2 underline-offset-4">{t("联系我们", "Contact")}</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-muted-foreground">
            <p>&copy; 2025 Global History Lens. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
