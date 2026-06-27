import { motion } from "framer-motion";
import { Lightbulb, ChevronRight } from "lucide-react";
import { CROSS_PERSPECTIVE_QUESTIONS } from "@/data/perspectiveCredibility";
import { useLanguage } from "@/contexts/LanguageContext";

interface CrossPerspectiveQuestionsProps {
  onQuestionSelect: (question: string) => void;
}

export default function CrossPerspectiveQuestions({ onQuestionSelect }: CrossPerspectiveQuestionsProps) {
  const { t } = useLanguage();
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-emerald-100 text-emerald-700";
      case "medium":
        return "bg-amber-100 text-amber-700";
      case "hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return t("初级", "Basic");
      case "medium":
        return t("中级", "Intermediate");
      case "hard":
        return t("高级", "Advanced");
      default:
        return t("未知", "Unknown");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3 bg-secondary/20 border-2 border-border p-4"
    >
      <h3 className="font-mono text-sm font-bold uppercase flex items-center gap-2">
        <Lightbulb className="w-4 h-4 text-amber-600" />
        {t("跨视角思考问题", "Cross-perspective Questions")}
      </h3>

      <p className="text-xs text-muted-foreground font-typewriter">
        {t("这些问题旨在帮助您从多个角度思考历史，培养批判性思维。", "Use these prompts to compare interpretations and sharpen critical thinking.")}
      </p>

      <div className="space-y-2">
        {CROSS_PERSPECTIVE_QUESTIONS.map((item, idx) => (
          <motion.button
            key={idx}
            whileHover={{ x: 4 }}
            onClick={() => onQuestionSelect(item.question)}
            className="w-full text-left p-3 bg-background border border-border hover:border-primary hover:bg-primary/5 transition-all group"
          >
            <div className="flex items-start gap-3">
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-serif leading-snug text-foreground group-hover:text-primary transition-colors">
                  {item.question}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${getDifficultyColor(item.difficulty)}`}>
                    {getDifficultyLabel(item.difficulty)}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {item.relatedPerspectives.length} {t("个视角相关", "related perspectives")}
                  </span>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="pt-2 border-t border-border/30 text-xs text-muted-foreground font-typewriter">
        <strong>{t("提示：", "Tip: ")}</strong>{t("点击任何问题，系统将为您生成多视角的深度分析。", "Click a question to generate a multi-perspective analysis.")}
      </div>
    </motion.div>
  );
}
