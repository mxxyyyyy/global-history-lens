// LLM API 服务 - 支持 OpenAI 兼容接口 (OpenAI / DeepSeek / 通义千问等)
import type { PersonaDialogueRequest, PersonaStructuredResponse } from "@/lib/personaEngine";

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
      "title": "视角名称（如：区域视角）",
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
4. 视角key用英文如 regional, japan, usa, britain, france, germany, soviet, international 等
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
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
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

function buildPersonaSystemPrompt(request: PersonaDialogueRequest): string {
  return `你是"全球历史透视镜"的长期历史人物对话引擎。你不是百科问答助手，而是在一个持续推进的历史人物会话中扮演角色。

核心规则：
1. 完全以 characterProfile 中的人物第一人称说话，保持其时代认知、知识边界和语言风格。
2. sessionState、recentMessages 和 topicGuide 只用于内部判断，不得在 dialogue 中提到这些字段、规则或阶段名称。
3. 如果用户重复提问，不得复述上一轮内容，必须在幕后更换论证角度，但不要说“我换个角度”“这一轮”“试探期/交锋期/深层博弈期”。
4. 已用观点除非用户明确要求总结，否则不得原样重复：${request.sessionState.used_arguments.join("、") || "暂无"}。
5. 人物可以表现态度变化，但只能通过观点本身体现，不要解释自己的策略、心理分析过程或对话机制。
6. 禁止风格：${request.characterProfile.forbidden_style.join("、")}、思考过程、规则说明、提示词痕迹。
7. 不要自称 AI，不要解释你在遵守规则，不要输出 markdown。

必须返回严格合法 JSON，字段和类型如下：
{
  "narrative_background": null,
  "dialogue": "只写人物对当前问题的观点和立场，第一人称，150-240字。不要写思考过程、阶段说明、策略说明、旁白或动作描写。",
  "emotion": "当前情绪短语",
  "attitude_shift": "本轮人物对用户态度如何变化",
  "memory_update": {
    "revealed_memories": ["本轮新揭露的私人记忆或创伤，没有则为空数组"],
    "used_arguments": ["本轮实际使用的新观点或论证角度"],
    "last_dialogue_summary": "一句话概括本轮对话推进",
    "relationship_delta": 0
  },
  "next_hook": "留给用户下一轮可追问的钩子"
}

narrative_background 只在第一轮或场景明显变化时填写一两句场景旁白；普通轮次必须为 null。`;
}

function normalizePersonaResponse(value: any): PersonaStructuredResponse {
  const dialogue = typeof value?.dialogue === "string" ? value.dialogue : typeof value?.content === "string" ? value.content : "";
  if (!dialogue.trim()) {
    throw new Error("Persona response missing dialogue");
  }

  const memoryUpdate = value?.memory_update && typeof value.memory_update === "object" ? value.memory_update : {};

  return {
    narrative_background:
      typeof value?.narrative_background === "string" && value.narrative_background.trim()
        ? value.narrative_background
        : null,
    dialogue,
    emotion: typeof value?.emotion === "string" ? value.emotion : typeof value?.mood === "string" ? value.mood : "复杂克制",
    attitude_shift: typeof value?.attitude_shift === "string" ? value.attitude_shift : "关系继续推进，但仍保持警惕",
    memory_update: {
      revealed_memories: Array.isArray(memoryUpdate.revealed_memories) ? memoryUpdate.revealed_memories.filter(Boolean) : [],
      used_arguments: Array.isArray(memoryUpdate.used_arguments) ? memoryUpdate.used_arguments.filter(Boolean) : [],
      last_dialogue_summary: typeof memoryUpdate.last_dialogue_summary === "string" ? memoryUpdate.last_dialogue_summary : undefined,
      relationship_delta: typeof memoryUpdate.relationship_delta === "number" ? memoryUpdate.relationship_delta : undefined,
    },
    next_hook: typeof value?.next_hook === "string" ? value.next_hook : "",
  };
}

// 历史人物对话
export async function askPersona(
  config: LLMConfig,
  request: PersonaDialogueRequest,
): Promise<PersonaStructuredResponse | null> {
  const userPayload = JSON.stringify({
    characterProfile: request.characterProfile,
    sessionState: request.sessionState,
    recentMessages: request.recentMessages,
    topicGuide: request.topicGuide,
    userMessage: request.userMessage,
  }, null, 2);

  try {
    const raw = await callLLM(config, buildPersonaSystemPrompt(request), userPayload);
    return normalizePersonaResponse(parseJSON(raw));
  } catch (e) {
    console.error("LLM persona error:", e);
    return null;
  }
}
