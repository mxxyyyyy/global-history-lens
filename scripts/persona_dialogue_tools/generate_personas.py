#!/usr/bin/env python
"""Generate reusable historical persona-dialogue designs with DeepSeek.

The module can be imported by other scripts, or run as a CLI:

    python scripts/persona_dialogue_tools/generate_personas.py \
        --case-file docs/pearl-harbor-persona-dialogue-design.md \
        --slug pearl-harbor

API keys are read from the environment only. Do not hard-code secrets.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import textwrap
import urllib.error
import urllib.request
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


DEFAULT_MODEL = "deepseek-chat"
DEFAULT_BASE_URL = "https://api.deepseek.com"
DEFAULT_OUT_DIR = Path("tmp/persona-dialogue")
MIN_TOPICS_PER_PERSONA = 20


@dataclass
class CaseInput:
    title: str
    slug: str
    text: str


@dataclass
class GeneratorConfig:
    api_key_env: str = "DEEPSEEK_API_KEY"
    base_url: str = DEFAULT_BASE_URL
    model: str = DEFAULT_MODEL
    temperature: float = 0.35
    max_tokens: int = 16000


def slugify(value: str) -> str:
    slug = re.sub(r"[^\w\s-]", "", value, flags=re.UNICODE).strip().lower()
    slug = re.sub(r"\s+", "-", slug)
    return slug or f"case-{int(datetime.now(timezone.utc).timestamp())}"


def read_jsonl(file_path: Path) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    with file_path.open("r", encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if line:
                rows.append(json.loads(line))
    return rows


def load_benchmark_case(benchmark_file: Path, benchmark_id: str) -> CaseInput:
    rows = read_jsonl(benchmark_file)
    row = next((item for item in rows if item.get("id") == benchmark_id), None)
    if not row:
        raise ValueError(f'No benchmark row found for id "{benchmark_id}" in {benchmark_file}')

    materials = row.get("historical_materials") or []
    text_lines = [
        f"案例ID：{row.get('case_id', '')}",
        f"主题：{row.get('topic', '')}",
        f"问题：{row.get('question', '')}",
        "相关材料：",
    ]
    text_lines.extend(f"{index + 1}. {item}" for index, item in enumerate(materials))

    return CaseInput(
        title=str(row.get("topic") or row.get("id") or benchmark_id),
        slug=benchmark_id,
        text="\n".join(text_lines),
    )


def load_case_input(
    *,
    case_file: Path | None,
    case_text: str | None,
    benchmark_id: str | None,
    benchmark_file: Path,
    slug: str | None,
) -> CaseInput:
    if case_text:
        resolved_slug = slug or "direct-case"
        return CaseInput(title=resolved_slug, slug=resolved_slug, text=case_text)

    if benchmark_id:
        loaded = load_benchmark_case(benchmark_file, benchmark_id)
        return CaseInput(title=loaded.title, slug=slug or loaded.slug, text=loaded.text)

    if case_file:
        raw = case_file.read_text(encoding="utf-8")
        title = case_file.stem
        text = raw

        if case_file.suffix.lower() == ".json":
            data = json.loads(raw)
            title = str(data.get("title") or data.get("topic") or data.get("caseId") or title)
            text = json.dumps(data, ensure_ascii=False, indent=2)

        return CaseInput(title=title, slug=slug or slugify(title), text=text)

    raise ValueError("Please provide --case-file, --case-text, or --benchmark-id.")


def build_system_prompt() -> str:
    return textwrap.dedent(
        """\
        你是“全球历史透视镜”的历史人物对话设计师。你要根据给定历史案例，生成可用于产品人物对话模块的人物库。

        必须遵守：
        1. 输出必须是严格 JSON，不要 Markdown，不要代码块。
        2. 不得编造真实人物原话；如果是推断性表达，必须标注为“史实推断型”。
        3. 真实人物只能承担有公开史料、公开演说、回忆录、战史档案或主流研究可支撑的立场。
        4. 普通人、现场见证者、执行者、受影响群体可以设计为“复合经验型”虚构人物，但必须说明其代表的是群体经验。
        5. 争议观点、阴谋论、政治反对派解释必须放入“争议叙事型”人物，并明确“证据不足，需交叉验证”。
        6. 每个人物必须有清楚的知识边界：他/她在当时知道什么、不知道什么；如果进入战后回望，也要说明时间切换。
        7. 每个人物必须有至少 20 个可对话话题节点，能支撑 20 轮以上连续追问，不只是单轮问答。
        8. 每个话题节点的 replyContent 必须是该人物“直接说出口的话”，不得把背景设定、可信度边界、系统提示写进人物台词。
        9. narration 才能写背景设定、史实边界、可追问方向；这些内容会在前端以灰色小字旁白显示。
        10. 同一人物的不同话题节点不得复用同一句 replyContent；即使属于同一叙事轴，也必须改变切入角度、细节和情绪状态。
        11. 话题点要能互相接话，形成“现场经验 -> 决策逻辑 -> 政治动员 -> 争议解释 -> 国际影响 -> 社会后果 -> 战后记忆”的链条。
        12. 除非输入案例明确要求，否则不要生成以中国史、中国国内事件、中国国内地点为主体的独立人物、节点或路线；全球史案例中顺带提到中国，只能作为背景旁白，不得成为独立对话节点。

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
                      "replyContent": "人物直接说出口的回复，120-220字；必须符合人物身份、当时状态、知识边界和说话风格；不得写旁白或可信度边界",
                      "mood": "本节点情绪标签",
                      "emotionScore": 0,
                      "relatedTopics": ["可继续追问的话题id"],
                      "followUpQuestions": ["追问1", "追问2"],
                      "crossLinks": ["可接话的人物id或话题id"],
                      "narration": {
                        "background": "灰色小字旁白：本节点的历史背景或场景设定，60-120字",
                        "credibilityBoundary": "灰色小字旁白：此人物在该话题上的知识边界和证据边界",
                        "exchangeCue": "灰色小字旁白：可转向哪些人物或话题继续对话"
                      },
                      "credibilityNote": "这个话题的可信度说明，不得混入 replyContent"
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
        }
        """
    )


def build_user_prompt(case_input: CaseInput) -> str:
    return textwrap.dedent(
        f"""\
        请根据下面的历史案例生成人物对话设计。要求：
        - 人物数量建议 6-10 个。
        - 至少包含：史料人物、现场/群体复合人物、争议解释人物（如果案例存在明显争议）。
        - 每个人物至少 20 个话题节点，重要人物建议 22-26 个，确保能完成 20 轮以上连续对话。
        - 每个话题节点必须包含 replyContent、mood、emotionScore、keywords、relatedTopics、narration。
        - replyContent 只写人物台词；背景设定、可信度边界、证据提醒、可追问方向全部写入 narration。
        - 同一人物的 20+ 个 replyContent 不得复用同一段话，不得只替换少量词。
        - 每个人物必须标注可信度类型。
        - 设计一个 20-24 轮跨时空对话流程，rounds 要能覆盖主要人物和主要话题。
        - 不要生成以中国史、中国国内地点、中国国内事件为主体的独立节点，除非输入案例明确要求。
        - 语言使用中文，适合直接进入产品设计文档或后续转成前端数据。

        历史案例：
        {case_input.text}
        """
    )


def call_deepseek(config: GeneratorConfig, system_prompt: str, user_prompt: str) -> str:
    api_key = os.environ.get(config.api_key_env)
    if not api_key:
        raise RuntimeError(
            f"Missing {config.api_key_env}. Set it in your shell before running this script."
        )

    url = f"{config.base_url.rstrip('/')}/v1/chat/completions"
    payload = {
        "model": config.model,
        "temperature": config.temperature,
        "max_tokens": config.max_tokens,
        "response_format": {"type": "json_object"},
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
    }

    request = urllib.request.Request(
        url,
        data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=120) as response:
            body = response.read().decode("utf-8")
    except urllib.error.HTTPError as error:
        detail = error.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"DeepSeek API error {error.code}: {detail[:500]}") from error

    data = json.loads(body)
    content = data.get("choices", [{}])[0].get("message", {}).get("content")
    if not content:
        raise RuntimeError("DeepSeek response did not include message content.")
    return str(content)


def parse_model_json(raw: str) -> dict[str, Any]:
    text = raw.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text, flags=re.IGNORECASE)
        text = re.sub(r"\s*```$", "", text)
    return json.loads(text)


def normalize_reply(value: str) -> str:
    return re.sub(r"\s+", "", value.strip())


def validate_dialogue_backend(data: dict[str, Any]) -> None:
    errors: list[str] = []
    persona_groups = data.get("personaGroups") or []

    for group in persona_groups:
        for persona in group.get("personas") or []:
            persona_name = persona.get("name") or persona.get("id") or "未命名人物"
            topics = persona.get("topics") or []
            if len(topics) < MIN_TOPICS_PER_PERSONA:
                errors.append(f"{persona_name} 只有 {len(topics)} 个话题节点，少于 {MIN_TOPICS_PER_PERSONA} 个。")

            seen_replies: dict[str, str] = {}
            for topic in topics:
                topic_id = str(topic.get("id") or topic.get("title") or "未命名话题")
                reply = str(topic.get("replyContent") or "").strip()
                narration = topic.get("narration") or {}

                if not reply:
                    errors.append(f"{persona_name}/{topic_id} 缺少 replyContent。")
                if "可信度边界" in reply or "灰色小字" in reply or "旁白" in reply:
                    errors.append(f"{persona_name}/{topic_id} 把旁白或可信度边界混入了人物台词。")
                if not narration.get("background") or not narration.get("credibilityBoundary"):
                    errors.append(f"{persona_name}/{topic_id} 缺少 narration.background 或 narration.credibilityBoundary。")

                normalized = normalize_reply(reply)
                if normalized:
                    previous_topic = seen_replies.get(normalized)
                    if previous_topic:
                        errors.append(f"{persona_name} 的 {previous_topic} 和 {topic_id} 使用了重复 replyContent。")
                    else:
                        seen_replies[normalized] = topic_id

    if errors:
        joined = "\n- ".join(errors)
        raise ValueError(f"Generated persona dialogue backend failed validation:\n- {joined}")


def render_markdown(data: dict[str, Any]) -> str:
    lines: list[str] = []
    case = data.get("case") or {}
    lines.extend([f"# {case.get('title') or '历史人物对话设计'}", ""])

    if case.get("summary"):
        lines.extend([str(case["summary"]), ""])

    lines.extend(
        [
            "## 案例信息",
            "",
            f"- 时间范围：{case.get('timeRange', '')}",
            f"- 区域：{case.get('region', '')}",
            f"- 核心矛盾：{'；'.join(case.get('coreTensions') or [])}",
            f"- 史料锚点：{'；'.join(case.get('sourceAnchors') or [])}",
            "",
        ]
    )

    for group in data.get("personaGroups") or []:
        lines.extend([f"## {group.get('groupName', '')}", ""])
        if group.get("purpose"):
            lines.extend([str(group["purpose"]), ""])

        for persona in group.get("personas") or []:
            emotion = persona.get("emotion") or {}
            lines.extend(
                [
                    f"### {persona.get('name', '')}",
                    "",
                    f"- 人物ID：{persona.get('id', '')}",
                    f"- 真实人物：{'是' if persona.get('isRealPerson') else '否'}",
                    f"- 可信度类型：{persona.get('credibilityType', '')}",
                    f"- 史料/依据：{persona.get('evidenceBasis', '')}",
                    f"- 身份：{persona.get('identity', '')}",
                    f"- 时间锚点：{persona.get('timeAnchor', '')}",
                    f"- 地点：{persona.get('location', '')}",
                    f"- 情绪：{emotion.get('baseline', '')}（{emotion.get('score', '')}/100）",
                    f"- 内心冲突：{emotion.get('innerConflict', '')}",
                    f"- 说话风格：{persona.get('voiceStyle', '')}",
                    f"- 知识边界：{persona.get('knowledgeBoundary', '')}",
                    "",
                    "**人物背景**",
                    "",
                    str(persona.get("background", "")),
                    "",
                    "**人物立场**",
                    "",
                    str(persona.get("stance", "")),
                    "",
                    "**话题点**",
                    "",
                ]
            )
            for topic in persona.get("topics") or []:
                narration = topic.get("narration") or {}
                reply_content = topic.get("replyContent") or topic.get("contentSeed", "")
                lines.append(f"- {topic.get('title', '')}")
                if topic.get("mood") or topic.get("emotionScore") is not None:
                    lines.append(
                        f"  情绪：{topic.get('mood', '')}（{topic.get('emotionScore', '')}/100）"
                    )
                lines.append(f"  人物台词：{reply_content}")
                if narration.get("background"):
                    lines.append(f"  旁白背景：{narration['background']}")
                if narration.get("credibilityBoundary"):
                    lines.append(f"  可信度边界：{narration['credibilityBoundary']}")
                if narration.get("exchangeCue"):
                    lines.append(f"  对话线索：{narration['exchangeCue']}")
                if topic.get("credibilityNote"):
                    lines.append(f"  可信度说明：{topic['credibilityNote']}")
                if topic.get("followUpQuestions"):
                    lines.append(f"  可追问：{'；'.join(topic['followUpQuestions'])}")
            lines.extend(["", "**未来设想**", ""])
            for item in persona.get("futureArc") or []:
                lines.append(f"- {item}")
            lines.append("")

            sample_lines = persona.get("sampleLines") or []
            if sample_lines:
                lines.extend(["**示例台词**", ""])
                for sample in sample_lines:
                    lines.extend([f"> {sample}", ""])

    plan = data.get("crossTimeDialoguePlan") or {}
    rounds = plan.get("rounds") or []
    if rounds:
        lines.extend(["## 跨时空对话流程", "", f"建议轮数：{plan.get('roundCount') or len(rounds)}", ""])
        for item in rounds:
            lines.extend(
                [
                    f"### 第{item.get('round')}轮：{item.get('title', '')}",
                    "",
                    f"- 出场人物：{'、'.join(item.get('speakerIds') or [])}",
                    f"- 用户问题：{item.get('userPrompt', '')}",
                    f"- 叙事功能：{item.get('dialogueFunction', '')}",
                    f"- 时间模式：{item.get('timeMode', '')}",
                ]
            )
            if item.get("credibilityReminder"):
                lines.append(f"- 可信度提示：{item['credibilityReminder']}")
            lines.append("")

    if data.get("guardrails"):
        lines.extend(["## 史实与安全边界", ""])
        for item in data["guardrails"]:
            lines.append(f"- {item}")
        lines.append("")

    if data.get("implementationNotes"):
        lines.extend(["## 产品落地建议", ""])
        for item in data["implementationNotes"]:
            lines.append(f"- {item}")
        lines.append("")

    return re.sub(r"\n{3,}", "\n\n", "\n".join(lines)).rstrip() + "\n"


def generate_persona_dialogue(
    case_input: CaseInput,
    config: GeneratorConfig,
) -> dict[str, Any]:
    system_prompt = build_system_prompt()
    user_prompt = build_user_prompt(case_input)
    raw = call_deepseek(config, system_prompt, user_prompt)
    data = parse_model_json(raw)
    validate_dialogue_backend(data)
    data["meta"] = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "model": config.model,
        "baseUrl": config.base_url,
        "inputTitle": case_input.title,
    }
    return data


def write_outputs(data: dict[str, Any], out_dir: Path, slug: str) -> dict[str, Path]:
    out_dir.mkdir(parents=True, exist_ok=True)
    json_path = out_dir / f"{slug}.personas.json"
    md_path = out_dir / f"{slug}.personas.md"
    json_path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    md_path.write_text(render_markdown(data), encoding="utf-8")
    return {"jsonPath": json_path, "mdPath": md_path}


def write_dry_run_prompt(case_input: CaseInput, out_dir: Path, slug: str) -> Path:
    out_dir.mkdir(parents=True, exist_ok=True)
    prompt_path = out_dir / f"{slug}.prompt.txt"
    prompt_path.write_text(
        f"SYSTEM:\n{build_system_prompt()}\n\n---\n\nUSER:\n{build_user_prompt(case_input)}",
        encoding="utf-8",
    )
    return prompt_path


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Generate historical dialogue personas from a case with DeepSeek."
    )
    input_group = parser.add_mutually_exclusive_group(required=True)
    input_group.add_argument("--case-file", type=Path, help="Read a Markdown, TXT, or JSON case file.")
    input_group.add_argument("--case-text", help="Use direct case text from the command line.")
    input_group.add_argument("--benchmark-id", help="Read one row from a JSONL benchmark file.")

    parser.add_argument(
        "--benchmark-file",
        type=Path,
        default=Path("eval/case_theme_benchmark_queries.jsonl"),
        help="JSONL benchmark file.",
    )
    parser.add_argument("--slug", help="Output filename prefix. Default: derived from input.")
    parser.add_argument("--out-dir", type=Path, default=DEFAULT_OUT_DIR, help="Output directory.")
    parser.add_argument("--api-key-env", default="DEEPSEEK_API_KEY", help="Environment variable for API key.")
    parser.add_argument(
        "--base-url",
        default=os.environ.get("DEEPSEEK_BASE_URL", DEFAULT_BASE_URL),
        help="DeepSeek-compatible base URL.",
    )
    parser.add_argument(
        "--model",
        default=os.environ.get("DEEPSEEK_MODEL", DEFAULT_MODEL),
        help="Model name.",
    )
    parser.add_argument("--temperature", type=float, default=0.35)
    parser.add_argument("--max-tokens", type=int, default=8000)
    parser.add_argument("--dry-run", action="store_true", help="Write prompt to disk without calling API.")
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)

    case_input = load_case_input(
        case_file=args.case_file,
        case_text=args.case_text,
        benchmark_id=args.benchmark_id,
        benchmark_file=args.benchmark_file,
        slug=args.slug,
    )
    slug = args.slug or case_input.slug

    if args.dry_run:
        prompt_path = write_dry_run_prompt(case_input, args.out_dir, slug)
        print(json.dumps({"mode": "dry-run", "promptPath": str(prompt_path)}, ensure_ascii=False, indent=2))
        return 0

    config = GeneratorConfig(
        api_key_env=args.api_key_env,
        base_url=args.base_url,
        model=args.model,
        temperature=args.temperature,
        max_tokens=args.max_tokens,
    )
    data = generate_persona_dialogue(case_input, config)
    outputs = write_outputs(data, args.out_dir, slug)
    persona_count = sum(len(group.get("personas") or []) for group in data.get("personaGroups") or [])
    result = {
        "jsonPath": str(outputs["jsonPath"]),
        "mdPath": str(outputs["mdPath"]),
        "personaGroups": len(data.get("personaGroups") or []),
        "personas": persona_count,
        "rounds": len((data.get("crossTimeDialoguePlan") or {}).get("rounds") or []),
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as error:
        print(str(error), file=sys.stderr)
        raise SystemExit(1)
