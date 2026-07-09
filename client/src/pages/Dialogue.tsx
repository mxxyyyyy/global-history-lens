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
import { ALL_PERSPECTIVES } from "@/data/perspectiveCredibility";
import { createDialogueRecord, saveDialogueHistory, loadDialogueHistory } from "@/data/dialogueHistory";
import { loadLLMConfig, askPerspective, askPersona, type LLMConfig } from "@/lib/llm";
import { createContext, generateLocalResponse, type ConversationContext } from "@/lib/personaEngine";
import { useLanguage } from "@/contexts/LanguageContext";

// 根据专题生成建议问题
const TOPIC_QUESTIONS: { [topicId: string]: string[] } = {
  meiji: ["明治维新为什么能够成功？", "快速现代化如何重塑日本社会？", "国家主导的现代化付出了哪些代价？"],
  french_revolution: ["法国大革命的根本原因是什么？", "恐怖统治是否不可避免？", "革命理想如何传播到法国之外？"],
  cold_war: ["柏林墙为什么能存在那么久？", "古巴导弹危机为什么没有引发核战争？", "冷战是如何结束的？"],
  american_revolution: ["美国革命的原因是什么？", "革命如何重新定义自由？", "外国盟友为什么重要？"],
  industrial_revolution: ["工业化为什么首先发生在英国？", "谁从工业革命中受益？", "铁路如何改变社会？"],
  ww1: ["谁应为第一次世界大战负责？", "堑壕战为什么如此惨烈？", "凡尔赛体系是否埋下了下一场战争的种子？"],
  age_of_exploration: ["大航海时代是发现还是征服？", "海洋帝国如何改变全球贸易？", "哥伦布大交换带来了什么影响？"],
  american_civil_war: ["美国内战的根本原因是什么？", "解放奴隶如何改变战争性质？", "重建时期为什么持续存在争议？"],
  black_death: ["黑死病如何改变中世纪社会？", "瘟疫之后公共卫生观念为何改变？", "不同群体如何解释灾难？"],
  cuban_missile_crisis: ["古巴导弹危机为什么会升级？", "各国领导人如何避免核战争？", "危机之后各方学到了什么？"],
};

const TOPIC_QUESTIONS_EN: { [topicId: string]: string[] } = {
  meiji: ["Why did the Meiji Restoration succeed?", "How did rapid modernization reshape Japanese society?", "What costs came with Japan's state-led modernization?"],
  french_revolution: ["What caused the French Revolution?", "Was the Terror inevitable?", "How did revolutionary ideals spread beyond France?"],
  cold_war: ["Why did the Berlin Wall last so long?", "How did the Cuban Missile Crisis avoid nuclear war?", "What ended the Cold War?"],
  american_revolution: ["What caused the American Revolution?", "How did the revolution define liberty?", "Why did foreign alliances matter?"],
  industrial_revolution: ["Why did industrialization begin in Britain?", "Who benefited from industrialization?", "How did railways change society?"],
  ww1: ["Who bears responsibility for World War I?", "Why was trench warfare so destructive?", "Did Versailles make another war more likely?"],
  age_of_exploration: ["Was the Age of Exploration discovery or conquest?", "How did maritime empires change global trade?", "What was the Columbian Exchange?"],
  american_civil_war: ["What caused the American Civil War?", "How did emancipation change the war?", "Why did Reconstruction remain contested?"],
  black_death: ["How did plague transform medieval society?", "Why did public health ideas change after plague?", "How did communities explain catastrophe?"],
  cuban_missile_crisis: ["Why did the Cuban Missile Crisis escalate?", "How did leaders avoid nuclear war?", "What did each side learn from the crisis?"],
};

const SUGGESTED_QUESTIONS = [
  "法国大革命的根本原因是什么？",
  "谁从工业革命中受益？",
  "古巴导弹危机为什么没有引发核战争？",
  "大航海时代是发现还是征服？",
];

const SUGGESTED_QUESTIONS_EN = [
  "What caused the French Revolution?",
  "Who benefited from the Industrial Revolution?",
  "How did the Cuban Missile Crisis avoid nuclear war?",
  "Was the Age of Exploration discovery or conquest?",
];

const PERSONA_SUGGESTED_QUESTIONS: string[] = [];

const PERSONA_SUGGESTED_QUESTIONS_EN: string[] = [];

function getResponseForQuestion(question: string) {
  const normalized = question.toLowerCase();
  const allTopicQuestions: { [topicId: string]: string[] } = {};
  const topicIds = Object.keys(TOPIC_QUESTIONS).concat(
    Object.keys(TOPIC_QUESTIONS_EN).filter((topicId) => !TOPIC_QUESTIONS[topicId])
  );
  topicIds.forEach((topicId) => {
    allTopicQuestions[topicId] = [
      ...(TOPIC_QUESTIONS[topicId] || []),
      ...(TOPIC_QUESTIONS_EN[topicId] || []),
    ];
  });
  for (const [topicId, questions] of Object.entries(allTopicQuestions)) {
    if (questions.some((q) => q.toLowerCase() === normalized)) {
      const perspectives = ALL_PERSPECTIVES[topicId];
      if (!perspectives) return null;
      const result: any = {};
      Object.keys(perspectives).forEach((key) => {
        result[key] = {
          title: perspectives[key].title,
          content: perspectives[key].content,
          source: perspectives[key].sources[0]?.title || "",
          tags: perspectives[key].biasIndicators.slice(0, 2),
        };
      });
      return { response: result, topicId, perspectives };
    }
  }
  const topicKeywords: { [key: string]: string[] } = {
    meiji: ["meiji", "restoration", "modernization", "japan", "明治", "维新", "现代化", "日本"],
    french_revolution: ["french revolution", "france", "terror", "robespierre", "napoleon", "法国大革命", "恐怖统治", "罗伯斯庇尔", "拿破仑"],
    cold_war: ["cold war", "berlin wall", "cuban missile", "nuclear", "soviet", "冷战", "柏林墙", "古巴导弹", "核战争"],
    american_revolution: ["american revolution", "independence", "boston", "washington", "constitution", "美国革命", "独立战争", "波士顿", "宪法"],
    industrial_revolution: ["industrial revolution", "steam", "factory", "railway", "workers", "工业革命", "蒸汽", "工厂", "铁路", "工人"],
    ww1: ["world war i", "ww1", "versailles", "trench", "sarajevo", "一战", "第一次世界大战", "凡尔赛", "堑壕", "萨拉热窝"],
    age_of_exploration: ["exploration", "columbus", "atlantic", "maritime", "columbian exchange", "大航海", "哥伦布", "海洋帝国"],
    american_civil_war: ["civil war", "emancipation", "lincoln", "confederacy", "美国内战", "解放奴隶", "林肯"],
    black_death: ["black death", "plague", "pandemic", "medieval", "黑死病", "瘟疫", "中世纪"],
    cuban_missile_crisis: ["cuban missile", "cuba", "kennedy", "khrushchev", "古巴导弹", "古巴", "肯尼迪", "赫鲁晓夫"],
    decolonization: ["decolonization", "independence movement", "colonial empire", "非殖民化", "独立运动", "殖民帝国"],
    korean_war: ["korean war", "korea", "panmunjom", "armistice", "朝鲜战争", "半岛", "板门店", "停战"],
    mongol_empire: ["mongol", "steppe", "eurasia", "khan", "蒙古", "草原", "欧亚", "汗国"],
    reformation: ["reformation", "luther", "protestant", "catholic", "宗教改革", "路德", "新教", "天主教"],
    renaissance: ["renaissance", "humanism", "florence", "leonardo", "文艺复兴", "人文主义", "佛罗伦萨"],
    roman_empire: ["roman", "rome", "empire", "republic", "罗马", "罗马帝国", "共和国"],
    russian_revolution: ["russian revolution", "bolshevik", "lenin", "soviet", "俄国革命", "布尔什维克", "列宁", "苏维埃"],
    slave_trade: ["slave trade", "abolition", "atlantic slavery", "奴隶贸易", "废奴", "大西洋奴隶制"],
    ww2: ["world war ii", "ww2", "second world war", "axis", "allies", "二战", "第二次世界大战", "轴心国", "同盟国"],
  };

  let matchedTopic: string | null = null;
  for (const [topicId, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some((kw) => normalized.includes(kw))) {
      matchedTopic = topicId;
      break;
    }
  }

  if (!matchedTopic) return null;
  const perspectives = ALL_PERSPECTIVES[matchedTopic];
  if (!perspectives) return null;

  const result: any = {};
  Object.keys(perspectives).forEach((key) => {
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
  const { language, t } = useLanguage();
  const topicQuestions = language === "en" ? TOPIC_QUESTIONS_EN : TOPIC_QUESTIONS;
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("perspective"); // 'perspective' or 'persona'
  const [selectedPersona, setSelectedPersona] = useState<HistoricalPersona | null>(HISTORICAL_PERSONAS[0] ?? null);
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
    if (newMode === 'persona' && HISTORICAL_PERSONAS.length === 0) return;
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
    if (confirm(t('确定要清空当前对话吗?', 'Clear this conversation?'))) {
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
              {mode === 'perspective' ? t('AI多视角历史对话系统', 'AI Multi-perspective History Dialogue') : t('历史人物跨时空对话', 'Historical Persona Dialogue')}
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
                  <Users className="w-3 h-3 mr-1 hidden md:inline" /> {t('多视角', 'Perspectives')}
                </TabsTrigger>
                <TabsTrigger value="persona" disabled={HISTORICAL_PERSONAS.length === 0} className="rounded-none data-[state=active]:bg-amber-600 data-[state=active]:text-white font-mono text-[10px] md:text-xs px-1 md:px-3">
                  <User className="w-3 h-3 mr-1 hidden md:inline" /> {t('人物', 'Personas')}
                </TabsTrigger>
              </TabsList>
          </Tabs>
          <Button variant="outline" size="icon" className="w-8 h-8 md:w-auto md:h-auto md:px-3 md:py-1.5 font-mono text-xs border-2 border-border rounded-none" onClick={() => setChatHistory([])}>
            <RotateCcw className="w-3 h-3 md:mr-1" /><span className="hidden md:inline">{t('重置', 'Reset')}</span>
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
              {showSidebar ? t('✕ 关闭', 'Close') : t('☰ 人物', 'Personas')}
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
                  {mode === 'perspective' ? t('探索历史的多重面相', 'Explore History From Multiple Angles') : t('倾听历史亲历者的声音', 'Hear the Voices of Historical Witnesses')}
                </h2>
                <p className="text-base text-muted-foreground font-typewriter mb-8 max-w-2xl mx-auto leading-relaxed">
                  {mode === 'perspective' ? t('从不同国家、不同立场的档案中发掘历史真相，培养批判性思维。', 'Compare archives, nations, and standpoints to see how historical truth is argued, not simply received.') : t('与历史人物进行对话，感受大时代背景下的个人命运与抉择。', 'Speak with historical personas and see how private choices were shaped by public crisis.')}
                </p>
                
                {(mode === 'perspective' || selectedPersona) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
                    {(mode === 'perspective'
                      ? language === 'en' ? SUGGESTED_QUESTIONS_EN : SUGGESTED_QUESTIONS
                      : language === 'en' ? PERSONA_SUGGESTED_QUESTIONS_EN : PERSONA_SUGGESTED_QUESTIONS
                    ).map((q, i) => (
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
                                  <h3 className="font-mono font-bold text-sm mb-2">{t('暂未找到精确匹配的历史专题', 'No exact case match yet')}</h3>
                                  <p className="text-sm text-muted-foreground font-typewriter leading-relaxed">
                                    {t(`您的问题"${msg.content._query}"很有价值。我们的档案库目前覆盖以下10个专题，请尝试相关问题：`, `Your question "${msg.content._query}" is valuable. Try one of the covered case questions below:`)}
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                                {Object.entries(topicQuestions).slice(0, 6).map(([tid, questions]) => (
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
                                const flags: { [k: string]: string } = { japan: "JP", international: "INT", britain: "UK", france: "FR", usa: "US", soviet: "SU", german: "DE", western: "WEST", central_asia: "CA", american: "US", british: "UK", workers: "LAB", colonial: "COL", allied: "ALL", european: "EU", indigenous: "IND" };
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
                                            <span className="font-mono font-bold text-foreground">{t('主要来源：', 'Primary source: ')}</span>
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
              <AlertCircle className="w-3 h-3" /> {t('AI调用失败', 'AI request failed')}: {llmError} {t('（已降级为本地数据）', '(using local data instead)')}
              <button onClick={() => setLlmError(null)} className="ml-auto hover:underline">{t('关闭', 'Close')}</button>
            </div>
          )}

          {/* 追问建议 - 放在保存按钮上方 */}
          {chatHistory.length > 0 && !isLoading && (() => {
            const lastBot = [...chatHistory].reverse().find(m => m.type === 'bot');
            if (mode === 'perspective') {
              const llmFollowUp = lastBot?.content?._followUp || [];
              const localQuestions = lastTopicId ? (topicQuestions[lastTopicId] || []) : [];
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
                {t('保存到历史', 'Save to history')}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 h-8 text-xs font-mono rounded-none border-2 border-border"
                onClick={handleClearChat}
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                {t('清空对话', 'Clear conversation')}
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
                <h3 className="font-bold text-lg font-serif mb-4">{t('保存对话', 'Save Conversation')}</h3>
                <Input
                  placeholder={t("输入对话标题(可选)...", "Add a title (optional)...")}
                  value={saveTitle}
                  onChange={(e) => setSaveTitle(e.target.value)}
                  className="mb-4 h-10 border-2 border-border rounded-none focus-visible:ring-0 focus-visible:border-primary"
                />
                <div className="flex gap-2">
                  <Button
                    className="flex-1 h-9 text-xs font-mono rounded-none bg-primary text-primary-foreground"
                    onClick={handleSaveDialogue}
                  >
                    {t('保存', 'Save')}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 h-9 text-xs font-mono rounded-none border-2 border-border"
                    onClick={() => setShowSaveDialog(false)}
                  >
                    {t('取消', 'Cancel')}
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
                placeholder={mode === 'perspective' ? t("输入历史事件或问题，支持连续追问...", "Ask about a historical event. Follow-up questions are supported...") : t("向历史人物提问...", "Ask a historical persona...")}
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
            {t('对话已保存！可在「对话历史」页面查看。', 'Conversation saved. You can find it in Dialogue History.')}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
