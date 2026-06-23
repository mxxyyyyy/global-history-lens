import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Layers, Palette, Layout, MousePointer, Share2, Download, Eye } from "lucide-react";
import { Link } from "wouter";
import { getImagePath } from "@/lib/utils";

export default function Showcase() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", label: "项目概览", icon: Eye },
    { id: "design", label: "设计哲学", icon: Palette },
    { id: "features", label: "核心功能", icon: Layers },
    { id: "interaction", label: "交互体验", icon: MousePointer },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Showcase Header */}
      <div className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/archive-texture.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 border border-primary-foreground/30 font-mono text-xs font-bold mb-4 uppercase tracking-widest">
              Interactive Design Report
            </span>
            <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6">全球历史透视镜</h1>
            <p className="text-xl opacity-90 font-typewriter max-w-2xl mx-auto mb-8">
              基于AI与VR技术的全球多视角历史交互平台设计方案展示
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/">
                <Button size="lg" className="bg-background text-foreground hover:bg-background/90 font-mono font-bold border-2 border-transparent hover:border-primary-foreground transition-all shadow-lg">
                  访问实时网站
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-mono font-bold bg-transparent">
                <Download className="mr-2 h-4 w-4" /> 下载设计文档
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b-2 border-border">
        <div className="container flex overflow-x-auto no-scrollbar">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-6 py-4 font-mono text-sm font-bold uppercase transition-all border-b-4 ${
                activeSection === section.id
                  ? "border-primary text-primary bg-secondary/30"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/10"
              }`}
            >
              <section.icon className="w-4 h-4" />
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 container py-12">
        <AnimatePresence mode="wait">
          {activeSection === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold font-serif mb-6">重构历史认知的数字平台</h2>
                  <p className="text-lg text-muted-foreground font-serif leading-relaxed mb-6">
                    本项目旨在构建一个前所未有的数字人文平台，以人工智能为核心引擎，以虚拟现实为沉浸窗口，深度解构并可视化呈现不同国家、文明对同一历史事件的不同叙事与视角。
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="font-bold font-mono text-lg mb-1">多视角</h3>
                      <p className="text-sm text-muted-foreground">中、日、美、英、苏五国档案对比</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="font-bold font-mono text-lg mb-1">沉浸式</h3>
                      <p className="text-sm text-muted-foreground">VR情境重现与AR实地探索</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="font-bold font-mono text-lg mb-1">智能化</h3>
                      <p className="text-sm text-muted-foreground">AI驱动的对话与路线生成</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="font-bold font-mono text-lg mb-1">批判性</h3>
                      <p className="text-sm text-muted-foreground">史料溯源与可信度评估</p>
                    </div>
                  </div>
                </div>
                <div className="relative aspect-video bg-secondary border-2 border-border shadow-brutal-lg overflow-hidden group">
                  <img src={getImagePath("/images/hero-bg.jpg")} alt="Project Overview" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-all">
                    <div className="bg-background/90 backdrop-blur px-6 py-3 border-2 border-primary shadow-lg">
                      <span className="font-mono font-bold text-primary uppercase tracking-widest">Project Vision</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Exploration Benefits */}
              <div className="bg-secondary/20 border-2 border-border p-8 md:p-12">
                <h3 className="text-2xl font-bold font-serif mb-8 text-center">交互式报告的三大价值</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-background p-6 border-2 border-border shadow-brutal hover:-translate-y-1 transition-transform">
                    <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center mb-4">
                      <Eye className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold font-mono text-lg mb-2">(a) 更直观地探索数据</h4>
                    <p className="text-sm text-muted-foreground font-typewriter">
                      通过可视化的时间轴、地图和证据墙，将枯燥的历史档案转化为直观的视觉体验，让用户能够轻松穿梭于海量史料之中。
                    </p>
                  </div>
                  <div className="bg-background p-6 border-2 border-border shadow-brutal hover:-translate-y-1 transition-transform">
                    <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center mb-4">
                      <Layers className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold font-mono text-lg mb-2">(b) 更好地理解趋势</h4>
                    <p className="text-sm text-muted-foreground font-typewriter">
                      多视角并排对比与动态交互分析，帮助用户清晰地看到历史叙事的演变脉络，理解不同国家视角背后的地缘政治逻辑。
                    </p>
                  </div>
                  <div className="bg-background p-6 border-2 border-border shadow-brutal hover:-translate-y-1 transition-transform">
                    <div className="w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center mb-4">
                      <Share2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold font-mono text-lg mb-2">(c) 方便保存或分享</h4>
                    <p className="text-sm text-muted-foreground font-typewriter">
                      支持一键生成个性化研学报告和旅游路线，方便用户收藏关键史料或与他人分享独特的历史发现。
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "design" && (
            <motion.div
              key="design"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold font-serif mb-4">Digital Brutalism + Archival Aesthetics</h2>
                <p className="text-lg text-muted-foreground font-typewriter">
                  "数字野兽派遇上档案美学" —— 我们的设计哲学旨在通过原始、真实的质感与结构化的布局，唤起对历史的敬畏与理性思考。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border-2 border-border bg-card p-8 shadow-brutal">
                  <h3 className="font-mono font-bold text-xl uppercase mb-6 border-b-2 border-border pb-2">色彩体系</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-[#2A2A2A] border-2 border-border shadow-sm"></div>
                      <div>
                        <h4 className="font-bold font-mono">Concrete Grey (#2A2A2A)</h4>
                        <p className="text-xs text-muted-foreground">代表历史的沉重、客观与理性。作为主色调，奠定严肃的基调。</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-[#F0E6D2] border-2 border-border shadow-sm"></div>
                      <div>
                        <h4 className="font-bold font-mono">Archival Paper (#F0E6D2)</h4>
                        <p className="text-xs text-muted-foreground">代表时间的流逝与记忆的温度。作为背景色，模拟老旧档案纸张。</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-[#8B4513] border-2 border-border shadow-sm"></div>
                      <div>
                        <h4 className="font-bold font-mono">Rust Red (#8B4513)</h4>
                        <p className="text-xs text-muted-foreground">代表历史的冲突与警示。作为强调色，用于关键交互与警示信息。</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-border bg-card p-8 shadow-brutal">
                  <h3 className="font-mono font-bold text-xl uppercase mb-6 border-b-2 border-border pb-2">字体排印</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-4xl font-bold font-mono mb-2">Space Mono</h4>
                      <p className="text-xs text-muted-foreground font-typewriter">用于标题、导航与元数据。机械、冷峻，强调结构感。</p>
                    </div>
                    <div>
                      <h4 className="text-3xl font-serif mb-2">IBM Plex Serif</h4>
                      <p className="text-xs text-muted-foreground font-typewriter">用于正文与长篇阅读。传统、易读，带有浓厚的学术气息。</p>
                    </div>
                    <div>
                      <h4 className="text-2xl font-typewriter mb-2">Courier Prime</h4>
                      <p className="text-xs text-muted-foreground font-typewriter">用于引用、档案摘录与辅助说明。纯正的打字机风格，增强临场感。</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "features" && (
            <motion.div
              key="features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  title: "AI多视角对话",
                  desc: "实时生成中、日、美、英、苏等多国视角的差异化解读，史料来源可追溯。",
                  link: "/dialogue",
                  img: getImagePath("/images/perspective-icon.png")
                },
                {
                  title: "智能历史专题库",
                  desc: "3+1结构化呈现：宏观背景、多维解构、证据墙与视角对比。",
                  link: "/archive",
                  img: getImagePath("/images/archive-texture.jpg")
                },
                {
                  title: "深度主题旅游",
                  desc: "AI生成个性化历史研学路线，结合AR实景复原与VR情境重现。",
                  link: "/travel",
                  img: getImagePath("/images/map-bg.jpg")
                }
              ].map((feature, i) => (
                <div key={i} className="group border-2 border-border bg-card overflow-hidden shadow-brutal hover:shadow-brutal-lg transition-all">
                  <div className="aspect-video bg-secondary relative overflow-hidden border-b-2 border-border">
                    <img src={feature.img} alt={feature.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-serif mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground font-typewriter mb-6 h-20">{feature.desc}</p>
                    <Link href={feature.link}>
                      <Button className="w-full rounded-none border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                        查看演示
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeSection === "interaction" && (
            <motion.div
              key="interaction"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold font-serif">微交互与动效设计</h3>
                  <p className="text-muted-foreground font-typewriter leading-relaxed">
                    为了增强"历史厚重感"与"档案真实感"，我们在交互细节上做了精心打磨。
                  </p>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground flex items-center justify-center font-mono text-xs mt-1">01</div>
                      <div>
                        <h4 className="font-bold font-mono">Tactile Feedback (触感反馈)</h4>
                        <p className="text-sm text-muted-foreground">按钮和卡片具有明确的阴影位移，模拟物理按键的点击感。</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground flex items-center justify-center font-mono text-xs mt-1">02</div>
                      <div>
                        <h4 className="font-bold font-mono">Typewriter Effect (打字机效果)</h4>
                        <p className="text-sm text-muted-foreground">文本逐字显现，模拟老式打字机的输入过程，增加历史临场感。</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground flex items-center justify-center font-mono text-xs mt-1">03</div>
                      <div>
                        <h4 className="font-bold font-mono">Archival Reveal (档案揭示)</h4>
                        <p className="text-sm text-muted-foreground">图片和文档采用去色处理，悬停时恢复色彩，象征"拂去历史的尘埃"。</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="border-2 border-border bg-secondary/20 p-8 flex items-center justify-center">
                  <div className="space-y-6 w-full max-w-xs">
                    <Button className="w-full h-14 text-lg font-mono border-2 border-primary bg-primary text-primary-foreground shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-lg active:translate-x-[0px] active:translate-y-[0px] active:shadow-brutal transition-all">
                      Primary Button
                    </Button>
                    <Button variant="outline" className="w-full h-14 text-lg font-mono border-2 border-primary bg-transparent shadow-brutal-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal active:translate-x-[0px] active:translate-y-[0px] active:shadow-brutal-sm transition-all">
                      Secondary Button
                    </Button>
                    <div className="p-4 border-2 border-border bg-card shadow-brutal hover:shadow-brutal-lg transition-all cursor-pointer group">
                      <span className="font-mono font-bold group-hover:text-primary transition-colors">Hover Card Interaction</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
