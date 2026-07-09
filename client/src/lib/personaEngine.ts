import {
  HISTORICAL_PERSONAS,
  type HistoricalPersona,
  type PersonaTopicNarration,
  type PersonaTopicNode,
} from "@/data/historicalPersonas";

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
  stage: DialogueStage;
  attitudeToUser: string;
  revealedMemories: string[];
  usedArguments: string[];
  lastDialogueSummary: string;
  relationshipScore: number;
  lastResponse: string;
  lastUserMessage: string;
  repeatedQuestionCount: number;
}

export interface PersonaResponseNarration extends PersonaTopicNarration {
  fallbackNote?: string;
}

export type DialogueStage = "试探期" | "交锋期" | "深层博弈期";

export interface PersonaRecentMessage {
  role: "user" | "character";
  content: string;
}

export interface PersonaCharacterProfile {
  name: string;
  title: string;
  scene: string;
  time_anchor: string;
  core_obsession: string;
  personality_conflict: string;
  language_style: string;
  hidden_memories: string[];
  knowledge_boundary: string;
  historical_stance: string;
  forbidden_style: string[];
}

export interface PersonaSessionState {
  round: number;
  stage: DialogueStage;
  emotion: string;
  attitude_to_user: string;
  revealed_memories: string[];
  used_arguments: string[];
  last_dialogue_summary: string;
  relationship_score: number;
  last_response: string;
  repeated_question_count: number;
}

export interface PersonaTopicGuide {
  matched_topic: string | null;
  matched_topic_background: string | null;
  suggested_new_angle: string;
  avoid_repeating_topics: string[];
}

export interface PersonaDialogueRequest {
  characterProfile: PersonaCharacterProfile;
  sessionState: PersonaSessionState;
  recentMessages: PersonaRecentMessage[];
  userMessage: string;
  topicGuide: PersonaTopicGuide;
}

export interface PersonaStructuredResponse {
  narrative_background: string | null;
  dialogue: string;
  emotion: string;
  attitude_shift: string;
  memory_update: {
    revealed_memories?: string[];
    used_arguments?: string[];
    last_dialogue_summary?: string;
    relationship_delta?: number;
  };
  next_hook: string;
}

type LocalUserIntent =
  | "greeting"
  | "identity"
  | "stance"
  | "emotion"
  | "responsibility"
  | "praise"
  | "criticism"
  | "continue"
  | "farewell"
  | "repeat"
  | "topic"
  | "open";

type QuestionMode = "direct" | "cause" | "process" | "evidence" | "responsibility" | "emotion" | "comparison" | "open";

interface UserQuestionFrame {
  intent: LocalUserIntent;
  mode: QuestionMode;
  normalizedQuery: string;
  repeatCount: number;
  asksForEvidence: boolean;
  asksForCause: boolean;
  asksForResponsibility: boolean;
  asksForEmotion: boolean;
  asksDirectly: boolean;
  targetPersonaIds: string[];
}

interface TopicKnowledgeNode {
  directAnswers: string[];
  evidenceBoundary?: string;
  questionFrame?: string;
  followUps: string[];
}

export interface PersonaCorpusChunk {
  id: string;
  topicId?: string;
  title: string;
  text: string;
  keywords: string[];
  kind: "profile" | "topic" | "memory" | "boundary";
  weight: number;
}

interface RankedCorpusChunk {
  chunk: PersonaCorpusChunk;
  score: number;
}

export interface CrossTimeDialogueSkill {
  personaId: string;
  topics: PersonaTopicNode[];
  corpus: PersonaCorpusChunk[];
  getStage: (round: number) => DialogueStage;
}

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[，。！？、；：“”‘’"'()\[\]{}<>《》\s]/g, "");

function findPersona(personaId: string) {
  return HISTORICAL_PERSONAS.find((persona) => persona.id === personaId) ?? null;
}

export function getDialogueStage(round: number): DialogueStage {
  if (round <= 5) return "试探期";
  if (round <= 15) return "交锋期";
  return "深层博弈期";
}

function scoreTopic(query: string, topic: PersonaTopicNode) {
  const normalizedQuery = normalize(query);
  const normalizedLabel = normalize(topic.label);
  let score = 0;

  if (normalizedQuery === normalizedLabel) {
    score += 40 + normalizedLabel.length;
  } else if (normalizedQuery.includes(normalizedLabel)) {
    score += 20 + normalizedLabel.length;
  }

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

function unique(values: Array<string | null | undefined>) {
  return Array.from(new Set(values.map((value) => value?.trim()).filter((value): value is string => Boolean(value))));
}

function clampScore(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getQuestionRepeatCount(context: ConversationContext, query: string) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return 1;
  return normalizedQuery === context.lastUserMessage ? context.repeatedQuestionCount + 1 : 1;
}

function getRepeatAngle(repeatCount: number) {
  const angles = ["事实", "代价", "心理阴影", "对后世的反问", "私人记忆"];
  return angles[Math.min(repeatCount, angles.length) - 1] ?? angles[angles.length - 1];
}

function scoreUserAttitude(query: string) {
  const normalizedQuery = normalize(query);
  const supportive = ["赞同", "理解", "敬佩", "伟大", "英明", "谢谢", "认同", "respect", "admire"];
  const hostile = ["质疑", "错误", "罪", "残忍", "阴谋", "背叛", "荒谬", "谎言", "负责", "难道", "为什么"];
  const supportScore = supportive.some((word) => normalizedQuery.includes(normalize(word))) ? 1 : 0;
  const hostileScore = hostile.some((word) => normalizedQuery.includes(normalize(word))) ? -1 : 0;
  return supportScore + hostileScore;
}

function scoreEmotionText(emotion: string, fallback: number) {
  if (/(绝望|崩溃|恐惧|悲痛|震怒)/.test(emotion)) return 25;
  if (/(愤怒|不安|压抑|警惕|沉重|怀疑)/.test(emotion)) return 40;
  if (/(克制|冷峻|复杂|平静|谨慎)/.test(emotion)) return 55;
  if (/(认可|希望|坚定|欣赏|释然)/.test(emotion)) return 72;
  return fallback;
}

function summarizeDialogue(query: string, response: PersonaStructuredResponse) {
  const hook = response.next_hook ? `，并把问题推向“${response.next_hook}”` : "";
  return `用户追问“${query.slice(0, 40)}”，角色以${response.emotion || "复杂情绪"}回应${hook}。`;
}

function getAttitudeByRelationship(score: number) {
  if (score <= -3) return "强烈警惕，把用户视作带有敌意的审问者";
  if (score < 0) return "保持戒备，但愿意继续交锋";
  if (score >= 3) return "开始认可用户的胆识与理解力，但仍不完全信任";
  if (score > 0) return "略微放下戒心，愿意给出更深一层的解释";
  return "保持距离，试探用户真正意图";
}

function findTopicBySeedId(topics: PersonaTopicNode[], seedId: string) {
  return topics.find((topic) => topic.id.endsWith(`-${seedId}`)) ?? null;
}

function findTopicById(topics: PersonaTopicNode[], topicId: string | null) {
  return topicId ? topics.find((topic) => topic.id === topicId) ?? null : null;
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

  const nextUnvisited = topics.find((topic) => !context.discussedTopics.includes(topic.id));
  if (nextUnvisited) return nextUnvisited;

  return topics[context.turnCount % topics.length] ?? topics[0] ?? null;
}

function createFollowUpHint(topic: PersonaTopicNode, topics: PersonaTopicNode[], discussedTopicIds: string[]) {
  const discussed = new Set(discussedTopicIds);
  const related = topic.relatedTopics
    .map((seedId) => findTopicBySeedId(topics, seedId))
    .filter((candidate): candidate is PersonaTopicNode => Boolean(candidate))
    .find((candidate) => !discussed.has(candidate.id));

  const nextUnvisited = topics.find((candidate) => !discussed.has(candidate.id));
  const nextTopic = related ?? nextUnvisited;

  return nextTopic ? nextTopic.label : undefined;
}

function createPersonaFollowUpQuestions(
  persona: HistoricalPersona,
  topic: PersonaTopicNode,
  topics: PersonaTopicNode[],
  context: ConversationContext,
  query: string,
  intent: LocalUserIntent,
) {
  const seedId = getTopicSeedId(topic);
  const discussed = Array.from(new Set([...context.discussedTopics, topic.id]));
  const nextTopicLabel = createFollowUpHint(topic, topics, discussed);
  const knowledgeQuestions = TOPIC_KNOWLEDGE_GRAPH[seedId]?.followUps ?? [];
  const roleQuestion: Partial<Record<HistoricalPersona["role"], string>> = {
    president: "如果站在总统的位置，这个决定最难辩护的地方是什么？",
    admiral: "如果战争拖长，你最担心的后果是什么？",
    prime_minister: "从盟友角度看，这件事怎样改变全球战争？",
    diplomat: "从国际法和亚洲战场看，这件事还应怎样理解？",
    sailor: "作为现场水兵，你最想追问谁的责任？",
    pilot: "作为执行命令的人，你后来如何面对责任？",
    minority_civilian: "这种战争怀疑后来怎样落到日裔居民身上？",
    commentator: "你能质疑到哪里，哪里又证据不足？",
  };

  const repeatQuestion = intent === "repeat" || getQuestionRepeatCount(context, query) > 1
    ? `如果不重复刚才的说法，你会从${getRepeatAngle(getQuestionRepeatCount(context, query) + 1)}怎么回答？`
    : "";

  return unique([
    ...knowledgeQuestions,
    roleQuestion[persona.role],
    nextTopicLabel ? `${nextTopicLabel}又说明了什么？` : undefined,
    repeatQuestion,
  ])
    .filter((question) => question && normalize(question) !== normalize(query))
    .slice(0, 3);
}

function createHiddenMemories(persona: HistoricalPersona) {
  return unique([
    persona.profile.dailyLife,
    persona.profile.innerConflict,
    persona.innerConflict,
    persona.futureArc,
    persona.sampleLine,
  ]).slice(0, 5);
}

function tokenizeSearchText(value: string) {
  const normalized = normalize(value);
  const tokens: string[] = [];
  if (!normalized) return tokens;

  for (let index = 0; index < normalized.length - 1; index += 1) {
    tokens.push(normalized.slice(index, index + 2));
  }
  for (let index = 0; index < normalized.length - 2; index += 1) {
    tokens.push(normalized.slice(index, index + 3));
  }

  return unique(tokens);
}

function expandQueryTerms(query: string, intent: LocalUserIntent) {
  const terms = [query];
  const normalizedQuery = normalize(query);

  if (intent === "continue" || includesAny(normalizedQuery, ["然后", "接着", "后来", "下一步"])) {
    terms.push("后果", "接下来", "长期影响", "战争动员", "战后记忆", "同盟");
  }
  if (intent === "criticism" || includesAny(normalizedQuery, ["不对", "错", "质疑", "借口"])) {
    terms.push("争议", "责任", "证据", "边界", "反驳", "道德判断");
  }
  if (intent === "emotion") {
    terms.push("感受", "创伤", "恐惧", "记忆", "内心冲突");
  }
  if (intent === "responsibility") {
    terms.push("责任", "服从", "命令", "道德", "个人责任");
  }

  return unique(terms);
}

function buildPersonaCorpus(persona: HistoricalPersona): PersonaCorpusChunk[] {
  const chunks: PersonaCorpusChunk[] = [
    {
      id: `${persona.id}-profile-identity`,
      title: "身份与背景",
      kind: "profile",
      weight: 1.2,
      keywords: ["身份", "你是谁", "介绍", persona.name, persona.title, persona.location, persona.year],
      text: `${persona.bio} ${persona.personaType} ${persona.credibilityType} ${persona.timeAnchor}`,
    },
    {
      id: `${persona.id}-profile-stance`,
      title: "核心立场",
      kind: "profile",
      weight: 1.4,
      keywords: ["立场", "观点", "看法", "你怎么看", "为什么"],
      text: `${persona.stance} ${persona.profile.beliefs}`,
    },
    {
      id: `${persona.id}-profile-conflict`,
      title: "内心冲突",
      kind: "memory",
      weight: 1.2,
      keywords: ["感受", "害怕", "后悔", "痛苦", "记忆", "创伤", "矛盾"],
      text: `${persona.innerConflict} ${persona.profile.innerConflict} ${persona.sampleLine}`,
    },
    {
      id: `${persona.id}-profile-life`,
      title: "生活细节",
      kind: "memory",
      weight: 1,
      keywords: ["日常", "生活", "家庭", "教育", "经历"],
      text: `${persona.profile.dailyLife} 家庭：${persona.profile.family} 教育：${persona.profile.education} 籍贯：${persona.profile.origin}`,
    },
    {
      id: `${persona.id}-profile-boundary`,
      title: "知识边界",
      kind: "boundary",
      weight: 0.9,
      keywords: ["知道", "不知道", "证据", "边界", "史料", "阴谋"],
      text: persona.knowledgeBoundary,
    },
  ];

  persona.topicNodes.forEach((topic) => {
    chunks.push({
      id: `${topic.id}-topic`,
      topicId: topic.id,
      title: topic.label,
      kind: "topic",
      weight: 1.5,
      keywords: unique([topic.label, ...topic.keywords, topic.narration.matchedTopic]),
      text: `${topic.label}。${topic.topicFocus} ${topic.narration.background} ${topic.response} ${topic.narration.credibilityBoundary}`,
    });
  });

  return chunks;
}

export function createCrossTimeDialogueSkill(persona: HistoricalPersona): CrossTimeDialogueSkill {
  return {
    personaId: persona.id,
    topics: persona.topicNodes,
    corpus: buildPersonaCorpus(persona),
    getStage: getDialogueStage,
  };
}

function scoreCorpusChunk(query: string, chunk: PersonaCorpusChunk, intent: LocalUserIntent, context: ConversationContext) {
  const queryTerms = expandQueryTerms(query, intent);
  const normalizedQuery = normalize(queryTerms.join(" "));
  const queryTokens = tokenizeSearchText(queryTerms.join(" "));
  const normalizedTitle = normalize(chunk.title);
  const normalizedText = normalize(chunk.text);
  let score = 0;

  if (normalizedQuery && normalizedTitle.includes(normalizedQuery)) score += 24;
  if (normalizedQuery && normalizedText.includes(normalizedQuery)) score += 12;

  chunk.keywords.forEach((keyword) => {
    const normalizedKeyword = normalize(keyword);
    if (!normalizedKeyword) return;
    if (normalizedQuery.includes(normalizedKeyword)) score += normalizedKeyword.length >= 4 ? 18 : 10;
    if (normalizedText.includes(normalizedKeyword) && queryTokens.includes(normalizedKeyword)) score += 8;
  });

  queryTokens.forEach((token) => {
    if (token.length < 2) return;
    if (normalizedTitle.includes(token)) score += 3;
    if (normalizedText.includes(token)) score += 1;
  });

  if (chunk.topicId && chunk.topicId === context.lastTopicId) {
    if (intent === "criticism" || intent === "responsibility" || intent === "emotion" || intent === "repeat") score += 24;
    if (intent === "continue") score += 8;
  }

  return score * chunk.weight;
}

function retrievePersonaCorpus(skill: CrossTimeDialogueSkill, query: string, context: ConversationContext, intent: LocalUserIntent) {
  return skill.corpus
    .map((chunk) => ({ chunk, score: scoreCorpusChunk(query, chunk, intent, context) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function firstRetrievedTopic(skill: CrossTimeDialogueSkill, retrievedChunks: RankedCorpusChunk[]) {
  const topicChunk = retrievedChunks.find((entry) => entry.chunk.topicId);
  return topicChunk?.chunk.topicId ? findTopicById(skill.topics, topicChunk.chunk.topicId) : null;
}

function selectTopicForLocalResponse(
  skill: CrossTimeDialogueSkill,
  context: ConversationContext,
  exactTopic: PersonaTopicNode | null,
  retrievedChunks: RankedCorpusChunk[],
  intent: LocalUserIntent,
) {
  if (exactTopic) return exactTopic;

  const lastTopic = findTopicById(skill.topics, context.lastTopicId);
  if (lastTopic && ["criticism", "praise", "emotion", "responsibility", "repeat"].includes(intent)) {
    return lastTopic;
  }

  if (intent === "continue" && lastTopic) {
    const relatedTopic = lastTopic.relatedTopics
      .map((seedId) => findTopicBySeedId(skill.topics, seedId))
      .filter((topic): topic is PersonaTopicNode => Boolean(topic))
      .find((topic) => !context.discussedTopics.includes(topic.id));
    if (relatedTopic) return relatedTopic;

    const nextUnvisited = skill.topics.find((topic) => !context.discussedTopics.includes(topic.id));
    if (nextUnvisited) return nextUnvisited;

    const lastIndex = skill.topics.findIndex((topic) => topic.id === lastTopic.id);
    return skill.topics[(lastIndex + 1) % skill.topics.length] ?? lastTopic;
  }

  return firstRetrievedTopic(skill, retrievedChunks) ?? pickFallbackTopic(skill.topics, context);
}

function includesAny(normalizedQuery: string, keywords: string[]) {
  return keywords.some((keyword) => normalizedQuery.includes(normalize(keyword)));
}

const PERSONA_MENTION_ALIASES: Array<{ personaId: string; terms: string[] }> = [
  { personaId: "pearl_fdr", terms: ["罗斯福", "富兰克林", "总统", "白宫", "fdr", "roosevelt"] },
  { personaId: "pearl_yamamoto", terms: ["山本", "山本五十六", "联合舰队", "yamamoto"] },
  { personaId: "pearl_churchill", terms: ["丘吉尔", "英国首相", "churchill"] },
  { personaId: "pearl_hu_shih", terms: ["胡适", "中国", "驻美"] },
  { personaId: "pearl_sailor_carter", terms: ["卡特", "水兵", "美国水兵", "港口水兵"] },
  { personaId: "pearl_pilot_sato", terms: ["佐藤", "飞行员", "日本飞行员", "舰载机"] },
  { personaId: "pearl_keiko_morita", terms: ["森田", "惠子", "日裔", "日裔美国人"] },
  { personaId: "pearl_harold_miller", terms: ["米勒", "评论员", "孤立主义", "调查"] },
];

const TOPIC_KNOWLEDGE_GRAPH: Partial<Record<string, TopicKnowledgeNode>> = {
  what_happened: {
    directAnswers: [
      "珍珠港事件就是1941年12月7日日本海军突然袭击美国太平洋舰队基地，美国随后对日宣战，太平洋战争全面爆发。",
      "如果先给结论：这是一次军事突袭，也是美国从援助者转为正式参战者的转折点。",
    ],
    questionFrame: "先分清现场伤亡、军事目标和随后宣战这三层。",
    followUps: ["那天清晨现场到底有多混乱？", "为什么美国会因此正式参战？"],
  },
  attack_morning: {
    directAnswers: [
      "那天清晨不是有序会战，而是警报、误判、救火、爆炸和寻找同伴同时发生的混乱。",
    ],
    followUps: ["现场普通水兵最先承受了什么？", "这种混乱和情报失败有什么关系？"],
  },
  japanese_pilot: {
    directAnswers: [
      "日本飞行员是在训练、命令和舰队纪律中执行任务；这能解释他们为何起飞，却不能替个人责任完全开脱。",
    ],
    evidenceBoundary: "他们通常知道任务目标，却未必理解全部外交和内阁决策。",
    followUps: ["执行命令能否减轻个人责任？", "让飞行员和水兵互相质问会发生什么？"],
  },
  strategic_gamble: {
    directAnswers: [
      "珍珠港是战略赌博，因为它押注一次先发制人能争取时间，却无法真正摧毁美国长期战争能力。",
    ],
    followUps: ["山本为什么不相信长期必胜？", "战术成功为什么会变成战略失败？"],
  },
  resource_embargo: {
    directAnswers: [
      "资源禁运确实加重了日本困境，但困境不是偷袭的免责理由；真正越过战争门槛的是决策和命令。",
    ],
    followUps: ["资源压力如何推向南进战略？", "外交谈判为什么没能阻止战争？"],
  },
  diplomacy: {
    directAnswers: [
      "外交失败不是突然断裂，而是谈判、照会、猜疑和军事部署同时推进，最后舰队先于和平方案抵达。",
    ],
    followUps: ["赫尔照会为什么重要？", "谈判是在避免战争还是争取时间？"],
  },
  pacific_fleet: {
    directAnswers: [
      "太平洋舰队成为目标，是因为它被日本军方视为南进东南亚时最可能干预的美国海军力量。",
    ],
    followUps: ["为什么选择夏威夷而不是别处？", "航母不在港内造成了什么后果？"],
  },
  carrier_tactics: {
    directAnswers: [
      "珍珠港的战术关键在航母远距离隐蔽接近、舰载机分波攻击和浅水鱼雷等准备。",
    ],
    followUps: ["这种战术为什么当时危险？", "周密战术能否证明行动正当？"],
  },
  tactical_success: {
    directAnswers: [
      "只看当天破坏，它是战术成功；但战术成功并不等于战争目标成功。",
    ],
    followUps: ["当天具体造成了什么损失？", "为什么短期成功会带来长期失败？"],
  },
  strategic_failure: {
    directAnswers: [
      "它成为战略失败，是因为没有压垮美国战争能力，反而给美国民意、工业和同盟动员提供了共同理由。",
    ],
    followUps: ["美国工业动员后来如何改变战局？", "中途岛和珍珠港有什么关联？"],
  },
  american_entry: {
    directAnswers: [
      "美国参战是因为本土军事基地遭到攻击，国会、公众和总统都获得了明确的战争理由。",
    ],
    followUps: ["国会宣战如何形成共识？", "孤立主义为什么被击碎？"],
  },
  day_of_infamy: {
    directAnswers: [
      "《国耻日》演说把分散的震惊组织成国家语言，使宣战变成公众可以理解和支持的行动。",
    ],
    followUps: ["这场演说如何塑造美国记忆？", "演说能否遮住更复杂的责任问题？"],
  },
  isolationism: {
    directAnswers: [
      "孤立主义被击碎，不是争论消失，而是遭袭让继续置身战争之外变得难以自圆其说。",
    ],
    followUps: ["袭击前美国社会为什么反战？", "珍珠港后民意如何变化？"],
  },
  intelligence_failure: {
    directAnswers: [
      "情报失败要分层看：知道战争风险、判断具体地点时间、让基地有效戒备，是三个不同问题。",
    ],
    evidenceBoundary: "可以追问警讯和戒备失败，但不能把零散警讯直接等同于准确预知。",
    followUps: ["哪些警讯没有转化成戒备？", "责任应落在白宫还是军方指挥链？"],
  },
  conspiracy_boundary: {
    directAnswers: [
      "主流证据不支持罗斯福明确知道12月7日珍珠港会被袭击却故意放任；但警讯、误判和戒备失败确实值得追问。",
      "如果问“是否早知道”，我会把答案拆开：知道战争风险，不等于知道具体时间地点；有警讯，也不等于故意牺牲水兵。",
    ],
    evidenceBoundary: "这个问题必须区分史料可证、政治责任和阴谋推断。",
    questionFrame: "先问证据链，再问责任，而不是先把猜测当结论。",
    followUps: ["警讯为什么没有变成有效戒备？", "哈罗德·米勒会怎样质疑这个结论？", "罗斯福本人会怎样辩解？"],
  },
  allied_war: {
    directAnswers: [
      "珍珠港使太平洋、欧洲和亚洲战场更紧密连成同盟国战争，美国的资源和军力从此正式进入全球战局。",
    ],
    followUps: ["美国参战如何改变英国处境？", "中国战场因此发生了什么变化？"],
  },
  britain_view: {
    directAnswers: [
      "英国视角里，珍珠港既是美国的惨痛遭袭，也是英国苦撑局面出现决定性盟友的转折。",
    ],
    followUps: ["丘吉尔为什么会感到战略释然？", "英国是否也回避了战争阴影？"],
  },
  war_mobilization: {
    directAnswers: [
      "战争动员就是把愤怒变成制度：征兵、造船、飞机、税收、宣传和社会管制一起启动。",
    ],
    followUps: ["美国工业动员为什么这么关键？", "动员是否也带来公民权问题？"],
  },
  civilian_cost: {
    directAnswers: [
      "普通人的代价不是战报数字，而是伤亡、失踪、家书、恐惧和很久以后仍会回来的创伤。",
    ],
    followUps: ["水兵会怎样记住那天？", "日裔居民承受了怎样的另一种代价？"],
  },
  japanese_american: {
    directAnswers: [
      "日裔美国人的处境说明，战争动员不只带来团结，也会把怀疑和审查压到无辜社区身上。",
    ],
    evidenceBoundary: "夏威夷袭击后有戒严、审查和局部拘押；美国本土大规模拘禁主要是在1942年政策扩大后发生。",
    followUps: ["森田惠子如何证明自己的归属？", "国家安全能否压过公民权？"],
  },
  responsibility: {
    directAnswers: [
      "责任不能只交给国家、军人或时代中的任何一方；命令、服从、选择和后果都要被追问。",
    ],
    followUps: ["执行命令能否成为免责理由？", "受害者和执行者该如何对话？"],
  },
  victim_executor: {
    directAnswers: [
      "受害者与执行者对话的难处在于，双方都不能躲进抽象词：一个承受火焰，一个承认自己投下炸弹。",
    ],
    followUps: ["水兵会怎样质问日本飞行员？", "飞行员能否请求理解？"],
  },
  postwar_memory: {
    directAnswers: [
      "战后记忆不会自动统一；纪念、胜利叙事、创伤、责任和公民权争论会继续拉扯珍珠港。",
    ],
    followUps: ["纪念珍珠港时谁容易被遗漏？", "后世该如何同时记住伤亡和责任？"],
  },
};

const ROLE_TOPIC_LENSES: Partial<Record<HistoricalPersona["role"], Partial<Record<string, string[]>>>> = {
  president: {
    conspiracy_boundary: [
      "从我的位置说，我可以承认警讯和责任压力，但我不能接受把未经证实的放任说成事实。",
      "总统要为战争准备和戒备体系接受审视，可审视不能越过证据本身。",
    ],
    japanese_american: [
      "国家安全的压力真实存在，但若它伤害无辜公民，后来的人也有权审视我的政府。",
    ],
  },
  admiral: {
    conspiracy_boundary: [
      "美国是否误判不是我能替他们裁决的事；我能承认的是，日本确实选择了奇袭。",
    ],
    strategic_failure: [
      "我最担心的正是这里：一次奇袭若唤醒美国工业，就会把短期主动变成长期困局。",
    ],
  },
  prime_minister: {
    conspiracy_boundary: [
      "我不会替华盛顿回答所有调查问题；把复杂警讯压成单一阴谋，会让理解战争变得懒惰。",
    ],
  },
  diplomat: {
    conspiracy_boundary: [
      "外交上可以查证警讯和政策压力，但没有证据链时，谨慎比痛快的阴谋结论更重要。",
    ],
  },
  sailor: {
    conspiracy_boundary: [
      "我不知道白宫桌上有什么文件；我只知道如果有人本该让我们更戒备，那就该被追问。",
      "别让我替高层下结论。我能作证的是港口没有准备好，而代价落在我们身上。",
    ],
  },
  pilot: {
    conspiracy_boundary: [
      "美国是否误判我不知道；我能证明的是，我们接到命令，飞向一个没有充分准备的港口。",
    ],
  },
  minority_civilian: {
    conspiracy_boundary: [
      "我不能替白宫作证；我知道的是，答案越混乱，街上越容易先怀疑长着日本面孔的人。",
      "对我来说，这个问题不只在总统办公室里，也在邻居看我的眼神里。",
    ],
    japanese_american: [
      "这就是我的处境：我反对日本袭击，却仍要证明自己不是敌人。",
      "国家说安全时，我听见的是小店门口的盘查、低声议论和家里人的沉默。",
    ],
  },
  commentator: {
    conspiracy_boundary: [
      "我会追问政府，但也必须承认边界：战争风险和警讯存在，不等于已经证明总统故意放任。",
      "真正值得咬住的问题是，为什么警讯没有变成戒备，而不是急着宣布一个证据不足的结论。",
    ],
  },
};

const ROLE_DEFAULT_LENSES: Partial<Record<HistoricalPersona["role"], string[]>> = {
  president: ["我必须把这件事放在国家、国会和公众责任里回答。"],
  admiral: ["我只能从舰队、时间窗口和战略风险里回答，不能把战争说成荣耀。"],
  prime_minister: ["我从盟友和世界战争结构里看这件事，但不会假装自己站在每一处现场。"],
  diplomat: ["我会先看证据、国际法和长期战争链条，而不是只听情绪的回声。"],
  sailor: ["我能讲的是身体记住的现场，而不是高层文件里的全部真相。"],
  pilot: ["我能讲的是训练、命令和飞行视角，但这不能取消我对伤害的责任。"],
  minority_civilian: ["我会把问题带回街区、家庭和身份，因为大战略最后会落到普通人身上。"],
  commentator: ["我会继续追问权力，因为悲痛不该成为停止调查的理由。"],
};

function analyzeUserQuestion(
  query: string,
  context: ConversationContext,
  intent: LocalUserIntent,
): UserQuestionFrame {
  const normalizedQuery = normalize(query);
  const asksForEvidence = includesAny(normalizedQuery, ["证据", "史料", "证明", "调查", "阴谋", "故意", "早知道", "预知", "警讯", "情报"]);
  const asksForCause = includesAny(normalizedQuery, ["为什么", "为何", "原因", "怎么会", "如何导致"]);
  const asksForResponsibility = includesAny(normalizedQuery, ["责任", "负责", "罪", "错", "道德", "正当", "背叛", "开脱"]);
  const asksForEmotion = includesAny(normalizedQuery, ["感受", "害怕", "后悔", "痛苦", "怎么看", "心情", "记得"]);
  const asksDirectly = includesAny(normalizedQuery, ["是否", "是不是", "有没有", "会不会", "能不能", "难道", "吗"]);
  const targetPersonaIds = PERSONA_MENTION_ALIASES
    .filter((entry) => entry.terms.some((term) => normalizedQuery.includes(normalize(term))))
    .map((entry) => entry.personaId);

  let mode: QuestionMode = "open";
  if (asksForEvidence) mode = "evidence";
  else if (asksForResponsibility) mode = "responsibility";
  else if (asksForEmotion) mode = "emotion";
  else if (asksForCause) mode = "cause";
  else if (asksDirectly) mode = "direct";
  else if (includesAny(normalizedQuery, ["比较", "区别", "不同", "谁更"])) mode = "comparison";
  else if (includesAny(normalizedQuery, ["过程", "怎么发生", "如何发生"])) mode = "process";

  return {
    intent,
    mode,
    normalizedQuery,
    repeatCount: getQuestionRepeatCount(context, query),
    asksForEvidence,
    asksForCause,
    asksForResponsibility,
    asksForEmotion,
    asksDirectly,
    targetPersonaIds,
  };
}

function detectUserIntent(query: string, context: ConversationContext, exactTopic: PersonaTopicNode | null): LocalUserIntent {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return "open";
  if (includesAny(normalizedQuery, ["你好", "您好", "在吗", "hello", "hi", "嗨"])) return "greeting";
  if (includesAny(normalizedQuery, ["再见", "告别", "回头见", "bye", "结束"])) return "farewell";
  if (includesAny(normalizedQuery, ["然后", "然后呢", "接着", "继续", "后来呢", "还有呢", "下一步", "接下来"])) return "continue";
  if (getQuestionRepeatCount(context, query) > 1) return "repeat";
  if (includesAny(normalizedQuery, ["你是谁", "介绍自己", "你的身份", "你是什么人", "你叫什么", "身份"])) return "identity";
  if (includesAny(normalizedQuery, ["你怎么看", "你的观点", "你认为", "立场", "看法", "为什么"])) return exactTopic ? "topic" : "stance";
  if (includesAny(normalizedQuery, ["害怕", "后悔", "痛苦", "感受", "心情", "难过", "愤怒", "记忆", "创伤"])) return "emotion";
  if (includesAny(normalizedQuery, ["责任", "负责", "罪", "道德", "服从", "命令", "错了吗", "错么"])) return "responsibility";
  if (includesAny(normalizedQuery, ["伟大", "英明", "敬佩", "佩服", "赞同", "理解你", "支持你", "做得对"])) return "praise";
  if (includesAny(normalizedQuery, ["残忍", "荒谬", "借口", "谎言", "背叛", "冷血", "不对", "错误", "质疑", "阴谋"])) return "criticism";
  return exactTopic ? "topic" : "open";
}

function pickByTurn(values: string[], turnCount: number) {
  return values[turnCount % values.length] ?? "";
}

function polishResponseText(text: string) {
  return text
    .replace(/\s+/g, " ")
    .replace(/\s+([，。！？；：])/g, "$1")
    .replace(/([，。！？；：])\s+/g, "$1")
    .trim();
}

function getTopicSeedId(topic: PersonaTopicNode) {
  return topic.id.slice(topic.id.lastIndexOf("-") + 1);
}

const SPOKEN_TOPIC_FOCUS: Record<string, string[]> = {
  what_happened: [
    "珍珠港不是一个干净的名词。它先是清晨的飞机、火光和伤亡，随后才变成把国家推入战争的门槛。",
    "那一天不能只从国会记录里看。先有港口里的混乱和死亡，后面才有宣战、动员和漫长的太平洋战争。",
  ],
  attack_morning: [
    "如果只说战果，就把那天早晨说轻了。真正压在人身上的，是警报、浓烟、找不到同伴的慌乱。",
    "清晨的混乱不是地图上的箭头。人是在火里、油里、喊声里才明白战争已经落到自己身上。",
  ],
  japanese_pilot: [
    "飞行员不是一句国家口号。他们有训练、命令和恐惧，也有必须面对的个人责任。",
    "我不能让“执行命令”四个字把人遮住。飞机下面不是抽象目标，是会流血的人。",
  ],
  strategic_gamble: [
    "这不是稳操胜券的计划，而是一场把国家命运押进短暂主动权里的赌博。",
    "所谓战略，在这里带着赌徒的味道：想用一击换时间，却未必能承受被唤醒的对手。",
  ],
  resource_embargo: [
    "资源压力确实存在，可压力不是免责书。石油、橡胶和南进路线，只能解释困境，不能洗白选择。",
    "禁运把决策者逼进窄路，但真正跨过战争门槛的，仍是人的判断和命令。",
  ],
  diplomacy: [
    "谈判不是突然断掉的绳子，它是一点点被猜疑、拖延和军事部署磨断的。",
    "到最后，照会还在桌上，舰队已经在海上。外交失败最冷的地方就在这里。",
  ],
  pacific_fleet: [
    "太平洋舰队成为目标，不是偶然。它挡在南进战略的想象路线上，也挡住了日本军方想抢出的时间。",
    "打珍珠港，是为了先压住美国海军的反应能力；可被击中的不只是舰队，还有美国社会的神经。",
  ],
  carrier_tactics: [
    "航母奇袭的危险在于，它把距离、隐蔽、分波攻击和浅水鱼雷压进同一个清晨。",
    "从军事上说，那是一次周密的行动；从人的角度说，周密并不会让爆炸变得正当。",
  ],
  tactical_success: [
    "当天的破坏当然巨大。可战术上的火光，很快照出了更长战争里的代价。",
    "如果只看清晨，它像成功；如果看后来，它更像把一头工业巨兽叫醒的钟声。",
  ],
  strategic_failure: [
    "它没有结束美国的战争能力，反而给了美国动员工业、民意和同盟的理由。",
    "珍珠港最尖锐的反讽，是一次成功袭击反而打开了长期失败的门。",
  ],
  american_entry: [
    "美国参战不是一句愤怒口号。它是国会表决、公众情绪、总统语言和战争机器一起转动。",
    "遭袭让犹豫变得困难，也让一个民主国家必须公开说明自己为何开战。",
  ],
  day_of_infamy: [
    "演说的作用，是把分散的震惊整理成共同语言，让人知道悲痛将被带往何处。",
    "那不是修辞练习。国家需要语言把恐惧、愤怒和行动接在一起。",
  ],
  isolationism: [
    "孤立主义不是被一句话击碎的，而是被港口里的火光夺走了原来的政治支点。",
    "袭击之前，美国人仍在争论是否参战；袭击之后，争论的地面变了。",
  ],
  intelligence_failure: [
    "情报失败要分层看：知道战争风险、知道具体地点和完成有效戒备，不是一回事。",
    "警讯存在，判断却没有落到足够清楚的行动上；这正是最该追问的地方。",
  ],
  conspiracy_boundary: [
    "你问我是否早知道，就必须把警讯、误判和阴谋分开说。",
    "我可以接受对情报处理的质疑，但不能把没有证据链的推断说成事实。",
  ],
  allied_war: [
    "珍珠港把太平洋、欧洲和更广阔的战场接到了一起，战争从此不再能分开理解。",
    "美国从援助者变成参战者，工业、海军、金融和士兵都被接进同盟结构里。",
  ],
  britain_view: [
    "从英国看，这既是残酷的震惊，也是战争前景的转折。",
    "美国不是被礼貌地请进战争的，它是被战争击中了。",
  ],
  war_mobilization: [
    "战争动员就是把情绪变成制度：造船、飞机、征兵、税收和宣传全都开始重新排列。",
    "愤怒如果只停在胸口，成不了战争；它必须被工厂、国会和军队接住。",
  ],
  civilian_cost: [
    "普通人的代价最容易被宏大叙事盖住：烧伤、失踪、家书，还有很久以后仍会回来的噩梦。",
    "国家说战略，家庭承受空椅子。历史最沉的地方，常常就在那里。",
  ],
  japanese_american: [
    "战争动员不只召唤团结，也会把怀疑压到无辜公民和社区身上。",
    "安全一旦变成万能理由，公民权就会先在少数人身上变得脆弱。",
  ],
  responsibility: [
    "责任不能只停在国家或个人一端。命令、服从、恐惧、选择和事后解释，都要被追问。",
    "谁下令，谁执行，谁承受后果，这些问题不能互相替对方开脱。",
  ],
  victim_executor: [
    "受害者和执行者真正相遇时，谁都不能躲进抽象词里。",
    "一个人在港口逃生，一个人在空中执行命令；跨时空对话要让他们都听见对方的具体经验。",
  ],
  postwar_memory: [
    "战后记忆不会自动安静。纪念、胜利叙事、创伤和责任争论会继续拉扯同一个事件。",
    "如果只留下庄严，就会忘记追问；如果只剩追问，也会忘记那些真实的伤亡。",
  ],
};

function asPersonaText(text: string) {
  return text
    .replace(/总统必须/g, "我必须")
    .replace(/他的/g, "我的")
    .replace(/她的/g, "我的")
    .replace(/他为/g, "我为")
    .replace(/她为/g, "我为")
    .replace(/他需要/g, "我需要")
    .replace(/她需要/g, "我需要")
    .replace(/他知道/g, "我知道")
    .replace(/她知道/g, "我知道")
    .replace(/他想/g, "我想")
    .replace(/她想/g, "我想")
    .replace(/她既是/g, "我既是")
    .replace(/她是谁/g, "我是谁")
    .replace(/他早已/g, "我早已")
    .replace(/他|她/g, "我");
}

function createRoleOpening(persona: HistoricalPersona) {
  const openings: Partial<Record<HistoricalPersona["role"], string>> = {
    president: "我从白宫接到消息时，先听见的不是历史名词，而是伤亡报告。",
    admiral: "我只能从舰队、时间和风险说起，不能把它说成荣耀。",
    prime_minister: "我没有站在珍珠港的甲板上，但我知道一个国家被战争击中的滋味。",
    diplomat: "我在华盛顿看见这一天，也看见亚洲战争忽然被美国人切身感到。",
    sailor: "我不从地图说起，我从甲板说起。",
    pilot: "我只能从座舱、命令和那片港口说起。",
    minority_civilian: "我听见爆炸，也听见第二天街上的沉默。",
    commentator: "我先说清楚：惨烈不能取消追问，国旗也不能盖住问题。",
  };

  return openings[persona.role] ?? "我只能从自己站的位置说起。";
}

function createTopicLead(persona: HistoricalPersona, topic: PersonaTopicNode, context: ConversationContext, intent: LocalUserIntent) {
  if (intent === "criticism") {
    return pickByTurn([
      "你的质疑我听见了，我不能只用口号挡回去。",
      "别急着接受我的说法，也别急着把一切判成阴谋。",
      "你问得尖锐，这正是历史该受的审问。",
    ], context.turnCount);
  }

  if (intent === "praise") {
    return pickByTurn([
      "先别急着称赞我，称赞如果不连着代价一起看，就太轻了。",
      "我不需要空泛的称颂，我更愿意把判断说清楚。",
      "若你真理解我，就要连我的迟疑和责任一并听完。",
    ], context.turnCount);
  }

  if (intent === "responsibility") {
    return pickByTurn([
      "责任这两个字，不能被我轻轻放过去。",
      "要谈责任，就不能只看命令，也不能只看结果。",
      "我不会把责任全推给抽象的时代。",
    ], context.turnCount);
  }

  if (context.turnCount === 0) {
    return createRoleOpening(persona);
  }

  return pickByTurn([
    "我只能从自己站的位置说起。",
    "这件事不能只看一个结论。",
    "从我的位置看，事情没有那么平整。",
    "你问到的不是小事，我不能轻轻带过。",
  ], context.turnCount);
}

function createPersonalDetail(persona: HistoricalPersona, context: ConversationContext, intent: LocalUserIntent) {
  if (intent === "continue" && context.turnCount % 2 === 1) return "";

  const detail = asPersonaText(pickByTurn([
    persona.profile.beliefs,
    persona.profile.innerConflict,
    persona.innerConflict,
    persona.sampleLine,
    persona.profile.dailyLife,
    persona.futureArc,
  ], context.turnCount));

  if (intent === "criticism") return `你可以继续逼问我；${detail}`;
  if (intent === "emotion") return detail;
  if (context.turnCount < 2) return "";
  return detail;
}

function createGroundedTopicPoint(persona: HistoricalPersona, topic: PersonaTopicNode, context: ConversationContext) {
  const seedId = getTopicSeedId(topic);
  const spokenFocus = pickByTurn(
    SPOKEN_TOPIC_FOCUS[seedId] ?? [asPersonaText(topic.topicFocus)],
    context.turnCount,
  );
  return `${asPersonaText(spokenFocus)} ${asPersonaText(topic.response)}`;
}

function createDirectAnswerSentence(persona: HistoricalPersona, topic: PersonaTopicNode, context: ConversationContext, frame: UserQuestionFrame) {
  const seedId = getTopicSeedId(topic);
  const knowledge = TOPIC_KNOWLEDGE_GRAPH[seedId];
  const answer = knowledge?.directAnswers.length
    ? pickByTurn(knowledge.directAnswers, context.turnCount + frame.repeatCount - 1)
    : asPersonaText(topic.topicFocus);

  if (frame.asksDirectly || frame.mode === "evidence" || frame.mode === "responsibility") {
    return answer;
  }

  if (frame.mode === "cause") {
    return `要回答原因，不能只抓一个点：${answer}`;
  }

  if (frame.mode === "emotion") {
    return `若你问我心里怎么承受，我会先承认这件事没有轻松答案：${answer}`;
  }

  if (frame.intent === "continue") {
    return `顺着前面的问题继续看，下一层是：${answer}`;
  }

  return answer;
}

function createBoundarySentence(persona: HistoricalPersona, topic: PersonaTopicNode, frame: UserQuestionFrame) {
  const seedId = getTopicSeedId(topic);
  const knowledge = TOPIC_KNOWLEDGE_GRAPH[seedId];
  const mentionedOtherPersona = frame.targetPersonaIds.some((personaId) => personaId !== persona.id);

  if (knowledge?.evidenceBoundary && (frame.asksForEvidence || frame.asksDirectly || seedId === "conspiracy_boundary" || seedId === "japanese_american")) {
    return knowledge.evidenceBoundary;
  }

  if (mentionedOtherPersona) {
    return `但我不能替${frame.targetPersonaIds.includes("pearl_fdr") ? "罗斯福或白宫" : "另一个当事人"}作完整证词，我只能守住自己的位置。`;
  }

  if (persona.knowledgeBoundary && (frame.mode === "evidence" || frame.mode === "responsibility")) {
    return persona.knowledgeBoundary;
  }

  return "";
}

function createRoleLensSentence(persona: HistoricalPersona, topic: PersonaTopicNode, context: ConversationContext) {
  const seedId = getTopicSeedId(topic);
  const topicLens = ROLE_TOPIC_LENSES[persona.role]?.[seedId];
  if (topicLens?.length) return pickByTurn(topicLens, context.turnCount);

  const defaultLens = ROLE_DEFAULT_LENSES[persona.role];
  if (defaultLens?.length) return pickByTurn(defaultLens, context.turnCount);

  return "我只能从自己站的位置说起。";
}

function isNearDuplicateSentence(a: string, b: string) {
  const left = normalize(a);
  const right = normalize(b);
  if (!left || !right) return false;
  const minLength = Math.min(left.length, right.length);
  if (minLength < 10) return left === right;
  const leftKey = left.slice(0, Math.min(14, left.length));
  const rightKey = right.slice(0, Math.min(14, right.length));
  return left.includes(rightKey) || right.includes(leftKey);
}

function createRelationshipSentence(context: ConversationContext, intent: LocalUserIntent) {
  if (intent === "criticism") {
    return pickByTurn([
      "你的质疑不能被我一口挡回去。",
      "这个问题确实该被追问，而不是被一句口号盖住。",
      "若你逼问到这里，我也不能装作没有听见。",
    ], context.turnCount);
  }

  if (intent === "praise") {
    return pickByTurn([
      "先别急着称赞，称赞若不连着代价，就会变轻。",
      "我不愿把这件事说成可以被轻易赞美的决定。",
      "如果要理解我，就要连迟疑和责任一起听。",
    ], context.turnCount);
  }

  if (intent === "responsibility") {
    return pickByTurn([
      "责任这个词不能被我轻轻放过去。",
      "谈责任，就不能让国家、命令和个人互相遮蔽。",
      "我不会把责任全推给抽象的时代。",
    ], context.turnCount);
  }

  return "";
}

function createQuestionAwareResponse(
  persona: HistoricalPersona,
  topic: PersonaTopicNode,
  context: ConversationContext,
  query: string,
  intent: LocalUserIntent,
) {
  const frame = analyzeUserQuestion(query, context, intent);
  const seedId = getTopicSeedId(topic);
  const knowledge = TOPIC_KNOWLEDGE_GRAPH[seedId];
  const directAnswer = createDirectAnswerSentence(persona, topic, context, frame);
  const boundary = createBoundarySentence(persona, topic, frame);
  const roleLens = createRoleLensSentence(persona, topic, context);
  const relationship = createRelationshipSentence(context, intent);
  const personalDetail = createPersonalDetail(persona, context, intent);
  const rawTopicPoint = pickByTurn(SPOKEN_TOPIC_FOCUS[seedId] ?? [asPersonaText(topic.topicFocus)], context.turnCount + 1);
  const topicPoint = intent === "continue" || isNearDuplicateSentence(rawTopicPoint, directAnswer) || isNearDuplicateSentence(rawTopicPoint, roleLens)
    ? ""
    : rawTopicPoint;
  const questionFrame = frame.repeatCount > 1
    ? `你又问到这里，我这次不重复上一句，而从${getRepeatAngle(frame.repeatCount)}说。`
    : knowledge?.questionFrame ?? "";

  const pieces = [
    relationship,
    questionFrame,
    directAnswer,
    boundary,
    roleLens,
    topicPoint,
  ];

  if (intent === "emotion" || context.turnCount >= 5 || frame.repeatCount > 1) {
    pieces.push(personalDetail);
  }

  return polishResponseText(unique(pieces).join(" "));
}

function createIntentResponse(
  persona: HistoricalPersona,
  topic: PersonaTopicNode,
  context: ConversationContext,
  query: string,
  intent: LocalUserIntent,
) {
  const personalDetail = createPersonalDetail(persona, context, intent);

  if (intent === "greeting") {
    return `${asPersonaText(persona.sampleLine)} 我是${persona.title}，此刻我能给你的不是后世课本里的定论，而是从${persona.location}望出去的判断：${asPersonaText(persona.stance)}`;
  }

  if (intent === "identity") {
    return `${asPersonaText(persona.bio)} 若只问我的身份，那还不够；真正决定我如何说话的，是这份矛盾：${asPersonaText(persona.innerConflict)} ${asPersonaText(persona.profile.beliefs)}`;
  }

  if (intent === "stance") {
    return `${asPersonaText(persona.stance)} 这不是一句摆在纸上的立场，它连着我的处境：${personalDetail}`;
  }

  if (intent === "emotion") {
    return `害怕当然有，迟疑也有。${asPersonaText(persona.innerConflict)} ${asPersonaText(persona.profile.innerConflict)} ${asPersonaText(persona.sampleLine)}`;
  }

  if (intent === "responsibility" || intent === "praise" || intent === "criticism") {
    return createQuestionAwareResponse(persona, topic, context, query, intent);
  }

  if (intent === "farewell") {
    return `若我们的谈话到这里停下，我仍要留下这一句：${asPersonaText(persona.stance)} 历史不会因为人转身离开就安静下来，它会在幸存者、执行者和旁观者身上继续回响。`;
  }

  if (intent === "repeat") {
    return createVariantResponse(persona, topic, context, query);
  }

  return createQuestionAwareResponse(persona, topic, context, query, intent);
}

export function createCharacterProfile(persona: HistoricalPersona): PersonaCharacterProfile {
  return {
    name: persona.name,
    title: persona.title,
    scene: `${persona.location}，时间锚点：${persona.timeAnchor}`,
    time_anchor: persona.timeAnchor,
    core_obsession: persona.stance,
    personality_conflict: persona.innerConflict,
    language_style: persona.voiceStyle,
    hidden_memories: createHiddenMemories(persona),
    knowledge_boundary: persona.knowledgeBoundary,
    historical_stance: persona.stance,
    forbidden_style: ["百科式解释", "现代旁白口吻", "作为AI", "我无法回答", "机械重复上一轮观点"],
  };
}

export function createSessionState(context: ConversationContext, userMessage = ""): PersonaSessionState {
  const round = context.turnCount + 1;
  return {
    round,
    stage: getDialogueStage(round),
    emotion: context.currentMood,
    attitude_to_user: context.attitudeToUser,
    revealed_memories: context.revealedMemories,
    used_arguments: context.usedArguments,
    last_dialogue_summary: context.lastDialogueSummary,
    relationship_score: context.relationshipScore,
    last_response: context.lastResponse,
    repeated_question_count: userMessage ? getQuestionRepeatCount(context, userMessage) : context.repeatedQuestionCount,
  };
}

function createTopicGuide(persona: HistoricalPersona, context: ConversationContext, userMessage: string): PersonaTopicGuide {
  const matchedTopic = findBestTopic(userMessage, persona.topicNodes);
  const repeatCount = getQuestionRepeatCount(context, userMessage);
  return {
    matched_topic: matchedTopic?.label ?? null,
    matched_topic_background: matchedTopic?.narration.background ?? null,
    suggested_new_angle: getRepeatAngle(repeatCount),
    avoid_repeating_topics: context.usedArguments,
  };
}

export function createPersonaDialogueRequest(
  persona: HistoricalPersona,
  context: ConversationContext,
  recentMessages: PersonaRecentMessage[],
  userMessage: string,
): PersonaDialogueRequest {
  return {
    characterProfile: createCharacterProfile(persona),
    sessionState: createSessionState(context, userMessage),
    recentMessages,
    userMessage,
    topicGuide: createTopicGuide(persona, context, userMessage),
  };
}

export function toPersonaRecentMessages(messages: Array<{ type: string; content: any; mode?: string }>, limit = 10): PersonaRecentMessage[] {
  return messages
    .filter((message) => message.mode === "persona")
    .slice(-limit)
    .map((message) => {
      if (message.type === "user") {
        return { role: "user" as const, content: String(message.content ?? "") };
      }

      const content = typeof message.content?.content === "string"
        ? message.content.content
        : typeof message.content?.dialogue === "string"
          ? message.content.dialogue
          : typeof message.content === "string"
            ? message.content
            : "";

      return { role: "character" as const, content };
    })
    .filter((message) => message.content.trim().length > 0);
}

function createVariantResponse(persona: HistoricalPersona, topic: PersonaTopicNode, context: ConversationContext, query: string) {
  const repeatCount = getQuestionRepeatCount(context, query);
  const angle = getRepeatAngle(repeatCount);
  const hiddenMemories = createHiddenMemories(persona);
  const unrevealedMemory = hiddenMemories.find((memory) => !context.revealedMemories.includes(memory));

  if (!context.discussedTopics.includes(topic.id)) {
    return `${createTopicLead(persona, topic, context, "topic")}${createGroundedTopicPoint(persona, topic, context)} ${createPersonalDetail(persona, context, "topic")}`;
  }

  if (angle === "代价") {
    return `代价从来不是写在战报末尾的数字，而是落在人的身体、家庭和良心上。${topic.narration.background} 在我的位置上，我必须承认这件事带来的不是一个干净的结论，而是必须面对的伤亡、动员与责任。${asPersonaText(persona.stance)}`;
  }

  if (angle === "心理阴影") {
    return `${asPersonaText(unrevealedMemory ?? persona.profile.innerConflict)} 这正是我看待“${topic.label}”时绕不开的阴影。它不是一条干净的因果链，而是恐惧、愤怒、责任和自辩交缠在一起的历史。`;
  }

  if (angle === "对后世的反问") {
    return `后世总愿意把这件事放进清楚的格子里，可若站在${persona.year}的${persona.location}，掌握我的边界、我的恐惧和我的责任，就不会轻易把它说成单一答案。${asPersonaText(persona.stance)}`;
  }

  if (angle === "私人记忆") {
    return `${asPersonaText(persona.sampleLine)} 这不是百科答案，而是我记忆里最难被整理的部分。历史落到一个人身上时，不只是在说明事件如何发生，也在逼人承受它如何留下来。`;
  }

  return `${createTopicLead(persona, topic, context, "topic")}${createGroundedTopicPoint(persona, topic, context)} ${createPersonalDetail(persona, context, "topic")}`;
}

function updateLocalMemory(
  persona: HistoricalPersona,
  context: ConversationContext,
  topic: PersonaTopicNode,
  query: string,
  response: string,
) {
  const round = context.turnCount + 1;
  const hiddenMemories = createHiddenMemories(persona);
  const shouldRevealMemory = round > 5 || context.discussedTopics.includes(topic.id);
  const nextMemory = shouldRevealMemory ? hiddenMemories.find((memory) => !context.revealedMemories.includes(memory)) : null;
  const relationshipScore = clampScore(context.relationshipScore + scoreUserAttitude(query), -5, 5);
  const repeatedQuestionCount = getQuestionRepeatCount(context, query);

  return {
    discussedTopics: Array.from(new Set([...context.discussedTopics, topic.id])),
    revealedMemories: unique([...context.revealedMemories, nextMemory]),
    usedArguments: unique([...context.usedArguments, topic.label]),
    relationshipScore,
    repeatedQuestionCount,
    attitudeToUser: getAttitudeByRelationship(relationshipScore),
    lastDialogueSummary: `用户追问“${query.slice(0, 40)}”，${persona.name}围绕“${topic.label}”推进到${getDialogueStage(round)}。`,
    lastResponse: response,
  };
}

export function applyPersonaStructuredResponse(
  persona: HistoricalPersona,
  context: ConversationContext,
  userMessage: string,
  response: PersonaStructuredResponse,
): ConversationContext {
  const topic = findBestTopic(userMessage, persona.topicNodes);
  const round = context.turnCount + 1;
  const relationshipDelta = response.memory_update?.relationship_delta ?? scoreUserAttitude(userMessage);
  const relationshipScore = clampScore(context.relationshipScore + relationshipDelta, -5, 5);
  const repeatedQuestionCount = getQuestionRepeatCount(context, userMessage);

  return {
    ...context,
    discussedTopics: topic ? Array.from(new Set([...context.discussedTopics, topic.id])) : context.discussedTopics,
    lastTopicId: topic?.id ?? context.lastTopicId,
    turnCount: round,
    currentMood: response.emotion || context.currentMood,
    currentEmotion: scoreEmotionText(response.emotion, context.currentEmotion),
    stage: getDialogueStage(round),
    attitudeToUser: response.attitude_shift || getAttitudeByRelationship(relationshipScore),
    revealedMemories: unique([...context.revealedMemories, ...(response.memory_update?.revealed_memories ?? [])]),
    usedArguments: unique([...context.usedArguments, ...(response.memory_update?.used_arguments ?? []), topic?.label]),
    lastDialogueSummary: response.memory_update?.last_dialogue_summary || summarizeDialogue(userMessage, response),
    relationshipScore,
    lastResponse: response.dialogue,
    lastUserMessage: normalize(userMessage),
    repeatedQuestionCount,
  };
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
    stage: "试探期",
    attitudeToUser: "保持距离，试探用户真正意图",
    revealedMemories: [],
    usedArguments: [],
    lastDialogueSummary: "对话尚未开始。",
    relationshipScore: 0,
    lastResponse: "",
    lastUserMessage: "",
    repeatedQuestionCount: 0,
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
  followUpQuestions?: string[];
  narration?: PersonaResponseNarration;
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

  const skill = createCrossTimeDialogueSkill(persona);
  const exactTopic = findBestTopic(query, skill.topics);
  const userIntent = detectUserIntent(query, context, exactTopic);
  const retrievedChunks = retrievePersonaCorpus(skill, query, context, userIntent);
  const selectedTopic = selectTopicForLocalResponse(skill, context, exactTopic, retrievedChunks, userIntent);
  const isFallback = !exactTopic && !retrievedChunks.some((entry) => entry.chunk.topicId === selectedTopic?.id);

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

  const narration: PersonaResponseNarration = {
    ...selectedTopic.narration,
    fallbackNote: isFallback ? `未精确命中问题，已转入话题节点：${selectedTopic.label}` : undefined,
  };

  const nextDiscussed = Array.from(new Set([...context.discussedTopics, selectedTopic.id]));
  const response = polishResponseText(createIntentResponse(persona, selectedTopic, context, query, userIntent));
  const localMemory = updateLocalMemory(persona, context, selectedTopic, query, response);
  const followUpQuestions = createPersonaFollowUpQuestions(
    persona,
    selectedTopic,
    persona.topicNodes,
    context,
    query,
    userIntent,
  );

  return {
    response,
    mood: selectedTopic.mood,
    emotionScore: selectedTopic.emotionScore,
    followUpHint: followUpQuestions[0] ?? createFollowUpHint(selectedTopic, persona.topicNodes, nextDiscussed),
    followUpQuestions,
    narration: context.turnCount === 0 ? narration : undefined,
    context: {
      ...context,
      discussedTopics: localMemory.discussedTopics,
      lastTopicId: selectedTopic.id,
      turnCount: context.turnCount + 1,
      currentMood: selectedTopic.mood,
      currentEmotion: selectedTopic.emotionScore,
      stage: skill.getStage(context.turnCount + 1),
      attitudeToUser: localMemory.attitudeToUser,
      revealedMemories: localMemory.revealedMemories,
      usedArguments: localMemory.usedArguments,
      lastDialogueSummary: localMemory.lastDialogueSummary,
      relationshipScore: localMemory.relationshipScore,
      lastResponse: localMemory.lastResponse,
      lastUserMessage: normalize(query),
      repeatedQuestionCount: localMemory.repeatedQuestionCount,
    },
  };
}
