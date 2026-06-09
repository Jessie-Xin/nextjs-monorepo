import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Boxes, Star } from "lucide-react";

import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { CmsUnavailable } from "@/components/site/cms-unavailable";
import { TokenGate } from "@/components/site/token-gate";
import { PageHeading } from "@/components/site/page-heading";
import { getPublicPortfolio, type SkillCategory } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "技能",
  description: "CMS 技能分類與技能標籤。",
};

export const dynamic = "force-dynamic";

export default async function SkillsPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const payload = await getPublicPortfolio(token);
  if (payload.state === "database-unavailable") return <CmsUnavailable />;
  if (payload.state === "token-required") return <TokenGate />;
  if (payload.state !== "ready") notFound();

  const { skillCategories } = payload.portfolio;
  const totalSkills = skillCategories.reduce(
    (total, category) => total + category.skills.length,
    0
  );

  return (
    <>
      <section className="relative overflow-hidden bg-neutral-950 px-5 py-14 text-white sm:px-8 lg:py-20">
        <BackgroundBeams className="opacity-45" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-normal text-emerald-300">
                Skills
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-normal sm:text-5xl">
                技能分類
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/62">
                依分類呈現目前履歷中的技能標籤。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <Metric label="分類" value={skillCategories.length} />
              <Metric label="技能" value={totalSkills} />
              {skillCategories.slice(0, 2).map((category) => (
                <Metric
                  key={category.name}
                  label={category.name}
                  value={category.skills.length}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <PageHeading
            eyebrow="Skill tags"
            title="技能標籤"
            description="每個分類使用資料中的色票，便於快速辨識能力範圍。"
          />
          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {skillCategories.map((category) => (
              <SkillCategoryCard key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <p className="text-xs text-white/45">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  );
}

function SkillCategoryCard({ category }: { category: SkillCategory }) {
  return (
    <article className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="flex size-12 items-center justify-center rounded-md"
            style={{ backgroundColor: `${category.color}22` }}
          >
            <Star className="size-5" style={{ color: category.color }} />
          </span>
          <div>
            <h2 className="text-xl font-semibold">{category.name}</h2>
            <p className="mt-1 text-sm text-neutral-500">
              {category.skills.length} 項技能
            </p>
          </div>
        </div>
        <Boxes className="size-5 text-neutral-400" />
      </div>

      <div className="mt-7 flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-md border px-3 py-2 text-sm font-medium"
            style={{
              borderColor: `${category.color}55`,
              backgroundColor: `${category.color}12`,
              color: category.color,
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}
