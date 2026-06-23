import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Map as MapIcon, Navigation, Clock, Smartphone, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { getImagePath } from "@/lib/utils";

interface RouteStop {
  time: string;
  title: string;
  type: string;
  desc: string;
  img: string;
}

interface RouteData {
  title: string;
  duration: string;
  stops: RouteStop[];
}

// 预置路线数据：按 city_theme 组合
const ROUTES: Record<string, RouteData> = {
  // ===== 长春 =====
  changchun_architecture: { title: "长春：伪满建筑群探索", duration: "1日", stops: [
    { time: "09:00", title: "伪满皇宫博物院", type: "核心", desc: "溥仪傀儡宫殿，末代皇帝的囚笼", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Manchukuo_Imperial_Palace.jpg/320px-Manchukuo_Imperial_Palace.jpg" },
    { time: "11:30", title: "伪满国务院旧址", type: "核心", desc: "兴亚式建筑典范，殖民权力中枢", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Manchukuo_State_Council.jpg/320px-Manchukuo_State_Council.jpg" },
    { time: "14:00", title: "新民大街八大部", type: "徒步", desc: "伪满八大政府机构建筑一线排列", img: getImagePath("/images/hero-bg.jpg") },
    { time: "16:00", title: "伪满综合法衙旧址", type: "补充", desc: "殖民司法体系遗迹与建筑印记", img: getImagePath("/images/hero-bg.jpg") },
  ]},
  changchun_resistance: { title: "长春：抗战记忆与解放", duration: "1日", stops: [
    { time: "09:00", title: "东北沦陷史陈列馆", type: "核心", desc: "十四年东北沦陷全景展览基地", img: getImagePath("/images/hero-bg.jpg") },
    { time: "11:00", title: "长春电影制片厂旧址", type: "补充", desc: "伪满映画株式会社文化殖民见证", img: getImagePath("/images/hero-bg.jpg") },
    { time: "14:00", title: "解放纪念碑", type: "核心", desc: "1948长春围城战纪念地标", img: getImagePath("/images/hero-bg.jpg") },
    { time: "16:00", title: "伪满皇宫博物院", type: "补充", desc: "溥仪出逃路线与政权覆灭终点", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Manchukuo_Imperial_Palace.jpg/320px-Manchukuo_Imperial_Palace.jpg" },
  ]},
  changchun_culture: { title: "长春：多元文化印记", duration: "1日", stops: [
    { time: "09:00", title: "般若寺", type: "核心", desc: "长春最古老佛寺，多民族信仰交融", img: getImagePath("/images/hero-bg.jpg") },
    { time: "11:00", title: "伪满皇宫同德殿", type: "补充", desc: "中日文化碰撞空间，混合装饰风格", img: getImagePath("/images/hero-bg.jpg") },
    { time: "14:00", title: "南湖公园", type: "徒步", desc: "日本规划的市民公园殖民生活缩影", img: getImagePath("/images/hero-bg.jpg") },
    { time: "16:00", title: "长春站旧址", type: "补充", desc: "日俄铁路竞争产物多元建筑交汇", img: getImagePath("/images/hero-bg.jpg") },
  ]},
  // ===== 巴黎 =====
  paris_architecture: { title: "巴黎：革命建筑巡礼", duration: "1日", stops: [
    { time: "09:00", title: "巴士底广场", type: "核心", desc: "1789革命爆发地自由精神象征", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Colonne_de_Juillet_2010.jpg/320px-Colonne_de_Juillet_2010.jpg" },
    { time: "11:00", title: "协和广场", type: "核心", desc: "路易十六断头台旧址恐怖见证", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Place_de_la_Concorde_from_the_Eiffel_Tower.jpg/320px-Place_de_la_Concorde_from_the_Eiffel_Tower.jpg" },
    { time: "14:00", title: "先贤祠", type: "核心", desc: "伏尔泰卢梭长眠启蒙思想殿堂", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Pantheon_of_Paris_007.JPG/320px-Pantheon_of_Paris_007.JPG" },
    { time: "16:00", title: "卡尔纳瓦雷博物馆", type: "补充", desc: "巴黎历史博物馆大革命实物珍藏", img: getImagePath("/images/hero-bg.jpg") },
  ]},
  paris_revolution: { title: "巴黎：大革命全程追踪", duration: "1日", stops: [
    { time: "09:00", title: "凡尔赛宫", type: "核心", desc: "旧制度奢靡象征三级会议之地", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Chateau_Versailles_Galerie_des_Glaces.jpg/320px-Chateau_Versailles_Galerie_des_Glaces.jpg" },
    { time: "12:00", title: "杜伊勒里花园", type: "徒步", desc: "路易十六被押回王权终结舞台", img: getImagePath("/images/hero-bg.jpg") },
    { time: "14:00", title: "协和广场", type: "核心", desc: "断头台矗立革命与恐怖交织之地", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Place_de_la_Concorde_from_the_Eiffel_Tower.jpg/320px-Place_de_la_Concorde_from_the_Eiffel_Tower.jpg" },
    { time: "16:00", title: "拉雪兹公墓社员墙", type: "补充", desc: "巴黎公社最后战斗与牺牲之地", img: getImagePath("/images/hero-bg.jpg") },
  ]},
  // ===== 柏林 =====
  berlin_architecture: { title: "柏林：冷战建筑遗产", duration: "1日", stops: [
    { time: "09:00", title: "柏林墙纪念馆", type: "核心", desc: "最完整柏林墙遗址分裂逃亡故事", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Berliner_Mauer.jpg/320px-Berliner_Mauer.jpg" },
    { time: "11:00", title: "查理检查站", type: "补充", desc: "冷战东西柏林最著名过境检查点", img: getImagePath("/images/hero-bg.jpg") },
    { time: "13:30", title: "东边画廊", type: "徒步", desc: "1.3公里墙面涂鸦兄弟之吻名作", img: getImagePath("/images/hero-bg.jpg") },
    { time: "15:30", title: "德国间谍博物馆", type: "补充", desc: "冷战间谍战互动体验情报战面貌", img: getImagePath("/images/hero-bg.jpg") },
  ]},
  berlin_revolution: { title: "柏林：从分裂到统一", duration: "1日", stops: [
    { time: "09:00", title: "勃兰登堡门", type: "核心", desc: "德国统一象征冷战结束历史地标", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Brandenburger_Tor_abends.jpg/320px-Brandenburger_Tor_abends.jpg" },
    { time: "11:00", title: "国会大厦", type: "核心", desc: "魏玛到统一德国民主曲折路见证", img: getImagePath("/images/hero-bg.jpg") },
    { time: "14:00", title: "柏林墙纪念馆", type: "核心", desc: "28年分裂至少140人翻墙丧生", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Berliner_Mauer.jpg/320px-Berliner_Mauer.jpg" },
    { time: "16:00", title: "恐怖地形图", type: "补充", desc: "盖世太保总部遗址极权暴力档案", img: getImagePath("/images/hero-bg.jpg") },
  ]},
  // ===== 西安 =====
  xian_architecture: { title: "西安：丝路起点古建巡礼", duration: "1日", stops: [
    { time: "09:00", title: "大雁塔", type: "核心", desc: "玄奘西行起点佛教东传千年见证", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Giant_Wild_Goose_Pagoda.jpg/320px-Giant_Wild_Goose_Pagoda.jpg" },
    { time: "11:30", title: "西安碑林博物馆", type: "核心", desc: "景教碑珍贵石刻丝路宗教传播录", img: getImagePath("/images/hero-bg.jpg") },
    { time: "14:00", title: "大唐西市遗址", type: "核心", desc: "唐代国际贸易中心丝路商贸始发", img: getImagePath("/images/hero-bg.jpg") },
    { time: "16:00", title: "陕西历史博物馆", type: "补充", desc: "丝路金银器唐三彩东西交流实证", img: getImagePath("/images/hero-bg.jpg") },
  ]},
  xian_trade: { title: "西安：丝绸贸易线路追踪", duration: "1日", stops: [
    { time: "09:00", title: "陕西历史博物馆", type: "核心", desc: "丝路文物精华荟萃千年商贸见证", img: getImagePath("/images/hero-bg.jpg") },
    { time: "11:30", title: "大唐西市遗址", type: "核心", desc: "胡商云集之地国际贸易黄金时代", img: getImagePath("/images/hero-bg.jpg") },
    { time: "14:00", title: "回民街", type: "徒步", desc: "丝路饮食活化石千年胡食传承今", img: getImagePath("/images/hero-bg.jpg") },
    { time: "16:00", title: "大明宫遗址公园", type: "补充", desc: "万国来朝帝国中心丝路政治起点", img: getImagePath("/images/hero-bg.jpg") },
  ]},
  // ===== 波士顿 =====
  boston_architecture: { title: "波士顿：独立革命遗产", duration: "1日", stops: [
    { time: "09:00", title: "自由之路", type: "核心", desc: "4公里红砖路串联16处革命遗址", img: getImagePath("/images/hero-bg.jpg") },
    { time: "11:00", title: "旧南会堂", type: "补充", desc: "波士顿惨案发生地独立运动火索", img: getImagePath("/images/hero-bg.jpg") },
    { time: "13:30", title: "波士顿茶党博物馆", type: "核心", desc: "1773倾茶事件无代表不纳税起点", img: getImagePath("/images/hero-bg.jpg") },
    { time: "15:30", title: "邦克山纪念碑", type: "补充", desc: "独立战争首次大战美国精神象征", img: getImagePath("/images/hero-bg.jpg") },
  ]},
  boston_revolution: { title: "波士顿：革命先驱足迹", duration: "1日", stops: [
    { time: "09:00", title: "法尼尔厅", type: "核心", desc: "自由的摇篮亚当斯慷慨演说处", img: getImagePath("/images/hero-bg.jpg") },
    { time: "11:00", title: "老北教堂", type: "核心", desc: "保罗里维尔夜骑信号灯起始之地", img: getImagePath("/images/hero-bg.jpg") },
    { time: "14:00", title: "波士顿港茶党博物馆", type: "核心", desc: "互动还原倾茶之夜革命精神体验", img: getImagePath("/images/hero-bg.jpg") },
    { time: "16:00", title: "邦克山战场", type: "补充", desc: "看见敌人的眼白才开枪的战场", img: getImagePath("/images/hero-bg.jpg") },
  ]},
  // ===== 广州 =====
  guangzhou_trade: { title: "广州：海上贸易千年史", duration: "1日", stops: [
    { time: "09:00", title: "十三行博物馆", type: "核心", desc: "清代唯一通商口岸中西贸易起点", img: getImagePath("/images/hero-bg.jpg") },
    { time: "11:30", title: "黄埔古港", type: "核心", desc: "海上丝路重要港口古代贸易见证", img: getImagePath("/images/hero-bg.jpg") },
    { time: "14:00", title: "沙面岛", type: "徒步", desc: "英法租界150栋欧式建筑殖民印记", img: getImagePath("/images/hero-bg.jpg") },
    { time: "16:00", title: "南越王墓博物馆", type: "补充", desc: "两千年前海丝起点舶来品实证", img: getImagePath("/images/hero-bg.jpg") },
  ]},
  guangzhou_resistance: { title: "广州：鸦片战争抗争之路", duration: "1日", stops: [
    { time: "09:00", title: "虎门海战博物馆", type: "核心", desc: "林则徐虎门销烟遗址战争导火索", img: getImagePath("/images/hero-bg.jpg") },
    { time: "11:30", title: "三元里抗英纪念馆", type: "核心", desc: "中国近代第一次自发抗击外侵", img: getImagePath("/images/hero-bg.jpg") },
    { time: "14:00", title: "十三行博物馆", type: "补充", desc: "贸易垄断与走私鸦片冲突经济根源", img: getImagePath("/images/hero-bg.jpg") },
    { time: "16:00", title: "沙面岛", type: "徒步", desc: "不平等条约产物租界屈辱与抗争", img: getImagePath("/images/hero-bg.jpg") },
  ]},
  // ===== 敦煌 =====
  dunhuang_architecture: { title: "敦煌：石窟艺术朝圣", duration: "1日", stops: [
    { time: "08:30", title: "莫高窟", type: "核心", desc: "735洞窟千年佛教宝库文明交融", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Mogao_Caves.jpg/320px-Mogao_Caves.jpg" },
    { time: "12:30", title: "敦煌博物馆", type: "补充", desc: "丝路文物精品商路枢纽历史全貌", img: getImagePath("/images/hero-bg.jpg") },
    { time: "14:30", title: "阳关遗址", type: "核心", desc: "西出阳关无故人古丝路西行关口", img: getImagePath("/images/hero-bg.jpg") },
    { time: "17:00", title: "鸣沙山月牙泉", type: "补充", desc: "丝路旅人传说中的沙漠绿洲奇观", img: getImagePath("/images/hero-bg.jpg") },
  ]},
  dunhuang_trade: { title: "敦煌：丝路商贸探秘", duration: "1日", stops: [
    { time: "08:30", title: "敦煌博物馆", type: "核心", desc: "汉简丝帛展示丝路贸易繁盛景象", img: getImagePath("/images/hero-bg.jpg") },
    { time: "11:00", title: "玉门关遗址", type: "核心", desc: "春风不度玉门关丝路北线必经关", img: getImagePath("/images/hero-bg.jpg") },
    { time: "14:00", title: "阳关遗址", type: "核心", desc: "丝路南线关口古代海关与驿站址", img: getImagePath("/images/hero-bg.jpg") },
    { time: "16:30", title: "沙洲古城遗址", type: "补充", desc: "唐代丝路重镇东西方商队交汇点", img: getImagePath("/images/hero-bg.jpg") },
  ]},
  // ===== 曼彻斯特 =====
  manchester_industry: { title: "曼彻斯特：工业革命心脏", duration: "1日", stops: [
    { time: "09:00", title: "科学与工业博物馆", type: "核心", desc: "世界首座客运火车站蒸汽时代展", img: getImagePath("/images/hero-bg.jpg") },
    { time: "11:30", title: "恩格斯故居", type: "核心", desc: "英国工人阶级状况写作背景地", img: getImagePath("/images/hero-bg.jpg") },
    { time: "14:00", title: "卡斯尔菲尔德", type: "徒步", desc: "运河铁路交汇工业交通网络起点", img: getImagePath("/images/hero-bg.jpg") },
    { time: "16:00", title: "人民历史博物馆", type: "补充", desc: "宪章运动工会史工人阶级抗争录", img: getImagePath("/images/hero-bg.jpg") },
  ]},
  manchester_revolution: { title: "曼彻斯特：劳工运动之路", duration: "1日", stops: [
    { time: "09:00", title: "圣彼得广场", type: "核心", desc: "1819彼得卢屠杀民主运动里程碑", img: getImagePath("/images/hero-bg.jpg") },
    { time: "11:00", title: "人民历史博物馆", type: "核心", desc: "卢德运动到工党工人权利斗争史", img: getImagePath("/images/hero-bg.jpg") },
    { time: "14:00", title: "切塔姆图书馆", type: "补充", desc: "马克思恩格斯研读处共产主义萌芽", img: getImagePath("/images/hero-bg.jpg") },
    { time: "16:00", title: "自由贸易大厅", type: "补充", desc: "反谷物法运动中心自由贸易理念源", img: getImagePath("/images/hero-bg.jpg") },
  ]},
  // ===== 里斯本 =====
  lisbon_trade: { title: "里斯本：大航海贸易帝国", duration: "1日", stops: [
    { time: "09:00", title: "发现者纪念碑", type: "核心", desc: "恩里克王子领航大航海时代象征", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Padrao_dos_Descobrimentos_Oct_2007.jpg/320px-Padrao_dos_Descobrimentos_Oct_2007.jpg" },
    { time: "11:00", title: "贝伦塔", type: "补充", desc: "航海者最后望见的塔海上帝国守卫", img: getImagePath("/images/hero-bg.jpg") },
    { time: "13:30", title: "热罗尼莫斯修道院", type: "核心", desc: "达伽马长眠处曼努埃尔建筑巅峰", img: getImagePath("/images/hero-bg.jpg") },
    { time: "15:30", title: "国家马车博物馆", type: "补充", desc: "殖民帝国奢华展示航海财富象征", img: getImagePath("/images/hero-bg.jpg") },
  ]},
  // ===== 萨拉热窝 =====
  sarajevo_architecture: { title: "萨拉热窝：三大帝国建筑", duration: "1日", stops: [
    { time: "09:00", title: "拉丁桥", type: "核心", desc: "斐迪南遇刺地一颗子弹引爆一战", img: getImagePath("/images/hero-bg.jpg") },
    { time: "11:00", title: "萨拉热窝1878博物馆", type: "核心", desc: "奥匈帝国统治巴尔干民族主义兴起", img: getImagePath("/images/hero-bg.jpg") },
    { time: "13:30", title: "巴什察尔希亚老城", type: "徒步", desc: "奥斯曼奥匈南斯拉夫三文明交汇", img: getImagePath("/images/hero-bg.jpg") },
    { time: "15:30", title: "战争隧道博物馆", type: "补充", desc: "90年代围城战见证历史在此重演", img: getImagePath("/images/hero-bg.jpg") },
  ]},
  // ===== 南京 =====
  nanjing_architecture: { title: "南京：百年政权更迭建筑", duration: "1日", stops: [
    { time: "09:00", title: "总统府", type: "核心", desc: "两江总督到民国政府百年政权更迭", img: getImagePath("/images/hero-bg.jpg") },
    { time: "11:00", title: "中山陵", type: "核心", desc: "孙中山长眠共和理想永恒纪念碑", img: getImagePath("/images/hero-bg.jpg") },
    { time: "14:00", title: "静海寺", type: "核心", desc: "近代第一个不平等条约南京条约址", img: getImagePath("/images/hero-bg.jpg") },
    { time: "16:00", title: "明孝陵", type: "补充", desc: "明太祖陵墓六百年帝制建筑巅峰", img: getImagePath("/images/hero-bg.jpg") },
  ]},
  nanjing_resistance: { title: "南京：铭记与和平", duration: "1日", stops: [
    { time: "09:00", title: "南京大屠杀纪念馆", type: "核心", desc: "铭记历史珍惜和平三十万同胞", img: getImagePath("/images/hero-bg.jpg") },
    { time: "11:30", title: "拉贝故居", type: "核心", desc: "南京的辛德勒国际友人人道救援", img: getImagePath("/images/hero-bg.jpg") },
    { time: "14:00", title: "总统府", type: "补充", desc: "太平天国到民国民族命运转折点", img: getImagePath("/images/hero-bg.jpg") },
    { time: "16:00", title: "雨花台烈士陵园", type: "补充", desc: "革命先烈就义之地信仰牺牲象征", img: getImagePath("/images/hero-bg.jpg") },
  ]},
  // ===== 东京 =====
  tokyo_architecture: { title: "东京：明治维新遗产", duration: "1日", stops: [
    { time: "09:00", title: "江户东京博物馆", type: "核心", desc: "幕府到维新400年变迁完整呈现", img: getImagePath("/images/hero-bg.jpg") },
    { time: "11:30", title: "明治神宫", type: "补充", desc: "明治天皇纪念神社维新象征意义", img: getImagePath("/images/hero-bg.jpg") },
    { time: "14:00", title: "靖国神社与游就馆", type: "核心", desc: "争议性战争叙事需批判性参观", img: getImagePath("/images/hero-bg.jpg") },
    { time: "16:00", title: "东京国立博物馆", type: "补充", desc: "亚洲最大博物馆封建到现代文物", img: getImagePath("/images/hero-bg.jpg") },
  ]},
  tokyo_revolution: { title: "东京：从封建到现代", duration: "1日", stops: [
    { time: "09:00", title: "皇居外苑", type: "核心", desc: "德川幕府权力中心旧制度终结地", img: getImagePath("/images/hero-bg.jpg") },
    { time: "11:00", title: "明治神宫", type: "核心", desc: "维新之父的神化天皇制现代重塑", img: getImagePath("/images/hero-bg.jpg") },
    { time: "14:00", title: "上野公园博物馆群", type: "徒步", desc: "西化空间实验博物馆美术馆聚集", img: getImagePath("/images/hero-bg.jpg") },
    { time: "16:00", title: "浅草寺", type: "补充", desc: "东京最古老寺院传统与现代交汇", img: getImagePath("/images/hero-bg.jpg") },
  ]},
};

// 获取路线
function getRoute(city: string, theme: string): RouteData {
  const key = `${city}_${theme}`;
  if (ROUTES[key]) return ROUTES[key];
  // fallback: 找该城市任意路线
  const cityKey = Object.keys(ROUTES).find(k => k.startsWith(city + "_"));
  if (cityKey) return ROUTES[cityKey];
  return ROUTES["changchun_architecture"];
}

const CITY_OPTIONS = [
  { value: "changchun", label: "长春 (伪满新京)" },
  { value: "guangzhou", label: "广州 (鸦片战争)" },
  { value: "nanjing", label: "南京 (近代史)" },
  { value: "tokyo", label: "东京 (明治维新)" },
  { value: "paris", label: "巴黎 (法国大革命)" },
  { value: "berlin", label: "柏林 (冷战)" },
  { value: "xian", label: "西安 (丝绸之路)" },
  { value: "dunhuang", label: "敦煌 (丝路明珠)" },
  { value: "boston", label: "波士顿 (美国独立)" },
  { value: "manchester", label: "曼彻斯特 (工业革命)" },
  { value: "sarajevo", label: "萨拉热窝 (一战)" },
  { value: "lisbon", label: "里斯本 (大航海)" },
];

const THEME_OPTIONS = [
  { value: "architecture", label: "建筑与殖民印记" },
  { value: "resistance", label: "抗战记忆与遗址" },
  { value: "industry", label: "工业遗产与变迁" },
  { value: "culture", label: "多元文化与生活" },
  { value: "revolution", label: "革命与社会变革" },
  { value: "trade", label: "贸易路线与商港" },
];

export default function Travel() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRoute, setGeneratedRoute] = useState<RouteData | null>(null);
  const [selectedCity, setSelectedCity] = useState("changchun");
  const [selectedTheme, setSelectedTheme] = useState("architecture");
  const [selectedDuration, setSelectedDuration] = useState("1day");

  useEffect(() => {
    setGeneratedRoute(null);
  }, [selectedCity, selectedTheme, selectedDuration]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedRoute(getRoute(selectedCity, selectedTheme));
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="bg-primary text-primary-foreground py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/map-bg.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4">深度主题旅游线路</h1>
          <p className="text-lg opacity-90 font-typewriter max-w-2xl">
            将历史洞察转化为实地探索。选择目的地和主题，生成专属的历史研学路线。
          </p>
        </div>
      </div>

      <div className="container py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-8">
          <div className="border-2 border-border bg-card p-6 shadow-brutal">
            <h3 className="font-mono font-bold text-lg uppercase mb-6 flex items-center gap-2">
              <Navigation className="w-5 h-5" /> 路线生成器
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold font-mono uppercase">目的地</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-full rounded-none border-2 border-border focus:ring-0 focus:border-primary bg-background">
                    <SelectValue placeholder="选择城市" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-2 border-border">
                    {CITY_OPTIONS.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold font-mono uppercase">偏好主题</label>
                <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                  <SelectTrigger className="w-full rounded-none border-2 border-border focus:ring-0 focus:border-primary bg-background">
                    <SelectValue placeholder="选择主题" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-2 border-border">
                    {THEME_OPTIONS.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold font-mono uppercase">时长</label>
                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                  <SelectTrigger className="w-full rounded-none border-2 border-border focus:ring-0 focus:border-primary bg-background">
                    <SelectValue placeholder="选择时长" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-2 border-border">
                    <SelectItem value="1day">1日 (紧凑)</SelectItem>
                    <SelectItem value="2days">2日 (深度)</SelectItem>
                    <SelectItem value="3days">3日+ (全景)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="w-full mt-4 rounded-none border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 shadow-brutal transition-all active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                size="lg"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2 font-mono uppercase"><span className="animate-spin">/</span> 生成中...</span>
                ) : (
                  <span className="font-mono uppercase font-bold">生成专属路线</span>
                )}
              </Button>
            </div>
          </div>

          <div className="bg-secondary/30 border-2 border-border p-6">
            <h3 className="font-mono font-bold text-lg uppercase mb-4 flex items-center gap-2">
              <Smartphone className="w-5 h-5" /> 行中 AR 辅助
            </h3>
            <div className="aspect-video bg-background border border-border mb-4 relative overflow-hidden">
              <img src={getImagePath("/images/archive-texture.jpg")} alt="AR Demo" className="w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera className="w-12 h-12 text-primary opacity-80" />
              </div>
              <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-[10px] font-mono px-2 py-1">LIVE PREVIEW</div>
            </div>
            <p className="text-sm text-muted-foreground font-typewriter mb-4">
              实景识别建筑，叠加历史原貌图层。在街区寻找建筑细节并用AR比对原貌。
            </p>
            <Button variant="outline" className="w-full rounded-none border-2 border-border hover:bg-secondary font-mono text-xs uppercase">
              下载移动端 App
            </Button>
          </div>
        </div>

        <div className="lg:col-span-8">
          {generatedRoute ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border-2 border-border bg-card p-8 shadow-brutal-lg">
              <div className="flex justify-between items-start mb-8 border-b-2 border-border pb-6">
                <div>
                  <div className="inline-block px-2 py-1 bg-secondary text-secondary-foreground font-mono text-xs font-bold mb-2 border border-border">GENERATED ROUTE</div>
                  <h2 className="text-3xl font-bold font-serif mb-2">{generatedRoute.title}</h2>
                  <div className="flex gap-4 text-sm font-mono text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {generatedRoute.duration}</span>
                    <span className="flex items-center gap-1"><MapIcon className="w-4 h-4" /> {generatedRoute.stops.length}个节点</span>
                  </div>
                </div>
              </div>

              <div className="relative pl-8 border-l-2 border-border/30 space-y-10">
                {generatedRoute.stops.map((stop, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[41px] top-0 w-5 h-5 bg-primary border-4 border-background rounded-full"></div>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                      <div className="md:w-24 font-mono text-lg font-bold text-primary pt-1">{stop.time}</div>
                      <div className="flex-1">
                        <div className="flex gap-4 mb-2">
                          <div className="w-28 h-20 bg-secondary border border-border shrink-0 overflow-hidden relative">
                            <img
                              src={stop.img}
                              alt={stop.title}
                              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                              loading="lazy"
                              onError={(e) => {
                                const el = e.target as HTMLImageElement;
                                el.style.display = 'none';
                                el.parentElement!.classList.add('bg-gradient-to-br', 'from-primary/20', 'to-secondary');
                              }}
                            />
                            <div className="absolute bottom-0 right-0 bg-primary/80 text-primary-foreground text-[8px] font-mono px-1">{stop.type}</div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold font-serif mb-1">{stop.title}</h4>
                            <p className="text-sm text-muted-foreground font-typewriter leading-relaxed">{stop.desc}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-6 border-t-2 border-border flex justify-end gap-4">
                <Button variant="outline" className="rounded-none border-2 border-border hover:bg-secondary font-mono uppercase">保存行程</Button>
                <Button className="rounded-none border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 font-mono uppercase shadow-brutal-sm">开始导航</Button>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40 border-2 border-dashed border-border p-12 bg-secondary/10">
              <MapIcon className="w-24 h-24 mb-6 text-muted-foreground" />
              <h3 className="text-2xl font-serif font-bold mb-2">等待生成路线</h3>
              <p className="font-typewriter max-w-md">请在左侧选择目的地、偏好主题和时长，点击生成按钮获取专属历史研学路线。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
