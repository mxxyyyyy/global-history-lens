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

export function createContext(personaId: string): ConversationContext {
  return {
    personaId,
    discussedTopics: [],
    lastTopicId: null,
    turnCount: 0,
    currentMood: "unavailable",
    currentEmotion: 50,
  };
}

export function generateLocalResponse(
  _query: string,
  context: ConversationContext,
): {
  response: string;
  mood: string;
  emotionScore: number;
  followUpHint?: string;
  context: ConversationContext;
} {
  return {
    response: "Historical persona dialogue is unavailable for the current archive set.",
    mood: "unavailable",
    emotionScore: 50,
    context: {
      ...context,
      turnCount: context.turnCount + 1,
      currentMood: "unavailable",
      currentEmotion: 50,
    },
  };
}
