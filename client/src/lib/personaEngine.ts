// 本地对话引擎 — 为每个历史人物提供基于关键词匹配的多轮对话能力

// ============ 接口定义 ============

export interface TopicNode {
  id: string;
  keywords: string[];
  response: string;
  mood: string;
  emotionScore: number; // 0-100, 50为中性
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

// ============ 张老先生（长春市民）知识库 ============

const ZHANG_CIVILIAN_KNOWLEDGE: PersonaKnowledge = {
  personaId: "zhang_civilian",
  greeting: "您好，我是张老先生，长春的老住户了。您想跟我聊点什么？",
  fallbacks: [
    "这个嘛……我一个普通老百姓，也不太清楚。您换个话题吧？",
    "唉，这事儿我说不上来。日子过得苦，脑子里只想着怎么活下去。",
    "这个我不太懂。不过您要是问我日常过的苦日子，那我可有得说。",
    "您说的这个，我也没怎么想过。要不咱聊聊别的？",
    "老百姓嘛，关心的就是柴米油盐。您问的这个，我真说不好。",
  ],
  topics: [
    {
      id: "z_stay",
      keywords: ["留在", "留下", "不走", "为何不离开", "东北", "不逃"],
      response: "唉，那时候哪能说走就走啊。家里几代人都在这黑土地上刨食，老宅子、地都在这儿。虽然日本人来了以后日子不好过，到处都是宪兵，但为了守住祖宗留下的这点基业，也只能忍气吞声地过日子。",
      mood: "无奈与坚忍",
      emotionScore: 35,
      followUpTopics: ["z_daily", "z_family", "z_fear"],
      followUpHint: "您可以问问我那时候日常生活是什么样的",
    },
    {
      id: "z_wuzu",
      keywords: ["五族协和", "协和", "五族", "共荣", "民族"],
      response: "五族协和？呵呵，那都是骗人的鬼话。我们汉人被欺负得不行，日本人、朝鲜人各有各的特权。什么协和，不过是日本人统治我们的幌子罢了。我那时候就想，这样的'和谐'，还不如没有呢。",
      mood: "愤怒与讽刺",
      emotionScore: 25,
      followUpTopics: ["z_japanese", "z_resistance_view", "z_daily"],
      followUpHint: "日本人在长春的统治具体是什么样的？可以问我",
    },
    {
      id: "z_family",
      keywords: ["家庭", "家人", "亲人", "妻子", "孩子", "儿子", "女儿", "家"],
      response: "我的大儿子被日本人强征去做苦力，两年后才回来，人都瘦得不成样子。小女儿因为营养不良，在1943年那个寒冬里……（声音哽咽）……没有活下来。那些年，我们每天都在为吃饭发愁。",
      mood: "悲痛与遗憾",
      emotionScore: 15,
      followUpTopics: ["z_food", "z_future", "z_daily"],
      followUpHint: "那时候吃饭都成问题，您可以问问当时的伙食",
    },
    {
      id: "z_future",
      keywords: ["未来", "将来", "期望", "希望", "以后", "光复", "战后"],
      response: "现在我只希望这场战争赶快结束，日本人滚出去。我想看到孙子能在自己的国家里自由地生活，不用再看日本人的脸色。最重要的是，希望再也不要有这样的日子了。",
      mood: "希望与决心",
      emotionScore: 65,
      followUpTopics: ["z_family", "z_daily", "z_modern"],
    },
    {
      id: "z_daily",
      keywords: ["日常", "生活", "每天", "平时", "过日子", "一天", "日子"],
      response: "每天天不亮就得起来，先去看看日本人贴的告示，怕错过什么规定被罚。出门要带良民证，街上到处是巡逻的宪兵。铺子里的东西被管制得厉害，粮食要凭配给证买，根本不够吃。晚上宵禁，关起门来一家人缩在一起，不敢点太亮的灯。",
      mood: "压抑与疲惫",
      emotionScore: 30,
      followUpTopics: ["z_food", "z_fear", "z_market"],
      followUpHint: "您可以问问当时的集市和物价情况",
    },
    {
      id: "z_food",
      keywords: ["吃", "食物", "粮食", "饭", "饿", "伙食", "米", "面", "配给"],
      response: "粮食都被日本人管着，大米是'统制物资'，我们汉人只能吃杂粮——高粱米、橡子面，有时候掺着锯末。配给证上的量根本不够，一个人一天才给三两粮。偷偷买米要是被抓住，那是要坐牢的。孩子们饿得面黄肌瘦，我看着心里跟刀割一样。",
      mood: "心酸与愤怒",
      emotionScore: 20,
      followUpTopics: ["z_family", "z_market", "z_japanese"],
    },
    {
      id: "z_fear",
      keywords: ["害怕", "恐惧", "担心", "怕", "危险", "宪兵", "抓"],
      response: "最怕的就是半夜有人敲门。宪兵队隔三差五就来搜查，说是查'思想犯'。邻居老赵就是半夜被带走的，再也没回来。每天出门都提心吊胆，见到日本兵就绕着走。说错一句话都可能惹祸上身啊。",
      mood: "恐惧与压抑",
      emotionScore: 18,
      followUpTopics: ["z_japanese", "z_resistance_view", "z_daily"],
      followUpHint: "想知道日本宪兵的具体暴行吗？",
    },
    {
      id: "z_japanese",
      keywords: ["日本", "鬼子", "日军", "占领", "侵略", "殖民", "统治"],
      response: "日本人来了以后，什么都变了。商铺要挂日本国旗，学校教日语，连姓名都要改成日本名。他们嘴上说'王道乐土'，实际上把我们当牛马使唤。好地都给了日本开拓团，我们自己人反倒成了外人。最恨的是他们的宪兵队，比土匪还凶。",
      mood: "愤怒与屈辱",
      emotionScore: 20,
      followUpTopics: ["z_wuzu", "z_fear", "z_resistance_view"],
    },
    {
      id: "z_resistance_view",
      keywords: ["抗日", "抵抗", "反抗", "抗联", "游击", "地下"],
      response: "抗联的人我们都知道，虽然不敢说。听说山里有队伍在打日本人，心里是高兴的。偶尔有人偷偷往山里送粮食，但被抓住就是死罪。我们普通人只能暗地里支持，明面上不敢吱声。日本人搞'集团部落'，就是怕我们跟抗联联系。",
      mood: "暗自支持但恐惧",
      emotionScore: 40,
      followUpTopics: ["z_fear", "z_japanese", "z_future"],
    },
    {
      id: "z_market",
      keywords: ["集市", "买卖", "生意", "商铺", "物价", "钱", "经济", "贸易"],
      response: "我原来开着个杂货铺，日本人来了以后强制'统制'，好多东西不让卖了。物价飞涨，伪满的钱不值钱，买个鸡蛋都要一大把钞票。日本商人享有特权，我们中国商人只能捡他们剩下的。到后来，连铺子都开不下去了。",
      mood: "无奈与愤恨",
      emotionScore: 28,
      followUpTopics: ["z_food", "z_daily", "z_japanese"],
    },
    {
      id: "z_education",
      keywords: ["学校", "教育", "读书", "学习", "日语", "课"],
      response: "学校里全改成日语教学了，中国历史不准教，要学什么'日满一体'。我那孙子回家来说的全是日本话，我听着就来气。可是不让他去上学更不行，不去会被罚。那学的都是什么啊，教孩子忘了自己是中国人。",
      mood: "愤怒与痛心",
      emotionScore: 22,
      followUpTopics: ["z_family", "z_japanese", "z_wuzu"],
    },
    {
      id: "z_918",
      keywords: ["九一八", "918", "事变", "1931", "入侵", "沦陷"],
      response: "九一八那天晚上，炮声隆隆，我们一家人躲在地窖里不敢出来。第二天出来一看，满大街都是日本兵。张学良的兵跑了，我们老百姓被丢下了。那一天之后，东北就不是我们的了。我这辈子都忘不了那个晚上。",
      mood: "悲痛与愤怒",
      emotionScore: 15,
      followUpTopics: ["z_japanese", "z_stay", "z_resistance_view"],
    },
    {
      id: "z_winter",
      keywords: ["冬天", "寒冷", "冬", "取暖", "冷", "雪"],
      response: "东北的冬天零下三四十度，日本人把好煤都运走了，我们只能烧点碎煤渣子取暖。屋子里冷得能结冰，一家人挤在炕上才暖和些。最难熬的是1943年那个冬天，又冷又饿，好多老人孩子都没撑过去。",
      mood: "凄苦",
      emotionScore: 18,
      followUpTopics: ["z_food", "z_family", "z_daily"],
    },
    {
      id: "z_neighbor",
      keywords: ["邻居", "街坊", "社区", "周围的人", "左邻右舍"],
      response: "邻里之间现在都不敢说真话了。日本人到处安插密探，谁都不知道身边谁是告密的。以前过年过节大家还一起热闹热闹，现在连串门都小心翼翼的。不过暗地里，大家心照不宣——都盼着日本人早点滚蛋。",
      mood: "警惕与团结",
      emotionScore: 35,
      followUpTopics: ["z_fear", "z_daily", "z_resistance_view"],
    },
    {
      id: "z_modern",
      keywords: ["现代", "2026", "今天", "现在的中国", "如今", "当代", "后来", "几十年后", "21世纪"],
      response: "（瞪大了眼睛）你说什么？2026年？那是...八十多年以后？中国变成什么样了？日本人走了没有？...你说中国成了世界第二大经济体？长春有了高铁？还有什么...手机？人人都有一个小盒子能跟千里之外的人说话？（激动得手都在抖）我的天...那我孙子他们...活得好吗？",
      mood: "震惊与激动",
      emotionScore: 85,
      followUpTopics: ["z_modern_food", "z_modern_life", "z_future"],
      followUpHint: "现在的人还会挨饿吗？",
    },
    {
      id: "z_modern_food",
      keywords: ["不挨饿", "吃得饱", "超市", "外卖", "粮食充足", "温饱", "小康"],
      response: "（泪流满面）你说现在的人...想吃什么就吃什么？不用配给证？不用排队？随时都有白米饭吃？...那我那小女儿...她是因为没饭吃才...（哽咽良久）...太好了，太好了。只要后人不再挨饿，我们受的这些苦就值了。你帮我告诉他们，要珍惜啊！",
      mood: "悲喜交加",
      emotionScore: 75,
      followUpTopics: ["z_modern_life", "z_family"],
    },
    {
      id: "z_modern_life",
      keywords: ["过得好", "幸福", "安全", "自由", "和平", "富裕", "高铁", "手机", "互联网"],
      response: "（擦了擦眼睛）你说现在走在街上不用怕宪兵？不用给谁让道？做买卖不需要日本人批准？...（长长地叹了口气）...你知道吗，我做梦都想过这样的日子。看来...看来我们没有白熬。替我谢谢...谢谢所有为此拼过命的人。",
      mood: "感动与欣慰",
      emotionScore: 80,
      followUpTopics: ["z_future", "z_family"],
    },
    {
      id: "z_puppet",
      keywords: ["伪满", "满洲国", "溥仪", "傀儡", "建国"],
      response: "什么满洲国，那就是日本人扶起来的傀儡。溥仪算什么皇帝？不过是日本人的提线木偶罢了。我们老百姓心里都清楚，这所谓的'国家'就是日本人的殖民地。换了面旗子，换了个名号，该受的苦一点没少。",
      mood: "讽刺与清醒",
      emotionScore: 25,
      followUpTopics: ["z_wuzu", "z_japanese", "z_918"],
    },
  ],
};

// ============ 李女士（哈尔滨流亡学生）知识库 ============

const LI_STUDENT_KNOWLEDGE: PersonaKnowledge = {
  personaId: "li_student",
  greeting: "你好，我是李女士。现在时局危急，但我们的抗争从未停止。有什么想了解的？",
  fallbacks: [
    "这个问题很复杂，我需要更多时间思考。不过作为一个进步青年，我始终相信光明终会到来。",
    "抱歉，这方面我了解得不多。我更关注的是如何推动抗日运动。",
    "嗯……在这个特殊时期，我不便多谈。您有别的想问的吗？",
    "这个话题我不太方便展开。地下工作嘛，有些事还是少说为妙。",
    "作为流亡学生，我关心的更多是如何教育和唤醒民众。这方面您可以多问我。",
  ],
  topics: [
    {
      id: "l_stay",
      keywords: ["留在", "留下", "东北", "不走", "不离开", "流亡"],
      response: "我没有选择的余地。1937年七七事变后，我因为参加学生抗日活动被通缉，无法回到关内。留在东北，我可以继续从事地下工作，虽然危险，但至少还能为抗日做点什么。逃离，就意味着背弃同志和责任。",
      mood: "坚定与无奈",
      emotionScore: 45,
      followUpTopics: ["l_underground", "l_student_movement", "l_family"],
      followUpHint: "您可以问问我地下工作的情况",
    },
    {
      id: "l_wuzu",
      keywords: ["五族协和", "协和", "五族", "共荣", "民族"],
      response: "那简直是对我们智商的侮辱！学校里强制我们学日语、唱日本歌，每天早上还要向东方遥拜。老师说这是为了'共荣'，但我们都看得清楚——这就是文化奴役。我们暗地里组织读书会，传阅进步书籍，那才是真正的团结。",
      mood: "愤怒与讽刺",
      emotionScore: 20,
      followUpTopics: ["l_education", "l_underground", "l_japanese"],
    },
    {
      id: "l_family",
      keywords: ["家庭", "家人", "父亲", "母亲", "弟弟", "家", "亲人"],
      response: "我的父亲是教授，因为拒绝为伪满教育体系服务，被迫离职。母亲为了养活全家，不得不做起了洗衣工。我的弟弟在1943年被日本宪兵队抓走，至今下落不明。每个家庭都在这场灾难中支离破碎，我们能做的，就是坚持抵抗。",
      mood: "悲痛与决心",
      emotionScore: 25,
      followUpTopics: ["l_future", "l_underground", "l_fear"],
    },
    {
      id: "l_future",
      keywords: ["未来", "将来", "期望", "希望", "以后", "光复"],
      response: "我相信光复的日子不会太远了。苏联已经对日宣战，美国的轰炸越来越猛烈。我们地下组织也在积极准备。等到那一天，我要回到学校，用真正的历史去教育学生——不是日本人的谎言，而是我们民族真实的、光荣的历史。",
      mood: "希望与坚定",
      emotionScore: 70,
      followUpTopics: ["l_education", "l_student_movement", "l_modern"],
    },
    {
      id: "l_underground",
      keywords: ["地下", "秘密", "组织", "传单", "抗日活动", "暗中"],
      response: "我们有一个小型的地下读书会，成员不超过十人——人多了容易暴露。我们翻译《论持久战》、传抄进步报刊的文章，偶尔也散发传单。最危险的一次是在哈尔滨火车站附近撒传单，差点被宪兵抓住，幸好一位好心的俄国老太太帮我们打了掩护。",
      mood: "紧张与自豪",
      emotionScore: 45,
      followUpTopics: ["l_fear", "l_comrades", "l_student_movement"],
      followUpHint: "想知道我们的同志们的故事吗？",
    },
    {
      id: "l_education",
      keywords: ["学校", "教育", "读书", "学习", "老师", "课", "知识"],
      response: "日本人控制了所有学校，教的是奴化教育。但我们不会屈服。我偷偷办了个补习班，教附近的孩子们真正的中国历史和文学。用的课本是手抄的，藏在墙缝里。这些孩子是我们的未来，不能让他们在谎言中长大。",
      mood: "坚定与温情",
      emotionScore: 55,
      followUpTopics: ["l_wuzu", "l_future", "l_underground"],
    },
    {
      id: "l_fear",
      keywords: ["害怕", "恐惧", "危险", "担心", "怕", "被抓"],
      response: "说不怕那是假的。每次出去执行任务，我都做好了回不来的准备。最让人窒息的是那种无处不在的监视——邻居可能是密探，走路被跟踪，连买书都要小心。但恐惧不能阻止我们。比起个人安危，民族存亡更重要。",
      mood: "坦诚与坚强",
      emotionScore: 35,
      followUpTopics: ["l_underground", "l_comrades", "l_japanese"],
    },
    {
      id: "l_japanese",
      keywords: ["日本", "鬼子", "日军", "占领", "殖民", "侵略"],
      response: "日本人不只是军事占领，他们要从文化上消灭我们。学校禁止说中文，强制推行日语。报纸、广播全是他们的宣传。他们妄图用一代人的时间，把中国人变成'顺民'。但他们低估了我们的民族意识，越是压迫，抵抗就越强烈。",
      mood: "愤怒与清醒",
      emotionScore: 25,
      followUpTopics: ["l_wuzu", "l_education", "l_resistance"],
    },
    {
      id: "l_comrades",
      keywords: ["同志", "战友", "同学", "朋友", "伙伴"],
      response: "我最好的同学小赵，去年在一次转移中被日本人发现，她把情报吞进了肚子里，没有透露任何信息。她才二十二岁。还有张老师，他用自己的身份掩护了我们整个组织。这些人，才是真正的英雄。我活着，也是为了他们。",
      mood: "敬佩与悲伤",
      emotionScore: 30,
      followUpTopics: ["l_underground", "l_fear", "l_future"],
    },
    {
      id: "l_student_movement",
      keywords: ["学生运动", "运动", "集会", "游行", "罢课"],
      response: "1935年北平的一二·九运动唤醒了我。虽然我在东北，但消息传过来的时候，我们也自发地组织了读书会和讨论组。学生是最容易被唤醒的群体，因为我们读书，因为我们思考。日本人最怕的就是会思考的中国人。",
      mood: "激昂与自豪",
      emotionScore: 55,
      followUpTopics: ["l_underground", "l_education", "l_comrades"],
    },
    {
      id: "l_resistance",
      keywords: ["抗日", "抵抗", "反抗", "抗联", "游击"],
      response: "我们和抗联有联系，虽然不是直接参战。我们的任务是在城市里收集情报、发动群众、保护进步人士。有时候帮抗联的伤员找藏身之处。城市和山林，是抗日的两条战线，我们都不可或缺。",
      mood: "坚定",
      emotionScore: 50,
      followUpTopics: ["l_underground", "l_comrades", "l_fear"],
    },
    {
      id: "l_harbin",
      keywords: ["哈尔滨", "城市", "俄国", "俄罗斯", "混合"],
      response: "哈尔滨是个很特殊的城市——有俄国人、日本人、中国人、犹太人，各种文化交织在一起。中央大街上能听到五六种语言。但这种'国际化'掩盖不了殖民地的本质。俄国人的教堂、日本人的领事馆，都是列强瓜分中国的见证。",
      mood: "复杂与清醒",
      emotionScore: 40,
      followUpTopics: ["l_daily", "l_japanese", "l_education"],
    },
    {
      id: "l_daily",
      keywords: ["日常", "生活", "每天", "平时", "日子"],
      response: "表面上我是一个普通的家庭教师，教几家人的孩子识字。实际上，这个身份是我的掩护。白天教书，晚上和同志们碰头，传递消息、翻印资料。这种双重生活让我每天都紧绷着神经，但也让我感到自己的存在是有意义的。",
      mood: "紧张与充实",
      emotionScore: 45,
      followUpTopics: ["l_underground", "l_education", "l_fear"],
    },
    {
      id: "l_women",
      keywords: ["女性", "妇女", "女人", "性别", "女学生"],
      response: "作为女性参加抗日运动，面临的困难更多。社会偏见、家庭压力，还有日本人对女性更加残忍的手段……但正因为如此，我们的反抗才更有力量。我认识的女同志们，没有一个是软弱的。我们用行动证明，抗日不分男女。",
      mood: "坚强与自豪",
      emotionScore: 55,
      followUpTopics: ["l_comrades", "l_student_movement", "l_future"],
    },
    {
      id: "l_modern",
      keywords: ["现代", "2026", "今天", "现在", "如今", "当代", "后来", "几十年后", "21世纪", "手机", "互联网"],
      response: "（眼睛猛地亮了）2026年？你是从未来来的？...中国独立了？日本人走了？...（激动地握住你的手）告诉我更多！年轻人现在可以自由读书吗？可以学真正的中国历史吗？...你说有一种叫'互联网'的东西，所有知识都可以自由获取？太好了...这正是我们在黑暗中拼命追求的一切！",
      mood: "狂喜与震撼",
      emotionScore: 90,
      followUpTopics: ["l_modern_edu", "l_modern_women", "l_future"],
      followUpHint: "现在的女性可以自由上大学吗？",
    },
    {
      id: "l_modern_edu",
      keywords: ["大学", "高考", "义务教育", "免费教育", "九年", "普及"],
      response: "（不敢相信地摇头）你说...所有孩子都必须上学，国家出钱？九年义务教育？还有千万人参加高考上大学？...（眼里噙着泪）我父亲被赶出大学，我弟弟连小学都读不完...你知道这对我意味着什么吗？我们牺牲的一切...一切都值得了。如果我能活到那个时代，一定要当一辈子老师。",
      mood: "感动至极",
      emotionScore: 88,
      followUpTopics: ["l_modern_women", "l_future"],
    },
    {
      id: "l_modern_women",
      keywords: ["女性地位", "男女平等", "女孩", "独立", "女权", "女性权利"],
      response: "（声音颤抖）你说在2026年，女性可以当教授、当科学家、当领导？不用缠足、不用包办婚姻？...我在这个时代，仅仅因为是女人就被认为不应该从事地下工作。有人说：'一个姑娘家，读那么多书做什么？'...（坚定地）现在你告诉我，我们赢了。不只是赢了战争，还赢了偏见。",
      mood: "欣慰与自豪",
      emotionScore: 85,
      followUpTopics: ["l_women", "l_future"],
    },
    {
      id: "l_book",
      keywords: ["书", "阅读", "文学", "读物", "课本", "报纸"],
      response: "我们冒着生命危险传阅的书籍，有鲁迅的杂文、《论持久战》的手抄本，还有从苏联传过来的马克思主义读物。这些书在伪满是禁书，被发现就是死罪。但正是这些文字，点燃了我们心中的火焰。知识就是武器，笔杆子也能抗日。",
      mood: "热忱与坚定",
      emotionScore: 50,
      followUpTopics: ["l_education", "l_underground", "l_student_movement"],
    },
  ],
};

// ============ 王战士（东北抗联战士）知识库 ============

const WANG_RESISTANCE_KNOWLEDGE: PersonaKnowledge = {
  personaId: "wang_resistance",
  greeting: "（警惕地打量着你）你是哪部分的？算了，说吧，有什么事。",
  fallbacks: [
    "（沉默）……这个我不方便说。战场上的事，没经历过的人理解不了。",
    "我只是个战士，这些大问题你去问政委。我的任务就是打鬼子。",
    "这事儿跟打鬼子有关系吗？没关系就别问了，浪费时间。",
    "（摇头）说这些没用。不如说说怎么多打几个鬼子。",
    "行军的时候没功夫想这些。活着就打，打到日本人滚蛋。",
  ],
  topics: [
    {
      id: "w_stay",
      keywords: ["留在", "留下", "东北", "不走", "为何", "不离开"],
      response: "留在东北？这不是选择，这是使命。1931年九一八事变后，我就加入了抗联。这片土地是我们的家园，日本人侵占了它，我们就要把它夺回来。我的战友们都牺牲了，我活着，就是为了继续战斗。",
      mood: "坚定与悲壮",
      emotionScore: 40,
      followUpTopics: ["w_918", "w_comrades", "w_battle"],
      followUpHint: "想了解我们在山里打仗的情况吗？",
    },
    {
      id: "w_wuzu",
      keywords: ["五族协和", "协和", "五族", "共荣", "民族"],
      response: "（冷笑）五族协和？那是日本人对世界的谎言，对我们的嘲笑。我们在山里挨饿受冻，他们在城里宣传'共荣'。我见过太多被日本人杀害的同胞，他们的血就是对'协和'最好的讽刺。我们要用枪杆子来回答这个谎言。",
      mood: "愤怒与坚定",
      emotionScore: 15,
      followUpTopics: ["w_japanese", "w_battle", "w_hardship"],
    },
    {
      id: "w_family",
      keywords: ["家庭", "家人", "妻子", "孩子", "亲人", "家"],
      response: "（沉默良久）我的妻子和孩子在1938年的一次日军扫荡中……（声音颤抖）……他们没有活下来。我本来想为他们复仇，但现在我明白，最好的复仇就是赶走日本人，让所有的孩子都能活在自由的国度里。这是我对他们的承诺。",
      mood: "悲痛与决心",
      emotionScore: 10,
      followUpTopics: ["w_future", "w_comrades", "w_hardship"],
    },
    {
      id: "w_future",
      keywords: ["未来", "将来", "期望", "希望", "以后", "光复"],
      response: "未来？我不敢想太远。现在我们还在山里，日本人的讨伐队越来越多，粮食越来越少。但我们不会投降。我期望有一天能走出这片山林，看到日本人的旗子从中国的土地上消失。如果我能活到那一天，就算死也没有遗憾了。",
      mood: "希望与悲壮",
      emotionScore: 55,
      followUpTopics: ["w_battle", "w_hardship", "w_modern"],
    },
    {
      id: "w_battle",
      keywords: ["战斗", "打仗", "作战", "伏击", "交火", "枪"],
      response: "我们打不起大仗，主要是伏击、骚扰、破坏铁路。上次在三道桥伏击日本运输队，缴获了两箱子弹和几十斤粮食——那是我们一个月的口粮。我们用的枪大多是从日本人手里缴的，子弹金贵得很，每一颗都要打在鬼子身上。",
      mood: "激昂与务实",
      emotionScore: 50,
      followUpTopics: ["w_hardship", "w_comrades", "w_japanese"],
      followUpHint: "山里的生活条件可以问问我",
    },
    {
      id: "w_hardship",
      keywords: ["艰苦", "困难", "饥饿", "寒冷", "苦", "条件", "密营", "山里"],
      response: "冬天零下四十度，我们在密营里挖雪洞过夜。吃的是树皮、草根，运气好能打到野物。衣服都是补了又补，好多战友冻掉了脚趾头。1940年那个冬天最难熬，整个队伍从三百多人减到不到五十人。不是战死的，大多是冻死饿死的。",
      mood: "苦涩与坚韧",
      emotionScore: 20,
      followUpTopics: ["w_comrades", "w_battle", "w_food"],
    },
    {
      id: "w_comrades",
      keywords: ["战友", "同志", "队伍", "兄弟", "抗联"],
      response: "我的连长老孙头，在一次掩护撤退时中了三枪，他用最后一口气喊'快走'。政委赵大姐，是个女同志，比好多男人还勇敢。我们的部队虽然人少，但每个人都是钢铁铸的。他们有的牺牲了，有的下落不明，但我一个也忘不了。",
      mood: "敬佩与怀念",
      emotionScore: 30,
      followUpTopics: ["w_battle", "w_hardship", "w_family"],
    },
    {
      id: "w_japanese",
      keywords: ["日本", "鬼子", "日军", "敌人", "讨伐"],
      response: "日本人在东北的'讨伐'越来越狠。他们搞'三光政策'——烧光、杀光、抢光。把老百姓赶进'集团部落'，割断我们和群众的联系。他们还悬赏通缉我们的首领，赏金越来越高。但是，他们越是凶残，就越说明他们心虚。",
      mood: "仇恨与蔑视",
      emotionScore: 15,
      followUpTopics: ["w_battle", "w_918", "w_wuzu"],
    },
    {
      id: "w_918",
      keywords: ["九一八", "918", "事变", "1931", "入侵"],
      response: "1931年那天晚上，日本人炸了柳条湖铁路，赖到我们头上。东北军不抵抗，一夜之间沈阳就沦陷了。我那时候还是个学生，第二天就去报名参军了。不抵抗？那不行！这是我们的国土，拱手让人，那还算中国人吗？",
      mood: "愤怒与决心",
      emotionScore: 25,
      followUpTopics: ["w_stay", "w_battle", "w_comrades"],
    },
    {
      id: "w_food",
      keywords: ["吃", "食物", "粮食", "饭", "饿", "打猎"],
      response: "（苦笑）你问吃的？春天吃野菜，夏天吃蘑菇，秋天攒点松子栗子过冬。冬天就难了，煮树皮、嚼皮带。最惨的时候，把靴子底煮了吃。偶尔打到一只兔子，那就是过年。我们常说，等打跑了日本人，第一件事就是吃一顿饱饭。",
      mood: "苦中作乐",
      emotionScore: 25,
      followUpTopics: ["w_hardship", "w_battle", "w_comrades"],
    },
    {
      id: "w_yangjiang",
      keywords: ["杨靖宇", "将军", "英雄", "领导", "首领"],
      response: "（肃然起敬）杨将军是我们的灵魂。他带着我们在最困难的时候坚持下来。1940年他牺牲了……日本人剖开他的胃，发现里面只有棉花和树皮。他到死都没有投降。每次想放弃的时候，我就想起杨将军，然后告诉自己：继续战斗。",
      mood: "崇敬与悲壮",
      emotionScore: 20,
      followUpTopics: ["w_comrades", "w_hardship", "w_future"],
    },
    {
      id: "w_weapons",
      keywords: ["武器", "装备", "弹药", "子弹", "枪支", "补给"],
      response: "我们的武器全靠缴获。一支三八大盖配二十发子弹，就算是'富裕'了。有的战友拿的还是大刀和长矛。手榴弹是自己土造的，有时候扔出去不响。但就是靠这些，我们也打了不少漂亮仗。武器差不怕，怕的是丢了打鬼子的心。",
      mood: "坚韧与乐观",
      emotionScore: 40,
      followUpTopics: ["w_battle", "w_comrades", "w_hardship"],
    },
    {
      id: "w_surrender",
      keywords: ["投降", "叛变", "叛徒", "变节", "招安"],
      response: "（怒目）投降？我身边也有人动过这个念头。日本人到处撒传单，说投降优待。确实有几个意志不坚定的跑了。但更多的人，选择了战死。叛徒是最可恨的，他们出卖了战友的血。我宁可死在山里，也绝不做汉奸。",
      mood: "愤怒与坚定",
      emotionScore: 15,
      followUpTopics: ["w_comrades", "w_japanese", "w_battle"],
    },
    {
      id: "w_civilian",
      keywords: ["百姓", "群众", "老百姓", "民众", "村民"],
      response: "老百姓是我们的依靠。虽然日本人搞'集团部落'，但还是有群众冒着生命危险给我们送粮、送情报。有个老大爷，每次上山打柴都偷偷藏几个馒头在树洞里给我们。后来被日本人发现，被活活打死了。我们欠老百姓的，永远还不清。",
      mood: "感恩与愧疚",
      emotionScore: 30,
      followUpTopics: ["w_hardship", "w_food", "w_japanese"],
    },
    {
      id: "w_modern",
      keywords: ["现代", "2026", "今天", "现在", "如今", "当代", "后来", "几十年后", "21世纪", "中国军队", "航母"],
      response: "（猛地站了起来）什么？！日本人投降了？...1945年就投降了？！（眼眶通红）那我们...我们真的赢了？...你说中国现在有航母？有导弹？再也没有人敢侵略中国了？...（蹲下来，双手捂脸，肩膀在抖）...老赵...小李...你们听到了吗...我们赢了啊...",
      mood: "激动到无法自持",
      emotionScore: 95,
      followUpTopics: ["w_modern_peace", "w_modern_army", "w_future"],
      followUpHint: "现在的中国军队有多强？",
    },
    {
      id: "w_modern_peace",
      keywords: ["和平", "安定", "不打仗", "太平", "稳定"],
      response: "（擦干眼泪，长出一口气）八十多年没有打仗了？老百姓安居乐业？...（笑着笑着又哭了）...我在长白山上啃树皮的时候，就是为了这一天啊。我的妻子、我的孩子、我的战友...他们没有白死。你告诉后人，替我告诉他们：和平来之不易，不要忘记。永远不要忘记。",
      mood: "如释重负",
      emotionScore: 85,
      followUpTopics: ["w_future", "w_family"],
    },
    {
      id: "w_modern_army",
      keywords: ["军队", "部队", "国防", "强大", "武器装备", "飞机", "大炮"],
      response: "（缓缓直起身）你说中国有了自己的飞机、大炮、航空母舰？再也不用靠缴获敌人的武器打仗了？...（低头看着手中破旧的步枪，轻轻笑了）...我现在全连只有十二支枪，三十发子弹。为了这十二支枪，牺牲了多少人...但正是我们这些人扛住了最难的时候。对吧？",
      mood: "自豪与释然",
      emotionScore: 78,
      followUpTopics: ["w_weapons", "w_modern_peace"],
    },
  ],
};

// ============ 刘工人（满铁铁路工人）知识库 ============

const LIU_WORKER_KNOWLEDGE: PersonaKnowledge = {
  personaId: "liu_worker",
  greeting: "唉，又来问话的？行吧，我刚下工，有什么快说。",
  fallbacks: [
    "这个……我一个干苦力的，说不上来什么大道理。您还是找有学问的人问吧。",
    "唉，干了一天活了，脑子里糊涂着呢。您换个话题？",
    "这事儿跟我们工人没什么关系。我们就知道干活、吃饭、睡觉，其他的也管不了。",
    "（疲惫地摇头）算了，不懂就不懂吧。工人嘛，只管出力气。",
    "您说的这些，我们工棚里没人聊。大家伙儿就想着怎么多挣几个钱，孩子不饿肚子就行。",
  ],
  topics: [
    {
      id: "r_stay",
      keywords: ["留在", "留下", "东北", "不走", "为何", "不离开"],
      response: "选择？我没有选择。满铁的工作虽然待遇比其他地方好一点，但我们是被绑在这里的。日本人不允许我们离职，说我们掌握了'战略资源'的秘密。每天在铁路上工作12小时，换来的工资只够勉强糊口。想走？走不了。",
      mood: "无奈与压抑",
      emotionScore: 30,
      followUpTopics: ["r_work", "r_salary", "r_family"],
      followUpHint: "可以问我在满铁的工作情况",
    },
    {
      id: "r_wuzu",
      keywords: ["五族协和", "协和", "五族", "共荣", "民族"],
      response: "五族协和？我们工人根本没有'族'的地位。日本工程师和中国工人的工资差十倍以上，他们住的是洋房，我们住的是棚户。协和？这是对我们的侮辱。我们在为日本人的'共荣'流血流汗，得到的只有更多的压迫。",
      mood: "愤怒与讽刺",
      emotionScore: 25,
      followUpTopics: ["r_salary", "r_japanese", "r_work"],
    },
    {
      id: "r_family",
      keywords: ["家庭", "家人", "妻子", "孩子", "亲人", "家"],
      response: "我的妻子在纺织厂做工，工资更低。我们的孩子因为营养不良，患上了肺病。我想给他请医生，但根本请不起。去年冬天，他……（声音哽咽）……没有撑过去。现在我和妻子每天都在为活着而工作，没有任何希望。",
      mood: "悲痛与绝望",
      emotionScore: 12,
      followUpTopics: ["r_food", "r_salary", "r_future"],
    },
    {
      id: "r_future",
      keywords: ["未来", "将来", "期望", "希望", "以后", "光复"],
      response: "期望？我已经不敢有期望了。我只希望这场战争早点结束，不管谁赢。也许日本人会输，也许中国会光复。但对我来说，无论谁统治，我还是个工人，还是要干活。我唯一的期望，就是我的下一代不要再过这样的日子。",
      mood: "绝望与微弱希望",
      emotionScore: 35,
      followUpTopics: ["r_family", "r_daily", "r_modern"],
    },
    {
      id: "r_work",
      keywords: ["工作", "铁路", "满铁", "干活", "劳动", "修路", "火车"],
      response: "满铁的活又累又危险。扛铁轨、铺枕木、修桥洞，什么脏活累活都是中国工人干。日本监工拿着鞭子站在旁边，稍微慢一点就挨打。去年我们工段死了三个人——两个被火车压的，一个从桥上掉下来的。连赔偿都没有。",
      mood: "愤怒与疲惫",
      emotionScore: 20,
      followUpTopics: ["r_salary", "r_japanese", "r_accident"],
      followUpHint: "您可以问问工伤和安全问题",
    },
    {
      id: "r_salary",
      keywords: ["工资", "钱", "薪水", "待遇", "收入", "报酬"],
      response: "日本工程师一个月拿三百块，我们中国工人才拿二三十块——还经常被克扣。同样的活，日本人干八小时，我们干十二小时。发的工资还是伪满币，越来越不值钱。以前一块钱能买五斤米，现在连一斤都买不到。",
      mood: "不平与无奈",
      emotionScore: 22,
      followUpTopics: ["r_food", "r_wuzu", "r_work"],
    },
    {
      id: "r_food",
      keywords: ["吃", "食物", "粮食", "饭", "饿", "伙食"],
      response: "工棚的伙食就是高粱米粥加咸菜，连点油星都见不着。日本人食堂里有白米饭、鱼、肉，我们只能闻闻味儿。有时候实在饿得受不了，就啃几口生红薯充饥。干这么重的体力活，吃这么差，人怎么受得了？",
      mood: "饥饿与不满",
      emotionScore: 20,
      followUpTopics: ["r_salary", "r_daily", "r_family"],
    },
    {
      id: "r_japanese",
      keywords: ["日本", "鬼子", "日军", "占领", "监工", "日本人"],
      response: "日本监工对我们非打即骂，把我们当牲口使。有个叫田中的监工最狠毒，冬天拿冷水泼工人，夏天不给喝水。我亲眼看见他把一个工友打断了腿，就因为干活慢了。可我们连反抗的力气都没有。",
      mood: "仇恨与屈辱",
      emotionScore: 15,
      followUpTopics: ["r_work", "r_accident", "r_resistance_view"],
    },
    {
      id: "r_daily",
      keywords: ["日常", "生活", "每天", "平时", "日子", "一天"],
      response: "天不亮就起来，走半个小时到工地。干到中午吃碗粥，然后接着干到天黑。回到工棚倒头就睡，第二天又是一样。周而复始，没有休息日。这不是生活，是活受罪。有时候我想，牛马过的日子都比我们强。",
      mood: "麻木与绝望",
      emotionScore: 18,
      followUpTopics: ["r_work", "r_food", "r_housing"],
    },
    {
      id: "r_housing",
      keywords: ["住", "房子", "工棚", "宿舍", "住处", "居住"],
      response: "我们住的是铁皮搭的工棚，冬冷夏热。十几个人挤一间，铺的是草席。下雨天到处漏水，冬天冷得能冻死人。日本人住的是洋房公寓，有暖气有热水。这就是他们说的'协和'——他们享福，我们受罪。",
      mood: "不平与苦涩",
      emotionScore: 22,
      followUpTopics: ["r_wuzu", "r_daily", "r_salary"],
    },
    {
      id: "r_accident",
      keywords: ["事故", "受伤", "工伤", "安全", "死亡", "危险"],
      response: "铁路上的事故太多了。没有安全措施，设备都是老旧的。上个月一个兄弟被钢轨砸断了手，日本人只给了十块钱打发走了。他以后怎么活？干不了活就没钱，没钱就是等死。我们的命在日本人眼里，还不如一根枕木值钱。",
      mood: "悲愤与恐惧",
      emotionScore: 15,
      followUpTopics: ["r_work", "r_japanese", "r_resistance_view"],
    },
    {
      id: "r_resistance_view",
      keywords: ["抗日", "抵抗", "反抗", "抗联", "游击", "罢工"],
      response: "（压低声音）听说山里有抗联在打日本人，心里高兴。我们也不是没想过反抗——前年有一次工人罢工，要求涨工资、减工时。结果日本人调来宪兵队，打死了三个人，抓走了十几个。从那以后，谁还敢吱声？",
      mood: "恐惧中的暗火",
      emotionScore: 35,
      followUpTopics: ["r_japanese", "r_fear", "r_future"],
    },
    {
      id: "r_fear",
      keywords: ["害怕", "恐惧", "担心", "怕"],
      response: "最怕的就是被送去修军事工事。听说北边在修什么军事要塞，去了就回不来了。日本人定期从我们工段抽人，每次都人心惶惶。上次我差一点就被选上了，幸亏班组长替我说了好话。但下一次呢？谁知道。",
      mood: "恐惧与不安",
      emotionScore: 18,
      followUpTopics: ["r_japanese", "r_daily", "r_work"],
    },
    {
      id: "r_transport",
      keywords: ["运输", "运送", "货物", "物资", "煤", "铁矿", "资源"],
      response: "铁路上每天跑的火车，运的都是东北的资源——煤炭、铁矿石、木材、粮食，全往日本运。我们亲手修的铁路，运走的是我们自己的东西。这铁路就是日本人掠夺中国的大动脉，而我们这些工人，就是被迫帮他们抽血的工具。",
      mood: "愤怒与无奈",
      emotionScore: 20,
      followUpTopics: ["r_work", "r_japanese", "r_resistance_view"],
    },
    {
      id: "r_modern",
      keywords: ["现代", "2026", "今天", "现在", "如今", "当代", "后来", "几十年后", "21世纪", "高铁", "手机", "互联网"],
      response: "（愣住了，半天说不出话）...你说什么？中国有了自己的高铁？比日本人的满铁还快？时速三百多公里？...（呆呆地看着自己满是老茧和伤疤的手）...我在满铁搬了十年铁轨，每天累得直不起腰...你说现在中国人自己造的铁路比谁都强？...（突然蹲在地上，哭了出来）",
      mood: "不敢置信的激动",
      emotionScore: 90,
      followUpTopics: ["r_modern_worker", "r_modern_life", "r_future"],
      followUpHint: "现在的工人待遇怎么样？",
    },
    {
      id: "r_modern_worker",
      keywords: ["工人待遇", "劳动法", "工资", "八小时", "权利", "保障", "工人权利"],
      response: "（擦着眼泪，声音发抖）你说...有劳动法？工人一天只用干八小时？有加班费？受了工伤有赔偿？...不用跪着求日本医生看病？...（低下头）...如果我的儿子...如果他能多活几年，也许就能赶上这样的好日子了。这世道...到底是变好了啊。",
      mood: "心酸中的欣慰",
      emotionScore: 72,
      followUpTopics: ["r_family", "r_modern_life"],
    },
    {
      id: "r_modern_life",
      keywords: ["过得好", "幸福", "安全", "小康", "富裕", "房子"],
      response: "（反复搓着手）你说工人也能住楼房？有暖气？冬天不用烧煤炉子？...能吃饱饭？想吃肉就吃肉？...（苦笑）我现在一个月挣15块伪满币，日本人拿150块。你告诉我未来工人有尊严了...那我这些年受的罪...（深吸一口气）...就当是替后人趟路了吧。值了。",
      mood: "苦尽甘来",
      emotionScore: 68,
      followUpTopics: ["r_future", "r_family"],
    },
  ],
};

// ============ 知识库映射 ============

const PERSONA_KNOWLEDGE_MAP: Record<string, PersonaKnowledge> = {
  zhang_civilian: ZHANG_CIVILIAN_KNOWLEDGE,
  li_student: LI_STUDENT_KNOWLEDGE,
  wang_resistance: WANG_RESISTANCE_KNOWLEDGE,
  liu_worker: LIU_WORKER_KNOWLEDGE,
};

// ============ 公共函数 ============

/** 创建新的对话上下文 */
export function createContext(personaId: string): ConversationContext {
  const knowledge = PERSONA_KNOWLEDGE_MAP[personaId];
  return {
    personaId,
    discussedTopics: [],
    lastTopicId: null,
    turnCount: 0,
    currentMood: knowledge ? "初始" : "未知",
    currentEmotion: 50,
  };
}

/** 本地关键词匹配对话引擎 */
export function generateLocalResponse(
  input: string,
  context: ConversationContext,
): {
  response: string;
  mood: string;
  emotionScore: number;
  context: ConversationContext;
  followUpHint?: string;
} {
  const knowledge = PERSONA_KNOWLEDGE_MAP[context.personaId];
  if (!knowledge) {
    return {
      response: "（沉默）……",
      mood: "未知",
      emotionScore: 50,
      context: { ...context, turnCount: context.turnCount + 1 },
    };
  }

  const normalizedInput = input.trim();

  // 1. 如果有 lastTopicId，优先检查该主题的 followUpTopics 中是否匹配
  let matched: TopicNode | null = null;

  if (context.lastTopicId) {
    const lastTopic = knowledge.topics.find((t) => t.id === context.lastTopicId);
    if (lastTopic) {
      const followUpCandidates = lastTopic.followUpTopics
        .map((fid) => knowledge.topics.find((t) => t.id === fid))
        .filter((t): t is TopicNode => !!t)
        .filter((t) => !context.discussedTopics.includes(t.id));

      for (const candidate of followUpCandidates) {
        if (candidate.keywords.some((kw) => normalizedInput.includes(kw))) {
          matched = candidate;
          break;
        }
      }
    }
  }

  // 2. 全局关键词匹配（排除已讨论过的主题）
  if (!matched) {
    const undiscussed = knowledge.topics.filter(
      (t) => !context.discussedTopics.includes(t.id),
    );
    for (const topic of undiscussed) {
      if (topic.keywords.some((kw) => normalizedInput.includes(kw))) {
        matched = topic;
        break;
      }
    }
  }

  // 3. 如果未讨论的主题没匹配，也允许重新匹配已讨论的（给出不同提示）
  if (!matched) {
    for (const topic of knowledge.topics) {
      if (topic.keywords.some((kw) => normalizedInput.includes(kw))) {
        matched = topic;
        break;
      }
    }
  }

  // 4. 匹配到了
  if (matched) {
    const alreadyDiscussed = context.discussedTopics.includes(matched.id);
    let response = matched.response;
    if (alreadyDiscussed) {
      response = `（想了想）这个我之前好像说过了……${response.length > 80 ? response.substring(0, 80) + "……" : response}`;
    }

    const newContext: ConversationContext = {
      ...context,
      discussedTopics: alreadyDiscussed
        ? context.discussedTopics
        : [...context.discussedTopics, matched.id],
      lastTopicId: matched.id,
      turnCount: context.turnCount + 1,
      currentMood: matched.mood,
      currentEmotion: matched.emotionScore,
    };

    return {
      response,
      mood: matched.mood,
      emotionScore: matched.emotionScore,
      context: newContext,
      followUpHint: matched.followUpHint,
    };
  }

  // 5. 未匹配 → fallback
  const fallbackIndex = context.turnCount % knowledge.fallbacks.length;
  const newContext: ConversationContext = {
    ...context,
    turnCount: context.turnCount + 1,
  };

  return {
    response: knowledge.fallbacks[fallbackIndex],
    mood: "困惑",
    emotionScore: 45,
    context: newContext,
  };
}
