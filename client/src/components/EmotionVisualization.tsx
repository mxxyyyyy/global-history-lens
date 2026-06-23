import { motion } from "framer-motion";

interface EmotionVisualizationProps {
  emotionScore: number; // 0-100
  mood: string;
  personaName: string;
}

export default function EmotionVisualization({ emotionScore, mood, personaName }: EmotionVisualizationProps) {
  // 根据情感分数确定颜色
  const getEmotionColor = (score: number) => {
    if (score < 25) return "bg-red-600"; // 悲伤/愤怒
    if (score < 45) return "bg-amber-600"; // 无奈/压抑
    if (score < 65) return "bg-yellow-600"; // 中性/复杂
    return "bg-emerald-600"; // 希望/积极
  };

  const getEmotionLabel = (score: number) => {
    if (score < 25) return "深度悲痛";
    if (score < 45) return "无奈压抑";
    if (score < 65) return "复杂矛盾";
    return "希望坚定";
  };

  return (
    <div className="space-y-2">
      {/* 情感指示器标签 */}
      <div className="flex justify-between items-center">
        <span className="text-xs font-mono text-muted-foreground uppercase">情感波动</span>
        <span className="text-xs font-bold font-mono text-foreground">{mood}</span>
      </div>

      {/* 情感条 */}
      <div className="relative h-3 bg-background border-2 border-border overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${emotionScore}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full ${getEmotionColor(emotionScore)}`}
        />
      </div>

      {/* 情感标签 */}
      <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
        <span>绝望</span>
        <span>{getEmotionLabel(emotionScore)}</span>
        <span>希望</span>
      </div>

      {/* 简短情感解读 */}
      <p className="text-xs text-muted-foreground font-typewriter leading-relaxed pt-1 border-t border-border/30">
        {emotionScore < 25 && `${personaName}在此刻表现出深深的悲痛与绝望，这是历史创伤的真实写照。`}
        {emotionScore >= 25 && emotionScore < 45 && `${personaName}感到无奈与压抑，这是被压迫者的典型心理状态。`}
        {emotionScore >= 45 && emotionScore < 65 && `${personaName}的情感复杂而矛盾，既有对现实的认知，也有对未来的思考。`}
        {emotionScore >= 65 && `${personaName}表现出希望与坚定，这是人性中最闪耀的光芒。`}
      </p>
    </div>
  );
}
