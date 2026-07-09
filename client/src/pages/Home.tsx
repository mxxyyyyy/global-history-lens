import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  MessageSquare,
  Database,
  Map as MapIcon,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { getImagePath } from "@/lib/utils";
import { ARCHIVE_TOPICS } from "@/data/historicalEvents";
import {
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const caseOrbitSpots = [
  { x: 12, y: 14, size: "5.2rem", tilt: -7 },
  { x: 26, y: 7, size: "4.6rem", tilt: 6 },
  { x: 44, y: 10, size: "5.5rem", tilt: -3 },
  { x: 67, y: 8, size: "4.9rem", tilt: 8 },
  { x: 86, y: 16, size: "5.1rem", tilt: -5 },
  { x: 92, y: 38, size: "4.7rem", tilt: 4 },
  { x: 84, y: 62, size: "5.7rem", tilt: -9 },
  { x: 70, y: 82, size: "4.8rem", tilt: 7 },
  { x: 51, y: 88, size: "5.2rem", tilt: -4 },
  { x: 31, y: 82, size: "4.9rem", tilt: 5 },
  { x: 14, y: 68, size: "5.4rem", tilt: -8 },
  { x: 7, y: 45, size: "4.7rem", tilt: 6 },
  { x: 20, y: 31, size: "4.4rem", tilt: 9 },
  { x: 36, y: 26, size: "5rem", tilt: -6 },
  { x: 61, y: 25, size: "4.6rem", tilt: 5 },
  { x: 78, y: 34, size: "5.3rem", tilt: -4 },
  { x: 66, y: 66, size: "4.5rem", tilt: 7 },
  { x: 39, y: 67, size: "5rem", tilt: -5 },
  { x: 24, y: 53, size: "4.6rem", tilt: 4 },
] as const;

export default function Home() {
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const heroImage = getImagePath("/images/hero-bg.jpg");
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false });
  const [activePaper, setActivePaper] = useState<string | null>(null);
  const [hasExploredHero, setHasExploredHero] = useState(false);
  const [openingPaper, setOpeningPaper] = useState<string | null>(null);
  const heroEntryPoint = useRef<{ x: number; y: number } | null>(null);
  const caseConstellationTopics = ARCHIVE_TOPICS.slice(
    0,
    caseOrbitSpots.length
  ).map((topic, index) => ({ ...topic, spot: caseOrbitSpots[index] }));
  const [activeCaseId, setActiveCaseId] = useState(
    caseConstellationTopics[0]?.id ?? ""
  );
  const activeCase =
    caseConstellationTopics.find(topic => topic.id === activeCaseId) ??
    caseConstellationTopics[0];
  const archivePapers = [
    {
      id: "dialogue",
      href: "/dialogue",
      code: "CASE FILE 01 / DIALOGUE",
      year: "INDEX 01 / 1914-2025",
      title: "Many Voices",
      label: t("多视角对话", "Multi-perspective Dialogue"),
      body: t(
        "同一历史事件，被不同国家、人物与证据系统重新解释。",
        "One event, re-read through different nations, actors, and evidence systems."
      ),
      stamp: "OPEN DIALOGUE",
      style: {
        "--start-x": "34vw",
        "--start-y": "48vh",
        "--open-x": "50%",
        "--open-y": "15%",
        "--mobile-open-x": "0%",
        "--mobile-open-y": "3%",
        "--closed-rotate": "19deg",
        "--open-rotate": "-7deg",
        "--paper-delay": "80ms",
        "--base-z": 3,
      } as CSSProperties,
    },
    {
      id: "archive",
      href: "/archive",
      code: "ARCHIVE 02 / EVIDENCE",
      year: "INDEX 02 / SOURCE WALL",
      title: "Evidence Wall",
      label: t("历史档案库", "History Archive"),
      body: t(
        "地图、时间线、人物证词与争议文本在一张档案桌上并置。",
        "Maps, timelines, testimony, and disputes sit together on one archive desk."
      ),
      stamp: "VERIFY SOURCE",
      style: {
        "--start-x": "37vw",
        "--start-y": "50vh",
        "--open-x": "74%",
        "--open-y": "2%",
        "--mobile-open-x": "22%",
        "--mobile-open-y": "26%",
        "--closed-rotate": "-18deg",
        "--open-rotate": "5deg",
        "--paper-delay": "190ms",
        "--base-z": 4,
      } as CSSProperties,
    },
    {
      id: "travel",
      href: "/travel",
      code: "ROUTE 03 / FIELD NOTES",
      year: "INDEX 03 / FIELD ROUTE",
      title: "Story Map",
      label: t("主题旅行路线", "Story Routes"),
      body: t(
        "历史从纸面走向地点，路线像一份可以亲自走访的田野记录。",
        "History moves from paper into place through routes you can actually follow."
      ),
      stamp: "TRACE ROUTE",
      style: {
        "--start-x": "40vw",
        "--start-y": "53vh",
        "--open-x": "63%",
        "--open-y": "43%",
        "--mobile-open-x": "6%",
        "--mobile-open-y": "51%",
        "--closed-rotate": "12deg",
        "--open-rotate": "-2deg",
        "--paper-delay": "310ms",
        "--base-z": 5,
      } as CSSProperties,
    },
  ];

  function getSpotlightPosition(event: PointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    return {
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    };
  }

  function handleHeroPointerEnter(event: PointerEvent<HTMLElement>) {
    heroEntryPoint.current = { x: event.clientX, y: event.clientY };
    setSpotlight({
      ...getSpotlightPosition(event),
      active: true,
    });
    setActivePaper(null);
  }

  function handleHeroPointerMove(event: PointerEvent<HTMLElement>) {
    const entryPoint = heroEntryPoint.current;
    const movedFromEntry =
      !entryPoint ||
      Math.hypot(event.clientX - entryPoint.x, event.clientY - entryPoint.y) >
        14;
    const shouldUnfold = hasExploredHero || movedFromEntry;
    const pointedPaper = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest<HTMLElement>(".archive-paper")?.dataset.paperId;

    setSpotlight({
      ...getSpotlightPosition(event),
      active: true,
    });
    if (movedFromEntry) {
      setHasExploredHero(true);
    }
    setActivePaper(shouldUnfold ? (pointedPaper ?? null) : null);
  }

  function handlePaperClick(
    event: MouseEvent<HTMLAnchorElement>,
    paper: (typeof archivePapers)[number]
  ) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    event.preventDefault();
    setHasExploredHero(true);
    setActivePaper(paper.id);
    setOpeningPaper(paper.id);
    window.setTimeout(() => navigate(paper.href), 360);
  }

  const spotlightMask = `radial-gradient(circle 280px at ${spotlight.x}% ${spotlight.y}%, black 0%, rgba(0,0,0,0.92) 34%, rgba(0,0,0,0.3) 63%, transparent 79%)`;
  const spotlightImageStyle: CSSProperties = {
    backgroundImage: `url(${heroImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    opacity: spotlight.active ? 0.9 : 0,
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
        className={`archive-awakening-hero relative min-h-[90vh] flex items-center border-b-2 border-border overflow-hidden ${
          spotlight.active ? "is-awake" : ""
        } ${hasExploredHero ? "has-unfolded" : ""}`}
        onPointerEnter={handleHeroPointerEnter}
        onPointerMove={handleHeroPointerMove}
        onPointerDown={() => setHasExploredHero(true)}
        onPointerLeave={() => {
          if (openingPaper) {
            return;
          }

          heroEntryPoint.current = null;
          setSpotlight(current => ({ ...current, active: false }));
          setActivePaper(null);
          setHasExploredHero(false);
        }}
      >
        {/* Background Texture & Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10"></div>
          <img
            src={heroImage}
            alt="Historical Archive Texture"
            className="archive-hero-base-image w-full h-full object-cover"
          />
          <div
            className="archive-hero-reveal absolute inset-0 z-10 pointer-events-none transition-opacity duration-200"
            style={spotlightImageStyle}
            aria-hidden="true"
          />
          <div className="archive-hero-sleep absolute inset-0 z-10 pointer-events-none"></div>
          <div className="archive-hero-grain absolute inset-0 z-20 pointer-events-none"></div>
          <div
            className="archive-hero-lamp absolute z-20 pointer-events-none h-[21rem] w-[21rem] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen blur-xl transition-opacity duration-200"
            style={spotlightGlowStyle}
            aria-hidden="true"
          />
          {/* Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#2A2A2A_1px,transparent_1px),linear-gradient(to_bottom,#2A2A2A_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.05] z-20 pointer-events-none"></div>
        </div>

        <div className="container relative z-30 pt-20 pb-36 lg:pt-24">
          <div className="grid min-h-[calc(90vh-9rem)] items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(440px,1.05fr)]">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="inline-block mb-6 border-2 border-primary px-4 py-1 bg-background shadow-brutal-sm"
              >
                <span className="font-mono text-sm font-bold tracking-widest uppercase text-primary">
                  {t("全球历史透视镜项目", "Global History Lens Project")}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="archive-hero-title mb-8 text-primary mix-blend-hard-light"
              >
                <span className="block">HISTORY</span>
                <span className="block">IS</span>
                <span className="archive-hero-title-serif block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 italic">
                  NOT
                </span>
                <span className="archive-hero-title-serif block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 italic">
                  SINGULAR
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="archive-hero-subtitle text-xl md:text-2xl text-foreground/80 max-w-2xl mb-12 leading-relaxed border-l-4 border-primary pl-6"
              >
                {t(
                  "基于 AI 的全球多视角历史研学平台。",
                  "An AI-powered platform for reading history through many lenses."
                )}
                <br />
                {t(
                  "解构单一叙事，重构历史全像。",
                  "It challenges single narratives and rebuilds the fuller picture."
                )}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/dialogue" className="inline-block">
                  <Button
                    size="lg"
                    className="h-14 px-8 text-lg font-mono border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 rounded-none shadow-brutal transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg active:translate-x-[0px] active:translate-y-[0px] active:shadow-brutal"
                  >
                    {t("开始多视角对话", "Start a Dialogue")}{" "}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/archive" className="inline-block">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-14 px-8 text-lg font-mono border-2 border-primary bg-transparent hover:bg-secondary rounded-none shadow-brutal-sm transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal active:translate-x-[0px] active:translate-y-[0px] active:shadow-brutal-sm"
                  >
                    {t("浏览档案库", "Browse the Archive")}
                  </Button>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 42 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: "easeOut" }}
              className="archive-desk"
              style={
                {
                  "--drift-x": `${(spotlight.x - 50) * -0.08}px`,
                  "--drift-y": `${(spotlight.y - 50) * -0.08}px`,
                } as CSSProperties
              }
              aria-label={t("档案入口", "Archive entry papers")}
              onPointerLeave={() => setActivePaper(null)}
            >
              {archivePapers.map(paper => (
                <Link
                  key={paper.id}
                  href={paper.href}
                  className={`archive-paper ${activePaper === paper.id ? "is-active" : ""} ${openingPaper === paper.id ? "is-opening" : ""}`}
                  data-code={paper.code}
                  data-year={paper.year}
                  data-paper-id={paper.id}
                  style={paper.style}
                  tabIndex={hasExploredHero ? undefined : -1}
                  aria-hidden={hasExploredHero ? undefined : true}
                  aria-label={`${paper.title}: ${paper.body}`}
                  onClick={event => handlePaperClick(event, paper)}
                  onPointerEnter={() => setActivePaper(paper.id)}
                  onFocus={() => setActivePaper(paper.id)}
                  onBlur={() => setActivePaper(null)}
                >
                  <span className="archive-paper-kicker">{paper.label}</span>
                  <h2>{paper.title}</h2>
                  <p>{paper.body}</p>
                  <div className="archive-paper-columns" aria-hidden="true">
                    <div>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className="archive-paper-stamp">
                    {paper.stamp.split(" ").map(word => (
                      <span key={word}>{word}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Anthropic-inspired case constellation */}
      <section
        id="case-constellation"
        className="case-constellation-section relative min-h-[100svh] overflow-hidden border-b-2 border-border"
      >
        <div className="case-constellation-bg" aria-hidden="true" />
        <div className="container relative z-10 flex min-h-[100svh] flex-col justify-start py-10 md:py-12">
          <motion.div
            className="case-constellation-intro"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="case-constellation-kicker">
              {t("案例库星图", "Case Library Constellation")}
            </span>
            <h2>
              {t(
                "把同一个世界史问题，放进多重证据与记忆之中。",
                "Place one world-history question inside many layers of evidence and memory."
              )}
            </h2>
          </motion.div>

          <div className="case-constellation-stage">
            <svg
              className="case-constellation-lines"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {caseConstellationTopics.map((topic, index) => (
                <line
                  key={topic.id}
                  x1="50"
                  y1="38"
                  x2={topic.spot.x}
                  y2={topic.spot.y}
                  className={activeCaseId === topic.id ? "is-active" : ""}
                  style={{ "--line-delay": `${index * 35}ms` } as CSSProperties}
                />
              ))}
            </svg>

            <motion.div
              className="history-lens-core"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              <span>Global History Lens</span>
              <strong>{activeCase?.title}</strong>
              <em>
                {activeCase?.period} / {activeCase?.region}
              </em>
            </motion.div>

            {caseConstellationTopics.map((topic, index) => (
              <a
                key={topic.id}
                href={`/archive/${topic.id}`}
                className={`case-constellation-node ${
                  activeCaseId === topic.id ? "is-active" : ""
                }`}
                style={
                  {
                    "--x": `${topic.spot.x}%`,
                    "--y": `${topic.spot.y}%`,
                    "--node-size": topic.spot.size,
                    "--node-tilt": `${topic.spot.tilt}deg`,
                    "--node-delay": `${index * 42}ms`,
                  } as CSSProperties
                }
                aria-label={`${topic.title} ${topic.period}`}
                onMouseEnter={() => setActiveCaseId(topic.id)}
                onFocus={() => setActiveCaseId(topic.id)}
              >
                <img src={getImagePath(topic.coverImage)} alt={topic.title} />
                <span className="case-node-meta">
                  <span>{topic.title}</span>
                  <small>{topic.period}</small>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Section - Grid Layout */}
      <section className="archive-feature-section py-24 bg-background relative overflow-hidden">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-2 border-border pb-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono uppercase">
                {t("核心功能", "Core Features")}
              </h2>
              <p className="text-muted-foreground font-typewriter max-w-md">
                {t(
                  "通过三大核心模块，打破时空界限，重建历史认知。",
                  "Three core modules help you cross borders, compare narratives, and rebuild historical understanding."
                )}
              </p>
            </div>
            <div className="hidden md:block font-mono text-sm border border-border px-3 py-1">
              {t("索引：01-03", "INDEX: 01-03")}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              className="archive-feature-card group border-2 border-border bg-card p-8 hover:bg-secondary transition-colors relative overflow-hidden shadow-brutal hover:shadow-brutal-lg transition-all duration-300"
              initial={{ opacity: 0, y: 44, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              <div className="absolute top-4 right-4 font-mono text-4xl font-bold text-border/20 group-hover:text-primary/10 transition-colors">
                01
              </div>
              <div className="mb-6 w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center border-2 border-transparent group-hover:border-primary group-hover:bg-transparent group-hover:text-primary transition-all">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-serif group-hover:text-primary transition-colors">
                {t("AI多视角对话", "AI Multi-perspective Dialogue")}
              </h3>
              <p className="text-muted-foreground mb-6 font-typewriter leading-relaxed">
                {t(
                  "针对同一历史事件，实时生成中、日、美、英、苏等多国视角的差异化解读。史料来源可追溯，培养批判性思维。",
                  "Ask one historical question and compare how different countries, actors, and archives explain it. Sources remain visible, so interpretation stays accountable."
                )}
              </p>
              <Link
                href="/dialogue"
                className="inline-flex items-center font-mono text-sm font-bold uppercase tracking-wider hover:underline decoration-2 underline-offset-4"
              >
                {t("立即体验", "Try it now")}{" "}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="archive-feature-card group border-2 border-border bg-card p-8 hover:bg-secondary transition-colors relative overflow-hidden shadow-brutal hover:shadow-brutal-lg transition-all duration-300"
              initial={{ opacity: 0, y: 44, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
            >
              <div className="absolute top-4 right-4 font-mono text-4xl font-bold text-border/20 group-hover:text-primary/10 transition-colors">
                02
              </div>
              <div className="mb-6 w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center border-2 border-transparent group-hover:border-primary group-hover:bg-transparent group-hover:text-primary transition-all">
                <Database className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-serif group-hover:text-primary transition-colors">
                {t("智能历史专题库", "Intelligent History Archive")}
              </h3>
              <p className="text-muted-foreground mb-6 font-typewriter leading-relaxed">
                {t(
                  '"3+1"结构化呈现：宏观背景、多维解构、证据墙与视角对比。深度剖析政治、经济、社会、文化四大维度。',
                  "Structured case files combine context, event analysis, evidence walls, and perspective comparison across politics, economy, society, and culture."
                )}
              </p>
              <Link
                href="/archive"
                className="inline-flex items-center font-mono text-sm font-bold uppercase tracking-wider hover:underline decoration-2 underline-offset-4"
              >
                {t("查阅档案", "Open archive")}{" "}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="archive-feature-card group border-2 border-border bg-card p-8 hover:bg-secondary transition-colors relative overflow-hidden shadow-brutal hover:shadow-brutal-lg transition-all duration-300"
              initial={{ opacity: 0, y: 44, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.65, delay: 0.16, ease: "easeOut" }}
            >
              <div className="absolute top-4 right-4 font-mono text-4xl font-bold text-border/20 group-hover:text-primary/10 transition-colors">
                03
              </div>
              <div className="mb-6 w-16 h-16 bg-primary text-primary-foreground flex items-center justify-center border-2 border-transparent group-hover:border-primary group-hover:bg-transparent group-hover:text-primary transition-all">
                <MapIcon className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-serif group-hover:text-primary transition-colors">
                {t("深度主题旅游", "Historical Story Maps")}
              </h3>
              <p className="text-muted-foreground mb-6 font-typewriter leading-relaxed">
                {t(
                  "AI生成个性化历史研学路线，结合AR实景复原与VR情境重现，将历史洞察转化为实地探索体验。",
                  "Turn historical events into place-based routes: real map points, narrative slides, and travel-ready context for seeing history in the present."
                )}
              </p>
              <Link
                href="/travel"
                className="inline-flex items-center font-mono text-sm font-bold uppercase tracking-wider hover:underline decoration-2 underline-offset-4"
              >
                {t("规划行程", "Plan a route")}{" "}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Case Study - Split Layout */}
      <section className="py-0 border-y-2 border-border bg-secondary/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          <div className="relative border-b-2 lg:border-b-0 lg:border-r-2 border-border overflow-hidden group">
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10 group-hover:bg-transparent transition-all duration-500"></div>
            <img
              src={getImagePath("/images/ww2-cover.jpg")}
              alt="Pearl Harbor archive cover"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent z-20">
              <span className="inline-block px-3 py-1 bg-primary text-primary-foreground font-mono text-xs font-bold mb-2">
                {t("专题案例", "Featured Case")}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white font-serif">
                {t("珍珠港事件（1941）", "Pearl Harbor (1941)")}
              </h3>
            </div>
          </div>

          <div className="p-12 lg:p-20 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mono uppercase">
              {t("跨时空对话中的", "Cross-Time Dialogue")}
              <br />
              {t("珍珠港", "Pearl Harbor")}
            </h2>
            <div className="w-20 h-2 bg-primary mb-8"></div>

            <p className="text-lg text-muted-foreground mb-8 font-serif leading-relaxed">
              {t(
                "以罗斯福、山本五十六、丘吉尔、胡适、现场水兵、舰载机飞行员、檀香山日裔居民和争议评论员为核心，重建现场经验、战略赌博、政治动员与战后记忆之间的多声部对话。",
                "Use Roosevelt, Yamamoto, Churchill, Hu Shih, a Pearl Harbor sailor, a Japanese pilot, a Honolulu Japanese American resident, and an isolationist critic to reconstruct the event through lived experience, strategy, mobilization, and memory."
              )}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="border-l-2 border-primary pl-4">
                <h4 className="font-bold font-mono text-sm uppercase mb-1">
                  {t("现场", "Scene")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t(
                    "爆炸、浓烟、伤员与幸存者记忆",
                    "Explosion, smoke, casualties, and survivor memory"
                  )}
                </p>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <h4 className="font-bold font-mono text-sm uppercase mb-1">
                  {t("战略", "Strategy")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t(
                    "资源禁运、南进战略与航母奇袭",
                    "Embargoes, southern strategy, and carrier attack"
                  )}
                </p>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <h4 className="font-bold font-mono text-sm uppercase mb-1">
                  {t("动员", "Mobilization")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t(
                    "国会宣战、工业转型与同盟国结构",
                    "Declaration, industrial conversion, and Allied structure"
                  )}
                </p>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <h4 className="font-bold font-mono text-sm uppercase mb-1">
                  {t("争议", "Controversy")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t(
                    "情报失败、阴谋边界与公民权问题",
                    "Intelligence failure, conspiracy boundaries, and civil rights"
                  )}
                </p>
              </div>
            </div>

            <Link href="/dialogue" className="inline-block">
              <Button
                size="lg"
                className="self-start rounded-none border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground shadow-brutal-sm hover:shadow-brutal transition-all"
              >
                {t("进入人物对话", "Open persona dialogue")}
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
              <span className="md:block">
                {t(
                  '"对同一历史事件的多元解读，',
                  '"Reading one event through many perspectives'
                )}
              </span>
              <span className="md:block">
                {t(
                  '是促进文明对话、避免认知偏见的关键。"',
                  'is how we move beyond inherited bias."'
                )}
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="bg-background/10 backdrop-blur p-6 border border-primary-foreground/20">
                <h3 className="text-xl font-bold mb-3 font-mono">
                  {t("学术革命", "Research")}
                </h3>
                <p className="text-sm opacity-80 font-typewriter">
                  {t(
                    "为历史研究提供直观的跨国比较工具，培养批判性思维。",
                    "Make cross-national comparison visible and teach critical historical thinking."
                  )}
                </p>
              </div>
              <div className="bg-background/10 backdrop-blur p-6 border border-primary-foreground/20">
                <h3 className="text-xl font-bold mb-3 font-mono">
                  {t("跨文化理解", "Understanding")}
                </h3>
                <p className="text-sm opacity-80 font-typewriter">
                  {t(
                    "消解单一叙事带来的误解与偏见，促进基于事实的对话。",
                    "Reduce misunderstanding by grounding dialogue in evidence rather than slogans."
                  )}
                </p>
              </div>
              <div className="bg-background/10 backdrop-blur p-6 border border-primary-foreground/20">
                <h3 className="text-xl font-bold mb-3 font-mono">
                  {t("人文经济", "Cultural Value")}
                </h3>
                <p className="text-sm opacity-80 font-typewriter">
                  {t(
                    "将历史洞察力转化为文化吸引力，赋能地方文旅发展。",
                    "Turn historical insight into meaningful cultural travel and local storytelling."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
