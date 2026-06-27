import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Filter, Calendar, MapPin, FileText, Image as ImageIcon, Film, Mic, Database, X, ArrowLeft, Route } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { HISTORICAL_EVENTS, ARCHIVE_CATEGORIES, ARCHIVE_TOPICS, ArchiveTopic, HistoricalEvent } from "@/data/historicalEvents";
import { getImagePath } from "@/lib/utils";

const TOPICS_WITH_TRAVEL_ROUTES = new Set([
  "manchukuo",
  "opium_war",
  "meiji",
  "french_revolution",
  "cold_war",
  "silk_road",
  "american_revolution",
  "industrial_revolution",
  "ww1",
  "age_of_exploration",
  "american_civil_war",
  "black_death",
  "boxer_rebellion",
  "cuban_missile_crisis",
  "decolonization",
  "first_sino_japanese_war",
  "korean_war",
  "mongol_empire",
  "nanjing_massacre",
  "reformation",
  "renaissance",
  "roman_empire",
  "russian_revolution",
  "slave_trade",
  "ww2",
]);

export default function Archive() {
  const [activeTab, setActiveTab] = useState("politics");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof HISTORICAL_EVENTS>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<ArchiveTopic | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);

  // 全局搜索功能
  const handleGlobalSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
      // 模拟搜索延迟
      setTimeout(() => {
        const results = HISTORICAL_EVENTS.filter(event => 
          event.title.includes(query) || 
          event.description.includes(query) || 
          event.tags.some(tag => tag.includes(query)) ||
          event.sources.some(source => source.includes(query))
        );
        setSearchResults(results);
        setIsSearching(false);
      }, 300);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  // 按分类筛选事件
  const categoryEvents = useMemo(() => {
    const events = selectedTopic ? selectedTopic.events : HISTORICAL_EVENTS;
    return events.filter(event => event.category === activeTab);
  }, [activeTab, selectedTopic]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Archive Header with Global Search */}
      <div className="bg-secondary/30 border-b-2 border-border py-8">
        <div className="container">
          {/* 全局搜索栏 */}
          <div className="mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
              <Input 
                value={searchQuery}
                onChange={(e) => handleGlobalSearch(e.target.value)}
                placeholder="搜索任何历史事件、关键词或档案来源..." 
                className="pl-12 pr-4 py-3 h-12 font-serif text-lg border-2 border-border rounded-none focus-visible:ring-0 focus-visible:border-primary bg-background shadow-brutal-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => handleGlobalSearch("")}
                  className="absolute right-4 top-3.5 p-1 hover:bg-secondary rounded transition-colors"
                >
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-xs font-mono text-muted-foreground mt-2">
                {isSearching ? "搜索中..." : `找到 ${searchResults.length} 个相关事件`}
              </p>
            )}
          </div>

          {/* 标题和描述 */}
          {!searchQuery && (
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div>
                {selectedTopic ? (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <button onClick={() => setSelectedTopic(null)} className="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground font-mono text-xs font-bold border border-border hover:bg-primary hover:text-primary-foreground transition-colors">
                        <ArrowLeft className="w-3 h-3" /> 返回档案库
                      </button>
                      <span className="px-2 py-1 bg-primary text-primary-foreground font-mono text-xs font-bold">
                        CASE ID: {selectedTopic.caseId}
                      </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4">{selectedTopic.title}</h1>
                    <p className="text-lg text-muted-foreground font-typewriter max-w-2xl">{selectedTopic.description}</p>
                  </>
                ) : (
                  <>
                    <div className="inline-block px-2 py-1 bg-primary text-primary-foreground font-mono text-xs font-bold mb-4">
                      10 GLOBAL ARCHIVES
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4">全球多视角历史档案库</h1>
                    <p className="text-lg text-muted-foreground font-typewriter max-w-2xl">
                      跨越千年、横贯东西。10大历史专题，多国多视角档案，解构单一叙事。
                    </p>
                  </>
                )}
              </div>
              
              {selectedTopic && (
                <div className="flex gap-2">
                  <Button variant="outline" className="border-2 border-border rounded-none font-mono text-xs uppercase tracking-wider hover:bg-secondary">
                    <Calendar className="w-4 h-4 mr-2" /> {selectedTopic.period}
                  </Button>
                  <Button variant="outline" className="border-2 border-border rounded-none font-mono text-xs uppercase tracking-wider hover:bg-secondary">
                    <MapPin className="w-4 h-4 mr-2" /> {selectedTopic.region}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Search Results or Main Content */}
      {searchQuery ? (
        // 搜索结果视图
        <div className="flex-1 container py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold font-serif mb-2">搜索结果</h2>
            <p className="text-muted-foreground font-typewriter">
              关键词: <span className="font-bold text-primary">"{searchQuery}"</span>
            </p>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {searchResults.map((event, idx) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-2 border-border bg-card p-6 shadow-brutal hover:shadow-brutal-lg transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold font-serif flex-1">{event.title}</h3>
                    <span className="text-xs font-mono bg-primary text-primary-foreground px-2 py-1 ml-2">
                      {event.year}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground font-typewriter mb-4 leading-relaxed">
                    {event.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-mono bg-secondary px-2 py-1 border border-border/50">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-xs font-mono text-muted-foreground mb-2">档案来源:</p>
                    <div className="flex flex-wrap gap-1">
                      {event.sources.map((source, i) => (
                        <span key={i} className="text-[10px] font-mono bg-secondary/50 px-1.5 py-0.5 border border-border/30">
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
              <Search className="w-16 h-16 mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-bold font-serif mb-2">未找到相关事件</h3>
              <p className="font-typewriter text-muted-foreground max-w-md">
                请尝试其他关键词，或浏览下方的分类档案库。
              </p>
            </div>
          )}

          <div className="mt-12 pt-8 border-t-2 border-border">
            <h3 className="text-2xl font-bold font-serif mb-6">浏览所有事件</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {ARCHIVE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSearchQuery("");
                    setSearchResults([]);
                    setActiveTab(cat.id);
                  }}
                  className="p-4 border-2 border-border bg-card hover:bg-secondary transition-all text-left shadow-brutal-sm hover:shadow-brutal"
                >
                  <span className="text-2xl mb-2 block">{cat.icon}</span>
                  <h4 className="font-bold font-serif text-lg">{cat.label}</h4>
                  <p className="text-xs font-mono text-muted-foreground">{cat.sub}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : !selectedTopic ? (
        // 专题选择视图 - 10大历史专题
        <div className="flex-1 container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARCHIVE_TOPICS.map((topic, idx) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="text-left border-2 border-border bg-card p-0 shadow-brutal hover:shadow-brutal-lg transition-all group overflow-hidden"
              >
                <button type="button" onClick={() => setSelectedTopic(topic)} className="w-full text-left">
                  <div className="h-32 bg-secondary/30 relative overflow-hidden">
                    <img src={getImagePath(topic.coverImage)} alt={topic.title} className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-500" />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-primary text-primary-foreground font-mono text-[10px] font-bold">
                      {topic.caseId}
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-background/80 font-mono text-[10px] border border-border">
                      {topic.events.length} 事件
                    </div>
                  </div>
                </button>
                <div className="p-5">
                  <button type="button" onClick={() => setSelectedTopic(topic)} className="text-left w-full">
                  <h3 className="text-xl font-bold font-serif mb-1 group-hover:text-primary transition-colors">{topic.title}</h3>
                  <p className="text-xs font-mono text-muted-foreground mb-3">{topic.subtitle} · {topic.period}</p>
                  <p className="text-sm text-muted-foreground font-typewriter leading-relaxed line-clamp-2">{topic.description}</p>
                  </button>
                  <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap justify-between items-center gap-3">
                    <span className="text-xs font-mono text-muted-foreground">{topic.region}</span>
                    <div className="flex items-center gap-2">
                      {TOPICS_WITH_TRAVEL_ROUTES.has(topic.id) && (
                        <Link
                          href={`/travel?case=${topic.id}`}
                          className="inline-flex items-center gap-1 text-xs font-mono font-bold text-primary hover:underline"
                        >
                          <Route className="w-3 h-3" />
                          查看历史现场
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedTopic(topic)}
                        className="text-xs font-mono font-bold text-primary hover:underline"
                      >
                        进入档案 →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        // 正常的分类视图
        <div className="flex-1 container py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar - Context & Navigation */}
          <div className="lg:col-span-3 space-y-8">
            {/* Context Card */}
            <div className="border-2 border-border bg-card p-6 shadow-brutal">
              <h3 className="font-mono font-bold text-lg uppercase mb-4 border-b-2 border-border pb-2">宏观背景</h3>
              <div className="space-y-4 font-serif text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">全球局势：</strong> 1930年代初，大萧条席卷全球，法西斯主义兴起。凡尔赛-华盛顿体系面临挑战。
                </p>
                <p>
                  <strong className="text-foreground">地缘政治：</strong> 日本急需扩张以转嫁国内危机；苏联在远东力量增强；中国国民政府忙于内战。
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/50">
                <img src={getImagePath("/images/map-bg.jpg")} alt="Context Map" className="w-full h-32 object-cover grayscale hover:grayscale-0 transition-all mb-2 border border-border" />
                <span className="text-[10px] font-mono text-muted-foreground block text-right">FIG 1.1: GEOPOLITICAL MAP 1931</span>
              </div>
            </div>

            {/* Quick Filter */}
            <div className="border-2 border-border bg-card p-6 shadow-brutal">
              <h3 className="font-mono font-bold text-lg uppercase mb-4 border-b-2 border-border pb-2">快速筛选</h3>
              <div className="space-y-2">
                {ARCHIVE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`w-full text-left p-3 border-2 transition-all font-mono text-sm ${
                      activeTab === cat.id
                        ? "border-primary bg-primary/10 text-primary font-bold"
                        : "border-border bg-background hover:bg-secondary/30"
                    }`}
                  >
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Dimensions & Evidence Wall */}
          <div className="lg:col-span-9">
            {/* Event Detail View */}
            {selectedEvent ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <button onClick={() => setSelectedEvent(null)} className="flex items-center gap-2 px-3 py-1.5 border-2 border-border bg-background hover:bg-secondary transition-all font-mono text-xs font-bold shadow-brutal-sm">
                  <ArrowLeft className="w-3 h-3" /> 返回事件列表
                </button>
                <div className="border-2 border-border p-6 md:p-10 bg-card shadow-brutal-lg">
                  <div className="flex flex-wrap gap-3 items-center mb-4">
                    <span className="bg-primary text-primary-foreground font-mono text-xs px-2 py-1">{selectedEvent.year}</span>
                    <span className="bg-secondary font-mono text-xs border border-border px-2 py-1">{ARCHIVE_CATEGORIES.find(c => c.id === selectedEvent.category)?.label}</span>
                    {selectedEvent.tags.map((t,i) => <span key={i} className="text-[10px] font-mono bg-secondary/50 px-2 py-0.5 border border-border/30">#{t}</span>)}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">{selectedEvent.title}</h2>
                  <p className="text-lg text-muted-foreground font-typewriter mb-8 leading-relaxed border-l-4 border-primary pl-4">{selectedEvent.description}</p>
                  {selectedEvent.details && (
                    <div className="space-y-6 mb-8">
                      <div className="bg-secondary/20 p-5 border-l-4 border-amber-600">
                        <h4 className="font-mono font-bold text-amber-700 mb-2 uppercase text-sm">📜 背景前因</h4>
                        <p className="font-serif leading-relaxed">{selectedEvent.details.background}</p>
                      </div>
                      <div className="bg-secondary/20 p-5 border-l-4 border-blue-600">
                        <h4 className="font-mono font-bold text-blue-700 mb-2 uppercase text-sm">⏳ 事件过程</h4>
                        <p className="font-serif leading-relaxed">{selectedEvent.details.process}</p>
                      </div>
                      <div className="bg-secondary/20 p-5 border-l-4 border-emerald-600">
                        <h4 className="font-mono font-bold text-emerald-700 mb-2 uppercase text-sm">⚖️ 结果与影响</h4>
                        <p className="font-serif leading-relaxed">{selectedEvent.details.consequence}</p>
                      </div>
                    </div>
                  )}
                  <div className="pt-4 border-t border-border/50">
                    <h4 className="font-mono font-bold text-sm mb-3">相关引证档案</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.sources.map((s,i) => (
                        <span key={i} className="text-xs bg-secondary/30 px-3 py-1.5 font-mono border border-border/50 flex items-center gap-1.5"><FileText className="w-3 h-3" />{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start bg-transparent border-b-2 border-border p-0 h-auto rounded-none gap-0 mb-8 overflow-x-auto flex-nowrap">
                {ARCHIVE_CATEGORIES.map((tab) => (
                  <TabsTrigger 
                    key={tab.id}
                    value={tab.id}
                    className="flex-1 min-w-[140px] flex flex-col items-start py-4 px-6 rounded-none border-r border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all hover:bg-secondary/50"
                  >
                    <span className="font-bold font-serif text-lg">{tab.label}</span>
                    <span className="text-xs font-mono uppercase opacity-70">{tab.sub}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {ARCHIVE_CATEGORIES.map((cat) => (
                <TabsContent key={cat.id} value={cat.id} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Category Intro */}
                  <div className="bg-secondary/20 border-l-4 border-primary p-6">
                    <h2 className="text-2xl font-bold font-serif mb-2">{cat.label}: {cat.sub}</h2>
                    <p className="text-muted-foreground font-typewriter leading-relaxed">
                      {cat.id === "politics" && "围绕伪满洲国的建立、国际认可与外交博弈，中、日及国际社会展开了激烈的法理与政治斗争。"}
                      {cat.id === "economy" && "日本通过满铁等机构，系统性地掠夺东北的煤铁资源，为其扩张战争提供物资支撑。"}
                      {cat.id === "society" && "伪满洲国推行皇民化、日语教育等文化同化政策，遭到中国民众的坚决抵抗。"}
                      {cat.id === "military" && "东北抗日联军在长白山等地坚持游击战争，与日本占领军展开长期对抗。"}
                    </p>
                  </div>

                  {/* Events Timeline */}
                  <div>
                    <h3 className="font-mono font-bold text-xl uppercase mb-6 flex items-center gap-2">
                      <Database className="w-5 h-5" /> 事件档案 ({categoryEvents.length})
                    </h3>

                    <div className="space-y-6 relative pl-8 border-l-2 border-border/30">
                      {categoryEvents.map((event, idx) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="relative"
                        >
                          <div className="absolute -left-[41px] top-0 w-5 h-5 bg-primary border-4 border-background rounded-full"></div>
                          <div 
                            className="border-2 border-border bg-card p-6 shadow-brutal hover:shadow-brutal-lg hover:border-primary transition-all cursor-pointer group"
                            onClick={() => event.details && setSelectedEvent(event)}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="text-xl font-bold font-serif flex-1 group-hover:text-primary transition-colors">{event.title}</h4>
                              <span className="text-xs font-mono bg-secondary px-2 py-1 ml-2 border border-border/50">
                                {event.year}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground font-typewriter mb-4 leading-relaxed">
                              {event.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {event.tags.map((tag, i) => (
                                <span key={i} className="text-[10px] font-mono bg-secondary px-2 py-1 border border-border/50 cursor-pointer hover:border-primary hover:text-primary transition-colors">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            <div className="pt-4 border-t border-border/50">
                              <p className="text-xs font-mono text-muted-foreground mb-2">档案来源:</p>
                              <div className="flex flex-wrap gap-1">
                                {event.sources.map((source, i) => (
                                  <span key={i} className="text-[10px] font-mono bg-secondary/50 px-1.5 py-0.5 border border-border/30">
                                    {source}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
