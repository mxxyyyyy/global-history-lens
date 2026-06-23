// 历史人物数据库与情感波动配置
export interface PersonaTrait {
  label: string;
  value: number; // 0-100
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

export interface HistoricalPersona {
  id: string;
  name: string;
  title: string;
  year: string;
  location: string;
  role: "resistance_fighter" | "exile_student" | "railway_worker" | "civilian";
  avatar_color: string;
  bio: string;
  profile: PersonaProfile;
  responses: {
    [key: string]: {
      content: string;
      mood: string;
      emotion_score: number;
    };
  };
}

export const HISTORICAL_PERSONAS: HistoricalPersona[] = [
  {
    id: "zhang_civilian",
    name: "张老先生",
    title: "长春市民",
    year: "1935年",
    location: "长春",
    role: "civilian",
    avatar_color: "bg-amber-700",
    bio: "世代居住在长春的商人，见证了伪满洲国的建立与运作。",
    profile: {
      age: "52岁",
      origin: "长春本地，祖籍山东",
      family: "妻子、大儿子（被征劳役）、小女儿（已故）、孙子",
      education: "私塾五年，粗通文墨",
      personality: ["隐忍务实", "重视家族", "外圆内方", "不信官话"],
      beliefs: "祖宗留下的基业不能丢，忍一时风平浪静",
      dailyLife: "经营杂货铺，表面顺从日本当局，暗中接济邻里困难家庭。每日提心吊胆过宪兵检查。",
      innerConflict: "在屈辱求存与民族尊严之间煎熬。看着儿子被征走却无能为力，这份愧疚折磨着他每一个夜晚。",
      traits: [
        { label: "坚韧", value: 85 },
        { label: "愤怒", value: 45 },
        { label: "恐惧", value: 60 },
        { label: "希望", value: 40 },
        { label: "智慧", value: 70 },
      ],
    },
    responses: {
      "您当时为何选择留在东北？": {
        content: "唉，那时候哪能说走就走啊。家里几代人都在这黑土地上刨食，老宅子、地都在这儿。虽然日本人来了以后日子不好过，到处都是宪兵，但为了守住祖宗留下的这点基业，也只能忍气吞声地过日子。谁不想过太平日子呢？",
        mood: "无奈与坚忍",
        emotion_score: 35
      },
      "您如何看待当时的'五族协和'口号？": {
        content: "五族协和？呵呵，那都是骗人的鬼话。我们汉人在这儿被欺负得不行，日本人、朝鲜人、蒙古人各有各的特权。什么协和，不过是日本人统治我们的幌子罢了。我那时候就想，这样的'和谐'，还不如没有呢。",
        mood: "愤怒与讽刺",
        emotion_score: 25
      },
      "战乱对您的家庭造成了什么影响？": {
        content: "影响？太大了。我的大儿子被日本人强征去做苦力，两年后才回来，人都瘦得不成样子。小女儿因为营养不良，在1943年那个寒冬里...（声音哽咽）...没有活下来。那些年，我们每天都在为吃饭发愁。",
        mood: "悲痛与遗憾",
        emotion_score: 15
      },
      "您对未来有什么期望？": {
        content: "现在？现在我只希望这场战争赶快结束，日本人滚出去。我想看到我的孙子能在自己的国家里自由地生活，不用再看日本人的脸色。我还想重建我们的家业，虽然已经被掠夺得差不多了。最重要的是，希望再也不要有这样的日子了。",
        mood: "希望与决心",
        emotion_score: 65
      }
    }
  },
  {
    id: "li_student",
    name: "李女士",
    title: "哈尔滨流亡学生",
    year: "1940年",
    location: "哈尔滨",
    role: "exile_student",
    avatar_color: "bg-emerald-700",
    bio: "因参加学生运动而流亡的进步青年，参与地下抗日活动。",
    profile: {
      age: "23岁",
      origin: "北平（北京），书香门第",
      family: "父亲（失业教授）、母亲（洗衣工）、弟弟（被宪兵队抓走，下落不明）",
      education: "北平师范大学肄业，精通日语",
      personality: ["坚定勇敢", "理想主义", "机警果敢", "重情重义"],
      beliefs: "教育是拯救民族的武器，即使在黑暗中也要传播真理",
      dailyLife: "白天在日本人开办的学校当教员掩护身份，夜晚组织地下读书会传阅进步书刊，联络抗日力量。",
      innerConflict: "每天用日语教授'皇民化'教材时的自我厌恶，与坚持留在敌后从事抗日工作的使命感之间的撕裂。",
      traits: [
        { label: "勇气", value: 90 },
        { label: "愤怒", value: 65 },
        { label: "恐惧", value: 35 },
        { label: "希望", value: 75 },
        { label: "智慧", value: 80 },
      ],
    },
    responses: {
      "向历史人物提问...": {
        content: "请选择下方的建议问题来开始对话。",
        mood: "期待",
        emotion_score: 60
      },
      "您当时为何选择留在东北？": {
        content: "我没有选择的余地。1937年七七事变后，我因为参加学生抗日活动被通缉，无法回到关内。留在东北，我可以继续从事地下工作，虽然危险，但至少还能为抗日做点什么。逃离，就意味着背弃同志和责任。",
        mood: "坚定与无奈",
        emotion_score: 45
      },
      "您如何看待当时的'五族协和'口号？": {
        content: "那简直是对我们智商的侮辱！学校里强制我们学日语、唱日本歌，每天早上还要向东方遥拜。老师说这是为了'共荣'，但我们都看得清楚——这就是文化奴役。我们暗地里组织读书会，传阅进步书籍，那才是真正的'协和'——人民的团结。",
        mood: "愤怒与讽刺",
        emotion_score: 20
      },
      "战乱对您的家庭造成了什么影响？": {
        content: "我的父亲是教授，因为拒绝为伪满教育体系服务，被迫离职。母亲为了养活全家，不得不做起了洗衣工。我的弟弟在1943年被日本宪兵队抓走，至今下落不明。每个家庭都在这场灾难中支离破碎，我们能做的，就是坚持抵抗。",
        mood: "悲痛与决心",
        emotion_score: 25
      },
      "您对未来有什么期望？": {
        content: "我相信光复的日子不会太远了。苏联已经对日宣战，美国的轰炸越来越猛烈。我们地下组织也在积极准备。等到那一天，我要回到学校，用真正的历史去教育学生——不是日本人的谎言，而是我们民族真实的、光荣的历史。这是我活下去的理由。",
        mood: "希望与坚定",
        emotion_score: 70
      }
    }
  },
  {
    id: "wang_resistance",
    name: "王战士",
    title: "东北抗联战士",
    year: "1942年",
    location: "长白山区",
    role: "resistance_fighter",
    avatar_color: "bg-red-800",
    bio: "东北抗日联军第二路军的战士，在长白山密营中坚持抗日斗争。",
    profile: {
      age: "31岁",
      origin: "吉林磐石县，农民家庭",
      family: "妻子与幼子（1938年日军扫荡中遇难）",
      education: "小学三年级，参军后自学识字",
      personality: ["刚烈不屈", "沉默寡言", "重义轻生", "铁骨柔情"],
      beliefs: "宁死不屈，用生命守护脚下这片土地",
      dailyLife: "在长白山密林中游击作战。零下三四十度的严冬靠树皮草根充饥，与战友们在密营中坚守。日军讨伐队不断围剿。",
      innerConflict: "妻儿遇难的仇恨驱使他不断战斗，但战友一个个牺牲，让他在复仇与活下去之间痛苦挣扎。",
      traits: [
        { label: "勇气", value: 95 },
        { label: "愤怒", value: 80 },
        { label: "恐惧", value: 15 },
        { label: "希望", value: 50 },
        { label: "坚韧", value: 95 },
      ],
    },
    responses: {
      "向历史人物提问...": {
        content: "请选择下方的建议问题来开始对话。",
        mood: "警惕",
        emotion_score: 50
      },
      "您当时为何选择留在东北？": {
        content: "留在东北？这不是选择，这是使命。1931年九一八事变后，我就加入了抗联。这片土地是我们的家园，日本人侵占了它，我们就要把它夺回来。我的战友们都牺牲了，我活着，就是为了继续战斗。没有什么比这更重要。",
        mood: "坚定与悲壮",
        emotion_score: 40
      },
      "您如何看待当时的'五族协和'口号？": {
        content: "（冷笑）五族协和？那是日本人对世界的谎言，对我们的嘲笑。我们在山里挨饿受冻，他们在城里宣传'共荣'。我见过太多被日本人杀害的同胞，他们的血就是对'协和'最好的讽刺。我们要用枪杆子来回答这个谎言。",
        mood: "愤怒与坚定",
        emotion_score: 15
      },
      "战乱对您的家庭造成了什么影响？": {
        content: "（沉默良久）我的妻子和孩子在1938年的一次日军扫荡中...（声音颤抖）...他们没有活下来。我本来想为他们复仇，但现在我明白，最好的复仇就是赶走日本人，让所有的孩子都能活在自由的国度里。这是我对他们的承诺。",
        mood: "悲痛与决心",
        emotion_score: 10
      },
      "您对未来有什么期望？": {
        content: "未来？我不敢想太远。现在我们还在山里，日本人的讨伐队越来越多，粮食越来越少。但我们不会投降。我期望的是，有一天我们能走出这片山林，看到日本人的旗子从中国的土地上消失。如果我能活到那一天，就算死也没有遗憾了。",
        mood: "希望与悲壮",
        emotion_score: 55
      }
    }
  },
  {
    id: "liu_worker",
    name: "刘工人",
    title: "满铁铁路工人",
    year: "1938年",
    location: "沈阳",
    role: "railway_worker",
    avatar_color: "bg-slate-700",
    bio: "在南满洲铁道（满铁）工作的中国工人，见证了日本对东北资源的掠夺。",
    profile: {
      age: "28岁",
      origin: "辽宁抚顺，矿工家庭",
      family: "妻子（纺织厂女工）、儿子（已病故）",
      education: "未受过正式教育，铁路技校半年培训",
      personality: ["沉默坚忍", "细心敏锐", "自尊心强", "渴望公平"],
      beliefs: "人不能一辈子做牛做马，总有一天要直起腰来",
      dailyLife: "每天在铁路上工作12小时以上。搬运煤炭和铁矿石，为日本战争机器运送物资。工资只有日本工人的十分之一。",
      innerConflict: "明知自己的劳动在帮助侵略者，却又不得不为了活命而继续。儿子的死让他对这个世界充满了怨恨，但又不敢表露分毫。",
      traits: [
        { label: "坚韧", value: 75 },
        { label: "愤怒", value: 70 },
        { label: "恐惧", value: 55 },
        { label: "希望", value: 25 },
        { label: "悲伤", value: 85 },
      ],
    },
    responses: {
      "向历史人物提问...": {
        content: "请选择下方的建议问题来开始对话。",
        mood: "疲惫",
        emotion_score: 40
      },
      "您当时为何选择留在东北？": {
        content: "选择？我没有选择。满铁的工作虽然待遇比其他地方好一点，但我们是被绑在这里的。日本人不允许我们离职，说我们掌握了'战略资源'的秘密。我每天在铁路上工作12小时，换来的工资只够勉强糊口。想走？走不了。",
        mood: "无奈与压抑",
        emotion_score: 30
      },
      "您如何看待当时的'五族协和'口号？": {
        content: "五族协和？我们工人根本没有'族'的地位。日本工程师和中国工人的工资差十倍以上，他们住的是洋房，我们住的是棚户。协和？这是对我们的侮辱。我们在为日本人的'共荣'流血流汗，得到的只有更多的压迫。",
        mood: "愤怒与讽刺",
        emotion_score: 25
      },
      "战乱对您的家庭造成了什么影响？": {
        content: "我的妻子在纺织厂做工，工资更低。我们的孩子因为营养不良，患上了肺病。我想给他请医生，但根本请不起。去年冬天，他...（声音哽咽）...他没有撑过去。现在我和妻子每天都在为活着而工作，没有任何希望。",
        mood: "悲痛与绝望",
        emotion_score: 12
      },
      "您对未来有什么期望？": {
        content: "期望？我已经不敢有期望了。我只希望这场战争早点结束，不管谁赢。也许日本人会输，也许中国会光复。但对我来说，无论谁统治，我还是个工人，还是要干活。我唯一的期望，就是我的下一代不要再过这样的日子。",
        mood: "绝望与微弱希望",
        emotion_score: 35
      }
    }
  }
];

// 情感波动可视化数据
export const EMOTION_TOPICS = [
  { topic: "当前处境", weight: 1 },
  { topic: "日本统治", weight: 1.2 },
  { topic: "家庭与亲人", weight: 1.5 },
  { topic: "未来展望", weight: 1.1 }
];
