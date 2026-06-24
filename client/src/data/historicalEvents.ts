// Historical Events Archive Data
export interface HistoricalEvent {
  id: string;
  title: string;
  year: string;
  period: string;
  category: "politics" | "economy" | "society" | "military";
  description: string;
  sources: string[];
  tags: string[];
  topicId: string;
  details?: {
    background: string;
    process: string;
    consequence: string;
  };
}

export interface ArchiveTopic {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  region: string;
  description: string;
  coverImage: string;
  caseId: string;
  events: HistoricalEvent[];
}

export const ARCHIVE_CATEGORIES = [
  { id: "politics", label: "政治外交", sub: "国际博弈", icon: "🏛️" },
  { id: "economy", label: "经济资源", sub: "贸易与掠夺", icon: "💰" },
  { id: "society", label: "社会文化", sub: "思潮与变革", icon: "👥" },
  { id: "military", label: "军事冲突", sub: "战争与和平", icon: "⚔️" },
];

// ========== 全部事件数据（含details） ==========
const ALL_EVENTS: HistoricalEvent[] = [
  // ===== 伪满洲国 =====
  { id:"mk1", title:"柳条湖事件与九一八事变", year:"1931年", period:"1931", category:"military", description:"关东军炸毁柳条湖铁路，诬中国军队所为，东北沦陷。", sources:["远东军事法庭判决书","关东军作战日志"], tags:["事变起点","军事挑衅"], topicId:"manchukuo", details:{ background:"日本受经济危机冲击，关东军策划制造事端武力占领东北。", process:"9月18日夜炸毁南满铁路诬称中方破坏，炮轰北大营。东北军不抵抗，沈阳一夜沦陷。", consequence:"四个月内东三省全部沦陷，成为伪满洲国建立的军事基础。" } },
  { id:"mk2", title:"伪满洲国建国宣言", year:"1932年", period:"1932", category:"politics", description:"关东军扶植溥仪就任'执政'，发表建国宣言。", sources:["伪满洲国建国宣言","日本外务省极密档案"], tags:["傀儡政权","政权建立"], topicId:"manchukuo", details:{ background:"日军避免直接吞并引发国际干涉，秘密将溥仪接至东北充当傀儡。", process:"1932年3月，满洲国宣布成立，宣称'王道乐土'、'五族协和'。溥仪就任执政，实权由日本顾问把持。", consequence:"东北进入14年殖民统治。国际社会除轴心国外均不承认该政权的合法性。" } },
  { id:"mk3", title:"李顿调查团与国联决议", year:"1932-1933年", period:"1932-1933", category:"politics", description:"国联调查团认定伪满非合法独立运动，日本愤然退出国联。", sources:["李顿调查团报告书","国联大会决议"], tags:["国际外交","不承认主义"], topicId:"manchukuo", details:{ background:"中国向国联申诉，国联于1931年12月任命由英、美、法、德、意五国代表组成的调查团，英国李顿勋爵任团长，赴东北实地调查。", process:"调查团1932年10月公布报告，认定日方行动并非合法自卫，满洲国非当地人民自发运动，而是日本军事占领的结果。1933年2月24日国联大会以42票赞成、1票反对通过报告。", consequence:"日本代表退席并退出国联，一战后集体安全体系开始崩塌，希特勒与墨索里尼从中看到侵略可行。" } },
  { id:"mk3a", title:"史汀生发表不承认主义照会", year:"1932年1月", period:"1932", category:"politics", description:"美国国务卿史汀生照会中日，宣布不承认违反条约权益和'门户开放'政策的任何既成事实。", sources:["史汀生照会","美国国务院档案"], tags:["美国外交","不承认主义"], topicId:"manchukuo", details:{ background:"日本侵占满洲并扶植傀儡政权，威胁美国在华'门户开放'利益。美国虽奉行孤立主义，但需维护九国公约与凯洛格公约。", process:"1932年1月7日史汀生国务卿照会中日：美国不能承认任何违反条约权利、损害中国领土与行政完整及'门户开放'政策的既成事实或条约协定。", consequence:"形成'史汀生主义'，成为国际社会不承认伪满的法理基础之一，但美国未采取军事或经济制裁。" } },
  { id:"mk3b", title:"英国与国联对日制裁的消极态度", year:"1933年", period:"1933", category:"politics", description:"英国等国担忧制裁无效且损害自身利益，国联未能对日本实施有效经济制裁。", sources:["英国外交部档案","国联大会记录"], tags:["英国外交","绥靖萌芽"], topicId:"manchukuo", details:{ background:"大萧条重创英法经济，两国不愿因远东问题与日本开战或实施制裁。美国作为日本主要贸易伙伴又非国联成员。", process:"国联虽通过李顿报告，但讨论经济制裁时英国更愿维持对日良好关系，成员国担心日本报复。最终未实施有效制裁。", consequence:"日本公然侵略未受惩罚，暴露国联集体安全机制的虚弱，为日后绥靖政策埋下伏笔。" } },
  { id:"mk4", title:"日满议定书签订", year:"1932年", period:"1932", category:"politics", description:"日本与伪满签约，将东北防务交通资源全盘交予日本控制。", sources:["日满议定书","枢密院记录"], tags:["主权让渡","条约签署"], topicId:"manchukuo", details:{ background:"日本需要以条约形式巩固对东北的绝对控制权。", process:"关东军司令与伪满总理签约，日本承认伪满并获得驻军及经济特权。", consequence:"东北军事主权彻底丧失，铁路矿产航空等经济命脉被日本接管。" } },
  { id:"mk5", title:"满铁垄断与资源掠夺", year:"1933-1945年", period:"1933-1945", category:"economy", description:"南满铁道公司扩张为统管煤铁钢情报的核心殖民机构。", sources:["满铁档案","满洲产业开发五年计划"], tags:["资源掠夺","经济垄断"], topicId:"manchukuo", details:{ background:"满铁原为铁路公司，伪满成立后被赋予统管东北全部铁路的国策会社地位。", process:"满铁触角延伸至煤矿钢铁港口电力及情报领域，大规模榨取东北资源运回日本。", consequence:"满铁成为拥有半国家权力的巨型殖民机构，直接支撑了日本侵华军需。" } },
  { id:"mk6", title:"东北抗联与讨伐作战", year:"1936-1940年", period:"1936-1940", category:"military", description:"杨靖宇领导抗联在极寒中游击，关东军实施三年治安肃正。", sources:["关东军治安肃正日志","抗联战斗简报"], tags:["武装抵抗","游击战"], topicId:"manchukuo", details:{ background:"中共及义勇军组建东北抗联，在极端恶劣环境下开展游击战。", process:"日伪军大讨伐，归屯并户制造无人区。杨靖宇1940年被围孤身奋战至死，剖胃仅见树皮草根。", consequence:"抗联牵制数十万关东军支援全国抗战，但自身伤亡惨重。" } },
  { id:"mk7", title:"伪满皇民化与配给歧视", year:"1937-1945年", period:"1937-1945", category:"society", description:"推行日语国语化和建国神庙参拜，大米成日本人专属特权。", sources:["伪满文教部学制改革案","口述回忆"], tags:["文化同化","阶级歧视"], topicId:"manchukuo", details:{ background:"日本急需在精神层面奴化东北，推行皇民化运动抹杀中华认同。", process:"教育上日语为国语禁教中国史，生活上大米为日本人专属甲种粮，中国人吃大米即为经济犯。", consequence:"严苛歧视让民众体会亡国奴屈辱，反激起更顽强的民族仇恨。" } },
  { id:"mk8", title:"满洲开拓团与土地掠夺", year:"1936-1945年", period:"1936-1945", category:"economy", description:"日本武装移民强占东北良田，中国农民沦为佃农或苦力。", sources:["拓务省百万户计划","农民控诉档案"], tags:["人口殖民","土地掠夺"], topicId:"manchukuo", details:{ background:"日本制定向东北移入500万人的庞大计划以改变民族构成。", process:"武装开拓团暴力强占良田，中国农民被赶入集团部落或矿山当苦力。", consequence:"30多万开拓民强占两千万公顷土地，战败后被抛弃大量冻亡。" } },
  { id:"mk9", title:"七三一部队活体实验", year:"1936-1945年", period:"1936-1945", category:"military", description:"日军在哈尔滨建细菌武器基地，对战俘平民进行活体实验。", sources:["伯力审判档案","731部队成员供词"], tags:["战争罪行","细菌战"], topicId:"manchukuo", details:{ background:"日本军部在伪满隐秘设立由石井四郎领导的731部队。", process:"将大量战俘和平民进行冻伤毒气细菌感染及活体解剖等极端暴行，制造细菌炸弹。", consequence:"至少3000人在实验室惨死，战后石井等人用数据与美军交易逃脱审判。" } },
  { id:"mk10", title:"苏军出兵与伪满覆灭", year:"1945年8月", period:"1945", category:"military", description:"百万苏军发动八月风暴，关东军崩溃，溥仪被俘。", sources:["苏联远东司令部战报","关东军降伏文书"], tags:["政权覆灭","雅尔塔体系"], topicId:"manchukuo", details:{ background:"雅尔塔会议上苏联承诺对日作战以换取在东北的特权。", process:"1945年8月9日150万苏军三路越境进攻，关东军精锐已被抽调，防线迅速崩溃。溥仪逃亡被俘。", consequence:"14年伪满覆灭，东北光复。但苏军拆走大量工业设备，国共随后争夺东北。" } },

  // ===== 鸦片战争 =====
  { id:"ow1", title:"英国东印度公司鸦片垄断", year:"18世纪末", period:"1773-1830", category:"economy", description:"东印度公司为扭转对华逆差，在印度种鸦片大规模走私中国。", sources:["东印度公司商业卷宗","海关贸易档案"], tags:["贸易逆差","毒品走私"], topicId:"opium_war", details:{ background:"英国对华茶叶需求巨大但中国不需英国工业品，白银大量流入中国。", process:"东印度公司垄断孟加拉鸦片种植，通过散商走私至中国沿海。", consequence:"中国白银大量外流引发通货紧缩，腐蚀官僚军队，导致严重社会危机。" } },
  { id:"ow2", title:"林则徐虎门销烟", year:"1839年6月", period:"1839", category:"politics", description:"钦差大臣林则徐收缴两万余箱鸦片在虎门公开彻底销毁。", sources:["林则徐日记","英商申诉书"], tags:["主权禁毒","外交冲突"], topicId:"opium_war", details:{ background:"白银外流和社会衰退促使道光帝严禁鸦片，派林则徐赴广东查禁。", process:"林则徐封锁商馆迫使义律上缴2万余箱鸦片，在虎门用石灰销毁。", consequence:"振奋民心但成为英国发动战争的直接借口。" } },
  { id:"ow3", title:"穿鼻之战", year:"1839年11月", period:"1839", category:"military", description:"中英水师在穿鼻洋面发生武装冲突，暴露清军火力差距。", sources:["水师将领军报","英舰作战日志"], tags:["局部冲突","军力差距"], topicId:"opium_war", details:{ background:"林维喜命案引发中英紧张，义律拒绝交出凶手。", process:"两艘英舰向关天培率领的水师开火，清军数艘战船被击毁。", consequence:"暴露清军在近代海军面前的劣势，全面战争阴云笼罩。" } },
  { id:"ow4", title:"英国议会辩论与宣战", year:"1840年4月", period:"1840", category:"politics", description:"英国下议院以9票微弱优势通过对华动武军费拨款。", sources:["英国议会汉萨德记录","格拉斯顿演说录"], tags:["议会辩论","战争决策"], topicId:"opium_war", details:{ background:"格拉斯顿等人认为为鸦片而战有损国家道德，巴麦尊以保护侨民为由力主开战。", process:"议会以271对262票仅9票之差通过军费案。", consequence:"英国正式决定武装侵华，远征军启程驶向中国。" } },
  { id:"ow5", title:"定海沦陷与英军北上", year:"1840年7月", period:"1840", category:"military", description:"英军避开广东突袭浙江定海，直逼天津大沽口震动京师。", sources:["英军远征日志","清实录道光朝"], tags:["战略奇袭","军事落后"], topicId:"opium_war", details:{ background:"英军发现林则徐广东海防严密，决定北上打击政治中心。", process:"7月英军以压倒火力攻占定海，8月直逼天津大沽口。", consequence:"道光帝震惊将林则徐革职，对英策略从强硬转向乞和。" } },
  { id:"ow6", title:"虎门之战与关天培殉国", year:"1841年2月", period:"1841", category:"military", description:"英军进攻虎门要塞，水师提督关天培率军死战血染炮台。", sources:["清实录","英方牧师见闻录"], tags:["惨烈海战","英雄殉国"], topicId:"opium_war", details:{ background:"穿鼻草约撕毁后英军再攻珠江口咽喉虎门炮台。", process:"英军蒸汽战舰以开花弹猛轰，关天培身受重伤仍亲自点炮还击直至殉国。", consequence:"虎门陷落广东水师全军覆没，通往广州的水路大门洞开。" } },
  { id:"ow7", title:"三元里抗英斗争", year:"1841年5月", period:"1841", category:"society", description:"广州三元里民众自发武装包围并痛击入乡抢劫的英军。", sources:["三元里社学档案","英军士兵家书"], tags:["民众武装","自发抗战"], topicId:"opium_war", details:{ background:"英军士兵在广州北郊抢劫财物强暴妇女激起民愤。", process:"数十乡镇民众用大刀长矛将千余英军包围于牛栏岗，趁雨天英枪受潮近战杀伤数十人。", consequence:"中国人民第一次自发大规模抵抗外侵，但被清朝官员压制解散。" } },
  { id:"ow8", title:"镇江之战与运河被断", year:"1842年7月", period:"1842", category:"military", description:"英军深入长江切断大运河，驻防八旗兵在镇江殊死巷战。", sources:["英将卧乌作战报告","江南失陷奏报"], tags:["漕运切断","殊死搏斗"], topicId:"opium_war", details:{ background:"英军改变策略深入长江，目标切断清帝国南北经济命脉京杭大运河。", process:"镇江副都统海龄率1500旗兵进行极其顽强的巷战，城破时许多家庭举家自焚。", consequence:"镇江陷落漕粮北运被断，南京直接暴露在英军炮口之下，清政府被迫乞和。" } },
  { id:"ow9", title:"《南京条约》签订", year:"1842年8月", period:"1842", category:"politics", description:"中英签署近代第一个不平等条约，割香港赔款开五口通商。", sources:["南京条约原文","耆英外交奏折"], tags:["不平等条约","半殖民地化"], topicId:"opium_war", details:{ background:"运河被断南京危在旦夕，道光帝授权求和。", process:"在英舰康华丽号上签约：割香港岛、赔2100万银元、开五口通商。次年虎门条约追加领事裁判权。", consequence:"中国沦入半殖民地轨道，协定关税摧毁民族工业屏障，司法主权丧失。" } },
  { id:"ow10", title:"通商口岸与社会巨变", year:"1842年后", period:"1842-1860", category:"society", description:"五口通商后沿海社会剧变，传统经济瓦解新商业阶层兴起。", sources:["海关档案","地方志"], tags:["社会变迁","城市发展"], topicId:"opium_war", details:{ background:"条约打破闭关锁国体系，外国商品大量涌入。", process:"上海等口岸迅速发展为国际商埠，买办阶层崛起，传统手工业破产。", consequence:"沿海社会结构重塑，催生了洋务运动和后来的维新变法。" } },

  // ===== 明治维新 =====
  { id:"mj1", title:"黑船来航", year:"1853年", period:"1853", category:"military", description:"美国佩里舰队强迫日本开国，终结幕府锁国体制。", sources:["日米和亲条约","幕府应对文书"], tags:["叩关","开国"], topicId:"meiji", details:{ background:"德川幕府实行200余年锁国政策维持统治。", process:"佩里率黑船驶入东京湾以武力威慑迫使幕府接受国书并开港。", consequence:"幕府威信扫地引发尊王攘夷运动，为维新埋下伏笔。" } },
  { id:"mj2", title:"大政奉还与王政复古", year:"1867年", period:"1867", category:"politics", description:"德川庆喜将政权交还天皇，延续260年的幕府统治终结。", sources:["大政奉还上表","萨长同盟密书"], tags:["政权更迭","天皇复权"], topicId:"meiji", details:{ background:"萨摩长州结盟利用天皇权威逼迫幕府让权。", process:"第15代将军德川庆喜主动奉还大政于明治天皇朝廷。", consequence:"明治新政府成立，但幕府残余不服引发戊辰战争。" } },
  { id:"mj3", title:"戊辰战争", year:"1868-1869年", period:"1868-1869", category:"military", description:"新政府军击败幕府残余势力，统一全国确立维新政权。", sources:["戊辰战争战报","新政府军令"], tags:["内战","统一"], topicId:"meiji", details:{ background:"幕府旧臣不甘失权在东北及北海道负隅顽抗。", process:"政府军在�的鸟羽伏见之战大胜，后追击至会津若松及函馆五棱郭歼灭残部。", consequence:"日本实现了近代史上首次真正的中央集权统一。" } },
  { id:"mj4", title:"废藩置县", year:"1871年", period:"1871", category:"politics", description:"废除封建领主制设县，建立近代统一中央集权国家。", sources:["明治五年诏书","地方改革法案"], tags:["中央集权","制度变革"], topicId:"meiji", details:{ background:"新政府急需收归地方权力建立统一行政体系。", process:"强制解散各藩设立由中央直接任命官吏的县。", consequence:"彻底终结日本封建割据，建立了现代民族国家架构。" } },
  { id:"mj5", title:"岩仓使节团考察欧美", year:"1871-1873年", period:"1871-1873", category:"society", description:"日本高层精英倾巢出动访问欧美，深刻认知差距。", sources:["米欧回览实记","外交通信"], tags:["考察西方","文明开化"], topicId:"meiji", details:{ background:"新政府急需修改不平等条约并学习西方制度。", process:"岩仓具视大久保利通等百人使团用近两年考察英法美德的工业教育军事。", consequence:"确立殖产兴业文明开化富国强兵三大路线，奠定日本现代化基础。" } },
  { id:"mj6", title:"西南战争", year:"1877年", period:"1877", category:"military", description:"西乡隆盛率士族叛军反政府，明治维新最后的内战。", sources:["陆军参谋本部战史","西乡隆盛遗书"], tags:["士族叛乱","最后武士"], topicId:"meiji", details:{ background:"维新后士族特权被剥夺，西乡隆盛不满征韩论被否成为不满的核心。", process:"西乡率�的一万余萨摩士族起兵反政府，政府以征兵制新军镇压。", consequence:"士族武装彻底退出历史舞台，证明了征兵制和近代军队的优越性。" } },
  { id:"mj7", title:"明治宪法颁布", year:"1889年", period:"1889", category:"politics", description:"日本颁布亚洲第一部近代宪法，确立天皇主权下的议会制。", sources:["大日本帝国宪法","伊藤博文宪法义解"], tags:["立宪","议会制"], topicId:"meiji", details:{ background:"伊藤博文赴欧考察后以普鲁士为蓝本设计日本宪法。", process:"1889年明治天皇亲自颁布宪法，设立贵族院和众议院，但天皇保留统帅权等巨大权力。", consequence:"日本成为亚洲第一个立宪国家，但天皇大权在握为后来军国主义埋下隐患。" } },
  { id:"mj8", title:"甲午战争", year:"1894-1895年", period:"1894-1895", category:"military", description:"日本击败清朝改变东亚格局，签马关条约获台湾及赔款。", sources:["日本参谋本部战史","清朝军机处档案"], tags:["甲午战争","东亚变局"], topicId:"meiji", details:{ background:"明治维新军事改革成果需要战争验证，朝鲜成为角力场。", process:"日本海陆军大胜清军，黄海海战北洋水师覆灭。", consequence:"日本获台湾和2亿两赔款跻身列强，直接刺激中国维新变法。" } },
  { id:"mj9", title:"日俄战争", year:"1904-1905年", period:"1904-1905", category:"military", description:"日本击败沙俄震惊世界，非白人国家首次战胜欧洲列强。", sources:["日俄朴茨茅斯条约","英国观战报告"], tags:["大国博弈","亚洲崛起"], topicId:"meiji", details:{ background:"日俄在满洲和朝鲜的利益冲突不可调和。", process:"日军在旅顺和奉天大胜，对马海战中全歼俄国波罗的海舰队。", consequence:"日本确立亚洲霸主地位获南满利权，极大鼓舞亚洲民族解放运动。" } },
  { id:"mj10", title:"韩国合并", year:"1910年", period:"1910", category:"politics", description:"日本正式吞并朝鲜半岛，实行殖民统治直至1945年。", sources:["日韩合并条约","大韩帝国最后诏书"], tags:["殖民吞并","朝鲜沦亡"], topicId:"meiji", details:{ background:"日俄战争后日本在朝鲜确立保护权，逐步架空朝鲜政府。", process:"1910年日本迫使朝鲜签署合并条约，朝鲜半岛正式沦为日本殖民地。", consequence:"开启35年殖民统治，成为日后日韩关系最核心的历史创伤。" } },

  // ===== 法国大革命 =====
  { id:"fr1", title:"三级会议召开", year:"1789年5月", period:"1789", category:"politics", description:"路易十六为解决财政危机召开三级会议，成为革命导火索。", sources:["三级会议公报","宫廷账本"], tags:["财政危机","等级矛盾"], topicId:"french_revolution", details:{ background:"法国援美独立导致国库空虚，贵族拒绝交税。", process:"第三等级不满表决机制，宣布成立国民议会，誓言制定宪法。", consequence:"专制王权受到实质挑战，革命的政治序幕正式拉开。" } },
  { id:"fr2", title:"攻占巴士底狱", year:"1789年7月14日", period:"1789", category:"military", description:"巴黎民众攻克象征封建王权的巴士底狱，大革命全面爆发。", sources:["国民议会公报","当时市民通信"], tags:["人民起义","旧制度崩溃"], topicId:"french_revolution", details:{ background:"路易十六企图动用军队镇压国民议会，巴黎面临粮荒。", process:"激愤市民武装起来经过血战攻下了被视为专制象征的巴士底要塞。", consequence:"王权不可侵犯性被打破，7月14日成为法国国庆日。" } },
  { id:"fr3", title:"《人权和公民权宣言》", year:"1789年8月", period:"1789", category:"society", description:"宣告人生而自由平等，奠定现代民主法治的理念基石。", sources:["制宪议会原始法令","拉法耶特书函"], tags:["人权基石","启蒙胜利"], topicId:"french_revolution", details:{ background:"八月法令废除封建特权后急需一部根本思想纲领。", process:"国民议会颁布17条原则的人权宣言，确立自由财产权和反抗压迫的天然权利。", consequence:"如同思想闪电震撼整个欧洲君主制国家，成为现代民主思想的里程碑。" } },
  { id:"fr4", title:"路易十六出逃失败", year:"1791年6月", period:"1791", category:"politics", description:"国王秘密出逃至瓦伦被识破押回巴黎，王权威信彻底崩塌。", sources:["国民议会调查报告","瓦伦市长证词"], tags:["出逃失败","王权崩塌"], topicId:"french_revolution", details:{ background:"路易十六不甘失权，密谋化装出逃至边境投靠奥地利军队。", process:"国王一家化装出逃但在瓦伦小镇被驿站长认出面貌并被拘押送回巴黎。", consequence:"证实国王勾结外敌，民众对君主制的最后幻想彻底破灭。" } },
  { id:"fr5", title:"瓦尔密战役", year:"1792年9月", period:"1792", category:"military", description:"法国革命军首次击退普奥联军入侵，保卫了年轻的共和国。", sources:["法军参谋部战报","歌德战场日记"], tags:["保卫共和","士气转折"], topicId:"french_revolution", details:{ background:"普奥联军入侵法国企图恢复波旁王朝。", process:"法国革命军在瓦尔密高地以炮战击退入侵军，士气高昂唱起马赛曲。", consequence:"歌德在场感叹'从今天开始世界历史的新纪元开始了'。" } },
  { id:"fr6", title:"路易十六被处决", year:"1793年1月21日", period:"1793", category:"politics", description:"法国国王以叛国罪被送上断头台，震惊整个欧洲。", sources:["革命法庭判决书","当日行刑记录"], tags:["弑君","共和激进化"], topicId:"french_revolution", details:{ background:"国王出逃失败并被指控勾结外国军队叛国。", process:"国民公会投票以微弱多数判处死刑，路易十六在革命广场被斩首。", consequence:"反法同盟成立，法国陷入内外危机与恐怖统治时期。" } },
  { id:"fr7", title:"雅各宾派恐怖统治", year:"1793-1794年", period:"1793-1794", category:"politics", description:"罗伯斯庇尔推行极权高压政策，数万人命丧断头台。", sources:["救国委员会命令","革命法庭死刑清单"], tags:["恐怖统治","大清洗"], topicId:"french_revolution", details:{ background:"共和国面临反法同盟大军压境和国内保王党叛乱的致命威胁。", process:"雅各宾派通过嫌疑犯法令将数万人送上断头台制造大恐怖。", consequence:"极端暴力稳住了前线却令内部人人自危，最终引发反噬的热月政变。" } },
  { id:"fr8", title:"热月政变", year:"1794年7月", period:"1794", category:"politics", description:"罗伯斯庇尔倒台被处决，雅各宾恐怖统治终结。", sources:["巴黎公社档案","国民公会记录"], tags:["恐怖终结","权力反转"], topicId:"french_revolution", details:{ background:"大清洗导致革命队伍内部人人自危。", process:"反罗伯斯庇尔派在国民公会发动政变将其逮捕并次日处决。", consequence:"大革命激进阶段终结，进入保守的督政府时期。" } },
  { id:"fr9", title:"督政府时期", year:"1795-1799年", period:"1795-1799", category:"politics", description:"温和共和派执政但政局动荡腐败蔓延，社会渴望强人秩序。", sources:["督政府法令集","当时报刊社论"], tags:["政局动荡","过渡期"], topicId:"french_revolution", details:{ background:"恐怖统治终结后各派势力混战，经济困难民生凋敝。", process:"五人督政委员会轮流执政但效率低下腐败严重，频繁依靠军队平定叛乱。", consequence:"社会对民主的热情冷却，对强人政治的渴望为拿破仑铺平道路。" } },
  { id:"fr10", title:"拿破仑雾月政变", year:"1799年11月", period:"1799", category:"military", description:"拿破仑发动政变推翻督政府，以第一执政身份开启独裁统治。", sources:["雾月政变公报","拿破仑通信集"], tags:["军事政变","革命终结"], topicId:"french_revolution", details:{ background:"拿破仑凭借在意大利和埃及的军事声望成为最有力的军事强人。", process:"11月9日率军闯入议会解散督政府，自任三执政之首实际独裁。", consequence:"法国大革命的共和实验就此终结，但革命的理念（法典民法等）通过拿破仑传遍欧洲。" } },

  // ===== 冷战 =====
  { id:"cw1", title:"铁幕演说", year:"1946年", period:"1946", category:"politics", description:"丘吉尔警告苏联扩张威胁，'铁幕'一词成为冷战标志。", sources:["富尔顿演说手稿","当日新闻报道"], tags:["冷战开端","意识形态"], topicId:"cold_war", details:{ background:"二战后苏联控制东欧建立缓冲区，美英感到威胁。", process:"丘吉尔在美国富尔顿发表演说警告从波罗的海到亚得里亚海一道铁幕已经降落。", consequence:"冷战意识形态对垒公开化，美苏从盟友变为对手。" } },
  { id:"cw2", title:"马歇尔计划", year:"1948年", period:"1948", category:"economy", description:"美国大规模援助西欧重建以遏制共产主义渗透。", sources:["美国国会援助法案","经济合作署报告"], tags:["欧洲复兴","经济遏制"], topicId:"cold_war", details:{ background:"战后欧洲经济崩溃，左翼政党崛起。", process:"美国注入上百亿美元重建西欧基础设施，苏联拒绝参加并禁止东欧加入。", consequence:"成功复兴西欧并将其牢牢绑定在美国主导的资本主义阵营。" } },
  { id:"cw3", title:"柏林封锁与空运", year:"1948-1949年", period:"1948-1949", category:"military", description:"苏联封锁西柏林陆路，美英发动史无前例的大规模空运。", sources:["美国国安档案","英国空军报告"], tags:["柏林危机","空中桥梁"], topicId:"cold_war", details:{ background:"西方在西柏林推行货币改革触怒苏联。", process:"苏联切断所有陆路交通，美英出动飞机24小时不间断空运物资持续11个月。", consequence:"苏联被迫解除封锁，柏林成为冷战最前沿的象征。" } },
  { id:"cw4", title:"朝鲜战争爆发", year:"1950年", period:"1950-1953", category:"military", description:"朝鲜半岛热战使冷战从欧洲扩展到亚洲，中美直接交锋。", sources:["联合国安理会决议","中国人民志愿军战报"], tags:["热战","中美对抗"], topicId:"cold_war", details:{ background:"半岛南北分裂，北方在苏联支持下南下统一。", process:"美国以联合国名义出兵，中国志愿军入朝参战，双方在三八线反复拉锯。", consequence:"最终以停战协定维持分裂格局，中美对抗格局定型。" } },
  { id:"cw5", title:"柏林墙修建", year:"1961年8月13日", period:"1961", category:"society", description:"东德一夜之间筑起隔离墙，家庭被撕裂成为冷战最残忍象征。", sources:["东德斯塔西档案","西德联邦档案"], tags:["铁幕","德国分裂"], topicId:"cold_war", details:{ background:"大量东德公民经西柏林逃亡导致劳动力危机。", process:"1961年8月13日午夜东德边防军用铁丝网封锁边界，后升级为混凝土墙。", consequence:"至少140人在翻墙时被射杀，柏林墙成为冷战最具冲击力的实体象征。" } },
  { id:"cw6", title:"古巴导弹危机", year:"1962年10月", period:"1962", category:"military", description:"苏联在古巴部署核导弹，人类最接近核毁灭的13天。", sources:["白宫录音档案","苏联解密电报"], tags:["核危机","大国博弈"], topicId:"cold_war", details:{ background:"美国在土耳其部署核弹，苏联为扳回劣势秘密在古巴建导弹基地。", process:"U2侦察机发现基地后肯尼迪宣布海上封锁，13天内美苏全面戒备核按钮在手。", consequence:"双方妥协：苏联撤古巴导弹，美国承诺不侵古巴并秘密撤土耳其核弹。" } },
  { id:"cw7", title:"越南战争", year:"1965-1975年", period:"1965-1975", category:"military", description:"美国深陷越南泥潭，反战运动席卷西方改变一代人价值观。", sources:["五角大楼文件","北越军事档案"], tags:["代理人战争","反战运动"], topicId:"cold_war", details:{ background:"法国撤出后美国介入阻止越南共产主义统一。", process:"美军投入50多万人仍无法击败北越和越共，国内反战运动高涨。", consequence:"1975年西贡陷落美国遭受冷战中最大的战略失败。" } },
  { id:"cw8", title:"苏军入侵阿富汗", year:"1979年", period:"1979-1989", category:"military", description:"苏联陷入长达十年的阿富汗战争泥潭，成为解体催化剂。", sources:["克格勃特别报告","CIA解密文件"], tags:["帝国坟场","战略陷阱"], topicId:"cold_war", details:{ background:"阿富汗亲苏政权面临内乱，苏联决定直接军事干预。", process:"苏军占领要害后却陷入圣战者游击战泥潭，美国通过CIA大量援助反苏武装。", consequence:"十年消耗严重削弱苏联国力，成为苏联解体的重要外部催化剂。" } },
  { id:"cw9", title:"柏林墙倒塌", year:"1989年11月9日", period:"1989", category:"politics", description:"东德开放边境柏林墙在民众欢呼中倒塌，冷战走向终结。", sources:["德国统一档案","戈尔巴乔夫回忆录"], tags:["冷战终结","自由浪潮"], topicId:"cold_war", details:{ background:"戈尔巴乔夫改革引发东欧民主浪潮，东德政权摇摇欲坠。", process:"东德政府误传开放边境指令，数十万市民蜂拥至柏林墙边，边防兵无力阻止打开关口。", consequence:"德国统一进程启动，东欧社会主义阵营多米诺式崩塌。" } },
  { id:"cw10", title:"苏联解体", year:"1991年12月", period:"1991", category:"politics", description:"超级大国苏联正式解体，延续45年的冷战画上句号。", sources:["别洛韦日协议","戈尔巴乔夫辞职演说"], tags:["帝国终结","单极时代"], topicId:"cold_war", details:{ background:"经济困境改革失控加上各加盟共和国独立浪潮不可遏制。", process:"俄罗斯乌克兰白俄罗斯签署别洛韦日协议宣布苏联不复存在，戈尔巴乔夫辞职。", consequence:"冷战结束美国成为唯一超级大国，世界进入单极格局时代。" } },

  // ===== 丝绸之路 =====
  { id:"sr1", title:"张骞出使西域", year:"前138年", period:"前138-前126", category:"politics", description:"汉武帝派张骞凿空西域，开辟东西方陆上交流通道。", sources:["史记大宛列传","汉书西域传"], tags:["凿空西域","文明连接"], topicId:"silk_road", details:{ background:"汉武帝意图联合大月氏夹击匈奴。", process:"张骞被匈奴俘虏扣留十余年后逃脱，到达中亚各国考察。", consequence:"虽未达军事目的但开辟了连接东西方的陆上丝绸之路。" } },
  { id:"sr2", title:"班超经营西域", year:"73-102年", period:"73-102", category:"military", description:"班超以36人出使西域，用外交军事手段重建汉朝对西域的控制。", sources:["后汉书班超传","西域都护府簿册"], tags:["西域经营","军事外交"], topicId:"silk_road", details:{ background:"东汉初年西域被匈奴控制，丝路中断。", process:"班超率36人出使鄯善等国，果断斩杀匈奴使者扭转局势，逐步统一西域50余国。", consequence:"丝路重新畅通，东西方贸易和文化交流进入新阶段。" } },
  { id:"sr3", title:"法显西行求法", year:"399-412年", period:"399-412", category:"society", description:"东晋僧人法显从长安出发经陆路到印度取经，海路归国。", sources:["佛国记","梵文翻译文献"], tags:["佛教传播","文化交流"], topicId:"silk_road", details:{ background:"东晋佛教兴盛但戒律典籍不全。", process:"法显年近七旬从长安出发穿越沙漠高山到达印度学习梵文抄录经典，后从海路返回。", consequence:"带回大量佛经推动了中国佛教的发展，留下珍贵的沿途地理民俗记录。" } },
  { id:"sr4", title:"玄奘西行取经", year:"629-645年", period:"629-645", category:"society", description:"唐僧玄奘历经17年到达天竺取经，带回657部佛经。", sources:["大唐西域记","慈恩寺三藏法师传"], tags:["取经","佛教东传"], topicId:"silk_road", details:{ background:"唐代佛教繁荣但经典翻译存在争议，玄奘决心赴印求真。", process:"私自出关穿越戈壁翻越葱岭到达那烂陀寺学习17年，带回657部经书。", consequence:"推动了中国佛教的巨大发展，《大唐西域记》成为研究丝路最珍贵的文献之一。" } },
  { id:"sr5", title:"唐代丝路贸易鼎盛", year:"7-8世纪", period:"618-907", category:"economy", description:"唐代长安成为国际大都市，丝路贸易达到历史巅峰。", sources:["唐代敦煌文书","阿拉伯旅行家记录"], tags:["国际贸易","文化交融"], topicId:"silk_road", details:{ background:"唐帝国国力强盛对外开放，长安成为世界最大城市。", process:"胡商云集长安经营丝绸瓷器茶叶，西域音乐舞蹈宗教传入中国。", consequence:"丝路成为连接亚欧非的巨型贸易文化网络。" } },
  { id:"sr6", title:"怛罗斯之战", year:"751年", period:"751", category:"military", description:"唐军与阿拉伯联军在中亚交战，造纸术随战俘西传。", sources:["旧唐书","阿拉伯史料"], tags:["东西碰撞","技术传播"], topicId:"silk_road", details:{ background:"唐帝国和阿拔斯王朝在中亚势力范围发生碰撞。", process:"高仙芝率唐军在怛罗斯（今哈萨克斯坦）与阿拉伯联军交战，因盟军叛变大败。", consequence:"虽然唐军战败但被俘工匠将造纸术传至阿拉伯世界，最终传遍欧洲。" } },
  { id:"sr7", title:"马可·波罗来华", year:"1271-1295年", period:"1271-1295", category:"society", description:"威尼斯商人在元朝游历17年，《马可波罗游记》轰动欧洲。", sources:["马可波罗游记","元史外国传"], tags:["东西交流","欧洲启蒙"], topicId:"silk_road", details:{ background:"蒙古帝国统一欧亚大陆使东西方旅行变得相对安全。", process:"马可波罗随父叔经陆路到达元大都在忽必烈朝廷服务17年后由海路返回威尼斯。", consequence:"游记中对东方财富的描述激发了欧洲人对东方的强烈向往为大航海时代埋下伏笔。" } },
  { id:"sr8", title:"郑和下西洋", year:"1405-1433年", period:"1405-1433", category:"economy", description:"明朝郑和率庞大舰队七下西洋，进行了和平的官方远航贸易。", sources:["明实录","瀛涯胜览"], tags:["和平外交","朝贡贸易"], topicId:"silk_road", details:{ background:"明成祖为宣扬国威和寻找建文帝下落派郑和远航。", process:"郑和率200余艘巨舰数万人七次远航到达东南亚印度洋直至东非海岸。", consequence:"展示了中华帝国的和平航海传统，但明朝此后转向海禁。" } },
  { id:"sr9", title:"海上丝路兴起", year:"15世纪后", period:"1400-1600", category:"economy", description:"大航海时代开启后海上贸易取代陆路，中亚商路城市衰落。", sources:["明代海禁史料","葡萄牙航海日志"], tags:["海上贸易","商路转移"], topicId:"silk_road", details:{ background:"欧洲大航海发现了绕过陆路的海上新航线。", process:"葡萄牙人绕好望角直达印度和中国沿海，海运成本远低于陆运。", consequence:"陆上丝绸之路逐渐衰落，中亚商路城市（如撒马尔罕）失去繁荣。" } },
  { id:"sr10", title:"敦煌莫高窟与文明交汇", year:"4-14世纪", period:"366-1368", category:"society", description:"千年间735个洞窟汇聚多元文明艺术，成为丝路最璀璨的文化遗产。", sources:["敦煌莫高窟壁画","敦煌遗书"], tags:["佛教艺术","文化交汇"], topicId:"silk_road", details:{ background:"敦煌位于丝路东段咽喉，是东西方商旅的必经之地。", process:"从前秦到元朝的千年间僧侣和信徒在此开凿735个洞窟创作了大量壁画和彩塑。", consequence:"留下了人类最丰富的佛教艺术遗产，20世纪初藏经洞的发现震惊世界学术界。" } },

  // ===== 美国独立 =====
  { id:"ar1", title:"波士顿惨案", year:"1770年", period:"1770", category:"military", description:"英军向抗议民众开枪致5人死亡，成为反英情绪的催化剂。", sources:["保罗里维尔版画","殖民地报刊"], tags:["殖民抗争","流血事件"], topicId:"american_revolution", details:{ background:"英国在殖民地驻军并强征税收引发不满。", process:"英军与波士顿市民冲突中士兵开枪致5人死亡。", consequence:"事件被宣传为英军暴行极大激化了反英情绪。" } },
  { id:"ar2", title:"波士顿倾茶事件", year:"1773年", period:"1773", category:"politics", description:"殖民地居民化装印第安人将茶叶倒入波士顿港抗议茶税。", sources:["塞缪尔亚当斯通信","英国殖民部档案"], tags:["税收抗争","革命前奏"], topicId:"american_revolution", details:{ background:"英国茶税法引发无代表不纳税的强烈抗议。", process:"殖民地人化装为印第安人将342箱茶叶倾倒入海。", consequence:"英国以强制法案报复，反而加速了殖民地的联合反抗。" } },
  { id:"ar3", title:"列克星敦枪声", year:"1775年4月", period:"1775", category:"military", description:"英军与殖民地民兵在列克星敦交火，独立战争打响第一枪。", sources:["民兵指挥官报告","英军行动令"], tags:["第一枪","武装反抗"], topicId:"american_revolution", details:{ background:"英军企图没收殖民地民兵的武器弹药。", process:"在列克星敦的绿地上英军与民兵对峙后交火，随后在康科德再次激战。", consequence:"'响遍全世界的枪声'标志美国独立战争正式爆发。" } },
  { id:"ar4", title:"《独立宣言》发表", year:"1776年7月4日", period:"1776", category:"politics", description:"十三州宣告脱离英国独立，宣告人人生而平等。", sources:["独立宣言原件","大陆会议纪要"], tags:["独立宣言","天赋人权"], topicId:"american_revolution", details:{ background:"战争已爆发一年多殖民地急需法理依据。", process:"杰斐逊起草的宣言宣告造物主赋予人类不可剥夺的权利，大陆会议通过。", consequence:"既是对英帝国的宣战书也是共和民主实验的号角。" } },
  { id:"ar5", title:"萨拉托加大捷", year:"1777年", period:"1777", category:"military", description:"大陆军在萨拉托加围歼英军主力，扭转战争形势。", sources:["华盛顿军事通信","英军投降记录"], tags:["转折点","外交突破"], topicId:"american_revolution", details:{ background:"英军从加拿大南下企图切断新英格兰。", process:"大陆军在萨拉托加包围了伯戈因率领的英军主力迫其投降。", consequence:"这场胜利直接促使法国决定与美国结盟参战。" } },
  { id:"ar6", title:"法国正式参战", year:"1778年", period:"1778", category:"politics", description:"法国与美国签订同盟条约正式对英宣战，改变战争天平。", sources:["法美友好同盟条约","法国外交部档案"], tags:["法美联盟","国际化"], topicId:"american_revolution", details:{ background:"萨拉托加大捷证明美国能赢促使法国下定决心。", process:"法国提供军队舰队和大量资金援助，西班牙和荷兰也随后加入反英阵营。", consequence:"英国从此面临全球范围的多线作战压力。" } },
  { id:"ar7", title:"约克镇战役", year:"1781年10月", period:"1781", category:"military", description:"美法联军在约克镇围歼英军主力，英军投降独立战争胜利。", sources:["华盛顿战地日志","法军司令部通信"], tags:["决定性战役","独立胜利"], topicId:"american_revolution", details:{ background:"法国海军切断了英军援军的海路。", process:"华盛顿率美法联军围困约克半岛上的康沃利斯主力，英军弹尽粮绝投降。", consequence:"英国承受不住压力启动巴黎和谈，独立战争实质性胜利。" } },
  { id:"ar8", title:"《巴黎条约》签订", year:"1783年", period:"1783", category:"politics", description:"英国正式承认美国独立，确定领土边界。", sources:["巴黎条约原文","英国议会辩论"], tags:["独立承认","领土确定"], topicId:"american_revolution", details:{ background:"约克镇战役后英国主战派下台和平派上台。", process:"双方在巴黎签约英国承认美国独立并划定密西西比河以东为美国领土。", consequence:"美国在国际法上获得了完全独立的主权国家地位。" } },
  { id:"ar9", title:"费城制宪会议", year:"1787年", period:"1787", category:"politics", description:"制定世界第一部成文宪法确立联邦制和三权分立。", sources:["制宪会议记录","联邦党人文集"], tags:["宪政","三权分立"], topicId:"american_revolution", details:{ background:"邦联体制软弱无力各州各自为政。", process:"55名代表在费城秘密开会四个月制定了全新的联邦宪法。", consequence:"确立了联邦制三权分立和总统制成为近代政治典范。" } },
  { id:"ar10", title:"权利法案通过", year:"1791年", period:"1791", category:"society", description:"宪法前十条修正案保障公民基本权利自由。", sources:["权利法案原文","国会辩论记录"], tags:["公民权利","宪法修正"], topicId:"american_revolution", details:{ background:"许多州要求宪法必须明确保障个人权利才同意批准。", process:"麦迪逊起草了12条修正案国会通过了其中10条。", consequence:"保障了言论宗教集会持枪等基本权利成为美国宪政的基石。" } },

  // ===== 工业革命 =====
  { id:"ir1", title:"飞梭发明", year:"1733年", period:"1733", category:"economy", description:"凯伊发明飞梭使织布效率倍增，拉开了纺织业机械化序幕。", sources:["英国专利档案","纺织业协会报告"], tags:["技术创新","纺织革命"], topicId:"industrial_revolution", details:{ background:"英国棉纺织业需求旺盛但手工生产效率低下。", process:"约翰凯伊发明了可以自动来回穿梭的飞梭使织布速度提高一倍。", consequence:"织布效率提升反过来造成纱线供不应求推动了纺纱机的发明。" } },
  { id:"ir2", title:"瓦特改良蒸汽机", year:"1769年", period:"1769", category:"economy", description:"瓦特增加分离冷凝器为工厂提供稳定动力改变世界。", sources:["瓦特专利档案","博尔顿瓦特通信"], tags:["蒸汽机","动力革命"], topicId:"industrial_revolution", details:{ background:"纽科门蒸汽机耗能巨大仅能在煤矿抽水。", process:"瓦特发明分离冷凝器和旋转运动装置使蒸汽机可广泛应用于各种工厂。", consequence:"人类生产摆脱了对畜力风力水力的依赖进入蒸汽时代。" } },
  { id:"ir3", title:"珍妮纺纱机", year:"1764年", period:"1764", category:"economy", description:"哈格里夫斯发明多锭纺纱机使一人可同时操作多个纱锭。", sources:["发明专利记录","纺纱工人回忆"], tags:["纺纱革命","生产效率"], topicId:"industrial_revolution", details:{ background:"飞梭使织布加快但纺纱跟不上供应。", process:"哈格里夫斯以妻子名字命名的珍妮机可同时纺8个纱锭后增至80个。", consequence:"纺纱效率飞跃式提升为工厂制大规模生产奠定了技术基础。" } },
  { id:"ir4", title:"工厂制度确立", year:"1771年", period:"1771", category:"society", description:"阿克莱特建立第一座水力纺纱工厂开创了现代工厂制度。", sources:["工厂营业记录","当时调查报告"], tags:["工厂制度","劳动组织"], topicId:"industrial_revolution", details:{ background:"家庭手工作坊无法满足日益增长的生产需求。", process:"阿克莱特在克隆普福德建立使用水力驱动的大型纺纱厂雇佣数百工人集中生产。", consequence:"工厂制取代家庭手工成为主导生产模式开启了现代工业社会。" } },
  { id:"ir5", title:"第一条公共铁路通车", year:"1825年", period:"1825", category:"economy", description:"斯蒂芬森的蒸汽机车在英国首条公共铁路正式运营。", sources:["斯蒂芬森设计蓝图","泰晤士报报道"], tags:["铁路","交通革命"], topicId:"industrial_revolution", details:{ background:"工厂制下原材料和产品运输成为瓶颈。", process:"世界首条斯托克顿达灵顿铁路通车蒸汽机车牵引车厢轰鸣前行。", consequence:"铁路网飞速延伸改变了人类空间观念和经济格局世界开始加速互联。" } },
  { id:"ir6", title:"卢德运动", year:"1811-1816年", period:"1811-1816", category:"society", description:"纺织工人捣毁机器抗议失业，早期工人阶级的自发反抗。", sources:["工人运动文献","地方治安报告"], tags:["工人反抗","机器恐惧"], topicId:"industrial_revolution", details:{ background:"机器大量替代手工劳动导致大批熟练工匠失业。", process:"以传说中的内德卢德为名纺织工人秘密组织夜间捣毁工厂里的新式纺织机器。", consequence:"政府出动军队镇压但卢德运动展示了工人阶级最初的反抗意识。" } },
  { id:"ir7", title:"宪章运动", year:"1838-1848年", period:"1838-1848", category:"society", description:"英国工人阶级争取普选权等政治权利的第一次大规模运动。", sources:["人民宪章文本","宪章运动请愿书"], tags:["政治权利","工人运动"], topicId:"industrial_revolution", details:{ background:"工人在经济上受剥削又在政治上被排斥没有选举权。", process:"工人领袖起草包含六项要求的人民宪章征集数百万签名三次向议会请愿均遭拒。", consequence:"虽然当时失败但其六项要求后来几乎全部实现开创了和平争取政治权利的先河。" } },
  { id:"ir8", title:"1851年万国博览会", year:"1851年", period:"1851", category:"economy", description:"在伦敦水晶宫举办的首届世博会展示了英国工业霸主地位。", sources:["博览会官方目录","维多利亚女王日记"], tags:["工业成就","国际展览"], topicId:"industrial_revolution", details:{ background:"英国已成为世界工厂急于向全世界展示其工业成就。", process:"在海德公园用铁和玻璃建造的巨型水晶宫中展出了各国工业产品吸引600万参观者。", consequence:"确立了英国作为全球工业领袖的地位同时也刺激了其他国家的工业化追赶。" } },
  { id:"ir9", title:"工业革命向全球扩散", year:"19世纪中后期", period:"1850-1900", category:"economy", description:"工业化从英国扩散到欧陆美国日本，非工业国沦为原料产地。", sources:["各国经济统计","殖民地行政报告"], tags:["全球化","不平等发展"], topicId:"industrial_revolution", details:{ background:"英国工业革命的成功示范效应引发各国追赶。", process:"比利时德国法国美国日本先后启动工业化而中国印度等国的传统手工业遭到廉价工业品的毁灭性冲击。", consequence:"世界分裂为工业化国家和殖民地半殖民地全球不平等格局形成。" } },
  { id:"ir10", title:"电力革命", year:"1880年代", period:"1880-1900", category:"economy", description:"爱迪生和特斯拉引领电力时代使工业进入第二次革命。", sources:["爱迪生实验室记录","西屋电气档案"], tags:["电力","第二次工业革命"], topicId:"industrial_revolution", details:{ background:"蒸汽动力虽强大但传输不便限制了工厂布局。", process:"爱迪生发明实用电灯和直流系统特斯拉发展交流电系统电力开始驱动一切。", consequence:"电力使工厂可以建在任何地方催生了流水线大规模生产和现代都市生活。" } },

  // ===== 一战 =====
  { id:"w1", title:"萨拉热窝事件", year:"1914年6月28日", period:"1914", category:"military", description:"奥匈王储被刺杀在复杂同盟体系下引爆了整个欧洲大战。", sources:["奥匈帝国最后通牒","塞尔维亚回复"], tags:["导火索","民族主义"], topicId:"ww1", details:{ background:"巴尔干半岛是欧洲帝国角逐和民族主义的火药桶。", process:"19岁塞尔维亚族刺客普林西普在街头枪杀了斐迪南大公夫妇。", consequence:"复杂同盟条约连锁反应一个月内欧洲各大国卷入战争深渊。" } },
  { id:"w2", title:"施里芬计划与速决战破产", year:"1914年8月", period:"1914", category:"military", description:"德军试图速胜法国但在马恩河受阻，西线陷入壕沟对峙。", sources:["德军参谋本部作战计划","法军战报"], tags:["速决战","计划破产"], topicId:"ww1", details:{ background:"德国计划六周击败法国再回头对付俄国。", process:"德军经比利时突入法国但在马恩河被法英联军挡住速决梦碎。", consequence:"双方挖掘壕沟形成从海峡到瑞士的600公里僵持防线。" } },
  { id:"w3", title:"毒气战开始", year:"1915年4月", period:"1915", category:"military", description:"德军在伊普尔首次大规模使用氯气战场沦为化学地狱。", sources:["英军化学战报告","红十字会控诉"], tags:["化学武器","战争罪行"], topicId:"ww1", details:{ background:"壕沟战陷入僵局双方寻求打破平衡的新武器。", process:"德军在伊普尔释放150吨氯气黄绿色毒云笼罩法军阵地造成大量伤亡。", consequence:"此后双方竞相使用芥子气等更致命毒剂战场变为人间炼狱。" } },
  { id:"w4", title:"凡尔登绞肉机", year:"1916年", period:"1916", category:"military", description:"一战最漫长血腥战役德法双方在凡尔登死伤近百万人。", sources:["法军阵亡名单","德军战报"], tags:["消耗战","人间绞肉"], topicId:"ww1", details:{ background:"德军总参谋长法金汉企图把法军的血流干。", process:"在凡尔登要塞进行长达10个月的反复争夺与炮击战双方投入数百万人。", consequence:"法军守住阵地但双方均元气大伤成为一战残酷的最佳注脚。" } },
  { id:"w5", title:"索姆河战役", year:"1916年7月", period:"1916", category:"military", description:"英军首日即阵亡近六万人，坦克首次投入实战。", sources:["英军战报","坦克作战日志"], tags:["大规模伤亡","坦克首战"], topicId:"ww1", details:{ background:"英军为减轻凡尔登法军压力发动攻势。", process:"7月1日英军在猛烈炮击后发起冲锋但机枪火力导致首日近6万人伤亡。9月坦克首次投入战斗。", consequence:"索姆河战役持续5个月双方伤亡超百万推进不足10公里。" } },
  { id:"w6", title:"美国参战", year:"1917年4月", period:"1917", category:"politics", description:"德国无限制潜艇战和齐默曼电报促使美国对德宣战。", sources:["威尔逊国会演说","齐默曼电报解密"], tags:["美国参战","战略转折"], topicId:"ww1", details:{ background:"德国为切断英国补给线恢复无限制潜艇战连美国商船也击沉。", process:"再加上齐默曼电报拉墨西哥对美开战的阴谋败露威尔逊向国会请求对德宣战。", consequence:"美国的工业和人力资源彻底倾斜向协约国一方决定了战争最终结局。" } },
  { id:"w7", title:"布列斯特条约", year:"1918年3月", period:"1918", category:"politics", description:"新生的苏维埃俄国与德国单独媾和割让大片领土退出大战。", sources:["苏维埃声明","条约文本"], tags:["苏俄退出","领土割让"], topicId:"ww1", details:{ background:"十月革命后新政权急需和平巩固自身。", process:"列宁主张割让大量领土换取喘息与德国签订苛刻的单独和约。", consequence:"德国得以将东线兵力调往西线进行最后的赌博性进攻。" } },
  { id:"w8", title:"停战协定签署", year:"1918年11月11日", period:"1918", category:"politics", description:"德国在贡比涅森林火车车厢内签署停战协定一战结束。", sources:["停战协定原文","福煦元帅回忆录"], tags:["战争终结","德国投降"], topicId:"ww1", details:{ background:"德军春季攻势失败后在美军参战的压力下持续败退。", process:"1918年11月11日上午11时在贡比涅森林的火车车厢中德方签署停战协定。", consequence:"一战正式结束共造成约2000万人死亡2000万人受伤。" } },
  { id:"w9", title:"凡尔赛条约", year:"1919年6月", period:"1919", category:"politics", description:"战胜国以惩罚性条约强加给德国埋下了二战的种子。", sources:["凡尔赛条约全文","凯恩斯和约的经济后果"], tags:["苛刻和约","仇恨种子"], topicId:"ww1", details:{ background:"法国主张彻底削弱德国美国倡导宽和的十四点。", process:"条约要求德国割让领土支付天价赔款承认战争责任并限制军备。", consequence:"德国视之为民族屈辱魏玛共和国经济崩溃最终为希特勒上台铺平道路。" } },
  { id:"w10", title:"中国参战与五四运动", year:"1917-1919年", period:"1917-1919", category:"society", description:"中国参战却在巴黎和会被出卖，山东问题引发五四运动。", sources:["北洋政府外交档案","五四运动宣言"], tags:["五四运动","民族觉醒"], topicId:"ww1", details:{ background:"中国以14万劳工参与协约国期望在和会上收回权益。", process:"巴黎和会将德国在山东权益转交日本而非归还中国引发全国学生抗议。", consequence:"五四运动标志中国现代民族主义觉醒，直接推动了中国共产党的成立。" } },

  // ===== 大航海时代 =====
  { id:"ae1", title:"恩里克王子与航海学校", year:"15世纪初", period:"1415-1460", category:"politics", description:"葡萄牙王子恩里克资助系统化航海探索开启大航海时代。", sources:["葡萄牙皇家档案","航海图集"], tags:["航海先驱","系统探索"], topicId:"age_of_exploration", details:{ background:"奥斯曼帝国阻断东方陆路贸易欧洲急需新航路。", process:"恩里克王子在萨格里什建立航海基地资助探险家沿非洲西海岸逐步南下。", consequence:"奠定了葡萄牙海洋帝国的基础开启了欧洲系统化远洋探索。" } },
  { id:"ae2", title:"迪亚士到达好望角", year:"1488年", period:"1488", category:"military", description:"葡萄牙航海家迪亚士首次绕过非洲最南端打通东方航路。", sources:["葡萄牙航海日志","地图绘制记录"], tags:["好望角","航路打通"], topicId:"age_of_exploration", details:{ background:"恩里克王子去世后葡萄牙继续沿非洲海岸探索。", process:"迪亚士率船队在暴风中绕过了非洲最南端他称之为风暴角后改名好望角。", consequence:"证实了从海路到达亚洲是可能的为达伽马的印度之旅铺平道路。" } },
  { id:"ae3", title:"哥伦布到达美洲", year:"1492年", period:"1492", category:"politics", description:"横渡大西洋意外到达美洲，欧洲称发现，原住民经历浩劫。", sources:["哥伦布航海日志","西班牙王室通信"], tags:["新大陆","文明碰撞"], topicId:"age_of_exploration", details:{ background:"哥伦布坚信向西航行可到达印度寻得西班牙王室资助。", process:"率三艘船横渡大西洋历经叛变威胁后登陆巴哈马群岛误以为到达了印度。", consequence:"开启了欧洲对美洲长达几百年的殖民征服和原住民的文明浩劫。" } },
  { id:"ae4", title:"达伽马到达印度", year:"1498年", period:"1498", category:"economy", description:"葡萄牙航海家首次经海路到达印度打通了香料贸易直航。", sources:["达伽马航海记录","印度卡利卡特档案"], tags:["印度航路","香料贸易"], topicId:"age_of_exploration", details:{ background:"欧洲对胡椒肉桂等东方香料的需求极为旺盛。", process:"达伽马绕过好望角经东非海岸到达印度西南的卡利卡特建立贸易关系。", consequence:"葡萄牙垄断了印度洋香料贸易攫取了巨额利润。" } },
  { id:"ae5", title:"麦哲伦环球航行", year:"1519-1522年", period:"1519-1522", category:"military", description:"首次完成人类环球航行用生命证实了地球是圆的。", sources:["皮加费塔航海日记","西班牙王室报告"], tags:["环球航行","地球是圆的"], topicId:"age_of_exploration", details:{ background:"麦哲伦相信向西可以找到通往亚洲的新航路。", process:"率265人5艘船出发途中麦哲伦本人在菲律宾被杀仅18人1艘船完成环球。", consequence:"最终证实了地球是圆的并测定了太平洋的广阔程度。" } },
  { id:"ae6", title:"郑和下西洋", year:"1405-1433年", period:"1405-1433", category:"economy", description:"明朝郑和率庞大舰队七下西洋，与欧洲殖民扩张形成对比。", sources:["明实录","瀛涯胜览"], tags:["和平外交","朝贡贸易"], topicId:"age_of_exploration", details:{ background:"明成祖为宣扬国威派郑和率领当时世界最大舰队远航。", process:"七次远航到达东南亚印度洋直至非洲东海岸进行朝贡贸易和外交。", consequence:"展示了中华帝国的和平航海传统但此后明朝转向海禁放弃了海洋。" } },
  { id:"ae7", title:"西班牙征服阿兹特克帝国", year:"1519-1521年", period:"1519-1521", category:"military", description:"科尔特斯率数百人灭亡拥有数百万人口的阿兹特克文明。", sources:["科尔特斯信札","阿兹特克口述史"], tags:["文明灭绝","殖民征服"], topicId:"age_of_exploration", details:{ background:"西班牙人获悉美洲内陆存在富庶的黄金帝国。", process:"科尔特斯利用当地部落矛盾联合仇敌加上天花等疾病的毁灭性传播攻陷了特诺奇蒂特兰。", consequence:"拥有灿烂文化的阿兹特克文明彻底毁灭其黄金被掠夺运回西班牙。" } },
  { id:"ae8", title:"大西洋奴隶贸易", year:"16-19世纪", period:"1500-1870", category:"society", description:"约1200万非洲人被掳为奴隶，欧洲殖民者制造了人类最大规模的强迫迁徙。", sources:["英国奴隶贸易档案","非洲口述历史"], tags:["奴隶贸易","种族压迫"], topicId:"age_of_exploration", details:{ background:"美洲殖民地种植园急需大量廉价劳动力。", process:"欧洲商人在非洲海岸用枪支烈酒换取奴隶，强行装船运往美洲，航行中大量死亡。", consequence:"约1200万非洲人被贩卖至美洲，非洲人口锐减社会结构被毁影响延续至今。" } },
  { id:"ae9", title:"东印度公司成立", year:"1600-1602年", period:"1600-1602", category:"economy", description:"英荷先后成立东印度公司，以公司形式进行殖民扩张和贸易垄断。", sources:["东印度公司特许状","荷兰商务院档案"], tags:["殖民公司","贸易垄断"], topicId:"age_of_exploration", details:{ background:"远洋贸易需要巨额资本和军事力量个人商人无力承担。", process:"英国1600年荷兰1602年先后成立东印度公司，国家授予垄断贸易权和武装权。", consequence:"商业公司拥有了军队和外交权力成为殖民帝国扩张的核心工具。" } },
  { id:"ae10", title:"哥伦布大交换", year:"16世纪起", period:"1500-1700", category:"society", description:"新旧大陆间物种疾病文化大交换，土豆改变旧大陆天花灭绝原住民。", sources:["植物学史料","疫病记录"], tags:["物种交换","疫病传播"], topicId:"age_of_exploration", details:{ background:"欧洲到达美洲后两个半球的生态系统开始交汇。", process:"土豆玉米烟草等从美洲传入旧大陆，马匹小麦等从旧大陆传入美洲。同时天花等疾病毁灭了90%的美洲原住民。", consequence:"彻底改变了全球的生态农业和人口分布是人类历史上影响最深远的生物交换。" } },

  // ===== 美国内战 =====
  { id:"american_civil_war-1", title:"萨姆特堡战役", year:"1861", period:"1861年4月12日—14日", category:"military", description:"南部邦联炮兵向查尔斯顿港的联邦萨姆特堡开火，迫使守军投降，标志着美国内战正式爆发。", sources:["萨姆特堡驻军报告","林肯召集民兵公告"], tags:["萨姆特堡","查尔斯顿","战争爆发","分裂"], topicId:"american_civil_war", details:{
    background:"南卡罗来纳等州宣布脱离后，联邦政府坚持萨姆特堡为国家财产并拒绝移交；林肯就职后决定仅向要塞运送补给，不增援兵力。", process:"1861年4月12日凌晨，邦联炮兵向萨姆特堡持续轰击34小时；守军因弹药与补给耗尽，于14日降旗撤退。", consequence:"林肯宣布召集7.5万名民兵平定叛乱，弗吉尼亚、阿肯色等蓄奴州随之脱离联邦，战争迅速扩大为全国性冲突。"
  } },
  { id:"american_civil_war-2", title:"第一次马纳萨斯战役（第一次牛奔河战役）", year:"1861", period:"1861年7月21日", category:"military", description:"联邦军向弗吉尼亚马纳萨斯进军，试图迅速攻占里士满，却在邦联军反击下溃退，打破北方短期结束战争的幻想。", sources:["联邦陆军官方战史","邦联军 battlefield 报告"], tags:["马纳萨斯","牛奔河","第一次大战","北方溃败"], topicId:"american_civil_war", details:{
    background:"北方舆论与部分政客相信凭借兵力与工业优势可在数月内平定叛乱，联邦军制订了经马纳萨斯向里士满进军的计划。", process:"7月21日，联邦军渡牛奔河进攻邦联阵地，初期取得进展；下午邦联援军乘火车赶到并发动反攻，联邦军与观战平民仓皇后撤。", consequence:"战役暴露联邦军训练与指挥的不足，粉碎“九十天战争”的乐观预期，双方开始大规模扩军与长期动员。"
  } },
  { id:"american_civil_war-3", title:"安蒂特姆战役", year:"1862", period:"1862年9月17日", category:"military", description:"内战中最血腥的单日战役，联邦军阻止了李将军的北进，为林肯发布《解放奴隶宣言》预备宣言提供关键转机。", sources:["麦克莱伦与李将军战报","安蒂特姆战场伤亡统计"], tags:["安蒂特姆","马里兰","单日血战","战略转折"], topicId:"american_civil_war", details:{
    background:"1862年9月，罗伯特·李率军进入马里兰，希望取得北方土地上的胜利以争取英国等国承认；麦克莱伦意外获得李的作战计划。", process:"9月17日，双方在安蒂特姆溪沿岸展开惨烈攻防，反复争夺“邓克教堂”、玉米地和伯恩赛德桥，单日伤亡合计超过2.2万人。", consequence:"李军被迫撤回弗吉尼亚，林肯随即于9月22日发布《解放奴隶宣言》预备宣言，使战争目标从单纯维护联邦转向废除奴隶制。"
  } },
  { id:"american_civil_war-4", title:"《解放奴隶宣言》发布", year:"1863", period:"1863年1月1日", category:"politics", description:"林肯总统颁布宣言，宣布叛乱州奴隶获得自由，并允许非裔美国人加入联邦军队，从根本上改变了战争性质。", sources:["《解放奴隶宣言》原始誊清本","林肯内阁会议记录"], tags:["林肯","解放奴隶","废奴","战争目标"], topicId:"american_civil_war", details:{
    background:"战争进入第二年，废奴呼声高涨，北方需要道义与军事双重转折；安蒂特姆战役的“胜利”为林肯采取行动创造政治时机。", process:"1862年9月22日发表预备宣言，警告叛乱州若在1863年1月1日前不放下武器即解放其奴隶；最终宣言于1863年元旦生效，并授权征召黑人士兵。", consequence:"战争被重新定义为争取人类自由的斗争，削弱了欧洲承认邦联的可能性；至战争结束，约18万非裔美国人在联邦海陆军服役。"
  } },
  { id:"american_civil_war-5", title:"葛底斯堡战役", year:"1863", period:"1863年7月1日—3日", category:"military", description:"李将军第二次北征宾夕法尼亚，在葛底斯堡遭遇联邦军顽强阻击，皮克特冲锋失败后邦联军被迫南撤。", sources:["李将军与米德将军战报","葛底斯堡国家军事公园档案"], tags:["葛底斯堡","宾夕法尼亚","皮克特冲锋","转折点"], topicId:"american_civil_war", details:{
    background:"1863年6月，李将军再度北进，希望以北方土地上的胜利迫使联邦接受谈判，同时缓解弗吉尼亚战场的压力。", process:"7月1日双方骑兵意外遭遇，战斗迅速扩大；2日争夺小圆顶与麦田；3日邦联发起大规模皮克特冲锋，遭联邦军火力重创后失败。", consequence:"邦联军伤亡近2.8万人，战略主动权转交联邦；四个月后林肯在此发表葛底斯堡演说，重申“民有、民治、民享”的国家理念。"
  } },
  { id:"american_civil_war-6", title:"维克斯堡围城战", year:"1863", period:"1863年5月18日—7月4日", category:"military", description:"格兰特率联邦军包围密西西比河重镇维克斯堡，最终迫使守军投降，邦联被切成东西两部分。", sources:["格兰特将军回忆录","维克斯堡守军投降书"], tags:["维克斯堡","密西西比河","格兰特","战略分割"], topicId:"american_civil_war", details:{
    background:"控制密西西比河是联邦“蟒蛇计划”的关键环节；维克斯堡位于河湾高处，是邦联控制河西走廊的核心据点。", process:"格兰特率军南下，在陆路佯攻后渡过密西西比河，击败维克斯堡外围守军，随后对该城实施长达47天的海陆联合包围。", consequence:"7月4日维克斯堡守军投降，联邦完全控制密西西比河，邦联阿肯色、路易斯安那与东部各州的联系被切断。"
  } },
  { id:"american_civil_war-7", title:"谢尔曼向大海进军", year:"1864", period:"1864年11月15日—12月21日", category:"military", description:"谢尔曼军队从亚特兰大进军萨凡纳，切断邦联供应线并摧毁战争资源，成为“总体战”的标志性行动。", sources:["谢尔曼军事命令与报告","萨凡纳当地居民日记"], tags:["谢尔曼","总体战","佐治亚","战争资源"], topicId:"american_civil_war", details:{
    background:"1864年，联邦在东部陷入消耗战；谢尔曼提出通过破坏南方农业、铁路与工业来瓦解邦联战争潜力的战略。", process:"11月中旬，6万余名联邦士兵离开亚特兰大，向萨凡纳推进约300英里，沿途焚毁农田、铁路、桥梁与工厂，并没收牲畜与粮食。", consequence:"行动重创邦联后勤与士气，加速战争结束；但也造成平民苦难与财产损失，成为南方长期怨恨与记忆创伤的来源。"
  } },
  { id:"american_civil_war-8", title:"阿波马托克斯投降", year:"1865", period:"1865年4月9日", category:"military", description:"罗伯特·李将军在弗吉尼亚阿波马托克斯法院向尤利西斯·格兰特投降，标志着美国内战主要陆战的结束。", sources:["阿波马托克斯投降条款原件","格兰特与李将军会谈记录"], tags:["阿波马托克斯","李将军","格兰特","战争结束"], topicId:"american_civil_war", details:{
    background:"1865年初，联邦军在东、西两线同时逼近，李将军试图与北卡罗来纳的约翰斯顿军会合以继续抵抗。", process:"4月9日，李军在阿波马托克斯被格兰特优势兵力包围，李将军请求投降；格兰特给予宽厚的投降条件，允许军官保留佩剑、士兵返家。", consequence:"主要邦联军随即陆续投降，邦联政府瓦解；林肯遇刺使战后重建进程在混乱与对立中开启。"
  } },

  // ===== 黑死病与中世纪欧洲 =====
  { id:"bld-1", title:"黑死病抵达欧洲", year:"1347年10月", period:"1347", category:"society", description:"鼠疫经热那亚商船从克里米亚传入西西里岛，随后迅速扩散至意大利南部和欧洲各地。", sources:["薄伽丘《十日谈》","阿尼奥洛·迪图拉编年史"], tags:["瘟疫传入","热那亚商船"], topicId:"black_death", details:{
    background:"蒙古帝国西征和金帐汗国统治下，欧亚草原贸易路线成为鼠疫杆菌传播的通道。克里米亚卡法围城期间，蒙古军队用抛石机将病死尸体抛入城中。", process:"1347年10月，热那亚商船将瘟疫带入墨西拿港。同年12月到达威尼斯、热那亚，1348年传到法国、西班牙和德国。", consequence:"瘟疫在欧洲形成燎原之势，各国开始采取隔离措施，但当时对病因一无所知。"
  } },
  { id:"bld-2", title:"瘟疫横扫意大利与法国", year:"1348年", period:"1348", category:"society", description:"佛罗伦萨、巴黎等大城市人口锐减，社会日常秩序崩溃，文学与艺术中弥漫死亡主题。", sources:["薄伽丘《十日谈》","巴黎医学院报告"], tags:["佛罗伦萨","巴黎","社会崩溃"], topicId:"black_death", details:{
    background:"意大利和法国是欧洲人口最密集、商业最发达的地区，也是瘟疫传播最快的区域。", process:"佛罗伦萨在数月内丧失约一半人口；巴黎医学院发布星象学解释报告，建议远离腐败空气。", consequence:"城市劳动力短缺，市民对教会和医学的信任下降，鞭笞者运动兴起。"
  } },
  { id:"bld-3", title:"鞭笞者运动与犹太人迫害", year:"1348-1349年", period:"1348-1349", category:"society", description:"恐慌中，欧洲各地出现自我鞭笞赎罪的宗教狂热，同时犹太人被诬为瘟疫传播者而遭屠杀。", sources:["科隆编年史","克莱门斯六世教谕"], tags:["宗教狂热","反犹屠杀"], topicId:"black_death", details:{
    background:"面对无法解释的灾难，民众寻求宗教解释和替罪羊，社会矛盾激化。", process:"鞭笞者团体在欧洲游行，宣称通过自我惩罚可平息上帝愤怒。同时，瑞士、德国、法国等地发生大规模反犹屠杀。", consequence:"教皇克莱门斯六世发布教谕谴责迫害犹太人，但地方迫害仍在继续，欧洲犹太社区遭受重创。"
  } },
  { id:"bld-4", title:"第一次检疫立法", year:"1348年", period:"1348", category:"politics", description:"威尼斯率先建立海上检疫制度，要求来自疫区的船只隔离40天（quaranta giorni）。", sources:["威尼斯市政档案","拉古萨共和国法令"], tags:["检疫制度","公共卫生"], topicId:"black_death", details:{
    background:"城市共和国面临贸易与防疫的矛盾，需要建立有效的隔离机制。", process:"威尼斯规定来自疫区的船只必须在指定岛屿停泊40天；拉古萨（今杜布罗夫尼克）也颁布类似法令。", consequence:"现代检疫制度（quarantine）的起源，为后世公共卫生体系奠定基础。"
  } },
  { id:"bld-5", title:"英国黑死病与劳工法令", year:"1348-1351年", period:"1348-1351", category:"economy", description:"黑死病导致英国劳动力锐减，政府颁布《劳工法令》限制工资上涨，引发社会矛盾。", sources:["英国议会档案","庄园法庭记录"], tags:["劳工法令","工资管制"], topicId:"black_death", details:{
    background:"英国约有一半人口死于黑死病，农业劳动力严重短缺，工资上涨。", process:"议会颁布《劳工法令》，规定工资不得超过瘟疫前水平，违者受罚。", consequence:"法令加剧农民不满，成为1381年瓦特·泰勒农民起义的重要原因之一。"
  } },
  { id:"bld-6", title:"黑死病消退与长期影响", year:"1351年后", period:"1351-1400", category:"society", description:"瘟疫虽逐渐消退，但此后数百年反复爆发，深刻改变了欧洲社会结构和思想文化。", sources:["教会收入统计","庄园经济记录"], tags:["人口恢复","社会转型"], topicId:"black_death", details:{
    background:"黑死病造成欧洲约2500万至5000万人死亡，约占当时欧洲人口的30%-60%。", process:"劳动力稀缺推高工资，农奴制加速瓦解；教会权威受到质疑，个人主义和世俗文化兴起。", consequence:"为文艺复兴和宗教改革创造了社会条件，也促使欧洲医学向经验观察方向发展。"
  } },

  // ===== 义和团运动 =====
  { id:"boxer_rebellion-1", title:"朱红灯平原起义与扶清灭洋", year:"1899", period:"1899年10月", category:"military", description:"1899年10月，山东平原县知县蒋楷镇压义和团，朱红灯率拳民击败官军，正式竖起“天下义和拳、兴清灭洋”旗帜，揭开大规模运动序幕。", sources:["《义和团档案史料》","《庚子国变记》"], tags:["义和团","山东","扶清灭洋"], topicId:"boxer_rebellion", details:{
    background:"甲午战后，山东教案频生，德国强占胶州湾，民众反洋情绪高涨。朱红灯、心诚和尚等在茌平、高唐一带设坛练拳，吸引农民、手工业者加入，逐渐形成以八卦为组织的拳会网络。", process:"1899年10月，平原县令蒋楷派兵捉拿拳民，朱红灯应请支援并击败官军；后在森罗殿战斗中受挫，朱红灯等终被清军捕获处决，但运动已蔓延直隶。", consequence:"平原起义揭开义和团大规模行动序幕，推动“扶清灭洋”口号传播；毓贤的剿抚政策与袁世凯的强硬镇压，又促使山东拳民北流直隶，使运动中心转移。"
  } },
  { id:"boxer_rebellion-2", title:"涞水教案与杨福同被歼", year:"1900", period:"1900年5月", category:"military", description:"1900年5月，直隶涞水县高洛村发生教案，练军分统杨福同前往弹压，22日在石亭遭义和团伏击身亡，震动清廷。", sources:["《义和团档案史料》","《庚子国变记》"], tags:["涞水","教案","杨福同"], topicId:"boxer_rebellion", details:{
    background:"义和团进入直隶后，毁铁路、烧教堂，与教民冲突不断。涞水县高洛村因长期民教矛盾激化，成为冲突焦点，清政府派练军分统杨福同率兵镇压。", process:"1900年5月22日，数千义和团在石亭设伏，击杀杨福同及其随从，随后乘势进攻涿州，沿途拆毁芦保铁路、电杆，清政府剿办政策受到严重挑战。", consequence:"杨福同被杀被清政府视为“戕官”重案，朝廷震惊；事件促使清廷内部抚派声音上升，也加快了义和团向北京、天津推进的步伐。"
  } },
  { id:"boxer_rebellion-3", title:"义和团占据涿州城", year:"1900", period:"1900年5月", category:"politics", description:"1900年5月27日，约三万义和团沿芦保铁路进入涿州并占据州城，知州龚荫培无力应对，清政府剿抚政策由此发生转折。", sources:["《义和团档案史料》","《庚子国变记》"], tags:["涿州","芦保铁路","清政府"], topicId:"boxer_rebellion", details:{
    background:"直隶总督裕禄最初奉命剿办义和团，但义和团声势浩大、诛不胜诛。清廷派刚毅、赵舒翘赴涿州察看，朝中端王载漪等力主招抚，慈禧态度开始转变。", process:"5月27日，数万拳民进入涿州，拆毁铁路、拔掉电杆，知州龚荫培绝食待毙。刚毅回京后奏称“拳民忠贞，神术可用”，清廷遂由剿转抚。", consequence:"涿州占据标志着义和团获得事实上的官方默许，拳民大批涌入京津，运动由地方性冲突升级为威胁中外关系全局的政治事件。"
  } },
  { id:"boxer_rebellion-4", title:"廊坊大捷与西摩尔联军受挫", year:"1900", period:"1900年6月", category:"military", description:"1900年6月10日，英海军中将西摩尔率八国联军约两千人乘火车进京，在廊坊、杨村遭义和团与清军阻击，被迫退回天津。", sources:["《义和团档案史料》","英国国家档案 WO 28/302"], tags:["廊坊","西摩尔","八国联军"], topicId:"boxer_rebellion", details:{
    background:"使馆区形势紧张，各国公使决定派兵进京护馆。6月10日，西摩尔率英、德、俄、美、日、法、意、奥八国联军两千余人由天津乘火车北上。", process:"铁路被拳民破坏，联军在廊坊、杨村一带陷入重围，义和团与董福祥甘军、聂士成武卫前军协同进攻，联军伤亡惨重，于6月26日前后退回天津。", consequence:"西摩尔进军失败被清廷和拳民称为“廊坊大捷”，极大鼓舞了主战派；同时也促使列强增兵大沽，加速全面军事干涉。"
  } },
  { id:"boxer_rebellion-5", title:"大沽陷落与清政府对外宣战", year:"1900", period:"1900年6月", category:"politics", description:"1900年6月17日，联军攻占大沽炮台；慈禧收到虚假情报后态度逆转，21日以光绪名义下诏向十一国宣战。", sources:["《义和团档案史料》","美国国务院历史背景资料"], tags:["大沽炮台","宣战","慈禧"], topicId:"boxer_rebellion", details:{
    background:"使馆被围、联军进逼，清政府内部主战主和争论激烈。慈禧因各国反对废黜光绪、干涉内政而怨恨洋人，但仍犹豫是否公开决裂。", process:"6月17日联军攻陷大沽炮台，同日慈禧收到列强要求她“归政”的虚假照会，勃然大怒，遂决定支持义和团。6月21日，清廷颁布宣战上谕。", consequence:"宣战使清政府与列强公开敌对，东南督抚却实行“东南互保”拒奉诏令；清廷悬赏捕杀洋人，战争规模迅速扩大。"
  } },
  { id:"boxer_rebellion-6", title:"围攻东交民巷使馆与西什库教堂", year:"1900", period:"1900年6-8月", category:"military", description:"1900年6月20日起，义和团与清军围攻北京东交民巷各国使馆及西什库教堂，约三千名外国平民与教民被困达五十五天。", sources:["《庚子国变记》","美国国家档案馆"], tags:["东交民巷","西什库教堂","使馆区"], topicId:"boxer_rebellion", details:{
    background:"6月13日，义和团在北京焚烧教堂，大批教民逃入使馆区和北堂。6月20日德国公使克林德被杀，成为围攻使馆的直接导火索。", process:"董福祥甘军、武卫中军与义和团轮番进攻使馆区，守军由英公使窦纳乐指挥，构筑街垒顽强抵抗；西什库教堂由法兵和教民坚守，围攻持续至8月14日。", consequence:"使馆围攻造成重大伤亡，也使列强有了“解救被困侨民”的道义借口；荣禄暗中保护使馆，显示清廷内部矛盾与策略混乱。"
  } },
  { id:"boxer_rebellion-7", title:"天津保卫战与天津陷落", year:"1900", period:"1900年7月", category:"military", description:"1900年7月，聂士成、张德成等率清军与义和团坚守天津，14日八国联军攻陷天津，直隶总督裕禄兵败自杀。", sources:["《庚子国变记》","《义和团运动史》"], tags:["天津","聂士成","张德成"], topicId:"boxer_rebellion", details:{
    background:"天津是联军进军北京的必经之地，紫竹林租界和老龙头火车站成为攻防焦点。义和团“天下第一团”张德成部与聂士成武卫前军共同承担防御任务。", process:"6月下旬至7月初，义和团与清军多次进攻租界和火车站，7月13日联军总攻天津，聂士成在八里台殉国，14日联军占领天津，裕禄退往北仓后自尽。", consequence:"天津失守使联军获得前进基地，京师震动；宋庆入津后转而镇压义和团，反映清政府已开始调整对团政策，为日后议和埋下伏笔。"
  } },
  { id:"boxer_rebellion-8", title:"八国联军攻陷北京与慈禧西逃", year:"1900", period:"1900年8月", category:"military", description:"1900年8月14日，八国联军攻破北京城门，慈禧携光绪帝等仓皇西逃西安，北京陷入联军分区占领与劫掠。", sources:["《庚子国变记》","Library of Congress Boxer Rebellion photographs"], tags:["北京陷落","慈禧西逃","联军劫掠"], topicId:"boxer_rebellion", details:{
    background:"联军在天津集结后，于8月4日沿运河向北京进发，沿途清军与义和团虽有抵抗但难以阻挡。8月13日联军抵达北京城下。", process:"8月14日凌晨联军从广渠、朝阳等门攻城，与清军、拳民展开巷战，15日基本控制全城。慈禧、光绪化装出逃，经居庸关、大同等地抵达西安。", consequence:"北京陷落标志着清廷战时抵抗失败，联军分区占领北京并公开劫掠；慈禧在流亡途中下令“痛加铲除”义和团，清政府彻底转向求和。"
  } },
  { id:"boxer_rebellion-9", title:"签订《辛丑条约》", year:"1901", period:"1901年9月7日", category:"politics", description:"1901年9月7日，清政府与十一国代表签订《辛丑条约》，赔款4.5亿两白银并允许外国驻军，义和团运动至此终结。", sources:["《辛丑条约》原文","《义和团档案史料》"], tags:["辛丑条约","赔款","议和"], topicId:"boxer_rebellion", details:{
    background:"清廷派李鸿章、奕劻为议和全权大臣，与列强就惩凶、赔款、驻军等问题反复交涉。列强之间既勾结又争夺，美国提出“门户开放”以维护利益均沾。", process:"1901年9月7日，庆亲王奕劻、李鸿章与德、奥、比、西、美、法、英、意、日、荷、俄十一国代表在北京签署议定书，即《辛丑条约》。", consequence:"条约规定赔款4.5亿两、拆毁大沽炮台、允许使馆驻兵、禁止反帝组织等，中国主权严重受损；清廷威信扫地，客观上推动了清末新政与革命运动兴起。"
  } },

  // ===== 古巴导弹危机 =====
  { id:"cuban_missile_crisis-1", title:"苏联导弹秘密运抵古巴", year:"1962", period:"1962年7月—9月", category:"military", description:"苏联通过‘阿纳德尔行动’向古巴秘密运送中程弹道导弹及配套武器，约4万名苏军人员陆续登岛。", sources:["苏联国防部解密文件","美国国家情报评估","冷战国际史项目档案"], tags:["苏联","古巴","秘密部署","核导弹"], topicId:"cuban_missile_crisis", details:{
    background:"1962年，美国已在土耳其、意大利部署木星导弹，并对古巴实施猪湾入侵与持续颠覆活动；苏联希望援助古巴革命并恢复美苏战略平衡。", process:"7月起，苏联货船运载SS-4、SS-5导弹、发射架、核弹头仓库、防空系统和伊尔-28轰炸机抵达古巴，大量军事专家和技术人员进驻。", consequence:"美军U-2侦察发现岛上军事建设异常，但9月初尚未确认核武器；秘密部署为10月危机公开化埋下直接诱因。"
  } },
  { id:"cuban_missile_crisis-2", title:"U-2侦察发现导弹基地", year:"1962", period:"1962年10月14日—16日", category:"military", description:"U-2高空侦察机拍摄到古巴西部圣克里斯托瓦尔导弹基地建设照片，CIA次日确认存在进攻性中程导弹。", sources:["U-2侦察照片","CIA国家照相判读中心报告"], tags:["U-2","侦察","肯尼迪","EXCOMM"], topicId:"cuban_missile_crisis", details:{
    background:"自1962年9月起，美国对驶往古巴的苏联船只和岛上军事设施加强监视，但天气与外交顾虑使U-2飞行一再推迟。", process:"10月14日，空军少校理查德·海瑟尔驾U-2飞越古巴西部，拍摄到疑似SS-4中程弹道导弹发射阵地；15日CIA判读确认。", consequence:"10月16日早晨，肯尼迪总统看到照片后召集国家安全委员会执行委员会（EXCOMM），开始连续13天的高强度危机决策。"
  } },
  { id:"cuban_missile_crisis-3", title:"肯尼迪宣布对古巴实施海上隔离", year:"1962", period:"1962年10月22日", category:"politics", description:"肯尼迪向全国发表电视讲话，公布苏联导弹证据，宣布对古巴实施海上隔离并要求苏联撤除导弹。", sources:["肯尼迪10月22日电视讲话","美洲国家组织公报"], tags:["隔离","封锁","肯尼迪","OAS"], topicId:"cuban_missile_crisis", details:{
    background:"EXCOMM在空袭、全面入侵、海上封锁与外交解决之间争论数日，最终采纳既显示决心又留有谈判余地的‘隔离’方案。", process:"肯尼迪在晚间黄金时段向全国直播，公布U-2照片，宣布对运往古巴的进攻性武器实施隔离，要求苏联撤除导弹，并警告将把古巴发射的核导弹视为苏联对美国的攻击。", consequence:"危机公之于众，全球紧张骤然升级；美洲国家组织次日投票支持隔离，联合国安理会召开紧急会议，苏联船只继续驶向古巴。"
  } },
  { id:"cuban_missile_crisis-4", title:"隔离线上的海上对峙", year:"1962", period:"1962年10月24日", category:"military", description:"多艘苏联货船接近美国海军设立的隔离线，世界屏息等待冲突是否爆发。", sources:["美国海军隔离行动记录","赫鲁晓夫10月24日致肯尼迪信"], tags:["海上对峙","隔离线","苏联船只"], topicId:"cuban_missile_crisis", details:{
    background:"隔离令于24日上午生效，美国海军在古巴周边海域部署舰队，准备拦截并登船检查可疑苏联船只。", process:"苏联油轮和货船逼近隔离线，部分美军舰只已收到开火警告；双方指挥官在无线电中保持高度警戒，媒体称双方‘眼对眼’。", consequence:"赫鲁晓夫最终下令多数苏联船只转向或停航，避免直接海上交火，为外交斡旋创造关键空间，但世界仍处战争边缘。"
  } },
  { id:"cuban_missile_crisis-5", title:"赫鲁晓夫致信肯尼迪提出交易", year:"1962", period:"1962年10月26日", category:"politics", description:"赫鲁晓夫以个人名义致信肯尼迪，提出苏联撤除古巴导弹以换取美国不入侵古巴。", sources:["赫鲁晓夫10月26日致肯尼迪信","联合国代理秘书长吴丹斡旋建议"], tags:["赫鲁晓夫","肯尼迪","谈判","不入侵"], topicId:"cuban_missile_crisis", details:{
    background:"随着海上对峙避免直接冲突，双方开始寻找政治解决方案；苏联高层日益担心局势失控导致核战争。", process:"10月26日晚，赫鲁晓夫以个人名义向肯尼迪发出长信，称苏联导弹纯属防御，呼吁展示政治家智慧，提出‘苏联撤弹、美国承诺不入侵古巴’的交易。", consequence:"肯尼迪政府认为交易基础可行，但要求先停止基地建设并接受核查；这封信为10月28日达成协议奠定直接基础。"
  } },
  { id:"cuban_missile_crisis-6", title:"U-2被击落与‘黑色星期六’", year:"1962", period:"1962年10月27日", category:"military", description:"美军U-2侦察机在古巴上空被苏军防空导弹击落，飞行员阵亡，核战争风险骤增。", sources:["美国空军U-2损失记录","苏联防空部队报告"], tags:["U-2","击落","黑色星期六","核边缘"], topicId:"cuban_missile_crisis", details:{
    background:"10月27日，赫鲁晓夫第二封信追加要求美国撤出土耳其木星导弹；同日安德森少校驾U-2执行新一轮高空侦察任务。", process:"部署在古巴的苏军SA-2防空导弹击中U-2，飞行员鲁道夫·安德森阵亡；美军将领强烈要求立即空袭报复，肯尼迪决定暂不军事报复。", consequence:"同日苏联B-59潜艇遭美军深水炸弹逼迫，艇上军官险些发射核鱼雷；世界一度最接近全面核战争，秘密外交渠道因此加速。"
  } },
  { id:"cuban_missile_crisis-7", title:"赫鲁晓夫宣布撤除古巴导弹", year:"1962", period:"1962年10月28日", category:"politics", description:"赫鲁晓夫通过莫斯科电台宣布拆除古巴导弹基地并运回苏联，危机出现转机。", sources:["赫鲁晓夫10月28日声明","肯尼迪10月28日回复"], tags:["撤除导弹","赫鲁晓夫","肯尼迪","解决"], topicId:"cuban_missile_crisis", details:{
    background:"经过罗伯特·肯尼迪与苏联大使多勃雷宁的秘密会谈，美方口头同意日后撤除土耳其木星导弹，但要求不公开交易内容。", process:"10月28日，莫斯科电台播发赫鲁晓夫声明，宣布已下令拆除古巴进攻性武器并在联合国监督下运回苏联；肯尼迪公开回应表示欢迎。", consequence:"双方达成不公开交易，避免直接军事冲突；但古巴未参与谈判，其主权与五项要求未获充分尊重，感到被大国出卖。"
  } },
  { id:"cuban_missile_crisis-8", title:"隔离解除与危机后续安排", year:"1962—1963", period:"1962年11月—1963年4月", category:"politics", description:"苏联导弹与轰炸机撤离古巴，美国逐步解除隔离并建立美苏热线。", sources:["联合国核查报告","美苏热线协议","部分禁止核试验条约"], tags:["撤离","热线","军备控制","后续"], topicId:"cuban_missile_crisis", details:{
    background:"危机虽在10月28日结束，但导弹核查、IL-28轰炸机撤离及土耳其木星导弹安排等后续问题仍待解决。", process:"11月起，苏联导弹装船离境；11月20日肯尼迪宣布隔离结束；1963年4月美国悄悄撤除土耳其木星导弹，美苏建立直接通信热线。", consequence:"危机推动1963年《部分禁止核试验条约》和后续军控对话，但美国对古巴经济封锁与古巴主权争议延续至今。"
  } },

  // ===== 非殖民化与亚非拉独立 =====
  { id:"decolonization-1", title:"印度与巴基斯坦独立", year:"1947", period:"1947", category:"politics", description:"1947年8月15日，英属印度解体，印度与巴基斯坦分治独立，成为南亚首个摆脱殖民统治的大国，开启了亚洲非殖民化的浪潮。", sources:["《印度独立法案》","尼赫鲁《命运之约》演讲"], tags:["英国殖民","印巴分治","南亚独立"], topicId:"decolonization", details:{
    background:"二战后英国国力衰退，难以维持对南亚的殖民统治；印度国大党主张统一独立，穆斯林联盟则要求建立穆斯林国家。1946年英国内阁使团调停失败，宗教与族群冲突不断升级，分治方案逐渐成为各方接受的现实选择。", process:"1947年7月英国议会通过《印度独立法案》，8月14日巴基斯坦、8月15日印度相继宣布独立；尼赫鲁在制宪会议上发表《命运之约》演说，但独立同时立即爆发大规模人口迁徙与教派暴力冲突。", consequence:"印巴分治造成约一千四百万人流离失所、数十万人死亡，两国此后因克什米尔归属等问题长期对立并爆发多次战争；然而印度与巴基斯坦的独立也极大鼓舞了亚洲、非洲其他殖民地的独立运动，并改变了英联邦与国际秩序的形态。"
  } },
  { id:"decolonization-2", title:"印度尼西亚正式独立", year:"1949", period:"1945-1949", category:"politics", description:"印尼民族主义者于1945年宣布独立，经过四年反荷武装斗争与国际外交博弈，荷兰最终于1949年12月移交主权。", sources:["《海牙协定》","苏加诺独立宣言"], tags:["荷兰殖民","东南亚","民族革命"], topicId:"decolonization", details:{
    background:"日本投降后，苏加诺与哈达于1945年8月17日发表《独立宣言》，迅速建立共和国；但荷兰试图恢复殖民统治，双方爆发独立战争。美国与国际舆论逐渐同情印尼民族主义者，联合国多次介入调停。", process:"1947年与1948年荷兰发动两次大规模军事进攻，并逮捕苏加诺等民族领袖；在国际压力下，1949年11月荷兰与印尼代表在荷兰海牙签署《海牙圆桌协定》，12月27日荷兰正式移交主权。", consequence:"印尼成为东南亚人口最多、面积最大的独立国家，极大鼓舞了马来亚、菲律宾等地区的反殖民斗争；然而西伊里安主权归属问题悬而未决，延续至1960年代初才最终解决，独立初期的政治动荡也为后续威权体制埋下伏笔。"
  } },
  { id:"decolonization-3", title:"奠边府战役与日内瓦协定", year:"1954", period:"1954", category:"military", description:"越盟在奠边府战役中击败法军，迫使法国撤出印度支那；日内瓦会议以北纬17度线临时分裂越南，开启后续长期冲突。", sources:["《日内瓦协定》","法军奠边府战报"], tags:["越南","法国殖民","冷战"], topicId:"decolonization", details:{
    background:"二战后法国重返印度支那，越南独立同盟会在胡志明领导下展开游击战。1953年末法军空降奠边府建立据点，试图切断越盟补给线并迫使对方进行正面决战，以挽回殖民战争颓势。", process:"1954年3月至5月，越盟以重炮与坑道战术包围奠边府；5月7日法军投降。同年7月日内瓦会议结束法国在印度支那的殖民统治，越南、老挝、柬埔寨获得独立，越南以北纬17度线临时分治。", consequence:"法国殖民势力退出东南亚，但越南分裂为南北两个政权，为日后美国深度介入越南战争埋下伏笔；奠边府胜利同时证明亚洲民族武装力量可以在军事上击败西方殖民军队，深刻改变了第三世界的反殖信心与大国战略计算。"
  } },
  { id:"decolonization-4", title:"万隆会议召开", year:"1955", period:"1955", category:"politics", description:"1955年4月，29个亚非国家在印度尼西亚万隆召开会议，提出反对殖民主义、种族主义与大国干涉的十项原则，奠定不结盟运动基础。", sources:["《万隆会议最后公报》","苏加诺开幕演说"], tags:["亚非团结","不结盟运动","反殖民主义"], topicId:"decolonization", details:{
    background:"朝鲜战争结束后，新独立的亚非国家希望在国际事务中发出独立声音，不愿卷入美苏冷战对抗；印尼、印度、缅甸、锡兰和巴基斯坦五国发起倡议，邀请亚非国家共商合作与反殖民大计。", process:"1955年4月18日至24日，万隆会议在独立宫举行；苏加诺发表《让新亚洲和新非洲诞生吧！》开幕演说，周恩来提出“求同存异”以弥合分歧；会议最终通过包含和平共处十项原则的公报。", consequence:"会议促成“万隆精神”，推动1961年不结盟运动正式成立；亚非国家在国际舞台上形成一股独立力量，但与会国在冷战阵营与社会制度上的分歧也显现了南南团结的脆弱性，预示了后殖民国家间后来的分裂与冲突。"
  } },
  { id:"decolonization-5", title:"加纳独立", year:"1957", period:"1957", category:"politics", description:"1957年3月6日，英属黄金海岸成为撒哈拉以南非洲首个独立的黑人国家，改名加纳，恩克鲁玛提出“非洲必须统一”的泛非主义理想。", sources:["《加纳独立法》","恩克鲁玛独立日演说"], tags:["泛非主义","英国殖民","西非"], topicId:"decolonization", details:{
    background:"二战后加纳可可经济繁荣，民族资产阶级、知识分子与工人阶级迅速壮大；恩克鲁玛从美国与英国返国后组建人民大会党，以“立即自治”为口号，通过罢工、示威与选举推动非暴力抗争。", process:"1951年人民大会党赢得立法选举，恩克鲁玛虽在狱中仍获释出任政府事务领导人；经过数次宪法改革与1956年全民公投，英国议会于1957年通过《加纳独立法》，3月6日承认加纳独立。", consequence:"加纳独立激励了整个非洲大陆的解放运动；恩克鲁玛积极支持其他殖民地独立，并于1963年参与创建非洲统一组织，但其后来的威权统治与经济困境也暴露了后殖民国家的治理挑战。"
  } },
  { id:"decolonization-6", title:"古巴革命", year:"1959", period:"1953-1959", category:"military", description:"卡斯特罗领导的“七二六运动”推翻亲美独裁政权巴蒂斯塔，建立革命政府，成为拉丁美洲反帝反殖斗争的标志性事件。", sources:["《历史将宣判我无罪》","《纽约时报》革命报道"], tags:["拉丁美洲","反帝","冷战"], topicId:"decolonization", details:{
    background:"古巴长期受美国资本控制，糖业经济与赌场旅游业的繁荣并未惠及普通民众，巴蒂斯塔政权腐败独裁；1953年卡斯特罗攻打蒙卡达兵营失败，在辩护演说中提出《历史将宣判我无罪》，成为革命旗帜。", process:"1956年卡斯特罗等人在马埃斯特腊山区开展游击战，逐渐扩大影响并赢得城市民众支持；1959年1月1日巴蒂斯塔出逃，革命军进入哈瓦那，卡斯特罗掌权并随即推行土地改革与国有化。", consequence:"古巴革命引发美国强烈敌视，1961年猪湾入侵与1962年导弹危机接踵而来；革命政权在拉美与非洲积极支持反殖民武装斗争，深刻影响了第三世界左翼运动与冷战格局，同时也使加勒比地区成为超级大国对峙的前沿。"
  } },
  { id:"decolonization-7", title:"“非洲年”与刚果独立", year:"1960", period:"1960", category:"politics", description:"1960年被称为“非洲年”，17个非洲国家获得独立；同年6月比属刚果独立，但随即陷入政治危机与外部干涉。", sources:["联合国大会第1514号决议","《刚果独立宣言》"], tags:["非洲独立","联合国","冷战干涉"], topicId:"decolonization", details:{
    background:"二战后非洲民族意识高涨，1960年联合国通过《给予殖民地国家和人民独立宣言》；比利时在突如其来的独立压力下仓促准备刚果独立，但几乎未培养本地行政、军事与技术人才，留下严重治理真空。", process:"1960年6月30日刚果共和国独立，帕特里斯·卢蒙巴出任总理；独立后数周内军队哗变、加丹加省在比利时支持下分裂、联合国介入维和，美苏对峙相继发生，卢蒙巴于1961年被捕并遇害。", consequence:"“非洲年”标志着非洲大陆政治版图的根本性重塑，激励了南部非洲等地的解放运动；刚果危机则暴露出新独立国家脆弱的政治结构、殖民经济遗产与冷战大国干预的致命结合，成为非洲后殖民困境的缩影。"
  } },
  { id:"decolonization-8", title:"阿尔及利亚独立", year:"1962", period:"1954-1962", category:"military", description:"经过八年残酷战争，法国与阿尔及利亚民族解放阵线签署《埃维昂协议》，阿尔及利亚于1962年7月正式独立。", sources:["《埃维昂协议》","戴高乐自决演说"], tags:["法国殖民","阿尔及利亚战争","北非"], topicId:"decolonization", details:{
    background:"1830年起法国殖民阿尔及利亚，将其视为本土延伸，迁入大量欧洲定居者；二战后阿尔及利亚民族解放阵线（FLN）成立，1954年11月1日发动武装起义，战争造成数十万阿尔及利亚人死亡。", process:"1959年戴高乐首次承认阿尔及利亚人民自决权；1960年“街垒周”与1961年将军叛乱显示法国内部严重分裂；1962年3月18日法国与FLN签署《埃维昂协议》，7月1日公投以99.7%支持独立。", consequence:"阿尔及利亚独立终结了“法属阿尔及利亚”神话，促使近百万欧洲定居者返法并深刻改变法国社会；FLN建立一党制国家，战争中的暴行、酷刑与创伤至今仍是法阿关系与历史记忆中最敏感的议题，长期影响两国政治与身份认同。"
  } },

  // ===== 甲午战争 =====
  { id:"fsj-1", title:"东学党起义与中日同日出兵", year:"1894年6月", period:"1894", category:"politics", description:"朝鲜爆发东学党起义，清朝应朝鲜请求派兵，日本也借机出兵，双方形成军事对峙。", sources:["日本外交文书","清季外交史料"], tags:["朝鲜问题","中日对峙"], topicId:"first_sino_japanese_war", details:{
    background:"1894年朝鲜东学党起义，朝鲜政府向清朝求援。日本以保护使馆和侨民为由大举派兵。", process:"清军叶志超部、日军大岛义昌部先后进入汉城。起义平定后，日本拒绝撤军，不断增兵。", consequence:"中日两国在朝鲜形成对峙，日本积极寻找开战借口，战争阴云笼罩朝鲜半岛。"
  } },
  { id:"fsj-2", title:"丰岛海战与高升号事件", year:"1894年7月25日", period:"1894", category:"military", description:"日本联合舰队在丰岛海面偷袭清军运兵船，击沉英国商轮高升号，战争正式爆发。", sources:["日本海军战史","北洋海军档案"], tags:["丰岛海战","不宣而战"], topicId:"first_sino_japanese_war", details:{
    background:"日本已决定开战，编组联合舰队，寻找机会袭击清军。", process:"日军第一游击队袭击济远、广乙，并击沉英国商船高升号，船上870余名清军官兵殉难。", consequence:"日本不宣而战，8月1日中日双方正式宣战，甲午战争全面爆发。"
  } },
  { id:"fsj-3", title:"平壤战役与黄海海战", year:"1894年9月", period:"1894", category:"military", description:"日军攻陷平壤，随后北洋水师与日本联合舰队在黄海展开主力决战，北洋水师损失惨重。", sources:["日清战史","丁汝昌奏折"], tags:["平壤战役","黄海海战"], topicId:"first_sino_japanese_war", details:{
    background:"清军退出朝鲜后，双方在朝鲜半岛和中国东北展开陆战，海军主力也准备决战。", process:"9月15日平壤失守，清军主将叶志超弃城而逃。9月17日黄海海战，北洋水师致远、经远等舰沉没，邓世昌殉国。", consequence:"清军陆战溃败，北洋水师退守威海卫，黄海制海权落入日本手中。"
  } },
  { id:"fsj-4", title:"旅顺大屠杀", year:"1894年11月", period:"1894", category:"society", description:"日军攻陷旅顺后，对城内平民和战俘进行了持续数天的大规模屠杀。", sources:["纽约世界报","旅顺屠杀调查报告"], tags:["战争罪行","旅顺"], topicId:"first_sino_japanese_war", details:{
    background:"日军在辽东半岛登陆，迅速攻占金州、大连、旅顺。", process:"11月21日旅顺陷落后，日军对城内进行大规模屠杀，仅留少数人收尸，遇难者约两万人。", consequence:"国际社会震惊，日本形象受损，但西方主要国家仍保持观望态度。"
  } },
  { id:"fsj-5", title:"威海卫之战与北洋水师覆灭", year:"1895年1-2月", period:"1895", category:"military", description:"日军海陆夹击威海卫，北洋水师被困刘公岛，最终全军覆没。", sources:["威海降约","丁汝昌遗书"], tags:["威海卫","北洋水师"], topicId:"first_sino_japanese_war", details:{
    background:"黄海战后北洋水师退守威海卫，日军决定从山东半岛登陆，围歼北洋舰队。", process:"日军攻占威海卫南北帮炮台，以陆上炮火轰击港内舰船。丁汝昌拒降自杀，刘步蟾等殉国。", consequence:"北洋水师全军覆没，标志着清朝三十年洋务运动自强成果的毁灭。"
  } },
  { id:"fsj-6", title:"《马关条约》签订", year:"1895年4月17日", period:"1895", category:"politics", description:"李鸿章与伊藤博文在日本马关签订和约，中国割地赔款，丧失大量主权。", sources:["马关条约原文","日本外交文书"], tags:["马关条约","割地赔款"], topicId:"first_sino_japanese_war", details:{
    background:"清军陆海两战皆败，清政府被迫求和，派李鸿章赴日谈判。", process:"条约规定中国承认朝鲜独立，割让辽东半岛、台湾全岛及澎湖列岛，赔偿白银2亿两，开放沙市、重庆、苏州、杭州为商埠。", consequence:"中国半殖民地化程度加深，民族危机空前严重，随后发生三国干涉还辽和台湾抗日。"
  } },
  { id:"fsj-7", title:"三国干涉还辽", year:"1895年4-11月", period:"1895", category:"politics", description:"俄、德、法三国联合干涉，迫使日本将辽东半岛归还中国。", sources:["三国干涉照会","日本外交文书"], tags:["三国干涉","辽东半岛"], topicId:"first_sino_japanese_war", details:{
    background:"俄国担心日本占领辽东半岛威胁其在东北的利益，联合德、法进行干涉。", process:"三国向日本发出照会，要求日本归还辽东半岛。日本在国际压力下被迫接受，但向中国追加3000万两赎辽费。", consequence:"中国虽收回辽东，但国际地位进一步下降，也暴露了列强瓜分中国的野心。"
  } },

  // ===== 朝鲜战争 =====
  { id:"korean_war-1", title:"朝鲜人民军越过三八线，战争爆发", year:"1950", period:"1950年6月", category:"military", description:"1950年6月25日凌晨，朝鲜人民军越过三八线南下，朝鲜战争全面爆发。南朝鲜军队仓促应战，三天后汉城陷落，战线迅速向釜山方向推移。", sources:["联合国朝鲜委员会报告","朝鲜人民军战史资料"], tags:["三八线","战争爆发","汉城陷落"], topicId:"korean_war", details:{
    background:"二战结束后，美苏以北纬38度线分区占领朝鲜半岛，1948年南北分别建国。双方均声称代表全朝鲜，边境冲突持续不断，军事对峙日趋紧张。", process:"6月25日人民军主力沿开城—汉城轴线发起进攻，坦克与炮兵协同突进。南朝鲜军队装备薄弱、指挥混乱，27日放弃汉城，随后向大田、大邱节节后退。", consequence:"战争初期朝鲜人民军迅速控制半岛90%以上土地，将美韩联军压缩在釜山防御圈内，也直接促使美国决定武力介入并推动联合国安理会采取行动。"
  } },
  { id:"korean_war-2", title:"联合国安理会通过决议，组建联合国军", year:"1950", period:"1950年6-7月", category:"politics", description:"6月25日至7月7日，联合国安理会先后通过第82、83、84号决议，认定朝鲜进攻破坏和平，建议会员国援助韩国，并授权以美国为首的联合司令部统率联合国军。", sources:["联合国安理会第82、83、84号决议","杜鲁门总统声明"], tags:["联合国","集体安全","杜鲁门"], topicId:"korean_war", details:{
    background:"苏联因抗议中华人民共和国未能恢复联合国席位而缺席安理会，美国得以主导通过一系列决议，将朝鲜军事行动定性为“武装攻击”。", process:"6月25日通过第82号决议要求立即停火；27日第83号决议建议会员国援助韩国；7月7日第84号决议设立以麦克阿瑟为总司令的联合国军司令部。", consequence:"联合国军正式成立，包括美军主力及英、加、澳、土等16国部队，战争由此具有国际干预性质，也使冲突从内战升级为冷战代理战争。"
  } },
  { id:"korean_war-3", title:"釜山防御圈与仁川登陆", year:"1950", period:"1950年8-9月", category:"military", description:"8月初联合国军依托釜山周边构筑环形防御，抵挡朝鲜人民军攻势；9月15日麦克阿瑟指挥仁川登陆，切断人民军补给线，战局发生根本逆转。", sources:["美国陆军朝鲜战争战史","仁川登陆作战影像"], tags:["釜山防御圈","仁川登陆","麦克阿瑟"], topicId:"korean_war", details:{
    background:"至8月初，联合国军退守釜山周边狭小区域，兵力与火力逐渐增强；人民军补给线拉长、兵力损耗严重，攻势日趋乏力。", process:"9月15日，美军第十军在海空军支援下于仁川实施两栖登陆，同时釜山守军发起反攻。登陆部队迅速收复汉城，切断半岛腰部的人民军退路。", consequence:"朝鲜人民军主力被包围击溃，联合国军越过三八线北进，战争目标从“恢复韩国”转向“统一朝鲜”，为后续中国介入埋下伏笔。"
  } },
  { id:"korean_war-4", title:"中国人民志愿军入朝参战", year:"1950", period:"1950年10月", category:"military", description:"10月8日毛泽东签署命令组建中国人民志愿军；10月19日彭德怀率部跨过鸭绿江，25日打响第一次战役，中国正式大规模参战。", sources:["毛泽东《关于组成中国人民志愿军的命令》","《抗美援朝战争史》"], tags:["抗美援朝","鸭绿江","彭德怀"], topicId:"korean_war", details:{
    background:"联合国军逼近中朝边境，美军飞机多次侵入中国领空轰炸东北；朝鲜政府紧急求援。中共中央经反复讨论，作出“抗美援朝、保家卫国”决策。", process:"志愿军采取昼伏夜行、迂回包围战术秘密入朝。10月25日在温井与联合国军接触，随后发起第一次战役，将西线敌军击退至清川江以南。", consequence:"中国参战使战争规模急剧扩大，战场形势从联合国军北进转为双方在三八线附近的拉锯，也使战争从“有限战争”走向长期僵持。"
  } },
  { id:"korean_war-5", title:"长津湖战役与第二次战役", year:"1950", period:"1950年11-12月", category:"military", description:"1950年11月下旬至12月，志愿军在东西两线发起第二次战役，东线长津湖地区第九兵团重创美军陆战一师，迫使其从兴南撤退。", sources:["《中国人民志愿军抗美援朝战史》","美军陆战一师战史"], tags:["长津湖","第二次战役","兴南撤退"], topicId:"korean_war", details:{
    background:"麦克阿瑟发动“圣诞回家”攻势，联合国军分两线北进。志愿军利用敌方轻敌情绪，预设伏兵，准备在山区展开反击。", process:"11月25日西线志愿军向美韩军发起猛攻，收复平壤；东线第9兵团在长津湖严寒中包围美军陆战一师，经苦战后美军突破包围从海上撤退。", consequence:"联合国军被迫全线南撤至三八线以南，中朝军队收复三八线以北大部分地区。战役虽代价高昂，但彻底粉碎了联合国军迅速结束战争的企图。"
  } },
  { id:"korean_war-6", title:"志愿军第三次战役与汉城易手", year:"1951", period:"1951年1月", category:"military", description:"1950年12月31日至1951年1月，中朝军队发起第三次战役，突破三八线防御，1月4日再度占领汉城，将战线推进至三七线附近。", sources:["《抗美援朝战争史》","联合国军战报"], tags:["第三次战役","汉城","三八线"], topicId:"korean_war", details:{
    background:"联合国军在三八线构筑防御阵地，但士气受挫、补给线拉长；中朝军队则在休整后乘胜追击，试图彻底击溃联合国军。", process:"战役于除夕夜发起，志愿军在中部突破临津江防线，多路向汉城迂回。联合国军为避免被围主动撤退，1月4日中朝军队进入汉城。", consequence:"战线南推加剧了联合国军内部关于战争目标的争论，美国随后调整战略，任命李奇微接任第八集团军司令，战争转入相持阶段。"
  } },
  { id:"korean_war-7", title:"停战谈判在开城—板门店启动", year:"1951", period:"1951年7月", category:"politics", description:"1951年7月10日，交战双方代表在开城开始停战谈判，随后移至板门店。谈判围绕军事分界线、战俘遣返等问题展开，历时两年。", sources:["板门店谈判记录","《朝鲜停战协定》"], tags:["停战谈判","板门店","战俘遣返"], topicId:"korean_war", details:{
    background:"双方在三八线附近形成僵持，任何一方都难以取得决定性胜利。美国国内厌战情绪上升，中国也希望通过谈判巩固战果。", process:"谈判初期因议程、军事分界线、战俘自愿遣返等问题多次中断。双方边谈边打，围绕高地在局部展开激烈争夺战。", consequence:"谈判成为战争后期主旋律，双方力量消耗与政治博弈交织，最终为1953年停战协定奠定基础，但半岛分裂状态并未解决。"
  } },
  { id:"korean_war-8", title:"《朝鲜军事停战协定》签署", year:"1953", period:"1953年7月", category:"politics", description:"1953年7月27日，朝中方与联合国军代表在板门店签署《朝鲜军事停战协定》，划定军事分界线，设立非军事区，战争停火。", sources:["《朝鲜军事停战协定》文本","联合国大会第498号决议"], tags:["停战协定","非军事区","板门店"], topicId:"korean_war", details:{
    background:"1953年斯大林逝世后，苏联新领导层推动缓和；美国艾森豪威尔政府也希望结束战争。双方在中立国遣返委员会等问题上达成妥协。", process:"7月27日上午10时，朝鲜人民军最高司令官金日成、中国人民志愿军司令员彭德怀与联合国军总司令克拉克分别在协定上签字，当晚22时生效。", consequence:"朝鲜半岛沿三八线附近停火，但南北双方并未签署和平条约，技术上仍处于战争状态；半岛分裂固化，成为冷战在东亚的重要前线。"
  } },

  // ===== 蒙古帝国的扩张 =====
  { id:"mongol_empire-1", title:"铁木真称成吉思汗，蒙古帝国建立", year:"1206年", period:"1206", category:"politics", description:"1206年，铁木真在斡难河源召开忽里台大会，被推举为全蒙古的大汗，尊号成吉思汗，大蒙古国正式成立。", sources:["《蒙古秘史》","《元史·太祖本纪》"], tags:["帝国建立","草原统一","成吉思汗"], topicId:"mongol_empire", details:{
    background:"12世纪末的蒙古高原部落林立，塔塔儿、克烈、乃蛮、蔑儿乞等部相互攻伐。铁木真历经幼年丧父、部众离散，通过联姻、结盟与战争逐步统一蒙古各部。", process:"1206年春，铁木真在斡难河源头召集忽里台大会，确立千户制、怯薛护卫军与大扎撒法典，被众部推举为成吉思汗，意为『海洋般的大汗』或『普天下之汗』。", consequence:"蒙古由分散部落转变为高度军事化的统一国家，随即开始对西夏、金朝及西域的扩张，开启了半个多世纪的欧亚征服。"
  } },
  { id:"mongol_empire-2", title:"蒙古伐金与野狐岭之战", year:"1211-1215年", period:"1211-1215", category:"military", description:"成吉思汗以报祖先之仇为名发动对金战争，野狐岭一役击溃金军主力，1215年攻占金中都。", sources:["《元史·太祖本纪》","《圣武亲征录》"], tags:["蒙金战争","野狐岭","战略转折"], topicId:"mongol_empire", details:{
    background:"金朝长期对蒙古施行『减丁』政策并杀害成吉思汗先祖俺巴孩汗，双方积怨深重。金朝此时已步入衰落，内部腐败、军力松弛。", process:"1211年成吉思汗亲率大军南下，在野狐岭与会河堡连续大败金军。蒙古骑兵以机动战术绕过金朝防线，1215年攻陷中都（今北京），金宣宗被迫迁都汴京。", consequence:"金朝失去华北半壁，蒙古获得中原先进技术与大量人口，为后续灭金与西征奠定基础。"
  } },
  { id:"mongol_empire-3", title:"成吉思汗西征花剌子模", year:"1219-1225年", period:"1219-1225", category:"military", description:"因商队被屠杀、使节被辱，成吉思汗亲率大军西征，灭亡中亚强国花剌子模。", sources:["《世界征服者史》","《史集》"], tags:["花剌子模","中亚征服","蒙古西征"], topicId:"mongol_empire", details:{
    background:"花剌子模沙摩诃末统治下的帝国控制中亚商路。1218年，蒙古商队在讹答剌被当地长官杀害，成吉思汗遣使交涉又遭羞辱，遂决定西征。", process:"1219年成吉思汗率约十五至二十万军队分路进攻，攻占讹答剌、布哈拉、撒马尔罕等城。摩诃末逃亡里海小岛病死，其子札兰丁逃往印度。", consequence:"花剌子模灭亡，蒙古首次深入伊斯兰世界，控制丝绸之路中段。哲别、速不台率军追击至高加索与南俄，为后续西征打开通道。"
  } },
  { id:"mongol_empire-4", title:"灭亡西夏与成吉思汗去世", year:"1227年", period:"1227", category:"military", description:"成吉思汗第六次征西夏，夏末帝李睍投降，西夏灭亡；同年成吉思汗病逝于征途中。", sources:["《蒙古秘史》","《元史·太祖本纪》"], tags:["西夏灭亡","成吉思汗之死","继承问题"], topicId:"mongol_empire", details:{
    background:"西夏长期对蒙古时服时叛，并拒绝派兵随征花剌子模。成吉思汗决意彻底征服西夏以消除侧翼威胁。", process:"1226年至1227年，蒙古军攻陷西夏城池。夏末帝李睍出降后，蒙古按惯例对顽强抵抗的城池进行屠戮。成吉思汗在六盘山附近的清水县病逝，死因诸说不一。", consequence:"西夏灭亡，党项文明遭受重创。成吉思汗临终前定下借道宋境灭金的战略，其遗体秘葬起辇谷，帝国由幼子拖雷监国。"
  } },
  { id:"mongol_empire-5", title:"蒙古灭金与三峰山之战", year:"1234年", period:"1232-1234", category:"military", description:"窝阔台汗与拖雷联兵攻金，三峰山雪夜歼灭金军主力，1234年蔡州陷落，金朝灭亡。", sources:["《元史·太宗本纪》","《金史·哀宗本纪》"], tags:["三峰山之战","金朝灭亡","蒙宋联合"], topicId:"mongol_empire", details:{
    background:"成吉思汗死后，窝阔台继位并重启对金战争。金朝退守河南，集结主力于潼关至开封一线，试图凭黄河天险抵抗。", process:"1232年拖雷率骑兵三万迂回至金军后方，在三峰山利用大雪天气诱歼金朝十五万精锐。随后蒙宋联军围困蔡州，金哀宗自缢，金亡。", consequence:"蒙古完全控制中国北方，与南宋直接对峙。灭金过程中蒙古吸收了汉地军事技术与管理经验，但也暴露了与南宋联盟的脆弱性。"
  } },
  { id:"mongol_empire-6", title:"长子西征与入侵东欧", year:"1236-1242年", period:"1236-1242", category:"military", description:"窝阔台命诸王长子率军西征，征服钦察、罗斯诸公国，兵锋直抵匈牙利与波兰。", sources:["《诺夫哥罗德编年史》","《世界征服者史》"], tags:["长子西征","钦察汗国","东欧震动"], topicId:"mongol_empire", details:{
    background:"花剌子模王子札兰丁余部与钦察、保加尔等部仍在里海—伏尔加河一带活动，威胁蒙古商路。窝阔台决定派遣以术赤之子拔都为首的诸王长子军团西征。", process:"1237年至1238年，蒙古军摧毁梁赞、弗拉基米尔等罗斯城邦；1240年攻陷基辅。1241年分兵侵入波兰与匈牙利，在里格尼茨与莫希击败欧洲联军。", consequence:"窝阔台去世的消息使拔都撤军东返。此后拔都在伏尔加河下游建立钦察汗国（金帐汗国），罗斯诸公国沦为附庸长达两个多世纪。"
  } },
  { id:"mongol_empire-7", title:"旭烈兀西征与攻陷巴格达", year:"1256-1258年", period:"1256-1258", category:"military", description:"蒙哥汗命其弟旭烈兀西征，灭木剌夷国，1258年攻陷巴格达，处死哈里发，阿拔斯王朝灭亡。", sources:["《世界征服者史》","《史集》"], tags:["巴格达陷落","阿拔斯王朝","伊尔汗国"], topicId:"mongol_empire", details:{
    background:"蒙哥汗为巩固蒙古在西域的统治，并消除木剌夷（阿萨辛派）对蒙古商路与使节的威胁，命旭烈兀统率大军西征。", process:"1256年旭烈兀攻陷阿剌模忒等阿萨辛要塞。1258年围困巴格达，阿拔斯末代哈里发穆斯塔绥姆投降后被裹入地毯纵马踏死，巴格达遭屠城。", consequence:"延续五百余年的阿拔斯哈里发国灭亡，伊斯兰世界政治中心东移至开罗马穆鲁克王朝。旭烈兀随后建立伊尔汗国，统治波斯与两河流域。"
  } },
  { id:"mongol_empire-8", title:"忽必烈与阿里不哥汗位之争", year:"1260-1264年", period:"1260-1264", category:"politics", description:"蒙哥汗去世后，忽必烈与幼弟阿里不哥分别召开忽里台称汗，引发四年内战，蒙古帝国正式分裂。", sources:["《元史·世祖本纪》","《史集·忽必烈汗纪》"], tags:["汗位之争","帝国分裂","忽必烈"], topicId:"mongol_empire", details:{
    background:"1259年蒙哥汗死于钓鱼城下，未指定明确继承人。忽必烈统领漠南汉地，阿里不哥留守蒙古本土哈拉和林，双方各有宗王支持。", process:"1260年忽必烈在开平、阿里不哥在哈拉和林分别即位。双方激战于漠北与甘肃，忽必烈依靠汉地资源与物资补给最终取胜，1264年阿里不哥投降。", consequence:"蒙古帝国由统一走向分裂，钦察、察合台、伊尔三大汗国逐渐独立。忽必烈将政治中心南移，为建立元朝和进一步征服南宋铺平道路。"
  } },
  { id:"mongol_empire-9", title:"元朝建立与灭亡南宋", year:"1271-1279年", period:"1271-1279", category:"politics", description:"忽必烈定国号为元，1276年占临安，1279年崖山海战灭南宋，统一中国。", sources:["《元史·世祖本纪》","《宋史·本纪》"], tags:["元朝建立","崖山海战","中国统一"], topicId:"mongol_empire", details:{
    background:"忽必烈即位后采用汉法，营建大都，笼络汉人士大夫。南宋偏安江南，权臣贾似道专权，军事上依赖襄阳等长江防线。", process:"1271年忽必烈取《易经》『大哉乾元』之意定国号为大元。1273年襄樊失守，元军顺汉水南下。1276年占临安，1279年崖山海战宋军全军覆没，陆秀夫负幼帝投海。", consequence:"元朝成为中国历史上首个由少数民族建立的大一统王朝，结束了唐末以来近四百年的分裂局面，但民族等级制度与高压统治也为后世埋下反抗种子。"
  } },
  { id:"mongol_empire-10", title:"元朝灭亡与蒙古北撤", year:"1368年", period:"1368", category:"military", description:"朱元璋领导的明军北伐，攻占大都，元顺帝北逃，元朝在中原统治结束，蒙古退回草原。", sources:["《明史·太祖本纪》","《元史·顺帝本纪》"], tags:["明朝建立","元顺帝北逃","北元"], topicId:"mongol_empire", details:{
    background:"元朝后期政治腐败、黄河泛滥、财政崩溃，红巾军起义席卷大江南北。朱元璋兼并群雄后于1368年称帝，建立明朝，随即发动北伐。", process:"明军徐达、常遇春部一路北上，元军在通州、齐化门一线溃败。1368年闰七月，元顺帝妥懽帖睦尔携后妃百官出建德门北逃上都。", consequence:"元朝在中原的统治终结，顺帝及其继承者仍以『大元』国号统治漠北，史称北元。蒙古帝国最后一块大一统版图瓦解，欧亚大陆进入后蒙古时代。"
  } },

  // ===== 南京大屠杀 =====
  { id:"nanjing_massacre-1", title:"日军进逼南京", year:"1937", period:"1937年11月—12月", category:"military", description:"淞沪会战后，华中方面军沿太湖南北两路向南京推进，南京保卫战一触即发。", sources:["《南京保卫战大事记》","日本防卫厅《战史丛书》"], tags:["淞沪会战","南京保卫战","日军进攻"], topicId:"nanjing_massacre", details:{
    background:"1937年11月上海失守，日军大本营决定进攻中国首都南京，企图以速战速决迫使国民政府屈服。中国军队撤退仓促，南京周边防线尚未巩固。", process:"华中方面军分三路西进，先后攻占苏州、无锡、常州等地，突破南京外围阵地；12月9日日军向唐生智下达最后通牒，守军拒绝投降。", consequence:"南京被包围，守军约10万人陷入被动，为12月13日城破和大规模暴行埋下伏笔。"
  } },
  { id:"nanjing_massacre-2", title:"南京沦陷", year:"1937", period:"1937年12月13日", category:"military", description:"日军从中华门、光华门等攻入南京，守军指挥混乱，首都南京陷落，大屠杀随即开始。", sources:["《拉贝日记》","《程瑞芳日记》"], tags:["南京陷落","唐生智","日军入城"], topicId:"nanjing_massacre", details:{
    background:"12月12日中华门被突破，司令唐生智下令突围但组织失控，大量部队滞留城内。部分部队溃散，平民与士兵混杂。", process:"12月13日晨，日军第6、第9、第16师团等从多门突入；守军抵抗瓦解，唐生智等高级军官渡江撤退，城内陷入无政府状态。", consequence:"国民政府首都陷落，日军对投降士兵与平民实施系统性屠杀、强奸和抢劫，南京进入六周恐怖时期。"
  } },
  { id:"nanjing_massacre-3", title:"燕子矶江边集体屠杀", year:"1937", period:"1937年12月13日—14日", category:"military", description:"日军将大批难民与溃兵驱赶至燕子矶江边，以机枪扫射，数万人遇难，尸体涌入长江。", sources:["《日军暴行实录》","远东国际军事法庭判决书"], tags:["集体屠杀","燕子矶","长江"], topicId:"nanjing_massacre", details:{
    background:"南京城破后，数万难民和放下武器的士兵沿长江北撤，被日军拦截于燕子矶一带，失去组织与抵抗能力。", process:"日军以重机枪和步枪向聚集在江滩的人群射击，随后用刺刀补杀，并将尸体推入江中或焚烧，持续数日。", consequence:"估计数万人在此遇难，江水被染红，成为日军大规模处决战俘与难民的首个标志性地点之一。"
  } },
  { id:"nanjing_massacre-4", title:"草鞋峡大屠杀", year:"1937", period:"1937年12月18日", category:"military", description:"日军将被俘军民押至下关草鞋峡，先用机枪扫射，再以刺刀刺杀、浇油焚烧，约5.7万人遇害。", sources:["南京军事法庭判决书","《侵华日军南京大屠杀档案》"], tags:["草鞋峡","下关","集体屠杀"], topicId:"nanjing_massacre", details:{
    background:"占领军以“清查败兵”为名，在城内搜捕青壮年并集中关押，12月18日将约5.7万名战俘与难民押往草鞋峡。", process:"日军先用机枪密集扫射，再派士兵用刺刀逐个刺杀幸存者，最后浇上煤油焚烧，并将残骸投入长江。", consequence:"草鞋峡成为南京大屠杀中规模最大、手段最残忍的集体屠杀地点之一，战后南京审判据此判处谷寿夫死刑。"
  } },
  { id:"nanjing_massacre-5", title:"国际安全区成立与救援", year:"1937", period:"1937年11月—1938年1月", category:"society", description:"拉贝、魏特琳等二十余名外侨设立南京安全区，庇护约25万难民，并留下大量第三方暴行记录。", sources:["《拉贝日记》","《魏特琳日记》","Yale Nanking Massacre Project"], tags:["国际安全区","拉贝","魏特琳","人道救援"], topicId:"nanjing_massacre", details:{
    background:"日军逼近南京时，留守的西方传教士、商人和学者倡议在中立区保护平民，11月成立国际委员会，划定约3.86平方公里安全区。", process:"委员会组织25处收容所，为难民提供粮食、医疗和庇护；成员每日向日军使馆抗议，记录强奸、屠杀、抢劫等500余起案件。", consequence:"安全区挽救了数十万生命，其日记、影像和报告成为东京审判和后世研究的关键第三方证据。"
  } },
  { id:"nanjing_massacre-6", title:"“百人斩”杀人竞赛", year:"1937", period:"1937年12月", category:"military", description:"《东京日日新闻》连载向井敏明、野田毅两少尉比赛谁先杀满百人的报道，战后二人被判处死刑。", sources:["《东京日日新闻》1937年12月报道","南京军事法庭判决书"], tags:["百人斩","向井敏明","野田毅","战犯审判"], topicId:"nanjing_massacre", details:{
    background:"日军进攻南京途中，东京日日新闻以“百人斩”为题连续报道两名军官用军刀比赛杀人的“战绩”，引发日本国内关注。", process:"报道声称两人从句容到汤山一路斩杀，至12月13日分别“完成”106和105人，因难分胜负又改比赛150人。", consequence:"该报道成为日军残暴性的象征之一；1947年南京军事法庭以连续屠杀俘虏及非战斗人员罪判处两人死刑。"
  } },
  { id:"nanjing_massacre-7", title:"大规模性暴力与抢劫纵火", year:"1937", period:"1937年12月—1938年1月", category:"society", description:"占领期间日军在南京城内大规模强奸妇女、抢劫商店民居并纵火，城市三分之一建筑被毁。", sources:["《马吉影像》","远东国际军事法庭判决书","《拉贝日记》"], tags:["性暴力","抢劫","纵火","城市破坏"], topicId:"nanjing_massacre", details:{
    background:"日军入城后军纪崩溃，高级军官默许甚至鼓励抢劫，士兵以搜查为名闯入民宅和难民收容所。", process:"据国际委员会记录，占领首月发生约2万起强奸案件；商业区被洗劫一空，大量建筑被焚毁，黑烟笼罩城市数周。", consequence:"数万妇女受害，家庭破碎，城市经济与社会秩序瘫痪，约三分之一的城区建筑化为灰烬。"
  } },
  { id:"nanjing_massacre-8", title:"战后审判与历史记忆", year:"1946", period:"1946—1947年；1985—2014年", category:"politics", description:"东京审判与南京审判确认南京大屠杀为战争罪行，主犯伏法；1985年建纪念馆，2014年设国家公祭日。", sources:["远东国际军事法庭判决书","南京军事法庭判决书","侵华日军南京大屠杀遇难同胞纪念馆官网"], tags:["东京审判","南京审判","国家公祭日","纪念馆"], topicId:"nanjing_massacre", details:{
    background:"日本投降后，盟国与中国分别设立国际与本国军事法庭，对南京大屠杀相关战犯进行起诉和审判。", process:"1946—1948年东京审判判定20万以上平民与战俘遇害，松井石根被判绞刑；1947年南京审判判处谷寿夫、向井敏明、野田毅等死刑。", consequence:"战犯受到法律制裁，但日本国内对事件规模长期存在争议；中国于1985年建成纪念馆，2014年将12月13日定为南京大屠杀死难者国家公祭日。"
  } },

  // ===== 宗教改革 =====
  { id:"reformation-1", title:"路德发表《九十五条论纲》", year:"1517", period:"1517", category:"society", description:"1517年10月31日，马丁·路德在维滕贝格城堡教堂张贴《九十五条论纲》，质疑赎罪券功效与教皇赦罪权，迅速引发全德神学论战。", sources:["《九十五条论纲》","路德致美因茨大主教书信"], tags:["赎罪券","维滕贝格","路德"], topicId:"reformation", details:{
    background:"16世纪初，教廷为筹圣彼得大教堂经费，由多明我会修士台彻尔在德意志兜售赎罪券，宣称捐资可减免炼狱刑罚。路德作为维滕贝格神学教授，担忧信徒以金钱取代悔改，遂以学术论纲形式提出质疑。", process:"1517年10月31日，路德将拉丁文《关于赎罪券效能之辩论》张贴于城堡教堂大门，并致信美因茨大主教。论纲很快被译成德文，借助印刷术在数周内传遍德意志。", consequence:"论纲引发罗马教廷警觉，1520年教皇颁布《斥异端诏书》威胁绝罚；路德拒绝悔过，1521年沃尔姆斯会议宣布其为异端。事件成为新教运动导火索，推动德意志诸侯与教廷决裂。"
  } },
  { id:"reformation-2", title:"沃尔姆斯会议与《沃尔姆斯敕令》", year:"1521", period:"1521", category:"politics", description:"1521年4月，神圣罗马帝国皇帝查理五世在沃尔姆斯召开帝国会议，要求路德撤回著作；路德拒悔，会议随后颁布敕令剥夺其法律保护。", sources:["《沃尔姆斯敕令》","路德在帝国议会答辩记录"], tags:["查理五世","异端","帝国议会"], topicId:"reformation", details:{
    background:"教廷《斥异端诏书》将路德定为异端后，萨克森选帝侯腓特烈三世促成路德出席沃尔姆斯帝国会议，希望在皇帝面前公开听证，以避免仓促定罪。", process:"1521年4月17—18日，路德面对皇帝与诸侯被要求明确撤回著作。他在辩护中宣称：‘除非以圣经和理性说服我，我不能也不愿收回。’查理五世随即于5月25日签署《沃尔姆斯敕令》。", consequence:"敕令宣布路德为‘臭名昭著的异端’，禁止传播其著作并允许逮捕。路德在腓特烈保护下隐居瓦尔特堡，期间开始将圣经译为德语，进一步奠定新教德语礼拜与阅读基础。"
  } },
  { id:"reformation-3", title:"施派尔抗议与新教名称的诞生", year:"1529", period:"1529", category:"politics", description:"1529年帝国议会在施派尔通过决议，限制路德宗传播并恢复部分天主教特权；五位亲王与十四座城市提出正式抗议，‘新教徒’一词由此出现。", sources:["《施派尔抗议书》","1529年施派尔帝国议会档案"], tags:["施派尔","新教徒","抗议"], topicId:"reformation", details:{
    background:"1526年施派尔帝国议会曾赋予各邦诸侯在一定范围内决定本邦宗教事务的权力，但天主教势力在1529年议会试图撤销这一宽容安排。", process:"1529年4月，信奉路德宗的萨克森、勃兰登堡等诸侯及纽伦堡、斯特拉斯堡等城市代表向皇帝递交抗议书，反对撤销1526年决议并要求信仰自由。", consequence:"抗议者被称为‘新教徒’（Protestants），标志着改革运动从神学论争升级为有组织的政治—宗教阵营。此举加深了帝国层面的教派分裂，为奥格斯堡信条与和约奠定组织基础。"
  } },
  { id:"reformation-4", title:"《奥格斯堡信条》的提出", year:"1530", period:"1530", category:"politics", description:"1530年6月，路德宗诸侯在奥格斯堡帝国议会上呈递由梅兰希顿起草的信仰告白，系统阐述新教教义，成为路德宗核心信经。", sources:["《奥格斯堡信条》","梅兰希顿《奥格斯堡信条辩护》"], tags:["奥格斯堡","梅兰希顿","信条"], topicId:"reformation", details:{
    background:"查理五世为抵御奥斯曼威胁、凝聚德意志，于1530年召开奥格斯堡帝国议会，邀请路德宗诸侯说明其信仰，希望以神学对话化解分裂。", process:"梅兰希顿在路德指导下起草《奥格斯堡信条》，6月25日向皇帝朗读，包括28条，阐明‘因信称义’、圣礼、教会权威等立场，并强调其教义与古老教会传统一致。", consequence:"皇帝拒绝接受信条，部分诸侯签署《施马尔卡尔登同盟》以自卫。但信条成为路德宗统一教义基础，1580年汇入《协同书》，至今仍是路德宗认信文献。"
  } },
  { id:"reformation-5", title:"英格兰宗教改革与至尊法案", year:"1534", period:"1534", category:"politics", description:"1534年，英国议会通过《至尊法案》，宣布国王亨利八世为英格兰教会最高领袖，脱离罗马教廷管辖，开启英格兰独特的宗教改革道路。", sources:["《至尊法案》1534","《取消修道院法案》"], tags:["亨利八世","英国国教会","至尊"], topicId:"reformation", details:{
    background:"亨利八世因离婚案与教皇克雷芒七世决裂，并在议会议员与改革派神职人员推动下，逐步否认教廷对英格兰教会的司法与财政权。", process:"1533—1534年，议会先后通过限制上诉罗马、任命坎特伯雷大主教及《至尊法案》等法令，宣布国王为英格兰教会‘在地上唯一的最高首脑’。", consequence:"英格兰教会脱离罗马教廷，修道院被解散、土地被王室与贵族没收。虽然神学上初期保持较多天主教传统，但为日后爱德华六世、伊丽莎白一世时期的新教化改革奠定制度框架。"
  } },
  { id:"reformation-6", title:"特伦托大公会议与天主教改革", year:"1545-1563", period:"1545-1563", category:"society", description:"1545年至1563年间，天主教会在特伦托召开大公会议，系统回应新教挑战，厘定教义、改革教会纪律，史称反宗教改革。", sources:["《特伦托会议教令》","《特伦托教理问答》"], tags:["特伦托","反宗教改革","耶稣会"], topicId:"reformation", details:{
    background:"面对路德、加尔文等改革浪潮及教会腐败指控，教皇保罗三世在神圣罗马皇帝与法王压力下召集会议，希望同时捍卫天主教教义与整顿内部纪律。", process:"会议分三阶段进行，先后界定圣经正典、原罪、称义、圣礼、弥撒等教义，并颁布改革教士纪律、主教驻地、修院生活的法令，成立耶稣会以推进宣教与教育。", consequence:"会议确立了现代天主教的许多核心教义，推动巴洛克虔诚、教理讲授和海外传教。然而会议拒绝与新教妥协，使西方基督宗教永久分裂为天主教与新教两大阵营。"
  } },
  { id:"reformation-7", title:"《奥格斯堡宗教和约》", year:"1555", period:"1555", category:"politics", description:"1555年，查理五世之弟费迪南德代表皇帝与新教诸侯签订和约，确立‘教随国定’原则，承认路德宗与天主教在帝国的合法共存。", sources:["《奥格斯堡宗教和约》","查理五世退位诏书"], tags:["教随国定","帝国和平","1555"], topicId:"reformation", details:{
    background:"德意志诸侯长期因宗教对立爆发武装冲突，查理五世在米尔贝格战役后虽短暂压制新教，但无力持久统一信仰；双方终于在奥格斯堡帝国议会重启谈判。", process:"1555年9月，皇帝与新教诸侯达成协议：各邦君主有权选择本邦宗教（天主教或路德宗），臣民若不接受可迁徙他处；教会财产以1552年为界保留。", consequence:"和约暂时结束德意志宗教战争，承认了政治实体的信仰选择权，但排除加尔文宗与再洗礼派，埋下未来教派冲突的种子，被视为欧洲宗教宽容的早期法律尝试。"
  } },
  { id:"reformation-8", title:"法国胡格诺战争与《南特敕令》", year:"1562-1598", period:"1562-1598", category:"military", description:"法国天主教与王权支持的胡格诺新教徒之间爆发八次宗教战争，1598年亨利四世颁布《南特敕令》，给予新教徒有限信仰自由。", sources:["《南特敕令》1598","法国宗教战争编年档案"], tags:["胡格诺","南特敕令","法国"], topicId:"reformation", details:{
    background:"16世纪中叶，加尔文主义在法国贵族与城市中迅速传播，形成以波旁家族为首的胡格诺派；吉斯家族主导的天主教势力则力图铲除异端，王权在两者之间摇摆。", process:"1562年瓦西镇屠杀引发第一次宗教战争，此后三十年间双方反复交战、结盟与暗杀。1589年胡格诺领袖亨利四世即位后改宗天主教，1595年战胜神圣同盟。", consequence:"1598年《南特敕令》承认胡格诺派信仰自由并允许其设防城镇，但1610年亨利四世遇刺后天主教反扑，1685年路易十四最终撤销敕令，大批胡格诺难民外逃。"
  } },
  { id:"reformation-9", title:"三十年战争", year:"1618-1648", period:"1618-1648", category:"military", description:"1618年布拉格抛窗事件点燃波希米亚起义，随后演变为神圣罗马帝国内部天主教与新教势力、哈布斯堡与反哈布斯堡联盟之间的全欧大战。", sources:["威斯特伐利亚和约","布拉格抛窗事件记录"], tags:["三十年战争","哈布斯堡","波希米亚"], topicId:"reformation", details:{
    background:"费迪南二世登基后推行反宗教改革，威胁波希米亚新教贵族特权；1618年布拉格新教徒将皇帝钦差抛出窗外，起义迅速蔓延，得到普法尔茨、丹麦、瑞典、法国等相继介入。", process:"战争经历波希米亚阶段、丹麦阶段、瑞典阶段与法瑞阶段，战场遍及德意志。古斯塔夫二世、华伦斯坦等将领兴衰，双方使用雇佣军与游击战术，平民伤亡惨重。", consequence:"战争使德意志人口锐减约20%—40%，经济与社会遭受重创，亦削弱了哈布斯堡皇权。1648年威斯特伐利亚和约结束战争，重塑欧洲均势与主权秩序。"
  } },
  { id:"reformation-10", title:"《威斯特伐利亚和约》", year:"1648", period:"1648", category:"politics", description:"1648年，神圣罗马帝国、法国、瑞典等参战方在明斯特与奥斯纳布吕克签署和约，结束三十年战争，确立帝国邦国宗教选择与国际主权原则。", sources:["《威斯特伐利亚和约》","明斯特和约文本"], tags:["威斯特伐利亚","主权","和平"], topicId:"reformation", details:{
    background:"三十年战争使中欧满目疮痍，各方精疲力竭；法国与瑞典希望遏制哈布斯堡，德意志诸侯要求宗教与政治自治。1643—1648年各方在威斯特伐利亚两城举行谈判。", process:"1648年10月24日，皇帝分别与法国在明斯特、与瑞典在奥斯纳布吕克签订和约，确认加尔文宗、路德宗与天主教的合法地位，并以1624年为教会财产基准年。", consequence:"和约正式承认神圣罗马帝国邦国的主权与外交权，确立宗教多元共存，被后世视为现代主权国家体系与国际法的重要起点，也标志着宗教改革时代的终结。"
  } },

  // ===== 文艺复兴 =====
  { id:"ren-1", title:"彼特拉克与早期人文主义", year:"14世纪", period:"1304-1374", category:"society", description:"彼特拉克被誉为人文主义之父，他重新发掘古典文献，强调人的尊严与现世价值。", sources:["彼特拉克书信集","十四行诗"], tags:["人文主义","彼特拉克"], topicId:"renaissance", details:{
    background:"中世纪晚期，意大利城邦经济复苏，学者开始重新关注古希腊罗马文化遗产。", process:"彼特拉克搜集并抄录古典手稿，提出'人的学问'应超越'神的学问'，影响后世人文主义者。", consequence:"人文主义成为文艺复兴的核心思想，推动教育、文学和政治观念的变革。"
  } },
  { id:"ren-2", title:"美第奇家族与佛罗伦萨赞助体系", year:"15世纪", period:"1434-1494", category:"economy", description:"美第奇银行家族通过赞助艺术和学术，使佛罗伦萨成为文艺复兴的中心。", sources:["瓦萨里《艺苑名人传》","美第奇家族账簿"], tags:["美第奇","艺术赞助"], topicId:"renaissance", details:{
    background:"佛罗伦萨银行业和商业繁荣，富裕家族以赞助艺术展示权力和虔诚。", process:"科西莫·德·美第奇建立柏拉图学院，洛伦佐·德·美第奇赞助米开朗基罗等艺术家。", consequence:"佛罗伦萨聚集了大量艺术家和学者，催生了文艺复兴艺术的黄金时代。"
  } },
  { id:"ren-3", title:"古腾堡印刷术的发明与传播", year:"约1450年", period:"1450", category:"society", description:"古腾堡发明活字印刷术，大幅降低书籍成本，加速知识和思想的传播。", sources:["古腾堡圣经","印刷术专利记录"], tags:["印刷术","知识传播"], topicId:"renaissance", details:{
    background:"中世纪手抄书昂贵稀少，知识被教会和贵族垄断。", process:"古腾堡在美因茨发明金属活字印刷，1455年出版《四十二行圣经》。", consequence:"书籍价格下降，识字率提高，宗教改革和科学革命的思想得以迅速传播。"
  } },
  { id:"ren-4", title:"达·芬奇与文艺复兴全才理想", year:"1452-1519年", period:"1452-1519", category:"society", description:"达·芬奇集艺术家、科学家、工程师于一身，体现了文艺复兴'通才'（Renaissance Man）理想。", sources:["大西洋古抄本","莱斯特手稿"], tags:["达·芬奇","科学艺术"], topicId:"renaissance", details:{
    background:"文艺复兴打破学科界限，鼓励通过观察和实验探索自然与人。", process:"达·芬奇创作《蒙娜丽莎》《最后的晚餐》，同时进行解剖学、工程学和飞行研究。", consequence:"确立了艺术与自然科学的结合，影响了后世科学方法论的发展。"
  } },
  { id:"ren-5", title:"拉斐尔《雅典学院》与梵蒂冈艺术", year:"1509-1511年", period:"1509-1511", category:"society", description:"拉斐尔为教皇尤利乌斯二世绘制《雅典学院》，将古典哲学家与基督教人文主义融为一体。", sources:["梵蒂冈博物馆档案","拉斐尔书信"], tags:["拉斐尔","雅典学院"], topicId:"renaissance", details:{
    background:"教皇尤利乌斯二世大规模装饰梵蒂冈宫，米开朗基罗同时绘制西斯廷天顶画。", process:"拉斐尔在签字厅绘制《雅典学院》，以柏拉图与亚里士多德为中心，展现古典知识的和谐。", consequence:"成为文艺复兴艺术的象征，体现了对古典文化的复兴与对人文理想的追求。"
  } },
  { id:"ren-6", title:"马基雅维利《君主论》与现代政治", year:"1513年", period:"1513", category:"politics", description:"马基雅维利撰写《君主论》，以现实主义视角分析权力政治，开创现代政治学先河。", sources:["君主论","李维史论"], tags:["马基雅维利","政治哲学"], topicId:"renaissance", details:{
    background:"意大利城邦分裂、外敌入侵，马基雅维利希望统一意大利并恢复佛罗伦萨共和精神。", process:"《君主论》主张君主应兼具狮子之勇与狐狸之智，强调政治与道德的分离。", consequence:"引发关于权力、道德和政治的持久争论，被誉为现代政治学的奠基之作。"
  } },
  { id:"ren-7", title:"文艺复兴向北传播", year:"16世纪", period:"1500-1600", category:"society", description:"文艺复兴从意大利传播到法国、尼德兰、英国和德国，形成各具特色的北方文艺复兴。", sources:["丢勒版画","伊拉斯谟著作"], tags:["北方文艺复兴","宗教改革"], topicId:"renaissance", details:{
    background:"印刷术和人员交流促进思想传播，北方艺术家结合本地传统与意大利技法。", process:"丢勒将意大利透视法引入北方版画；伊拉斯谟将人文主义与基督教改革结合。", consequence:"北方文艺复兴与宗教改革相互交织，推动了欧洲思想文化的整体转型。"
  } },

  // ===== 罗马帝国的兴衰 =====
  { id:"roman_empire-1", title:"奥古斯都确立元首制", year:"前27年", period:"27 BC", category:"politics", description:"屋大维获“奥古斯都”尊号，以共和外衣建立事实上的帝制，开启罗马和平时代。", sources:["Res Gestae Divi Augusti","Cassius Dio, Roman History"], tags:["元首制","奥古斯都","罗马和平"], topicId:"roman_empire", details:{
    background:"长期内战使罗马共和制度名存实亡，屋大维在亚克兴海战击败安东尼后成为唯一强人，但公开君主制将触犯罗马传统。", process:"前27年，屋大维向元老院交还权力后又接受为期十年的行省统治权与“奥古斯都”尊号，保留保民官特权与最高军权。", consequence:"元首制（Principate）以共和形式掩盖君主实质，为近两百年相对稳定的“罗马和平”奠定政治框架，但也埋下军队干政的隐患。"
  } },
  { id:"roman_empire-2", title:"图拉真扩张与帝国疆域极盛", year:"106-117年", period:"106-117", category:"military", description:"图拉真征服达契亚、吞并纳巴泰、远征美索不达米亚，帝国版图达到最大。", sources:["Cassius Dio, Roman History","Trajan's Column inscriptions"], tags:["图拉真","帝国扩张","疆域极盛"], topicId:"roman_empire", details:{
    background:"弗拉维王朝巩固边疆后，图拉真以军事征服树立权威，达契亚金矿与东方税收对帝国财政极具吸引力。", process:"106年征服达契亚，设立行省；114-116年进攻帕提亚，占领亚美尼亚、美索不达米亚并抵达波斯湾。", consequence:"帝国疆域达到约500万平方公里，但过度扩张拉长防线、消耗军力；哈德良继位后被迫收缩东部边界。"
  } },
  { id:"roman_empire-3", title:"卡拉卡拉敕令授予全体自由民公民权", year:"212年", period:"212", category:"society", description:"卡拉卡拉皇帝颁布安东尼努斯敕令，帝国境内几乎所有自由民均获罗马公民身份。", sources:["Digest 1.5.17","Cassius Dio, Roman History"], tags:["公民权","卡拉卡拉敕令","身份融合"], topicId:"roman_empire", details:{
    background:"帝国人口大幅增长，但行省居民与意大利公民在法律地位上仍有差异，兵源与税收压力促使皇帝扩大公民基础。", process:"212年卡拉卡拉以宗教祭祀为由颁布敕令，将公民权授予帝国所有自由出生的居民（除降敌与少数群体）。", consequence:"公民身份意义稀释，行省精英进一步融入罗马体制；同时扩大继承税税基，也加速了法律一元化与“罗马化”进程。"
  } },
  { id:"roman_empire-4", title:"安东尼瘟疫与帝国危机", year:"165-180年", period:"165-180", category:"society", description:"从东方前线传入的天花或麻疹类瘟疫重创帝国，造成人口锐减与社会动荡。", sources:["Galen, On the Avoidance of Grief","Cassius Dio, Roman History"], tags:["瘟疫","人口危机","社会动荡"], topicId:"roman_empire", details:{
    background:"马可·奥勒留时期，东方战争与丝绸之路贸易使新病原体从亚洲传入帝国核心地区。", process:"瘟疫自166年前后从美索不达米亚蔓延至罗马、高卢与北非，据估计死亡率可达10%-20%，并反复爆发。", consequence:"劳动力与兵源锐减，赋税压力加剧，边疆防御削弱；瘟疫与帕提亚战争、日耳曼战争叠加，暴露帝国韧性极限。"
  } },
  { id:"roman_empire-5", title:"戴克里先四帝共治改革", year:"293年", period:"293", category:"politics", description:"戴克里先将帝国分为东西两部，设两位奥古斯都与两位凯撒共同治理，以应对多线边疆危机。", sources:["Lactantius, De Mortibus Persecutorum","Aurelius Victor"], tags:["四帝共治","戴克里先","行政改革"], topicId:"roman_empire", details:{
    background:"3世纪危机中皇位更迭频繁、边疆同时受压，单一皇帝已难以有效统治辽阔帝国。", process:"286年戴克里先先任命马克西米安为共治者；293年进一步设立四位统治者（四帝共治），分管东西部并与继承人绑定。", consequence:"暂时稳定政局并加强税收、军队与货币改革，但过度集权与价格管制也激化社会矛盾，为后来君士坦丁大一统留下制度遗产。"
  } },
  { id:"roman_empire-6", title:"君士坦丁大帝与米兰敕令", year:"313年", period:"313", category:"society", description:"君士坦丁与李锡尼颁布米兰敕令，承认基督教合法地位，帝国宗教格局发生根本转变。", sources:["Lactantius, De Mortibus Persecutorum","Eusebius, Life of Constantine"], tags:["米兰敕令","基督教","君士坦丁"], topicId:"roman_empire", details:{
    background:"基督教在3世纪已广泛传播，但戴克里先晚年发动大迫害；君士坦丁在米尔维安大桥战役前据称看到十字架异象。", process:"313年，君士坦丁与李锡尼在米兰达成协议，宣布帝国境内所有宗教均享信仰自由，归还被没收的教会财产。", consequence:"基督教从受迫害边缘宗教跃升为主流信仰，深刻改变罗马社会伦理、政治合法性与未来欧洲文明走向。"
  } },
  { id:"roman_empire-7", title:"罗马帝国东西分裂", year:"395年", period:"395", category:"politics", description:"狄奥多西一世去世后，帝国正式分裂为东西两部，政治、经济与军事差异日益加深。", sources:["Zosimus, New History","Olympiodorus"], tags:["帝国分裂","狄奥多西","东西罗马"], topicId:"roman_empire", details:{
    background:"戴克里先与君士坦丁都曾尝试分治，但狄奥多西一世再次统一帝国；其幼子阿卡狄乌斯与霍诺留分别被立为东西皇帝。", process:"395年狄奥多西去世后，帝国永久分裂为以君士坦丁堡为中心的东帝国和以米兰/拉文纳为中心的西帝国。", consequence:"西部资源匮乏、蛮族压力更大，东部因贸易、税收与战略纵深相对稳固；两帝国此后走上不同命运轨道。"
  } },
  { id:"roman_empire-8", title:"西哥特人渡过多瑙河与阿德里安堡战役", year:"376-378年", period:"376-378", category:"military", description:"匈人西迁迫使哥特人涌入帝国避难，因安置失当引发阿德里安堡惨败，皇帝瓦伦斯战死。", sources:["Ammianus Marcellinus, Res Gestae","Jordanes, Getica"], tags:["蛮族入侵","阿德里安堡","匈人"], topicId:"roman_empire", details:{
    background:"4世纪中叶匈人从中亚西迁，压迫黑海北岸的哥特人；376年大批西哥特人请求渡过多瑙河进入帝国避难。", process:"罗马官员腐败虐待难民，哥特人起义；378年瓦伦斯皇帝亲征，在阿德里安堡被哥特骑兵击溃并阵亡。", consequence:"罗马东方野战军元气大伤，皇帝战死震惊帝国；此后蛮族部落以foederati身份深度介入罗马政治军事体系。"
  } },
  { id:"roman_empire-9", title:"阿拉里克洗劫罗马", year:"410年", period:"410", category:"military", description:"西哥特王阿拉里克攻陷并洗劫罗马，这是近八百年以来罗马城首次陷落于外敌之手。", sources:["Orosius, Seven Books of History Against the Pagans","Zosimus, New History"], tags:["罗马陷落","西哥特人","阿拉里克"], topicId:"roman_empire", details:{
    background:"斯提里科被处决后，罗马与西哥特人关系破裂；阿拉里克要求土地与黄金未果，转而进攻意大利。", process:"410年8月，阿拉里克率西哥特人攻破罗马城门，对城市进行三日劫掠，但约束士兵避免大规模屠杀与焚毁。", consequence:"事件在帝国西部造成巨大心理冲击，圣奥古斯丁撰写《上帝之城》回应“罗马永恒”信仰崩塌；西罗马权威一落千丈。"
  } },
  { id:"roman_empire-10", title:"西罗马帝国灭亡", year:"476年", period:"476", category:"politics", description:"日耳曼雇佣军首领奥多亚克废黜罗慕路斯·奥古斯都，西罗马帝国正式终结。", sources:["Procopius, Wars","Jordanes, Getica"], tags:["西罗马灭亡","奥多亚克","历史分期"], topicId:"roman_empire", details:{
    background:"5世纪中叶以来，西罗马已丧失高卢、西班牙、北非与不列颠控制权，皇帝成为日耳曼军事首领的傀儡。", process:"476年，奥多亚克废黜年幼皇帝罗慕路斯·奥古斯都，将皇徽送往君士坦丁堡，自称意大利国王而非皇帝。", consequence:"传统上以476年作为西罗马帝国灭亡与欧洲中世纪开端，但东罗马帝国继续存在近千年；罗马制度、法律与基督教遗产仍深刻影响后世。"
  } },

  // ===== 俄国十月革命 =====
  { id:"russian_revolution-1", title:"二月革命：沙皇制度崩溃", year:"1917", period:"1917年2月23日—3月2日（俄历）", category:"politics", description:"因战争、饥荒与政治高压，彼得格勒工人与士兵爆发罢工和兵变，尼古拉二世被迫退位，罗曼诺夫王朝终结。", sources:["彼得格勒苏维埃一号命令","尼古拉二世退位诏书"], tags:["二月革命","沙皇退位","彼得格勒","兵变"], topicId:"russian_revolution", details:{
    background:"第一次世界大战导致粮食短缺、通货膨胀和前线惨重伤亡；1917年2月23日国际妇女节，彼得格勒女工发起罢工，很快扩展为全城总罢工。", process:"卫戍部队哗变，士兵拒绝镇压群众并与工人联合；3月2日沙皇尼古拉二世退位，国家杜马临时委员会接管政权。", consequence:"君主专制结束，但权力分散，形成临时政府与苏维埃并存的“双重权力”局面。"
  } },
  { id:"russian_revolution-2", title:"双重权力：临时政府与苏维埃并存", year:"1917", period:"1917年3月—10月", category:"politics", description:"临时政府得到西方盟国承认，但彼得格勒苏维埃掌握工兵群众与武装，政府权威受到严重制约。", sources:["彼得格勒苏维埃一号命令","临时政府宣言"], tags:["临时政府","彼得格勒苏维埃","双重权力"], topicId:"russian_revolution", details:{
    background:"二月革命后，自由派、温和社会主义者组成临时政府，而苏维埃由工兵代表组成，二者最初同处塔夫利达宫。", process:"临时政府继续战争并推迟土地改革；苏维埃通过一号命令控制军队，双方在政策上不断角力。", consequence:"政府合法性与实际权力脱节，为布尔什维克“一切权力归苏维埃”口号提供了政治空间。"
  } },
  { id:"russian_revolution-3", title:"列宁归国与《四月提纲》", year:"1917", period:"1917年4月3日—4月17日", category:"politics", description:"列宁经德国“密封列车”返回彼得格勒，提出反对临时政府、一切权力归苏维埃等纲领，重塑布尔什维克路线。", sources:["列宁《四月提纲》","《真理报》1917年4月7日"], tags:["列宁","四月提纲","布尔什维克"], topicId:"russian_revolution", details:{
    background:"多数布尔什维克领导人原支持“革命护国主义”，列宁归来后力主将革命从资产阶级民主阶段推向社会主义阶段。", process:"4月4日列宁宣读《四月提纲》，7日发表于《真理报》，号召不给临时政府任何支持、土地归农民、银行国有化、停止帝国主义战争。", consequence:"党内发生激烈争论，最终确立以武装起义夺取苏维埃权力的战略，成为十月革命的思想基础。"
  } },
  { id:"russian_revolution-4", title:"七月事件：工人士兵示威受挫", year:"1917", period:"1917年7月3日—7月7日", category:"society", description:"彼得格勒工人和士兵因不满战争与经济危机举行大规模示威，临时政府镇压并指控列宁受德国资助，列宁转入地下。", sources:["临时政府公告","列宁《政治形势》"], tags:["七月事件","临时政府","镇压"], topicId:"russian_revolution", details:{
    background:"前线进攻失败、面包短缺，群众对临时政府和苏维埃温和派强烈不满，要求“一切权力归苏维埃”。", process:"7月3日起，工兵在彼得格勒自发游行；示威演变为武装冲突，政府调来“忠诚”部队镇压，布尔什维克一度被宣布为非法。", consequence:"布尔什维克受到打击但获得同情，温和派苏维埃领袖威信下降；临时政府向右转，为科尔尼洛夫叛乱埋下伏笔。"
  } },
  { id:"russian_revolution-5", title:"科尔尼洛夫事件：右翼军事政变", year:"1917", period:"1917年8月25日—8月31日", category:"military", description:"俄军总司令科尔尼洛夫向彼得格勒进军，意图建立军事独裁；临时政府求助于苏维埃与布尔什维克，政变瓦解。", sources:["科尔尼洛夫命令","彼得格勒苏维埃决议"], tags:["科尔尼洛夫","政变","赤卫队"], topicId:"russian_revolution", details:{
    background:"临时政府为恢复秩序依赖军方，而科尔尼洛夫等将领认为政府软弱，主张用武力镇压苏维埃和工人运动。", process:"8月25日科尔尼洛夫派克雷莫夫骑兵向首都推进；克伦斯基向苏维埃求救，布尔什维克组织工人赤卫队保卫城市，铁路工人罢工阻止进军。", consequence:"政变失败削弱了右翼势力，却使布尔什维克重获合法地位并大量武装，为十月起义创造了军事与政治条件。"
  } },
  { id:"russian_revolution-6", title:"十月武装起义：攻占冬宫", year:"1917", period:"1917年10月24日—10月26日", category:"military", description:"布尔什维克军事革命委员会领导赤卫队、士兵和水兵占领彼得格勒要地，最终逮捕临时政府成员。", sources:["列宁《致俄国公民书》","《阿芙乐尔号》信号"], tags:["十月革命","冬宫","阿芙乐尔号"], topicId:"russian_revolution", details:{
    background:"布尔什维克在彼得格勒和莫斯科苏维埃中获得多数；10月10日党中央以10票对2票通过武装起义决议。", process:"10月24日夜列宁抵达斯莫尔尼宫指挥；赤卫队占领车站、邮局、银行和桥梁；25日“阿芙乐尔号”巡洋舰发信号，冬宫被攻占，部长被捕。", consequence:"临时政府倒台，国家政权实际转入苏维埃之手，引发国内外强烈反响与内战。"
  } },
  { id:"russian_revolution-7", title:"全俄苏维埃二大与“和平、土地”法令", year:"1917", period:"1917年10月25日—10月27日", category:"politics", description:"第二届全俄苏维埃代表大会在斯莫尔尼宫开幕，通过《和平法令》《土地法令》，宣布成立工农政府。", sources:["《和平法令》","《土地法令》"], tags:["苏维埃二大","和平法令","土地法令"], topicId:"russian_revolution", details:{
    background:"起义与代表大会同日举行，布尔什维克凭借起义成果获得多数；孟什维克与右派社会革命党人退出。", process:"列宁起草的法令呼吁立即停战、不割地不赔款的和平，并废除地主土地私有制，土地交农民使用。", consequence:"法令赢得士兵和农民支持，巩固新政权，但退出大战与土地国有化也激化了与旧精英及同盟国的矛盾。"
  } },
  { id:"russian_revolution-8", title:"立宪会议选举与解散", year:"1918", period:"1918年1月5日", category:"politics", description:"布尔什维克曾承诺召开立宪会议，但选举结果社会革命党领先；1月5日会议召开后被赤卫队解散。", sources:["立宪会议选举结果","列宁《关于立宪会议的提纲》"], tags:["立宪会议","社会革命党","苏维埃民主"], topicId:"russian_revolution", details:{
    background:"各派别长期要求召开立宪会议以制定新宪法；1917年11月举行选举，布尔什维克在城市得票高，农村社会革命党占绝对优势。", process:"1月5日立宪会议在塔夫利达宫开幕，因拒绝承认苏维埃权力，布尔什维克与左派社会革命党退场，随后会议被解散。", consequence:"布尔什维克被指背离民主承诺，反布尔什维克力量获得道义武器，推动内战升级。"
  } },
  { id:"russian_revolution-9", title:"布列斯特-立陶夫斯克和约", year:"1918", period:"1918年3月3日", category:"politics", description:"苏维埃俄国与同盟国签订屈辱和约，退出大战，丧失大片领土，但赢得巩固政权的喘息时间。", sources:["《布列斯特-立陶夫斯克和约》","列宁《关于立刻缔结和约的报告》"], tags:["布列斯特和约","退出一战","领土割让"], topicId:"russian_revolution", details:{
    background:"前线崩溃、经济枯竭，布尔什维克内部就是否接受苛刻条件爆发“左派共产主义”争论。", process:"托洛茨基“不战不和”策略失败后，德军继续推进；3月3日列宁力主签订和约，俄国割让芬兰、波罗的海地区、乌克兰等大片土地。", consequence:"俄国退出大战，得以集中资源应对内战；但民族主义者和旧军方视之为叛国，增强了白军反抗。"
  } },

  // ===== 跨大西洋奴隶贸易与废奴运动 =====
  { id:"slt-1", title:"葡萄牙开启非洲海岸奴隶贸易", year:"15世纪中叶", period:"1440s", category:"economy", description:"葡萄牙人在西非沿海建立贸易据点，开始将非洲人作为奴隶运往欧洲和大西洋岛屿。", sources:["葡萄牙王室特许状","戈麦斯·埃亚内斯·德·祖拉拉编年史"], tags:["葡萄牙","早期奴隶贸易"], topicId:"slave_trade", details:{
    background:"葡萄牙沿非洲西海岸探索，寻找黄金和通往亚洲的航路，同时开始劫掠和购买奴隶。", process:"1444年葡萄牙人在拉各斯首次公开拍卖非洲奴隶；随后在西非建立埃尔米纳等要塞。", consequence:"开启了欧洲列强参与非洲奴隶贸易的先例，为 later 跨大西洋奴隶贸易奠定基础。"
  } },
  { id:"slt-2", title:"美洲种植园经济与奴隶需求激增", year:"16-17世纪", period:"1500-1700", category:"economy", description:"美洲甘蔗、烟草、棉花种植园扩张，对廉价劳动力的需求推动奴隶贸易规模急剧扩大。", sources:["种植园账簿","西班牙西印度法典"], tags:["种植园","美洲殖民地"], topicId:"slave_trade", details:{
    background:"西班牙、葡萄牙在美洲建立殖民地，原住民人口因疾病和奴役大量死亡。", process:"殖民者从非洲引进奴隶，先后在巴西、加勒比海岛屿和北美南部建立种植园经济。", consequence:"形成三角贸易体系，非洲成为劳动力来源，欧洲获得工业品市场，美洲生产原材料。"
  } },
  { id:"slt-3", title:"英国成为最大奴隶贸易国", year:"17-18世纪", period:"1650-1807", category:"economy", description:"英国通过皇家非洲公司等机构垄断奴隶贸易，利物浦、布里斯托尔成为主要奴隶港口。", sources:["英国议会档案","皇家非洲公司记录"], tags:["英国","三角贸易"], topicId:"slave_trade", details:{
    background:"英国内战后海外扩张加速，与西班牙、荷兰、法国争夺殖民地和贸易霸权。", process:"1660年皇家非洲公司成立，英国商船将成千上万的非洲人运往美洲。", consequence:"奴隶贸易为英国工业革命积累了大量资本，但也引发国内道德和政治争议。"
  } },
  { id:"slt-4", title:"中段航程（Middle Passage）的恐怖", year:"16-19世纪", period:"1500-1867", category:"society", description:"非洲奴隶被塞进拥挤的船舱横渡大西洋，死亡率极高， Brookes 号示意图成为废奴运动标志。", sources:["Brookes 号示意图","奥拉达·艾奎亚诺自传"], tags:["中段航程","人道灾难"], topicId:"slave_trade", details:{
    background:"奴隶船从非洲西海岸出发，经历数周至数月的航行，条件极其恶劣。", process:"奴隶被锁在船舱中，缺乏食物、水和卫生设施，疾病、暴乱和自杀频繁发生。", consequence:"约15%-20%的非洲人在航行中死亡，幸存者则面临终身奴役。"
  } },
  { id:"slt-5", title:"废奴运动的兴起", year:"18世纪后期", period:"1780s-1807", category:"politics", description:"启蒙思想、宗教福音运动和奴隶反抗共同推动英国及欧美废奴运动发展。", sources:["威尔伯福斯演讲","废奴协会小册子"], tags:["废奴运动","启蒙思想"], topicId:"slave_trade", details:{
    background:"贵格会教徒、启蒙思想家和前奴隶共同推动反对奴隶贸易的运动。", process:"1787年伦敦成立废除奴隶贸易协会；威尔伯福斯在议会持续提出废奴议案。", consequence:"1807年英国议会通过《奴隶贸易法》，禁止英国船只参与奴隶贸易。"
  } },
  { id:"slt-6", title:"海地革命与奴隶解放", year:"1791-1804年", period:"1791-1804", category:"politics", description:"法属圣多明各爆发大规模奴隶起义，最终建立海地共和国，成为首个独立的黑人共和国。", sources:["杜桑·卢维杜尔宣言","海地独立宣言"], tags:["海地革命","奴隶起义"], topicId:"slave_trade", details:{
    background:"法国殖民地的奴隶制度极其残酷，受法国大革命自由平等思想影响，奴隶要求解放。", process:"1791年奴隶起义爆发，杜桑·卢维杜尔等领导反抗，1804年海地宣布独立。", consequence:"震撼整个美洲奴隶制度，促使美国和拉美殖民者加强对奴隶的控制。"
  } },
  { id:"slt-7", title:"英美废除奴隶制", year:"1833-1865年", period:"1833-1865", category:"politics", description:"英国在1833年废除帝国全境奴隶制，美国通过1865年宪法第十三修正案终结奴隶制。", sources:["1833年废奴法案","美国第十三修正案"], tags:["废奴","法律解放"], topicId:"slave_trade", details:{
    background:"尽管奴隶贸易被禁，但美洲多地仍合法保留奴隶制度。", process:"英国通过废奴法案并对种植园主进行补偿；美国经过内战，以宪法修正案形式永久禁止奴隶制。", consequence:"奴隶制在法律上被废除，但种族歧视和经济不平等长期延续。"
  } },

  // ===== 第二次世界大战 =====
  { id:"ww2-1", title:"德国入侵波兰", year:"1939", period:"1939年9月1日—10月6日", category:"military", description:"纳粹德国以闪电战突袭波兰，英法随即对德宣战，标志着第二次世界大战在欧洲正式爆发。", sources:["《纽伦堡文件集》","《德国外交政策文件》D辑"], tags:["闪电战","波兰战役","战争爆发"], topicId:"ww2", details:{
    background:"《凡尔赛条约》后的领土争端、但泽走廊问题以及纳粹德国的扩张主义，使德波关系持续紧张。1939年8月《苏德互不侵犯条约》及其秘密议定书划分了东欧势力范围，为德国东进消除了后顾之忧。", process:"9月1日清晨，德军从北、西、南三面越过边界，以装甲部队与空军协同的闪电战术迅速突破波兰防线。9月17日苏联从东部入侵，形成两面夹击。华沙于9月27日投降，波兰军队虽有抵抗但终告失败。", consequence:"波兰被德国与苏联瓜分，英法对德宣战使冲突升级为世界大战。此役也向世界展示了机械化战争的新形态，促使各国加速军事改革，同时开启了波兰长达六年的占领与抵抗历史。"
  } },
  { id:"ww2-2", title:"法国沦陷", year:"1940", period:"1940年5月10日—6月25日", category:"military", description:"德军绕过马奇诺防线，迅速击败法国，英国远征军从敦刻尔克撤退，法国随后建立维希政权。", sources:["丘吉尔《第二次世界大战回忆录》","法国国防部战史档案"], tags:["法国战役","敦刻尔克","维希法国"], topicId:"ww2", details:{
    background:"德国在西线积蓄力量后，于1940年5月发动黄色方案。盟军将主力部署在比利时方向，却未料到德军装甲集群穿越阿登森林，直插英吉利海峡，切断盟军退路。", process:"德军迅速突破色当，5月20日抵达阿布维尔，将英法联军一分为二。北部联军被困敦刻尔克，约33万官兵通过海路撤回英国。6月14日巴黎沦陷，22日法国签署停战协定。", consequence:"法国退出战争，德国控制西欧大陆，英国成为唯一继续抵抗的主要西方国家。法国分裂为占领区与维希政权，抵抗运动与殖民帝国命运成为后续战争的重要变量。"
  } },
  { id:"ww2-3", title:"巴巴罗萨行动", year:"1941", period:"1941年6月22日—12月5日", category:"military", description:"纳粹德国撕毁《苏德互不侵犯条约》，动员数百万军队入侵苏联，苏德战争爆发，东线成为主要战场。", sources:["《纳粹—苏联关系文件集》","苏联国防部档案"], tags:["东线战场","苏联卫国战争","闪电战"], topicId:"ww2", details:{
    background:"希特勒在《我的奋斗》中宣扬夺取东方生存空间。1940年底制定巴巴罗萨计划，意图通过一次快速战役摧毁苏联。苏联虽获多次情报警告，但斯大林对德国 immediate 进攻判断迟缓。", process:"6月22日凌晨，德军三个集团军群沿广阔正面突入苏联，空军摧毁大量飞机。北方、中央、南方三个方向相继推进，明斯克、斯摩棱斯克、基辅相继陷落，苏军损失极为惨重。", consequence:"苏联虽丧失大片领土与人口，但成功将工业东迁并动员全国转入战时体制。德军的快速胜利计划破产，东线陷入长期消耗战，为日后斯大林格勒转折奠定基础。"
  } },
  { id:"ww2-4", title:"珍珠港事件", year:"1941", period:"1941年12月7日", category:"military", description:"日本海军突袭美国太平洋舰队基地珍珠港，美国次日对日宣战，太平洋战争全面爆发。", sources:["《美国总统文件》","日本防卫厅战史丛书"], tags:["太平洋战争","日本偷袭","美国参战"], topicId:"ww2", details:{
    background:"日本因侵华战争与资源短缺面临欧美禁运，决定南下夺取东南亚石油与橡胶。为消除美国太平洋舰队威胁，联合舰队司令山本五十六策划对夏威夷的突然袭击。", process:"12月7日清晨，日本航母舰载机分两波攻击珍珠港，击沉或重创美军战列舰多艘，摧毁飞机近三百架。美方因情报与戒备不足遭受重大损失，但航母编队当日不在港内。", consequence:"美国正式参战，中国、英国等二十余国随即对日宣战，战争真正成为全球性冲突。事件也激化了美国国内对日裔居民的拘禁政策，长期影响美国民权记忆。"
  } },
  { id:"ww2-5", title:"斯大林格勒战役", year:"1942", period:"1942年7月17日—1943年2月2日", category:"military", description:"苏德双方在伏尔加河畔展开决定性会战，德军第六集团军被围歼，成为东线战局的战略转折点。", sources:["《苏联伟大卫国战争史》","德国陆军总参谋部战时日志"], tags:["斯大林格勒","东线转折","城市战"], topicId:"ww2", details:{
    background:"1942年德军将夏季攻势转向南方，企图夺取高加索油田与斯大林格勒，以切断伏尔加河运输并打击苏联士气。苏军采取纵深防御与消耗战略，准备在城市战中迟滞德军。", process:"德军于8月突入市区，双方逐街逐屋争夺，战况极为惨烈。11月苏军发动天王星行动，合围德军第6集团军。希特勒禁止突围，空运补给失败，1943年2月保卢斯率部投降。", consequence:"德军损失精锐重兵集团，战略主动权开始转向苏联。此役极大鼓舞了反法西斯同盟信心，也成为二战中最具象征意义的转折点之一，深刻影响了战后苏德两国的历史记忆。"
  } },
  { id:"ww2-6", title:"诺曼底登陆", year:"1944", period:"1944年6月6日—8月底", category:"military", description:"盟军在法国诺曼底发起大规模两栖登陆，成功开辟欧洲第二战场，加速纳粹德国的最终失败。", sources:["美国国家档案馆D日档案","艾森豪威尔《远征欧陆》"], tags:["D日","诺曼底","第二战场"], topicId:"ww2", details:{
    background:"1943年德黑兰会议确定开辟第二战场。盟军在英国集结陆海空力量，制定代号为霸王行动的登陆计划，并通过 deception 战术使德军误判登陆地点。", process:"6月6日凌晨，盟军空降兵率先着陆，随后五个海滩发起登陆。美军在奥马哈海滩遭遇激烈抵抗，但至当日傍晚基本巩固滩头。后续源源不断地输送兵力与物资，向法国内陆推进。", consequence:"德军被迫陷入东西两线作战，巴黎于8月解放。登陆行动展示了盟军联合作战与后勤保障能力，也对战后西欧政治格局产生深远影响。"
  } },
  { id:"ww2-7", title:"雅尔塔会议", year:"1945", period:"1945年2月4日—11日", category:"politics", description:"罗斯福、丘吉尔与斯大林在克里米亚会晤，就战后德国处置、联合国筹建及东欧安排达成重要协议。", sources:["雅尔塔会议议定书","《外交关系文件集》"], tags:["雅尔塔体系","三巨头","战后秩序"], topicId:"ww2", details:{
    background:"1945年初盟军从东西两线逼近德国，胜利在望，但战后安排尚未明确。美英希望苏联参加对日作战，苏联则关注边界安全与势力范围，三方利益交汇于克里米亚。", process:"会议就德国分区占领、去纳粹化、赔款原则以及波兰边界与政府组成等问题进行激烈谈判。同时发表《克里米亚声明》，宣布筹建联合国，并秘密商定苏联对日作战条件。", consequence:"雅尔塔协议塑造了战后欧洲的基本格局，也为冷战分裂埋下伏笔。对协议的解读在东西方之间存在显著分歧，至今仍是国际政治史研究的核心议题。"
  } },
  { id:"ww2-8", title:"德国与日本投降", year:"1945", period:"1945年5月8日—9月2日", category:"military", description:"德国签署无条件投降书，欧洲战事结束；随后美国投掷原子弹，日本宣布投降，第二次世界大战正式终结。", sources:["《纽伦堡审判文件》","日本《终战诏书》"], tags:["无条件投降","原子弹","战争结束"], topicId:"ww2", details:{
    background:"1945年4月苏军攻克柏林，希特勒自杀。5月7日德国在兰斯签署投降书，8日欧洲胜利日。太平洋战场，日本本土遭美军猛烈轰炸，8月6日与9日广岛、长崎先后被投掷原子弹。", process:"苏联于8月8日对日宣战并进攻中国东北，日本最高战争指导会议在是否接受《波茨坦公告》上僵持。天皇裕仁最终裁定投降，8月15日广播《终战诏书》，9月2日正式签署投降书。", consequence:"第二次世界大战结束，数千万人死亡，欧洲与亚洲满目疮痍。战后成立联合国，并开启纽伦堡与东京审判，试图以国际法追究战争罪行，重塑战后国际秩序。"
  } },
];

export const ARCHIVE_TOPICS: ArchiveTopic[] = [
  { id:"manchukuo", title:"伪满洲国实录", subtitle:"傀儡政权与民族抵抗", period:"1932-1945", region:"中国东北", description:"聚合中国、日本、美国、英国及国际联盟等多国官方档案、教科书与报刊叙述，深度解构1932-1945年间东北亚历史变局与李顿调查团、史汀生主义等国际反应。", coverImage:"/images/manchukuo-cover.png", caseId:"MAN-1932-1945", events: ALL_EVENTS.filter(e => e.topicId === "manchukuo") },
  { id:"opium_war", title:"鸦片战争", subtitle:"帝国碰撞与近代开端", period:"1839-1842", region:"中国沿海", description:"中英两种文明首次正面碰撞。'自由贸易'与'主权禁毒'的叙事对立。", coverImage:"/images/opium-war-cover.jpg", caseId:"OPW-1839-1842", events: ALL_EVENTS.filter(e => e.topicId === "opium_war") },
  { id:"meiji", title:"明治维新", subtitle:"东方崛起与现代化之路", period:"1868-1912", region:"日本", description:"一个封建国家如何在一代人的时间内跻身列强？", coverImage:"/images/meiji-cover.jpg", caseId:"MEI-1868-1912", events: ALL_EVENTS.filter(e => e.topicId === "meiji") },
  { id:"french_revolution", title:"法国大革命", subtitle:"自由、平等、博爱的代价", period:"1789-1799", region:"法国/欧洲", description:"现代民主的起源还是暴力革命的警示？", coverImage:"/images/french-revolution-cover.jpg", caseId:"FRV-1789-1799", events: ALL_EVENTS.filter(e => e.topicId === "french_revolution") },
  { id:"cold_war", title:"冷战与柏林墙", subtitle:"铁幕两侧的世界", period:"1947-1991", region:"全球", description:"两个超级大国的意识形态对抗如何塑造了半个世纪的世界格局。", coverImage:"/images/cold-war-cover.jpg", caseId:"CLD-1947-1991", events: ALL_EVENTS.filter(e => e.topicId === "cold_war") },
  { id:"silk_road", title:"丝绸之路", subtitle:"千年商路与文明互鉴", period:"公元前2世纪-15世纪", region:"欧亚大陆", description:"连接东西方文明的千年通道。", coverImage:"/images/silk-road-cover.jpg", caseId:"SLK-BC2C-15C", events: ALL_EVENTS.filter(e => e.topicId === "silk_road") },
  { id:"american_revolution", title:"美国独立战争", subtitle:"新世界的民主实验", period:"1775-1789", region:"北美", description:"殖民地如何变成了世界强国？", coverImage:"/images/american-revolution-cover.jpg", caseId:"USR-1775-1789", events: ALL_EVENTS.filter(e => e.topicId === "american_revolution") },
  { id:"industrial_revolution", title:"工业革命", subtitle:"蒸汽与钢铁的新纪元", period:"1760-1900", region:"英国/全球", description:"人类生产力第一次质的飞跃。", coverImage:"/images/industrial-revolution-cover.jpg", caseId:"IND-1760-1900", events: ALL_EVENTS.filter(e => e.topicId === "industrial_revolution") },
  { id:"ww1", title:"第一次世界大战", subtitle:"帝国的黄昏", period:"1914-1918", region:"全球", description:"一场'结束一切战争的战争'如何播下了更大灾难的种子。", coverImage:"/images/ww1-cover.jpg", caseId:"WW1-1914-1918", events: ALL_EVENTS.filter(e => e.topicId === "ww1") },
  { id:"age_of_exploration", title:"大航海时代", subtitle:"发现、征服与交换", period:"15-17世纪", region:"全球", description:"'地理大发现'还是'殖民侵略的开端'？", coverImage:"/images/age-of-exploration-cover.jpg", caseId:"AOE-15C-17C", events: ALL_EVENTS.filter(e => e.topicId === "age_of_exploration") },
,
  { id:"american_civil_war", title:"美国内战", subtitle:"联邦统一、奴隶制与国家分裂的四年浩劫", period:"1861-1865", region:"北美洲（美国本土、大西洋沿岸至密西西比河流域）", description:"美国内战（1861—1865）是联邦政府与南方邦联之间围绕国家统一、奴隶制存废与州权界限展开的大规模冲突。它造成约62万人丧生，终结了奴隶制，并深刻重塑了美国的宪政秩序。本案例从北方联邦、南方邦联与欧洲（尤其英国）三种视角出发，呈现战争目标、道德叙事与外交博弈的复杂差异，帮助理解同一历史事件如何被不同立场书写与记忆。", coverImage:"/images/american_civil_war-cover.jpg", caseId:"ACW-1861", events: ALL_EVENTS.filter(e => e.topicId === "american_civil_war") },
  { id:"black_death", title:"黑死病与中世纪欧洲", subtitle:"瘟疫、社会崩溃与近代医学萌芽", period:"1347-1351年", region:"欧洲、北非、西亚", description:"14世纪中叶席卷欧亚的鼠疫大流行，导致欧洲约三分之一人口死亡，深刻改变了中世纪社会结构、宗教信仰和经济秩序，也推动了公共卫生与医学观念的转型。", coverImage:"/images/black_death-cover.jpg", caseId:"BLD-1347-1351", events: ALL_EVENTS.filter(e => e.topicId === "black_death") },
  { id:"boxer_rebellion", title:"义和团运动", subtitle:"扶清灭洋与庚子国变", period:"1899-1901", region:"中国华北（山东、直隶、京津地区）", description:"义和团运动是19世纪末华北民众以“扶清灭洋”为口号发起的反帝运动。它源于列强瓜分、教案频发与天灾，迅速席卷山东、直隶并波及京津。清廷摇摆于“剿”“抚”之间，最终引致八国联军侵华与《辛丑条约》。本案例从本土、列强与国际学术三种视角，呈现事件的多重面相。", coverImage:"/images/boxer_rebellion-cover.jpg", caseId:"YHT-1899-1901", events: ALL_EVENTS.filter(e => e.topicId === "boxer_rebellion") },
  { id:"cuban_missile_crisis", title:"古巴导弹危机", subtitle:"1962年，两个核超级大国在加勒比海走到战争边缘的十三天", period:"1962年10月14日—10月28日（核心危机）", region:"加勒比海 / 古巴", description:"1962年10月，苏联在古巴秘密部署核导弹，引发与美国之间的直接对峙。本案例汇集美国、苏联与古巴三方档案，展示核时代大国决策、情报误判与边缘政治的复杂互动，揭示同一危机在不同立场下的多重叙事。", coverImage:"/images/cuban_missile_crisis-cover.jpg", caseId:"CMC-1962", events: ALL_EVENTS.filter(e => e.topicId === "cuban_missile_crisis") },
  { id:"decolonization", title:"非殖民化与亚非拉独立", subtitle:"从帝国解体到民族国家兴起的全球浪潮", period:"1945-1970年代", region:"亚洲、非洲、拉丁美洲", description:"第二次世界大战后，欧洲殖民帝国迅速瓦解，亚洲、非洲和拉丁美洲掀起规模空前的民族独立运动。本案例从殖民地解放运动、殖民宗主国以及国际社会三方视角，审视1945年至1970年代间非殖民化进程中的关键事件、意识形态冲突与冷战博弈，呈现一幅多声部、多层次的历史图景。", coverImage:"/images/decolonization-cover.jpg", caseId:"DECOLONIZATION-1945", events: ALL_EVENTS.filter(e => e.topicId === "decolonization") },
  { id:"first_sino_japanese_war", title:"甲午战争", subtitle:"东亚秩序重构与洋务梦碎", period:"1894-1895年", region:"朝鲜半岛、辽东半岛、山东威海、黄海北部", description:"1894-1895年日本发动的侵略朝鲜与中国的战争，以北洋水师覆灭和《马关条约》告终，深刻改变了东亚国际秩序。本案例聚合清朝、日本、西方观察与国际条约等多重视角。", coverImage:"/images/first_sino_japanese_war-cover.jpg", caseId:"FSJ-1894-1895", events: ALL_EVENTS.filter(e => e.topicId === "first_sino_japanese_war") },
  { id:"korean_war", title:"朝鲜战争", subtitle:"冷战第一场热战与半岛分裂的悲壮史诗", period:"1950-1953", region:"朝鲜半岛", description:"1950年至1953年，朝鲜半岛爆发了一场被不同国家称为“朝鲜战争”“抗美援朝战争”“祖国解放战争”或“韩国战争”的大规模冲突。战争从三八线南北对抗迅速演变为美苏冷战背景下的国际局部战争，联合国军、中国人民志愿军与苏联空军相继卷入。本案例通过中国、联合国军/美韩、朝鲜三种视角，审视同一事件在不同政治话语中的叙事差异，帮助学习者理解历史解释的多元性与复杂性。", coverImage:"/images/korean_war-cover.jpg", caseId:"KW-1950", events: ALL_EVENTS.filter(e => e.topicId === "korean_war") },
  { id:"mongol_empire", title:"蒙古帝国的扩张", subtitle:"草原铁骑与欧亚变局", period:"1206-1368", region:"欧亚大陆", description:"1206年铁木真统一蒙古诸部，称成吉思汗，建立蒙古帝国。此后百年间，蒙古铁骑横扫欧亚，建立了人类历史上最大的连续陆地帝国。本案例聚合蒙古《秘史》、中国《元史》、波斯《世界征服者史》等多语种史料，从草原帝国、中原王朝与伊斯兰世界三种视角，审视征服、统治与文明交流的多重面向。", coverImage:"/images/mongol_empire-cover.jpg", caseId:"MGE-1206-1368", events: ALL_EVENTS.filter(e => e.topicId === "mongol_empire") },
  { id:"nanjing_massacre", title:"南京大屠杀", subtitle:"1937年南京浩劫的多重视角", period:"1937年12月—1938年1月", region:"中国南京及近郊", description:"南京大屠杀是1937年12月日军攻占中华民国首都南京后，对平民和放下武器的军人实施的大规模屠杀、强奸、抢掠与纵火。持续约六周，遇难人数估计在20万至30万以上。本案例汇集中国受害方、日本加害/否认方以及国际第三方目击者的多元叙述，呈现历史记忆与史料批判的复杂性。", coverImage:"/images/nanjing_massacre-cover.jpg", caseId:"NJM-1937", events: ALL_EVENTS.filter(e => e.topicId === "nanjing_massacre") },
  { id:"reformation", title:"宗教改革", subtitle:"欧洲信仰、权力与社会的裂变", period:"1517-1648", region:"神圣罗马帝国、瑞士、英格兰、法国、尼德兰等中欧与西欧", description:"1517年马丁·路德发表《九十五条论纲》，质疑罗马教廷的赎罪券与权威，引发德意志乃至整个欧洲的神学、政治与社会裂变。本案例从天主教教廷、新教改革者及国际政治与现代史学三种视角，呈现宗教改革如何重塑欧洲信仰版图、王权与教权关系，并在威斯特伐利亚和约中确立“教随国定”原则。", coverImage:"/images/reformation-cover.jpg", caseId:"REF-1517", events: ALL_EVENTS.filter(e => e.topicId === "reformation") },
  { id:"renaissance", title:"文艺复兴", subtitle:"古典复兴、人文主义与艺术革命", period:"14-17世纪", region:"意大利及欧洲", description:"发端于意大利并波及全欧的文化运动，以人文主义、古典复兴和艺术创新为标志，推动了欧洲从 medieval 向近代的转型，深刻影响了科学、政治和宗教改革。", coverImage:"/images/renaissance-cover.jpg", caseId:"REN-14C-17C", events: ALL_EVENTS.filter(e => e.topicId === "renaissance") },
  { id:"roman_empire", title:"罗马帝国的兴衰", subtitle:"从共和国到帝国，从地中海霸主到东西分治", period:"27BC-476AD", region:"地中海世界（欧洲、北非、西亚）", description:"本案例跨越五个世纪，呈现罗马从奥古斯都确立元首制到西罗马末代皇帝被废黜的完整历程。通过罗马官方文献、蛮族史家叙述与现代考古学、气候史、制度史研究的多元视角，探讨帝国扩张、公民身份、宗教转型、边疆压力与政治解体之间的复杂互动，避免将罗马衰落归因于单一因素。", coverImage:"/images/roman_empire-cover.jpg", caseId:"ROM-27BC-476AD", events: ALL_EVENTS.filter(e => e.topicId === "roman_empire") },
  { id:"russian_revolution", title:"俄国十月革命", subtitle:"从专制到苏维埃：1917年的双重革命与世界裂变", period:"1917年2月—1918年3月", region:"俄罗斯帝国（以彼得格勒、莫斯科为中心）", description:"1917年俄国先后爆发二月革命与十月革命：沙皇制度崩溃，临时政府更迭，最终布尔什维克夺取政权并建立苏维埃国家。不同立场对事件性质有“人民革命”“武装政变”“历史必然”等截然不同的解读。本案例通过布尔什维克、反布尔什维克与西方国际三种视角，呈现权力更替、社会动员与意识形态冲突的复杂面貌。", coverImage:"/images/russian_revolution-cover.jpg", caseId:"RR-1917", events: ALL_EVENTS.filter(e => e.topicId === "russian_revolution") },
  { id:"slave_trade", title:"跨大西洋奴隶贸易与废奴运动", subtitle:"强迫迁徙、种族奴役与人权觉醒", period:"16-19世纪", region:"非洲、美洲、欧洲及大西洋", description:"持续四个世纪的跨大西洋奴隶贸易将约1250万非洲人强行运往美洲，成为资本主义原始积累的重要一环，同时也催生了人类历史上规模最大的废奴运动之一。", coverImage:"/images/slave_trade-cover.jpg", caseId:"SLT-16C-19C", events: ALL_EVENTS.filter(e => e.topicId === "slave_trade") },
  { id:"ww2", title:"第二次世界大战", subtitle:"1939-1945 全球冲突的多重视角", period:"1939-1945", region:"欧洲、亚洲、太平洋、北非及大西洋", description:"第二次世界大战是人类历史上规模最大、伤亡最惨重的全球性冲突。战争将世界主要国家卷入轴心国与同盟国两大阵营的对抗，涉及军事、政治、经济与社会各个层面。本案例通过轴心国、西方同盟国与苏联三种主要视角，呈现不同参战方对战争起因、进程与后果的多元叙述，帮助理解历史记忆的复杂性与多源性。", coverImage:"/images/ww2-cover.jpg", caseId:"WWII-1939-1945", events: ALL_EVENTS.filter(e => e.topicId === "ww2") }
];

export const HISTORICAL_EVENTS: HistoricalEvent[] = ARCHIVE_TOPICS.flatMap(t => t.events);
