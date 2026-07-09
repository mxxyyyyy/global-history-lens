const fs = require("fs");

const input = "eval/case_theme_benchmark_queries.jsonl";
const output = "eval/case_theme_benchmark_queries_with_rubrics.jsonl";

function parseMaterial(material) {
  const match = material.match(/^事件：(.+?)；史料：(.+)$/);
  if (!match) return { event: material, sources: [] };
  return {
    event: match[1].trim(),
    sources: match[2].split("、").map((source) => source.trim()).filter(Boolean),
  };
}

function listForCondition(items, max = 8) {
  const clean = [...new Set(items.filter(Boolean))];
  if (clean.length <= max) return clean.join("、");
  return `${clean.slice(0, max).join("、")}等`;
}

function makeRubrics(row) {
  const materials = row.historical_materials.map(parseMaterial);
  const events = materials.map((material) => material.event);
  const sources = materials.flatMap((material) => material.sources);
  const eventsText = listForCondition(events, 6);
  const sourcesText = listForCondition(sources, 10);
  const minMaterials = Math.min(2, Math.max(1, row.historical_materials.length));

  return [
    {
      rubric_id: `${row.id}_r1`,
      criterion: "直接回答核心问题",
      polarity: "positive",
      score_type: "binary",
      weight: 2,
      pass_condition: `回答必须正面回应该问题：“${row.question}”，并给出明确判断、解释或比较结论，而不是只复述“${row.topic}”的通用背景。`,
    },
    {
      rubric_id: `${row.id}_r2`,
      criterion: "覆盖关键对象",
      polarity: "positive",
      score_type: "binary",
      weight: 2,
      pass_condition: `回答必须覆盖问题涉及的主要历史对象，并至少讨论给定材料中的核心事件：${eventsText}；若问题要求比较、连接或说明转化关系，回答必须同时处理这些对象之间的关系。`,
    },
    {
      rubric_id: `${row.id}_r3`,
      criterion: "使用指定史料",
      polarity: "positive",
      score_type: "binary",
      weight: 2,
      pass_condition: `回答必须明确使用或提及 historical_materials 中至少 ${minMaterials} 项相关事件或史料；可使用的史料包括：${sourcesText}。完全脱离给定材料作答不得分。`,
    },
    {
      rubric_id: `${row.id}_r4`,
      criterion: "史料支撑论点",
      polarity: "positive",
      score_type: "binary",
      weight: 2,
      pass_condition: `回答必须说明${eventsText}及其相关史料如何支撑对“${row.question}”的判断，明确材料与论点之间的对应关系；只罗列材料名称不得分。`,
    },
    {
      rubric_id: `${row.id}_r5`,
      criterion: "史实准确与解释有效",
      polarity: "positive",
      score_type: "binary",
      weight: 2,
      pass_condition: `回答必须准确处理${eventsText}涉及的时间顺序、主体、立场、因果关系和历史性质，并至少解释一个关键背景、因果机制、过程转折、历史后果或叙事差异。`,
    },
    {
      rubric_id: `${row.id}_r6`,
      criterion: "明显偏题或空泛套话",
      polarity: "negative",
      score_type: "binary",
      weight: -1.5,
      trigger_condition: `回答主要是在泛泛介绍“${row.topic}”或表达笼统价值判断，没有围绕该问题的具体问法“${row.question}”展开分析。`,
    },
    {
      rubric_id: `${row.id}_r7`,
      criterion: "关键史实错误或张冠李戴",
      polarity: "negative",
      score_type: "binary",
      weight: -1.5,
      trigger_condition: `回答混淆${eventsText}中的主体、时间、地点、文献归属、基本立场或因果关系，且该错误会影响对问题核心判断的理解。`,
    },
    {
      rubric_id: `${row.id}_r8`,
      criterion: "无依据扩展或编造史料",
      polarity: "negative",
      score_type: "binary",
      weight: -1,
      trigger_condition: `回答编造未在给定材料或通行史实中出现的史料、引文、人物、数据、机构或档案内容，或把无法由指定材料支持的说法归因于${sourcesText || "给定史料"}。`,
    },
  ];
}

const rows = fs.readFileSync(input, "utf8").trim().split(/\r?\n/).map((line) => JSON.parse(line));
const enriched = rows.map((row) => ({
  ...row,
  rubric_policy: {
    version: "binary_weighted_v4",
    positive_total: 10,
    negative_total: -4,
    scoring_note: "每条 rubric 均为二元评分。正向 rubric 满足则加对应权重，不满足为 0；负向 rubric 触发则扣对应权重，不触发为 0。建议最终分数可裁剪到 0-10。",
  },
  rubrics: makeRubrics(row),
}));

fs.writeFileSync(output, `${enriched.map((row) => JSON.stringify(row)).join("\n")}\n`, "utf8");
console.log(JSON.stringify({
  output,
  rows: enriched.length,
  rubrics: enriched.reduce((sum, row) => sum + row.rubrics.length, 0),
}, null, 2));
