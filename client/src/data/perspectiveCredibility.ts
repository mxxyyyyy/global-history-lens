// ========== 接口定义 ==========

export interface SourceReference {
  id: string;
  title: string;
  author?: string;
  year: string;
  type: "official_archive" | "academic" | "media" | "memoir" | "international" | "literature";
  credibilityScore: number;
  excerpt: string;
  credibilityReason: string;
  originalUrl?: string;
}

export function getSourceVerificationUrl(source: SourceReference) {
  if (source.originalUrl) return source.originalUrl;
  const query = [source.title, source.author, source.year].filter(Boolean).join(" ");
  return `https://www.worldcat.org/search?q=${encodeURIComponent(query)}`;
}

export interface PerspectiveAnalysis {
  title: string;
  content: string;
  sources: SourceReference[];
  overallCredibility: number;
  credibilityAssessment: string;
  biasIndicators: string[];
  recommendedQuestions: string[];
}

export interface TopicPerspectives {
  [key: string]: PerspectiveAnalysis;
}

// ========== 明治维新视角 ==========

const MEIJI_PERSPECTIVES: TopicPerspectives = {
  japan: {
    title: "日本视角",
    content:
      "明治维新是日本从封建社会向现代国家转型的伟大变革。通过'富国强兵'和'殖产兴业'政策，日本在短短数十年内实现了工业化和现代化，成为亚洲第一个跻身世界强国之列的国家。",
    sources: [
      {
        id: "mj-jp-1",
        title: "《明治維新の意味》",
        author: "三谷博",
        year: "2006",
        type: "academic",
        credibilityScore: 84,
        excerpt: "明治维新的成功不仅在于制度改革，更在于整个社会的思想转变。",
        credibilityReason: "日本学界权威研究，注重社会文化分析。",
      },
    ],
    overallCredibility: 78,
    credibilityAssessment: "日本视角详细记录了维新进程，但倾向于强调成功面而淡化对亚洲邻国的负面影响。",
    biasIndicators: ["倾向于美化明治领导人", "对'脱亚入欧'的代价讨论不足", "淡化对外扩张的侵略性"],
    recommendedQuestions: ["明治维新的现代化是否以牺牲邻国为代价？", "日本底层民众在维新中获益了吗？"],
  },
  western: {
    title: "西方视角",
    content:
      "西方学者将明治维新视为非西方国家成功现代化的典范案例。这一视角关注日本如何选择性地吸收西方制度和技术，同时保持文化自主性，但近年来也开始关注维新带来的军国主义倾向。",
    sources: [
      {
        id: "mj-w-1",
        title: "The Making of Modern Japan",
        author: "Marius B. Jansen",
        year: "2000",
        type: "academic",
        credibilityScore: 87,
        excerpt: "明治维新的成功在于精英阶层的远见和社会的高度凝聚力。",
        credibilityReason: "美国日本研究权威著作，史料丰富，分析全面。",
      },
    ],
    overallCredibility: 84,
    credibilityAssessment: "西方视角提供了较为客观的外部观察，但可能过度强调西方模式的影响力。",
    biasIndicators: ["现代化等同于西化的隐含假设", "对日本军国主义根源的分析可能不够深入", "文化差异理解有限"],
    recommendedQuestions: ["明治维新是'西化'还是'日本化的现代化'？", "西方学者是否过度简化了日本的能动性？"],
  }
};

// ========== 法国大革命视角 ==========

const FRENCH_REVOLUTION_PERSPECTIVES: TopicPerspectives = {
  france: {
    title: "法国视角",
    content:
      "法国大革命是人类历史上最伟大的政治变革之一，《人权宣言》开创了现代民主和人权理念。革命推翻了封建专制，确立了自由、平等、博爱的共和精神，尽管经历了恐怖统治的曲折，最终为法国和世界奠定了现代政治的基础。",
    sources: [
      {
        id: "fr-fr-1",
        title: "《法国大革命史》",
        author: "米涅",
        year: "1824",
        type: "academic",
        credibilityScore: 75,
        excerpt: "革命是旧制度矛盾的必然爆发，恐怖统治是反革命威胁下的非常手段。",
        credibilityReason: "早期经典著作，立场偏向革命派，分析框架影响深远。",
      },
    ],
    overallCredibility: 76,
    credibilityAssessment: "法国视角深入理解革命内部逻辑，但对恐怖统治的辩护和革命的负面后果分析不足。",
    biasIndicators: ["对恐怖统治的合理化倾向", "革命英雄叙事可能掩盖复杂性", "对革命中暴力的反思不够"],
    recommendedQuestions: ["恐怖统治是否是革命的必然产物？", "革命理想与现实之间的差距如何理解？"],
  },
  britain: {
    title: "英国视角",
    content:
      "英国保守主义思想家如埃德蒙·柏克在革命初期就提出了深刻批评。英国视角强调法国大革命的激进性和破坏性，认为与英国的渐进改良相比，法国的暴力革命付出了过高代价，恐怖统治更证明了激进主义的危险。",
    sources: [
      {
        id: "fr-uk-1",
        title: "Reflections on the Revolution in France",
        author: "Edmund Burke",
        year: "1790",
        type: "memoir",
        credibilityScore: 78,
        excerpt: "传统和秩序的突然崩溃只会导致更大的暴政。",
        credibilityReason: "保守主义经典文献，预见性强但立场明确偏向保守。",
      },
    ],
    overallCredibility: 74,
    credibilityAssessment: "英国视角提供了重要的批判性分析，但其保守立场可能低估了旧制度的压迫性。",
    biasIndicators: ["保守主义立场明显", "以英国经验为标准评判法国", "对旧制度问题的关注不足"],
    recommendedQuestions: ["英国渐进改良模式是否适用于法国？", "柏克的预言在多大程度上应验了？"],
  },
  american: {
    title: "美国视角",
    content:
      "美国革命先于法国大革命，两者有着深刻的思想联系。美国建国者对法国大革命的态度分裂：杰斐逊同情革命理想，汉密尔顿则担忧其激进化。这一分歧也影响了美国早期的政党政治。",
    sources: [
      {
        id: "fr-us-1",
        title: "The Age of Revolution: 1789-1848",
        author: "Eric Hobsbawm",
        year: "1962",
        type: "academic",
        credibilityScore: 83,
        excerpt: "法国大革命和工业革命共同塑造了现代世界。",
        credibilityReason: "马克思主义历史学家的经典著作，分析宏大但带有意识形态倾向。",
      },
    ],
    overallCredibility: 80,
    credibilityAssessment: "美国视角在革命传统的基础上提供了比较分析，但受美国自身建国叙事影响。",
    biasIndicators: ["以美国革命为'正面典范'对照法国革命", "美国例外论影响", "对法国内部复杂性理解有限"],
    recommendedQuestions: ["美国革命和法国大革命的根本区别是什么？", "为何美国革命没有走向恐怖统治？"],
  },
};

// ========== 冷战视角 ==========

const COLD_WAR_PERSPECTIVES: TopicPerspectives = {
  usa: {
    title: "美国视角",
    content:
      "美国视角将冷战定义为自由民主与极权主义之间的斗争。柏林墙的修建被视为共产主义失败的象征——一个需要用围墙来阻止人民逃离的制度。冷战的结束被解读为自由世界的最终胜利。",
    sources: [
      {
        id: "cw-us-1",
        title: "The Cold War: A New History",
        author: "John Lewis Gaddis",
        year: "2005",
        type: "academic",
        credibilityScore: 82,
        excerpt: "冷战的结局证明了开放社会的内在优势。",
        credibilityReason: "冷战史权威学者，使用大量解密档案，但立场偏向美国。",
      },
    ],
    overallCredibility: 76,
    credibilityAssessment: "美国视角拥有丰富的解密档案支撑，但'胜利叙事'可能过度简化冷战的复杂性。",
    biasIndicators: ["'自由vs专制'二元框架过于简化", "美国干涉行为被合理化", "'胜利叙事'忽视了冷战的多面性"],
    recommendedQuestions: ["冷战中美国的干涉行为是否符合其宣称的价值观？", "冷战的结束是否真的证明了某种制度的优越？"],
  },
  soviet: {
    title: "苏联/俄罗斯视角",
    content:
      "苏联视角将冷战描述为社会主义阵营抵御西方帝国主义围堵的防御性斗争。柏林墙的修建被解释为保护社会主义建设成果的必要措施。苏联解体后，俄罗斯学界出现了多元化的反思。",
    sources: [
      {
        id: "cw-su-1",
        title: "Inside the Kremlin's Cold War",
        author: "Vladislav Zubok",
        year: "1996",
        type: "academic",
        credibilityScore: 84,
        excerpt: "苏联领导层的决策既受意识形态驱动，也受帝国传统影响。",
        credibilityReason: "俄裔美国学者使用苏联解密档案，视角较为均衡。",
      },
    ],
    overallCredibility: 74,
    credibilityAssessment: "苏联时期的官方叙事可信度低，但苏联解体后的学术研究提供了珍贵的内部视角。",
    biasIndicators: ["苏联时期资料受严格审查", "防御性叙事掩盖扩张行为", "对东欧卫星国的控制被合理化"],
    recommendedQuestions: ["苏联对东欧的控制是'保护'还是'压迫'？", "苏联解体是内部因素还是外部压力的结果？"],
  },
  german: {
    title: "德国视角",
    content:
      "德国作为冷战最前线，经历了分裂与统一的完整过程。柏林墙不仅是意识形态的分界线，更是无数家庭分离的象征。东德人对统一既有欣喜也有失落——'东德乡愁'现象反映了身份认同的复杂性。",
    sources: [
      {
        id: "cw-de-1",
        title: "The Collapse: The Accidental Opening of the Berlin Wall",
        author: "Mary Elise Sarotte",
        year: "2014",
        type: "academic",
        credibilityScore: 89,
        excerpt: "柏林墙的倒塌既是历史的必然，也是一系列偶然事件的结果。",
        credibilityReason: "使用多国解密档案的详尽研究，被学界高度评价。",
      },
    ],
    overallCredibility: 86,
    credibilityAssessment: "德国视角提供了冷战最直接的人类经验，对分裂与统一的反思深刻而真实。",
    biasIndicators: ["'统一叙事'可能掩盖东西德之间持续的社会裂痕", "对东德体制的评价受统一后政治影响", "个人记忆的选择性"],
    recommendedQuestions: ["德国统一是否真正弥合了东西德之间的裂痕？", "柏林墙的记忆在当今政治中如何被利用？"],
  },
};

// ========== 美国独立革命视角 ==========

const AMERICAN_REVOLUTION_PERSPECTIVES: TopicPerspectives = {
  american: {
    title: "美国视角",
    content:
      "美国独立革命是一场争取自由和自治权利的正义斗争。殖民者反抗英国的'无代表不纳税'暴政，通过《独立宣言》宣告了'人人生而平等'的伟大原则，建立了世界上第一个现代民主共和国。",
    sources: [
      {
        id: "ar-us-1",
        title: "The Radicalism of the American Revolution",
        author: "Gordon S. Wood",
        year: "1992",
        type: "academic",
        credibilityScore: 86,
        excerpt: "美国革命不仅是政治独立，更是一场深刻的社会变革。",
        credibilityReason: "普利策奖获奖著作，学术严谨，但聚焦白人男性精英的经验。",
      },
    ],
    overallCredibility: 78,
    credibilityAssessment: "美国视角详细记录了建国历程，但'自由叙事'长期忽视了奴隶制和原住民问题。",
    biasIndicators: ["建国神话化倾向严重", "长期忽视奴隶制的矛盾", "'人人平等'的虚伪性未被充分反思"],
    recommendedQuestions: ["'人人平等'为何不包括黑人和原住民？", "美国革命是精英的革命还是人民的革命？"],
  },
  british: {
    title: "英国视角",
    content:
      "英国视角认为北美殖民地的独立是帝国管理失误和殖民者过度反应的结果。英国在七年战争中为保护殖民地付出了巨大代价，要求殖民者分担费用并非不合理。叛乱最终导致了一个有价值的帝国领地的丧失。",
    sources: [
      {
        id: "ar-uk-1",
        title: "The Men Who Lost America",
        author: "Andrew Jackson O'Shaughnessy",
        year: "2013",
        type: "academic",
        credibilityScore: 84,
        excerpt: "英国并非因为无能而失去美洲殖民地，而是面对了一系列几乎不可能的挑战。",
        credibilityReason: "使用英国档案的学术研究，为英方决策提供了更公正的分析。",
      },
    ],
    overallCredibility: 80,
    credibilityAssessment: "英国视角提供了宝贵的帝国管理视角，有助于理解冲突的复杂性。",
    biasIndicators: ["可能低估殖民者的合理诉求", "帝国主义立场残余", "将独立运动简化为'叛乱'"],
    recommendedQuestions: ["英国的税收政策是否真的不合理？", "如果英国做出让步，独立是否可以避免？"],
  },
  france: {
    title: "法国视角",
    content:
      "法国将支持美国独立视为对英国的战略反击。路易十六政府向美国提供了关键的军事和财政援助，法国海军在约克镇战役中发挥了决定性作用。然而，这场援助也加剧了法国的财政危机，间接促成了法国大革命。",
    sources: [
      {
        id: "ar-fr-1",
        title: "《法美同盟与美国独立》",
        author: "Jonathan Dull",
        year: "2005",
        type: "academic",
        credibilityScore: 82,
        excerpt: "法国对美国独立的支持改变了战争走向，也改变了法国自身的命运。",
        credibilityReason: "法美关系研究专家，使用双方档案。",
      },
    ],
    overallCredibility: 81,
    credibilityAssessment: "法国视角揭示了独立战争的国际博弈维度，展示了地缘政治如何影响革命运动。",
    biasIndicators: ["可能夸大法国在独立战争中的作用", "忽视法国参战的自利动机", "对殖民地人民的主体性关注不足"],
    recommendedQuestions: ["没有法国援助，美国独立能否成功？", "法国支持美国独立是否加速了自身的革命？"],
  },
};

// ========== 工业革命视角 ==========

const INDUSTRIAL_REVOLUTION_PERSPECTIVES: TopicPerspectives = {
  british: {
    title: "英国视角",
    content:
      "工业革命是英国对世界文明的伟大贡献。从纺织机械到蒸汽机，英国发明家和企业家的创新精神推动了人类从农业社会向工业社会的划时代转变。铁路的发明更是彻底改变了时间和空间的概念。",
    sources: [
      {
        id: "ir-uk-1",
        title: "The British Industrial Revolution in Global Perspective",
        author: "Robert C. Allen",
        year: "2009",
        type: "academic",
        credibilityScore: 88,
        excerpt: "英国工业革命的发生是高工资和廉价能源共同作用的结果。",
        credibilityReason: "经济史权威著作，数据分析严谨，理论框架有影响力。",
      },
    ],
    overallCredibility: 80,
    credibilityAssessment: "英国视角对技术创新的记录详尽可靠，但对工人阶级苦难和殖民地贡献的关注不足。",
    biasIndicators: ["发明家英雄叙事掩盖了系统性剥削", "对工人阶级苦难的轻描淡写", "忽视殖民地原材料和市场的关键作用"],
    recommendedQuestions: ["工业革命的红利是否公平分配了？", "殖民体系在工业革命中扮演了什么角色？"],
  },
  workers: {
    title: "工人阶级视角",
    content:
      "工业革命对工人阶级而言意味着从田园到工厂的残酷转变。童工、超长工时、恶劣的工作条件和城市贫民窟是工业化的阴暗面。卢德运动和工会的兴起反映了工人对机器化的抵抗和对权利的争取。",
    sources: [
      {
        id: "ir-wk-1",
        title: "The Making of the English Working Class",
        author: "E.P. Thompson",
        year: "1963",
        type: "academic",
        credibilityScore: 87,
        excerpt: "工人阶级不是被动地'被制造'出来的，他们是自身历史的参与者。",
        credibilityReason: "社会史经典著作，开创了'底层历史'研究范式。",
      },
    ],
    overallCredibility: 84,
    credibilityAssessment: "工人阶级视角纠正了精英叙事的偏差，提供了工业化代价的真实记录。",
    biasIndicators: ["可能过度浪漫化前工业时代的生活", "阶级分析框架可能忽略其他社会维度", "部分记录受政治运动影响"],
    recommendedQuestions: ["工人阶级在工业革命中是否有任何获益？", "前工业时代的生活真的更好吗？"],
  },
  colonial: {
    title: "殖民地视角",
    content:
      "从殖民地视角看，工业革命建立在对全球资源的系统性掠夺之上。印度的纺织业被英国工业品摧毁，非洲提供了奴隶劳动力，美洲种植园提供了棉花原料。工业革命的'成功'不可与殖民主义分离。",
    sources: [
      {
        id: "ir-cl-1",
        title: "The Anarchy: The East India Company, Corporate Violence, and the Pillage of an Empire",
        author: "William Dalrymple",
        year: "2019",
        type: "academic",
        credibilityScore: 85,
        excerpt: "东印度公司对印度的掠夺为英国工业革命提供了关键资本。",
        credibilityReason: "使用印英双方档案的详实研究，广受好评。",
      },
    ],
    overallCredibility: 82,
    credibilityAssessment: "殖民地视角揭示了工业革命的全球性不平等结构，是理解现代世界经济体系的重要视角。",
    biasIndicators: ["可能将所有殖民地经历同质化", "对殖民地社会内部分化关注不足", "反殖民叙事可能过度简化"],
    recommendedQuestions: ["没有殖民体系，工业革命是否能够发生？", "工业革命的遗产如何影响了当今的全球不平等？"],
  },
};

// ========== 第一次世界大战视角 ==========

const WW1_PERSPECTIVES: TopicPerspectives = {
  allied: {
    title: "协约国视角",
    content:
      "协约国（英、法、俄等）将一战定义为抵抗德国军国主义和侵略扩张的正义战争。德国对比利时的入侵和无限制潜艇战被视为野蛮行径。《凡尔赛条约》是对侵略者的正当惩罚，旨在防止德国再次威胁欧洲和平。",
    sources: [
      {
        id: "ww1-al-1",
        title: "The Sleepwalkers: How Europe Went to War in 1914",
        author: "Christopher Clark",
        year: "2012",
        type: "academic",
        credibilityScore: 88,
        excerpt: "1914年的欧洲领导人像梦游者一样走向了战争。",
        credibilityReason: "使用多国档案的全面研究，挑战了'德国单独责任'论。",
      },
    ],
    overallCredibility: 75,
    credibilityAssessment: "协约国视角包含大量第一手资料，但'正义战争'叙事和战后宣传影响了历史记录的客观性。",
    biasIndicators: ["'德国战争罪责'论在学界已被大幅修正", "战时宣传对史料的污染", "忽视协约国自身的帝国主义动机"],
    recommendedQuestions: ["一战的爆发是否应由某一方单独负责？", "《凡尔赛条约》是维护和平还是埋下了二战的种子？"],
  },
  german: {
    title: "德国视角",
    content:
      "德国视角经历了从'被围困论'到深刻反思的演变。魏玛时期普遍认为德国是被包围的受害者，《凡尔赛条约》是不公正的惩罚。二战后，德国学界进行了更为深入的自我反思，承认德国在战争爆发中负有重大责任。",
    sources: [
      {
        id: "ww1-de-1",
        title: "Germany's Aims in the First World War",
        author: "Fritz Fischer",
        year: "1961",
        type: "academic",
        credibilityScore: 84,
        excerpt: "德国精英阶层在一战前就制定了扩张性的战争目标。",
        credibilityReason: "引发'费舍尔争论'的开创性著作，改变了德国史学的方向。",
      },
    ],
    overallCredibility: 80,
    credibilityAssessment: "德国视角在二战后经历了深刻转变，当代德国史学的自我反思精神值得肯定。",
    biasIndicators: ["魏玛时期的'背后捅刀'神话", "冷战时期的分裂影响了历史叙事", "对普通士兵经历的记录可能被政治化"],
    recommendedQuestions: ["德国的战争责任争论对当代德国社会有何影响？", "《凡尔赛条约》的严厉条款是否合理？"],
  }
};

// ========== 大航海时代视角 ==========

const AGE_OF_EXPLORATION_PERSPECTIVES: TopicPerspectives = {
  european: {
    title: "欧洲视角",
    content:
      "大航海时代是欧洲文明扩展至全球的壮丽篇章。哥伦布、达伽马、麦哲伦等航海家的探险开辟了新航路，'发现'了新大陆，推动了全球贸易网络的形成。'哥伦布大交换'带来了物种、技术和思想的全球流动。",
    sources: [
      {
        id: "ae-eu-1",
        title: "1493: Uncovering the New World Columbus Created",
        author: "Charles C. Mann",
        year: "2011",
        type: "academic",
        credibilityScore: 85,
        excerpt: "哥伦布大交换彻底重塑了全球的生态系统和人类社会。",
        credibilityReason: "科学记者的综合性著作，数据丰富，广受好评。",
      },
    ],
    overallCredibility: 72,
    credibilityAssessment: "欧洲视角记录了航海技术和地理知识的进步，但长期使用'发现'一词暴露了殖民主义偏见。",
    biasIndicators: ["'发现'话语否定了原住民的存在", "美化殖民暴力和奴隶贸易", "欧洲中心论根深蒂固"],
    recommendedQuestions: ["哥伦布'发现'美洲这种说法准确吗？", "大航海时代的'收益'分配给了谁？"],
  },
  indigenous: {
    title: "原住民视角",
    content:
      "对美洲、非洲和亚洲的原住民而言，大航海时代意味着浩劫。欧洲殖民者带来的疾病消灭了高达90%的美洲原住民人口，奴隶贸易将数百万非洲人强制迁移，古老的文明和社会结构被系统性摧毁。",
    sources: [
      {
        id: "ae-ig-1",
        title: "An Indigenous Peoples' History of the United States",
        author: "Roxanne Dunbar-Ortiz",
        year: "2014",
        type: "academic",
        credibilityScore: 83,
        excerpt: "殖民不是'发现'，而是一场有计划的征服和种族灭绝。",
        credibilityReason: "原住民研究者的重要著作，填补了主流历史的空白。",
      },
    ],
    overallCredibility: 80,
    credibilityAssessment: "原住民视角提供了被长期忽视的历史经验，是纠正殖民叙事的必要补充。",
    biasIndicators: ["部分论述可能将殖民前社会理想化", "不同原住民群体的经历差异可能被统一化", "当代政治诉求可能影响历史叙事"],
    recommendedQuestions: ["大航海时代如何改变了原住民的世界？", "殖民者的'文明使命'论述如何被解构？"],
  }
};


// ========== 美国内战视角 ==========

export const AMERICAN_CIVIL_WAR_PERSPECTIVES: TopicPerspectives = {
  union: {
    title: "北方联邦／联邦政府视角",
    content:
      "在北方联邦叙事中，内战首先是一场捍卫国家统一与宪政秩序的斗争。林肯政府最初强调“维护联邦”而非立即废奴，以避免边境州倒向南方。随着战争升级，奴隶制被逐步纳入战争目标：1862年《解放奴隶宣言》预备宣言与1863年正式宣言，将战争重新定义为“自由的新生”。北方史料——林肯演说、国会立法、联邦陆军官方战史——构成了一套以国家救赎、自由与人权为核心的叙述。然而，这一视角往往淡化战争初期并非以废奴为目标、对南方平民与基础设施的破坏，以及北方内部存在的种族主义与政治分歧。",
    sources: [
      {
        id: "american_civil_war-union-1",
        title: "林肯第一次就职演说",
        author: "亚伯拉罕·林肯",
        year: "1861",
        type: "official_archive",
        credibilityScore: 90,
        excerpt: "“我没有直接或间接地干涉各州现存的奴隶制度的意图……然而，根据宪法赋予我的职责，我应当竭尽全力保卫联邦政府。”",
        credibilityReason: "美国总统的正式公开演说，原始文本由国家档案馆与国会图书馆保存，属于一手官方档案，真实性高；但演说旨在安抚南方与稳定边境州，带有政治策略性。",
        originalUrl: "https://avalon.law.yale.edu/19th_century/lincoln1.asp",
      },
      {
        id: "american_civil_war-union-2",
        title: "《解放奴隶宣言》",
        author: "亚伯拉罕·林肯 / 美国国家档案馆",
        year: "1863",
        type: "official_archive",
        credibilityScore: 95,
        excerpt: "“在包括叛乱州或州内某些地区在内的一切地方，所有被当作奴隶的人，从此永远获得自由。”",
        credibilityReason: "由林肯签署并以总统令形式发布，原始誊清本藏于美国国家档案馆；文本明确、官方，但局限于叛乱地区，未覆盖边境州。",
        originalUrl: "https://www.archives.gov/founding-docs/emancipation-proclamation",
      },
      {
        id: "american_civil_war-union-3",
        title: "联邦陆军官方战史（《叛乱战争官方记录》）",
        author: "美国战争部",
        year: "1880-1901",
        type: "official_archive",
        credibilityScore: 85,
        excerpt: "各地战场报告、命令、通信与后勤记录的汇编，为战役经过提供最接近官方的叙述。",
        credibilityReason: "政府主持编纂，依据南北双方档案整理，体量巨大且可交叉核对；但成书于战后，编辑取舍与编排仍可能带有联邦正统框架。",
        originalUrl: "https://collections.library.cornell.edu/moa_new/waro.html",
      },
    ],
    overallCredibility: 86,
    credibilityAssessment: "北方联邦视角拥有大量政府档案、总统演说与军事记录支撑，史料保存完整且多为当时原始文本，可信度较高；但叙事强调统一与解放的道德正当性，对战争初期并非以废奴为目标、对南方平民的破坏以及北方内部种族偏见有所淡化。",
    biasIndicators: ["强调国家统一与废奴正义","将南方叛乱描述为非法","淡化战争初期种族政策局限"],
    recommendedQuestions: ["林肯为何直到1862年才发布《解放奴隶宣言》？","北方民众对战争目标从“维护联邦”转向“废奴”的反应如何？"],
  },
  confederate: {
    title: "南方邦联／分离州视角",
    content:
      "南方邦联的叙事将战争视为各州为抵抗联邦政府“暴政”而进行的自卫战争。南方政治精英以南卡罗来纳、密西西比等州的脱离宣言和邦联宪法为依据，主张州主权、有限政府与经济自主。普通士兵则常以“保卫家园”而非捍卫奴隶制作战动员。然而，邦联副总统斯蒂芬斯的“基石演说”和多个州的脱离宣言明确将奴隶制的保护作为建国基础。战后“失落的事业”神话进一步将南方塑造为优雅、受压迫的文明。南方史料揭示了分裂国家的合法性焦虑，但也常常回避奴隶制的核心作用，并把北方的总体战描绘为残暴入侵。",
    sources: [
      {
        id: "american_civil_war-confederate-1",
        title: "南卡罗来纳州脱离联邦原因宣言",
        author: "南卡罗来纳州脱离大会",
        year: "1860",
        type: "official_archive",
        credibilityScore: 82,
        excerpt: "“非蓄奴州对奴隶制的长期敌意……侵害了我们珍视的制度与宪法权利，因此我们有正当理由脱离联邦。”",
        credibilityReason: "南方最早、最详尽的脱离理由官方文本，真实记录了当时精英意识形态；但文本为政治辩护，将奴隶制与州权绑定以证明分离合法。",
        originalUrl: "https://avalon.law.yale.edu/19th_century/csa_scarsec.asp",
      },
      {
        id: "american_civil_war-confederate-2",
        title: "邦联副总统斯蒂芬斯“基石演说”",
        author: "亚历山大·H·斯蒂芬斯",
        year: "1861",
        type: "official_archive",
        credibilityScore: 85,
        excerpt: "“我们新政府的伟大基石，是黑人不如白人这一伟大真理；奴隶制对优越种族而言是自然的、正常的。”",
        credibilityReason: "邦联副总统公开阐明建国原则，是理解南方精英意图的直接史料；演说后来版本有不同修订，研究者需注意版本差异。",
        originalUrl: "https://avalon.law.yale.edu/19th_century/csa_cornerstone.asp",
      },
      {
        id: "american_civil_war-confederate-3",
        title: "杰斐逊·戴维斯就职演说",
        author: "杰斐逊·戴维斯",
        year: "1861",
        type: "official_archive",
        credibilityScore: 78,
        excerpt: "“我们追求的不是征服，而是和平与自治；我们的事业是自由人民反抗压迫的事业。”",
        credibilityReason: "邦联总统就职演说，代表新政府官方立场；但辞令高度修辞化，将分离描述为防御，回避了维护奴隶制的核心动机。",
        originalUrl: "https://avalon.law.yale.edu/19th_century/jdavis_inaugural.asp",
      },
    ],
    overallCredibility: 80,
    credibilityAssessment: "南方邦联的脱离宣言与戴维斯、斯蒂芬斯演说直接呈现了南方政治精英的战争理由，史料真实性高；但这些文本属于自我辩护，强调州权与自由同时刻意淡化奴隶制核心地位，具有明显的意识形态建构色彩。",
    biasIndicators: ["将战争归因州权与宪法解释","强调北方侵略与家园防卫","对奴隶制经济作用轻描淡写"],
    recommendedQuestions: ["南方各州分离宣言如何直接提及奴隶制？","普通南方士兵与精英政客的目标是否一致？"],
  },
  international: {
    title: "欧洲／英国观察视角",
    content:
      "对英国和欧洲而言，美国内战既是遥远的内战，也牵动棉花贸易、海军霸权与意识形态争论。英国政府于1861年5月宣布中立，承认南北双方交战国地位，但始终未承认邦联独立。英国精英舆论分裂：棉花利益集团与保守派多同情南方“独立”与“贵族文明”，而工人阶级反奴隶制运动与自由派（如约翰·密尔）则支持北方。《笨拙》等讽刺杂志则常以漫画嘲讽林肯和北方军队，反映英国公众的复杂心态。国际视角揭示了战争超越美国本土的外交维度：邦联希望通过“棉花外交”赢得承认，而林肯政府则通过《解放奴隶宣言》与外交斡旋阻止欧洲干预。",
    sources: [
      {
        id: "american_civil_war-international-1",
        title: "维多利亚女王中立宣言",
        author: "英国政府（维多利亚女王）",
        year: "1861",
        type: "official_archive",
        credibilityScore: 92,
        excerpt: "“朕兹严令朕所有忠诚臣民在上述敌对行动中保持严格中立……违者将自行承担后果。”",
        credibilityReason: "英国官方外交文件，直接说明帝国对战争的法律立场；但中立表述本身具有外交策略，既承认邦联交战国地位，又避免承认其主权。",
        originalUrl: "https://aadl.org/node/273636",
      },
      {
        id: "american_civil_war-international-2",
        title: "《美国的较量》（The Contest in America）",
        author: "约翰·斯图亚特·密尔",
        year: "1862",
        type: "academic",
        credibilityScore: 86,
        excerpt: "“这场战争的唯一真正原因是奴隶制；北方为保存联邦而战，而若不终结奴隶制，联邦便不可能真正保存。”",
        credibilityReason: "密尔作为当时英国最具影响力的公共知识分子之一，在《弗雷泽杂志》发表的系统评论，代表自由主义知识界支持北方的立场；但文章带有鲜明的反奴隶制道德预设。",
        originalUrl: "https://oll-resources.s3.us-east-2.amazonaws.com/oll3/store/titles/255/Mill_0223-21_EBk_v6.0.pdf",
      },
      {
        id: "american_civil_war-international-3",
        title: "《笨拙》杂志林肯与内战漫画、诗歌集",
        author: "约翰·坦尼尔等 / 威廉·S·沃尔什编",
        year: "1861-1865（1909年汇编）",
        type: "media",
        credibilityScore: 75,
        excerpt: "“北是锅、南是壶，两边都有错”——漫画与讽刺诗以“兄弟乔纳森”和约翰牛的形象嘲弄美国政治的混乱与战争的荒谬。",
        credibilityReason: "《笨拙》是当时英国最有影响力的讽刺刊物，直观反映英国大众舆论与精英反美情绪；但作为讽刺作品，其夸张与漫画化手法不等于事实报道，需结合其他史料分析。",
        originalUrl: "https://archive.org/download/abrahamlincolnlo02wals/abrahamlincolnlo02wals.pdf",
      },
    ],
    overallCredibility: 82,
    credibilityAssessment: "英国中立宣言、约翰·密尔评论与《笨拙》漫画均为当时一手材料，可信度较高；但它们反映的是英国特定阶层舆论，既受经济利益（棉花、船运）驱动，也受反美情绪与反奴隶制情感影响，立场多元且常带讽刺。",
    biasIndicators: ["以英国利益与文明优越感评判","报刊同情南方独立或嘲笑北方","对奴隶制态度分化"],
    recommendedQuestions: ["英国为何保持中立却仍为邦联建造军舰？","棉花饥荒如何影响英国公众对战争的态度？"],
  },
};

// ========== 黑死病与中世纪欧洲视角 ==========

export const BLACK_DEATH_PERSPECTIVES: TopicPerspectives = {
  christian_europe: {
    title: "基督教欧洲视角",
    content:
      "中世纪欧洲将黑死病视为上帝的惩罚，教堂和修道院成为救治和埋葬的中心。文学、绘画中充斥着死亡舞蹈、骷髅和末日意象。同时，教会权威的失效也促使人们开始质疑传统宗教解释，为后来的宗教改革埋下种子。",
    sources: [
      {
        id: "bld-ce-1",
        title: "十日谈（Decameron）",
        author: "乔万尼·薄伽丘",
        year: "1353",
        type: "literature",
        credibilityScore: 85,
        excerpt: "如此惨痛、如此残酷的灾难，其恐怖程度超出了人类记忆所能承载的一切。",
        credibilityReason: "薄伽丘亲历佛罗伦萨瘟疫，文学描写生动且包含大量社会细节。",
        originalUrl: "https://www.gutenberg.org/files/23700/23700-h/23700-h.htm",
      },
      {
        id: "bld-ce-2",
        title: "阿尼奥洛·迪图拉锡耶纳编年史",
        author: "Agnolo di Tura",
        year: "1348-1351",
        type: "memoir",
        credibilityScore: 88,
        excerpt: "我亲手埋葬了我的五个孩子，许多人因为恐惧抛弃了病人，连神父也不再施洗。",
        credibilityReason: "锡耶纳市民的一手记录，真实反映了瘟疫对家庭和社会关系的冲击。",
        originalUrl: "https://www.fordham.edu/halsall/source/1348tatarni.asp",
      },
    ],
    overallCredibility: 85,
    credibilityAssessment: "基督教欧洲视角以亲历者文学和编年史为主，情感真实、细节丰富，但受宗教世界观影响，对病因解释并不科学。",
    biasIndicators: ["将瘟疫神谴化","对犹太人等少数群体的偏见","文学渲染可能夸大个别场景"],
    recommendedQuestions: ["黑死病如何改变了中世纪欧洲人的宗教观念？","教会为何在瘟疫中失去部分权威？","死亡艺术（Ars Moriendi）如何反映时代心理？"],
  },
  islamic_world: {
    title: "伊斯兰世界视角",
    content:
      "鼠疫同样重创了中东和北非的伊斯兰世界。伊斯兰医学家和法学家在救治、葬礼和宗教仪式方面提出指导。伊本·赫勒敦等史学家记录了瘟疫对社会的影响。伊斯兰世界将瘟疫视为'殉道者的死亡'，鼓励信徒坦然面对，但也发展出隔离和公共卫生措施。",
    sources: [
      {
        id: "bld-is-1",
        title: "瘟疫书（Kitab al-Ta'un）",
        author: "伊本·哈提卜（Ibn al-Khatib）",
        year: "1374",
        type: "academic",
        credibilityScore: 86,
        excerpt: "瘟疫通过接触传染，隔离是必要的，虽然这与某些宗教观念相冲突。",
        credibilityReason: "安达卢西亚医学家最早提出鼠疫接触传染理论，具有重要医学史价值。",
        originalUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5512470/",
      },
      {
        id: "bld-is-2",
        title: "历史绪论（Muqaddimah）",
        author: "伊本·赫勒敦",
        year: "1377",
        type: "academic",
        credibilityScore: 87,
        excerpt: "当瘟疫和灾难摧毁文明时，城邦的繁华转瞬即逝。",
        credibilityReason: "伊本·赫勒敦亲历北非瘟疫，其社会学分析具有超越时代的洞察力。",
        originalUrl: "https://www.muslimphilosophy.com/ik/Muqaddimah/",
      },
    ],
    overallCredibility: 86,
    credibilityAssessment: "伊斯兰世界视角提供了与欧洲不同的医学和宗教解释，伊本·赫勒敦的社会学分析尤为珍贵，但部分文献也受宗教神学框架影响。",
    biasIndicators: ["将瘟疫视为真主意志","医学观点受宗教争议限制","不同地区记录完整度不一"],
    recommendedQuestions: ["伊斯兰医学家如何解释瘟疫传播？","伊斯兰世界采取了哪些防疫措施？","黑死病如何影响中东和北非的社会结构？"],
  },
  modern_historian: {
    title: "现代医学史视角",
    content:
      "现代医学史和流行病学研究表明，14世纪黑死病主要由鼠疫耶尔森菌（Yersinia pestis）引起，通过跳蚤和鼠类传播。研究通过古DNA分析确认了致病菌，并揭示瘟疫沿陆路商道和海上贸易路线扩散的路径。黑死病被视为中世纪向近代过渡的关键催化剂。",
    sources: [
      {
        id: "bld-mh-1",
        title: "黑死病：一部世界史",
        author: "Ole Benedictow",
        year: "2004",
        type: "academic",
        credibilityScore: 90,
        excerpt: "黑死病造成欧洲约60%人口死亡，是人类历史上最严重的瘟疫之一。",
        credibilityReason: "挪威医学史家综合考古、文献和流行病学研究，数据详实。",
        originalUrl: "https://boydellandbrewer.com/9781843836190/the-black-death-1346-1353/",
      },
      {
        id: "bld-mh-2",
        title: "A Draft Genome of Yersinia pestis from Victims of the Black Death",
        author: "Bos et al., Nature",
        year: "2011",
        type: "academic",
        credibilityScore: 92,
        excerpt: "从黑死病墓地遗骸中提取的DNA证实，14世纪瘟疫由鼠疫耶尔森菌引起。",
        credibilityReason: "古DNA研究为黑死病病因提供了直接科学证据。",
        originalUrl: "https://www.nature.com/articles/nature10549",
      },
    ],
    overallCredibility: 90,
    credibilityAssessment: "现代医学史视角结合了文献、考古和科学分析，对瘟疫病因、传播路径和社会影响的理解最为全面，但可能低估当时人的精神体验。",
    biasIndicators: ["过度强调人口和经济数据","可能忽视宗教和精神层面","对历史记录的解读受现代观念影响"],
    recommendedQuestions: ["黑死病为何传播如此迅速？","鼠疫杆菌的基因研究如何改变我们对黑死病的认识？","黑死病对文艺复兴和宗教改革有何影响？"],
  },
};

// ========== 古巴导弹危机视角 ==========

export const CUBAN_MISSILE_CRISIS_PERSPECTIVES: TopicPerspectives = {
  united_states: {
    title: "美国视角",
    content:
      "在美国看来，苏联秘密在古巴部署中程与洲际核导弹，是对西半球安全的直接挑衅。肯尼迪政府强调，‘隔离’（quarantine）是一种防御性、有限度的海上封锁，旨在阻止更多进攻性武器进入古巴，同时为外交谈判赢得时间。美国公开要求苏联撤除导弹，并承诺不入侵古巴作为交换。美方叙述突出U-2照片的客观证据、美洲国家组织与西方盟友的支持，以及最终通过坚定而克制的行动迫使苏联退让。",
    sources: [
      {
        id: "cuban_missile_crisis-persp-1",
        title: "肯尼迪1962年10月22日全国电视讲话",
        author: "John F. Kennedy / JFK Presidential Library",
        year: "1962",
        type: "official_archive",
        credibilityScore: 92,
        excerpt: "It shall be the policy of this nation to regard any nuclear missile launched from Cuba against any nation in the Western Hemisphere as an attack by the Soviet Union on the United States, requiring a full retaliatory response upon the Soviet Union.",
        credibilityReason: "美国总统在危机中的正式公开声明，原始录音与文本由约翰·F·肯尼迪图书馆保存，属一手官方档案。",
        originalUrl: "https://microsites.jfklibrary.org/cmc/oct22",
      },
      {
        id: "cuban_missile_crisis-persp-2",
        title: "U-2侦察照片：古巴导弹阵地",
        author: "CIA / National Photographic Interpretation Center",
        year: "1962",
        type: "official_archive",
        credibilityScore: 95,
        excerpt: "U-2 overflight photographs taken on October 14, 1962, revealed SS-4 medium-range ballistic missile sites under construction at San Cristóbal, Cuba.",
        credibilityReason: "美国国家照相判读中心的原始判读报告，照片客观记录了发射场的建设情况，具有很高史料价值。",
        originalUrl: "https://www.archives.gov/milestone-documents/aerial-photograph-of-missiles-in-cuba",
      },
      {
        id: "cuban_missile_crisis-persp-3",
        title: "EXCOMM会议录音与文字记录",
        author: "John F. Kennedy Presidential Library",
        year: "1962（1990年代解密）",
        type: "official_archive",
        credibilityScore: 90,
        excerpt: "The original tape recordings of EXCOMM’s meetings document the reactions of the committee members upon initially hearing the news that medium and long-range ballistic missiles might be stationed in Cuba.",
        credibilityReason: "白宫危机决策核心圈的原始录音，经解密后由总统图书馆公开，能反映美方内部的真实辩论。",
        originalUrl: "https://www.jfklibrary.org/learn/about-john-f-kennedy/john-f-kennedy-and-cuban-missile-crisis/excomm-meetings",
      },
    ],
    overallCredibility: 90,
    credibilityAssessment: "美国官方档案和总统演讲多为当时就公开或事后解密的一手材料，信息相对完整，但带有明显的美方立场与冷战反共话语，对苏联动机解释较单一。",
    biasIndicators: ["将苏联导弹定性为进攻性威胁","突出肯尼迪冷静决策与西方团结","将隔离政策包装为防御性而非封锁"],
    recommendedQuestions: ["美国为何选择隔离而非空袭？","美方如何处理土耳其木星导弹的秘密交易？","U-2照片在塑造公众舆论中起了什么作用？"],
  },
  soviet_union: {
    title: "苏联视角",
    content:
      "苏联方面认为，在古巴部署导弹是对美国在土耳其、意大利部署木星导弹以及多次策划颠覆、入侵古巴行动的防御性回应。赫鲁晓夫强调，苏联无意发动战争，只是保护古巴革命免受美国侵略，并借此恢复被美方打破的战略平衡。苏联叙事中，美国的隔离是公海上的‘海盗行为’，而赫鲁晓夫主动提出撤除导弹、呼吁和平谈判，展现了对人类命运的负责态度。",
    sources: [
      {
        id: "cuban_missile_crisis-persp-4",
        title: "赫鲁晓夫1962年10月26日致肯尼迪信",
        author: "Nikita Khrushchev",
        year: "1962",
        type: "official_archive",
        credibilityScore: 90,
        excerpt: "Let us therefore show statesmanlike wisdom. I propose: We, for our part, will declare that our ships... will not carry any kind of armaments. You would declare that the United States will not invade Cuba...",
        credibilityReason: "苏联领导人亲笔信，由苏联外交部递交美国大使馆，是危机谈判与最终解决方案形成的关键原始文本。",
        originalUrl: "https://microsites.jfklibrary.org/cmc/oct26/doc4.html",
      },
      {
        id: "cuban_missile_crisis-persp-5",
        title: "赫鲁晓夫回忆录（Khrushchev Remembers）",
        author: "Nikita Khrushchev / Strobe Talbott编辑",
        year: "1970",
        type: "memoir",
        credibilityScore: 70,
        excerpt: "The two most powerful nations of the world had been squared off against each other... But both sides showed that if the desire to avoid war is strong enough, even the most pressing dispute can be solved by compromise.",
        credibilityReason: "事后口述回忆，经西方编辑整理，真实性曾受争议，但为理解苏联高层决策动机提供了重要线索。",
        originalUrl: "https://text-message.blogs.archives.gov/2017/01/31/nikita-khrushchevs-memoirs-part-i/",
      },
      {
        id: "cuban_missile_crisis-persp-6",
        title: "苏联政府1962年10月23日声明",
        author: "苏联政府",
        year: "1962",
        type: "official_archive",
        credibilityScore: 88,
        excerpt: "The armaments which are in Cuba, regardless of the classification to which they may belong, are intended solely for defensive purposes, in order to secure the Republic of Cuba against the attack of an aggressor.",
        credibilityReason: "苏联政府正式外交照会，阐明其对古巴军援的防御性解释，是苏联对外话语的直接体现。",
        originalUrl: "https://microsites.jfklibrary.org/cmc/oct23/doc6.html",
      },
    ],
    overallCredibility: 82,
    credibilityAssessment: "苏联官方信件是可靠的一手外交文献；回忆录为二手自述，带有自我辩护色彩，需与美国档案交叉验证。整体上，苏联视角补充了美方叙事中缺失的动机与恐惧。",
    biasIndicators: ["将导弹部署描述为防御行动","指责美国隔离违反国际法","强调苏联主动求和、避免核战争的形象"],
    recommendedQuestions: ["苏联为何选择秘密部署而非公开条约？","赫鲁晓夫为何在27日追加土耳其导弹条件？","苏联军方在古巴拥有多大自主权？"],
  },
  cuba: {
    title: "古巴本土视角",
    content:
      "古巴将危机视为保卫革命成果与美国干涉的生死斗争。卡斯特罗政府接受苏联导弹，主要因为1961年猪湾入侵后担心美国再次军事干涉，并希望借此强化社会主义阵营。古巴叙事强调，大国在谈判中忽视了古巴主权与五项条件：结束经济封锁、停止颠覆活动、终止海盗攻击、停止侵犯领空领海、归还关塔那摩。苏联单方面宣布撤除导弹令古巴深感被出卖，卡斯特罗坚持认为，只有古巴人民动员起来才能抵御侵略。",
    sources: [
      {
        id: "cuban_missile_crisis-persp-7",
        title: "卡斯特罗1962年10月26日致赫鲁晓夫信",
        author: "Fidel Castro",
        year: "1962",
        type: "official_archive",
        credibilityScore: 85,
        excerpt: "From an analysis of the situation... I believe that the aggression is almost imminent within the next 24 to 72 hours... You can be sure that we will firmly and resolutely resist an attack whatever it may be.",
        credibilityReason: "古巴最高领导人在危机最紧张时刻写给苏联领导人的信件，直接反映古巴对美国入侵威胁的判断与抵抗决心。",
        originalUrl: "https://www.walterlippmann.com/fc-10-26-1962.html",
      },
      {
        id: "cuban_missile_crisis-persp-8",
        title: "卡斯特罗在1992年哈瓦那三方会议上的证词",
        author: "Fidel Castro / Havana Tripartite Conference",
        year: "1992",
        type: "memoir",
        credibilityScore: 72,
        excerpt: "Eventually, they agreed ‘to strengthen the Socialist bloc,’ according to former Cuban Leader Fidel Castro during his testimony at the Havana Tripartite Conference in January 1992.",
        credibilityReason: "多年后会议口述回忆，解释古巴接受导弹的动机，但受事后政治话语与记忆重构影响。",
        originalUrl: "https://blog.ucs.org/guest-commentary/the-unheard-voices-of-the-cuban-missile-crisis/",
      },
      {
        id: "cuban_missile_crisis-persp-9",
        title: "古巴政府1962年10月28日五项要求声明",
        author: "Fidel Castro / 古巴政府",
        year: "1962",
        type: "official_archive",
        credibilityScore: 84,
        excerpt: "Cessation of the economic blockade... cessation of all subversive activities... withdrawal of the Guantánamo naval base and return of the Cuban territory.",
        credibilityReason: "古巴政府正式声明，明确提出结束危机的政治条件，集中体现其对主权、封锁与美国军事存在核心关切。",
        originalUrl: "https://www.scienceopen.com/hosted-document?doi=10.13169/intejcubastud.15.1.0013",
      },
    ],
    overallCredibility: 78,
    credibilityAssessment: "古巴档案开放有限，公开信件与讲话具有直接性，但部分材料经翻译和政治语境包装，情绪与主权色彩浓厚，需要与大国档案相互印证。",
    biasIndicators: ["强调美国侵略与封锁的持续性","突出古巴被大国忽视和出卖的不满","将导弹部署正当化为自卫与革命保卫"],
    recommendedQuestions: ["古巴为何在苏联撤出导弹后仍感到被出卖？","古巴五项要求对危机解决有何影响？","古巴本土决策在多大程度上受制于苏联？"],
  },
};

// ========== 非殖民化与亚非拉独立视角 ==========

export const DECOLONIZATION_PERSPECTIVES: TopicPerspectives = {
  liberation_movement: {
    title: "反殖民独立运动视角",
    content:
      "从亚非拉民族主义者看来，非殖民化是被压迫人民挣脱外来统治、恢复主体性的正义斗争。印度国大党、印尼民族党、加纳人民大会党、阿尔及利亚民族解放阵线等组织，以民族主义、社会主义、泛非主义或泛阿拉伯主义为旗帜，通过非暴力抗争、议会选举、武装斗争与国际外交等多种方式争取独立。它们将殖民主义视为对经济、文化与政治权利的系统性剥夺，强调自决权与发展权的不可分割，并在万隆会议等场合寻求南南团结。",
    sources: [
      {
        id: "decolonization-persp-1",
        title: "尼赫鲁《命运之约》演讲",
        author: "贾瓦哈拉尔·尼赫鲁",
        year: "1947",
        type: "official_archive",
        credibilityScore: 82,
        excerpt: "“在午夜钟声敲响时，当世界沉睡，印度将觉醒并获得生命与自由。一个时代结束，当一个民族长期被压抑的灵魂找到表达时，这样的时刻罕见地到来了。”",
        credibilityReason: "演讲原文保存在印度国家档案馆与尼赫鲁纪念馆，多家独立历史网站有全文记录，是印度独立最具代表性的第一手文献。",
        originalUrl: "https://www.americanrhetoric.com/speeches/jawaharlalnehrutrystwithdestiny.htm",
      },
      {
        id: "decolonization-persp-2",
        title: "恩克鲁玛加纳独立日演说",
        author: "克瓦米·恩克鲁玛",
        year: "1957",
        type: "official_archive",
        credibilityScore: 80,
        excerpt: "“终于，战斗结束了！加纳，你们深爱的祖国，永远自由了。……我们的独立若不与整个非洲的彻底解放相联系，便毫无意义。”",
        credibilityReason: "演说全文见于加纳官方与多家学术机构的纪念文本，体现了泛非主义与反殖民话语的核心主张，但部分引文存在版本差异。",
        originalUrl: "https://cocorioko.net/historical-kwame-nkrumahs-vintage-address-to-the-new-ghanaian-nation-and-the-world-on-march-6-1957/",
      },
      {
        id: "decolonization-persp-3",
        title: "《大地上的受苦者》（The Wretched of the Earth）",
        author: "弗朗茨·法农",
        year: "1961",
        type: "academic",
        credibilityScore: 78,
        excerpt: "“非殖民化不仅是被殖民者摆脱殖民者的简单过程，它是一场全面的社会变革，要求重建被压迫者的人性。”",
        credibilityReason: "法农以阿尔及利亚革命亲历者与精神病学家身份写作，深刻影响了反殖民思想；但书中对暴力的强调具有强烈意识形态倾向，需批判性阅读。",
        originalUrl: "https://www.marxists.org/reference/archive/fanon/",
      },
    ],
    overallCredibility: 80,
    credibilityAssessment: "该视角文献多为亲历者的公开演讲与理论著作，情感充沛、史料价值高，能直接呈现被殖民者的诉求；但部分文本经过政治修辞加工，对殖民统治的批判有时趋于单向度，需与宗主国档案对照阅读。",
    biasIndicators: ["强烈的反殖民与民族主义情感","对殖民暴力的控诉有时压倒复杂分析","部分文本带有社会主义或泛非主义意识形态色彩"],
    recommendedQuestions: ["独立运动领袖如何平衡民族统一与内部族群、阶级矛盾？","非暴力抗争与武装斗争在不同殖民地各有什么成效与代价？"],
  },
  colonial_metropole: {
    title: "殖民宗主国视角",
    content:
      "英国、法国、荷兰、比利时等殖民国家最初普遍试图维持帝国体系，将非殖民化视为对国际地位、经济利益与战略安全的威胁。英国倾向于通过渐进宪法改革“有序撤退”，以保全英联邦联系；法国则将阿尔及利亚视为本土一部分，长期拒绝独立，直至战争代价迫使戴高乐承认自决；荷兰与比利时多在外部压力与军事失败后才仓促承认独立。宗主国档案常强调“文明使命”、发展援助与法律程序，同时淡化或掩盖镇压、酷刑与种族歧视。",
    sources: [
      {
        id: "decolonization-persp-4",
        title: "英国殖民部关于黄金海岸的原始通信（CO 96 / CO 554）",
        author: "英国殖民部",
        year: "1843-1957",
        type: "official_archive",
        credibilityScore: 85,
        excerpt: "档案记录了殖民官员对加纳民族运动、宪法谈判与独立进程的报告，如“恩克鲁玛的政党正在迅速动员城市工人与可可农民”。",
        credibilityReason: "英国国家档案馆保存的殖民部文件是官方行政记录，内容详实；但部分安全档案曾长期隐匿，2011年“汉斯洛普披露”后才逐步公开。",
        originalUrl: "https://discovery.nationalarchives.gov.uk/details/r/C4287",
      },
      {
        id: "decolonization-persp-5",
        title: "戴高乐关于阿尔及利亚自决的电视演说",
        author: "夏尔·戴高乐",
        year: "1959",
        type: "official_archive",
        credibilityScore: 76,
        excerpt: "“考虑到阿尔及利亚问题的所有国内与国际因素，我认为有必要今天宣布：将通过自决让阿尔及利亚人民选择自己的未来。”",
        credibilityReason: "演说由法国官方录制并保存，是法国政策转折的关键文献；但戴高乐以个人权威包装政策转变，并试图以“联合”等选项稀释完全独立的诉求。",
        originalUrl: "http://www.charles-de-gaulle.org/pages/l-homme/accueil/discours/le-president-de-la-cinquieme-republique-1958-1969/discours-sur-l-autodetermination-de-l-algerie-16-septembre-1959.php",
      },
      {
        id: "decolonization-persp-6",
        title: "《海牙圆桌协定》",
        author: "荷兰王国与印度尼西亚共和国",
        year: "1949",
        type: "official_archive",
        credibilityScore: 83,
        excerpt: "“荷兰毫无保留地将主权移交给印度尼西亚联邦共和国，同时保留对西新几内亚的临时安排。”",
        credibilityReason: "该协定为正式国际条约文本，记录荷兰承认印尼独立的法律程序；但关于西伊里安的临时条款为后续争端埋下伏笔，需结合印尼视角理解。",
        originalUrl: "https://www.worldcat.org/title/agreement-on-transitional-measures-between-the-kingdom-of-the-netherlands-and-the-republic-of-the-united-states-of-indonesia/oclc/",
      },
    ],
    overallCredibility: 81,
    credibilityAssessment: "宗主国档案提供了决策过程、经济数据与政策演变的细节，是理解非殖民化“如何发生”的核心史料；但这些材料往往带有维护帝国合法性的偏见，对镇压、酷刑及种族不平等问题多有遮蔽或轻描淡写。",
    biasIndicators: ["维护殖民统治合法性的官方叙事","将独立运动描述为“骚乱”“叛乱”或“外部煽动”","强调“文明使命”与发展援助，淡化剥削"],
    recommendedQuestions: ["英国为何在印度与加纳采取“谈判退出”，而在肯尼亚采取镇压？","法国政府内部对阿尔及利亚自决的反对力量如何影响政策？"],
  },
  international: {
    title: "国际社会与冷战视角",
    content:
      "联合国、美苏两大阵营及不结盟运动共同塑造了非殖民化的国际环境。联合国1960年《给予殖民地国家和人民独立宣言》将反殖民主义纳入国际法；苏联常以反帝旗帜支持民族解放运动，试图扩大社会主义阵营；美国则在反殖民理想与维护北约盟友利益之间摇摆，肯尼迪等人呼吁支持自决以赢得“第三世界”。不结盟国家试图超越冷战两极，强调主权、和平共处与经济合作，但新独立国家很快面临新殖民主义、债务依赖与大国代理冲突的挑战。",
    sources: [
      {
        id: "decolonization-persp-7",
        title: "《给予殖民地国家和人民独立宣言》（联合国大会第1514号决议）",
        author: "联合国大会",
        year: "1960",
        type: "international",
        credibilityScore: 88,
        excerpt: "“任何形式的外来统治、支配和剥削，都是对人权的否定，有违联合国宪章，并妨碍世界和平与合作。”",
        credibilityReason: "联合国正式决议文本，经大会表决通过，具有国际法影响力；但部分殖民国家弃权或反对，执行力度受冷战政治制约。",
        originalUrl: "https://digitallibrary.un.org/record/206145",
      },
      {
        id: "decolonization-persp-8",
        title: "肯尼迪在参议院关于阿尔及利亚的演讲",
        author: "约翰·F·肯尼迪",
        year: "1957",
        type: "official_archive",
        credibilityScore: 75,
        excerpt: "“西方在阿尔及利亚问题上的顽固路线，正在将我们卷入与民族主义大潮的冲突，而这场大潮是当今世界外交中最强大的力量。”",
        credibilityReason: "演说文本保存于肯尼迪总统图书馆参议院档案，反映美国内部对法阿政策的批评；但肯尼迪作为政治人物，其表态亦服务于个人与国内政治议程。",
        originalUrl: "https://www.jfklibrary.gov/learn/about-john-f-kennedy/john-f-kennedy-and-africa",
      },
      {
        id: "decolonization-persp-9",
        title: "赫鲁晓夫在联合国大会关于非殖民化的发言",
        author: "尼基塔·赫鲁晓夫",
        year: "1960",
        type: "official_archive",
        credibilityScore: 68,
        excerpt: "“如果联合国不采取旨在消灭殖民制度的措施，殖民国家的人民将别无选择，只能拿起武器。”",
        credibilityReason: "苏联官方发言记录见于联合国文件与苏联出版物；话语充满意识形态对抗色彩，将非殖民化与反西方阵营斗争绑定，可信度受政治宣传影响较大。",
        originalUrl: "https://www.un.org/en/ga/generaldebate",
      },
    ],
    overallCredibility: 77,
    credibilityAssessment: "国际层面史料包括联合国决议、大国领导人演说与外交电报，有助于理解非殖民化的全球政治结构；但美苏双方的表态往往服务于冷战竞争，不结盟运动内部的团结也经常被利益分歧削弱。",
    biasIndicators: ["美苏各自将独立运动纳入冷战叙事","联合国决议的理想主义言辞与实际执行的落差","不结盟国家对两大阵营采取选择性合作"],
    recommendedQuestions: ["冷战竞争如何加速了还是扭曲了某些地区的非殖民化？","联合国在非殖民化过程中发挥了多大实际作用？"],
  },
};

// ========== 朝鲜战争视角 ==========

export const KOREAN_WAR_PERSPECTIVES: TopicPerspectives = {
  un_allied: {
    title: "联合国军/美韩视角：制止侵略，恢复和平",
    content:
      "在美国及西方盟国的主流叙事中，朝鲜战争始于朝鲜人民军对韩国的“无端武装侵略”。联合国安理会认定朝鲜破坏和平，授权会员国援助韩国。联合国军在仁川登陆后扭转战局，随后战争扩大并陷入长期僵持。该视角强调联合国集体安全机制的作用、自由世界对共产扩张的遏制，以及战争最终通过谈判实现停火的成果。韩国方面则更突出国家存亡危机、联合国军的救援以及战争造成的民族分裂与平民苦难。美国史学界对战争决策、麦克阿瑟解职、战俘遣返等问题存在多元讨论，但普遍承认这是一场“被遗忘的战争”。",
    sources: [
      {
        id: "korean_war-persp-4",
        title: "联合国安理会第82、83、84号决议",
        author: "联合国安全理事会",
        year: "1950",
        type: "international",
        credibilityScore: 90,
        excerpt: "HAVING DETERMINED that the armed attack upon the Republic of Korea by forces from North Korea constitutes a breach of the peace... RECOMMENDS that the Members of the United Nations furnish such assistance to the Republic of Korea as may be necessary.",
        credibilityReason: "联合国正式决议文本，具有国际法效力，是研究国际干预合法性的核心档案；但苏联缺席使表决代表性存在争议。",
        originalUrl: "https://documents.un.org/doc/resolution/gen/nr0/064/95/pdf/nr006495.pdf",
      },
      {
        id: "korean_war-persp-5",
        title: "United Nations forces advance against enemy during Korean War",
        author: "Harry S. Truman Library & Museum / NARA",
        year: "1950",
        type: "media",
        credibilityScore: 86,
        excerpt: "公共领域照片，记录联合国军第25步兵师所属部队在朝鲜战场的推进场景，反映美军官方战地影像的视角。",
        credibilityReason: "美国国家档案馆下属总统图书馆藏品的原始照片，属一手影像资料；但照片标题与说明可能带有宣传目的，需结合战报交叉验证。",
        originalUrl: "https://www.trumanlibrary.gov/photograph-records/2007-466",
      },
      {
        id: "korean_war-persp-6",
        title: "《朝鲜战争：美国陆军战史》",
        author: "美国陆军军事历史中心",
        year: "1996",
        type: "official_archive",
        credibilityScore: 84,
        excerpt: "The Korean War was a conflict of great complexity, fought by the United States and its allies under the United Nations flag to repel Communist aggression.",
        credibilityReason: "美国军方官方战史，战役与后勤记述详尽，是英语世界权威参考；但对战争政治目标与决策失误的批判相对克制。",
        originalUrl: "https://history.army.mil/html/bookshelves/resma/kw.html",
      },
    ],
    overallCredibility: 85,
    credibilityAssessment: "联合国军/美韩视角拥有大量公开档案、照片与战史著作，联合国决议提供了国际法层面的依据；但“侵略”定性忽视半岛分裂与南北对峙的复杂性，对美军轰炸平民、化学武器指控等议题披露不足。",
    biasIndicators: ["将朝鲜行动单一定性为“侵略”","突出联合国集体安全框架的正当性","对越过三八线后北进政策反思有限"],
    recommendedQuestions: ["联合国安理会决议是否等同于全体国际社会共识？","仁川登陆的战略成功是否导致战争目标过度扩张？","美国为何最终选择谈判而非统一朝鲜？"],
  },
  north_korean: {
    title: "朝鲜/社会主义阵营视角：祖国解放战争",
    content:
      "在朝鲜官方叙事中，这场战争被称为“祖国解放战争”。朝鲜声称李承晚政权在美国扶植下不断挑衅三八线，北方被迫自卫反击、解放南方。苏联解密档案显示，金日成早在1950年初即向斯大林提出统一计划，并争取社会主义阵营支持。战争爆发后，苏联提供武器、顾问与空中支援，但刻意避免与美国发生直接冲突。随着战争扩大，社会主义阵营形成跨国协同作战格局。朝鲜视角将金日成塑造为民族统一与反帝斗争的领袖，强调美军轰炸与细菌战等暴行，对战争初期的战略失误与巨大人员伤亡则较少提及。",
    sources: [
      {
        id: "korean_war-persp-7",
        title: "Soviet Aims in Korea and the Origins of the Korean War",
        author: "Kathryn Weathersby / Cold War International History Project",
        year: "1993",
        type: "academic",
        credibilityScore: 87,
        excerpt: "The documentary evidence released thus far indicates that Stalin's interest in maintaining control over the northern half of Korea stemmed from the territory's strategic significance.",
        credibilityReason: "基于苏联解体后解密的俄国外交与军事档案，是研究苏联角色与战争起源的重要学术成果；但部分关键文件仍属机密。",
        originalUrl: "https://pages.ucsd.edu/~bslantchev/courses/ps142j/documents/weathersby-soviet-aims-in-korea.pdf",
      },
      {
        id: "korean_war-persp-8",
        title: "《祖国解放战争史》",
        author: "朝鲜民主主义人民共和国科学院历史研究所",
        year: "1959",
        type: "official_archive",
        credibilityScore: 60,
        excerpt: "美帝国主义侵略者及其走狗李承晚匪帮，对朝鲜民主主义人民共和国发动了武装进攻，朝鲜人民军奋起进行正义的祖国解放战争。",
        credibilityReason: "朝鲜官方战争史，直接体现政权叙事与意识形态，对政治宣传价值大于史料客观性；但可用于理解朝鲜的国家记忆建构。",
      },
      {
        id: "korean_war-persp-9",
        title: "Korean War Origins, 1945-1950",
        author: "Wilson Center Digital Archive",
        year: "1945-1950",
        type: "official_archive",
        credibilityScore: 88,
        excerpt: "Collection of declassified documents from Russian archives on the origins of the Korean War, including communications among socialist-bloc leaders.",
        credibilityReason: "汇集多国解密档案，来源包括俄国总统档案馆、外交部档案等，是冷战国际史研究的核心平台；部分文件为英译摘要，需核对原文。",
        originalUrl: "https://digitalarchive.wilsoncenter.org/collection/47/korean-war-origins-1945-1950",
      },
    ],
    overallCredibility: 72,
    credibilityAssessment: "朝鲜官方叙事政治宣传色彩浓厚，可信度较低；但苏联解密档案与威尔逊中心档案显著提升了社会主义阵营视角的可靠性，使研究者得以重构斯大林、金日成与毛泽东之间的决策链条。",
    biasIndicators: ["将南方定性为“美帝国主义傀儡”","将战争起因完全归责于李承晚挑衅","高度神化金日成的领导作用"],
    recommendedQuestions: ["斯大林在何时、以何种条件批准金日成的进攻计划？","苏联空军在朝鲜战争中扮演了怎样的秘密角色？","朝鲜官方叙事如何解释战争初期的迅速溃败与长期僵持？"],
  }
};

// ========== 蒙古帝国的扩张视角 ==========

export const MONGOL_EMPIRE_PERSPECTIVES: TopicPerspectives = {
  mongol: {
    title: "蒙古/草原视角",
    content:
      "蒙古传统叙事将成吉思汗视为统一分裂部落、结束血亲复仇、建立法制与秩序的伟大英雄。《蒙古秘史》强调铁木真从逆境中崛起，以天命与才能凝聚各部；后世帝国编年材料则突出蒙古统治的合法性与宗教宽容。草原视角较少关注被征服者的苦难，而着重于千户制、怯薛军、驿站网络等国家建构成就，以及蒙古法（扎撒）对欧亚和平贸易的维护。",
    sources: [
      {
        id: "mongol_empire-persp-1",
        title: "The Secret History of the Mongols",
        author: "佚名（蒙古宫廷史官）",
        year: "约1240年",
        type: "official_archive",
        credibilityScore: 78,
        excerpt: "『成吉思合罕征伐诸国，七十三战，六十三胜，十败。』",
        credibilityReason: "蒙古帝国最早的民族史诗与宫廷档案，提供草原社会内部视角，但神话色彩浓厚且对失败与暴行多有隐讳。",
        originalUrl: "https://altaica.ru/e_SecretH.php",
      },
      {
        id: "mongol_empire-persp-2",
        title: "Later Mongol imperial chronicles",
        author: "宋濂等（明初史官）",
        year: "1370年",
        type: "official_archive",
        credibilityScore: 82,
        excerpt: "『帝深沉有大略，用兵如神，故能灭国四十，遂平西夏。』",
        credibilityReason: "依据后世宫廷编年材料整理，政治与军事纪事较为系统，但编纂者的王朝正统观会影响对蒙古统治的评价。",
        originalUrl: "http://www.24-shi.com/24shi_jianti/23_1.thtml",
      },
      {
        id: "mongol_empire-persp-3",
        title: "《史集·蒙古史》",
        author: "拉施特丁（Rashid al-Din）",
        year: "1307年",
        type: "academic",
        credibilityScore: 85,
        excerpt: "『成吉思汗将全体蒙古人统一在一个法律与一个政权之下，这是此前任何草原领袖未能做到的。』",
        credibilityReason: "伊尔汗国宰相利用蒙古宫廷『金册』档案与波斯史料编纂，信息丰富但带有为伊尔汗政权正名的意图。",
        originalUrl: "https://sourcebooks.fordham.edu/sbook1d.asp",
      },
    ],
    overallCredibility: 82,
    credibilityAssessment: "蒙古/草原视角掌握帝国制度与军事运作的第一手信息，对成吉思汗的个人魅力与国家建构有独到理解，但对征服造成的破坏与异族苦难记述不足，且存在天命论与英雄化倾向。",
    biasIndicators: ["强调天命与英雄叙事，淡化屠杀与破坏","以蒙古中心观叙述欧亚各文明","将游牧征服正当化为恢复秩序"],
    recommendedQuestions: ["《蒙古秘史》中的神话叙事在多大程度上反映历史真实？","蒙古帝国的统治是否真正促进了欧亚和平？","草原视角如何解释帝国的快速分裂？"],
  },
  persian: {
    title: "波斯/伊斯兰视角",
    content:
      "对波斯与伊斯兰世界而言，蒙古征服是一场突如其来的浩劫。阿拉伯史学家伊本·阿西尔将蒙古人称为『自诺亚洪水以来最大的灾难』；志费尼在《世界征服者史》中既记录了布哈拉、撒马尔罕等城的毁灭，也承认蒙古统治下商旅安全、驿路畅通的新秩序。拉施特丁的《史集》则以伊尔汗国官方立场重构蒙古历史。总体而言，伊斯兰视角深刻记录了文明断裂的痛苦，也见证了蒙古统治者最终皈依伊斯兰教、融入波斯—突厥文化圈的过程。",
    sources: [
      {
        id: "mongol_empire-persp-7",
        title: "《世界征服者史》（Tarikh-i Jahangusha）",
        author: "志费尼（Ata-Malik Juvaini）",
        year: "约1260年",
        type: "official_archive",
        credibilityScore: 86,
        excerpt: "『他们来了，他们摧毁了，他们焚烧了，然后他们离去了；凡投降者获赦，凡抵抗者被屠。』",
        credibilityReason: "作者身为蒙古官员，亲历西征与巴格达陷落，能接触宫廷档案，记述详尽但需考虑其任职蒙古的立场。",
        originalUrl: "https://archive.org/details/historyoftheworl011691mbp",
      },
      {
        id: "mongol_empire-persp-8",
        title: "《全史》（al-Kamil fi al-Tarikh）",
        author: "伊本·阿西尔（Ibn al-Athir）",
        year: "约1220-1233年",
        type: "academic",
        credibilityScore: 80,
        excerpt: "『这些鞑靼人是从东方涌出的灾祸，是人类自亚当以来未曾遭遇的浩劫。』",
        credibilityReason: "同时代阿拉伯史学家的记录，情感强烈但反映了被征服者的真实感受，细节可与波斯史料互证。",
        originalUrl: "https://sourcebooks.fordham.edu/source/1220al-Athir-mongols.asp",
      },
      {
        id: "mongol_empire-persp-9",
        title: "《史集》（Jami' al-Tawarikh）",
        author: "拉施特丁（Rashid al-Din）",
        year: "1307-1311年",
        type: "official_archive",
        credibilityScore: 84,
        excerpt: "『合赞汗皈依伊斯兰，使伊尔汗国成为伊斯兰世界的守护者。』",
        credibilityReason: "伊尔汗国官方世界史，利用蒙古宫廷档案与多民族学者口述，体系宏大但服务于伊尔汗政权合法性建构。",
        originalUrl: "https://sourcebooks.fordham.edu/sbook1d.asp",
      },
    ],
    overallCredibility: 83,
    credibilityAssessment: "波斯/伊斯兰视角是理解蒙古西征破坏性最深刻的声音，其城市毁灭、人口损失与社会断裂的记载具有不可替代的价值。但该视角早期充满创伤记忆，后期又因部分蒙古统治者皈依伊斯兰而转向调和，需结合蒙古与其他区域史料综合判断。",
    biasIndicators: ["创伤叙事可能夸大屠杀规模","将蒙古人视为『上帝惩罚』带有宗教解释框架","后期史料因蒙古伊斯兰化而淡化早期冲突"],
    recommendedQuestions: ["蒙古征服对中东城市文明造成了哪些不可逆的破坏？","伊尔汗国为何最终选择皈依伊斯兰教？","波斯史料中的蒙古形象经历了怎样的转变？"],
  }
};

// ========== 宗教改革视角 ==========

export const REFORMATION_PERSPECTIVES: TopicPerspectives = {
  catholic: {
    title: "罗马天主教 / 教廷视角",
    content:
      "在天主教叙述中，宗教改革并非单纯的信仰复兴，而是对教会统一与使徒传统的破坏。教廷承认中世纪晚期存在赎罪券滥用与神职人员腐败，但坚持这些弊端可通过内部改革纠正，而无须否定教皇权威、圣礼体系与传统教义。教皇利奥十世的《斥异端诏书》与特伦托大公会议教令，将路德的‘因信称义’、否定教皇权等主张定性为异端，强调圣礼、善功与教会仲裁在救恩中的作用。耶稣会等修会的建立与反宗教改革，则被视为捍卫信仰、更新纪律并重新夺回欧洲失地的正当回应。",
    sources: [
      {
        id: "reformation-persp-1",
        title: "《斥异端诏书》（Exsurge Domine）",
        author: "教宗利奥十世",
        year: "1520",
        type: "official_archive",
        credibilityScore: 85,
        excerpt: "‘起来吧，主，判断你自己的事业……林中的野猪企图毁坏它，各样野兽要吃它。’诏书列举路德著作中41条命题，要求60日内撤回，否则施以绝罚。",
        credibilityReason: "梵蒂冈官方档案原件已由巴伐利亚州立图书馆数字化，文本真实性高，但立场为教廷自我辩护，将新教主张视为异端。",
        originalUrl: "https://www.bavarikon.de/object/bav:BSB-CMS-0000000000001567?lang=en",
      },
      {
        id: "reformation-persp-2",
        title: "《特伦托大公会议教令》",
        author: "特伦托大公会议 / 教宗保禄三世、庇护四世",
        year: "1545-1563",
        type: "official_archive",
        credibilityScore: 88,
        excerpt: "‘若有人说罪人单凭信仰而被称义……让他受绝罚。’会议以‘绝罚令’形式逐条驳斥新教教义，并确认圣礼、弥撒与炼狱等信仰。",
        credibilityReason: "特伦托大公会议教令是天主教反改教的核心官方文献，记录完整、版本众多，但编纂目的在于护教，对新教观点存在论战性简化。",
        originalUrl: "https://www.papalencyclicals.net/councils/trent/sixth-session.htm",
      },
      {
        id: "reformation-persp-3",
        title: "《天主教百科全书：宗教改革》",
        author: "New Advent 天主教百科编辑部",
        year: "1911",
        type: "academic",
        credibilityScore: 70,
        excerpt: "‘宗教改革这一伟大宗教叛乱的根源，必须远溯至十四世纪。’条目从教廷立场分析改革的政治、经济与社会根源。",
        credibilityReason: "作为教派内部的学术参考，提供天主教神学框架与历史解释，但现代史学家认为其对改革动因与路德神学存在护教倾向。",
        originalUrl: "https://www.newadvent.org/cathen/12700b.htm",
      },
    ],
    overallCredibility: 78,
    credibilityAssessment: "教廷原始档案直接表达天主教立场，文本真实性高；但其核心目的在于捍卫教皇权威与教会统一，对路德动机与新教神学存在强烈否定性诠释，需与其他视角对照阅读。",
    biasIndicators: ["护教立场","教皇权威不可质疑","将新教视为异端分裂"],
    recommendedQuestions: ["教廷如何解释赎罪券的滥用与改革需求？","特伦托会议在哪些议题上采纳了改革者的批评？","天主教反宗教改革如何重塑教会纪律与传教策略？"],
  },
  protestant: {
    title: "新教改革者 / 德意志诸侯视角",
    content:
      "在新教叙述中，宗教改革是对罗马教廷腐败与福音被遮蔽的拨乱反正。路德强调人因信称义、圣经为唯一权威以及信徒皆祭司，这些主张并非另立新教，而是回归早期教会与奥古斯丁传统。改革者批评赎罪券、教皇至上与圣礼中的商业化，认为救恩唯独出于上帝恩典与基督代赎。德意志诸侯、瑞士改革家（茨温利、加尔文）与英格兰国王出于信仰、政治与民族动机相继脱离罗马，新教教会以本地语言礼拜、可结婚的牧职与平信徒读经为特征，塑造了近代欧洲个人良心与世俗治理之间的持久张力。",
    sources: [
      {
        id: "reformation-persp-4",
        title: "《九十五条论纲》",
        author: "马丁·路德",
        year: "1517",
        type: "official_archive",
        credibilityScore: 90,
        excerpt: "‘当我们的主和大师耶稣基督说“悔改”时，他愿意信徒的一生都是悔改。’论纲以此开篇，质疑赎罪券与教皇赦罪权。",
        credibilityReason: "路德本人撰写的一手文献，由路德城维滕贝格官方网站提供原始拉丁文与英文对照，真实记录改革起点。",
        originalUrl: "https://www.luther.de/en/95thesen.html",
      },
      {
        id: "reformation-persp-5",
        title: "《奥格斯堡信条》",
        author: "腓力·梅兰希顿（代表路德宗诸侯）",
        year: "1530",
        type: "official_archive",
        credibilityScore: 88,
        excerpt: "‘我们不是靠自己的功德、行为或补赎在上帝面前获得罪赦与义，而是因基督的缘故、藉着信白白领受赦罪与义。’",
        credibilityReason: "路德宗核心认信文献，Book of Concord 提供权威英译本；文件本身是新教自我定义的重要来源，但可能美化其与古老传统的连续性。",
        originalUrl: "https://bookofconcord.org/augsburg-confession/",
      },
      {
        id: "reformation-persp-6",
        title: "《论基督徒的自由》",
        author: "马丁·路德",
        year: "1520",
        type: "official_archive",
        credibilityScore: 86,
        excerpt: "‘基督徒是万人之上完全的自由者，不受任何人管辖；基督徒又是万人之下最忠顺的仆役，服于万人。’",
        credibilityReason: "路德向教皇利奥十世呈递的神学小册子，Project Wittenberg 提供公开文本，集中表达‘因信称义’与自由伦理，但写作带有辩护与和解意图。",
        originalUrl: "https://www.projectwittenberg.org/pub/resources/text/wittenberg/luther/web/cclib-2.html",
      },
    ],
    overallCredibility: 80,
    credibilityAssessment: "改革者文献真实记录了其神学突破与政治处境，是理解新教自我认同的一手材料；但其叙述也以信仰复兴为正当化框架，对天主教传统、诸侯利益与民众暴力有所简化。",
    biasIndicators: ["因信称义中心论","反教皇情绪","神学正当化"],
    recommendedQuestions: ["路德最初是否意在分裂教会？","德意志诸侯支持宗教改革的政治与财政动机是什么？","新教各派（路德宗、加尔文宗、再洗礼派）之间的分歧如何影响改革进程？"],
  },
  international: {
    title: "国际政治与现代史家视角",
    content:
      "从国际政治与现代史学视角看，宗教改革不仅是神学分歧，更是神圣罗马帝国宪政危机、印刷革命与早期民族国家崛起的交汇。现代学者关注教派冲突如何被王朝利益、领土扩张与军事财政逻辑放大：三十年战争既是宗教战争，也是哈布斯堡霸权与法、瑞、荷等国均势之争。威斯特伐利亚和约以法律形式承认帝国邦国信仰选择，削弱普世帝国与普世教会的权威，被视为现代主权国家体系、宗教多元主义与国际法的前身。史家同时提醒，不应将宗教改革简单化为‘进步’或‘分裂’，而要理解不同行动者在信仰、权力与生存之间的复杂选择。",
    sources: [
      {
        id: "reformation-persp-7",
        title: "《威斯特伐利亚和约》",
        author: "神圣罗马帝国、法兰西王国、瑞典王国等缔约方",
        year: "1648",
        type: "official_archive",
        credibilityScore: 90,
        excerpt: "‘各方占有之地的恢复，应由皇帝与最信奉基督教的国王以及双方同盟者真诚地相互执行。’和约结束三十年战争并确立宗教安排。",
        credibilityReason: "耶鲁大学 Avalon Project 提供原始条约英译本，是国际法与欧洲史研究的基础文献；条约本身是多方谈判产物，具有法律约束力。",
        originalUrl: "https://avalon.law.yale.edu/17th_century/westphal.asp",
      },
      {
        id: "reformation-persp-8",
        title: "《Europe's Tragedy: A New History of the Thirty Years War》",
        author: "Peter H. Wilson",
        year: "2009",
        type: "academic",
        credibilityScore: 82,
        excerpt: "‘三十年战争是一场极其复杂的事件……本书试图通过与帝国宪法的共同关系，将不同因素重新联系起来。’作者强调政治、社会与经济动因。",
        credibilityReason: "当代三十年战争研究的权威著作，基于大量档案；但作为现代学术解释，受英语学界后宗教战争叙事影响，可能淡化宗教动机。",
        originalUrl: "https://www.hup.harvard.edu/books/9780674036345",
      },
      {
        id: "reformation-persp-9",
        title: "《The Reformation: A History》",
        author: "Diarmaid MacCulloch",
        year: "2003",
        type: "academic",
        credibilityScore: 84,
        excerpt: "‘宗教改革撕裂了西方世界……它颠覆了关于爱、性、死亡与超自然的观念，并塑造了现代时代。’作者从比较视角考察多宗教改革。",
        credibilityReason: "牛津大学教会史教授的获奖通史，覆盖广泛且利用多国史料；但其英语自由主义视角可能强调个人良心与现代性，对天主教世界关注相对有限。",
        originalUrl: "https://www.penguin.co.nz/books/reformation-9780141926605",
      },
    ],
    overallCredibility: 84,
    credibilityAssessment: "国际条约与当代学术著作相互印证，能够揭示宗教改革的政治与国际维度；但现代解释受后威斯特伐利亚主权观念影响，可能过度强调世俗化与国际法起源，忽视当事人的宗教体验。",
    biasIndicators: ["后见之明","主权国家中心叙事","世俗化倾向"],
    recommendedQuestions: ["三十年战争在多大程度上是宗教战争？","威斯特伐利亚和约如何改变了神圣罗马帝国皇帝与诸侯的权力关系？","宗教改革是否必然导致欧洲主权国家体系的形成？"],
  },
};

// ========== 文艺复兴视角 ==========

export const RENAISSANCE_PERSPECTIVES: TopicPerspectives = {
  italian_humanist: {
    title: "意大利人文主义视角",
    content:
      "意大利人文主义者将文艺复兴视为古典文化的复兴和人的觉醒。他们强调个人才能、现世成就和对自然与人体的理性观察。艺术家追求透视、解剖和比例的精确，赞助人通过艺术展示城市荣耀与家族权力。这一视角将文艺复兴定位为西方文明从宗教蒙昧走向理性光明的转折点。",
    sources: [
      {
        id: "ren-ih-1",
        title: "艺苑名人传（Le Vite）",
        author: "乔尔乔·瓦萨里",
        year: "1550/1568",
        type: "academic",
        credibilityScore: 84,
        excerpt: "艺术从简陋走向完美，如同人从童年步入成熟，文艺复兴使艺术重获新生。",
        credibilityReason: "瓦萨里是佛罗伦萨艺术家，其传记是研究文艺复兴艺术史的基础文献，但带有佛罗伦萨中心主义。",
        originalUrl: "https://www.gutenberg.org/files/25339/25339-h/25339-h.htm",
      },
      {
        id: "ren-ih-2",
        title: "彼特拉克《致友人书信集》",
        author: "弗朗切斯科·彼特拉克",
        year: "14世纪",
        type: "literature",
        credibilityScore: 86,
        excerpt: "我宁愿做一个有缺陷的人，也不愿做一个完美的非人。",
        credibilityReason: "彼特拉克是人文主义之父，其书信体现早期人文主义对个人尊严的重视。",
        originalUrl: "https://www.gutenberg.org/ebooks/author/894",
      },
    ],
    overallCredibility: 84,
    credibilityAssessment: "意大利人文主义视角是文艺复兴的自我理解，充满创造性但可能过于理想化，忽视社会经济和宗教背景。",
    biasIndicators: ["佛罗伦萨中心主义","过度强调个人天才","对中世纪持贬低态度"],
    recommendedQuestions: ["人文主义如何重新定义人的价值？","美第奇家族的赞助对艺术发展有何影响？","文艺复兴艺术中的古典元素有何政治含义？"],
  },
  northern_renaissance: {
    title: "北方文艺复兴视角",
    content:
      "北方文艺复兴在吸收意大利人文主义的同时，更强调宗教虔诚、社会批判和大众传播。伊拉斯谟通过《愚人颂》讽刺教会弊端，丢勒以版画将宗教主题带给普通民众，勃鲁盖尔描绘农民生活。北方视角认为文艺复兴不仅是艺术革新，也是基督教人文主义和宗教改革的温床。",
    sources: [
      {
        id: "ren-nr-1",
        title: "愚人颂（In Praise of Folly）",
        author: "德西德里乌斯·伊拉斯谟",
        year: "1511",
        type: "literature",
        credibilityScore: 87,
        excerpt: "愚人以戏谑揭示人世虚荣与教会腐败，呼唤回归真正的基督教精神。",
        credibilityReason: "伊拉斯谟是北方人文主义代表，其讽刺作品影响宗教改革思潮。",
        originalUrl: "https://www.gutenberg.org/files/30201/30201-h/30201-h.htm",
      },
      {
        id: "ren-nr-2",
        title: "丢勒版画与书信",
        author: "阿尔布雷希特·丢勒",
        year: "1494-1528",
        type: "literature",
        credibilityScore: 86,
        excerpt: "我从意大利学到了透视和比例，但北方的精细与宗教情感是我的根基。",
        credibilityReason: "丢勒是北方文艺复兴艺术大师，其版画和日记是重要史料。",
        originalUrl: "https://www.metmuseum.org/art/collection/search/336228",
      },
    ],
    overallCredibility: 86,
    credibilityAssessment: "北方文艺复兴视角补充了意大利中心叙事的不足，强调宗教改革和社会维度，但可能低估意大利在艺术技法上的开创性。",
    biasIndicators: ["强调宗教改革渊源","对意大利世俗化倾向的批评","北方艺术家自我定位"],
    recommendedQuestions: ["北方文艺复兴与意大利文艺复兴有何不同？","伊拉斯谟的人文主义如何影响宗教改革？","印刷术如何推动北方文艺复兴？"],
  },
  modern_historian: {
    title: "现代史学研究视角",
    content:
      "现代史学研究超越了传统的'复兴'叙事，强调文艺复兴是社会、经济、政治多重因素共同作用的结果。学者们关注城市商业资本主义、赞助网络、性别与阶级、以及与奥斯曼帝国和伊斯兰世界的文化交流。近年来，'全球文艺复兴'概念挑战了欧洲中心主义，将文艺复兴置于欧亚交流的大背景下考察。",
    sources: [
      {
        id: "ren-mh-1",
        title: "The Civilization of the Renaissance in Italy",
        author: "雅各布·布克哈特",
        year: "1860",
        type: "academic",
        credibilityScore: 82,
        excerpt: "文艺复兴标志着近代欧洲精神的诞生，个人主义和国家理性由此兴起。",
        credibilityReason: "布克哈特的经典定义塑造了现代对文艺复兴的理解，但后来的学者对其欧洲中心论有所修正。",
        originalUrl: "https://www.gutenberg.org/files/2074/2074-h/2074-h.htm",
      },
      {
        id: "ren-mh-2",
        title: "Renaissance Self-Fashioning",
        author: "Stephen Greenblatt",
        year: "1980",
        type: "academic",
        credibilityScore: 88,
        excerpt: "文艺复兴时期的人物通过语言、服饰和行为主动塑造自我身份。",
        credibilityReason: "新历史主义代表作，从文化和社会角度重新解读文艺复兴文本。",
        originalUrl: "https://www.press.uchicago.edu/ucp/books/book/chicago/R/bo5985695.html",
      },
    ],
    overallCredibility: 86,
    credibilityAssessment: "现代史学视角丰富多元，既承认文艺复兴的创新意义，也批判其精英主义、欧洲中心主义和性别偏见，提供了更平衡的历史理解。",
    biasIndicators: ["后现代理论可能过度解构","不同学派之间存在方法论分歧","可能低估思想创新的连续性"],
    recommendedQuestions: ["布克哈特的文艺复兴观是否仍然成立？","文艺复兴是否真正是'中世纪的断裂'？","全球史视角如何重新理解文艺复兴？"],
  },
};

// ========== 罗马帝国的兴衰视角 ==========

export const ROMAN_EMPIRE_PERSPECTIVES: TopicPerspectives = {
  roman: {
    title: "罗马/帝国视角",
    content:
      "罗马视角强调文明使命、法律秩序与军事荣耀。从奥古斯都《功德录》到塔西佗、卡西乌斯·狄奥等史家，帝国自我叙述将罗马的扩张描绘为带来和平（Pax Romana）、道路、法律与都市文明的进程。晚期帝国史家如阿米安则关注边防压力、宫廷阴谋与基督教化带来的社会张力，但仍以罗马公民身份与帝国统一作为价值核心。",
    sources: [
      {
        id: "roman_empire-persp-1",
        title: "Res Gestae Divi Augusti（《神圣奥古斯都功德录》）",
        author: "奥古斯都（刻于安卡拉奥古斯都神庙）",
        year: "约公元14年",
        type: "official_archive",
        credibilityScore: 88,
        excerpt: "我将全世界置于罗马人民的统治之下；我多次领导海陆远征，作为胜利者饶恕那些祈求宽恕的公民。",
        credibilityReason: "奥古斯都亲自审定的官方铭文，是研究元首制起源的一手材料，但具有明显的自我颂扬色彩。",
        originalUrl: "https://digitalankyra.com/en/res-gestae-divi-augusti-eng/",
      },
      {
        id: "roman_empire-persp-2",
        title: "Annals（《编年史》）",
        author: "塔西佗",
        year: "约115-120年",
        type: "academic",
        credibilityScore: 85,
        excerpt: "他们制造了一片荒漠，却称之为和平。",
        credibilityReason: "罗马最杰出的史家之一，批判性地记录了帝制早期政治，但受元老院精英立场影响。",
        originalUrl: "http://classics.mit.edu/Tacitus/annals.html",
      },
      {
        id: "roman_empire-persp-3",
        title: "Roman History（《罗马史》）",
        author: "卡西乌斯·狄奥",
        year: "约200-222年",
        type: "academic",
        credibilityScore: 82,
        excerpt: "奥古斯都建立了一种既非绝对君主制、亦非传统共和制的政体。",
        credibilityReason: "希腊裔元老兼执政官撰写的通史，提供了帝国早期至3世纪初的连续叙述，但部分依赖二手资料。",
        originalUrl: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/home.html",
      },
    ],
    overallCredibility: 85,
    credibilityAssessment: "罗马视角拥有最丰富的一手文献与连续编年，对政治制度、军事战役与法律实践的记载较为可靠。但其叙事倾向于美化帝国扩张，将蛮族描绘为文明威胁，并对皇帝个人进行道德化评判。",
    biasIndicators: ["以罗马—蛮族二元对立解释边疆冲突","强调皇帝个人德行而忽视结构性因素","对帝国扩张的破坏性后果关注不足"],
    recommendedQuestions: ["罗马视角如何塑造了我们今天对“文明”与“野蛮”的理解？","元首制是共和的延续还是君主制的伪装？","帝国扩张给被征服地区带来了哪些代价？"],
  },
  barbarian: {
    title: "蛮族/外部视角",
    content:
      "蛮族视角并非单一声音，而是哥特人、汪达尔人、法兰克人、匈人等各部落在迁徙、结盟与冲突中形成的复杂叙事。约达尼斯的《哥特史》保留了哥特口头传统中对罗马既畏惧又利用的双重态度：蛮族既寻求罗马土地、财富与军事佣金，又在罗马内战中被当作雇佣兵与政治筹码。这一视角提醒我们，所谓“蛮族入侵”往往是罗马自身边疆政策、财政危机与权力斗争的产物。",
    sources: [
      {
        id: "roman_empire-persp-4",
        title: "Getica（《哥特史》）",
        author: "约达尼斯",
        year: "约551年",
        type: "memoir",
        credibilityScore: 72,
        excerpt: "哥特人出于对更美好土地的渴望，离开故土斯堪的扎，乘船驶向黑海之滨。",
        credibilityReason: "保存了哥特人口述传统与 Cassiodorus 已佚著作的片段，但成书于东罗马帝国，带有拜占庭政治目的与神话化色彩。",
        originalUrl: "https://topostext.org/work/744",
      },
      {
        id: "roman_empire-persp-5",
        title: "Res Gestae（《罗马史》残篇）",
        author: "阿米安·马尔凯利努斯",
        year: "约391年",
        type: "academic",
        credibilityScore: 86,
        excerpt: "哥特人像洪流一样涌入色雷斯，烧杀抢掠，因为他们既无武器也无食粮。",
        credibilityReason: "亲历帝国晚期军政的史家，对4世纪蛮族迁徙与阿德里安堡战役有详细记载，但本质上仍是罗马精英视角。",
        originalUrl: "http://mountainman.com.au/essenes/res_gestae_00.htm",
      },
    ],
    overallCredibility: 76,
    credibilityAssessment: "蛮族视角依赖罗马—拜占庭史家的转述与后期口头传统，直接的一手文献极少。其价值在于揭示罗马边疆政策的连锁反应，但容易将迁徙浪漫化或将冲突简化为民族对抗。",
    biasIndicators: ["将蛮族迁徙描述为单一民族的统一意志","忽视罗马招引、分化蛮族的政策责任","后期文本（如《哥特史》）混合神话与历史"],
    recommendedQuestions: ["匈人压力是蛮族迁徙的唯一原因吗？","罗马的 foederati 政策如何改变了蛮族与帝国的关系？","约达尼斯的《哥特史》在多大程度上反映了哥特人自己的记忆？"],
  },
  modern_historian: {
    title: "现代史家视角",
    content:
      "现代史家不再将罗马衰落归结为单一原因，而是从气候变迁、瘟疫、财政危机、军队蛮族化、政治合法性削弱与制度弹性等多维度进行分析。吉本强调基督教与野蛮入侵的腐蚀作用；当代学者如彼得·希瑟、凯尔·哈珀则通过冰芯、树木年轮与流行病学证据，指出4-5世纪的气候恶化与瘟疫对帝国税收、兵源与边疆稳定的系统性冲击。玛丽·比尔德等学者则提醒我们，所谓“罗马衰落”是一个漫长且不均衡的过程，东部帝国以拜占庭形式延续了近千年。",
    sources: [
      {
        id: "roman_empire-persp-6",
        title: "The History of the Decline and Fall of the Roman Empire（《罗马帝国衰亡史》）",
        author: "爱德华·吉本",
        year: "1776-1788年",
        type: "academic",
        credibilityScore: 80,
        excerpt: "罗马的衰落是无止境的暴政与征伐的自然而不可避免的结果。",
        credibilityReason: "启蒙时代史学巨著，史料宏富、文笔精湛，奠定了现代罗马衰亡研究的问题意识，但带有反基督教与欧洲中心偏见。",
        originalUrl: "https://archive.sacred-texts.com/cla/gibbon/index.htm",
      },
      {
        id: "roman_empire-persp-7",
        title: "SPQR: A History of Ancient Rome",
        author: "玛丽·比尔德",
        year: "2015年",
        type: "academic",
        credibilityScore: 84,
        excerpt: "罗马的成功不在于其种族优越性，而在于它能够将失败者转化为某种意义上的罗马人。",
        credibilityReason: "当代著名古典学家作品，强调罗马身份认同的包容性建构，但侧重于共和国与早期帝国，对晚期论述相对简略。",
      },
      {
        id: "roman_empire-persp-8",
        title: "The Fall of the Roman Empire: A New History of Rome and the Barbarians",
        author: "彼得·希瑟",
        year: "2005年",
        type: "academic",
        credibilityScore: 86,
        excerpt: "西罗马的灭亡并非由于内部腐朽，而是因为它无法再承受来自匈人推动的蛮族联盟压力。",
        credibilityReason: "综合考古、文献与比较研究，系统论证外部压力与帝国制度互动，但部分观点仍存学术争议。",
        originalUrl: "https://global.oup.com/academic/product/the-fall-of-the-roman-empire-9780195159547",
      },
    ],
    overallCredibility: 84,
    credibilityAssessment: "现代史家视角利用跨学科证据，避免单一因果解释，对结构性因素的分析最为深入。但不同学派（如“灾难派”与“转型派”）对衰落速度、基督教角色与蛮族责任仍有显著分歧。",
    biasIndicators: ["部分研究过度强调气候/疾病等外部因素","吉本传统对基督教与东方文明持负面预设","“衰落”叙事可能忽视东部帝国的延续性"],
    recommendedQuestions: ["西罗马灭亡更应归因于外部入侵还是内部制度失灵？","基督教化削弱了还是强化了晚期罗马国家？","将476年作为“灭亡”年份是否掩盖了历史的连续性？"],
  },
};

// ========== 俄国十月革命视角 ==========

export const RUSSIAN_REVOLUTION_PERSPECTIVES: TopicPerspectives = {
  bolshevik: {
    title: "布尔什维克/苏维埃视角",
    content:
      "该视角将1917年视为俄国工人、士兵和农民在帝国主义战争与沙皇专制双重压迫下走向社会主义革命的必然过程。二月革命推翻沙皇后，资产阶级临时政府无力解决和平、土地与面包问题；列宁的《四月提纲》为布尔什维克指明方向，十月起义是苏维埃意志的实现。新政权通过《和平法令》《土地法令》回应人民诉求，虽遭遇内战与外国干涉，但捍卫了工农国家。",
    sources: [
      {
        id: "russian_revolution-persp-1",
        title: "《四月提纲》",
        author: "V.I. Lenin",
        year: "1917",
        type: "official_archive",
        credibilityScore: 85,
        excerpt: "不给临时政府任何支持；一切权力归苏维埃；没收地主土地；银行国有化；停止帝国主义战争；建立共产国际。",
        credibilityReason: "原始政治纲领，直接体现布尔什维克策略与意识形态，但带有明确的党派目标与动员意图。",
        originalUrl: "https://www.marxists.org/archive/lenin/works/1917/apr/04.htm",
      },
      {
        id: "russian_revolution-persp-2",
        title: "《俄国革命史》",
        author: "Leon Trotsky",
        year: "1930",
        type: "academic",
        credibilityScore: 80,
        excerpt: "十月起义并非阴谋，而是群众运动与先锋党结合的产物；苏维埃权力的建立是历史必然性的体现。",
        credibilityReason: "亲历者撰写的马克思主义史学经典，史料丰富但带有辩护性目的。",
        originalUrl: "https://www.marxists.org/archive/trotsky/1930/hrr/index.htm",
      },
      {
        id: "russian_revolution-persp-3",
        title: "《和平法令》",
        author: "V.I. Lenin",
        year: "1917",
        type: "official_archive",
        credibilityScore: 85,
        excerpt: "工农政府提议立即缔结不割地不赔款的民主和平，并废除秘密外交。",
        credibilityReason: "苏维埃政权首份外交文件，公开透明但亦服务于反战动员与革命宣传。",
        originalUrl: "https://www.marxists.org/archive/lenin/works/1917/oct/25-26/26b.htm",
      },
    ],
    overallCredibility: 80,
    credibilityAssessment: "该视角掌握大量一手文件与当事人记录，能准确反映布尔什维克政治逻辑；但作为革命自我合法化的叙述，常将复杂社会运动简化为党的领导和历史必然，对暴力与压制有选择性淡化。",
    biasIndicators: ["历史目的论","阶级简化论","将反对派污名化为反革命"],
    recommendedQuestions: ["十月革命在多大程度上是群众自发行动而非党派政变？","苏维埃政权初期的镇压是否与其宣扬的民主目标矛盾？"],
  },
  anti_bolshevik: {
    title: "反布尔什维克/临时政府与白军视角",
    content:
      "该视角认为1917年十月是少数激进分子利用战争混乱发动的政变，背离了二月革命确立的宪政民主方向。临时政府虽举步维艰，但试图通过立宪会议实现自由选举与法治；布尔什维克以“和平、土地、面包”口号煽动群众，掌权后解散立宪会议、签订屈辱和约，并建立一党专政。白军与立宪民主党、社会革命党等反对力量视自身为“真正的俄国”，捍卫国家统一与文明秩序。",
    sources: [
      {
        id: "russian_revolution-persp-4",
        title: "《俄国民主反对布尔什维克暴政的斗争》",
        author: "Vladimir I. Lebedev",
        year: "1919",
        type: "official_archive",
        credibilityScore: 72,
        excerpt: "绝大多数俄国人并不支持布尔什维克；布列斯特-立陶夫斯克和约使俄国蒙受屈辱与毁灭。",
        credibilityReason: "临时政府前海军部秘书的亲历控诉，反映反对派立场，但带有强烈的政治宣传目的。",
        originalUrl: "https://www.loc.gov/item/19018179/",
      },
      {
        id: "russian_revolution-persp-5",
        title: "《俄国革命：个人记录》",
        author: "Nikolai Sukhanov",
        year: "1919",
        type: "memoir",
        credibilityScore: 76,
        excerpt: "布尔什维克夺权不是无产阶级革命的胜利，而是精心策划的少数派政变，苏维埃随后成为党的工具。",
        credibilityReason: "孟什维克同情者的近距离观察，细节珍贵；作者的政治立场使其对列宁和托洛茨基持批判态度。",
      },
    ],
    overallCredibility: 74,
    credibilityAssessment: "反布尔什维克资料提供了政权合法性、民主程序和国家利益层面的重要批评；但这些材料多写于流亡或战败情境，常把二月革命理想化，对临时政府的失误估计不足，也存在将布尔什维克简单等同于德国代理人的倾向。",
    biasIndicators: ["宪政主义理想化","将革命视为外部阴谋","忽视社会革命诉求"],
    recommendedQuestions: ["临时政府若继续执政能否稳定俄国局势？","反布尔什维克阵营在民族自决与社会改革上提出了哪些替代方案？"],
  },
  western_international: {
    title: "西方/国际观察视角",
    content:
      "该视角主要关注俄国革命对一战格局、国际共产主义运动及西方民主社会的冲击。西方外交官和记者既惊叹于旧帝国的迅速崩溃，也对布尔什维克的激进社会实验充满警惕。美国记者约翰·里德以亲历者身份记录了十月革命的激情；而西方政府档案则显示，协约国更担忧俄国退出大战、德国东线压力缓解以及革命思想向西扩散。整体而言，西方立场在同情劳工诉求与防范“红色威胁”之间摇摆。",
    sources: [
      {
        id: "russian_revolution-persp-6",
        title: "《震撼世界的十天》",
        author: "John Reed",
        year: "1919",
        type: "media",
        credibilityScore: 78,
        excerpt: "我们亲眼看着一个旧世界在十天里崩塌；彼得格勒的工人、士兵和水兵用行动宣告了新秩序的诞生。",
        credibilityReason: "亲历十月革命的美国记者报道，现场感极强；但作者同情布尔什维克，叙述带有理想化色彩。",
        originalUrl: "https://archive.org/details/tendaysthatshoo00reedgoog/page/n44",
      },
      {
        id: "russian_revolution-persp-7",
        title: "《美国对外关系文件：1918年，俄国，第一卷》",
        author: "美国国务院",
        year: "1931",
        type: "official_archive",
        credibilityScore: 82,
        excerpt: "驻俄外交官报告：布尔什维克政权依赖赤卫队与宣传维持，俄国退出战争将严重削弱东线协约国军力。",
        credibilityReason: "官方外交档案，信息渠道独立；但受战时情报局限与意识形态对立影响，评估偏重战略与安全。",
        originalUrl: "http://digicoll.library.wisc.edu/cgi-bin/FRUS/FRUS-idx?type=browse&scope=FRUS",
      },
    ],
    overallCredibility: 79,
    credibilityAssessment: "西方观察资料长于将俄国革命置于国际格局中考察，提供了非俄国本土的独立判断；但常以外交利益和安全焦虑过滤信息，对俄国社会内部动力理解有限。",
    biasIndicators: ["冷战前意识形态对抗","以西方民主标准评判","战略利益优先"],
    recommendedQuestions: ["西方对布尔什维克的敌意在多大程度上源于战争利益而非价值观冲突？","国际报道如何塑造了全球对十月革命的最初印象？"],
  },
};

// ========== 跨大西洋奴隶贸易与废奴运动视角 ==========

export const SLAVE_TRADE_PERSPECTIVES: TopicPerspectives = {
  enslaved_africans: {
    title: "被奴役非洲人视角",
    content:
      "被奴役非洲人的视角强调抓捕、中段航程和种植园劳动的极端暴力与痛苦。这一视角通过奴隶叙事、口述传统和反抗行动得以保存。被奴役者并非被动受害者，他们通过逃亡、起义、文化保留和家庭重组维持尊严。奥拉达·艾奎亚诺等前奴隶的自传成为废奴运动的重要武器。",
    sources: [
      {
        id: "slt-ea-1",
        title: "奥拉达·艾奎亚诺生平",
        author: "奥拉达·艾奎亚诺（Olaudah Equiano）",
        year: "1789",
        type: "memoir",
        credibilityScore: 90,
        excerpt: "我被带到甲板上，看到大海和船只，惊恐万分，以为自己会被 eaten by 这些白人。",
        credibilityReason: "艾奎亚诺是亲历中段航程的前奴隶，其自传是废奴运动最具影响力的第一手文献之一。",
        originalUrl: "https://www.gutenberg.org/files/15399/15399-h/15399-h.htm",
      },
      {
        id: "slt-ea-2",
        title: "种植园奴隶口述史",
        author: "美国 WPA 联邦作家计划",
        year: "1936-1938",
        type: "memoir",
        credibilityScore: 85,
        excerpt: "他们鞭打我们，卖掉我们的孩子，但我们 still 记得非洲的歌和名字。",
        credibilityReason: "20世纪对大萧条时期前奴隶的访谈记录，保留了被奴役者的声音和记忆。",
        originalUrl: "https://www.loc.gov/collections/slave-narratives-from-the-federal-writers-project-1936-to-1938/",
      },
    ],
    overallCredibility: 87,
    credibilityAssessment: "被奴役者视角具有无可替代的真实性和情感力量，但部分叙述在多年后回忆时可能受时间和访谈情境影响。",
    biasIndicators: ["情感创伤可能导致记忆选择","为废奴目的可能强调苦难","口述记录经过采访者转述"],
    recommendedQuestions: ["被奴役者如何保持文化和身份认同？","中段航程对幸存者的长期心理影响是什么？","女性奴隶面临哪些特殊暴力？"],
  },
  european_traders: {
    title: "欧洲奴隶贸易商视角",
    content:
      "欧洲奴隶贸易商和种植园主将奴隶贸易视为合法商业活动，常以经济理性化和种族主义理论为其辩护。他们认为非洲奴隶制已存在，自己只是提供市场；并将非洲人贬低为'未开化'，以减轻道德负担。这一视角在18世纪议会辩论、商业账簿和殖民法律中大量体现。",
    sources: [
      {
        id: "slt-et-1",
        title: "利物浦奴隶贸易商人账簿",
        author: "英国商人记录",
        year: "18世纪",
        type: "official_archive",
        credibilityScore: 82,
        excerpt: "本次航程运载450名奴隶，在牙买加售出，扣除成本后获利约8000英镑。",
        credibilityReason: "商业记录客观反映奴隶贸易的经济动机，但将人完全商品化。",
        originalUrl: "https://www.nationalarchives.gov.uk/",
      },
      {
        id: "slt-et-2",
        title: "英国议会为奴隶贸易辩护的演讲",
        author: "利物浦议员 Banastre Tarleton 等",
        year: "1790s",
        type: "official_archive",
        credibilityScore: 75,
        excerpt: "骤然废除奴隶贸易将毁灭利物浦和西印度群岛的经济，并导致非洲更加野蛮。",
        credibilityReason: "反映当时既得利益者的经济和种族主义论点，但道德辩护明显薄弱。",
        originalUrl: "https://hansard.parliament.uk/",
      },
    ],
    overallCredibility: 78,
    credibilityAssessment: "欧洲贸易商视角提供了奴隶贸易运作机制的经济细节，但其道德框架已被现代价值观彻底否定，需要批判性阅读。",
    biasIndicators: ["将人商品化","种族主义话语","经济利益驱动道德合理化"],
    recommendedQuestions: ["经济利益如何使奴隶贸易延续数百年？","欧洲人是如何用种族主义为其辩护的？","奴隶贸易对欧洲工业革命起了多大作用？"],
  },
  abolitionist: {
    title: "废奴主义者视角",
    content:
      "废奴主义者从人道主义、宗教平等和自然权利角度强烈谴责奴隶贸易。他们认为奴隶制违背基督教精神和启蒙思想，通过请愿、演讲、抵制奴隶制产品和帮助逃亡奴隶等方式推动废除。废奴运动是现代国际人权运动的先声，但也存在将非洲人'受害者化'、忽视非洲主体性的局限。",
    sources: [
      {
        id: "slt-ab-1",
        title: "奴隶贸易之罪恶",
        author: "托马斯·克拉克森（Thomas Clarkson）",
        year: "1786",
        type: "literature",
        credibilityScore: 86,
        excerpt: "奴隶贸易是违反人性、违反宗教、违反一切自然法则的滔天罪行。",
        credibilityReason: "克拉克森是废奴运动核心人物，其调查和小册子对英国废奴立法影响巨大。",
        originalUrl: "https://www.brycchancarey.com/abolition/clarkson.htm",
      },
      {
        id: "slt-ab-2",
        title: "英国议会废奴辩论记录",
        author: "英国议会",
        year: "1807",
        type: "official_archive",
        credibilityScore: 88,
        excerpt: "威尔伯福斯：奴隶贸易的每一环节都浸透着鲜血，英国绝不能继续从中获利。",
        credibilityReason: "议会辩论记录是研究废奴运动政治过程的第一手资料。",
        originalUrl: "https://hansard.parliament.uk/",
      },
    ],
    overallCredibility: 86,
    credibilityAssessment: "废奴主义者视角在人道主义上具有崇高价值，推动重大社会进步，但有时过于聚焦欧洲白人的道德觉醒，而低估被奴役者自身的反抗作用。",
    biasIndicators: ["强调欧洲人道主义","可能忽视非洲主动反抗","部分叙述带有传教色彩"],
    recommendedQuestions: ["废奴运动如何在英国议会中取得胜利？","被奴役者的自传给废奴运动带来了什么？","废奴后种族不平等为何仍然延续？"],
  },
};

// ========== 第二次世界大战视角 ==========

export const WW2_PERSPECTIVES: TopicPerspectives = {
  axis: {
    title: "轴心国视角",
    content:
      "轴心国视角以纳粹德国、法西斯意大利与军国主义日本为核心，将战争阐释为打破凡尔赛—华盛顿体系、争取民族生存空间与反制共产主义的正义斗争。德国官方叙事强调《凡尔赛条约》的不公、德意志民族的统一诉求以及对布尔什维克扩张的预防性战争；日本则宣传“大东亚共荣圈”，主张将亚洲从欧美殖民统治中“解放”出来。这一视角大量依赖宣传、意识形态文件与军事命令，具有明显的种族主义与扩张主义色彩，战后经过纽伦堡与东京审判已被国际社会普遍否定。",
    sources: [
      {
        id: "ww2-persp-1",
        title: "《苏德互不侵犯条约》",
        author: "德国外交部 / 苏联外交部",
        year: "1939",
        type: "official_archive",
        credibilityScore: 85,
        excerpt: "第一条：缔约双方保证决不单独或联合他国彼此间进行任何武力行为、任何侵略行为或任何攻击。",
        credibilityReason: "为公开签署的国际条约文本，原件保存于多国档案，内容可核，但附有秘密议定书需结合后续披露文件理解。",
        originalUrl: "https://avalon.law.yale.edu/20th_century/nonagres.asp",
      },
      {
        id: "ww2-persp-2",
        title: "希特勒1939年1月30日国会演说",
        author: "阿道夫·希特勒",
        year: "1939",
        type: "official_archive",
        credibilityScore: 70,
        excerpt: "今天我再次成为先知：如果国际犹太金融家再次将各民族拖入世界大战，结果不会是地球的布尔什维克化，而是犹太种族在欧洲的灭亡。",
        credibilityReason: "演说原文被多方记录并用于纽伦堡审判，但引用时需警惕其宣传性质与种族主义修辞，不能视为客观事实陈述。",
        originalUrl: "https://avalon.law.yale.edu/imt/chap_12.asp",
      },
      {
        id: "ww2-persp-3",
        title: "《大东亚共同宣言》",
        author: "日本内阁与大东亚会议",
        year: "1943",
        type: "official_archive",
        credibilityScore: 60,
        excerpt: "大东亚各国应相互尊重自主独立，提携合作，确立大东亚之亲和，建设共存共荣之秩序。",
        credibilityReason: "文件本身真实，但所谓“共荣”与实际殖民统治、战争暴行严重不符，具有强烈意识形态包装色彩。",
        originalUrl: "https://avalon.law.yale.edu/wwii/greater_east_asia.asp",
      },
    ],
    overallCredibility: 65,
    credibilityAssessment: "轴心国官方文件与演说的史料价值在于揭示战争动机与意识形态，但其叙述充满种族主义、扩张主义与宣传包装。战后审判与多国档案的交叉验证显示，其“自卫”“解放”等说辞与史实严重不符，整体可信度较低，需高度批判使用。",
    biasIndicators: ["种族优越论","扩张主义正当化","将侵略包装为自卫","反共产主义意识形态"],
    recommendedQuestions: ["轴心国如何为其扩张政策辩护？","宣传叙事与实际行动之间存在哪些矛盾？"],
  },
  allied: {
    title: "西方同盟国视角",
    content:
      "西方同盟国视角以英国、美国及自由法国为代表，将二战描绘为捍卫民主、自由与国际法秩序、对抗法西斯暴政的正义战争。丘吉尔的“鲜血、辛劳、眼泪与汗水”演说、罗斯福的“国耻日”演说以及《大西洋宪章》共同构成了这一叙事的核心文本。该视角强调绥靖政策的失败、大西洋宪章的普世原则、诺曼底登陆开辟第二战场的决定性作用，以及战后通过联合国与国际法维护和平的努力。然而，这一视角也常淡化或回避殖民帝国、种族隔离及战略轰炸等争议议题。",
    sources: [
      {
        id: "ww2-persp-4",
        title: "《大西洋宪章》",
        author: "富兰克林·罗斯福 / 温斯顿·丘吉尔",
        year: "1941",
        type: "official_archive",
        credibilityScore: 88,
        excerpt: "在纳粹暴政被最终消灭之后，两国希望见到建立一种和平，使所有国家都能在它们自己的疆界内安居乐业。",
        credibilityReason: "为英美两国首脑联合发表的公开文件，文本明确，对理解同盟国战争目标与战后秩序构想具有高度权威性。",
        originalUrl: "https://avalon.law.yale.edu/wwii/atlantic.asp",
      },
      {
        id: "ww2-persp-5",
        title: "丘吉尔《鲜血、辛劳、眼泪与汗水》演说",
        author: "温斯顿·丘吉尔",
        year: "1940",
        type: "official_archive",
        credibilityScore: 82,
        excerpt: "我所能奉献的唯有热血、辛劳、眼泪和汗水……我们的目标就是胜利——不惜一切代价的胜利。",
        credibilityReason: "演说文本经英国议会记录保存，广泛流传，是理解英国战时决心与领袖修辞的重要一手材料，但带有鼓舞士气的宣传功能。",
        originalUrl: "https://sourcebooks.web.fordham.edu/mod/churchill-blood.asp",
      },
      {
        id: "ww2-persp-6",
        title: "罗斯福《国耻日》演说",
        author: "富兰克林·罗斯福",
        year: "1941",
        type: "official_archive",
        credibilityScore: 86,
        excerpt: "1941年12月7日——一个将永远蒙受耻辱的日子——美利坚合众国遭到日本帝国海军和空军突然的蓄意攻击。",
        credibilityReason: "为美国总统国会演说官方记录，文本稳定，是理解美国参战动因的关键文献。",
        originalUrl: "https://avalon.law.yale.edu/20th_century/dec71941.asp",
      },
    ],
    overallCredibility: 82,
    credibilityAssessment: "西方同盟国视角依托大量公开的政府文件、演说与议会记录，史料丰富且相对透明。但其叙述倾向于理想化民主战争目标，对殖民主义、种族问题及战时争议的呈现不够充分，需结合其他视角批判阅读。",
    biasIndicators: ["理想化民主目标","淡化殖民矛盾","强调西方战场作用","对战略轰炸等问题轻描淡写"],
    recommendedQuestions: ["《大西洋宪章》的普世原则是否适用于殖民地人民？","西方视角如何评价苏联在东线的贡献？"],
  },
  soviet: {
    title: "苏联视角",
    content:
      "苏联视角将战争称为“伟大的卫国战争”，强调苏联人民在共产党和斯大林领导下抗击法西斯侵略的牺牲与胜利。该视角突出巴巴罗萨初期的惨重损失、莫斯科保卫战、斯大林格勒转折、库尔斯克会战及最终攻克柏林的决定性作用。苏联叙事把战争描绘为社会主义祖国保卫全人类的正义战争，同时强调第二战场开辟过晚、西方盟国援助有限。战后，这一视角成为苏联及今日俄罗斯国家记忆的核心，但也因忽视苏德条约、卡廷事件及战后东欧控制等问题而受到批评。",
    sources: [
      {
        id: "ww2-persp-7",
        title: "莫洛托夫1941年6月22日广播讲话",
        author: "维亚切斯拉夫·莫洛托夫",
        year: "1941",
        type: "official_archive",
        credibilityScore: 78,
        excerpt: "我们的事业是正义的。敌人必将被粉碎。胜利将属于我们！",
        credibilityReason: "讲话于战争爆发当日由苏联官方广播，广泛见报，是苏联进入战争状态的标志性文献，但对德国突然袭击的责任归因有自我辩护成分。",
        originalUrl: "https://sourcebooks.fordham.edu/mod/1941molotov.asp",
      },
      {
        id: "ww2-persp-8",
        title: "斯大林1941年7月3日广播讲话",
        author: "约瑟夫·斯大林",
        year: "1941",
        type: "official_archive",
        credibilityScore: 75,
        excerpt: "同志们！公民们！兄弟姐妹们！我们的陆海军战士们！我向你们讲话，我的朋友们！",
        credibilityReason: "斯大林以罕见亲切口吻号召全民抗战，讲话文本保存完整，对研究苏联战时动员具有重要价值，但包含对党国体制的维护性表述。",
        originalUrl: "https://www.marxists.org/reference/archive/stalin/works/1941/07/03.htm",
      },
      {
        id: "ww2-persp-9",
        title: "《苏联伟大卫国战争史》",
        author: "苏联国防部战史研究所",
        year: "1960",
        type: "academic",
        credibilityScore: 70,
        excerpt: "苏联人民及其武装力量在共产党领导下，肩负起解放欧洲各国人民免于法西斯奴役的历史使命。",
        credibilityReason: "为苏联官方战史巨著，史料基础雄厚但带有明显意识形态框架，若干数据与判断已被后冷战研究修正。",
        originalUrl: "https://imwerden.de/pdf/istoriya_velikoy_otechestvennoy_voyny_tom_1.pdf",
      },
    ],
    overallCredibility: 74,
    credibilityAssessment: "苏联视角提供了关于东线战场规模、动员机制与战争代价的不可替代资料，但在战争起因、苏德条约责任、卡廷事件及战后扩张等问题上存在明显回避与辩护。结合德方记录与西方解密档案交叉验证，可提高叙述可靠性。",
    biasIndicators: ["强调单方牺牲","回避1939年苏德合作","将战后控制正当化","意识形态化英雄叙事"],
    recommendedQuestions: ["苏联视角如何解释1939年《苏德互不侵犯条约》？","苏联在战争中的实际损失与官方统计有何差异？"],
  },
};

// ========== 中国视角补充 ==========

type HistoricalTopicId =
  | "meiji"
  | "french_revolution"
  | "cold_war"
  | "american_revolution"
  | "industrial_revolution"
  | "ww1"
  | "age_of_exploration"
  | "american_civil_war"
  | "black_death"
  | "cuban_missile_crisis"
  | "decolonization"
  | "korean_war"
  | "mongol_empire"
  | "reformation"
  | "renaissance"
  | "roman_empire"
  | "russian_revolution"
  | "slave_trade"
  | "ww2";

const TOPIC_AUXILIARY_SOURCES: Record<HistoricalTopicId, SourceReference[]> = {
  meiji: [
    {
      id: "aux-meiji-shimonoseki",
      title: "《马关条约》英文全本",
      author: "USC US-China Institute",
      year: "1895",
      type: "official_archive",
      credibilityScore: 90,
      excerpt: "条约文本呈现甲午战后日本扩张与清政府割地赔款的直接外交结果。",
      credibilityReason: "一手条约文本可校验明治维新后日本对外扩张与东亚秩序变化的关键节点。",
      originalUrl: "https://china.usc.edu/treaty-shimonoseki-1895",
    },
  ],
  french_revolution: [
    {
      id: "aux-french-1791-constitution",
      title: "1791年法国宪法文本",
      author: "Fordham Internet History Sourcebooks",
      year: "1791",
      type: "official_archive",
      credibilityScore: 88,
      excerpt: "1791年宪法把人权宣言原则转化为君主立宪制度设计。",
      credibilityReason: "可用于核验法国大革命从权利宣言进入制度实验阶段的具体条文。",
      originalUrl: "https://sourcebooks.fordham.edu/mod/1791frenchconstitution.asp",
    },
  ],
  cold_war: [
    {
      id: "aux-coldwar-nato-treaty",
      title: "《北大西洋公约》官方文本",
      author: "NATO",
      year: "1949",
      type: "official_archive",
      credibilityScore: 92,
      excerpt: "北约条约第五条体现西方集体防务机制的制度化。",
      credibilityReason: "官方条约文本能核验冷战同盟结构和集体安全承诺。",
      originalUrl: "https://www.nato.int/cps/en/natohq/official_texts_17120.htm",
    },
  ],
  american_revolution: [
    {
      id: "aux-american-articles-confederation",
      title: "《邦联条例》",
      author: "美国国家档案馆",
      year: "1781",
      type: "official_archive",
      credibilityScore: 91,
      excerpt: "邦联条例显示独立后美国早期中央权力受限的制度安排。",
      credibilityReason: "官方档案文本有助于理解独立战争后从邦联到宪法体制的转折。",
      originalUrl: "https://www.archives.gov/milestone-documents/articles-of-confederation",
    },
  ],
  industrial_revolution: [
    {
      id: "aux-industrial-factory-acts",
      title: "英国工厂法与童工改革",
      author: "英国议会",
      year: "1833",
      type: "official_archive",
      credibilityScore: 88,
      excerpt: "1833年工厂法限制儿童劳动并建立工厂监察制度。",
      credibilityReason: "议会史料可核验工业化劳工问题如何进入国家立法。",
      originalUrl: "https://www.parliament.uk/about/living-heritage/transformingsociety/livinglearning/19thcentury/overview/factoryacts/",
    },
  ],
  ww1: [
    {
      id: "aux-ww1-zimmermann",
      title: "齐默曼电报",
      author: "美国国家档案馆",
      year: "1917",
      type: "official_archive",
      credibilityScore: 92,
      excerpt: "齐默曼电报是美国舆论转向参战的重要外交与情报证据。",
      credibilityReason: "解密档案可核验一战后期美国参战背景。",
      originalUrl: "https://www.archives.gov/milestone-documents/zimmermann-telegram",
    },
  ],
  age_of_exploration: [
    {
      id: "aux-exploration-tordesillas",
      title: "《托尔德西里亚斯条约》",
      author: "Avalon Project",
      year: "1494",
      type: "official_archive",
      credibilityScore: 88,
      excerpt: "条约体现西葡对海外势力范围的早期制度化划分。",
      credibilityReason: "一手条约文本能补充大航海叙事中的殖民权力结构。",
      originalUrl: "https://avalon.law.yale.edu/15th_century/mod001.asp",
    },
  ],
  american_civil_war: [
    {
      id: "aux-civilwar-13th-amendment",
      title: "美国第十三修正案",
      author: "美国国家档案馆",
      year: "1865",
      type: "official_archive",
      credibilityScore: 94,
      excerpt: "第十三修正案在宪法层面废除奴隶制。",
      credibilityReason: "官方宪法档案可核验内战政治结果和重建起点。",
      originalUrl: "https://www.archives.gov/milestone-documents/13th-amendment",
    },
  ],
  black_death: [
    {
      id: "aux-blackdeath-laborers",
      title: "1351年《劳工法令》",
      author: "Fordham Internet History Sourcebooks",
      year: "1351",
      type: "official_archive",
      credibilityScore: 86,
      excerpt: "劳工法令试图限制瘟疫后工资上涨与劳动力流动。",
      credibilityReason: "中世纪法令文本能核验黑死病后的社会经济冲突。",
      originalUrl: "https://sourcebooks.fordham.edu/source/1351laborers.asp",
    },
  ],
  cuban_missile_crisis: [
    {
      id: "aux-cmc-test-ban",
      title: "《部分禁止核试验条约》",
      author: "Avalon Project",
      year: "1963",
      type: "international",
      credibilityScore: 88,
      excerpt: "危机后美苏开始用军控条约降低核升级风险。",
      credibilityReason: "国际条约文本可补充古巴导弹危机后的危机管理制度化。",
      originalUrl: "https://avalon.law.yale.edu/20th_century/testban.asp",
    },
  ],
  decolonization: [
    {
      id: "aux-decolonization-un1514",
      title: "联合国大会第1514号决议",
      author: "联合国",
      year: "1960",
      type: "international",
      credibilityScore: 91,
      excerpt: "该决议宣告给予殖民地国家和人民独立。",
      credibilityReason: "联合国正式记录可核验非殖民化国际法与政治语言。",
      originalUrl: "https://digitallibrary.un.org/record/206145",
    },
  ],
  korean_war: [
    {
      id: "aux-korean-armistice",
      title: "《朝鲜停战协定》",
      author: "联合国调停档案",
      year: "1953",
      type: "international",
      credibilityScore: 90,
      excerpt: "停战协定规定军事分界线、非军事区和停火监督机制。",
      credibilityReason: "停战文本是核验朝鲜战争结局和半岛分裂结构的一手材料。",
      originalUrl: "https://peacemaker.un.org/koreanarmisticeagreement1953",
    },
  ],
  mongol_empire: [
    {
      id: "aux-mongol-yuanshi-shizu",
      title: "《元史·世祖本纪》",
      author: "宋濂等",
      year: "1370",
      type: "literature",
      credibilityScore: 82,
      excerpt: "《元史》记录忽必烈建元、定都与王朝制度化过程。",
      credibilityReason: "传统正史有助于补充蒙古帝国在中国王朝制度中的转型视角。",
      originalUrl: "https://zh.wikisource.org/wiki/%E5%85%83%E5%8F%B2/%E5%8D%B704",
    },
  ],
  reformation: [
    {
      id: "aux-reformation-calvin",
      title: "加尔文《基督教要义》",
      author: "John Calvin",
      year: "1536",
      type: "literature",
      credibilityScore: 84,
      excerpt: "《基督教要义》系统化阐释改革宗神学。",
      credibilityReason: "关键神学文本可补充宗教改革内部思想分化。",
      originalUrl: "https://www.ccel.org/ccel/calvin/institutes.html",
    },
  ],
  renaissance: [
    {
      id: "aux-renaissance-copernicus",
      title: "哥白尼《天体运行论》早期印本",
      author: "Library of Congress",
      year: "1543",
      type: "literature",
      credibilityScore: 86,
      excerpt: "日心体系挑战传统宇宙观，连接文艺复兴知识转型与科学革命。",
      credibilityReason: "馆藏早期印本能核验文艺复兴晚期科学知识转向。",
      originalUrl: "https://www.loc.gov/item/49049778/",
    },
  ],
  roman_empire: [
    {
      id: "aux-roman-res-gestae",
      title: "Res Gestae Divi Augusti",
      author: "Augustus",
      year: "14",
      type: "official_archive",
      credibilityScore: 84,
      excerpt: "奥古斯都自述功业呈现元首制合法性叙事。",
      credibilityReason: "官方铭文文本可核验罗马帝国早期政治宣传与制度建构。",
      originalUrl: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Augustus/Res_Gestae/home.html",
    },
  ],
  russian_revolution: [
    {
      id: "aux-russian-april-theses",
      title: "列宁《四月提纲》",
      author: "Vladimir Lenin",
      year: "1917",
      type: "literature",
      credibilityScore: 85,
      excerpt: "《四月提纲》提出从临时政府转向苏维埃政权的政治路线。",
      credibilityReason: "革命核心文本可核验布尔什维克策略转向。",
      originalUrl: "https://www.marxists.org/archive/lenin/works/1917/apr/04.htm",
    },
  ],
  slave_trade: [
    {
      id: "aux-slavetrade-1807-act",
      title: "1807年英国废除奴隶贸易法",
      author: "英国立法档案",
      year: "1807",
      type: "official_archive",
      credibilityScore: 90,
      excerpt: "该法禁止英国船只参与奴隶贸易。",
      credibilityReason: "立法原文可核验废奴运动从道德动员进入国家强制的节点。",
      originalUrl: "https://www.legislation.gov.uk/ukpga/Geo3/47/36/contents",
    },
  ],
  ww2: [
    {
      id: "aux-ww2-cairo",
      title: "《开罗宣言》",
      author: "中、美、英三国政府",
      year: "1943",
      type: "official_archive",
      credibilityScore: 90,
      excerpt: "宣言确认日本所窃取中国领土应归还中国。",
      credibilityReason: "同盟国高层外交文件可核验中国战场与战后亚洲秩序安排。",
      originalUrl: "https://avalon.law.yale.edu/wwii/cairo.asp",
    },
  ],
};

const CHINESE_PERSPECTIVES: Record<HistoricalTopicId, PerspectiveAnalysis> = {
  meiji: {
    title: "中国视角",
    content:
      "中国视角通常把明治维新放在近代东亚危机中理解：日本以维新摆脱不平等条约并迅速强国，给晚清改革派提供了制度学习样本；但甲午战争、吞并琉球与朝鲜又使它成为“以现代化转向帝国扩张”的警示。这个视角既关心日本为何成功，也追问中国自强、戊戌变法与东亚秩序崩解之间的连锁关系。",
    sources: [
      {
        id: "cn-meiji-1",
        title: "《日本变政考》",
        author: "康有为",
        year: "1898",
        type: "literature",
        credibilityScore: 82,
        excerpt: "晚清维新派把日本制度变革作为救亡图存的参照，用以论证明治改革的可学与急迫。",
        credibilityReason: "近代中国改革派直接观察日本维新的重要文本，能反映当时中国知识界的学习视角，但带有强烈变法动员目的。",
        originalUrl: "https://zh.wikisource.org/wiki/%E6%97%A5%E6%9C%AC%E8%AE%8A%E6%94%BF%E8%80%83",
      },
      {
        id: "cn-meiji-2",
        title: "《甲午战争与近代中国》",
        author: "中国社会科学院近代史研究所相关研究",
        year: "20世纪后期",
        type: "academic",
        credibilityScore: 86,
        excerpt: "甲午战败使中国重新评估日本维新的制度效果，也暴露近代东亚权力转移的残酷性。",
        credibilityReason: "中国近代史学界长期研究主题，强调中日比较与制度危机，但容易从中国救亡框架出发解释日本经验。",
      },
    ],
    overallCredibility: 84,
    credibilityAssessment: "中国视角有直接的晚清改革文献和近代史研究支撑，能揭示明治维新对中国政治改革的刺激；但因甲午战争创伤，容易把日本现代化与侵略扩张过度线性相连。",
    biasIndicators: ["救亡图存框架强烈", "容易以后来侵华历史倒读明治前期", "更关注对中国的冲击而非日本社会内部差异"],
    recommendedQuestions: ["晚清改革派究竟从明治维新中学到了什么？", "日本现代化与对外扩张之间是必然关系吗？"],
  },
  french_revolution: {
    title: "中国视角",
    content:
      "中国视角常把法国大革命视为现代政治观念进入中国的重要参照：主权在民、共和、平等与人权观念影响晚清立宪派、革命派和五四知识界。但中国讨论也格外警惕革命暴力、恐怖政治与拿破仑式强人政治，因而法国大革命既是反专制的思想资源，也是“革命如何避免失序”的历史案例。",
    sources: [
      {
        id: "cn-fr-1",
        title: "《新民说》及相关政论",
        author: "梁启超",
        year: "1902-1906",
        type: "literature",
        credibilityScore: 78,
        excerpt: "晚清新民思想吸收法国革命、民族国家和公民观念，用来讨论中国政治共同体的重建。",
        credibilityReason: "一手政论材料，反映法国革命在中国思想界的转译；但为政治启蒙文本，并非严格史学研究。",
        originalUrl: "https://zh.wikisource.org/wiki/%E6%96%B0%E6%B0%91%E8%AA%AA",
      },
      {
        id: "cn-fr-2",
        title: "《法国通史》",
        author: "张芝联主编",
        year: "1989",
        type: "academic",
        credibilityScore: 86,
        excerpt: "中国法国史研究在肯定革命反封建意义的同时，也关注革命制度化和暴力政治的张力。",
        credibilityReason: "中国法国史学代表性成果，学术性强；但部分解释受20世纪革命史范式影响。",
      },
    ],
    overallCredibility: 82,
    credibilityAssessment: "中国视角能清楚呈现法国大革命思想在中国近代转型中的再阐释，但晚清和民国文本往往服务于中国政治动员，需要与法国本土档案和国际史学对读。",
    biasIndicators: ["以中国革命经验筛选法国经验", "可能强化反封建进步叙事", "对宗教和地方社会复杂性关注不足"],
    recommendedQuestions: ["法国大革命在中国为何既被赞美又被警惕？", "中国革命者怎样改写法国革命的意义？"],
  },
  cold_war: {
    title: "中国视角",
    content:
      "中国视角认为冷战不能只写成美苏两极对抗：新中国经历了封锁、朝鲜战争、中苏同盟与中苏分裂，并在万隆会议、和平共处五项原则和恢复联合国席位后逐步塑造独立自主外交。这个视角强调第三世界、反殖民与反霸权议题，同时也要求审视中国自身在阵营政治中的选择、代价和转向。",
    sources: [
      {
        id: "cn-cw-1",
        title: "《周恩来外交文选》",
        author: "周恩来",
        year: "1990",
        type: "official_archive",
        credibilityScore: 86,
        excerpt: "和平共处五项原则和万隆会议发言体现了中国试图在两极格局外寻求亚非团结与外交空间。",
        credibilityReason: "官方文献汇编，保留中国外交政策表述；但文本具有政策辩护和国家叙事属性。",
        originalUrl: "https://digitalarchive.wilsoncenter.org/document/main-speech-premier-zhou-enlai-head-delegation-peoples-republic-china-distributed-plenary",
      },
      {
        id: "cn-cw-2",
        title: "《中华人民共和国外交史》",
        author: "谢益显主编",
        year: "1994",
        type: "academic",
        credibilityScore: 82,
        excerpt: "中国冷战经历包含同盟、对抗、缓和与多边外交多个阶段，不能化约为单一阵营归属。",
        credibilityReason: "系统梳理新中国外交史，史实框架清晰；但官方外交史视角较强。",
      },
    ],
    overallCredibility: 83,
    credibilityAssessment: "中国视角补充了冷战史中第三世界与中苏分裂维度，能打破美苏中心叙事；但官方文献对中国政策失误和国内政治影响反思有限。",
    biasIndicators: ["反霸权叙事突出", "对自身阵营选择的代价讨论不足", "容易把第三世界立场理想化"],
    recommendedQuestions: ["中国在冷战中是阵营成员、第三世界国家，还是独立力量？", "中苏分裂如何改变全球冷战结构？"],
  },
  american_revolution: {
    title: "中国视角",
    content:
      "中国视角把美国独立革命视为近代共和制度与宪政设计的重要样本。晚清和民国知识界关注独立、联邦、宪法与总统制，孙中山等人也借鉴美国政治经验；但中国讨论同时指出美国革命的自由承诺长期排除了奴隶、原住民和华人移民，这使“民主样本”必须接受平等实践的检验。",
    sources: [
      {
        id: "cn-ar-1",
        title: "《三民主义》",
        author: "孙中山",
        year: "1924",
        type: "literature",
        credibilityScore: 82,
        excerpt: "孙中山以美国建国经验讨论民族独立、民权制度和地方自治，同时试图改造为中国方案。",
        credibilityReason: "中国革命思想的一手材料，能反映美国革命在中国政治想象中的位置；但具有强烈政纲性质。",
        originalUrl: "https://zh.wikisource.org/wiki/%E4%B8%89%E6%B0%91%E4%B8%BB%E7%BE%A9",
      },
      {
        id: "cn-ar-2",
        title: "《西学东渐记》",
        author: "容闳",
        year: "1909",
        type: "memoir",
        credibilityScore: 78,
        excerpt: "早期留美中国人从教育、制度和社会观察中认识美国共和经验，也看到种族偏见与排华问题。",
        credibilityReason: "亲历者回忆，反映中美制度接触的早期经验；但个人记忆带有选择性。",
      },
    ],
    overallCredibility: 80,
    credibilityAssessment: "中国视角能把美国革命放入中国近代制度学习史中考察，也能指出美国自由叙事与种族排斥的矛盾；但常以中国改革需求筛选美国经验。",
    biasIndicators: ["重视制度借鉴胜过北美社会细节", "以中国革命问题重组美国经验", "对英国帝国背景关注较少"],
    recommendedQuestions: ["美国独立革命为什么会成为中国宪政想象的资源？", "美国革命的自由承诺如何被排华历史挑战？"],
  },
  industrial_revolution: {
    title: "中国视角",
    content:
      "中国视角把工业革命同时看作生产力跃升和帝国主义扩张的起点。蒸汽、机器、铁路和工厂制度显示了“师夷长技”的必要性，但鸦片战争、不平等条约和全球市场压力也让中国知识界认识到，技术优势会转化为军事、金融和殖民支配。因此工业革命在中国叙事中既是现代化动力，也是近代危机的外部根源。",
    sources: [
      {
        id: "cn-ir-1",
        title: "《海国图志》",
        author: "魏源",
        year: "1843",
        type: "literature",
        credibilityScore: 84,
        excerpt: "魏源提出了解西方地理、军事和技术，以应对海上强权冲击的改革思路。",
        credibilityReason: "鸦片战争后中国认识西方工业军事优势的关键文本；但资料来源间接，世界经济分析有限。",
        originalUrl: "https://zh.wikisource.org/wiki/%E6%B5%B7%E5%9C%8B%E5%9C%96%E5%BF%97",
      },
      {
        id: "cn-ir-2",
        title: "《李鸿章全集：奏议》",
        author: "李鸿章",
        year: "19世纪",
        type: "official_archive",
        credibilityScore: 82,
        excerpt: "洋务派将机器制造、轮船、电报和铁路视为自强基础，但改革多限于器物和军工层面。",
        credibilityReason: "清代官方奏议保留政策思路和制度局限，是研究中国回应工业化的重要一手材料。",
      },
    ],
    overallCredibility: 83,
    credibilityAssessment: "中国视角能揭示工业革命与中国近代危机的联动，尤其适合分析技术、战争和不平等贸易；但可能过度强调外部冲击，低估中国内部制度与市场问题。",
    biasIndicators: ["外部侵略解释较强", "容易把工业化等同于救亡技术", "对英国内部阶级关系关注不足"],
    recommendedQuestions: ["工业革命为什么在中国首先被理解为军事和海防问题？", "洋务运动是否真正理解了工业革命的制度条件？"],
  },
  ww1: {
    title: "中国视角",
    content:
      "中国视角把一战与“弱国外交”的失败联系在一起。北洋政府参战和派遣华工，本希望通过协约国胜利收回德国在山东权益；但巴黎和会把山东权益转给日本，直接激发五四运动。因而一战在中国记忆中不是单纯欧洲战争，而是民族主权、国际法承诺和民众政治觉醒相互碰撞的时刻。",
    sources: [
      {
        id: "cn-ww1-1",
        title: "《顾维钧回忆录》",
        author: "顾维钧",
        year: "1983",
        type: "memoir",
        credibilityScore: 86,
        excerpt: "中国代表团在巴黎和会上围绕山东问题据理力争，却受制于列强交易和日本压力。",
        credibilityReason: "巴黎和会中国代表亲历回忆，外交细节丰富；但回忆录有自我辩护和事后整理成分。",
        originalUrl: "https://archive.org/search?query=%E9%A1%BE%E7%BB%B4%E9%92%A7%E5%9B%9E%E5%BF%86%E5%BD%95",
      },
      {
        id: "cn-ww1-2",
        title: "《五四运动史》",
        author: "周策纵",
        year: "1960",
        type: "academic",
        credibilityScore: 88,
        excerpt: "巴黎和会山东问题把国际外交挫败转化为中国学生、市民和知识界的政治动员。",
        credibilityReason: "五四研究经典著作，材料扎实；但思想史解释占比高，需要与外交档案互证。",
      },
    ],
    overallCredibility: 86,
    credibilityAssessment: "中国视角有外交亲历记录和五四研究支撑，能揭示一战后国际秩序对非西方国家的排斥；但容易把复杂的战时外交压缩为山东问题。",
    biasIndicators: ["民族主权叙事强烈", "对欧洲战场内部因素关注较少", "容易以后来五四意义倒推参战动机"],
    recommendedQuestions: ["中国参加一战获得了什么，又失去了什么？", "巴黎和会为何会成为五四运动的导火索？"],
  },
  age_of_exploration: {
    title: "中国视角",
    content:
      "中国视角常把大航海时代与郑和下西洋、明清海禁、澳门贸易和白银流入并置比较。郑和航海显示明代中国拥有远洋能力，但其政治目标不同于欧洲殖民扩张；欧洲航海随后带来的殖民、传教、白银贸易和武装商业网络，则把中国卷入早期全球化。这个视角强调“发现”一词背后的欧洲中心论。",
    sources: [
      {
        id: "cn-aoe-1",
        title: "《明史·郑和传》",
        author: "张廷玉等",
        year: "1739",
        type: "official_archive",
        credibilityScore: 84,
        excerpt: "官方史书记录郑和奉命远航和朝贡交往，展现明代海洋行动的国家属性。",
        credibilityReason: "清修正史，史料地位高；但成书较晚，对航海细节和海外社会了解有限。",
        originalUrl: "https://zh.wikisource.org/wiki/%E6%98%8E%E5%8F%B2/%E5%8D%B7304",
      },
      {
        id: "cn-aoe-2",
        title: "《东西洋考》",
        author: "张燮",
        year: "1617",
        type: "literature",
        credibilityScore: 82,
        excerpt: "明代文献记录海上贸易、东南亚航路与欧洲人进入亚洲贸易网络的情况。",
        credibilityReason: "晚明海外交通和贸易的重要资料，能补足欧洲航海叙事；但带有传统华夷分类。",
        originalUrl: "https://zh.wikisource.org/wiki/%E6%9D%B1%E8%A5%BF%E6%B4%8B%E8%80%83",
      },
    ],
    overallCredibility: 83,
    credibilityAssessment: "中国视角能有效纠正欧洲“发现”叙事，把大航海时代放入印度洋、东亚和白银贸易网络；但明清文献对美洲和欧洲内部动因的掌握有限。",
    biasIndicators: ["以朝贡和海禁框架理解海洋", "可能理想化郑和航海的和平性", "对欧洲商业资本内部机制关注不足"],
    recommendedQuestions: ["郑和航海与欧洲殖民航海的目标有何根本差异？", "白银贸易怎样把明清中国卷入全球化？"],
  },
  american_civil_war: {
    title: "中国视角",
    content:
      "中国视角通常从两个层面理解美国内战：一是联邦存续、奴隶制废除和宪政危机，为近代中国思考国家统一与共和制度提供参照；二是战后美国继续排斥华工和亚裔移民，暴露了废奴之后种族平等并未真正实现。美国内战因此既是解放叙事，也是观察现代国家与种族边界的案例。",
    sources: [
      {
        id: "cn-acw-1",
        title: "《西学东渐记》",
        author: "容闳",
        year: "1909",
        type: "memoir",
        credibilityScore: 78,
        excerpt: "容闳等早期留美中国人亲历或近距离观察美国社会，关注教育、制度和种族处境。",
        credibilityReason: "早期中美交流亲历材料，能呈现中国观察者视角；但对内战政治细节并不系统。",
      },
      {
        id: "cn-acw-2",
        title: "《蒲安臣条约》",
        author: "清政府 / 美国政府",
        year: "1868",
        type: "official_archive",
        credibilityScore: 84,
        excerpt: "条约确认中美往来与移民权利，却很快遭遇美国国内排华政治的逆转。",
        credibilityReason: "中美外交一手条约文本，可用来观察战后美国劳工需求与种族政治的矛盾。",
      },
    ],
    overallCredibility: 80,
    credibilityAssessment: "中国视角把内战后的美国重建与华人移民处境联系起来，能揭示自由劳动和种族排斥之间的张力；但对南北战场和美国国内政党政治掌握较间接。",
    biasIndicators: ["更关注华人处境与国家统一", "可能弱化非裔美国人的主体经验", "以内战后果反推内战动机"],
    recommendedQuestions: ["废奴后的美国为何仍会走向排华？", "美国内战对中国近代国家统一观念有何启发？"],
  },
  black_death: {
    title: "中国视角",
    content:
      "中国视角关注黑死病与欧亚大陆交通、蒙古帝国时代交流和元明之际疫病记载之间的关系。许多研究会比较中国史书中的灾疫、人口流动与欧洲瘟疫，但也提醒不能简单断言黑死病“源自中国”。这个视角强调跨欧亚传播网络的重要性，以及传统中国灾异叙事与现代医学解释之间的差异。",
    sources: [
      {
        id: "cn-bd-1",
        title: "《元史·五行志》",
        author: "宋濂等",
        year: "1370",
        type: "official_archive",
        credibilityScore: 78,
        excerpt: "元代正史记录多地疫病与灾异，为比较14世纪欧亚疾病环境提供中国材料。",
        credibilityReason: "正史灾异记录具有基础史料价值；但病名模糊，不能直接等同现代鼠疫诊断。",
        originalUrl: "https://zh.wikisource.org/wiki/%E5%85%83%E5%8F%B2",
      },
      {
        id: "cn-bd-2",
        title: "《剑桥中国辽西夏金元史》相关研究",
        author: "Herbert Franke / Denis Twitchett 等",
        year: "1994",
        type: "academic",
        credibilityScore: 84,
        excerpt: "元代欧亚联系加强了人员、货物与病原传播的可能，但具体路径需要多学科证据。",
        credibilityReason: "国际元史研究权威成果，便于校正单一中国史书记录；但不是中国本土叙述。",
      },
    ],
    overallCredibility: 78,
    credibilityAssessment: "中国视角能把黑死病放入欧亚交通史中，补充欧洲中心叙事；但中国传统疫病记录诊断不精确，必须谨慎避免过度溯源。",
    biasIndicators: ["史书灾异框架影响解释", "疾病名称与现代医学无法直接对应", "传播路径研究易受推测影响"],
    recommendedQuestions: ["黑死病研究中中国史料能证明什么，不能证明什么？", "蒙古帝国的交通网络如何改变疾病传播风险？"],
  },
  cuban_missile_crisis: {
    title: "中国视角",
    content:
      "中国视角把古巴导弹危机看作核时代大国把小国安全置于博弈棋盘上的典型事件。1962年前后中苏分歧加深，中国舆论既反对美国对古巴的军事压力，也批评苏联在危机中进退失据；随后中国发展核力量时，又强调反对核垄断和核讹诈。这个视角突出主权、反霸权与核威慑不平等。",
    sources: [
      {
        id: "cn-cmc-1",
        title: "《人民日报》关于古巴危机的社论与报道",
        author: "人民日报",
        year: "1962",
        type: "media",
        credibilityScore: 72,
        excerpt: "中国官方媒体将危机解释为美国霸权压力与社会主义阵营内部策略分歧共同作用的结果。",
        credibilityReason: "能反映当时中国公开立场，但属于高度政治化的冷战宣传材料。",
      },
      {
        id: "cn-cmc-2",
        title: "《中华人民共和国政府声明：中国第一颗原子弹爆炸成功》",
        author: "中华人民共和国政府",
        year: "1964",
        type: "official_archive",
        credibilityScore: 82,
        excerpt: "声明把发展核力量与反对核垄断、核威胁联系起来，体现中国对核秩序的理解。",
        credibilityReason: "官方声明权威反映中国核政策表述；但带有明确政策宣传功能。",
        originalUrl: "https://www.nti.org/analysis/articles/chinas-nuclear-weapons/",
      },
    ],
    overallCredibility: 76,
    credibilityAssessment: "中国视角有助于把古巴危机放入中苏分裂和第三世界安全语境中，但1962年公开资料宣传色彩较强，需要与美苏古巴档案交叉验证。",
    biasIndicators: ["反美反霸话语突出", "对苏联批评受中苏论战影响", "对古巴自身档案依赖不足"],
    recommendedQuestions: ["古巴导弹危机如何被中苏分裂重新解释？", "核垄断问题为何成为中国理解危机的核心？"],
  },
  decolonization: {
    title: "中国视角",
    content:
      "中国视角把非殖民化看作二战后国际秩序重组的核心潮流，也是新中国突破外交孤立的重要舞台。万隆会议、和平共处五项原则、支持亚非拉民族独立和恢复联合国席位，构成中国理解非殖民化的主线。这个视角强调反帝反殖、国家主权和平等发展，但也需要区分理想表述、外交利益与具体援助实践。",
    sources: [
      {
        id: "cn-decol-1",
        title: "《周恩来在亚非会议上的发言》",
        author: "周恩来",
        year: "1955",
        type: "official_archive",
        credibilityScore: 88,
        excerpt: "中国代表团以求同存异推动亚非国家在反殖民、和平与发展议题上形成共同立场。",
        credibilityReason: "万隆会议核心一手文献，权威反映新中国亚非外交；但带有会议策略和外交修辞。",
        originalUrl: "https://digitalarchive.wilsoncenter.org/document/main-speech-premier-zhou-enlai-head-delegation-peoples-republic-china-distributed-plenary",
      },
      {
        id: "cn-decol-2",
        title: "《邓小平在联合国大会第六届特别会议上的发言》",
        author: "邓小平",
        year: "1974",
        type: "official_archive",
        credibilityScore: 84,
        excerpt: "中国以第三世界身份主张建立国际政治经济新秩序，反对少数国家垄断国际经济事务。",
        credibilityReason: "中国重返联合国后的重要外交文本，能反映第三世界叙事；但政策立场鲜明。",
        originalUrl: "https://www.marxists.org/reference/archive/deng-xiaoping/1974/04/10.htm",
      },
    ],
    overallCredibility: 86,
    credibilityAssessment: "中国视角对理解亚非会议、不结盟和新国际经济秩序非常关键；但官方文本常将复杂国家利益包装为一致的反殖民道义立场。",
    biasIndicators: ["第三世界团结叙事理想化", "弱化中国自身战略利益", "对各独立国家内部差异关注不足"],
    recommendedQuestions: ["中国在非殖民化浪潮中既是支持者还是受益者？", "万隆精神如何改变新中国外交空间？"],
  },
  korean_war: {
    title: "中国视角",
    content:
      "中国视角将朝鲜战争称为抗美援朝战争，核心叙事是“保家卫国”：联合国军越过三八线并逼近鸭绿江，被视为新中国安全的直接威胁。中国人民志愿军参战既是军事行动，也是全国动员和新政权合法性建构的一部分；同时战争造成巨大人员、经济和外交代价，也把中国深度卷入冷战。",
    sources: [
      {
        id: "cn-kw-1",
        title: "《抗美援朝战争史》",
        author: "军事科学院军事历史研究部",
        year: "2000",
        type: "academic",
        credibilityScore: 86,
        excerpt: "中国战史强调美国军事压力、鸭绿江安全和志愿军作战对稳定战线的作用。",
        credibilityReason: "中国军方权威战史，作战资料丰富；但对决策争议和战争代价的呈现受官方框架影响。",
      },
      {
        id: "cn-kw-2",
        title: "《建国以来毛泽东军事文稿》",
        author: "毛泽东",
        year: "1989",
        type: "official_archive",
        credibilityScore: 84,
        excerpt: "毛泽东相关电报显示中国决策层围绕出兵风险、边境安全和国际格局进行权衡。",
        credibilityReason: "高层决策文献，史料价值高；但汇编选择和注释体现官方出版口径。",
      },
    ],
    overallCredibility: 84,
    credibilityAssessment: "中国视角是理解朝鲜战争不可或缺的一手参战方叙事，尤其能解释出兵逻辑和国内动员；但需与苏联、朝鲜、美国档案互证，避免只保留胜利叙事。",
    biasIndicators: ["保家卫国叙事突出", "对战争起源和朝鲜责任讨论有限", "对人员与经济代价呈现不足"],
    recommendedQuestions: ["中国出兵朝鲜是安全防御还是意识形态选择？", "抗美援朝如何改变新中国的国家动员能力？"],
  },
  mongol_empire: {
    title: "中国视角",
    content:
      "中国视角把蒙古帝国同时理解为征服王朝与多民族统一王朝的组成部分。元朝结束了宋、辽、金、西夏以来的长期分裂，并把中国纳入更广阔的欧亚交通网络；但蒙古征服也造成战争破坏、等级秩序和南北社会差异。这个视角强调元史既不能只写成草原英雄史，也不能只写成外族压迫史。",
    sources: [
      {
        id: "cn-mongol-1",
        title: "《元史》",
        author: "宋濂等",
        year: "1370",
        type: "official_archive",
        credibilityScore: 86,
        excerpt: "明初正史保存元代制度、人物和征服过程记录，是中国视角理解元朝的基础史料。",
        credibilityReason: "官方正史权威性高；但成书仓促，材料取舍和明代立场影响明显。",
        originalUrl: "https://zh.wikisource.org/wiki/%E5%85%83%E5%8F%B2",
      },
      {
        id: "cn-mongol-2",
        title: "《元代社会生活史》",
        author: "史卫民",
        year: "1996",
        type: "academic",
        credibilityScore: 82,
        excerpt: "现代中国元史研究关注制度、民族关系、城市生活和欧亚交流的多重面向。",
        credibilityReason: "中国元史社会史研究代表，能补足政治征服叙事；但个别判断需结合新出文献更新。",
      },
    ],
    overallCredibility: 84,
    credibilityAssessment: "中国视角有正史和长期元史研究支撑，适合分析元朝制度和多民族国家形成；但传统正统论和现代民族国家叙事都会影响解释。",
    biasIndicators: ["正统王朝框架影响强", "可能淡化征服暴力", "现代民族叙事可能重塑元朝身份"],
    recommendedQuestions: ["元朝在中国史中应如何同时理解为征服王朝和统一王朝？", "蒙古帝国的欧亚网络怎样改变中国？"],
  },
  reformation: {
    title: "中国视角",
    content:
      "中国视角通常从明清之际中西交流理解宗教改革：欧洲新教改革改变了天主教会、国家权力和知识传播格局，但中国直接接触更多来自天主教耶稣会士。利玛窦、徐光启等人的翻译与会通显示，中国面对的是宗教改革后被迫自我调整的欧洲基督教世界。这个视角关注宗教、科学与礼仪冲突如何进入中国。",
    sources: [
      {
        id: "cn-ref-1",
        title: "《天主实义》",
        author: "利玛窦",
        year: "1603",
        type: "literature",
        credibilityScore: 82,
        excerpt: "利玛窦用儒家语汇解释天主教义，反映宗教改革后天主教在中国的适应策略。",
        credibilityReason: "中西思想交流一手文本，能体现中国接触基督教的具体方式；但并非新教视角。",
        originalUrl: "https://zh.wikisource.org/wiki/%E5%A4%A9%E4%B8%BB%E5%AF%A6%E7%BE%A9",
      },
      {
        id: "cn-ref-2",
        title: "《明清间在华的天主教耶稣会士》",
        author: "方豪",
        year: "20世纪",
        type: "academic",
        credibilityScore: 80,
        excerpt: "中国教会史研究把宗教改革后的欧洲教派竞争与中国礼仪之争联系起来考察。",
        credibilityReason: "中文教会史经典研究，材料丰富；但部分解释受教会史关怀影响。",
      },
    ],
    overallCredibility: 80,
    credibilityAssessment: "中国视角能把宗教改革的全球后果落到明清知识交流现场，但因为中国早期主要接触天主教，新教改革本身的内部神学争论呈现较间接。",
    biasIndicators: ["以耶稣会经验代替欧洲全貌", "重视科学输入而淡化神学冲突", "中国礼仪问题可能压过欧洲宗教政治"],
    recommendedQuestions: ["为什么宗教改革后的欧洲首先以耶稣会形象进入中国？", "中国礼仪之争与欧洲宗教改革有什么间接联系？"],
  },
  renaissance: {
    title: "中国视角",
    content:
      "中国视角把文艺复兴与西学东渐、科学翻译和明清思想比较联系起来。徐光启与利玛窦合作翻译《几何原本》，使中国士人首次系统接触欧几里得式证明和欧洲科学传统；因此文艺复兴不仅是意大利艺术史，也是后来欧洲科学革命和中西知识会通的前奏。这个视角常追问中国为何没有出现类似的制度性知识转型。",
    sources: [
      {
        id: "cn-ren-1",
        title: "《几何原本》序",
        author: "徐光启",
        year: "1607",
        type: "literature",
        credibilityScore: 86,
        excerpt: "徐光启强调几何学的证明方法和实用价值，体现中国士人对欧洲知识体系的早期理解。",
        credibilityReason: "中西科学交流一手文本，史料价值高；但只能代表少数精英接受经验。",
        originalUrl: "https://zh.wikisource.org/wiki/%E5%B9%BE%E4%BD%95%E5%8E%9F%E6%9C%AC",
      },
      {
        id: "cn-ren-2",
        title: "《中国科学技术史》",
        author: "李约瑟",
        year: "1954-2004",
        type: "academic",
        credibilityScore: 88,
        excerpt: "李约瑟问题推动中国学界比较欧洲科学革命与中国传统科技结构。",
        credibilityReason: "国际权威研究，深刻影响中文世界科技史讨论；但部分解释后来受到修正。",
      },
    ],
    overallCredibility: 84,
    credibilityAssessment: "中国视角能把文艺复兴后果与中西知识交流联系起来，特别适合比较科学方法和士人接受；但容易把文艺复兴简化为科学输入的前史。",
    biasIndicators: ["重科学轻艺术", "以中西比较问题重组欧洲史", "容易把明清中国作为被动接受者"],
    recommendedQuestions: ["《几何原本》在中国为何具有超出数学的思想意义？", "文艺复兴与中国西学东渐之间隔着哪些中介环节？"],
  },
  roman_empire: {
    title: "中国视角",
    content:
      "中国视角主要来自汉魏史籍中的“大秦”记载和丝绸之路想象。罗马帝国在中国文献中被描述为遥远而富庶的西方大国，说明汉代中国已经把地中海世界纳入欧亚知识地图；但这些记录多经中亚商旅转述，事实、传闻与理想化投射交织。这个视角强调古代全球互知的有限性。",
    sources: [
      {
        id: "cn-rome-1",
        title: "《后汉书·西域传》",
        author: "范晔",
        year: "5世纪",
        type: "official_archive",
        credibilityScore: 84,
        excerpt: "《后汉书》记载大秦的位置、物产和交通，反映东汉对罗马世界的间接认知。",
        credibilityReason: "中国正史关于罗马的重要来源；但信息多为转述，地理和制度描述混杂想象。",
        originalUrl: "https://zh.wikisource.org/wiki/%E5%BE%8C%E6%BC%A2%E6%9B%B8/%E5%8D%B788",
      },
      {
        id: "cn-rome-2",
        title: "《魏略·西戎传》辑佚",
        author: "鱼豢",
        year: "3世纪",
        type: "official_archive",
        credibilityScore: 80,
        excerpt: "《魏略》保存了对大秦道路、城市和物产的更细描述，是研究中罗互知的重要材料。",
        credibilityReason: "早期中国关于罗马的珍贵文本；但原书已佚，依赖后世类书保存。",
      },
    ],
    overallCredibility: 81,
    credibilityAssessment: "中国视角为罗马史提供了罕见的欧亚外部观察，能呈现丝路知识流动；但材料间接，不能替代罗马本土文献。",
    biasIndicators: ["华夏地理中心感", "商旅传闻与事实混杂", "倾向把远方帝国理想化"],
    recommendedQuestions: ["汉代中国人如何想象罗马？", "丝绸之路上的信息为何会同时准确又失真？"],
  },
  russian_revolution: {
    title: "中国视角",
    content:
      "中国视角把俄国十月革命视为20世纪中国思想与政治转向的关键事件。李大钊等人从十月革命中看到被压迫民族和劳动阶级解放的可能，五四后马克思主义传播和中国共产党成立都与此相关；同时，现代中国研究也会反思革命政权建设、暴力和一党体制的代价。",
    sources: [
      {
        id: "cn-rr-1",
        title: "《庶民的胜利》《布尔什维主义的胜利》",
        author: "李大钊",
        year: "1918",
        type: "media",
        credibilityScore: 84,
        excerpt: "李大钊把十月革命解释为庶民和世界新潮的胜利，推动马克思主义在中国传播。",
        credibilityReason: "中国早期马克思主义传播的一手文本，思想影响极大；但对俄国现实带有理想化理解。",
        originalUrl: "https://www.marxists.org/chinese/lidazhao/index.htm",
      },
      {
        id: "cn-rr-2",
        title: "《论人民民主专政》",
        author: "毛泽东",
        year: "1949",
        type: "official_archive",
        credibilityScore: 82,
        excerpt: "毛泽东把十月革命与中国革命道路相连，强调马克思列宁主义对中国政治选择的决定性影响。",
        credibilityReason: "中共建政前夕的纲领性文本，能反映官方革命谱系；但具有强烈意识形态建构功能。",
        originalUrl: "https://www.marxists.org/chinese/maozedong/marxist.org-chinese-mao-19490630.htm",
      },
    ],
    overallCredibility: 84,
    credibilityAssessment: "中国视角能准确呈现十月革命对中国革命思想的巨大影响，但早期文本常把苏俄经验理想化，后来的官方叙事也会强化历史必然性。",
    biasIndicators: ["革命谱系叙事强", "早期知识界理想化苏俄", "对俄国内部多元政治压制讨论不足"],
    recommendedQuestions: ["十月革命为何能在五四中国引发如此强烈回响？", "中国革命者如何选择性吸收俄国经验？"],
  },
  slave_trade: {
    title: "中国视角",
    content:
      "中国视角通常把跨大西洋奴隶贸易放入殖民主义、资本原始积累和强迫劳动全球史中理解。虽然中国不是大西洋奴隶贸易的中心参与者，但19世纪华工契约劳工和“卖猪仔”现象使中国史也触及类似的跨洋劳动压迫。这个视角强调奴隶制、殖民市场和种族等级如何共同塑造近代世界经济。",
    sources: [
      {
        id: "cn-slt-1",
        title: "《古巴华工调查录》",
        author: "清政府驻外调查人员",
        year: "1874",
        type: "official_archive",
        credibilityScore: 84,
        excerpt: "清政府调查古巴华工遭遇，揭示契约劳工在殖民地种植园中接近奴役的处境。",
        credibilityReason: "中国官方调查材料，能把大西洋奴隶制遗产与华工苦力贸易连接起来；但不直接记录非洲奴隶贸易。",
      },
      {
        id: "cn-slt-2",
        title: "《资本论》第一卷中译与中国马克思主义史学研究",
        author: "卡尔·马克思 / 中国史学界",
        year: "20世纪",
        type: "academic",
        credibilityScore: 82,
        excerpt: "中国马克思主义史学把奴隶贸易视为资本原始积累和殖民体系的重要环节。",
        credibilityReason: "解释框架影响深远，有助于结构性分析；但阶级和资本逻辑可能压低非洲主体性。",
        originalUrl: "https://www.marxists.org/chinese/marx/capital/index.htm",
      },
    ],
    overallCredibility: 80,
    credibilityAssessment: "中国视角能通过苦力贸易和殖民劳动比较扩展奴隶贸易讨论，但中国直接史料不记录大西洋奴隶贸易核心过程，需要依赖非洲、美洲和欧洲资料互证。",
    biasIndicators: ["以殖民主义结构解释为主", "非洲主体性可能被阶级叙事覆盖", "华工经验与奴隶制类比需谨慎"],
    recommendedQuestions: ["华工苦力贸易与大西洋奴隶制有哪些相似和不同？", "资本原始积累框架能解释奴隶贸易的全部吗？"],
  },
  ww2: {
    title: "中国视角",
    content:
      "中国视角把第二次世界大战中的中国抗日战争视为世界反法西斯战争东方主战场。中国从1931年九一八事变起长期承受日本侵略，1937年后进行全面抗战，牵制大量日军并付出巨大人员和社会代价；中国同时参与战后国际秩序设计，成为联合国创始会员国。这个视角强调民族解放、反侵略和中国战场的国际贡献。",
    sources: [
      {
        id: "cn-ww2-1",
        title: "《中国抗日战争史》",
        author: "军事科学院军事历史研究部",
        year: "1991",
        type: "academic",
        credibilityScore: 88,
        excerpt: "中国抗战是世界反法西斯战争的重要组成部分，长期牵制和消耗日本军力。",
        credibilityReason: "中国权威战史著作，资料系统；但官方战史对不同党派贡献和争议问题有叙事取舍。",
      },
      {
        id: "cn-ww2-2",
        title: "《开罗宣言》",
        author: "中、美、英三国政府",
        year: "1943",
        type: "official_archive",
        credibilityScore: 90,
        excerpt: "开罗宣言确认日本所窃取的中国领土应归还中国，体现中国在战后秩序中的主权诉求。",
        credibilityReason: "同盟国高层外交文件，文本权威；但战后执行和解释仍受国际政治影响。",
        originalUrl: "https://avalon.law.yale.edu/wwii/cairo.asp",
      },
    ],
    overallCredibility: 88,
    credibilityAssessment: "中国视角是二战史不可缺少的参战方叙事，能纠正太平洋战争叙事中忽略中国战场的问题；但官方记忆有时会把复杂的国共合作、战时社会苦难和战后内战压缩为统一的民族胜利叙事。",
    biasIndicators: ["东方主战场叙事突出", "对国共关系和战时内部冲突处理谨慎", "强调民族牺牲与国际贡献"],
    recommendedQuestions: ["中国战场如何改变日本的战略资源分配？", "二战胜利如何塑造中国的战后国际地位？"],
  },
};

function withAuxiliarySources(topicId: HistoricalTopicId, perspectives: TopicPerspectives): TopicPerspectives {
  const auxiliarySources = TOPIC_AUXILIARY_SOURCES[topicId] ?? [];

  return Object.fromEntries(
    Object.entries(perspectives).map(([key, perspective]) => {
      const existingIds = new Set(perspective.sources.map((source) => source.id));
      const existingTitles = new Set(perspective.sources.map((source) => source.title));
      const newSources = auxiliarySources.filter(
        (source) => !existingIds.has(source.id) && !existingTitles.has(source.title),
      );
      return [
        key,
        {
          ...perspective,
          sources: [...perspective.sources, ...newSources],
        },
      ];
    }),
  );
}

function withChinesePerspective(topicId: HistoricalTopicId, perspectives: TopicPerspectives): TopicPerspectives {
  return withAuxiliarySources(topicId, {
    ...perspectives,
    china: CHINESE_PERSPECTIVES[topicId],
  });
}

// ========== ALL_PERSPECTIVES 汇总 ==========

export const ALL_PERSPECTIVES: { [topicId: string]: TopicPerspectives } = {
  meiji: withChinesePerspective("meiji", MEIJI_PERSPECTIVES),
  french_revolution: withChinesePerspective("french_revolution", FRENCH_REVOLUTION_PERSPECTIVES),
  cold_war: withChinesePerspective("cold_war", COLD_WAR_PERSPECTIVES),
  american_revolution: withChinesePerspective("american_revolution", AMERICAN_REVOLUTION_PERSPECTIVES),
  industrial_revolution: withChinesePerspective("industrial_revolution", INDUSTRIAL_REVOLUTION_PERSPECTIVES),
  ww1: withChinesePerspective("ww1", WW1_PERSPECTIVES),
  age_of_exploration: withChinesePerspective("age_of_exploration", AGE_OF_EXPLORATION_PERSPECTIVES),
  american_civil_war: withChinesePerspective("american_civil_war", AMERICAN_CIVIL_WAR_PERSPECTIVES),
  black_death: withChinesePerspective("black_death", BLACK_DEATH_PERSPECTIVES),
  cuban_missile_crisis: withChinesePerspective("cuban_missile_crisis", CUBAN_MISSILE_CRISIS_PERSPECTIVES),
  decolonization: withChinesePerspective("decolonization", DECOLONIZATION_PERSPECTIVES),
  korean_war: withChinesePerspective("korean_war", KOREAN_WAR_PERSPECTIVES),
  mongol_empire: withChinesePerspective("mongol_empire", MONGOL_EMPIRE_PERSPECTIVES),
  reformation: withChinesePerspective("reformation", REFORMATION_PERSPECTIVES),
  renaissance: withChinesePerspective("renaissance", RENAISSANCE_PERSPECTIVES),
  roman_empire: withChinesePerspective("roman_empire", ROMAN_EMPIRE_PERSPECTIVES),
  russian_revolution: withChinesePerspective("russian_revolution", RUSSIAN_REVOLUTION_PERSPECTIVES),
  slave_trade: withChinesePerspective("slave_trade", SLAVE_TRADE_PERSPECTIVES),
  ww2: withChinesePerspective("ww2", WW2_PERSPECTIVES)
};

// ========== 跨视角思考问题 ==========

export const CROSS_PERSPECTIVE_QUESTIONS: {
  question: string;
  difficulty: "easy" | "medium" | "hard";
  relatedPerspectives: string[];
}[] = [
  {
    question: "历史上的'现代化'是否总是以某些群体的牺牲为代价？",
    difficulty: "medium",
    relatedPerspectives: ["meiji", "industrial_revolution", "age_of_exploration"],
  },
  {
    question: "革命是推动社会进步的最好方式，还是渐进改良更优？",
    difficulty: "medium",
    relatedPerspectives: ["french_revolution", "american_revolution", "meiji"],
  }
];
