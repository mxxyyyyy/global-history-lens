import { useEffect, useMemo, useRef, useState } from "react";
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
import { useLanguage, type Language } from "@/contexts/LanguageContext";

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

interface LatLng {
  lat: number;
  lng: number;
}

interface RoutePoint extends LatLng {
  stop: RouteStop;
  index: number;
  isExact: boolean;
}

interface StopImage {
  src: string;
  label: string;
}

const CITY_CENTERS: Record<string, LatLng> = {
  beijing: { lat: 39.9042, lng: 116.4074 },
  "berlin-coldwar": { lat: 52.52, lng: 13.405 },
  boston: { lat: 42.3601, lng: -71.0589 },
  changchun: { lat: 43.8171, lng: 125.3235 },
  dunhuang: { lat: 40.1421, lng: 94.6618 },
  florence: { lat: 43.7696, lng: 11.2558 },
  guangzhou: { lat: 23.1291, lng: 113.2644 },
  havana: { lat: 23.1136, lng: -82.3666 },
  kharkhorin: { lat: 47.1975, lng: 102.8238 },
  lisbon: { lat: 38.7223, lng: -9.1393 },
  liverpool: { lat: 53.4084, lng: -2.9916 },
  "london-ww2": { lat: 51.5072, lng: -0.1276 },
  "manchester-industrial": { lat: 53.4808, lng: -2.2426 },
  nanjing: { lat: 32.0603, lng: 118.7969 },
  new_delhi: { lat: 28.6139, lng: 77.209 },
  "paris-revolution": { lat: 48.8566, lng: 2.3522 },
  philadelphia: { lat: 39.9526, lng: -75.1652 },
  rome: { lat: 41.9028, lng: 12.4964 },
  saint_petersburg: { lat: 59.9343, lng: 30.3351 },
  sarajevo: { lat: 43.8563, lng: 18.4131 },
  seoul: { lat: 37.5665, lng: 126.978 },
  "tokyo-meiji": { lat: 35.6762, lng: 139.6503 },
  washington: { lat: 38.9072, lng: -77.0369 },
  weihai: { lat: 37.5131, lng: 122.1204 },
  wittenberg: { lat: 51.8661, lng: 12.6469 },
  xian: { lat: 34.3416, lng: 108.9398 },
};

const CITY_ZOOM: Record<string, number> = {
  guangzhou: 13,
  beijing: 13,
  changchun: 13,
  "berlin-coldwar": 13,
  "tokyo-meiji": 12,
  rome: 13,
  florence: 14,
  nanjing: 13,
  seoul: 12,
  washington: 13,
  "london-ww2": 12,
};

const STOP_COORDINATES: Record<string, LatLng> = {
  广州十三行博物馆: { lat: 23.1103, lng: 113.2562 },
  粤海关博物馆: { lat: 23.1095, lng: 113.2498 },
  沙面岛: { lat: 23.1107, lng: 113.2398 },
  上下九步行街: { lat: 23.1169, lng: 113.2462 },
  南信牛奶甜品专家: { lat: 23.1166, lng: 113.2461 },
  北京路商圈: { lat: 23.124, lng: 113.2692 },
  北京路步行街: { lat: 23.124, lng: 113.2692 },
  黄埔古港: { lat: 23.0971, lng: 113.3955 },
  "广州博物馆（镇海楼）": { lat: 23.1391, lng: 113.2644 },
  光孝寺: { lat: 23.1256, lng: 113.256 },
  点都德: { lat: 23.1249, lng: 113.2708 },
  珠江夜游天字码头: { lat: 23.1159, lng: 113.2735 },
  东交民巷: { lat: 39.9009, lng: 116.4106 },
  西什库教堂: { lat: 39.9252, lng: 116.3726 },
  正阳门与前门大街: { lat: 39.8994, lng: 116.3976 },
  天安门广场: { lat: 39.9037, lng: 116.3977 },
  前门大街: { lat: 39.8956, lng: 116.3972 },
  王府井天主教堂: { lat: 39.9155, lng: 116.4115 },
  故宫: { lat: 39.9163, lng: 116.3972 },
  景山公园: { lat: 39.925, lng: 116.3967 },
  南锣鼓巷: { lat: 39.9372, lng: 116.4031 },
  什刹海: { lat: 39.9394, lng: 116.3848 },
  伪满皇宫博物院: { lat: 43.9084, lng: 125.3548 },
  长影旧址博物馆: { lat: 43.8797, lng: 125.301 },
  新民大街: { lat: 43.8822, lng: 125.3142 },
  南湖公园: { lat: 43.8557, lng: 125.3108 },
  长春世界雕塑园: { lat: 43.8176, lng: 125.3428 },
  勃兰登堡门: { lat: 52.5163, lng: 13.3777 },
  国会大厦: { lat: 52.5186, lng: 13.3762 },
  查理检查站: { lat: 52.5075, lng: 13.3904 },
  柏林墙纪念馆: { lat: 52.5351, lng: 13.3902 },
  东边画廊: { lat: 52.505, lng: 13.4397 },
  亚历山大广场: { lat: 52.5219, lng: 13.4132 },
  明治神宫: { lat: 35.6764, lng: 139.6993 },
  皇居: { lat: 35.6852, lng: 139.7528 },
  浅草寺: { lat: 35.7148, lng: 139.7967 },
  东京站: { lat: 35.6812, lng: 139.7671 },
  上野公园: { lat: 35.7156, lng: 139.7745 },
  卢浮宫: { lat: 48.8606, lng: 2.3376 },
  巴士底广场: { lat: 48.8532, lng: 2.3691 },
  协和广场: { lat: 48.8656, lng: 2.3212 },
  巴黎圣母院: { lat: 48.853, lng: 2.3499 },
  凡尔赛宫: { lat: 48.8049, lng: 2.1204 },
  斗兽场: { lat: 41.8902, lng: 12.4922 },
  罗马斗兽场: { lat: 41.8902, lng: 12.4922 },
  古罗马广场: { lat: 41.8925, lng: 12.4853 },
  "帕拉蒂尼山 Palatino": { lat: 41.8896, lng: 12.4873 },
  万神殿: { lat: 41.8986, lng: 12.4769 },
  南京大屠杀遇难同胞纪念馆: { lat: 32.0352, lng: 118.7423 },
  中山陵: { lat: 32.0612, lng: 118.8487 },
  总统府: { lat: 32.047, lng: 118.7926 },
  景福宫: { lat: 37.5796, lng: 126.977 },
  战争纪念馆: { lat: 37.5365, lng: 126.977 },
  国立中央博物馆: { lat: 37.5238, lng: 126.9804 },
  独立纪念馆: { lat: 37.5736, lng: 126.9601 },
  美国国会大厦: { lat: 38.8899, lng: -77.0091 },
  林肯纪念堂: { lat: 38.8893, lng: -77.05 },
  国家档案馆: { lat: 38.8929, lng: -77.0231 },
};

const STOP_IMAGE_OVERRIDES: Record<string, StopImage[]> = {
  广州十三行博物馆: [
    {
      src: "/images/locations/guangzhou-canton-factories.jpg",
      label: "十三行历史图像",
    },
  ],
  粤海关博物馆: [
    {
      src: "/images/locations/guangzhou-custom-house.jpg",
      label: "粤海关大楼",
    },
  ],
  沙面岛: [
    {
      src: "/images/locations/guangzhou-shamian-island.jpg",
      label: "沙面岛滨水街区",
    },
  ],
  上下九步行街: [
    {
      src: "/images/locations/guangzhou-shangxiajiu.jpg",
      label: "上下九步行街",
    },
  ],
  南信牛奶甜品专家: [
    {
      src: "/images/locations/guangzhou-shangxiajiu.jpg",
      label: "南信所在的上下九街区",
    },
  ],
  北京路商圈: [
    {
      src: "/images/locations/guangzhou-shangxiajiu.jpg",
      label: "广州骑楼商业街区",
    },
  ],
  北京路步行街: [
    {
      src: "/images/locations/guangzhou-shangxiajiu.jpg",
      label: "广州骑楼商业街区",
    },
  ],
  黄埔古港: [
    {
      src: "/images/locations/guangzhou-canton-factories.jpg",
      label: "广州外贸历史图像",
    },
  ],
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

function getStopImages(stop: RouteStop): StopImage[] {
  const overrideImages = STOP_IMAGE_OVERRIDES[stop.title] || [];
  const originalImage = stop.img
    ? [
        {
          src: getStopImage(stop),
          label: "地点照片",
        },
      ]
    : [];

  const images = [...overrideImages, ...originalImage].filter((image, index, all) => {
    return all.findIndex((item) => item.src === image.src) === index;
  });

  return images.length > 0
    ? images.slice(0, 2)
    : [
        {
          src: getDefaultImage(),
          label: "地点图像待补充",
        },
      ];
}

function resolveImageSrc(src: string) {
  return src.startsWith("/") ? getImagePath(src) : src;
}

function getTypeLabel(type: string, language: Language) {
  if (language === "zh") return type;
  const labels: Record<string, string> = {
    核心: "Core",
    美食: "Food",
    餐饮: "Dining",
    住宿: "Stay",
    酒店: "Hotel",
    交通: "Transit",
    购物: "Shops",
    体验: "Experience",
    徒步: "Walk",
    补充: "Extra",
    风景: "Scenic",
    文化: "Culture",
  };
  return labels[type] || type;
}

function getTraceText(stop: RouteStop, language: Language) {
  if (language === "en") {
    if (stop.type === "美食" || stop.type === "餐饮") {
      return "Food, local shops, and neighborhood routines reveal how history enters everyday life.";
    }
    if (stop.type === "住宿" || stop.type === "酒店") {
      return "Use this as a base point, then read the surrounding streets as layers of urban change.";
    }
    if (stop.type === "交通") {
      return "This works as a transfer point for understanding how mobility reshaped historical space.";
    }
    if (stop.type === "购物") {
      return "Local crafts, souvenirs, and commercial streets show how public memory is reproduced.";
    }
    if (stop.type === "体验" || stop.type === "徒步" || stop.type === "风景") {
      return "Walk slowly and read the terrain, building scale, and urban texture as part of the story.";
    }
    return "Today, traces of this history can still be seen through sites, buildings, museums, and street patterns.";
  }

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

function getStopCoordinate(cityId: string, stop: RouteStop, index: number): RoutePoint {
  const exact = STOP_COORDINATES[stop.title];
  if (exact) {
    return { ...exact, stop, index, isExact: true };
  }

  const center = CITY_CENTERS[cityId] || CITY_CENTERS.changchun;
  const angle = index * 1.85;
  const radius = 0.012 + index * 0.004;
  const lngScale = Math.max(Math.cos((center.lat * Math.PI) / 180), 0.35);

  return {
    lat: center.lat + Math.sin(angle) * radius,
    lng: center.lng + (Math.cos(angle) * radius) / lngScale,
    stop,
    index,
    isExact: false,
  };
}

function getRoutePoints(cityId: string, route: RoutePlan | null): RoutePoint[] {
  if (!route) return [];
  return route.stops.map((stop, index) => getStopCoordinate(cityId, stop, index));
}

function latLngToWorld(point: LatLng, zoom: number) {
  const tileSize = 256;
  const scale = 2 ** zoom * tileSize;
  const lat = Math.max(Math.min(point.lat, 85.05112878), -85.05112878);
  const sinLat = Math.sin((lat * Math.PI) / 180);

  return {
    x: ((point.lng + 180) / 360) * scale,
    y: (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * scale,
  };
}

function wrapTileX(tileX: number, zoom: number) {
  const count = 2 ** zoom;
  return ((tileX % count) + count) % count;
}

function clampTileY(tileY: number, zoom: number) {
  const max = 2 ** zoom - 1;
  return Math.max(0, Math.min(tileY, max));
}

function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 760, height: 520 });

  useEffect(() => {
    if (!ref.current) return;

    const updateSize = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setSize({
        width: Math.max(rect.width, 320),
        height: Math.max(rect.height, 420),
      });
    };

    updateSize();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }

    const observer = new ResizeObserver(updateSize);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, size };
}

function RealRouteMap({
  cityId,
  routePlan,
  activeStopIndex,
  language,
  onStopSelect,
}: {
  cityId: string;
  routePlan: RoutePlan | null;
  activeStopIndex: number;
  language: Language;
  onStopSelect: (index: number) => void;
}) {
  const points = useMemo(() => getRoutePoints(cityId, routePlan), [cityId, routePlan]);
  const activePoint = points[activeStopIndex] || points[0] || {
    ...(CITY_CENTERS[cityId] || CITY_CENTERS.changchun),
    stop: null,
    index: 0,
    isExact: false,
  };
  const [zoom, setZoom] = useState(CITY_ZOOM[cityId] || 12);
  const { ref, size } = useElementSize<HTMLDivElement>();

  useEffect(() => {
    setZoom(CITY_ZOOM[cityId] || 12);
  }, [cityId]);

  const center = { lat: activePoint.lat, lng: activePoint.lng };
  const centerWorld = latLngToWorld(center, zoom);
  const topLeft = {
    x: centerWorld.x - size.width / 2,
    y: centerWorld.y - size.height / 2,
  };
  const minTileX = Math.floor(topLeft.x / 256) - 1;
  const maxTileX = Math.floor((topLeft.x + size.width) / 256) + 1;
  const minTileY = Math.floor(topLeft.y / 256) - 1;
  const maxTileY = Math.floor((topLeft.y + size.height) / 256) + 1;
  const tiles = [];

  for (let tileX = minTileX; tileX <= maxTileX; tileX += 1) {
    for (let tileY = minTileY; tileY <= maxTileY; tileY += 1) {
      const y = clampTileY(tileY, zoom);
      tiles.push({
        key: `${zoom}-${tileX}-${tileY}`,
        url: `https://tile.openstreetmap.org/${zoom}/${wrapTileX(tileX, zoom)}/${y}.png`,
        left: tileX * 256 - topLeft.x,
        top: y * 256 - topLeft.y,
      });
    }
  }

  const projectedPoints = points.map((point) => {
    const world = latLngToWorld(point, zoom);
    return {
      ...point,
      x: world.x - topLeft.x,
      y: world.y - topLeft.y,
    };
  });
  const activeProjectedPoint = projectedPoints[activeStopIndex] || projectedPoints[0];
  const polyline = projectedPoints.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <div ref={ref} className="relative min-h-[520px] bg-secondary overflow-hidden">
      {tiles.map((tile) => (
        <img
          key={tile.key}
          src={tile.url}
          alt=""
          className="absolute w-64 h-64 select-none"
          draggable={false}
          referrerPolicy="no-referrer"
          style={{ left: tile.left, top: tile.top }}
        />
      ))}
      <div className="absolute inset-0 bg-background/10 mix-blend-multiply pointer-events-none" />
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        <polyline
          points={polyline}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="4"
          strokeLinecap="square"
          strokeLinejoin="round"
          strokeDasharray="10 8"
          opacity="0.85"
        />
      </svg>

      {projectedPoints.map((point) => {
        const isActive = point.index === activeStopIndex;
        return (
          <button
            key={`${point.stop.title}-${point.index}`}
            type="button"
            onClick={() => onStopSelect(point.index)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 border-2 border-border transition-all ${
              isActive
                ? "z-30 w-14 h-14 bg-primary text-primary-foreground shadow-brutal"
                : "z-20 w-10 h-10 bg-background hover:bg-secondary shadow-brutal-sm"
            }`}
            style={{ left: point.x, top: point.y }}
            aria-label={`查看地点 ${point.stop.title}`}
            title={point.isExact ? point.stop.title : `${point.stop.title}（待校准坐标）`}
          >
            <span className="font-mono text-xs font-bold">{getSlideNumber(point.index)}</span>
          </button>
        );
      })}

      <div className="absolute left-4 top-4 z-40 border-2 border-border bg-background/95 p-3 shadow-brutal max-w-[260px]">
        <p className="font-mono text-[10px] uppercase text-muted-foreground">Story Map</p>
        <p className="font-serif text-lg font-bold leading-tight">
          {activeProjectedPoint?.stop.title || (language === "en" ? "Historical Site" : "历史现场")}
        </p>
        {activeProjectedPoint && !activeProjectedPoint.isExact && (
          <p className="mt-1 font-mono text-[10px] text-muted-foreground">
            {language === "en" ? "Approximate city-level coordinate. This point can be refined later." : "该点位使用城市近似坐标，可继续精修。"}
          </p>
        )}
      </div>

      <div className="absolute right-4 top-4 z-40 flex flex-col border-2 border-border shadow-brutal">
        <button
          type="button"
          onClick={() => setZoom((current) => Math.min(current + 1, 18))}
          className="w-10 h-10 bg-background hover:bg-secondary border-b-2 border-border font-mono font-bold"
          aria-label="放大地图"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => setZoom((current) => Math.max(current - 1, 3))}
          className="w-10 h-10 bg-background hover:bg-secondary font-mono font-bold"
          aria-label="缩小地图"
        >
          -
        </button>
      </div>

      {activeProjectedPoint && (
        <div className="absolute left-4 right-4 bottom-4 z-40 border-2 border-border bg-background/95 p-4 shadow-brutal">
          <div className="flex items-start gap-3">
            <span className={`font-mono text-[10px] px-2 py-1 ${getTypeClass(activeProjectedPoint.stop.type)}`}>
              {getTypeLabel(activeProjectedPoint.stop.type, language)}
            </span>
            <div className="min-w-0">
              <h3 className="font-serif text-xl font-bold truncate">{activeProjectedPoint.stop.title}</h3>
              <p className="font-typewriter text-xs text-muted-foreground mt-1 line-clamp-2">
                {getTraceText(activeProjectedPoint.stop, language)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="absolute right-3 bottom-2 z-40 bg-background/90 px-2 py-1 font-mono text-[10px] text-muted-foreground border border-border">
        Map data © OpenStreetMap contributors
      </div>
    </div>
  );
}

export default function Travel() {
  const { language, t } = useLanguage();
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
  const activeStopImages = activeStop ? getStopImages(activeStop) : [];
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
            <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4">{t("历史交互", "Historical Story Map")}</h1>
            <p className="text-lg opacity-90 font-typewriter max-w-3xl leading-relaxed">
              {t("以“今天在哪里还能看到这段历史”为核心，把历史事件拆成地点 slide、现场叙事和可执行的旅行路线。", "Built around one question: where can this history still be seen today? Each route connects real map locations, narrative slides, and travel-ready context.")}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="border-2 border-primary-foreground/50 p-4 bg-primary-foreground/10">
              <div className="font-mono text-2xl font-bold">{routeSummary?.totalStops || 0}</div>
              <div className="font-mono text-[10px] uppercase opacity-80">{t("地点节点", "Location stops")}</div>
            </div>
            <div className="border-2 border-primary-foreground/50 p-4 bg-primary-foreground/10">
              <div className="font-mono text-2xl font-bold">{routeSummary?.coreStops || 0}</div>
              <div className="font-mono text-[10px] uppercase opacity-80">{t("核心现场", "Core sites")}</div>
            </div>
            <div className="border-2 border-primary-foreground/50 p-4 bg-primary-foreground/10">
              <div className="font-mono text-2xl font-bold">{routePlan?.duration || "-"}</div>
              <div className="font-mono text-[10px] uppercase opacity-80">{t("推荐时长", "Suggested time")}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-10 grid grid-cols-1 xl:grid-cols-12 gap-8">
        <aside className="xl:col-span-3 space-y-6">
          <div className="border-2 border-border bg-card p-5 shadow-brutal">
            <h2 className="font-mono font-bold text-lg uppercase mb-5 flex items-center gap-2">
              <Compass className="w-5 h-5" />
              {t("选择历史现场", "Choose a Story Map")}
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold font-mono uppercase">{t("案例 / 城市", "Case / City")}</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-full rounded-none border-2 border-border focus:ring-0 focus:border-primary bg-background">
                    <SelectValue placeholder={t("选择案例", "Choose a case")} />
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
                <label className="text-sm font-bold font-mono uppercase">{t("叙事主题", "Narrative theme")}</label>
                <Select value={selectedTheme} onValueChange={setSelectedTheme} disabled={themeOptions.length === 0}>
                  <SelectTrigger className="w-full rounded-none border-2 border-border focus:ring-0 focus:border-primary bg-background">
                    <SelectValue placeholder={t("选择主题", "Choose a theme")} />
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
                <label className="text-sm font-bold font-mono uppercase">{t("路线长度", "Route length")}</label>
                <Select value={selectedDuration} onValueChange={(value) => setSelectedDuration(value as DurationKey)}>
                  <SelectTrigger className="w-full rounded-none border-2 border-border focus:ring-0 focus:border-primary bg-background">
                    <SelectValue placeholder={t("选择路线长度", "Choose duration")} />
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
                {t("旅游路线推荐", "Recommended route")}
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
                  {routePlan.stops.length} {t("个地点", "stops")}
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
                <h2 className="font-serif text-2xl font-bold">{cityData?.name || t("历史现场", "Historical Sites")}</h2>
              </div>
              <div className="hidden sm:flex items-center gap-2 font-mono text-xs border border-border px-3 py-2">
                <MapIcon className="w-4 h-4" />
                {cityData?.caseName}
              </div>
            </div>

            <RealRouteMap
              cityId={selectedCity}
              routePlan={routePlan}
              activeStopIndex={activeStopIndex}
              language={language}
              onStopSelect={setActiveStopIndex}
            />
          </div>

          {routePlan && (
            <div className="border-2 border-border bg-card p-5 shadow-brutal">
              <h3 className="font-mono font-bold text-lg uppercase mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                {t("地点目录", "Location Slides")}
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
              <div className="bg-secondary/30 border-b-2 border-border p-4">
                <div className={activeStopImages.length > 1 ? "grid grid-cols-2 gap-3" : "grid grid-cols-1"}>
                  {activeStopImages.map((image, index) => (
                    <div
                      key={`${image.src}-${index}`}
                      className="relative h-36 md:h-44 bg-secondary border-2 border-border overflow-hidden"
                    >
                      <img
                        src={resolveImageSrc(image.src)}
                        alt={`${activeStop.title}：${image.label}`}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        onError={(event) => {
                          event.currentTarget.src = getDefaultImage();
                        }}
                      />
                      <div className="absolute left-2 top-2 bg-background/90 text-foreground border border-border px-2 py-1 font-mono text-[10px] font-bold">
                        {index === 0 ? `SLIDE ${getSlideNumber(activeStopIndex)}` : "PHOTO 02"}
                      </div>
                      <div className="absolute left-2 bottom-2 max-w-[calc(100%-1rem)] bg-primary text-primary-foreground px-2 py-1 font-mono text-[10px] font-bold truncate">
                        {image.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`mt-3 inline-flex font-mono text-xs px-3 py-1 ${getTypeClass(activeStop.type)}`}>
                  {getTypeLabel(activeStop.type, language)}
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
                    {t("今天还能看到什么", "What can you still see today?")}
                  </div>
                  <p className="font-serif leading-relaxed">{getTraceText(activeStop, language)}</p>
                </div>

                {activeStop.tips && (
                  <div className="bg-secondary/30 border border-border p-4">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase mb-2">
                      <Sparkles className="w-4 h-4" />
                      {t("现场建议", "On-site notes")}
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
                    {t("上一站", "Previous")}
                  </Button>
                  <Button
                    className="flex-1 rounded-none border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs uppercase shadow-brutal-sm"
                    onClick={nextStop}
                    disabled={activeStopIndex === routePlan.stops.length - 1}
                  >
                    {t("下一站", "Next")}
                  </Button>
                </div>
              </div>
            </motion.article>
          ) : (
            <div className="border-2 border-dashed border-border bg-secondary/10 min-h-[420px] flex flex-col items-center justify-center text-center p-10 opacity-70">
              <MapIcon className="w-16 h-16 mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-serif font-bold mb-2">{t("暂无路线", "No route available")}</h3>
              <p className="font-typewriter text-muted-foreground">{t("请选择一个拥有路线数据的案例。", "Choose a case with route data.")}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
