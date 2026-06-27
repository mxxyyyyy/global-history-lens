import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Database, Map as MapIcon, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { getImagePath } from "@/lib/utils";
import { useState, type CSSProperties, type PointerEvent } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const heroImage = getImagePath("/images/hero-bg.jpg");
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false });

  function handleHeroPointerMove(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setSpotlight({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  }

  const spotlightMask = `radial-gradient(circle 210px at ${spotlight.x}% ${spotlight.y}%, black 0%, rgba(0,0,0,0.9) 34%, rgba(0,0,0,0.28) 62%, transparent 78%)`;
  const spotlightImageStyle: CSSProperties = {
    backgroundImage: `url(${heroImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    opacity: spotlight.active ? 0.82 : 0,
    WebkitMaskImage: spotlightMask,
    maskImage: spotlightMask,
  };
  const spotlightGlowStyle: CSSProperties = {
    left: `${spotlight.x}%`,
    top: `${spotlight.y}%`,
    opacity: spotlight.active ? 1 : 0,
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Brutalist & Archival */}
      <section
        className="relative min-h-[90vh] flex items-center border-b-2 border-border overflow-hidden"
        onPointerEnter={() => setSpotlight(current => ({ ...current, active: true }))}
        onPointerMove={handleHeroPointerMove}
        onPointerLeave={() => setSpotlight(current => ({ ...current, active: false }))}
      >
        {/* Background Texture & Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10"></div>
          <img 
            src={heroImage}
            alt="Historical Archive Texture" 
            className="w-full h-full object-cover opacity-40 grayscale contrast-125"
          />
          <div
            className="absolute inset-0 z-10 pointer-events-none grayscale-0 contrast-150 brightness-125 transition-opacity duration-200"
            style={spotlightImageStyle}
            aria-hidden="true"
          />
          <div
            className="absolute z-20 pointer-events-none h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(240,230,210,0.35)_0%,rgba(240,230,210,0.16)_36%,transparent_70%)] mix-blend-screen blur-xl transition-opacity duration-200"
            style={spotlightGlowStyle}
            aria-hidden="true"
          />
          {/* Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#2A2A2A_1px,transparent_1px),linear-gradient(to_bottom,#2A2A2A_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.05] z-20 pointer-events-none"></div>
        </div>

        <div className="container relative z-30 pt-20 pb-32">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-block mb-6 border-2 border-primary px-4 py-1 bg-background shadow-brutal-sm"
            >
              <span className="font-mono text-sm font-bold tracking-widest uppercase text-primary">
                Global History Lens Project
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 text-primary mix-blend-hard-light"
            >
              HISTORY IS <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 italic font-serif">NOT SINGULAR</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-xl md:text-2xl text-foreground/80 max-w-2xl mb-12 font-serif leading-relaxed border-l-4 border-primary pl-6"
            >
              {t("基于AI与VR技术的全球多视角历史交互平台。", "An AI-powered platform for reading history through many lenses.")}
              <br/>
              {t("解构单一叙事，重构历史全像。", "It challenges single narratives and rebuilds the fuller picture.")}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/dialogue" className="inline-block">
                <Button size="lg" className="h-14 px-8 text-lg font-mono border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 rounded-none shadow-brutal transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg active:translate-x-[0px] active:translate-y-[0px] active:shadow-brutal">
                  {t("开始多视角对话", "Start a Dialogue")} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/archive" className="inline-block">
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-mono border-2 border-primary bg-transparent hover:bg-secondary rounded-none shadow-brutal-sm transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal active:translate-x-[0px] active:translate-y-[0px] active:shadow-brutal-sm">
                  {t("浏览档案库", "Browse the Archive")}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-0 left-0 w-full border-t-2 border-border bg-background/80 backdrop-blur py-4"
        >
          <div className="container flex justify-between items-center font-mono text-xs uppercase tracking-widest">
            <span>Scroll to explore</span>
            <div className="h-12 w-[1px] bg-primary animate-pulse"></div>
            <span>Est. 2025</span>
          </div>
        </motion.div>
      </section>

      {/* Core Features Section - Grid Layout */}
      <section className="py-24 bg-background relative">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-2 border-border pb-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono uppercase">{t("核心功能", "Core Features")}</h2>
              <p className="text-muted-foreground font-typewriter max-w-md">
                {t("通过三大核心模块，打破时空界限，重建历史认知。", "Three core modules help you cross borders, compare narratives, and rebuild historical understanding.")}
              </p>
            </div>
            <div className="hidden md:block font-mono text-sm border border-border px-3 py-1">
              INDEX: 01-03
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group border-2 border-border bg-card p-8 hover:bg-secondary transition-colors relative overflow-hidden shadow-brutal hover:shadow-brutal-lg transition-all duration-300">
              <div className="absolute top-4 right-4 font-mono text-4xl font-bold text-border/20 group-hover:text-primary/10 transition-colors">01</div>
              <div className="mb-6 w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center border-2 border-transparent group-hover:border-primary group-hover:bg-transparent group-hover:text-primary transition-all">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-serif group-hover:text-primary transition-colors">{t("AI多视角对话", "AI Multi-perspective Dialogue")}</h3>
              <p className="text-muted-foreground mb-6 font-typewriter leading-relaxed">
                {t("针对同一历史事件，实时生成中、日、美、英、苏等多国视角的差异化解读。史料来源可追溯，培养批判性思维。", "Ask one historical question and compare how different countries, actors, and archives explain it. Sources remain visible, so interpretation stays accountable.")}
              </p>
              <Link href="/dialogue" className="inline-flex items-center font-mono text-sm font-bold uppercase tracking-wider hover:underline decoration-2 underline-offset-4">
                {t("立即体验", "Try it now")} <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="group border-2 border-border bg-card p-8 hover:bg-secondary transition-colors relative overflow-hidden shadow-brutal hover:shadow-brutal-lg transition-all duration-300">
              <div className="absolute top-4 right-4 font-mono text-4xl font-bold text-border/20 group-hover:text-primary/10 transition-colors">02</div>
              <div className="mb-6 w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center border-2 border-transparent group-hover:border-primary group-hover:bg-transparent group-hover:text-primary transition-all">
                <Database className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-serif group-hover:text-primary transition-colors">{t("智能历史专题库", "Intelligent History Archive")}</h3>
              <p className="text-muted-foreground mb-6 font-typewriter leading-relaxed">
                {t("\"3+1\"结构化呈现：宏观背景、多维解构、证据墙与视角对比。深度剖析政治、经济、社会、文化四大维度。", "Structured case files combine context, event analysis, evidence walls, and perspective comparison across politics, economy, society, and culture.")}
              </p>
              <Link href="/archive" className="inline-flex items-center font-mono text-sm font-bold uppercase tracking-wider hover:underline decoration-2 underline-offset-4">
                {t("查阅档案", "Open archive")} <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="group border-2 border-border bg-card p-8 hover:bg-secondary transition-colors relative overflow-hidden shadow-brutal hover:shadow-brutal-lg transition-all duration-300">
              <div className="absolute top-4 right-4 font-mono text-4xl font-bold text-border/20 group-hover:text-primary/10 transition-colors">03</div>
              <div className="mb-6 w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center border-2 border-transparent group-hover:border-primary group-hover:bg-transparent group-hover:text-primary transition-all">
                <MapIcon className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-serif group-hover:text-primary transition-colors">{t("深度主题旅游", "Historical Story Maps")}</h3>
              <p className="text-muted-foreground mb-6 font-typewriter leading-relaxed">
                {t("AI生成个性化历史研学路线，结合AR实景复原与VR情境重现，将历史洞察转化为实地探索体验。", "Turn historical events into place-based routes: real map points, narrative slides, and travel-ready context for seeing history in the present.")}
              </p>
              <Link href="/travel" className="inline-flex items-center font-mono text-sm font-bold uppercase tracking-wider hover:underline decoration-2 underline-offset-4">
                {t("规划行程", "Plan a route")} <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Study - Split Layout */}
      <section className="py-0 border-y-2 border-border bg-secondary/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          <div className="relative border-b-2 lg:border-b-0 lg:border-r-2 border-border overflow-hidden group">
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10 group-hover:bg-transparent transition-all duration-500"></div>
            <img 
              src={getImagePath("/images/map-bg.jpg")}
              alt="Manchuria Map 1930s" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent z-20">
              <span className="inline-block px-3 py-1 bg-primary text-primary-foreground font-mono text-xs font-bold mb-2">{t("标杆案例", "Featured Case")}</span>
              <h3 className="text-3xl md:text-4xl font-bold text-white font-serif">{t("伪满洲国 (1932-1945)", "Manchukuo (1932-1945)")}</h3>
            </div>
          </div>
          
          <div className="p-12 lg:p-20 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mono uppercase">{t("全球视野下的", "Manchukuo in")}<br/>{t("伪满洲国实录", "Global Perspective")}</h2>
            <div className="w-20 h-2 bg-primary mb-8"></div>
            
            <p className="text-lg text-muted-foreground mb-8 font-serif leading-relaxed">
              {t("这是我们的首个标杆案例。我们聚合了中国、日本、美国、英国、苏联等多国的官方档案、学术研究与民间记忆，深度解构这一复杂的历史时期。", "Our first flagship case brings together official archives, scholarship, textbooks, and public memory from China, Japan, the United States, Britain, the Soviet Union, and international institutions.")}
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="border-l-2 border-primary pl-4">
                <h4 className="font-bold font-mono text-sm uppercase mb-1">{t("政治外交", "Politics")}</h4>
                <p className="text-sm text-muted-foreground">{t("傀儡政权的合法性危机与国际博弈", "Legitimacy, diplomacy, and international contestation")}</p>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <h4 className="font-bold font-mono text-sm uppercase mb-1">{t("经济资源", "Economy")}</h4>
                <p className="text-sm text-muted-foreground">{t("工业化背后的殖民输血与掠夺", "Colonial extraction behind industrial development")}</p>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <h4 className="font-bold font-mono text-sm uppercase mb-1">{t("社会文化", "Society")}</h4>
                <p className="text-sm text-muted-foreground">{t("身份认同的撕裂与皇民化教育", "Identity fracture and assimilation policies")}</p>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <h4 className="font-bold font-mono text-sm uppercase mb-1">{t("军事冲突", "Conflict")}</h4>
                <p className="text-sm text-muted-foreground">{t("冰雪中的游击战与国际援助", "Guerrilla resistance, occupation, and wartime collapse")}</p>
              </div>
            </div>
            
            <Link href="/archive/manchukuo" className="inline-block">
              <Button size="lg" className="self-start rounded-none border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground shadow-brutal-sm hover:shadow-brutal transition-all">
                {t("深入探索此案例", "Explore this case")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition - Typography Focused */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/archive-texture.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 font-serif leading-tight">
              <span className="md:block">{t("\"对同一历史事件的多元解读，", "\"Reading one event through many perspectives")}</span>
              <span className="md:block">{t("是促进文明对话、避免认知偏见的关键。\"", "is how we move beyond inherited bias.\"")}</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="bg-background/10 backdrop-blur p-6 border border-primary-foreground/20">
                <h3 className="text-xl font-bold mb-3 font-mono">{t("学术革命", "Research")}</h3>
                <p className="text-sm opacity-80 font-typewriter">{t("为历史研究提供直观的跨国比较工具，培养批判性思维。", "Make cross-national comparison visible and teach critical historical thinking.")}</p>
              </div>
              <div className="bg-background/10 backdrop-blur p-6 border border-primary-foreground/20">
                <h3 className="text-xl font-bold mb-3 font-mono">{t("跨文化理解", "Understanding")}</h3>
                <p className="text-sm opacity-80 font-typewriter">{t("消解单一叙事带来的误解与偏见，促进基于事实的对话。", "Reduce misunderstanding by grounding dialogue in evidence rather than slogans.")}</p>
              </div>
              <div className="bg-background/10 backdrop-blur p-6 border border-primary-foreground/20">
                <h3 className="text-xl font-bold mb-3 font-mono">{t("人文经济", "Cultural Value")}</h3>
                <p className="text-sm opacity-80 font-typewriter">{t("将历史洞察力转化为文化吸引力，赋能地方文旅发展。", "Turn historical insight into meaningful cultural travel and local storytelling.")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
