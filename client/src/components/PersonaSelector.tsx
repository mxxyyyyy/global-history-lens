import { motion, AnimatePresence } from "framer-motion";
import { HistoricalPersona } from "@/data/historicalPersonas";
import { Users, MapPin, Calendar, BookOpen, Heart, Shield, Brain, Flame, AlertTriangle } from "lucide-react";

interface PersonaSelectorProps {
  personas: HistoricalPersona[];
  selectedPersona: HistoricalPersona | null;
  onSelect: (persona: HistoricalPersona) => void;
}

const ROLE_LABELS: { [key: string]: string } = {
  resistance_fighter: "抗联战士",
  exile_student: "流亡学生",
  railway_worker: "铁路工人",
  civilian: "普通市民",
};

const ROLE_ICONS: { [key: string]: string } = {
  resistance_fighter: "⚔️",
  exile_student: "📖",
  railway_worker: "🔧",
  civilian: "🏠",
};

const TRAIT_COLORS: { [key: string]: string } = {
  "坚韧": "bg-amber-500",
  "勇气": "bg-red-500",
  "愤怒": "bg-orange-600",
  "恐惧": "bg-purple-500",
  "希望": "bg-emerald-500",
  "智慧": "bg-blue-500",
  "悲伤": "bg-slate-500",
};

export default function PersonaSelector({ personas, selectedPersona, onSelect }: PersonaSelectorProps) {
  return (
    <div className="space-y-3 h-full flex flex-col">
      <h3 className="font-mono font-bold text-xs uppercase flex items-center gap-2 border-b border-border pb-2 shrink-0">
        <Users className="w-3.5 h-3.5" /> 选择对话人物
      </h3>

      <div className="grid grid-cols-2 gap-1.5 shrink-0">
        {personas.map((persona) => (
          <motion.button
            key={persona.id}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(persona)}
            className={`p-2 border-2 text-left transition-all ${
              selectedPersona?.id === persona.id
                ? "border-amber-600 bg-amber-600/10 shadow-brutal-sm"
                : "border-border bg-background hover:bg-secondary/30"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 ${persona.avatar_color}`}>
                {persona.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <h4 className="font-bold font-serif text-xs truncate">{persona.name}</h4>
                <p className="text-[10px] font-mono text-muted-foreground truncate">
                  {ROLE_LABELS[persona.role]}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedPersona && (
          <motion.div
            key={selectedPersona.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-y-auto border-t border-border pt-3 space-y-3"
          >
            {/* 头像 + 基本信息 */}
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-brutal-sm border-2 border-border ${selectedPersona.avatar_color}`}>
                {selectedPersona.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold font-serif text-sm">{selectedPersona.name}</h4>
                  <span className="text-xs">{ROLE_ICONS[selectedPersona.role]}</span>
                </div>
                <p className="text-[11px] text-amber-700 font-mono font-bold">{selectedPersona.title}</p>
                <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-muted-foreground">
                  <span className="flex items-center gap-0.5"><Calendar className="w-2.5 h-2.5" />{selectedPersona.year}</span>
                  <span className="flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" />{selectedPersona.location}</span>
                </div>
              </div>
            </div>

            {/* 身份档案 */}
            {'profile' in selectedPersona && selectedPersona.profile && (
              <>
                <div className="bg-amber-50/50 border border-amber-200/50 p-2.5 space-y-1.5">
                  <h5 className="font-mono text-[10px] font-bold uppercase text-amber-800 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> 身份档案
                  </h5>
                  <div className="grid grid-cols-1 gap-1 text-[11px]">
                    <div><span className="font-bold text-foreground/70">年龄：</span><span className="font-typewriter">{selectedPersona.profile.age}</span></div>
                    <div><span className="font-bold text-foreground/70">籍贯：</span><span className="font-typewriter">{selectedPersona.profile.origin}</span></div>
                    <div><span className="font-bold text-foreground/70">家庭：</span><span className="font-typewriter">{selectedPersona.profile.family}</span></div>
                    <div><span className="font-bold text-foreground/70">教育：</span><span className="font-typewriter">{selectedPersona.profile.education}</span></div>
                  </div>
                </div>

                {/* 性格特征 */}
                <div className="space-y-1.5">
                  <h5 className="font-mono text-[10px] font-bold uppercase text-foreground/60 flex items-center gap-1">
                    <Brain className="w-3 h-3" /> 性格特征
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {selectedPersona.profile.personality.map((trait, i) => (
                      <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 bg-secondary border border-border/50">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 情感状态条形图 */}
                <div className="space-y-1.5">
                  <h5 className="font-mono text-[10px] font-bold uppercase text-foreground/60 flex items-center gap-1">
                    <Heart className="w-3 h-3" /> 情感状态
                  </h5>
                  <div className="space-y-1">
                    {selectedPersona.profile.traits.map((trait, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-[10px] font-mono w-8 text-right text-muted-foreground shrink-0">{trait.label}</span>
                        <div className="flex-1 h-2 bg-secondary/50 border border-border/30 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${trait.value}%` }}
                            transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                            className={`h-full ${TRAIT_COLORS[trait.label] || 'bg-primary'}`}
                          />
                        </div>
                        <span className="text-[9px] font-mono text-muted-foreground w-6">{trait.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 信念 */}
                <div className="bg-secondary/30 border border-border/50 p-2.5">
                  <h5 className="font-mono text-[10px] font-bold uppercase text-foreground/60 flex items-center gap-1 mb-1">
                    <Shield className="w-3 h-3" /> 信念
                  </h5>
                  <p className="text-[11px] font-serif italic text-foreground/80 leading-relaxed">
                    &ldquo;{selectedPersona.profile.beliefs}&rdquo;
                  </p>
                </div>

                {/* 日常生活 */}
                <div className="space-y-1">
                  <h5 className="font-mono text-[10px] font-bold uppercase text-foreground/60 flex items-center gap-1">
                    <Flame className="w-3 h-3" /> 日常处境
                  </h5>
                  <p className="text-[11px] font-typewriter text-muted-foreground leading-relaxed">
                    {selectedPersona.profile.dailyLife}
                  </p>
                </div>

                {/* 内心矛盾 */}
                <div className="bg-red-50/30 border border-red-200/30 p-2.5">
                  <h5 className="font-mono text-[10px] font-bold uppercase text-red-800/60 flex items-center gap-1 mb-1">
                    <AlertTriangle className="w-3 h-3" /> 内心挣扎
                  </h5>
                  <p className="text-[11px] font-serif text-foreground/70 leading-relaxed">
                    {selectedPersona.profile.innerConflict}
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
