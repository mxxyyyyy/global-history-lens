import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Map as MapIcon, Navigation, Clock, Smartphone, Camera, Bus, Utensils, Hotel, Banknote, CalendarDays, Lightbulb, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { getImagePath } from "@/lib/utils";
import { TRAVEL_ROUTES, CITY_OPTIONS, DURATIONS, getRoute, type DurationKey, type RoutePlan, type RouteStop } from "@/data/travelRoutes";

const TYPE_COLORS: Record<string, string> = {
  "核心": "bg-primary text-primary-foreground",
  "美食": "bg-orange-500 text-white",
  "餐饮": "bg-orange-500 text-white",
  "住宿": "bg-indigo-500 text-white",
  "酒店": "bg-indigo-500 text-white",
  "交通": "bg-sky-500 text-white",
  "购物": "bg-pink-500 text-white",
  "体验": "bg-emerald-500 text-white",
  "徒步": "bg-amber-600 text-white",
  "补充": "bg-secondary text-secondary-foreground",
  "风景": "bg-teal-500 text-white",
};

function getTypeClass(type: string) {
  return TYPE_COLORS[type] || "bg-muted text-muted-foreground";
}

function getDefaultImage() {
  return getImagePath("/images/archive-texture.jpg");
}

interface DayGroup {
  day: string;
  label: string;
  stops: RouteStop[];
}

function groupStopsByDay(stops: RouteStop[]): DayGroup[] {
  const groups: DayGroup[] = [];
  let current: DayGroup | null = null;
  for (const stop of stops) {
    const match = stop.time.match(/^D(\d+)\s*(.*)$/i);
    if (match) {
      const dayNum = match[1];
      const restTime = match[2] || stop.time;
      if (!current || current.day !== dayNum) {
        current = { day: dayNum, label: `第 ${dayNum} 天`, stops: [] };
        groups.push(current);
      }
      current.stops.push({ ...stop, time: restTime });
    } else {
      if (!current) {
        current = { day: "1", label: "一日行程", stops: [] };
        groups.push(current);
      }
      current.stops.push(stop);
    }
  }
  return groups;
}

export default function Travel() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRoute, setGeneratedRoute] = useState<RoutePlan | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>(CITY_OPTIONS[0]?.value || "changchun");
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<DurationKey>("1day");

  const cityData = useMemo(() => TRAVEL_ROUTES[selectedCity], [selectedCity]);

  const themeOptions = useMemo(() => {
    if (!cityData) return [];
    return Object.entries(cityData.themes).map(([key]) => ({
      value: key,
      label: key,
    }));
  }, [cityData]);

  // Reset theme when city changes
  useEffect(() => {
    if (themeOptions.length > 0) {
      setSelectedTheme(themeOptions[0].value);
    } else {
      setSelectedTheme("");
    }
    setGeneratedRoute(null);
  }, [selectedCity, themeOptions]);

  useEffect(() => {
    setGeneratedRoute(null);
  }, [selectedTheme, selectedDuration]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const route = getRoute(selectedCity, selectedTheme, selectedDuration);
      setGeneratedRoute(route);
      setIsGenerating(false);
    }, 800);
  };

  const dayGroups = useMemo(() => {
    if (!generatedRoute) return [];
    return groupStopsByDay(generatedRoute.stops);
  }, [generatedRoute]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="bg-primary text-primary-foreground py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/map-bg.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4">历史行旅</h1>
          <p className="text-lg opacity-90 font-typewriter max-w-2xl">
            按目的地、偏好主题与停留时长，生成像小红书一样详细的吃、穿、住、行、游、购历史研学路线。
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
                  <SelectContent className="rounded-none border-2 border-border max-h-80">
                    {CITY_OPTIONS.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold font-mono uppercase">偏好主题</label>
                <Select value={selectedTheme} onValueChange={setSelectedTheme} disabled={themeOptions.length === 0}>
                  <SelectTrigger className="w-full rounded-none border-2 border-border focus:ring-0 focus:border-primary bg-background">
                    <SelectValue placeholder="选择主题" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-2 border-border">
                    {themeOptions.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold font-mono uppercase">停留时长</label>
                <Select value={selectedDuration} onValueChange={(v) => setSelectedDuration(v as DurationKey)}>
                  <SelectTrigger className="w-full rounded-none border-2 border-border focus:ring-0 focus:border-primary bg-background">
                    <SelectValue placeholder="选择时长" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-2 border-border">
                    {DURATIONS.map(d => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="w-full mt-4 rounded-none border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 shadow-brutal transition-all active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                size="lg"
                onClick={handleGenerate}
                disabled={isGenerating || !selectedTheme}
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2 font-mono uppercase"><span className="animate-spin">/</span> 生成中...</span>
                ) : (
                  <span className="font-mono uppercase font-bold">生成专属路线</span>
                )}
              </Button>
            </div>
          </div>

          {generatedRoute && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="border-2 border-border bg-card p-6 shadow-brutal space-y-5">
              <h3 className="font-mono font-bold text-lg uppercase flex items-center gap-2">
                <Lightbulb className="w-5 h-5" /> 实用攻略
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <Bus className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <div>
                    <span className="font-bold">交通</span>
                    <p className="text-muted-foreground font-typewriter leading-relaxed">{generatedRoute.practicalInfo.transport}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Hotel className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <div>
                    <span className="font-bold">住宿</span>
                    <p className="text-muted-foreground font-typewriter leading-relaxed">{generatedRoute.practicalInfo.accommodation}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Utensils className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <div>
                    <span className="font-bold">美食</span>
                    <p className="text-muted-foreground font-typewriter leading-relaxed">{generatedRoute.practicalInfo.food}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Banknote className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <div>
                    <span className="font-bold">预算</span>
                    <p className="text-muted-foreground font-typewriter leading-relaxed">{generatedRoute.practicalInfo.budget}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CalendarDays className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <div>
                    <span className="font-bold">最佳时间</span>
                    <p className="text-muted-foreground font-typewriter leading-relaxed">{generatedRoute.practicalInfo.bestTime}</p>
                  </div>
                </div>
                {generatedRoute.practicalInfo.tips.length > 0 && (
                  <div className="bg-secondary/30 border border-border p-3">
                    <span className="font-bold block mb-2">旅行贴士</span>
                    <ul className="space-y-1 text-muted-foreground font-typewriter">
                      {generatedRoute.practicalInfo.tips.map((tip, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}

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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border-2 border-border bg-card p-6 md:p-8 shadow-brutal-lg">
              <div className="mb-8 border-b-2 border-border pb-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <div className="inline-block px-2 py-1 bg-secondary text-secondary-foreground font-mono text-xs font-bold border border-border">GENERATED ROUTE</div>
                  <div className="inline-block px-2 py-1 bg-primary/10 text-primary font-mono text-xs font-bold border border-primary/20">{generatedRoute.duration}</div>
                  {cityData && (
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-muted text-muted-foreground font-mono text-xs font-bold border border-border">
                      <MapPin className="w-3 h-3" /> {cityData.country} · {cityData.name}
                    </div>
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-serif mb-2">{generatedRoute.title}</h2>
                <p className="text-muted-foreground font-typewriter">{generatedRoute.subtitle}</p>
                <div className="flex gap-4 mt-3 text-sm font-mono text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {generatedRoute.duration}</span>
                  <span className="flex items-center gap-1"><MapIcon className="w-4 h-4" /> {generatedRoute.stops.length} 个节点</span>
                  <span className="flex items-center gap-1"><Navigation className="w-4 h-4" /> {dayGroups.length} 天</span>
                </div>
              </div>

              <div className="space-y-10">
                {dayGroups.map((group) => (
                  <div key={group.day}>
                    <div className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b-2 border-primary/20 mb-6 pb-2">
                      <h3 className="text-xl font-bold font-serif text-primary flex items-center gap-2">
                        <span className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center font-mono text-sm">D{group.day}</span>
                        {group.label}
                      </h3>
                    </div>
                    <div className="relative pl-8 border-l-2 border-border/30 space-y-8">
                      {group.stops.map((stop, i) => (
                        <div key={`${group.day}-${i}`} className="relative">
                          <div className="absolute -left-[41px] top-0 w-5 h-5 bg-primary border-4 border-background rounded-full"></div>
                          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                            <div className="md:w-20 font-mono text-lg font-bold text-primary pt-1 shrink-0">{stop.time}</div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row gap-4">
                                <div className="w-full sm:w-36 h-24 bg-secondary border border-border shrink-0 overflow-hidden relative">
                                  <img
                                    src={stop.img && stop.img.startsWith("/") ? getImagePath(stop.img) : (stop.img || getDefaultImage())}
                                    alt={stop.title}
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                    loading="lazy"
                                    onError={(e) => {
                                      const el = e.target as HTMLImageElement;
                                      el.src = getDefaultImage();
                                    }}
                                  />
                                  <div className={`absolute bottom-0 right-0 text-[10px] font-mono px-1.5 py-0.5 ${getTypeClass(stop.type)}`}>{stop.type}</div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-lg font-bold font-serif mb-1">{stop.title}</h4>
                                  <p className="text-sm text-muted-foreground font-typewriter leading-relaxed mb-2">{stop.desc}</p>
                                  {stop.tips && (
                                    <p className="text-xs text-primary/80 font-typewriter bg-primary/5 border border-primary/10 p-2">
                                      <span className="font-bold">贴士：</span>{stop.tips}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
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
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40 border-2 border-dashed border-border p-12 bg-secondary/10 min-h-[500px]">
              <MapIcon className="w-24 h-24 mb-6 text-muted-foreground" />
              <h3 className="text-2xl font-serif font-bold mb-2">等待生成路线</h3>
              <p className="font-typewriter max-w-md">在左侧选择目的地、偏好主题和停留时长，点击生成按钮，获取包含吃、穿、住、行、游、购的完整历史研学路线。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
