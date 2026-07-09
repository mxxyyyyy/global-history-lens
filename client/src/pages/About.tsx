import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { getImagePath } from "@/lib/utils";
import {
  ArrowRight,
  BookOpenCheck,
  Building2,
  Compass,
  GraduationCap,
  Landmark,
  Mail,
  MapPinned,
  ScrollText,
  Sparkles,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

const CONTACT_EMAIL = "mxxyyyyy@gmail.com";

export default function About() {
  const { t } = useLanguage();
  const heroImage = getImagePath("/images/hero-bg.jpg");
  const mapImage = getImagePath("/images/map-bg.jpg");
  const archiveTexture = getImagePath("/images/archive-texture.jpg");

  const visionCards = [
    {
      icon: Compass,
      label: "VISION 01",
      title: t("让历史被多角度看见", "Make history visible from many angles"),
      body: t(
        "围绕同一事件并列呈现不同国家、群体与亲历者的叙述差异，帮助用户理解“分歧从何而来”。",
        "Place different national, social, and lived narratives side by side so users can understand where disagreement begins.",
      ),
    },
    {
      icon: ScrollText,
      label: "VISION 02",
      title: t("让 AI 回到证据链上", "Anchor AI in evidence"),
      body: t(
        "AI 生成内容关联史料来源、背景语境与可信度提示，避免让模型变成无出处的权威口吻。",
        "Connect generated explanations with sources, context, and credibility cues instead of presenting AI as an unsourced authority.",
      ),
    },
    {
      icon: MapPinned,
      label: "VISION 03",
      title: t("让历史走向真实场景", "Bring history into real places"),
      body: t(
        "把历史专题转化为城市路线、博物馆节点和研学任务，让知识在空间中被重新感知。",
        "Turn historical topics into city routes, museum stops, and inquiry tasks that make knowledge spatial and experiential.",
      ),
    },
  ];

  const partnerCards = [
    {
      icon: GraduationCap,
      title: t("学术与课题支持", "Academic and Program Support"),
      body: t(
        "依托吉林大学相关学科资源与研究生创新研究计划支持体系，推进项目研究与应用验证。",
        "Supported by Jilin University's academic resources and graduate innovation programs for research and applied validation.",
      ),
    },
    {
      icon: BookOpenCheck,
      title: t("教育与研学机构", "Education and Study Travel"),
      body: t(
        "面向高校、中小学、研学课程团队，共同开发多视角历史课程、探究任务与课堂活动。",
        "Collaborate with universities, schools, and study travel teams to build multi-perspective history courses and inquiry tasks.",
      ),
    },
    {
      icon: Landmark,
      title: t("文博与地方文旅", "Museums and Cultural Tourism"),
      body: t(
        "与博物馆、纪念馆、档案馆、地方文旅单位共建历史主题路线、展陈内容和城市文化传播产品。",
        "Co-create historical routes, exhibition content, and city storytelling products with museums, archives, memorials, and tourism partners.",
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative min-h-[76vh] overflow-hidden border-b-2 border-border">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="h-full w-full object-cover grayscale contrast-125" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(240,230,210,0.96)_0%,rgba(240,230,210,0.78)_48%,rgba(240,230,210,0.28)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(42,42,42,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(42,42,42,0.12)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />
        </div>

        <div className="container relative z-10 flex min-h-[76vh] items-end py-16 md:py-24">
          <div className="max-w-5xl">
            <div className="inline-flex border-2 border-border bg-background px-3 py-1 font-mono text-xs font-black uppercase tracking-widest text-destructive shadow-brutal-sm">
              AI + Global History + Public Education
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.92] tracking-tight md:text-7xl lg:text-8xl">
              {t("全球历史透视镜", "Global History Lens")}
            </h1>
            <p className="mt-8 max-w-3xl border-l-4 border-destructive pl-5 text-xl leading-relaxed text-foreground/82 md:text-2xl">
              {t(
                "一个基于大语言模型的全球多视角历史研学平台。我们把多语种史料、跨国叙事比较、历史人物数字分身和主题研学路线连接起来，让用户在证据中理解历史，在比较中形成判断。",
                "A large-language-model powered platform for global, multi-perspective history learning. It connects multilingual sources, narrative comparison, historical personas, and themed study routes so users can understand history through evidence and comparison.",
              )}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#vision">
                <Button size="lg" className="h-14 rounded-none border-2 border-primary font-mono font-bold shadow-brutal">
                  {t("查看项目愿景", "View Vision")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-none border-2 border-primary bg-background font-mono font-bold shadow-brutal-sm"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  {t("联系项目组", "Contact Project")}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <SectionHeading
        id="vision"
        index="01 / Vision"
        title={t("项目愿景", "Project Vision")}
        note={t(
          "从单一叙事走向多视角理解，从静态文本走向可追溯、可比较、可体验的历史认知系统。",
          "From single narratives to multi-perspective understanding; from static text to traceable, comparable, and experiential historical cognition.",
        )}
      />

      <section className="border-b-2 border-border py-16 md:py-20">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.45fr)]">
            <div className="border-2 border-border bg-card p-7 shadow-brutal md:p-11">
              <p className="text-2xl leading-relaxed md:text-3xl">
                {t(
                  "全球历史透视镜希望成为面向教育、研究与公共文化传播的数字人文平台：用 AI 帮助用户并列观察不同国家、文明和个体对同一历史事件的理解差异，让历史学习不止于记忆结论，而能回到证据、语境和人的选择之中。",
                  "Global History Lens aims to become a digital humanities platform for education, research, and public culture: using AI to help users compare how different nations, civilizations, and individuals interpret the same event, returning history learning to evidence, context, and human choice.",
                )}
              </p>
            </div>
            <div className="grid gap-4 font-mono">
              {[
                [t("多视角", "Multi-perspective"), t("跨国家、跨群体、跨意识形态比较", "Cross-national, social, and ideological comparison")],
                [t("可追溯", "Traceable"), t("AI 内容关联史料来源与可信度提示", "AI content tied to sources and credibility cues")],
                [t("可体验", "Experiential"), t("连接课堂、展厅、城市与研学路线", "Connecting classrooms, exhibitions, cities, and routes")],
              ].map(([title, body]) => (
                <div key={title} className="border-2 border-border bg-card/80 p-5">
                  <strong className="block text-2xl text-chart-3">{title}</strong>
                  <span className="text-sm text-muted-foreground">{body}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {visionCards.map((card) => (
              <article key={card.label} className="border-2 border-border bg-card p-6 shadow-brutal-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs font-black text-destructive">{card.label}</span>
                  <card.icon className="h-7 w-7 text-chart-3" />
                </div>
                <h3 className="mt-6 text-2xl font-black leading-tight">{card.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-border py-16 md:py-20">
        <div className="container grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(280px,0.52fr)]">
          <div className="min-h-[360px] border-2 border-border bg-secondary">
            <img
              src={mapImage}
              alt={t("历史地图与研学路线示意", "Historical map and route preview")}
              className="h-full w-full object-cover grayscale-[45%] contrast-110"
            />
          </div>
          <div className="self-center border-l-8 border-chart-3 pl-6">
            <span className="font-mono text-xs font-black uppercase tracking-widest text-destructive">Product Direction</span>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
              {t("从历史问题到研学体验", "From historical questions to study experiences")}
            </h2>
            <p className="mt-5 text-muted-foreground">
              {t(
                "平台不是只回答“发生了什么”，而是继续追问“不同人为什么这样解释”。这套表达适合展示给学校、文博机构和文旅合作方：既有学术严谨性，也能转化为可体验的文化产品。",
                "The platform does more than answer what happened. It asks why different people explain events differently, making the project legible to schools, cultural institutions, and tourism partners.",
              )}
            </p>
          </div>
        </div>
      </section>

      <SectionHeading
        id="partners"
        index="02 / Partners"
        title={t("合作伙伴", "Partners")}
        note={t(
          "将“已有学术支持”和“期待合作方向”分开表达，避免把潜在合作误写成已确定合作。",
          "The page separates current academic support from prospective cooperation directions.",
        )}
      />

      <section className="border-b-2 border-border py-16 md:py-20">
        <div className="container grid gap-5 md:grid-cols-3">
          {partnerCards.map((partner) => (
            <article key={partner.title} className="min-h-48 border-2 border-border bg-card p-6 shadow-brutal-sm">
              <partner.icon className="h-9 w-9 text-chart-3" />
              <h3 className="mt-6 text-2xl font-black leading-tight text-chart-3">{partner.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{partner.body}</p>
            </article>
          ))}
        </div>
      </section>

      <SectionHeading
        id="contact"
        index="03 / Contact"
        title={t("联系我们", "Contact")}
        note={t(
          "适合承接项目演示、课程共建、文旅合作、文博合作、媒体采访和技术交流。",
          "For demos, course collaboration, cultural tourism, museum partnerships, media inquiries, and technical exchange.",
        )}
      />

      <section className="border-b-2 border-border py-16 md:py-20">
        <div className="container grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(310px,0.5fr)]">
          <div className="border-2 border-border bg-card p-7 shadow-brutal-sm">
            <h3 className="text-3xl font-black">{t("合作意向", "Cooperation Inquiry")}</h3>
            <p className="mt-4 text-muted-foreground">
              {t(
                "如果你关注历史教育、跨文化理解、数字人文或文化旅游创新，欢迎与我们联系。",
                "If you care about history education, cross-cultural understanding, digital humanities, or cultural tourism innovation, we would love to hear from you.",
              )}
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("全球历史透视镜合作咨询")}`}>
                <Button className="h-12 rounded-none border-2 border-primary font-mono font-bold shadow-brutal">
                  <Mail className="mr-2 h-5 w-5" />
                  {t("发送邮件", "Send Email")}
                </Button>
              </a>
              <a href="/dialogue">
                <Button
                  variant="outline"
                  className="h-12 rounded-none border-2 border-primary bg-background font-mono font-bold shadow-brutal-sm"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  {t("体验 AI 对话", "Try AI Dialogue")}
                </Button>
              </a>
            </div>
          </div>

          <aside className="relative overflow-hidden border-2 border-border bg-card p-7 shadow-brutal-sm">
            <img src={archiveTexture} alt="" className="absolute inset-0 h-full w-full object-cover opacity-10" />
            <div className="relative">
              <h3 className="text-2xl font-black">{t("公开联系信息", "Contact Information")}</h3>
              <div className="mt-6 grid gap-5">
                <ContactItem icon={Mail} label="Email" value={CONTACT_EMAIL} href={`mailto:${CONTACT_EMAIL}`} />
                <ContactItem icon={UsersRound} label={t("项目组", "Project")} value={t("全球历史透视镜项目组", "Global History Lens Project")} />
                <ContactItem icon={Building2} label="Location" value={t("吉林大学", "Jilin University")} />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-primary py-12 text-primary-foreground">
        <div className="container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <strong className="max-w-2xl text-3xl font-black leading-tight md:text-4xl">
            {t("让历史从单一叙事中走出来。", "Let history step out of single narratives.")}
          </strong>
          <a href="#vision">
            <Button variant="secondary" className="rounded-none border-2 border-primary-foreground font-mono font-bold">
              {t("回看愿景", "Review Vision")}
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({
  id,
  index,
  title,
  note,
}: {
  id: string;
  index: string;
  title: string;
  note: string;
}) {
  return (
    <section id={id} className="border-b-2 border-border py-14 md:py-16 scroll-mt-20">
      <div className="container grid gap-8 border-b-2 border-border pb-8 md:grid-cols-[minmax(0,0.8fr)_minmax(260px,0.4fr)] md:items-end">
        <div>
          <span className="font-mono text-xs font-black uppercase tracking-widest text-destructive">{index}</span>
          <h2 className="mt-3 text-4xl font-black leading-tight md:text-6xl">{title}</h2>
        </div>
        <p className="text-muted-foreground">{note}</p>
      </div>
    </section>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3 border-l-4 border-destructive pl-4">
      <Icon className="mt-1 h-5 w-5 shrink-0 text-destructive" />
      <div>
        <strong className="block font-mono text-xs uppercase tracking-widest">{label}</strong>
        <span className="break-words text-sm text-muted-foreground">{value}</span>
      </div>
    </div>
  );

  return href ? <a href={href}>{content}</a> : content;
}
