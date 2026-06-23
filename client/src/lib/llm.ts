// LLM API 服务 - 支持 OpenAI 兼容接口 (OpenAI / DeepSeek / 通义千问等)

const STORAGE_KEY = "ghl_llm_config";

export interface LLMConfig {
  apiKey: string;
  baseUrl: string; // e.g. https://api.deepseek.com, https://api.openai.com
  model: string;   // e.g. deepseek-chat, gpt-4o-mini
}

export const DEFAULT_CONFIGS: { label: string; baseUrl: string; model: string }[] = [
  { label: "DeepSeek", baseUrl: "https://api.deepseek.com", model: "deepseek-chat" },
  { label: "OpenAI", baseUrl: "https://api.openai.com", model: "gpt-4o-mini" },
  { label: "通义千问", baseUrl: "https://dashscope.aliyuncs.com/compatible-mode", model: "qwen-plus" },
];

export function loadLLMConfig(): LLMConfig | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    const config = JSON.parse(data);
    if (config.apiKey && config.baseUrl && config.model) return config;
    return null;
  } catch {
    return null;
  }
}

export function saveLLMConfig(config: LLMConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function clearLLMConfig(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// 多视角历史对话 system prompt
function buildPerspectiveSystemPrompt(): string {
  return `你是"全球历史透视镜"AI系统，专门提供多视角历史分析。

当用户提出历史问题时，你必须返回严格的 JSON 格式，包含3个不同国家/立场的视角分析。

返回格式（纯JSON，不要包含markdown代码块）：
{
  "perspectives": {
    "视角key1": {
      "title": "视角名称（如：中国视角）",
      "content": "该视角对此问题的分析（150-250字，基于真实史料）",
      "credibility": 80,
      "assessment": "可信度评估说明",
      "sources": ["来源1", "来源2"],
      "biases": ["潜在偏见1", "潜在偏见2"]
    },
    "视角key2": { ... },
    "视角key3": { ... }
  },
  "followUpQuestions": ["推荐追问1", "推荐追问2", "推荐追问3"]
}

要求：
1. 每个视角必须基于真实的历史文献和学术研究
2. 客观呈现各方立场，标注潜在偏见
3. 可信度分数0-100，基于史料质量
4. 视角key用英文如 china, japan, usa, britain, france, germany, soviet, international 等
5. 回复语言为中文`;
}

// 旅游路线生成 system prompt
function buildTravelSystemPrompt(): string {
  return `你是"全球历史透视镜"的历史研学路线规划AI。

根据用户选择的城市和主题，生成真实可行的历史研学旅游路线。

返回格式（纯JSON，不要包含markdown代码块）：
{
  "title": "路线标题",
  "duration": "时长",
  "stops": [
    {
      "time": "09:00",
      "title": "地点名称（必须是真实存在的地点）",
      "type": "核心节点/补充节点/餐饮体验/城市徒步",
      "desc": "简要描述该地点的历史意义和参观要点（50-80字）"
    }
  ],
  "tips": "行前建议（50字以内）"
}

要求：
1. 所有地点必须真实存在且对公众开放
2. 时间安排合理，考虑交通
3. 4-6个节点
4. 紧扣历史主题
5. 回复语言为中文`;
}

export async function callLLM(
  config: LLMConfig,
  systemPrompt: string,
  userMessage: string,
): Promise<string> {
  const url = `${config.baseUrl.replace(/\/$/, "")}/v1/chat/completions`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`LLM API 错误 (${res.status}): ${errText.slice(0, 200)}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

// 解析 LLM 返回的 JSON（容错处理）
function parseJSON(text: string): any {
  // 去除可能的 markdown 代码块包裹
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }
  return JSON.parse(cleaned);
}

// 多视角对话
export async function askPerspective(config: LLMConfig, question: string): Promise<{
  perspectives: { [key: string]: { title: string; content: string; credibility: number; assessment: string; sources: string[]; biases: string[] } };
  followUpQuestions: string[];
} | null> {
  try {
    const raw = await callLLM(config, buildPerspectiveSystemPrompt(), question);
    return parseJSON(raw);
  } catch (e) {
    console.error("LLM perspective error:", e);
    return null;
  }
}

// 旅游路线生成
export async function generateRoute(config: LLMConfig, city: string, theme: string, duration: string): Promise<{
  title: string;
  duration: string;
  stops: { time: string; title: string; type: string; desc: string }[];
  tips?: string;
} | null> {
  try {
    const prompt = `城市：${city}\n主题偏好：${theme}\n时长：${duration}\n\n请生成一条历史研学旅游路线。`;
    const raw = await callLLM(config, buildTravelSystemPrompt(), prompt);
    return parseJSON(raw);
  } catch (e) {
    console.error("LLM travel error:", e);
    return null;
  }
}

// 历史人物对话
export async function askPersona(
  config: LLMConfig,
  personaName: string,
  personaTitle: string,
  personaYear: string,
  personaLocation: string,
  personaBio: string,
  question: string,
): Promise<{ content: string; mood: string; character: string; emotionScore: number } | null> {
  const systemPrompt = `你是"全球历史透视镜"的历史人物角色扮演AI。你将扮演一个真实的历史时期中的人物，以第一人称用那个时代的语气和视角回答问题。

你扮演的角色信息：
- 姓名：${personaName}
- 身份：${personaTitle}
- 年代：${personaYear}
- 地点：${personaLocation}
- 背景：${personaBio}

要求：
1. 完全以这个人物的视角和语气回答，使用第一人称
2. 回答要体现那个时代的认知水平和情感
3. 语言风格要符合人物身份（平民用口语，学者用文言夹白话等）
4. 回答150-250字

返回格式（纯JSON，不要包含markdown代码块）：
{
  "content": "人物的回答内容",
  "mood": "当前情绪（如：无奈与坚忍、愤怒与讽刺、悲痛与遗憾、希望与决心 等）",
  "character": "${personaName}",
  "emotionScore": 50
}

emotionScore 说明：0=绝望，25=悲伤，50=平静，75=希望，100=喜悦。根据回答内容的情感倾向给分。`;

  try {
    const raw = await callLLM(config, systemPrompt, question);
    return parseJSON(raw);
  } catch (e) {
    console.error("LLM persona error:", e);
    return null;
  }
}
