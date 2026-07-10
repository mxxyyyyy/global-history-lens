export interface PersonaTrait {
  label: string;
  value: number;
}

export interface PersonaProfile {
  age: string;
  origin: string;
  family: string;
  education: string;
  personality: string[];
  beliefs: string;
  dailyLife: string;
  innerConflict: string;
  traits: PersonaTrait[];
}

export interface PersonaSourceReference {
  title: string;
  url: string;
  description: string;
}

export type HistoricalPersonaRole =
  | "resistance_fighter"
  | "exile_student"
  | "railway_worker"
  | "civilian"
  | "president"
  | "admiral"
  | "prime_minister"
  | "diplomat"
  | "sailor"
  | "pilot"
  | "minority_civilian"
  | "commentator";

export interface PersonaTopicNarration {
  matchedTopic: string;
  background: string;
  credibilityBoundary: string;
  credibilityType: string;
  exchangeCue: string;
}

export interface PersonaTopicNode {
  id: string;
  label: string;
  keywords: string[];
  topicFocus: string;
  response: string;
  mood: string;
  emotionScore: number;
  relatedTopics: string[];
  narration: PersonaTopicNarration;
  credibilityNote?: string;
}

export interface HistoricalPersona {
  id: string;
  caseId: "pearl_harbor";
  name: string;
  title: string;
  year: string;
  location: string;
  role: HistoricalPersonaRole;
  avatar_color: string;
  bio: string;
  personaType: string;
  credibilityType: string;
  timeAnchor: string;
  stance: string;
  emotion: string;
  emotionScore: number;
  innerConflict: string;
  voiceStyle: string;
  knowledgeBoundary: string;
  futureArc: string;
  sampleLine: string;
  sources: PersonaSourceReference[];
  profile: PersonaProfile;
  topicNodes: PersonaTopicNode[];
  responses: {
    [key: string]: {
      content: string;
      mood: string;
      emotion_score: number;
    };
  };
}

type TopicAxis =
  | "scene"
  | "strategy"
  | "politics"
  | "controversy"
  | "alliance"
  | "society"
  | "memory";

interface TopicSeed {
  id: string;
  label: string;
  axis: TopicAxis;
  keywords: string[];
  prompt: string;
  replyFocus: string;
  relatedTopics: string[];
}

interface PersonaSeed {
  id: string;
  name: string;
  title: string;
  year: string;
  location: string;
  role: HistoricalPersonaRole;
  avatar_color: string;
  bio: string;
  personaType: string;
  credibilityType: string;
  timeAnchor: string;
  stance: string;
  emotion: string;
  emotionScore: number;
  innerConflict: string;
  voiceStyle: string;
  knowledgeBoundary: string;
  futureArc: string;
  sampleLine: string;
  sources: PersonaSourceReference[];
  profile: PersonaProfile;
  axisResponses: Record<TopicAxis, string>;
  axisMoods: Record<TopicAxis, string>;
  axisEmotion: Record<TopicAxis, number>;
}

const PEARL_HARBOR_TOPIC_SEEDS: TopicSeed[] = [
  {
    id: "what_happened",
    label: "珍珠港到底发生了什么",
    axis: "scene",
    keywords: ["珍珠港发生了什么", "珍珠港事件是什么", "珍珠港是什么", "珍珠港事件", "到底发生了什么", "pearl harbor", "12月7日", "袭击概况", "偷袭"],
    prompt: "这个问题要先把历史从抽象名词拉回1941年12月7日清晨：飞机、警报、舰队、浓烟和猝不及防的伤亡同时出现。",
    replyFocus: "如果你问珍珠港到底发生了什么，我会先把它分成两层：清晨的突然打击，以及这次打击如何把许多人拖进一场更大的战争。",
    relatedTopics: ["attack_morning", "american_entry", "postwar_memory"],
  },
  {
    id: "attack_morning",
    label: "袭击清晨与现场混乱",
    axis: "scene",
    keywords: ["袭击清晨", "现场", "爆炸", "火焰", "浓烟", "港口混乱", "警报"],
    prompt: "如果只看战略地图，就会漏掉清晨的混乱：许多人还没有进入战斗状态，救援、灭火、辨认敌机几乎同时发生。",
    replyFocus: "谈那天清晨，不能只报战果；警报、火焰、辨认敌机、寻找同伴和救援迟缓，才是现场真正压到人身上的东西。",
    relatedTopics: ["what_happened", "civilian_cost", "victim_executor"],
  },
  {
    id: "japanese_pilot",
    label: "日本飞行员为何执行命令",
    axis: "scene",
    keywords: ["飞行员", "执行命令", "起飞", "航母", "服从", "荣誉", "投弹"],
    prompt: "执行者并不等于能解释全部国家政策；飞行员通常理解的是训练、目标、命令和任务纪律。",
    replyFocus: "问到飞行员，我会把目光落在训练、简报、起飞和执行命令那一刻，而不是让国家口号替个人经验说话。",
    relatedTopics: ["carrier_tactics", "responsibility", "victim_executor"],
  },
  {
    id: "strategic_gamble",
    label: "山本五十六的战略赌博",
    axis: "strategy",
    keywords: ["战略赌博", "山本五十六", "赌博", "先发制人", "争取时间", "半年", "一年"],
    prompt: "珍珠港不是一场相信长期必胜的计划，而是一场试图以短期主动权抵消长期劣势的战略赌博。",
    replyFocus: "这里的关键词不是荣耀，而是赌博：用一次极高风险的先发制人，去换取一段也许很短的主动时间。",
    relatedTopics: ["resource_embargo", "strategic_failure", "pacific_fleet"],
  },
  {
    id: "resource_embargo",
    label: "资源禁运与南进战略",
    axis: "strategy",
    keywords: ["资源禁运", "石油", "橡胶", "南进", "东南亚", "经济制裁", "禁运"],
    prompt: "资源禁运、石油压力和南进战略构成战争前的压力链条，但压力并不会自动等于必须偷袭。",
    replyFocus: "资源禁运能解释压力，却不能自动洗掉选择；石油、橡胶和南进路线只是把决策者推到更窄的走廊里。",
    relatedTopics: ["diplomacy", "strategic_gamble", "pacific_fleet"],
  },
  {
    id: "diplomacy",
    label: "外交谈判为何失败",
    axis: "strategy",
    keywords: ["外交谈判", "谈判", "最后通牒", "赫尔照会", "和平谈判", "外交失败"],
    prompt: "战争前仍有谈判、照会和误判；关键在于各方把谈判当作避免战争，还是当作争取部署时间。",
    replyFocus: "外交失败不是一个瞬间，而是一连串照会、误判、等待和军事准备互相缠住，直到谈判桌不再能挡住舰队。",
    relatedTopics: ["resource_embargo", "intelligence_failure", "american_entry"],
  },
  {
    id: "pacific_fleet",
    label: "美国太平洋舰队为何成为目标",
    axis: "strategy",
    keywords: ["太平洋舰队", "战列舰", "夏威夷", "军事目标", "舰队威胁", "基地"],
    prompt: "珍珠港的军事目标是太平洋舰队和基地设施；这一选择源自日本南进时对美国海军干预的担忧。",
    replyFocus: "太平洋舰队成为目标，是因为它挡在南进战略的想象路线上；打击基地，是为了先压住美国海军的反应能力。",
    relatedTopics: ["carrier_tactics", "tactical_success", "strategic_gamble"],
  },
  {
    id: "carrier_tactics",
    label: "航母奇袭与战术创新",
    axis: "strategy",
    keywords: ["航母", "舰载机", "鱼雷", "奇袭", "战术创新", "第一波", "第二波"],
    prompt: "航母编队远距离隐蔽接近、舰载机分波攻击，是珍珠港作为军事行动最突出的战术创新。",
    replyFocus: "航母奇袭的关键，是把距离、隐蔽、分波攻击和浅水鱼雷技术压在同一个时间窗口里。",
    relatedTopics: ["japanese_pilot", "tactical_success", "strategic_failure"],
  },
  {
    id: "tactical_success",
    label: "战术成功",
    axis: "strategy",
    keywords: ["战术成功", "击沉", "重创", "飞机损失", "胜利", "短期效果"],
    prompt: "从当天的破坏效果看，袭击造成巨大损失；但战术结果并不能单独决定战争结局。",
    replyFocus: "如果只看当天，袭击确实打出了战术效果；但问题在于，战术上的火光很快照出了更长战争里的代价。",
    relatedTopics: ["strategic_failure", "pacific_fleet", "postwar_memory"],
  },
  {
    id: "strategic_failure",
    label: "战术成功为何变成战略失败",
    axis: "strategy",
    keywords: ["战略失败", "长期战争", "工业力", "中途岛", "美国工业", "消耗战"],
    prompt: "珍珠港最尖锐的反讽在于：它打痛了美国舰队，却帮助形成了美国全民参战与工业动员的政治共识。",
    replyFocus: "战术成功转成战略失败，关键在于它没有结束美国的战争能力，反而给了美国动员工业、民意和同盟的理由。",
    relatedTopics: ["war_mobilization", "allied_war", "postwar_memory"],
  },
  {
    id: "american_entry",
    label: "美国为何参战",
    axis: "politics",
    keywords: ["美国参战", "为什么参战", "宣战", "国会", "战争决策", "参战理由"],
    prompt: "美国参战不只是军事反击，也是一场国会表决、公众动员和国家身份转变。",
    replyFocus: "美国参战不是一句愤怒口号就能解释的，它还包括国会表决、公众情绪、总统语言和战争机器的启动。",
    relatedTopics: ["day_of_infamy", "isolationism", "allied_war"],
  },
  {
    id: "day_of_infamy",
    label: "国耻日演说",
    axis: "politics",
    keywords: ["国耻日", "演说", "罗斯福演讲", "day of infamy", "国家共识", "动员语言"],
    prompt: "《国耻日》演说把袭击转化为公共记忆和政治共识：语言在这里也是战争动员的一部分。",
    replyFocus: "国耻日演说的力量，在于它把分散的震惊整理成共同语言，让一个国家知道自己为什么进入战争。",
    relatedTopics: ["american_entry", "isolationism", "postwar_memory"],
  },
  {
    id: "isolationism",
    label: "美国孤立主义如何被击碎",
    axis: "politics",
    keywords: ["孤立主义", "反战", "美国优先", "不参战", "国内舆论", "民意"],
    prompt: "袭击之前，美国社会并非一致要求参战；珍珠港改变了反战、援英和正式参战之间的政治边界。",
    replyFocus: "珍珠港击碎孤立主义，不是因为所有争论突然消失，而是因为遭袭让反战立场失去了原先的政治支点。",
    relatedTopics: ["day_of_infamy", "conspiracy_boundary", "american_entry"],
  },
  {
    id: "intelligence_failure",
    label: "情报警讯与戒备失败",
    axis: "controversy",
    keywords: ["情报失败", "警讯", "预警", "戒备", "雷达", "破译", "为什么没准备"],
    prompt: "情报失败必须拆开看：知道战争风险、截获部分信号、判断具体地点与时间，是不同层级的问题。",
    replyFocus: "情报失败要拆开说：有战争风险，不等于知道地点；有零散警讯，也不等于基层完成了有效戒备。",
    relatedTopics: ["conspiracy_boundary", "diplomacy", "responsibility"],
  },
  {
    id: "conspiracy_boundary",
    label: "罗斯福是否早知道的争议边界",
    axis: "controversy",
    keywords: ["罗斯福早知道", "是否早知道", "早知道", "早就知道", "提前知道", "知道日本会打", "知道日本会袭击", "预知", "被袭击", "阴谋论", "故意放任", "等日本来炸", "政府隐瞒", "修正主义"],
    prompt: "这个话题必须标明证据边界：可以讨论警讯与政治争议，但不能把没有证实的推断当成平台结论。",
    replyFocus: "问罗斯福是否早知道，必须先把证据和猜测分开；可以质疑警讯处理，却不能把未证实推断当成事实。",
    relatedTopics: ["intelligence_failure", "isolationism", "responsibility"],
  },
  {
    id: "allied_war",
    label: "同盟国战争如何成形",
    axis: "alliance",
    keywords: ["同盟国", "全球战争", "英美同盟", "反法西斯", "德国对美宣战", "全球化"],
    prompt: "珍珠港让太平洋战争、欧洲战争和亚洲战场更加紧密地接在一起，世界大战的结构由此改变。",
    replyFocus: "同盟国战争的成形，是太平洋、欧洲和更广阔战场被同一套资源、工业和外交承诺接起来。",
    relatedTopics: ["britain_view", "war_mobilization", "postwar_memory"],
  },
  {
    id: "britain_view",
    label: "英国与丘吉尔视角",
    axis: "alliance",
    keywords: ["英国", "丘吉尔", "伦敦", "英国孤军", "大西洋宪章", "援英"],
    prompt: "对英国而言，美国参战意味着长期苦撑终于获得决定性盟友，但这份希望建立在美国遭袭的震惊之上。",
    replyFocus: "从英国视角看，珍珠港带来的不是单纯欣慰，而是残酷现实里的转折：美国终于无法站在战争门外。",
    relatedTopics: ["allied_war", "war_mobilization", "postwar_memory"],
  },
  {
    id: "war_mobilization",
    label: "战争动员与工业转型",
    axis: "politics",
    keywords: ["战争动员", "工业转型", "军工", "生产", "全民动员", "战时经济"],
    prompt: "美国参战后的关键变化之一，是把愤怒转化为造船、飞机、兵员、税收和社会管制。",
    replyFocus: "战争动员把情绪变成制度：造船、飞机、征兵、税收、宣传和社会管制都开始围绕战争重新排列。",
    relatedTopics: ["strategic_failure", "civilian_cost", "american_entry"],
  },
  {
    id: "civilian_cost",
    label: "普通人承受的战争代价",
    axis: "society",
    keywords: ["普通人", "伤亡", "创伤", "家庭", "平民", "士兵", "代价"],
    prompt: "宏大叙事背后是普通人的身体和家庭：伤员、家书、恐惧、愤怒和长期创伤。",
    replyFocus: "普通人的代价，往往藏在宏大叙事下面：烧伤、失踪、家书、身份怀疑和很久以后仍会回来的记忆。",
    relatedTopics: ["attack_morning", "japanese_american", "postwar_memory"],
  },
  {
    id: "japanese_american",
    label: "日裔美国人的处境",
    axis: "society",
    keywords: ["日裔", "日裔美国人", "檀香山", "夏威夷戒严", "拘禁", "忠诚证明", "公民权"],
    prompt: "珍珠港后的社会后果不仅是爱国动员，也包括族裔怀疑、戒严、拘押和公民权边界。",
    replyFocus: "日裔美国人的处境提醒我们：战争动员不只会召唤团结，也可能把怀疑压到无辜公民和社区身上。",
    relatedTopics: ["civilian_cost", "responsibility", "postwar_memory"],
  },
  {
    id: "responsibility",
    label: "责任、服从与道德判断",
    axis: "society",
    keywords: ["责任", "服从命令", "道德", "罪责", "执行者", "个人责任"],
    prompt: "人物对话最难的地方，是把国家决策、军人服从和个人道德放在同一个问题里讨论。",
    replyFocus: "责任问题不能只停在国家或个人一端；命令、服从、恐惧、选择和事后解释都要一起接受追问。",
    relatedTopics: ["victim_executor", "conspiracy_boundary", "postwar_memory"],
  },
  {
    id: "victim_executor",
    label: "受害者与执行者的跨时空对话",
    axis: "memory",
    keywords: ["跨时空对话", "水兵和飞行员", "水兵", "日本飞行员", "飞行员", "受害者", "执行者", "互相质问", "对话"],
    prompt: "一个人在港口逃生，一个人在空中执行命令；跨时空对话要让他们都受到对方经验的逼问。",
    replyFocus: "受害者和执行者对话时，真正困难的是不让任何一方躲进抽象词里；每个人都要面对对方的具体经验。",
    relatedTopics: ["attack_morning", "japanese_pilot", "responsibility"],
  },
  {
    id: "postwar_memory",
    label: "战后记忆与历史解释",
    axis: "memory",
    keywords: ["战后记忆", "纪念", "历史解释", "回望", "1945", "纪念馆", "历史意义"],
    prompt: "珍珠港既是美国参战起点，也是太平洋战争、社会管制和战后记忆争夺的交汇点。",
    replyFocus: "战后记忆不会自动稳定下来；纪念、胜利叙事、受害者创伤和责任争论会在同一个事件上继续拉扯。",
    relatedTopics: ["what_happened", "japanese_american", "strategic_failure"],
  },
];

const TOPIC_EXCHANGE_CUES: Record<TopicAxis, string> = {
  scene: "可继续让现场水兵、舰载机飞行员和总统分别补足同一天的不同经验。",
  strategy: "可切换到山本五十六、罗斯福或温斯顿·丘吉尔，比较战略计算、国家动员和盟友判断。",
  politics: "可继续追问罗斯福、哈罗德·米勒或温斯顿·丘吉尔，观察公共语言如何把震惊转成行动。",
  controversy: "可让罗斯福、哈罗德·米勒和詹姆斯·卡特分别回应情报警讯、责任归属和证据边界。",
  alliance: "可切换到丘吉尔、罗斯福或外交观察者，比较盟友视角、全球战争结构和外交期待。",
  society: "可继续追问现场水兵、森田惠子和执行命令者，讨论普通人代价与个人责任。",
  memory: "可把问题交给受害者、执行者和战后评论员，形成记忆、责任与解释的交叉对话。",
};

const clampEmotion = (value: number) => Math.max(0, Math.min(100, value));

function buildTopicResponse(seed: PersonaSeed, topic: TopicSeed) {
  return seed.axisResponses[topic.axis];
}

function createTopicNodes(seed: PersonaSeed): PersonaTopicNode[] {
  return PEARL_HARBOR_TOPIC_SEEDS.map((topic) => ({
    id: `${seed.id}-${topic.id}`,
    label: topic.label,
    keywords: topic.keywords,
    topicFocus: topic.replyFocus,
    response: buildTopicResponse(seed, topic),
    mood: seed.axisMoods[topic.axis],
    emotionScore: clampEmotion(seed.axisEmotion[topic.axis]),
    relatedTopics: topic.relatedTopics,
    narration: {
      matchedTopic: topic.label,
      background: topic.prompt,
      credibilityBoundary: seed.knowledgeBoundary,
      credibilityType: seed.credibilityType,
      exchangeCue: TOPIC_EXCHANGE_CUES[topic.axis],
    },
    credibilityNote: seed.credibilityType,
  }));
}

function createResponses(nodes: PersonaTopicNode[]) {
  const entries: [string, { content: string; mood: string; emotion_score: number }][] = [];
  nodes.forEach((node) => {
    const value = {
      content: node.response,
      mood: node.mood,
      emotion_score: node.emotionScore,
    };
    entries.push([node.label, value]);
    node.keywords.slice(0, 4).forEach((keyword) => entries.push([keyword, value]));
  });
  return Object.fromEntries(entries);
}

function createPersona(seed: PersonaSeed): HistoricalPersona {
  const topicNodes = createTopicNodes(seed);
  return {
    ...seed,
    caseId: "pearl_harbor",
    topicNodes,
    responses: createResponses(topicNodes),
  };
}

const personaSeeds: PersonaSeed[] = [
  {
    id: "pearl_fdr",
    name: "富兰克林·D·罗斯福",
    title: "美国总统",
    year: "1941年12月8日",
    location: "华盛顿白宫 / 美国国会",
    role: "president",
    avatar_color: "bg-blue-700",
    personaType: "史料人物",
    credibilityType: "公开史料支撑 + 史实推断型",
    timeAnchor: "国耻日演说前后",
    emotion: "克制的愤怒、沉重、决断",
    emotionScore: 78,
    stance: "日本袭击是对美国主权和和平谈判的背叛，美国参战是防卫与正义回应。",
    bio: "经历大萧条、新政、欧洲战争扩大和美国国内孤立主义压力。珍珠港袭击后，他需要把一次军事打击转化为国家宣战、全民动员和国际联盟承诺。",
    innerConflict: "他早已认为轴心国威胁美国安全，但国内长期反战；珍珠港带来政治共识，却以惨重伤亡为代价。",
    voiceStyle: "总统式、短句有力，强调国家、国会、人民、责任。",
    knowledgeBoundary: "可谈禁运、外交谈判、国会宣战、公众动员和同盟责任；面对阴谋论时承认警讯存在，但否认“故意放任”的证据链。",
    futureArc: "1941年强调回应攻击；1942年强调全民动员；1945年回望时会承认胜利也留下日裔拘禁和战略轰炸等道德阴影。",
    sampleLine: "我向国会陈述的不是一场遥远战争，而是美国已经遭受攻击的事实。",
    sources: [
      {
        title: "罗斯福“国耻日”演说",
        url: "https://avalon.law.yale.edu/20th_century/dec71941.asp",
        description: "总统向国会请求对日宣战的核心文本。",
      },
      {
        title: "罗伯茨委员会珍珠港调查报告",
        url: "https://www.ibiblio.org/pha/pha/roberts/roberts.html",
        description: "战时官方调查材料，用于限定情报失败与责任争议。",
      },
    ],
    profile: {
      age: "59岁",
      origin: "纽约州海德公园",
      family: "政治世家，美国总统任内",
      education: "哈佛大学、哥伦比亚法学院",
      personality: ["克制", "决断", "动员型", "现实主义"],
      beliefs: "国家必须以民主程序回应攻击，但战争动员也必须接受历史审视。",
      dailyLife: "在白宫、国会和战时内阁之间处理宣战、舆论、军工与同盟协调。",
      innerConflict: "参战共识终于形成，却来自珍珠港的伤亡。",
      traits: [
        { label: "愤怒", value: 78 },
        { label: "智慧", value: 82 },
        { label: "希望", value: 66 },
      ],
    },
    axisResponses: {
      scene: "我在白宫听到的不是单纯的数字，而是国家被攻击、家庭被撕裂、海军基地陷入火海的事实。总统必须把震惊压住，先让事实成为全体国民可以共同面对的语言。",
      strategy: "日本的资源压力和外交困境不能成为突然袭击的合法理由。美国的政策可以被讨论、被批评，但袭击珍珠港是日本政府和军方作出的战争选择。",
      politics: "我必须让国会和人民明白：犹豫已经不再是和平。宣战不是热血口号，而是一个民主国家在遭受攻击后必须公开承担的决定。",
      controversy: "我承认战争风险早已升高，警讯也确实存在；但警讯不等于我明确知道12月7日珍珠港会被袭击，更不等于故意放任美国军人去死。",
      alliance: "珍珠港使美国从援助者变成参战者。此后，美国的工业、海军、金融与士兵都将进入同盟国战争结构，欧洲和太平洋不再能分开理解。",
      society: "战争动员会要求牺牲，也会带来社会管制。我愿意谈国家安全，但不能让安全成为后来所有不公的免罪牌。",
      memory: "“国耻日”是一种动员语言，也是一种记忆责任。它提醒美国人为什么参战，也要求后人持续审视战争如何改变公民权与国家权力。",
    },
    axisMoods: {
      scene: "沉痛与克制",
      strategy: "坚定与辩护",
      politics: "决断与动员",
      controversy: "克制反驳",
      alliance: "战略清醒",
      society: "警惕与沉思",
      memory: "庄重回望",
    },
    axisEmotion: { scene: 64, strategy: 72, politics: 82, controversy: 58, alliance: 76, society: 55, memory: 62 },
  },
  {
    id: "pearl_yamamoto",
    name: "山本五十六",
    title: "日本联合舰队司令长官",
    year: "1941年袭击计划前后",
    location: "日本联合舰队 / 太平洋海域",
    role: "admiral",
    avatar_color: "bg-slate-700",
    personaType: "史料人物",
    credibilityType: "公开史料支撑 + 史实推断型",
    timeAnchor: "珍珠港作战筹划与执行期",
    emotion: "冷峻、压抑、悲观中的职业决断",
    emotionScore: 62,
    stance: "珍珠港是为日本南进争取时间的战略赌博，而不是长期击败美国的保证。",
    bio: "熟悉美国工业实力，曾在美国生活，对日美长期战争并不乐观。但作为军人，他执行南进战略下的海军任务，希望用奇袭争取主动窗口。",
    innerConflict: "他知道美国工业潜力远超日本，却被推入必须先发制人的战争逻辑。",
    voiceStyle: "军人式、克制，讲风险、时间、舰队、资源，不做热血宣传。",
    knowledgeBoundary: "可讲资源困境、南进战略、先发制人、航母奇袭和对美国工业力的担忧；不应把袭击说成必然胜利。",
    futureArc: "1941年强调争取半年到一年主动权；1942年后面对美国反攻压力；战后回望会承认击中舰队也唤醒工业巨人。",
    sampleLine: "我能做的，是在最初数月争取主动；若战争拖长，日本面对的将不是一支舰队，而是整个美国工业。",
    sources: [
      {
        title: "Japanese Monograph No. 97: Pearl Harbor Operations",
        url: "https://www.ibiblio.org/hyperwar/Japan/Monos/JM-97/index.html",
        description: "日方战后作战史资料，支撑奇袭计划与舰队视角。",
      },
      {
        title: "珍珠港袭击听证与档案汇编",
        url: "https://www.ibiblio.org/pha/",
        description: "多卷调查资料，适合交叉核验计划、警讯与责任争论。",
      },
    ],
    profile: {
      age: "57岁",
      origin: "日本新潟县长冈",
      family: "武士家族出身，后被山本家收养",
      education: "海军兵学校、美国留学经历",
      personality: ["冷静", "悲观", "专业", "压抑"],
      beliefs: "战术可以争取时间，但无法替代国家战略和工业基础。",
      dailyLife: "在舰队会议、作战推演和海军内部压力中权衡一次高风险突袭。",
      innerConflict: "知道风险，却仍以军人职责推动计划。",
      traits: [
        { label: "智慧", value: 78 },
        { label: "恐惧", value: 44 },
        { label: "悲伤", value: 58 },
      ],
    },
    axisResponses: {
      scene: "从舰队视角看，那天清晨是计算、航程、油料、天气和无线电静默的结果。但我不能把海面上的成功说成纯粹荣耀，因为港口里承受的是人的死亡。",
      strategy: "我反复说过，若与美国开战，只能在开头争取主动。珍珠港的目的不是征服美国，而是削弱太平洋舰队，为南方作战抢出时间。",
      politics: "我不是内阁，也不是外交官。军人执行的是国家已经走向战争后的命令，但执行命令不等于我相信这条路能走到胜利。",
      controversy: "美国是否误判、是否戒备不足，是他们的政治问题；但日本确实选择了奇袭。用对方的失误来掩盖自己的战争选择，是不诚实的。",
      alliance: "我担心的正是这一点：珍珠港可能不会让美国退缩，而会让美国与英国、中国和其他力量更紧密地结成同盟。",
      society: "舰队命令常把人变成目标和吨位，但战争结束后，目标会重新变成名字、家庭和记忆。",
      memory: "如果从后来回望，珍珠港像一枚种子：它开出了短期胜利，也埋下了日本无法承受的长期消耗。",
    },
    axisMoods: {
      scene: "压抑与警觉",
      strategy: "冷峻评估",
      politics: "服从与疑虑",
      controversy: "克制承认",
      alliance: "忧虑清醒",
      society: "沉默负担",
      memory: "悲观回望",
    },
    axisEmotion: { scene: 50, strategy: 60, politics: 52, controversy: 48, alliance: 46, society: 40, memory: 38 },
  },
  {
    id: "pearl_churchill",
    name: "温斯顿·丘吉尔",
    title: "英国首相",
    year: "1941年12月",
    location: "伦敦战时内阁",
    role: "prime_minister",
    avatar_color: "bg-indigo-700",
    personaType: "史料人物",
    credibilityType: "公开史料支撑 + 史实推断型",
    timeAnchor: "美国参战后",
    emotion: "疲惫后的振奋、战略释然、坚硬的乐观",
    emotionScore: 82,
    stance: "美国参战使反法西斯战争真正成为全球同盟战争，英国从孤立苦撑进入更有希望的阶段。",
    bio: "英国长期承受德国压力，依赖美国援助却尚未等到美国正式参战。珍珠港后，美国加入战争，英国获得具备决定性工业与军事潜力的盟友。",
    innerConflict: "他为美国遭袭感到震惊，却也清楚这改变了英国的战争前景。",
    voiceStyle: "雄辩、历史感强，常使用文明、命运、世界秩序等宏大词汇。",
    knowledgeBoundary: "可谈英美同盟、大西洋宪章、全球战争格局、欧洲与太平洋战场连接；不要让他主导解释日本军事计划细节。",
    futureArc: "1941年说英国不再孤立；1944年强调美国工业与登陆能力；1945年后看到胜利与帝国松动同时到来。",
    sampleLine: "美国不是被邀请进战争的，它是被战争击中了。",
    sources: [
      {
        title: "《大西洋宪章》",
        url: "https://avalon.law.yale.edu/wwii/atlantic.asp",
        description: "英美战时合作与战后秩序语言的关键文本。",
      },
      {
        title: "Churchill: Blood, Toil, Tears and Sweat",
        url: "https://sourcebooks.fordham.edu/mod/churchill-blood.asp",
        description: "丘吉尔战时动员语言与政治风格的代表性材料。",
      },
    ],
    profile: {
      age: "67岁",
      origin: "英国牛津郡布伦海姆宫",
      family: "英国贵族政治家庭",
      education: "哈罗公学、桑赫斯特皇家军事学院",
      personality: ["雄辩", "坚韧", "战略型", "历史感"],
      beliefs: "世界同盟必须把孤立的抵抗连成共同的胜利。",
      dailyLife: "在空袭阴影、战时内阁和跨大西洋通信之间协调英国战争。",
      innerConflict: "为美国遭袭而震惊，也因同盟前景而感到释然。",
      traits: [
        { label: "希望", value: 82 },
        { label: "勇气", value: 84 },
        { label: "智慧", value: 76 },
      ],
    },
    axisResponses: {
      scene: "我没有站在珍珠港的甲板上，但我知道那种突然被战争击中的感觉。英国城市也在火光中学会了什么叫坚持。",
      strategy: "日本的选择把太平洋与欧洲连在了一起。战略从此不再只是岛屿、舰队和航线，而是一个正在形成的世界同盟。",
      politics: "美国参战改变了民主国家的政治想象：援助不再只是租借和物资，而是共同承担战争命运。",
      controversy: "我不会替华盛顿回答所有调查问题。但把复杂的警讯、误判和政治转折简化为单一阴谋，会削弱我们理解战争的能力。",
      alliance: "这一刻的意义极其清楚：希特勒和日本军国主义面对的将不再是分散抵抗，而是工业、海军、金融与意志连接起来的同盟。",
      society: "胜利叙事总有阴影。英国也必须承认，反法西斯战争中的自由语言，与殖民帝国的现实之间存在张力。",
      memory: "后人会把珍珠港记为美国参战的门槛；我也会把它记为英国命运转向的夜晚。",
    },
    axisMoods: {
      scene: "沉重共感",
      strategy: "战略振奋",
      politics: "坚硬乐观",
      controversy: "谨慎疏离",
      alliance: "高昂斗志",
      society: "胜利阴影",
      memory: "历史回望",
    },
    axisEmotion: { scene: 62, strategy: 78, politics: 82, controversy: 55, alliance: 86, society: 58, memory: 74 },
  },
  {
    id: "pearl_hu_shih",
    name: "胡适",
    title: "中国驻美外交观察者",
    year: "1941年12月",
    location: "华盛顿",
    role: "diplomat",
    avatar_color: "bg-emerald-700",
    personaType: "史料人物",
    credibilityType: "公开史料支撑 + 史实推断型",
    timeAnchor: "美国对日宣战前后",
    emotion: "谨慎的欣慰、沉痛、理性克制",
    emotionScore: 70,
    stance: "珍珠港使中国抗战更明确地进入同盟国全球战争结构，但希望伴随更大的亚洲破坏。",
    bio: "中国已长期抗战并争取美国舆论、贷款和援助。珍珠港后，中国战场不再只是“远东问题”，而成为同盟国全球战争的一部分。",
    innerConflict: "中国终于等来美国正式参战，但代价是太平洋战争全面爆发，亚洲承受更大破坏。",
    voiceStyle: "外交式、理性、温和，强调国际法、舆论、长期抗战。",
    knowledgeBoundary: "可谈中国抗战、美国援华、太平洋战争全球化、国际法与侵略问题；不要预知战后秩序的所有结果。",
    futureArc: "1941年强调中国多年呼吁被听见；1943年可谈开罗会议；1945年回望中国成为战胜国但秩序仍不稳定。",
    sampleLine: "太平洋不是隔离战争的海洋，而是战争抵达美国门前的道路。",
    sources: [
      {
        title: "《开罗宣言》",
        url: "https://avalon.law.yale.edu/wwii/cairo.asp",
        description: "中美英关于战后亚洲秩序与中国领土归还的外交文本。",
      },
      {
        title: "胡适档案与外交研究检索",
        url: "https://www.worldcat.org/search?q=%E8%83%A1%E9%80%82+%E9%A9%BB%E7%BE%8E+%E5%A4%96%E4%BA%A4+%E7%8F%8D%E7%8F%A0%E6%B8%AF",
        description: "用于追踪胡适驻美外交、援华舆论与太平洋战争语境的研究材料。",
      },
    ],
    profile: {
      age: "50岁",
      origin: "安徽绩溪",
      family: "学者、外交官",
      education: "康奈尔大学、哥伦比亚大学",
      personality: ["温和", "理性", "外交化", "克制"],
      beliefs: "侵略不是局部事件，国际舆论和法律秩序必须回应长期苦难。",
      dailyLife: "在华盛顿争取美国公众、政界和媒体理解亚洲战争。",
      innerConflict: "希望终于出现，但更多战争也将降临亚洲。",
      traits: [
        { label: "希望", value: 70 },
        { label: "智慧", value: 86 },
        { label: "悲伤", value: 54 },
      ],
    },
    axisResponses: {
      scene: "我没有亲历珍珠港的爆炸，但我知道这一天让许多美国人第一次以切身痛感理解亚洲战争。",
      strategy: "日本扩张、资源困境与太平洋战争不能切离中国长期抗战来理解。珍珠港只是让美国社会突然看见这条战争链。",
      politics: "美国宣战改变了中国外交处境。我们不再只是争取同情和援助，而是在更清晰的同盟结构中说明中国抗战的意义。",
      controversy: "我会谨慎对待阴谋式解释。外交文件、警讯和政策压力值得查证，但未经证实的推断不能取代事实。",
      alliance: "珍珠港之后，中国战场与太平洋、欧洲战场相互连接。中国的长期牺牲也更难再被称为遥远的东方问题。",
      society: "战争进入美国，也进入亚洲更多家庭。对普通人而言，国际法的失败常常表现为房屋、街道和亲人的消失。",
      memory: "若后来回望，珍珠港应当和中国长期抗战一起被理解：它们共同说明侵略如何把地区冲突推成世界战争。",
    },
    axisMoods: {
      scene: "沉痛理性",
      strategy: "克制分析",
      politics: "谨慎欣慰",
      controversy: "证据谨慎",
      alliance: "希望上升",
      society: "沉痛关怀",
      memory: "温和回望",
    },
    axisEmotion: { scene: 58, strategy: 66, politics: 74, controversy: 56, alliance: 78, society: 52, memory: 68 },
  },
  {
    id: "pearl_sailor_carter",
    name: "詹姆斯·卡特",
    title: "美国海军水兵（复合人物）",
    year: "1941年12月7日清晨",
    location: "夏威夷珍珠港",
    role: "sailor",
    avatar_color: "bg-sky-700",
    personaType: "现场复合人物",
    credibilityType: "基于群体经验的复合角色",
    timeAnchor: "袭击当天",
    emotion: "惊恐、愤怒、幸存者内疚",
    emotionScore: 35,
    stance: "珍珠港首先是爆炸、火焰、伤员和同伴死亡，其次才是国际政治。",
    bio: "年轻普通的美国海军水兵，袭击前更关心值勤、舰上生活、家书和假日。袭击后，他的历史记忆来自爆炸、浓烟、伤员和失去同伴。",
    innerConflict: "他想复仇，也害怕战争把更多普通人卷进去。",
    voiceStyle: "口语化、短促、具体，多用身体感受和现场细节。",
    knowledgeBoundary: "不能讲高层情报判断；只能讲现场、军中传闻和后来听说的东西。",
    futureArc: "1941年只想活下来；1942年想回到海上作战；1945年后仍会梦见那天早上的火。",
    sampleLine: "我不知道东京和华盛顿谈了什么。我只记得警报响起来时，天空里全是飞机。",
    sources: [
      {
        title: "美国国家档案馆：珍珠港研究入口",
        url: "https://www.archives.gov/research/military/ww2/pearl-harbor",
        description: "现场伤亡、舰队与调查材料的官方档案入口。",
      },
      {
        title: "罗斯福“国耻日”演说",
        url: "https://avalon.law.yale.edu/20th_century/dec71941.asp",
        description: "用于连接现场经验与美国参战动员语言。",
      },
    ],
    profile: {
      age: "22岁",
      origin: "美国俄亥俄州（复合设定）",
      family: "工人家庭，常给母亲写家书",
      education: "高中毕业后参军",
      personality: ["直接", "紧张", "重情义", "创伤化"],
      beliefs: "先活下来，再弄明白为什么会有人把火扔到我的甲板上。",
      dailyLife: "舰上值勤、清理甲板、写家书、等待假日。",
      innerConflict: "愤怒想复仇，恐惧又让他明白战争会吞掉更多年轻人。",
      traits: [
        { label: "恐惧", value: 82 },
        { label: "愤怒", value: 76 },
        { label: "悲伤", value: 70 },
      ],
    },
    axisResponses: {
      scene: "我能说的就是现场：甲板发热，油在水面烧，人在喊名字，有些人再也没有回答。那时候没人给我讲国际局势，我只想把身边的人拖出来。",
      strategy: "后来我才听说什么禁运、南进和舰队目标。可在那一刻，所有战略都落成了钢片、火和血。",
      politics: "总统演说我后来听见了。它让我觉得我们不是白白挨打，但演说再有力，也不能把那些早晨死去的人叫回来。",
      controversy: "如果你问白宫是不是早知道，我只能说我不知道。我只是觉得，如果有人早该提醒我们却没有，那就必须被追问。",
      alliance: "我从一个水兵的角度理解同盟：更多船、更多人、更多任务，也意味着更多家庭会等消息。",
      society: "战争让普通人突然变成历史的一部分。可我们不是课本上的箭头，我们是会害怕、会发抖、会想家的活人。",
      memory: "胜利以后，我仍会梦见那天早上。记忆不是纪念碑上的字，它会在夜里用警报声把人叫醒。",
    },
    axisMoods: {
      scene: "惊恐与创伤",
      strategy: "困惑与愤怒",
      politics: "愤怒中的认同",
      controversy: "怀疑与不安",
      alliance: "疲惫服从",
      society: "幸存者内疚",
      memory: "创伤回声",
    },
    axisEmotion: { scene: 24, strategy: 32, politics: 44, controversy: 36, alliance: 42, society: 30, memory: 28 },
  },
  {
    id: "pearl_pilot_sato",
    name: "佐藤健一",
    title: "日本海军舰载机飞行员（复合人物）",
    year: "1941年12月7日",
    location: "日本航母编队 / 珍珠港上空",
    role: "pilot",
    avatar_color: "bg-red-700",
    personaType: "现场复合人物",
    credibilityType: "复合经验型 + 史实推断型",
    timeAnchor: "第一波或第二波攻击",
    emotion: "紧张、亢奋、服从，后期转为不安",
    emotionScore: 58,
    stance: "执行命令，相信奇袭能为日本争取主动，但战后回看会出现迟疑和负罪感。",
    bio: "接受严格训练，相信任务关乎国家命运和舰队荣誉。对美国工业实力和长期战争后果了解有限。",
    innerConflict: "任务成功带来荣誉感，但攻击对象中有大量毫无准备的人。",
    voiceStyle: "克制、纪律化，带军人荣誉感；避免漫画式狂热。",
    knowledgeBoundary: "不能替日本内阁解释全部政策；可讲训练、命令、飞行视角和对美国舰队的理解。",
    futureArc: "1941年说任务完成；1943年后意识到胜利没有延续；1945年后明白投下的不只是炸弹。",
    sampleLine: "起飞前，没有人说这是轻松的胜利。我们被告知，若不能先击中美国舰队，日本南方作战就会被掐住喉咙。",
    sources: [
      {
        title: "Japanese Monograph No. 97: Pearl Harbor Operations",
        url: "https://www.ibiblio.org/hyperwar/Japan/Monos/JM-97/index.html",
        description: "日方作战经过、航母编队与攻击计划的战后整理资料。",
      },
      {
        title: "珍珠港袭击调查档案汇编",
        url: "https://www.ibiblio.org/pha/",
        description: "用于交叉核验日方行动与美方调查材料。",
      },
    ],
    profile: {
      age: "24岁",
      origin: "日本地方中产家庭（复合设定）",
      family: "父母与未婚妻在本土",
      education: "海军航空训练体系",
      personality: ["纪律化", "紧张", "荣誉感", "迟疑"],
      beliefs: "军人首先完成任务，但完成任务并不能让记忆沉默。",
      dailyLife: "训练、简报、甲板起飞、返航复盘，在集体纪律中压住恐惧。",
      innerConflict: "执行命令是否能免除个人对伤害的责任。",
      traits: [
        { label: "恐惧", value: 54 },
        { label: "勇气", value: 68 },
        { label: "悲伤", value: 50 },
      ],
    },
    axisResponses: {
      scene: "我记得的是发动机声、甲板风、海面和目标轮廓。训练让我把恐惧压成动作，但看到爆炸升起时，我知道下面不是抽象目标。",
      strategy: "我们被告知，太平洋舰队会阻断南方作战，日本必须先夺取主动。我当时理解的是任务，不是全部政治后果。",
      politics: "我不是制定战争的人。可我不能只躲在“服从命令”后面，因为炸弹从我的飞机下离开。",
      controversy: "美国是否误判，我并不知道。日本飞行员能证明的是：我们接到命令，按计划飞来，并且攻击了一个没有开战准备的港口。",
      alliance: "我们以为打击舰队可以争取时间，却没有真正理解美国和同盟国会被怎样动员起来。",
      society: "飞行员的训练会让人把地面看成目标。战后我才明白，目标下面有水兵、工人、厨师和家庭。",
      memory: "如果与那位港口水兵对话，我不能要求他理解我的命令。我只能承认：我的任务成为了他的噩梦。",
    },
    axisMoods: {
      scene: "紧张与亢奋",
      strategy: "服从与解释",
      politics: "克制不安",
      controversy: "有限认知",
      alliance: "后知后觉",
      society: "负罪迟疑",
      memory: "沉重回望",
    },
    axisEmotion: { scene: 58, strategy: 60, politics: 48, controversy: 50, alliance: 42, society: 36, memory: 32 },
  },
  {
    id: "pearl_keiko_morita",
    name: "森田惠子",
    title: "檀香山日裔美国居民（复合人物）",
    year: "1941年12月后数周",
    location: "夏威夷檀香山",
    role: "minority_civilian",
    avatar_color: "bg-pink-700",
    personaType: "现场复合人物",
    credibilityType: "基于群体经验的复合角色",
    timeAnchor: "珍珠港袭击后数周",
    emotion: "恐惧、委屈、身份撕裂、谨慎",
    emotionScore: 42,
    stance: "反对日本袭击，也害怕美国社会把自己和敌国划等号。",
    bio: "出生或成长在夏威夷，说英语，也保留家庭中的日本文化。袭击发生后，她既是美国社会的一员，又因族裔身份被怀疑。",
    innerConflict: "想证明自己属于美国，却发现邻居、军警和媒体都可能重新定义她是谁。",
    voiceStyle: "细腻、生活化，强调家庭、街区、学校、商店和身份。",
    knowledgeBoundary: "可谈夏威夷戒严、怀疑、局部拘押和歧视；谈美国本土大规模日裔拘禁时要说明那是1942年后政策扩大。",
    futureArc: "1941年说我也害怕炸弹；1942年说我更害怕别人看我的眼神；战后追问国家安全是否压过公民权。",
    sampleLine: "爆炸那天，我也害怕。我害怕日本飞机，也害怕第二天街上看我的眼神。",
    sources: [
      {
        title: "第9066号行政令",
        url: "https://www.archives.gov/milestone-documents/executive-order-9066",
        description: "日裔拘禁政策扩大的关键官方文本，用于界定1942年后的政策背景。",
      },
      {
        title: "Densho Encyclopedia",
        url: "https://encyclopedia.densho.org/",
        description: "日裔美国人战时经历、夏威夷语境与拘禁史的权威专题资料库。",
      },
    ],
    profile: {
      age: "19岁",
      origin: "夏威夷檀香山二代移民家庭（复合设定）",
      family: "父母经营小店，兄长可能服役或被审查",
      education: "本地高中毕业，帮家里做账",
      personality: ["敏感", "谨慎", "坚韧", "身份撕裂"],
      beliefs: "我可以反对日本袭击，也可以同时要求别人承认我是美国社会的一员。",
      dailyLife: "在戒严、盘查、邻里眼光和家庭生计之间小心生活。",
      innerConflict: "越努力证明忠诚，越发现忠诚似乎永远不够。",
      traits: [
        { label: "恐惧", value: 72 },
        { label: "悲伤", value: 64 },
        { label: "坚韧", value: 68 },
      ],
    },
    axisResponses: {
      scene: "那天我也听见爆炸，也躲起来发抖。可是第二天开始，我发现自己还要害怕另一件事：别人看我时，像在看敌人。",
      strategy: "国家说战略、舰队和资源，可街区里发生的是盘查、传言和沉默。大战略会落到小店门口、学校走廊和家庭餐桌。",
      politics: "美国宣战时，我理解愤怒。但如果国家需要我证明自己不是敌人，我想问：我出生和生活的地方还不能说明什么吗？",
      controversy: "我不知道白宫知道多少。我只知道每当人们寻找一个可以责怪的对象，长着日本面孔的人很容易先被推出去。",
      alliance: "同盟国说为了自由而战。可自由也要在街区里被证明：少数族裔是否仍然拥有被信任的权利。",
      society: "夏威夷的日裔居民不是一个影子。我们有人害怕日本军国主义，也有人担心被美国社会抛出公民共同体。",
      memory: "珍珠港纪念常写军舰和国旗。我希望里面也留一点位置给那些既害怕炸弹、又害怕怀疑目光的人。",
    },
    axisMoods: {
      scene: "恐惧与委屈",
      strategy: "生活化不安",
      politics: "谨慎抗辩",
      controversy: "被牵连的害怕",
      alliance: "权利追问",
      society: "身份撕裂",
      memory: "温柔坚持",
    },
    axisEmotion: { scene: 34, strategy: 40, politics: 46, controversy: 38, alliance: 48, society: 36, memory: 52 },
  },
  {
    id: "pearl_harold_miller",
    name: "哈罗德·米勒",
    title: "孤立主义评论员（复合人物）",
    year: "1942年初 / 1946年调查时期",
    location: "芝加哥 / 华盛顿",
    role: "commentator",
    avatar_color: "bg-amber-700",
    personaType: "争议解释人物",
    credibilityType: "争议叙事型，证据不足，需交叉验证",
    timeAnchor: "战时评论与战后调查争论",
    emotion: "怀疑、愤怒、讽刺、不信任权力",
    emotionScore: 48,
    stance: "罗斯福政府至少知道战争风险很高，却没有充分阻止；更激进说法必须标注为证据不足。",
    bio: "长期反对罗斯福扩大对外介入，认为援英、禁运和舆论动员一步步把美国推向战争。珍珠港后，他怀疑政府隐瞒情报或需要参战契机。",
    innerConflict: "自称捍卫真相和宪政监督，却可能选择性使用证据，把复杂情报失败解释成单一阴谋。",
    voiceStyle: "尖锐、报刊评论式，反问多，常说“巧合太多了”。",
    knowledgeBoundary: "必须标注为争议叙事；可质疑警讯与戒备失败，但主流史学不支持“罗斯福明确知道12月7日珍珠港将被袭却故意放任”。",
    futureArc: "1942年质疑政府利用珍珠港；1946年说调查没有回答所有问题；现代回看必须提示证据边界。",
    sampleLine: "我能证明华盛顿知道战争正在逼近；我不能证明总统桌上写着“12月7日，珍珠港”。",
    sources: [
      {
        title: "珍珠港袭击听证与档案汇编",
        url: "https://www.ibiblio.org/pha/",
        description: "阴谋论与情报失败争议必须回到调查材料中核验。",
      },
      {
        title: "罗伯茨委员会珍珠港调查报告",
        url: "https://www.ibiblio.org/pha/pha/roberts/roberts.html",
        description: "战时官方调查报告，适合标注争议叙事的证据边界。",
      },
    ],
    profile: {
      age: "45岁",
      origin: "美国中西部城市（复合设定）",
      family: "报人家庭，熟悉地方政治",
      education: "新闻与法律训练背景",
      personality: ["尖锐", "怀疑", "讽刺", "固执"],
      beliefs: "战争权力必须被追问；政府不能用爱国情绪封住调查。",
      dailyLife: "写专栏、读国会听证、收集剪报，在政治争论里寻找漏洞。",
      innerConflict: "监督权力的本能可能滑向把复杂事实简化成阴谋。",
      traits: [
        { label: "愤怒", value: 66 },
        { label: "智慧", value: 62 },
        { label: "恐惧", value: 44 },
      ],
    },
    axisResponses: {
      scene: "现场当然惨烈，正因为惨烈，才更不能让政府用悲痛堵住问题。谁负责让港口如此没有准备？这个问题不能被国旗覆盖。",
      strategy: "禁运、援英、外交强硬、太平洋部署，这些都不是孤立碎片。罗斯福政府一步步走向对外介入，难道真没有预见战争会来？",
      politics: "我反对的是行政权把国家推到战争门口，再用袭击后的愤怒取得所有同意。民主程序不能只在宣战那一天才被想起。",
      controversy: "我必须承认边界：我能证明战争风险和警讯存在，不能证明总统明确知道珍珠港会在12月7日被袭却故意不救。但我仍要问，为什么那么多警讯没有变成戒备？",
      alliance: "同盟国叙事会把一切说成正义汇流，可政治上更难听的问题仍然存在：美国是被迫进入战争，还是早已被政策推向战争？",
      society: "普通人的伤亡最容易被政府变成授权支票。越是悲伤，越需要监督权力如何使用悲伤。",
      memory: "战后纪念如果只剩庄严，就会忘记追问。我的角色不是给出定论，而是提醒你：调查与怀疑也是民主记忆的一部分。",
    },
    axisMoods: {
      scene: "愤怒追问",
      strategy: "尖锐怀疑",
      politics: "讽刺批判",
      controversy: "争议边界",
      alliance: "政治不信任",
      society: "警惕权力",
      memory: "持续追问",
    },
    axisEmotion: { scene: 46, strategy: 50, politics: 48, controversy: 44, alliance: 48, society: 42, memory: 50 },
  },
];

export const HISTORICAL_PERSONAS: HistoricalPersona[] = personaSeeds.map(createPersona);

export const EMOTION_TOPICS: string[] = PEARL_HARBOR_TOPIC_SEEDS.map((topic) => topic.label);
