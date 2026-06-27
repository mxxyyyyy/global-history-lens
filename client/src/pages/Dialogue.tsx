import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, RotateCcw, BookOpen, AlertCircle, HelpCircle, User, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonaSelector from "@/components/PersonaSelector";
import EmotionVisualization from "@/components/EmotionVisualization";
import CredibilityAssessment from "@/components/CredibilityAssessment";
import CrossPerspectiveQuestions from "@/components/CrossPerspectiveQuestions";
import LLMSettings from "@/components/LLMSettings";
import { HISTORICAL_PERSONAS, HistoricalPersona } from "@/data/historicalPersonas";
import { ALL_PERSPECTIVES, MANCHUKUO_PERSPECTIVES } from "@/data/perspectiveCredibility";
import { ARCHIVE_TOPICS } from "@/data/historicalEvents";
import { createDialogueRecord, saveDialogueHistory, loadDialogueHistory } from "@/data/dialogueHistory";
import { loadLLMConfig, askPerspective, askPersona, type LLMConfig } from "@/lib/llm";
import { createContext, generateLocalResponse, type ConversationContext } from "@/lib/personaEngine";

// 根据专题生成建议问题
const TOPIC_QUESTIONS: { [topicId: string]: string[] } = {
  manchukuo: ["如何看待1932年伪满洲国的建立？", "东北抗联的斗争有何历史意义？", "伪满时期的经济建设是'现代化'还是'掠夺'？", "五族协和理想与现实的差距如何？"],
  opium_war: ["鸦片战争的根本原因是什么？", "林则徐禁烟是否处理得当？", "《南京条约》如何改变了中国命运？", "英国国内对鸦片战争有何争议？"],
  meiji: ["明治维新为何能成功？", "日本'脱亚入欧'战略的代价是什么？", "甲午战争如何改变了东亚格局？", "中日维新为何一成一败？"],
  french_revolution: ["法国大革命的根源是什么？", "恐怖统治是否是革命的必然？", "《人权宣言》的历史意义何在？", "拿破仑是革命的继承者还是背叛者？"],
  cold_war: ["柏林墙为何能维持28年？", "古巴导弹危机如何避免了核战？", "冷战的终结是否证明了某种制度的优越？", "柏林墙倒塌对东德人意味着什么？"],
  silk_road: ["丝绸之路的本质是贸易还是文化交流？", "粟特人在丝路中扮演什么角色？", "佛教如何沿丝路传入中国？", "为何丝绸之路最终衰落？"],
  american_revolution: ["美国独立的根本原因是什么？", "'人人平等'为何不包括黑人和女性？", "法国为何支持美国独立？", "联邦宪法如何平衡各方利益？"],
  industrial_revolution: ["工业革命为何首先发生在英国？", "工业化对工人阶级意味着什么？", "铁路如何改变了世界？", "殖民地在工业革命中扮演什么角色？"],
  ww1: ["一战爆发谁应负主要责任？", "壕沟战为何如此残酷？", "《凡尔赛条约》是否注定了二战？", "中国参战却为何在和会上被出卖？"],
  age_of_exploration: ["哥伦布'发现'美洲是否准确？", "郑和与哥伦布的航海有何本质区别？", "大西洋奴隶贸易的规模有多大？", "哥伦布大交换如何改变了世界？"],
};

const SUGGESTED_QUESTIONS = [
  "如何看待1932年伪满洲国的建立？",
  "鸦片战争的根本原因是什么？",
  "法国大革命的人权理念为何排斥了黑人和女性？",
  "工业革命的受益者和受害者分别是谁？"
];

const PERSONA_SUGGESTED_QUESTIONS = [
  "您当时为何选择留在东北？",
  "您如何看待当时的'五族协和'口号？",
  "战乱对您的家庭造成了什么影响？",
  "您对未来有什么期望？"
];

// 根据问题匹配专题并返回视角数据
function getResponseForQuestion(question: string) {
  // 匹配关键词到专题
  const topicKeywords: { [key: string]: string[] } = {
    manchukuo: ["伪满", "满洲国", "五族协和", "东北抗联", "抗日联军", "九一八"],
    opium_war: ["鸦片", "林则徐", "南京条约", "虎门销烟", "通商"],
    meiji: ["明治", "维新", "脱亚入欧", "甲午", "日本现代化"],
    french_revolution: ["法国大革命", "巴士底", "人权宣言", "恐怖统治", "罗伯斯庇尔", "拿破仑"],
    cold_war: ["柏林墙", "冷战", "古巴导弹", "铁幕", "苏联解体"],
    silk_road: ["丝绸之路", "丝路", "张骞", "敦煌", "粟特"],
    american_revolution: ["美国独立", "独立宣言", "波士顿", "华盛顿", "联邦宪法"],
    industrial_revolution: ["工业革命", "蒸汽机", "瓦特", "工厂", "铁路"],
    ww1: ["一战", "凡尔赛", "萨拉热窝", "壕沟战", "五四运动"],
    age_of_exploration: ["航海", "哥伦布", "郑和", "奴隶贸易", "大发现"],
  };

  let matchedTopic = "manchukuo"; // 默认
  for (const [topicId, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some((kw) => question.includes(kw))) {
      matchedTopic = topicId;
      break;
    }
  }

  const perspectives = ALL_PERSPECTIVES[matchedTopic];
  if (!perspectives) return null;

  const keys = Object.keys(perspectives);
  const result: any = {};
  keys.forEach((key) => {
    result[key] = {
      title: perspectives[key].title,
      content: perspectives[key].content,
      source: perspectives[key].sources[0]?.title || "",
      tags: perspectives[key].biasIndicators.slice(0, 2),
    };
  });
  return { response: result, topicId: matchedTopic, perspectives };
}

export default function Dialogue() {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("perspective"); // 'perspective' or 'persona'
  const [selectedPersona, setSelectedPersona] = useState<HistoricalPersona | null>(HISTORICAL_PERSONAS[0]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveTitle, setSaveTitle] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [lastTopicId, setLastTopicId] = useState<string | null>(null);
  const [llmConfig, setLlmConfig] = useState<LLMConfig | null>(loadLLMConfig());
  const [llmError, setLlmError] = useState<string | null>(null);
  const [personaContext, setPersonaContext] = useState<ConversationContext | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const lastMsgRef = useRef<HTMLDivElement>(null);

  // Auto-scroll: bot reply → scroll so user's question + reply top are visible
  useEffect(() => {
    if (!scrollAreaRef.current) return;
    const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement | null;
    if (!viewport) return;

    const lastMsg = chatHistory[chatHistory.length - 1];
    if (lastMsg?.type === 'bot' && lastMsgRef.current) {
      // 计算 bot 回复在滚动容器内的偏移，往上多留一点空间显示用户消息
      setTimeout(() => {
        const refTop = lastMsgRef.current!.offsetTop;
        // 往上偏移80px让用户能看到自己发的消息
        viewport.scrollTo({ top: Math.max(0, refTop - 80), behavior: 'smooth' });
      }, 150);
    }
  }, [chatHistory, isLoading]);

  const handleSearch = async (text: string) => {
    if (!text.trim()) return;
    
    setChatHistory(prev => [...prev, { type: 'user', content: text, mode: mode }]);
    setQuery("");
    setIsLoading(true);
    setLlmError(null);

    if (mode === 'perspective' && llmConfig) {
      // LLM 模式 - 调用真实 AI
      try {
        const result = await askPerspective(llmConfig, text);
        if (result?.perspectives) {
          const llmData: any = {};
          Object.entries(result.perspectives).forEach(([key, p]) => {
            llmData[key] = {
              title: p.title,
              content: p.content,
              source: p.sources?.[0] || "",
              tags: p.biases || [],
            };
          });
          const response = { _data: llmData, _topicId: "llm", _llm: true, _followUp: result.followUpQuestions || [] };
          setChatHistory(prev => [...prev, { type: 'bot', content: response, mode: mode }]);
        } else {
          throw new Error("AI 返回格式异常");
        }
      } catch (e: any) {
        setLlmError(e.message || "AI 调用失败");
        // 降级到本地数据
        const localResult = getResponseForQuestion(text);
        if (localResult) {
          setChatHistory(prev => [...prev, { type: 'bot', content: { _data: localResult.response, _topicId: localResult.topicId }, mode: mode }]);
          setLastTopicId(localResult.topicId);
        }
      }
      setIsLoading(false);
      return;
    }

    // 人物对话 LLM 模式
    if (mode === 'persona' && llmConfig && selectedPersona) {
      try {
        const result = await askPersona(
          llmConfig,
          selectedPersona.name,
          selectedPersona.title,
          selectedPersona.year,
          selectedPersona.location,
          selectedPersona.bio,
          text,
        );
        if (result) {
          setChatHistory(prev => [...prev, { type: 'bot', content: result, mode: mode, persona: selectedPersona }]);
        } else {
          throw new Error("AI 返回格式异常");
        }
      } catch (e: any) {
        setLlmError(e.message || "AI 调用失败");
        // 降级到本地
        const localResp = selectedPersona.responses[text] || selectedPersona.responses[Object.keys(selectedPersona.responses)[0]];
        if (localResp) {
          setChatHistory(prev => [...prev, { type: 'bot', content: localResp, mode: mode, persona: selectedPersona }]);
        }
      }
      setIsLoading(false);
      return;
    }

    // 本地模式 - 原有逻辑
    setTimeout(() => {
      let response: any = null;
      if (mode === 'perspective') {
        const result = getResponseForQuestion(text);
        if (result) {
          response = { _data: result.response, _topicId: result.topicId };
          setLastTopicId(result.topicId);
        } else if (lastTopicId) {
          const perspectives = ALL_PERSPECTIVES[lastTopicId];
          if (perspectives) {
            const keys = Object.keys(perspectives);
            const followUpData: any = {};
            keys.forEach((key) => {
              const p = perspectives[key];
              const relevantSource = p.sources.find((s: any) =>
                text.split('').some(char => s.excerpt.includes(char)) || true
              );
              followUpData[key] = {
                title: p.title,
                content: `关于"${text.length > 20 ? text.substring(0, 20) + '...' : text}"这个问题，${p.title}认为：${p.credibilityAssessment} 需要特别关注的是：${p.biasIndicators[0] || ''}`,
                source: relevantSource?.title || p.sources[0]?.title || "",
                tags: p.biasIndicators.slice(0, 2),
              };
            });
            response = { _data: followUpData, _topicId: lastTopicId };
          }
        } else {
          response = { _data: null, _noMatch: true, _query: text };
        }
      } else if (selectedPersona) {
        // 本地对话引擎 - 支持多轮对话
        if (personaContext) {
          const result = generateLocalResponse(text, personaContext);
          setPersonaContext(result.context);
          response = {
            content: result.response,
            mood: result.mood,
            emotionScore: result.emotionScore,
            character: selectedPersona.name,
            _followUpHint: result.followUpHint,
          };
        } else {
          // fallback: 旧逻辑
          response = selectedPersona.responses[text] || selectedPersona.responses[Object.keys(selectedPersona.responses)[0]];
        }
      }
      
      if (response) {
        setChatHistory(prev => [...prev, { type: 'bot', content: response, mode: mode, persona: selectedPersona }]);
      }
      setIsLoading(false);
    }, 1500);
  };

  const switchMode = (newMode: string) => {
    setMode(newMode);
    setChatHistory([]);
    setQuery("");
    setIsLoading(false);
    if (newMode === 'persona' && selectedPersona) {
      setPersonaContext(createContext(selectedPersona.id));
    }
  };

  const handleSaveDialogue = () => {
    if (chatHistory.length === 0) return;
    const record = createDialogueRecord(chatHistory, mode as 'perspective' | 'persona', saveTitle || undefined);
    const existingRecords = loadDialogueHistory();
    const allRecords = [...existingRecords, record];
    saveDialogueHistory(allRecords);
    setShowSaveDialog(false);
    setSaveTitle("");
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleClearChat = () => {
    if (confirm('确定要清空当前对话吗?')) {
      setChatHistory([]);
      setQuery("");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background">
      {/* Header */}
      <div className="border-b-2 border-border px-3 py-2 bg-secondary/30 shrink-0">
        <div className="flex justify-between items-center">
          <div className="min-w-0">
            <h1 className="font-mono text-sm md:text-lg font-bold uppercase flex items-center gap-2 truncate">
              <span className={`w-2.5 h-2.5 inline-block animate-pulse shrink-0 ${mode === 'perspective' ? 'bg-primary' : 'bg-amber-600'}`}></span>
              {mode === 'perspective' ? 'AI多视角历史对话系统' : '历史人物跨时空对话'}
            </h1>
            <p className="text-[10px] text-muted-foreground font-typewriter mt-0.5 hidden md:block">
              {mode === 'perspective' ? 'Multi-Perspective Historical Dialogue System v1.0' : 'Historical Persona Dialogue Interface v2.0'}
            </p>
          </div>
          <div className="flex gap-1.5 items-center shrink-0">
            <LLMSettings onConfigChange={setLlmConfig} />
            <Tabs value={mode} onValueChange={switchMode}>
              <TabsList className="grid w-[160px] md:w-[240px] grid-cols-2 rounded-none border-2 border-border bg-background p-0 h-8 md:h-9">
                <TabsTrigger value="perspective" className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono text-[10px] md:text-xs px-1 md:px-3">
                  <Users className="w-3 h-3 mr-1 hidden md:inline" /> 多视角
                </TabsTrigger>
                <TabsTrigger value="persona" className="rounded-none data-[state=active]:bg-amber-600 data-[state=active]:text-white font-mono text-[10px] md:text-xs px-1 md:px-3">
                  <User className="w-3 h-3 mr-1 hidden md:inline" /> 人物
                </TabsTrigger>
              </TabsList>
          </Tabs>
          <Button variant="outline" size="icon" className="w-8 h-8 md:w-auto md:h-auto md:px-3 md:py-1.5 font-mono text-xs border-2 border-border rounded-none" onClick={() => setChatHistory([])}>
            <RotateCcw className="w-3 h-3 md:mr-1" /><span className="hidden md:inline">重置</span>
          </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Background Texture for Persona Mode */}
        {mode === 'persona' && (
          <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('/images/archive-texture.jpg')] bg-cover bg-center mix-blend-multiply z-0"></div>
        )}

        {/* Sidebar - Persona Selector (only in persona mode) */}
        {mode === 'persona' && (
          <>
            {/* Mobile toggle button */}
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="md:hidden absolute top-2 left-2 z-30 px-2 py-1 bg-amber-600 text-white text-[10px] font-mono border-2 border-amber-700 shadow-brutal-sm"
            >
              {showSidebar ? '✕ 关闭' : '☰ 人物'}
            </button>

            {/* Sidebar - overlay on mobile, static on desktop */}
            <div className={`
              absolute md:relative z-20
              w-72 md:w-80 h-full
              border-r-2 border-border bg-background/98 md:bg-background/95
              p-3 flex flex-col min-h-0
              transition-transform duration-200
              ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
              <PersonaSelector 
                personas={HISTORICAL_PERSONAS}
                selectedPersona={selectedPersona}
                onSelect={(persona) => {
                  setSelectedPersona(persona);
                  setChatHistory([]);
                  setPersonaContext(createContext(persona.id));
                  setShowSidebar(false); // 移动端选择后自动关闭
                }}
              />
            </div>

            {/* Mobile backdrop */}
            {showSidebar && (
              <div className="md:hidden absolute inset-0 bg-black/30 z-10" onClick={() => setShowSidebar(false)} />
            )}
          </>
        )}

        {/* Chat Area */}
        <div className="flex-1 flex flex-col w-full z-10 min-h-0">
          <ScrollArea className="flex-1 min-h-0" ref={scrollAreaRef}>
            {chatHistory.length === 0 ? (
              <div className="min-h-[calc(100vh-15rem)] flex flex-col items-center justify-center text-center opacity-70 p-4 md:p-8">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 border-2 border-border border-dashed ${mode === 'perspective' ? 'bg-secondary' : 'bg-amber-100'}`}>
                  {mode === 'perspective' ? (
                    <HelpCircle className="w-10 h-10 text-muted-foreground" />
                  ) : (
                    <User className="w-10 h-10 text-amber-700" />
                  )}
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 text-center">
                  {mode === 'perspective' ? '探索历史的多重面相' : '倾听历史亲历者的声音'}
                </h2>
                <p className="text-base text-muted-foreground font-typewriter mb-8 max-w-2xl mx-auto leading-relaxed">
                  {mode === 'perspective' ? '从不同国家、不同立场的档案中发掘历史真相，培养批判性思维。' : '与历史人物进行对话，感受大时代背景下的个人命运与抉择。'}
                </p>
                
                {(mode === 'perspective' || selectedPersona) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
                    {(mode === 'perspective' ? SUGGESTED_QUESTIONS : PERSONA_SUGGESTED_QUESTIONS).map((q, i) => (
                      <button 
                        key={i}
                        onClick={() => handleSearch(q)}
                        className={`text-left p-3 border border-border bg-card hover:bg-secondary transition-all font-mono text-xs shadow-sm hover:shadow-md group ${mode === 'perspective' ? 'hover:border-primary' : 'hover:border-amber-600'}`}
                      >
                        <span className={`font-bold mr-2 group-hover:opacity-80 ${mode === 'perspective' ? 'text-primary' : 'text-amber-700'}`}>&gt;</span> {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-8 pb-10 p-4 md:p-8 max-w-[1500px] mx-auto w-full">
                {chatHistory.map((msg, idx) => (
                  <div key={idx} ref={msg.type === 'bot' && idx === chatHistory.length - 1 ? lastMsgRef : undefined} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.type === 'user' ? (
                      <div className={`${mode === 'perspective' ? 'bg-primary' : 'bg-amber-700'} text-primary-foreground p-4 max-w-[70%] shadow-brutal-sm font-serif text-sm md:text-base rounded-sm leading-relaxed`}>
                        {msg.content}
                      </div>
                    ) : (
                      <div className="w-full space-y-4">
                        {msg.mode === 'perspective' ? (
                          // Perspective Mode Response - Dynamic
                          msg.content._noMatch ? (
                            // 无法匹配专题的引导性回复
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="border-2 border-border bg-card p-6 shadow-brutal"
                            >
                              <div className="flex items-start gap-3 mb-4">
                                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                <div>
                                  <h3 className="font-mono font-bold text-sm mb-2">暂未找到精确匹配的历史专题</h3>
                                  <p className="text-sm text-muted-foreground font-typewriter leading-relaxed">
                                    您的问题"{msg.content._query}"很有价值。我们的档案库目前覆盖以下10个专题，请尝试相关问题：
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                                {Object.entries(TOPIC_QUESTIONS).slice(0, 6).map(([tid, questions]) => (
                                  <button
                                    key={tid}
                                    onClick={() => handleSearch(questions[0])}
                                    className="text-left p-2 border border-border bg-secondary/30 hover:bg-secondary hover:border-primary transition-all text-xs font-mono group"
                                  >
                                    <span className="text-primary font-bold group-hover:underline">&gt;</span> {questions[0]}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          ) : msg.content._data ? (
                          <>
                            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 items-start">
                              {Object.keys(msg.content._data).map((key, pIdx) => {
                                const perspective = msg.content._data[key];
                                const flags: { [k: string]: string } = { china: "🇨🇳", japan: "🇯🇵", international: "🌍", britain: "🇬🇧", france: "🇫🇷", usa: "🇺🇸", soviet: "🇷🇺", german: "🇩🇪", western: "🌐", central_asia: "🏔️", american: "🇺🇸", british: "🇬🇧", workers: "⚒️", colonial: "🌍", allied: "🤝", chinese: "🇨🇳", european: "🇪🇺", indigenous: "🏛️" };
                                const flag = flags[key] || "📜";
                                const topicId = msg.content._topicId;
                                const fullPerspective = topicId && ALL_PERSPECTIVES[topicId] ? ALL_PERSPECTIVES[topicId][key] : null;
                                return (
                                  <motion.div 
                                    key={key}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * (pIdx + 1) }}
                                    className="space-y-4"
                                  >
                                    <div className="border-2 border-border bg-card p-0 shadow-brutal hover:shadow-brutal-lg transition-all">
                                      <div className="bg-secondary/50 p-4 border-b-2 border-border">
                                        <h3 className="font-mono font-bold text-base uppercase text-primary leading-snug">{flag} {perspective.title}</h3>
                                      </div>
                                      <div className="p-5 space-y-4">
                                        <p className="font-serif text-base leading-8">{perspective.content}</p>
                                        {perspective.source && (
                                          <div className="border-t border-border/40 pt-3 text-xs font-typewriter text-muted-foreground">
                                            <span className="font-mono font-bold text-foreground">主要来源：</span>
                                            {perspective.source}
                                          </div>
                                        )}
                                        {perspective.tags?.length > 0 && (
                                          <div className="flex flex-wrap gap-2">
                                            {perspective.tags.map((tag: string, tagIndex: number) => (
                                              <span key={tagIndex} className="border border-border/40 bg-secondary/40 px-2 py-1 font-mono text-[10px] text-muted-foreground">
                                                {tag}
                                              </span>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    {fullPerspective && <CredibilityAssessment perspective={fullPerspective} />}
                                  </motion.div>
                                );
                              })}
                            </div>
                            
                            {/* 跨视角推荐问题 */}
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 }}
                            >
                              <CrossPerspectiveQuestions onQuestionSelect={handleSearch} />
                            </motion.div>
                          </>
                          ) : null
                        ) : (
                          // Persona Mode Response
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-4"
                          >
                            {/* 人物对话气泡 */}
                            <div className="flex gap-4 max-w-4xl">
                              <div className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-sm shadow-brutal border-2 border-border ${msg.persona?.avatar_color}`}>
                                {msg.persona?.name.charAt(0)}
                              </div>
                              <div className="flex-1 bg-card border-2 border-border p-4 shadow-brutal relative">
                                {/* Speech Bubble Triangle */}
                                <div className="absolute top-6 -left-2.5 w-4 h-4 bg-card border-l-2 border-b-2 border-border transform rotate-45"></div>
                                
                                <div className="flex justify-between items-baseline mb-3 border-b border-border/50 pb-2">
                                  <h3 className="font-bold font-serif text-sm text-amber-900">{msg.content.character}</h3>
                                  <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5">
                                    {msg.content.mood}
                                  </span>
                                </div>
                                <p className="font-serif text-sm leading-relaxed italic text-foreground/90">
                                  "{msg.content.content}"
                                </p>
                              </div>
                            </div>

                            {/* 情感波动可视化 */}
                            {msg.persona && (
                              <div className="ml-16">
                                <EmotionVisualization 
                                  emotionScore={msg.content.emotionScore || 65}
                                  mood={msg.content.mood}
                                  personaName={msg.persona.name}
                                />
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start mt-4">
                    <div className="space-y-2 w-full">
                      <div className="flex gap-2">
                        <div className="flex-1 h-24 bg-secondary/30 animate-pulse border-2 border-border/20"></div>
                        <div className="flex-1 h-24 bg-secondary/30 animate-pulse border-2 border-border/20"></div>
                        <div className="flex-1 h-24 bg-secondary/30 animate-pulse border-2 border-border/20"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input Area */}
          {/* LLM 错误提示 */}
          {llmError && (
            <div className="px-4 py-2 bg-red-50 border-t border-red-200 text-red-700 text-xs font-mono flex items-center gap-2 shrink-0">
              <AlertCircle className="w-3 h-3" /> AI调用失败: {llmError}（已降级为本地数据）
              <button onClick={() => setLlmError(null)} className="ml-auto hover:underline">关闭</button>
            </div>
          )}

          {/* 追问建议 - 放在保存按钮上方 */}
          {chatHistory.length > 0 && !isLoading && (() => {
            const lastBot = [...chatHistory].reverse().find(m => m.type === 'bot');
            if (mode === 'perspective') {
              const llmFollowUp = lastBot?.content?._followUp || [];
              const localQuestions = lastTopicId ? (TOPIC_QUESTIONS[lastTopicId] || []) : [];
              const questions = (llmFollowUp.length > 0 ? llmFollowUp : localQuestions)
                .filter((q: string) => !chatHistory.some(m => m.type === 'user' && m.content === q))
                .slice(0, 3);
              if (questions.length === 0) return null;
              return (
                <div className="px-4 pt-3 pb-1 border-t border-border/50 bg-secondary/10 shrink-0">
                  <div className="max-w-[1500px] mx-auto flex gap-2 overflow-x-auto">
                    {questions.map((q: string, i: number) => (
                      <button key={i} onClick={() => handleSearch(q)} className="shrink-0 text-xs font-mono px-3 py-1.5 border border-border bg-secondary/50 hover:bg-secondary hover:border-primary transition-all whitespace-nowrap">{q}</button>
                    ))}
                  </div>
                </div>
              );
            } else if (mode === 'persona' && lastBot?.content?._followUpHint) {
              return (
                <div className="px-4 pt-3 pb-1 border-t border-amber-200/30 bg-amber-50/20 shrink-0">
                  <div className="max-w-[1500px] mx-auto flex gap-2 overflow-x-auto">
                    <button onClick={() => handleSearch(lastBot.content._followUpHint)} className="shrink-0 text-xs font-mono px-3 py-1.5 border border-amber-300/50 bg-amber-50/50 hover:bg-amber-100/50 hover:border-amber-400 transition-all whitespace-nowrap text-amber-800">
                      💬 {lastBot.content._followUpHint}
                    </button>
                  </div>
                </div>
              );
            }
            return null;
          })()}

          {/* Save & Clear Buttons */}
          {chatHistory.length > 0 && (
            <div className="px-4 py-2 border-t border-border/50 bg-secondary/20 shrink-0">
              <div className="max-w-[1500px] mx-auto flex gap-2">
              <Button
                size="sm"
                className="flex-1 h-8 text-xs font-mono rounded-none bg-primary text-primary-foreground hover:opacity-90 border-2 border-primary"
                onClick={() => setShowSaveDialog(true)}
              >
                <BookOpen className="w-3 h-3 mr-1" />
                保存到历史
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 h-8 text-xs font-mono rounded-none border-2 border-border"
                onClick={handleClearChat}
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                清空对话
              </Button>
              </div>
            </div>
          )}

          {/* Save Dialog */}
          {showSaveDialog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowSaveDialog(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-background border-2 border-border p-6 max-w-md w-full shadow-brutal"
              >
                <h3 className="font-bold text-lg font-serif mb-4">保存对话</h3>
                <Input
                  placeholder="输入对话标题(可选)..."
                  value={saveTitle}
                  onChange={(e) => setSaveTitle(e.target.value)}
                  className="mb-4 h-10 border-2 border-border rounded-none focus-visible:ring-0 focus-visible:border-primary"
                />
                <div className="flex gap-2">
                  <Button
                    className="flex-1 h-9 text-xs font-mono rounded-none bg-primary text-primary-foreground"
                    onClick={handleSaveDialogue}
                  >
                    保存
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 h-9 text-xs font-mono rounded-none border-2 border-border"
                    onClick={() => setShowSaveDialog(false)}
                  >
                    取消
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}

          <div className="px-4 py-3 border-t-2 border-border bg-background relative shrink-0">
            <div className="relative max-w-[1100px] mx-auto w-full">
              <Input 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isLoading) {
                    e.preventDefault();
                    handleSearch(query);
                  }
                }}
                placeholder={mode === 'perspective' ? "输入历史事件或问题，支持连续追问..." : "向历史人物提问..."}
                disabled={isLoading}
                className={`pr-12 h-12 font-serif text-base border-2 border-border rounded-none focus-visible:ring-0 focus-visible:border-primary bg-background shadow-brutal-sm disabled:opacity-50 ${mode === 'persona' ? 'focus-visible:border-amber-600' : ''}`}
              />
              <Button 
                size="icon" 
                className={`absolute right-1 top-1.5 h-9 w-9 rounded-none text-primary-foreground hover:opacity-90 transition-opacity ${mode === 'perspective' ? 'bg-primary' : 'bg-amber-700'}`}
                onClick={() => handleSearch(query)}
                disabled={isLoading || !query.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 保存成功提示 */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-primary text-primary-foreground px-6 py-3 shadow-brutal border-2 border-primary flex items-center gap-2 font-mono text-sm"
          >
            <BookOpen className="w-4 h-4" />
            对话已保存！可在「对话历史」页面查看。
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
