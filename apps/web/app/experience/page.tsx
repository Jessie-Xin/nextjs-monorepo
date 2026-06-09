import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Award, BriefcaseBusiness, GraduationCap } from "lucide-react";

import { CmsUnavailable } from "@/components/site/cms-unavailable";
import { TokenGate } from "@/components/site/token-gate";
import { PageHeading } from "@/components/site/page-heading";
import { getPublicPortfolio, type Experience } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "經歷",
  description: "CMS 工作、教育與認證經歷。",
};

export const dynamic = "force-dynamic";

const typeMeta = {
  WORK: {
    label: "工作",
    Icon: BriefcaseBusiness,
    tone: "bg-[#F5E5D8] text-[#A65D3A]",
  },
  EDUCATION: {
    label: "教育",
    Icon: GraduationCap,
    tone: "bg-[#DDECE2] text-[#2E7047]",
  },
  CERTIFICATION: {
    label: "認證",
    Icon: Award,
    tone: "bg-[#E1ECF4] text-[#326982]",
  },
};

export default async function ExperiencePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const payload = await getPublicPortfolio(token);
  if (payload.state === "database-unavailable") return <CmsUnavailable />;
  if (payload.state === "token-required") return <TokenGate />;
  if (payload.state !== "ready") notFound();

  const { experiences } = payload.portfolio;

  return (
    <div className="px-5 py-14 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <PageHeading
          eyebrow="Experience"
          title="工作、教育與認證"
          description="依時間展示履歷中的經歷資料。"
        />

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Summary
            label="工作"
            value={countByType(experiences, "WORK")}
            className="bg-[#F5E5D8] text-[#A65D3A]"
          />
          <Summary
            label="教育"
            value={countByType(experiences, "EDUCATION")}
            className="bg-[#DDECE2] text-[#2E7047]"
          />
          <Summary
            label="認證"
            value={countByType(experiences, "CERTIFICATION")}
            className="bg-[#E1ECF4] text-[#326982]"
          />
        </div>

        <div className="mt-6 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="space-y-4">
            {experiences.map((item) => (
              <ExperienceItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function countByType(items: Experience[], type: Experience["type"]) {
  return items.filter((item) => item.type === type).length;
}

function Summary({
  label,
  value,
  className,
}: {
  label: string;
  value: number;
  className: string;
}) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
      <span
        className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium ${className}`}
      >
        {label}
      </span>
      <p className="mt-4 text-4xl font-semibold">{value}</p>
    </div>
  );
}

function ExperienceItem({ item }: { item: Experience }) {
  const meta = typeMeta[item.type];

  return (
    <article className="grid grid-cols-1 gap-4 rounded-lg border border-neutral-200 bg-[#fbfaf7] p-5 md:grid-cols-[180px_1fr]">
      <div>
        <span
          className={`inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-xs font-medium ${meta.tone}`}
        >
          <meta.Icon className="size-3.5" />
          {meta.label}
        </span>
        <p className="mt-4 text-sm text-neutral-500">{item.period}</p>
      </div>

      <div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <span className="text-sm text-neutral-500">{item.organization}</span>
        </div>
        <p className="mt-3 text-sm leading-7 text-neutral-600">
          {item.description}
        </p>
      </div>
    </article>
  );
}
