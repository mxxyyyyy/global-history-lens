#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const DEFAULT_MODEL = "deepseek-chat";
const DEFAULT_BASE_URL = "https://api.deepseek.com";
const DEFAULT_OUT_DIR = "tmp/persona-dialogue";

function parseArgs(argv) {
  const args = {
    apiKeyEnv: "DEEPSEEK_API_KEY",
    baseUrl: process.env.DEEPSEEK_BASE_URL || DEFAULT_BASE_URL,
    model: process.env.DEEPSEEK_MODEL || DEFAULT_MODEL,
    outDir: DEFAULT_OUT_DIR,
    temperature: 0.35,
    maxTokens: 8000,
    inputFile: null,
    caseText: null,
    benchmarkId: null,
    benchmarkFile: "eval/case_theme_benchmark_queries.jsonl",
    slug: null,
    dryRun: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = () => {
      if (i + 1 >= argv.length) throw new Error(`Missing value for ${arg}`);
      i += 1;
      return argv[i];
    };

    if (arg === "--help" || arg === "-h") args.help = true;
    else if (arg === "--case-file") args.inputFile = next();
    else if (arg === "--case-text") args.caseText = next();
    else if (arg === "--benchmark-id") args.benchmarkId = next();
    else if (arg === "--benchmark-file") args.benchmarkFile = next();
    else if (arg === "--out-dir") args.outDir = next();
    else if (arg === "--slug") args.slug = next();
    else if (arg === "--api-key-env") args.apiKeyEnv = next();
    else if (arg === "--base-url") args.baseUrl = next();
    else if (arg === "--model") args.model = next();
    else if (arg === "--temperature") args.temperature = Number(next());
    else if (arg === "--max-tokens") args.maxTokens = Number(next());
    else if (arg === "--dry-run") args.dryRun = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  return args;
}

function printHelp() {
  console.log(`Generate historical dialogue personas from a case with DeepSeek.

Usage:
  node scripts/generate_persona_dialogue.cjs --case-file docs/pearl-harbor-persona-dialogue-design.md --slug pearl-harbor
  node scripts/generate_persona_dialogue.cjs --benchmark-id ww2_q4 --slug pearl-harbor
  node scripts/generate_persona_dialogue.cjs --case-text "珍珠港事件..." --slug pearl-harbor

Required:
  Set DEEPSEEK_API_KEY in your shell before running the script.

Options:
  --case-file <path>       Read a Markdown, TXT, or JSON case file.
  --case-text <text>       Use direct case text from the command line.
  --benchmark-id <id>      Read one row from eval/case_theme_benchmark_queries.jsonl.
  --benchmark-file <path>  JSONL benchmark file. Default: eval/case_theme_benchmark_queries.jsonl
  --slug <slug>            Output filename prefix. Default: derived from input.
  --out-dir <path>         Output directory. Default: tmp/persona-dialogue
  --api-key-env <name>     Environment variable for the API key. Default: DEEPSEEK_API_KEY
  --base-url <url>         DeepSeek-compatible base URL. Default: https://api.deepseek.com
  --model <name>           Model name. Default: deepseek-chat
  --temperature <number>   Default: 0.35
  --max-tokens <number>    Default: 8000
  --dry-run                Write the prompt to disk instead of calling the API.
`);
}

function readJsonl(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function loadBenchmarkCase(args) {
  const rows = readJsonl(args.benchmarkFile);
  const row = rows.find((item) => item.id === args.benchmarkId);
  if (!row) {
    throw new Error(`No benchmark row found for id "${args.benchmarkId}" in ${args.benchmarkFile}`);
  }

  return {
    title: row.topic || row.id,
    slug: row.id,
    text: [
      `案例ID：${row.case_id || ""}`,
      `主题：${row.topic || ""}`,
      `问题：${row.question || ""}`,
      `相关材料：`,
      ...(row.historical_materials || []).map((item, index) => `${index + 1}. ${item}`),
    ].join("\n"),
  };
}

function loadInput(args) {
  if (args.caseText) {
    return {
      title: args.slug || "direct-case",
      slug: args.slug || "direct-case",
      text: args.caseText,
    };
  }

  if (args.benchmarkId) return loadBenchmarkCase(args);

  if (args.inputFile) {
    const raw = fs.readFileSync(args.inputFile, "utf8");
    const ext = path.extname(args.inputFile).toLowerCase();
    let text = raw;
    let title = path.basename(args.inputFile, ext);

    if (ext === ".json") {
      const data = JSON.parse(raw);
      title = data.title || data.topic || data.caseId || title;
      text = JSON.stringify(data, null, 2);
    }

    return {
      title,
      slug: args.slug || slugify(title),
      text,
    };
  }

  throw new Error("Please provide --case-file, --case-text, or --benchmark-id.");
}

function slugify(value) {
  const ascii = String(value)
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
  return ascii || `case-${Date.now()}`;
}

function buildSystemPrompt() {
  return `你是“全球历史透视镜”的历史人物对话设计师。你要根据给定历史案例，生成可用于产品人物对话模块的人物库。

必须遵守：
1. 输出必须是严格 JSON，不要 Markdown，不要代码块。
2. 不得编造真实人物原话；如果是推断性表达，必须标注为“史实推断型”。
3. 真实人物只能承担有公开史料、公开演说、回忆录、战史档案或主流研究可支撑的立场。
4. 普通人、现场见证者、执行者、受影响群体可以设计为“复合经验型”虚构人物，但必须说明其代表的是群体经验。
5. 争议观点、阴谋论、政治反对派解释必须放入“争议叙事型”人物，并明确“证据不足，需交叉验证”。
6. 每个人物必须有清楚的知识边界：他/她在当时知道什么、不知道什么；如果进入战后回望，也要说明时间切换。
7. 生成的人物要能支撑 8-15 轮跨时空对话，不只是单轮问答。
8. 话题点要能互相接话，形成“现场经验 -> 决策逻辑 -> 政治动员 -> 争议解释 -> 国际影响 -> 社会后果 -> 战后记忆”的链条。

可信度类型只能从这些值中选择，必要时可组合：
- 公开史料支撑
- 史实推断型
- 复合经验型
- 争议叙事型，证据不足，需交叉验证

JSON 结构必须如下：
{
  "case": {
    "title": "案例标题",
    "timeRange": "时间范围",
    "region": "地点/区域",
    "summary": "100-180字案例摘要",
    "coreTensions": ["核心矛盾1", "核心矛盾2"],
    "sourceAnchors": ["可支撑的史料或材料名称"]
  },
  "personaGroups": [
    {
      "groupName": "史料人物",
      "purpose": "这一组人物在对话中的功能",
      "personas": [
        {
          "id": "snake_case_id",
          "name": "人物姓名",
          "isRealPerson": true,
          "credibilityType": "公开史料支撑 + 史实推断型",
          "evidenceBasis": "哪些材料/公开事实支撑其立场",
          "identity": "身份",
          "timeAnchor": "时间锚点",
          "location": "地点",
          "background": "人物背景",
          "stance": "人物立场",
          "emotion": {
            "baseline": "情绪基调",
            "score": 0,
            "innerConflict": "内心冲突"
          },
          "voiceStyle": "说话风格",
          "knowledgeBoundary": "知识边界",
          "topics": [
            {
              "id": "topic_id",
              "title": "话题标题",
              "keywords": ["关键词1", "关键词2"],
              "stance": "此人物对此话题的立场",
              "contentSeed": "可用于生成回复的内容种子，80-140字",
              "followUpQuestions": ["追问1", "追问2"],
              "crossLinks": ["可接话的人物id或话题id"],
              "credibilityNote": "这个话题的可信度说明"
            }
          ],
          "futureArc": ["未来设想1", "未来设想2", "战后回望"],
          "sampleLines": ["示例台词1", "示例台词2"]
        }
      ]
    }
  ],
  "crossTimeDialoguePlan": {
    "roundCount": 12,
    "rounds": [
      {
        "round": 1,
        "title": "轮次标题",
        "speakerIds": ["persona_id"],
        "userPrompt": "用户可能提出的问题",
        "dialogueFunction": "这一轮的叙事功能",
        "timeMode": "当下视角/战后回望/系统校准",
        "credibilityReminder": "如果涉及争议或推断，在这里提示"
      }
    ]
  },
  "guardrails": [
    "安全与史实边界提示"
  ],
  "implementationNotes": [
    "产品落地建议"
  ]
}`;
}

function buildUserPrompt(input) {
  return `请根据下面的历史案例生成人物对话设计。要求：
- 人物数量建议 6-10 个。
- 至少包含：史料人物、现场/群体复合人物、争议解释人物（如果案例存在明显争议）。
- 每个人物至少 7 个话题点，重要人物可 8-12 个。
- 每个人物必须标注可信度类型。
- 设计一个 8-15 轮跨时空对话流程。
- 语言使用中文，适合直接进入产品设计文档或后续转成前端数据。

历史案例：
${input.text}`;
}

async function callDeepSeek(args, systemPrompt, userPrompt) {
  const apiKey = process.env[args.apiKeyEnv];
  if (!apiKey) {
    throw new Error(`Missing ${args.apiKeyEnv}. Set it in your shell before running this script.`);
  }

  const url = `${args.baseUrl.replace(/\/$/, "")}/v1/chat/completions`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: args.model,
      temperature: args.temperature,
      max_tokens: args.maxTokens,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`DeepSeek API error ${response.status}: ${detail.slice(0, 500)}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("DeepSeek response did not include message content.");
  return content;
}

function parseModelJson(raw) {
  let text = raw.trim();
  if (text.startsWith("```")) {
    text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  }
  return JSON.parse(text);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function writeText(filePath, text) {
  fs.writeFileSync(filePath, text, "utf8");
}

function renderMarkdown(data) {
  const lines = [];
  lines.push(`# ${data.case?.title || "历史人物对话设计"}`);
  lines.push("");
  if (data.case?.summary) lines.push(data.case.summary, "");
  lines.push("## 案例信息", "");
  lines.push(`- 时间范围：${data.case?.timeRange || ""}`);
  lines.push(`- 区域：${data.case?.region || ""}`);
  lines.push(`- 核心矛盾：${(data.case?.coreTensions || []).join("；")}`);
  lines.push(`- 史料锚点：${(data.case?.sourceAnchors || []).join("；")}`);
  lines.push("");

  for (const group of data.personaGroups || []) {
    lines.push(`## ${group.groupName}`, "");
    if (group.purpose) lines.push(group.purpose, "");

    for (const persona of group.personas || []) {
      lines.push(`### ${persona.name}`, "");
      lines.push(`- 人物ID：${persona.id}`);
      lines.push(`- 真实人物：${persona.isRealPerson ? "是" : "否"}`);
      lines.push(`- 可信度类型：${persona.credibilityType}`);
      lines.push(`- 史料/依据：${persona.evidenceBasis}`);
      lines.push(`- 身份：${persona.identity}`);
      lines.push(`- 时间锚点：${persona.timeAnchor}`);
      lines.push(`- 地点：${persona.location}`);
      lines.push(`- 情绪：${persona.emotion?.baseline || ""}（${persona.emotion?.score ?? ""}/100）`);
      lines.push(`- 内心冲突：${persona.emotion?.innerConflict || ""}`);
      lines.push(`- 说话风格：${persona.voiceStyle || ""}`);
      lines.push(`- 知识边界：${persona.knowledgeBoundary || ""}`);
      lines.push("");
      lines.push("**人物背景**", "");
      lines.push(persona.background || "", "");
      lines.push("**人物立场**", "");
      lines.push(persona.stance || "", "");
      lines.push("**话题点**", "");
      for (const topic of persona.topics || []) {
        lines.push(`- ${topic.title}：${topic.contentSeed || ""}`);
        if (topic.credibilityNote) lines.push(`  可信度说明：${topic.credibilityNote}`);
        if (topic.followUpQuestions?.length) lines.push(`  可追问：${topic.followUpQuestions.join("；")}`);
      }
      lines.push("");
      lines.push("**未来设想**", "");
      for (const item of persona.futureArc || []) lines.push(`- ${item}`);
      lines.push("");
      if (persona.sampleLines?.length) {
        lines.push("**示例台词**", "");
        for (const line of persona.sampleLines) lines.push(`> ${line}`, "");
      }
    }
  }

  const plan = data.crossTimeDialoguePlan;
  if (plan?.rounds?.length) {
    lines.push("## 跨时空对话流程", "");
    lines.push(`建议轮数：${plan.roundCount || plan.rounds.length}`, "");
    for (const round of plan.rounds) {
      lines.push(`### 第${round.round}轮：${round.title}`, "");
      lines.push(`- 出场人物：${(round.speakerIds || []).join("、")}`);
      lines.push(`- 用户问题：${round.userPrompt || ""}`);
      lines.push(`- 叙事功能：${round.dialogueFunction || ""}`);
      lines.push(`- 时间模式：${round.timeMode || ""}`);
      if (round.credibilityReminder) lines.push(`- 可信度提示：${round.credibilityReminder}`);
      lines.push("");
    }
  }

  if (data.guardrails?.length) {
    lines.push("## 史实与安全边界", "");
    for (const item of data.guardrails) lines.push(`- ${item}`);
    lines.push("");
  }

  if (data.implementationNotes?.length) {
    lines.push("## 产品落地建议", "");
    for (const item of data.implementationNotes) lines.push(`- ${item}`);
    lines.push("");
  }

  return `${lines.join("\n").replace(/\n{3,}/g, "\n\n")}\n`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  if (!Number.isFinite(args.temperature)) throw new Error("--temperature must be a number.");
  if (!Number.isFinite(args.maxTokens)) throw new Error("--max-tokens must be a number.");

  const input = loadInput(args);
  const slug = args.slug || input.slug || slugify(input.title);
  const outDir = path.resolve(args.outDir);
  ensureDir(outDir);

  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(input);

  if (args.dryRun) {
    const promptPath = path.join(outDir, `${slug}.prompt.txt`);
    writeText(promptPath, [`SYSTEM:\n${systemPrompt}`, `USER:\n${userPrompt}`].join("\n\n---\n\n"));
    console.log(JSON.stringify({ mode: "dry-run", promptPath }, null, 2));
    return;
  }

  const raw = await callDeepSeek(args, systemPrompt, userPrompt);
  const data = parseModelJson(raw);
  data.meta = {
    generatedAt: new Date().toISOString(),
    model: args.model,
    baseUrl: args.baseUrl,
    inputTitle: input.title,
  };

  const jsonPath = path.join(outDir, `${slug}.personas.json`);
  const mdPath = path.join(outDir, `${slug}.personas.md`);
  writeJson(jsonPath, data);
  writeText(mdPath, renderMarkdown(data));

  const personaCount = (data.personaGroups || []).reduce(
    (sum, group) => sum + (group.personas || []).length,
    0,
  );

  console.log(JSON.stringify({
    jsonPath,
    mdPath,
    personaGroups: data.personaGroups?.length || 0,
    personas: personaCount,
    rounds: data.crossTimeDialoguePlan?.rounds?.length || 0,
  }, null, 2));
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
