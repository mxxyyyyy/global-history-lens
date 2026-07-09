import { HISTORICAL_PERSONAS, type PersonaTopicNode } from "@/data/historicalPersonas";

export interface TopicNode {
  id: string;
  keywords: string[];
  response: string;
  mood: string;
  emotionScore: number;
  followUpTopics: string[];
  followUpHint?: string;
}

export interface PersonaKnowledge {
  personaId: string;
  topics: TopicNode[];
  fallbacks: string[];
  greeting: string;
}

export interface ConversationContext {
  personaId: string;
  discussedTopics: string[];
  lastTopicId: string | null;
  turnCount: number;
  currentMood: string;
  currentEmotion: number;
}

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[，。！？、；：“”‘’"'()\[\]{}<>《》\s]/g, "");

function findPersona(personaId: string) {
  return HISTORICAL_PERSONAS.find((persona) => persona.id === personaId) ?? null;
}

function scoreTopic(query: string, topic: PersonaTopicNode) {
  const normalizedQuery = normalize(query);
  const normalizedLabel = normalize(topic.label);
  let score = normalizedQuery.includes(normalizedLabel) ? 8 : 0;

  topic.keywords.forEach((keyword) => {
    const normalizedKeyword = normalize(keyword);
    if (!normalizedKeyword) return;
    if (normalizedQuery.includes(normalizedKeyword)) score += normalizedKeyword.length >= 4 ? 5 : 3;
  });

  return score;
}

function findBestTopic(query: string, topics: PersonaTopicNode[]) {
  const ranked = topics
    .map((topic) => ({ topic, score: scoreTopic(query, topic) }))
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.score > 0 ? ranked[0].topic : null;
}

function findTopicBySeedId(topics: PersonaTopicNode[], seedId: string) {
  return topics.find((topic) => topic.id.endsWith(`-${seedId}`)) ?? null;
}

function pickFallbackTopic(topics: PersonaTopicNode[], context: ConversationContext) {
  if (context.lastTopicId) {
    const lastTopic = topics.find((topic) => topic.id === context.lastTopicId);
    const related = lastTopic?.relatedTopics
      .map((seedId) => findTopicBySeedId(topics, seedId))
      .filter((topic): topic is PersonaTopicNode => Boolean(topic))
      .find((topic) => !context.discussedTopics.includes(topic.id));
    if (related) return related;
  }

  return topics.find((topic) => !context.discussedTopics.includes(topic.id)) ?? topics[0] ?? null;
}

function createFollowUpHint(topic: PersonaTopicNode, topics: PersonaTopicNode[]) {
  const related = topic.relatedTopics
    .map((seedId) => findTopicBySeedId(topics, seedId))
    .find((candidate): candidate is PersonaTopicNode => Boolean(candidate));

  return related ? `继续追问：${related.label}` : undefined;
}

export function createContext(personaId: string): ConversationContext {
  const persona = findPersona(personaId);
  return {
    personaId,
    discussedTopics: [],
    lastTopicId: null,
    turnCount: 0,
    currentMood: persona?.emotion ?? "待进入对话",
    currentEmotion: persona?.emotionScore ?? 50,
  };
}

export function generateLocalResponse(
  query: string,
  context: ConversationContext,
): {
  response: string;
  mood: string;
  emotionScore: number;
  followUpHint?: string;
  context: ConversationContext;
} {
  const persona = findPersona(context.personaId);

  if (!persona || persona.topicNodes.length === 0) {
    return {
      response: "当前档案集中暂未开放历史人物对话。",
      mood: "不可用",
      emotionScore: 50,
      context: {
        ...context,
        turnCount: context.turnCount + 1,
        currentMood: "不可用",
        currentEmotion: 50,
      },
    };
  }

  const exactTopic = findBestTopic(query, persona.topicNodes);
  const selectedTopic = exactTopic ?? pickFallbackTopic(persona.topicNodes, context);
  const isFallback = !exactTopic;

  if (!selectedTopic) {
    return {
      response: persona.sampleLine,
      mood: persona.emotion,
      emotionScore: persona.emotionScore,
      context: {
        ...context,
        turnCount: context.turnCount + 1,
        currentMood: persona.emotion,
        currentEmotion: persona.emotionScore,
      },
    };
  }

  const response = isFallback
    ? `你的问题没有精确命中我的预置话题节点，我先从“${selectedTopic.label}”回应。\n\n${selectedTopic.response}`
    : selectedTopic.response;

  const nextDiscussed = Array.from(new Set([...context.discussedTopics, selectedTopic.id]));

  return {
    response,
    mood: selectedTopic.mood,
    emotionScore: selectedTopic.emotionScore,
    followUpHint: createFollowUpHint(selectedTopic, persona.topicNodes),
    context: {
      ...context,
      discussedTopics: nextDiscussed,
      lastTopicId: selectedTopic.id,
      turnCount: context.turnCount + 1,
      currentMood: selectedTopic.mood,
      currentEmotion: selectedTopic.emotionScore,
    },
  };
}
