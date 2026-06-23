// ========== 接口定义 ==========

export interface SourceReference {
  id: string;
  title: string;
  author?: string;
  year: string;
  type: "official_archive" | "academic" | "media" | "memoir" | "international";
  credibilityScore: number;
  excerpt: string;
  credibilityReason: string;
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

// ========== 伪满洲国视角 ==========

export const MANCHUKUO_PERSPECTIVES: TopicPerspectives = {
  china: {
    title: "中国视角",
    content:
      "1932年伪满洲国的建立是日本帝国主义侵略中国东北的产物。九一八事变后，日本关东军扶植末代皇帝溥仪建立傀儡政权，对东北进行殖民统治和经济掠夺。东北人民在中国共产党领导下组建抗日联军，进行了长达十四年的艰苦抗战。",
    sources: [
      {
        id: "mk-cn-1",
        title: "《九一八事变史》",
        author: "中国社会科学院近代史研究所",
        year: "1991",
        type: "academic",
        credibilityScore: 82,
        excerpt: "日本关东军蓄意制造柳条湖事件，以此为借口发动侵略战争。",
        credibilityReason: "学术机构研究成果，引用大量原始档案，但部分叙述带有民族主义倾向。",
      },
      {
        id: "mk-cn-2",
        title: "《东北抗日联军史》",
        author: "中共中央党史研究室",
        year: "2005",
        type: "official_archive",
        credibilityScore: 78,
        excerpt: "抗联将士在极端艰苦条件下坚持斗争，体现了中华民族不屈不挠的抗争精神。",
        credibilityReason: "官方史料，文献详实，但作为党史出版物存在政治叙事框架。",
      },
    ],
    overallCredibility: 80,
    credibilityAssessment:
      "中国视角基于大量历史文献和亲历者证词，基本事实可靠，但在评价体系上受民族主义叙事影响，对日方动机的分析可能过于简化。",
    biasIndicators: [
      "民族主义叙事框架可能简化复杂的历史动因",
      "对伪满时期经济建设的评价倾向于全面否定",
      "抗联历史可能存在英雄化叙事倾向",
    ],
    recommendedQuestions: [
      "伪满时期东北的工业化是否对当地产生了客观影响？",
      "普通东北民众的日常生活究竟如何？",
    ],
  },
  japan: {
    title: "日本视角",
    content:
      "日本方面长期存在将伪满洲国描述为'满蒙独立运动'产物的论述。部分学者认为满洲国是日本为解决国内经济危机和对抗苏联威胁而推动的'大陆政策'的产物，但也有学者开始反思这段殖民历史的侵略本质。",
    sources: [
      {
        id: "mk-jp-1",
        title: "《满洲事变と国際連盟》",
        author: "入江昭",
        year: "1981",
        type: "academic",
        credibilityScore: 85,
        excerpt: "满洲事变是日本军部独走的结果，但也反映了日本社会深层的大陆扩张欲望。",
        credibilityReason: "国际学者视角，同时使用日本和国际档案，分析较为客观。",
      },
      {
        id: "mk-jp-2",
        title: "《昭和史》",
        author: "半藤一利",
        year: "2004",
        type: "academic",
        credibilityScore: 80,
        excerpt: "关东军的行动超越了东京政府的控制，但政府最终选择了追认。",
        credibilityReason: "日本知名历史学家著作，较为客观但仍受日本学界视角局限。",
      },
    ],
    overallCredibility: 75,
    credibilityAssessment:
      "日本学界对伪满历史的研究逐渐趋向反思和客观，但仍有部分论述淡化侵略性质。优秀的日本学者提供了关于决策过程的珍贵视角。",
    biasIndicators: [
      "部分论述仍使用'满洲国'而非'伪满洲国'，暗示某种合法性",
      "对殖民统治的破坏性评价可能不够充分",
      "倾向于将责任归咎于军部而非国家整体",
    ],
    recommendedQuestions: [
      "日本国内对侵略战争的反思是否充分？",
      "关东军的'独走'与政府的'追认'哪个更值得关注？",
    ],
  },
  international: {
    title: "国际/国联视角",
    content:
      "国际联盟于1931年12月任命由英、美、法、德、意五国组成的李顿调查团赴东北实地调查。1932年10月公布的《李顿报告》明确指出：日本军事行动并非合法自卫，满洲国并非当地人民自发运动，而是日本军事占领和操纵的结果。1933年2月24日，国联大会以42票赞成、1票反对通过该报告，要求日本撤军。日本随即退席并于3月27日正式退出国联。",
    sources: [
      {
        id: "mk-intl-1",
        title: "Lytton Report (李顿调查团报告)",
        author: "League of Nations Commission of Enquiry",
        year: "1932",
        type: "international",
        credibilityScore: 90,
        excerpt:
          "调查团认定，满洲国并非出于当地人民的自发运动，而是日本军事行动的结果。",
        credibilityReason:
          "国际调查机构的第一手报告，基于长达数月的实地考察和大量证据，包括1500余封中文来信和400余封俄文来信。",
      },
      {
        id: "mk-intl-2",
        title: "League of Nations Covenant and Assembly Records",
        author: "League of Nations",
        year: "1931-1933",
        type: "official_archive",
        credibilityScore: 92,
        excerpt:
          "1933年2月24日，国联大会以42票赞成、1票反对通过李顿报告，要求日本将满洲归还中国。",
        credibilityReason:
          "国际联盟官方档案，记录投票结果和各国立场，是研究集体安全机制失效的一手材料。",
      },
      {
        id: "mk-intl-3",
        title: "Japan's Total Empire: Manchuria and the Culture of Wartime Imperialism",
        author: "Louise Young",
        year: "1998",
        type: "academic",
        credibilityScore: 90,
        excerpt:
          "满洲国是日本'总力战'体制的试验场，其建设服务于日本帝国的整体战略。",
        credibilityReason: "美国学者使用多国档案，分析深入全面，被学界广泛引用。",
      },
    ],
    overallCredibility: 89,
    credibilityAssessment:
      "国际/国联视角基于第一手调查报告和官方档案，对事件性质的判断较为客观。但其局限性在于：国联未能采取有效行动制止日本，反映了当时国际政治的现实主义逻辑而非理想主义。",
    biasIndicators: [
      "西方调查团对东亚社会内部状况的理解存在局限",
      "报告提出的'国际共管'方案忽视中国主权完整",
      "国联行动受制于大国政治利益",
    ],
    recommendedQuestions: [
      "国际联盟为何未能阻止日本的侵略行为？",
      "李顿报告对满洲国性质的认定为何具有历史意义？",
      "如果国联对日本实施有效制裁，历史是否会不同？",
    ],
  },
  usa: {
    title: "美国视角",
    content:
      "美国视角强调日本军国主义势力的崛起和大萧条背景下的对外扩张。美国教科书将满洲事变描述为日本军部绕过文官政府、为获取铁煤资源和市场而发动的侵略。美国政府在1932年1月7日由国务卿史汀生发出照会，宣布'不承认'任何违反条约权利和'门户开放'政策的既成事实，即'史汀生主义'。然而，受孤立主义影响，美国未加入国联，也未对日本采取军事或经济制裁。",
    sources: [
      {
        id: "mk-us-1",
        title: "World History: Patterns of Interaction",
        author: "McDougal Littell / Houghton Mifflin",
        year: "2009",
        type: "academic",
        credibilityScore: 78,
        excerpt:
          "1931年，日本军队占领了满洲，尽管日本议会反对。随后军队建立了傀儡政府。日本工程师和技术人员开始大量抵达，建造矿山和工厂。",
        credibilityReason:
          "美国中学历史教科书，反映美国主流教育体系对事件的叙述框架，简明但可能过于简化。",
      },
      {
        id: "mk-us-2",
        title: "Stimson Doctrine Non-Recognition Note",
        author: "Henry L. Stimson, U.S. Secretary of State",
        year: "1932",
        type: "official_archive",
        credibilityScore: 90,
        excerpt:
          "美国政府不能承认任何既成事实的合法性，也不能承认任何可能损害美国及其公民在华条约权益的条约或协定。",
        credibilityReason:
          "美国国务院正式外交文件，确立了美国不承认伪满洲国的立场，具有重要法理意义。",
      },
      {
        id: "mk-us-3",
        title: "Japanese Imperialism in Manchuria",
        author: "L. Magyar",
        year: "1932",
        type: "media",
        credibilityScore: 75,
        excerpt:
          "满洲所有的经济主导权都掌握在日本帝国主义手中。日本资本控制着对外贸易、主要铁路、最好的煤矿、现代化钢铁厂。",
        credibilityReason:
          "当代左翼报刊分析，提供了对日本经济扩张的批判视角，但带有明确的意识形态立场。",
      },
    ],
    overallCredibility: 82,
    credibilityAssessment:
      "美国视角提供了关于日本决策动机和美国外交反应的重要记录，'史汀生主义'成为国际不承认伪满的重要法理基础。但美国当时奉行孤立主义，未采取实质性行动制止日本，其口头谴责与实际政策之间存在明显差距。",
    biasIndicators: [
      "教科书叙事可能过度强调日本军部'独走'，淡化国家整体责任",
      "孤立主义叙事可能为美国不干预开脱",
      "'门户开放'政策背后有美国经济利益考量",
    ],
    recommendedQuestions: [
      "史汀生主义为何没有伴以军事或经济制裁？",
      "美国'门户开放'政策如何影响了对满洲危机的反应？",
      "如果美国在1932年采取更强硬立场，日本会否退却？",
    ],
  },
  britain: {
    title: "英国视角",
    content:
      "英国视角高度关注国际联盟的软弱和英国自身的利益计算。英国教科书指出，1931-1933年的满洲危机是对国联集体安全机制的严重考验。李顿调查团的报告详尽客观，结论明确：日本行为不合法，满洲应归还中国。然而，英国和法国在大萧条中无力也不愿对日本实施经济制裁，更不愿冒险与日本开战。英国似乎更热衷于维持对日良好关系，国联最终无能为力。日本未受惩罚退出的结果，被希特勒和墨索里尼密切关注。",
    sources: [
      {
        id: "mk-uk-1",
        title: "AQA GCSE History: Understanding the Modern World",
        author: "AQA / Oxford University Press",
        year: "2016",
        type: "academic",
        credibilityScore: 79,
        excerpt:
          "国联无能为力。它讨论了实施经济制裁，但美国作为日本的主要贸易伙伴不参与的话，制裁将毫无意义。此外，英国似乎更热衷于与日本保持良好关系。",
        credibilityReason:
          "英国中学历史教科书，反映英国主流教育对国联失败和本国政策的反思。",
      },
      {
        id: "mk-uk-2",
        title: "Cambridge International AS Level International History 1871-1945",
        author: "Cambridge University Press",
        year: "2014",
        type: "academic",
        credibilityScore: 82,
        excerpt:
          "根据《国际联盟盟约》条款，国际联盟本应对日本采取行动。然而，在全球大萧条最严重的时候，英国和法国无力对日本实施经济制裁，而且两国都不愿因这一问题发动战争。",
        credibilityReason:
          "国际课程教材，较为平衡地分析了国联失败的结构性原因和英国的政策选择。",
      },
      {
        id: "mk-uk-3",
        title: "Oxford AQA History for GCSE: Conflict and Tension 1918-1939",
        author: "Oxford University Press",
        year: "2016",
        type: "academic",
        credibilityScore: 80,
        excerpt:
          "李顿报告得出结论：日本是过错方。即使南满铁路曾遭攻击，日本的反应也过度了，不应入侵。",
        credibilityReason:
          "英国GCSE教材，简明呈现李顿调查团结论，适合基础历史教育。",
      },
    ],
    overallCredibility: 81,
    credibilityAssessment:
      "英国视角对国联失败和英国政策选择的反思较为坦率，承认英国因经济困难和战略顾虑未能有效制止日本。这种自我批评性的叙述有助于理解绥靖政策的早期根源。但英国视角有时可能过度强调国联机制本身的缺陷，而淡化大国自私的决策。",
    biasIndicators: [
      "可能为英国不制裁日本的政策进行合理化",
      "强调国联机制缺陷，转移对大国责任的批评",
      "对李顿报告的国际法意义评价可能不足",
    ],
    recommendedQuestions: [
      "英国为何不愿对日本实施经济制裁？",
      "满洲危机中英国的政策选择是否预示了后来的绥靖主义？",
      "李顿报告如果得到英国更强硬支持，结果会否不同？",
    ],
  },
};

// ========== 鸦片战争视角 ==========

const OPIUM_WAR_PERSPECTIVES: TopicPerspectives = {
  china: {
    title: "中国视角",
    content:
      "鸦片战争是西方列强对中国发动的侵略战争，标志着中国近代屈辱史的开端。英国为保护非法鸦片贸易利益，悍然发动战争，迫使清政府签订丧权辱国的《南京条约》，开启了中国半殖民地化进程。林则徐的禁烟运动体现了中华民族反抗外来侵略的正义精神。",
    sources: [
      {
        id: "ow-cn-1",
        title: "《鸦片战争》",
        author: "茅海建",
        year: "1995",
        type: "academic",
        credibilityScore: 88,
        excerpt: "清朝在军事技术和制度上的全面落后，是战败的根本原因。",
        credibilityReason: "中国学界经典著作，史料详实，分析客观深入。",
      },
    ],
    overallCredibility: 82,
    credibilityAssessment: "中国视角将鸦片战争定性为侵略战争，基本事实准确，但'百年屈辱'叙事可能过度简化了清朝自身的问题。",
    biasIndicators: ["'百年屈辱'叙事框架影响", "对清朝自身腐败的反思可能不够", "倾向于将鸦片战争与近代所有不平等关联"],
    recommendedQuestions: ["清朝自身的制度问题在战争中扮演了什么角色？", "如果没有鸦片问题，中英冲突是否可以避免？"],
  },
  britain: {
    title: "英国视角",
    content:
      "英国方面将鸦片战争定义为'贸易战争'或'通商战争'，强调英国追求的是自由贸易权利和外交平等。英国认为清政府的闭关锁国政策和对英国商人的不公正待遇是冲突的根源，鸦片只是导火索而非根本原因。",
    sources: [
      {
        id: "ow-uk-1",
        title: "The Opium War: Drugs, Dreams and the Making of Modern China",
        author: "Julia Lovell",
        year: "2011",
        type: "academic",
        credibilityScore: 85,
        excerpt: "鸦片战争既是一场帝国主义冲突，也是两种世界观的碰撞。",
        credibilityReason: "英国学者使用中英双方档案，视角较为平衡。",
      },
    ],
    overallCredibility: 72,
    credibilityAssessment: "英国视角提供了关于贸易和外交的重要背景，但'自由贸易'叙事有为鸦片贸易辩护之嫌。",
    biasIndicators: ["将鸦片贸易包装为'自由贸易'", "淡化鸦片对中国社会的破坏", "殖民主义视角残余"],
    recommendedQuestions: ["'自由贸易'能否为鸦片贸易正名？", "英国议会中反战声音为何未能阻止战争？"],
  },
  international: {
    title: "国际视角",
    content:
      "国际学界普遍将鸦片战争视为全球化早期阶段东西方文明碰撞的标志性事件。战争暴露了农业文明面对工业文明时的脆弱性，同时也揭示了早期自由贸易理念中的帝国主义本质。",
    sources: [
      {
        id: "ow-intl-1",
        title: "The Cambridge History of China, Vol. 10",
        author: "John K. Fairbank",
        year: "1978",
        type: "academic",
        credibilityScore: 86,
        excerpt: "鸦片战争代表了两种不同国际秩序观念的冲突。",
        credibilityReason: "费正清学派的代表作，综合性强但部分观点已被后来研究修正。",
      },
    ],
    overallCredibility: 84,
    credibilityAssessment: "国际视角提供了超越中英双边关系的宏观分析框架，但不同学派之间存在显著分歧。",
    biasIndicators: ["早期'冲击-回应'模式过于简化中国能动性", "西方中心论残余", "部分学者对中国内部视角理解不足"],
    recommendedQuestions: ["'冲击-回应'模式是否低估了中国自身的现代化动力？", "鸦片战争的全球影响超越了中英关系吗？"],
  },
};

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
  china: {
    title: "中国视角",
    content:
      "中国视角下的明治维新常与中国自身的洋务运动和戊戌变法对比。中日维新'一成一败'的结果引发了深刻反思：为何同样面对西方冲击，日本能够成功转型而中国未能做到？甲午战争的惨败更使这一对比刻骨铭心。",
    sources: [
      {
        id: "mj-cn-1",
        title: "《中日近代化比较研究》",
        author: "汤重南",
        year: "2002",
        type: "academic",
        credibilityScore: 80,
        excerpt: "中日维新的不同结局根源于两国政治体制和社会结构的差异。",
        credibilityReason: "比较研究视角，分析较为系统但受中国学术传统影响。",
      },
    ],
    overallCredibility: 78,
    credibilityAssessment: "中国视角提供了有价值的比较分析，但可能过度简化了两国不同的历史条件。",
    biasIndicators: ["'为何中国不能'的问题设定本身带有预设", "对明治维新的负面后果关注不足", "比较框架可能忽略各自独特性"],
    recommendedQuestions: ["中日维新的比较是否公平？两国的起点是否可比？", "甲午战争的结果是否完全由维新成败决定？"],
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
  },
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

// ========== 丝绸之路视角 ==========

const SILK_ROAD_PERSPECTIVES: TopicPerspectives = {
  china: {
    title: "中国视角",
    content:
      "中国视角强调丝绸之路是中华文明向西方传播先进技术和文化的重要通道。张骞'凿空'西域开辟了这条伟大的贸易和文化交流之路，丝绸、瓷器、造纸术和火药等通过这条路线传向世界。",
    sources: [
      {
        id: "sr-cn-1",
        title: "《丝绸之路：一部全新的世界史》中文版导读",
        author: "荣新江",
        year: "2016",
        type: "academic",
        credibilityScore: 83,
        excerpt: "丝绸之路不仅是商路，更是文明交汇的走廊。",
        credibilityReason: "北京大学丝路研究权威学者，考古与文献并重。",
      },
    ],
    overallCredibility: 79,
    credibilityAssessment: "中国视角提供了丰富的东端视角，但可能过度强调中国在丝路中的主导地位。",
    biasIndicators: ["倾向于强调中国文明的输出而非双向交流", "与当代'一带一路'倡议的关联可能影响叙事", "对中亚民族的主体性关注不足"],
    recommendedQuestions: ["丝绸之路上中国是否只是输出方？", "当代'一带一路'叙事如何影响了对古代丝路的理解？"],
  },
  central_asia: {
    title: "中亚视角",
    content:
      "中亚并非丝绸之路的被动过境地带，而是重要的文化创造和商业中心。粟特人作为丝路上最活跃的商人群体，建立了横跨欧亚的商业网络。撒马尔罕、布哈拉等城市是重要的文明交汇点。",
    sources: [
      {
        id: "sr-ca-1",
        title: "The Silk Road: A Very Short Introduction",
        author: "James A. Millward",
        year: "2013",
        type: "academic",
        credibilityScore: 85,
        excerpt: "丝绸之路的真正主角是中亚的商人、僧侣和旅行者。",
        credibilityReason: "中亚研究专家，挑战了以中国为中心的丝路叙事。",
      },
    ],
    overallCredibility: 82,
    credibilityAssessment: "中亚视角有效地纠正了以两端（中国/罗马）为中心的叙事，但相关原始文献较少。",
    biasIndicators: ["可用的原始文献相对有限", "部分内容依赖考古推测", "现代中亚民族主义可能影响历史叙事"],
    recommendedQuestions: ["粟特人为何能主导丝路贸易长达数个世纪？", "中亚城市在丝路网络中的作用被低估了吗？"],
  },
  western: {
    title: "西方视角",
    content:
      "西方学者将丝绸之路视为古代全球化的典范，强调东西方之间的双向交流。罗马帝国对中国丝绸的需求、宗教（佛教、伊斯兰教、景教）的传播、以及技术和疾病的流动，共同构成了一幅复杂的交流图景。",
    sources: [
      {
        id: "sr-w-1",
        title: "The Silk Roads: A New History of the World",
        author: "Peter Frankopan",
        year: "2015",
        type: "academic",
        credibilityScore: 86,
        excerpt: "数千年来，世界的十字路口不在西方，而在东方。",
        credibilityReason: "牛津大学学者的畅销学术著作，视野宏大但部分论述被批评过于概括。",
      },
    ],
    overallCredibility: 83,
    credibilityAssessment: "西方视角提供了全球性的分析框架，近年来显著改善了早期的欧洲中心论倾向。",
    biasIndicators: ["'丝绸之路'这一概念本身是19世纪德国地理学家的建构", "可能过度浪漫化古代贸易", "对东方社会的内部视角理解有限"],
    recommendedQuestions: ["'丝绸之路'这个概念是否准确反映了历史现实？", "古代全球化与现代全球化有何异同？"],
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
  },
  chinese: {
    title: "中国视角",
    content:
      "中国以战胜国身份参加巴黎和会，却未能收回山东权益，反而被要求将德国在山东的特权转让给日本。这一外交失败直接引发了五四运动，成为中国现代民族主义觉醒的关键节点，深刻改变了中国的政治走向。",
    sources: [
      {
        id: "ww1-cn-1",
        title: "《巴黎和会与中国外交》",
        author: "唐启华",
        year: "2014",
        type: "academic",
        credibilityScore: 85,
        excerpt: "巴黎和会的失败不仅是外交的挫折，更是旧秩序的破产。",
        credibilityReason: "使用中国和国际档案的学术研究，分析较为全面。",
      },
    ],
    overallCredibility: 83,
    credibilityAssessment: "中国视角记录了一战对中国的深远影响，但可能过度聚焦山东问题而忽视战争的全球维度。",
    biasIndicators: ["五四叙事的政治化", "对中国参战贡献的评价可能被放大", "民族主义情感影响历史分析"],
    recommendedQuestions: ["中国十四万华工的贡献为何长期被忽视？", "五四运动是否改变了中国的历史轨迹？"],
  },
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
  },
  chinese: {
    title: "中国视角",
    content:
      "郑和下西洋（1405-1433）早于哥伦布数十年，其舰队规模远超欧洲航海家。然而，明朝选择了'禁海'而非扩张。中国视角常将郑和与哥伦布对比，探讨为何中国未走上殖民扩张道路，以及这一选择的历史意义。",
    sources: [
      {
        id: "ae-cn-1",
        title: "When China Ruled the Seas",
        author: "Louise Levathes",
        year: "1994",
        type: "academic",
        credibilityScore: 82,
        excerpt: "郑和的航行是和平外交和贸易的使命，而非征服。",
        credibilityReason: "使用中国和东南亚资料的综合研究，但部分结论有争议。",
      },
    ],
    overallCredibility: 77,
    credibilityAssessment: "中国视角提供了重要的比较框架，但'和平航海'叙事可能过于理想化郑和的远航动机。",
    biasIndicators: ["郑和航海的'和平'性质可能被夸大", "中国禁海政策的内部原因分析不足", "民族自豪感影响客观评价"],
    recommendedQuestions: ["郑和航海真的是完全'和平'的吗？", "如果明朝继续航海，世界历史会怎样改变？"],
  },
};

// ========== ALL_PERSPECTIVES 汇总 ==========

export const ALL_PERSPECTIVES: { [topicId: string]: TopicPerspectives } = {
  manchukuo: MANCHUKUO_PERSPECTIVES,
  opium_war: OPIUM_WAR_PERSPECTIVES,
  meiji: MEIJI_PERSPECTIVES,
  french_revolution: FRENCH_REVOLUTION_PERSPECTIVES,
  cold_war: COLD_WAR_PERSPECTIVES,
  silk_road: SILK_ROAD_PERSPECTIVES,
  american_revolution: AMERICAN_REVOLUTION_PERSPECTIVES,
  industrial_revolution: INDUSTRIAL_REVOLUTION_PERSPECTIVES,
  ww1: WW1_PERSPECTIVES,
  age_of_exploration: AGE_OF_EXPLORATION_PERSPECTIVES,
};

// ========== 跨视角思考问题 ==========

export const CROSS_PERSPECTIVE_QUESTIONS: {
  question: string;
  difficulty: "easy" | "medium" | "hard";
  relatedPerspectives: string[];
}[] = [
  {
    question: "为什么同一事件在不同国家的教科书中会有截然不同的描述？",
    difficulty: "easy",
    relatedPerspectives: ["manchukuo", "opium_war", "ww1"],
  },
  {
    question: "历史上的'现代化'是否总是以某些群体的牺牲为代价？",
    difficulty: "medium",
    relatedPerspectives: ["meiji", "industrial_revolution", "age_of_exploration"],
  },
  {
    question: "革命是推动社会进步的最好方式，还是渐进改良更优？",
    difficulty: "medium",
    relatedPerspectives: ["french_revolution", "american_revolution", "meiji"],
  },
  {
    question: "如何区分'文明交流'和'文化侵略'？",
    difficulty: "hard",
    relatedPerspectives: ["silk_road", "age_of_exploration", "opium_war"],
  },
  {
    question: "战胜国书写的历史是否可信？如何识别胜利者叙事中的偏见？",
    difficulty: "hard",
    relatedPerspectives: ["ww1", "cold_war", "manchukuo"],
  },
  {
    question: "一个国家的'崛起'是否必然意味着另一个国家的'衰落'？",
    difficulty: "medium",
    relatedPerspectives: ["meiji", "opium_war", "cold_war"],
  },
  {
    question: "殖民主义的'现代化遗产'能否为殖民统治正名？",
    difficulty: "hard",
    relatedPerspectives: ["manchukuo", "industrial_revolution", "age_of_exploration"],
  },
  {
    question: "为什么有些国家更容易接受历史反思，而另一些国家则更抗拒？",
    difficulty: "medium",
    relatedPerspectives: ["ww1", "manchukuo", "age_of_exploration"],
  },
];
