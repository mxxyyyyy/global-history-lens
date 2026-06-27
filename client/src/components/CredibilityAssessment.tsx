import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, BookOpen, TrendingUp } from "lucide-react";
import { PerspectiveAnalysis } from "@/data/perspectiveCredibility";
import { useLanguage } from "@/contexts/LanguageContext";

interface CredibilityAssessmentProps {
  perspective: PerspectiveAnalysis;
}

export default function CredibilityAssessment({ perspective }: CredibilityAssessmentProps) {
  const { t } = useLanguage();
  const getCredibilityColor = (score: number) => {
    if (score >= 85) return "text-emerald-600";
    if (score >= 70) return "text-amber-600";
    return "text-red-600";
  };

  const getCredibilityLabel = (score: number) => {
    if (score >= 85) return t("高度可信", "Highly reliable");
    if (score >= 70) return t("中等可信", "Moderately reliable");
    return t("需谨慎", "Use with caution");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3 bg-card border-2 border-border p-4 max-h-[34rem] overflow-y-auto"
    >
      {/* 可信度总体评分 */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/30">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-muted-foreground" />
          <span className="font-mono text-sm font-bold uppercase">{t("可信度评估", "Source Reliability")}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-24 h-2 bg-background border border-border overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${perspective.overallCredibility}%` }}
              transition={{ duration: 0.8 }}
              className={`h-full ${
                perspective.overallCredibility >= 85
                  ? "bg-emerald-600"
                  : perspective.overallCredibility >= 70
                    ? "bg-amber-600"
                    : "bg-red-600"
              }`}
            />
          </div>
          <span className={`font-bold text-sm font-mono ${getCredibilityColor(perspective.overallCredibility)}`}>
            {perspective.overallCredibility}%
          </span>
        </div>
      </div>

      {/* 可信度评价文本 */}
      <div className="text-sm text-muted-foreground font-typewriter leading-relaxed">
        {perspective.credibilityAssessment}
      </div>

      {/* 偏见指标 */}
      <div className="space-y-2">
        <h4 className="font-mono text-xs font-bold uppercase flex items-center gap-2 text-amber-700">
          <AlertCircle className="w-4 h-4" /> {t("潜在偏见", "Possible Bias")}
        </h4>
        <ul className="space-y-1">
          {perspective.biasIndicators.slice(0, 3).map((bias, idx) => (
            <li key={idx} className="text-xs text-muted-foreground font-typewriter pl-4 relative">
              <span className="absolute left-0">•</span>
              {bias}
            </li>
          ))}
        </ul>
      </div>

      {/* 史料来源 */}
      <div className="space-y-2 pt-2 border-t border-border/30">
        <h4 className="font-mono text-xs font-bold uppercase flex items-center gap-2">
          <BookOpen className="w-4 h-4" /> {t("主要来源", "Key Sources")} ({perspective.sources.length})
        </h4>
        <div className="space-y-2">
          {perspective.sources.slice(0, 2).map((source) => (
            <motion.div
              key={source.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-background/50 border border-border/50 p-2 text-xs space-y-1"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-foreground truncate">{source.title}</h5>
                  <p className="text-muted-foreground">
                    {source.author && `${source.author} · `}
                    {source.year} · {source.type === "official_archive" && t("官方档案", "official archive")}
                    {source.type === "academic" && t("学术研究", "scholarship")}
                    {source.type === "media" && t("媒体报道", "media")}
                    {source.type === "memoir" && t("亲历记录", "memoir")}
                    {source.type === "international" && t("国际文献", "international record")}
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  <span className="font-mono font-bold text-emerald-600">{source.credibilityScore}%</span>
                </div>
              </div>
              <p className="text-muted-foreground italic line-clamp-2">{source.excerpt}</p>
              <p className="text-[10px] text-muted-foreground border-t border-border/30 pt-1">
                <span className="font-mono">{t("评价：", "Note: ")}</span>
                {source.credibilityReason}
              </p>
            </motion.div>
          ))}
          {perspective.sources.length > 2 && (
            <p className="text-[10px] text-muted-foreground font-mono">
              {t("已显示前 2 条核心来源，更多来源保留在档案库中。", "Showing the top 2 sources here. More source detail remains in the archive.")}
            </p>
          )}
        </div>
      </div>

      {/* 推荐问题 */}
      <div className="space-y-2 pt-2 border-t border-border/30">
        <h4 className="font-mono text-xs font-bold uppercase">{t("深度思考问题", "Questions to Think With")}</h4>
        <ul className="space-y-1">
          {perspective.sources.length > 0 &&
            perspective.sources.slice(0, 2).map((_, idx) => (
              <li key={idx} className="text-xs text-primary font-typewriter pl-4 relative cursor-pointer hover:underline">
                <span className="absolute left-0">→</span>
                {idx === 0 && t("这些来源的共识点在哪里？", "Where do these sources overlap?")}
                {idx === 1 && t("与其他视角相比，这个视角的独特之处是什么？", "What makes this perspective distinct from the others?")}
              </li>
            ))}
        </ul>
      </div>
    </motion.div>
  );
}
