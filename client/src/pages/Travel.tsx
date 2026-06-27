import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock,
  Compass,
  Eye,
  Footprints,
  Lightbulb,
  Map as MapIcon,
  MapPin,
  Navigation,
  Route,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { getImagePath } from "@/lib/utils";
import {
  CITY_OPTIONS,
  DURATIONS,
  TRAVEL_ROUTES,
  getRoute,
  type DurationKey,
  type RoutePlan,
  type RouteStop,
} from "@/data/travelRoutes";

const CASE_TO_CITY: Record<string, string> = {
  manchukuo: "changchun",
  opium_war: "guangzhou",
  meiji: "tokyo-meiji",
  french_revolution: "paris-revolution",
  cold_war: "berlin-coldwar",
  silk_road: "dunhuang",
  american_revolution: "boston",
  industrial_revolution: "manchester-industrial",
  ww1: "sarajevo",
  age_of_exploration: "lisbon",
  american_civil_war: "washington",
  black_death: "florence",
  boxer_rebellion: "beijing",
  cuban_missile_crisis: "havana",
  decolonization: "new_delhi",
  first_sino_japanese_war: "weihai",
  korean_war: "seoul",
  mongol_empire: "kharkhorin",
  nanjing_massacre: "nanjing",
  reformation: "wittenberg",
  renaissance: "florence",
  roman_empire: "rome",
  russian_revolution: "saint_petersburg",
  slave_trade: "liverpool",
  ww2: "london-ww2",
};

const TYPE_COLORS: Record<string, string> = {
  核心: "bg-primary text-primary-foreground",
  美食: "bg-orange-500 text-white",
  餐饮: "bg-orange-500 text-white",
  住宿: "bg-indigo-500 text-white",
  酒店: "bg-indigo-500 text-white",
  交通: "bg-sky-500 text-white",
  购物: "bg-pink-500 text-white",
  体验: "bg-emerald-500 text-white",
  徒步: "bg-amber-600 text-white",
  补充: "bg-secondary text-secondary-foreground",
  风景: "bg-teal-500 text-white",
};

function getTypeClass(type: string) {
  return TYPE_COLORS[type] || "bg-muted text-muted-foreground";
}

function getDefaultImage() {
  return getImagePath("/images/archive-texture.jpg");
}

function getInitialCity() {
  if (typeof window === "undefined") return CITY_OPTIONS[0]?.value || "changchun";
  const params = new URLSearchParams(window.location.search);
  const city = params.get("city");
  if (city && TRAVEL_ROUTES[city]) return city;
  const caseId = params.get("case");
  if (caseId && CASE_TO_CITY[caseId] && TRAVEL_ROUTES[CASE_TO_CITY[caseId]]) {
    return CASE_TO_CITY[caseId];
  }
  return CITY_OPTIONS[0]?.value || "changchun";
}

function getFirstTheme(cityId: string) {
  const city = TRAVEL_ROUTES[cityId];
  return city ? Object.keys(city.themes)[0] || "" : "";
}

function getStopImage(stop: RouteStop) {
  if (!stop.img) return getDefaultImage();
  return stop.img.startsWith("/") ? getImagePath(stop.img) : stop.img;
}

function getTraceText(stop: RouteStop) {
  if (stop.type === "美食" || stop.type === "餐饮") {
    return "今天可以通过地方饮食、老字号和街区生活观察历史如何进入日常。";
  }
  if (stop.type === "住宿" || stop.type === "酒店") {
    return "今天适合把这里作为停留点，夜间再回看周边街区的空间变化。";
  }
  if (stop.type === "交通") {
    return "今天可以把它视为路线转换点，理解交通网络如何改变历史现场。";
  }
  if (stop.type === "购物") {
    return "今天可以从地方手工、纪念品和商业街区里观察历史记忆的再生产。";
  }
  if (stop.type === "体验" || stop.type === "徒步" || stop.type === "风景") {
    return "今天适合用步行和观察来感受地形、建筑尺度与历史叙事之间的关系。";
  }
  return "今天仍可通过遗址、建筑、纪念馆或街区肌理看到这段历史留下的痕迹。";
}

function getSlideNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function getRouteSummary(route: RoutePlan) {
  const coreStops = route.stops.filter((stop) => stop.type === "核心").length;
  return {
    coreStops,
    totalStops: route.stops.length,
  };
}

export default function Travel() {
  const [selectedCity, setSelectedCity] = useState<string>(() => getInitialCity());
  const [selectedTheme, setSelectedTheme] = useState<string>(() => getFirstTheme(getInitialCity()));
  const [selectedDuration, setSelectedDuration] = useState<DurationKey>("1day");
  const [activeStopIndex, setActiveStopIndex] = useState(0);

  const cityData = useMemo(() => TRAVEL_ROUTES[selectedCity], [selectedCity]);

  const themeOptions = useMemo(() => {
    if (!cityData) return [];
    return Object.keys(cityData.themes).map((key) => ({
      value: key,
      label: key.replace(/_/g, " "),
    }));
  }, [cityData]);

  useEffect(() => {
    const nextTheme = getFirstTheme(selectedCity);
    setSelectedTheme(nextTheme);
    setActiveStopIndex(0);
  }, [selectedCity]);

  useEffect(() => {
    setActiveStopIndex(0);
  }, [selectedTheme, selectedDuration]);

  const routePlan = useMemo(
    () => getRoute(selectedCity, selectedTheme, selectedDuration),
    [selectedCity, selectedTheme, selectedDuration],
  );

  const activeStop = routePlan?.stops[activeStopIndex] || routePlan?.stops[0] || null;
  const routeSummary = routePlan ? getRouteSummary(routePlan) : null;

  const nextStop = () => {
    if (!routePlan) return;
    setActiveStopIndex((current) => Math.min(current + 1, routePlan.stops.length - 1));
  };

  const previousStop = () => {
    setActiveStopIndex((current) => Math.max(current - 1, 0));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <section className="bg-primary text-primary-foreground py-12 md:py-16 relative overflow-hidden border-b-2 border-border">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/map-bg.jpg')] bg-cover bg-center mix-blend-overlay" />
        <div className="container relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-end">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-primary-foreground/70 bg-primary-foreground text-primary font-mono text-xs font-bold mb-5">
              <MapPin className="w-4 h-4" />
              WHERE HISTORY STILL LIVES
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4">历史交互</h1>
            <p className="text-lg opacity-90 font-typewriter max-w-3xl leading-relaxed">
              以“今天在哪里还能看到这段历史”为核心，把历史事件拆成地点 slide、现场叙事和可执行的旅行路线。
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="border-2 border-primary-foreground/50 p-4 bg-primary-foreground/10">
              <div className="font-mono text-2xl font-bold">{routeSummary?.totalStops || 0}</div>
              <div className="font-mono text-[10px] uppercase opacity-80">地点节点</div>
            </div>
            <div className="border-2 border-primary-foreground/50 p-4 bg-primary-foreground/10">
              <div className="font-mono text-2xl font-bold">{routeSummary?.coreStops || 0}</div>
              <div className="font-mono text-[10px] uppercase opacity-80">核心现场</div>
            </div>
            <div className="border-2 border-primary-foreground/50 p-4 bg-primary-foreground/10">
              <div className="font-mono text-2xl font-bold">{routePlan?.duration || "-"}</div>
              <div className="font-mono text-[10px] uppercase opacity-80">推荐时长</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-10 grid grid-cols-1 xl:grid-cols-12 gap-8">
        <aside className="xl:col-span-3 space-y-6">
          <div className="border-2 border-border bg-card p-5 shadow-brutal">
            <h2 className="font-mono font-bold text-lg uppercase mb-5 flex items-center gap-2">
              <Compass className="w-5 h-5" />
              选择历史现场
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold font-mono uppercase">案例 / 城市</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-full rounded-none border-2 border-border focus:ring-0 focus:border-primary bg-background">
                    <SelectValue placeholder="选择案例" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-2 border-border max-h-80">
                    {CITY_OPTIONS.map((city) => (
                      <SelectItem key={city.value} value={city.value}>
                        {city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold font-mono uppercase">叙事主题</label>
                <Select value={selectedTheme} onValueChange={setSelectedTheme} disabled={themeOptions.length === 0}>
                  <SelectTrigger className="w-full rounded-none border-2 border-border focus:ring-0 focus:border-primary bg-background">
                    <SelectValue placeholder="选择主题" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-2 border-border">
                    {themeOptions.map((theme) => (
                      <SelectItem key={theme.value} value={theme.value}>
                        {theme.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold font-mono uppercase">路线长度</label>
                <Select value={selectedDuration} onValueChange={(value) => setSelectedDuration(value as DurationKey)}>
                  <SelectTrigger className="w-full rounded-none border-2 border-border focus:ring-0 focus:border-primary bg-background">
                    <SelectValue placeholder="选择路线长度" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-2 border-border">
                    {DURATIONS.map((duration) => (
                      <SelectItem key={duration.value} value={duration.value}>
                        {duration.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {routePlan && (
            <div className="border-2 border-border bg-card p-5 shadow-brutal space-y-4">
              <h3 className="font-mono font-bold text-lg uppercase flex items-center gap-2">
                <Route className="w-5 h-5" />
                旅游路线推荐
              </h3>
              <div>
                <h4 className="font-serif text-xl font-bold">{routePlan.title}</h4>
                <p className="text-sm text-muted-foreground font-typewriter leading-relaxed mt-2">{routePlan.subtitle}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="border border-border p-3">
                  <Clock className="w-4 h-4 mb-1" />
                  {routePlan.duration}
                </div>
                <div className="border border-border p-3">
                  <Footprints className="w-4 h-4 mb-1" />
                  {routePlan.stops.length} 个地点
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <Navigation className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <p className="text-muted-foreground font-typewriter leading-relaxed">{routePlan.practicalInfo.transport}</p>
                </div>
                <div className="flex gap-3">
                  <CalendarDays className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <p className="text-muted-foreground font-typewriter leading-relaxed">{routePlan.practicalInfo.bestTime}</p>
                </div>
                <div className="flex gap-3">
                  <Lightbulb className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <p className="text-muted-foreground font-typewriter leading-relaxed">{routePlan.practicalInfo.budget}</p>
                </div>
              </div>
            </div>
          )}
        </aside>

        <div className="xl:col-span-5 space-y-6">
          <div className="border-2 border-border bg-card shadow-brutal-lg overflow-hidden">
            <div className="p-5 border-b-2 border-border flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs text-muted-foreground uppercase">Interactive Route Map</p>
                <h2 className="font-serif text-2xl font-bold">{cityData?.name || "历史现场"}</h2>
              </div>
              <div className="hidden sm:flex items-center gap-2 font-mono text-xs border border-border px-3 py-2">
                <MapIcon className="w-4 h-4" />
                {cityData?.caseName}
              </div>
            </div>

            <div className="relative min-h-[520px] bg-secondary/20 overflow-hidden">
              <img
                src={getImagePath("/images/map-bg.jpg")}
                alt="Route map texture"
                className="absolute inset-0 w-full h-full object-cover opacity-25 grayscale"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.08)_1px,transparent_1px)] bg-[length:64px_64px]" />
              {routePlan?.stops.map((stop, index) => {
                const total = Math.max((routePlan.stops.length || 1) - 1, 1);
                const x = 12 + (index / total) * 76;
                const y = 18 + ((index * 31) % 56);
                const isActive = index === activeStopIndex;
                const next = routePlan.stops[index + 1];
                const nextX = 12 + ((index + 1) / total) * 76;
                const nextY = 18 + (((index + 1) * 31) % 56);
                const width = Math.hypot(nextX - x, nextY - y);
                const angle = Math.atan2(nextY - y, nextX - x) * (180 / Math.PI);

                return (
                  <div key={`${stop.title}-${index}`}>
                    {next && (
                      <div
                        className="absolute h-[2px] bg-primary/50 origin-left"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          width: `${width}%`,
                          transform: `rotate(${angle}deg)`,
                        }}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => setActiveStopIndex(index)}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 border-2 border-border bg-background transition-all ${
                        isActive ? "z-20 w-14 h-14 bg-primary text-primary-foreground shadow-brutal" : "z-10 w-10 h-10 hover:bg-secondary"
                      }`}
                      style={{ left: `${x}%`, top: `${y}%` }}
                      aria-label={`查看地点 ${stop.title}`}
                    >
                      <span className="font-mono text-xs font-bold">{getSlideNumber(index)}</span>
                    </button>
                  </div>
                );
              })}

              {activeStop && (
                <div className="absolute left-4 right-4 bottom-4 border-2 border-border bg-background/95 p-4 shadow-brutal">
                  <div className="flex items-start gap-3">
                    <span className={`font-mono text-[10px] px-2 py-1 ${getTypeClass(activeStop.type)}`}>{activeStop.type}</span>
                    <div className="min-w-0">
                      <h3 className="font-serif text-xl font-bold truncate">{activeStop.title}</h3>
                      <p className="font-typewriter text-xs text-muted-foreground mt-1 line-clamp-2">{getTraceText(activeStop)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {routePlan && (
            <div className="border-2 border-border bg-card p-5 shadow-brutal">
              <h3 className="font-mono font-bold text-lg uppercase mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                地点目录
              </h3>
              <div className="space-y-2 max-h-[360px] overflow-auto pr-2">
                {routePlan.stops.map((stop, index) => (
                  <button
                    key={`${stop.title}-${index}`}
                    type="button"
                    onClick={() => setActiveStopIndex(index)}
                    className={`w-full text-left border-2 p-3 transition-all ${
                      index === activeStopIndex ? "border-primary bg-primary/10" : "border-border bg-background hover:bg-secondary/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-serif font-bold truncate">
                          {getSlideNumber(index)}. {stop.title}
                        </p>
                        <p className="font-mono text-[10px] text-muted-foreground">{stop.time}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="xl:col-span-4">
          {activeStop && routePlan ? (
            <motion.article
              key={`${selectedCity}-${selectedTheme}-${selectedDuration}-${activeStopIndex}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-2 border-border bg-card shadow-brutal-lg overflow-hidden sticky top-24"
            >
              <div className="aspect-[4/3] bg-secondary relative overflow-hidden border-b-2 border-border">
                <img
                  src={getStopImage(activeStop)}
                  alt={activeStop.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  onError={(event) => {
                    event.currentTarget.src = getDefaultImage();
                  }}
                />
                <div className="absolute top-4 left-4 bg-background text-foreground border-2 border-border px-3 py-1 font-mono text-xs font-bold">
                  SLIDE {getSlideNumber(activeStopIndex)}
                </div>
                <div className={`absolute bottom-4 right-4 font-mono text-xs px-3 py-1 ${getTypeClass(activeStop.type)}`}>
                  {activeStop.type}
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <p className="font-mono text-xs text-muted-foreground uppercase mb-2">{activeStop.time}</p>
                  <h2 className="font-serif text-3xl font-bold mb-3">{activeStop.title}</h2>
                  <p className="font-typewriter text-muted-foreground leading-relaxed">{activeStop.desc}</p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase mb-2">
                    <Eye className="w-4 h-4" />
                    今天还能看到什么
                  </div>
                  <p className="font-serif leading-relaxed">{getTraceText(activeStop)}</p>
                </div>

                {activeStop.tips && (
                  <div className="bg-secondary/30 border border-border p-4">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase mb-2">
                      <Sparkles className="w-4 h-4" />
                      现场建议
                    </div>
                    <p className="text-sm text-muted-foreground font-typewriter leading-relaxed">{activeStop.tips}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-none border-2 border-border hover:bg-secondary font-mono text-xs uppercase"
                    onClick={previousStop}
                    disabled={activeStopIndex === 0}
                  >
                    上一站
                  </Button>
                  <Button
                    className="flex-1 rounded-none border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs uppercase shadow-brutal-sm"
                    onClick={nextStop}
                    disabled={activeStopIndex === routePlan.stops.length - 1}
                  >
                    下一站
                  </Button>
                </div>
              </div>
            </motion.article>
          ) : (
            <div className="border-2 border-dashed border-border bg-secondary/10 min-h-[420px] flex flex-col items-center justify-center text-center p-10 opacity-70">
              <MapIcon className="w-16 h-16 mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-serif font-bold mb-2">暂无路线</h3>
              <p className="font-typewriter text-muted-foreground">请选择一个拥有路线数据的案例。</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
