import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, CalendarDays, FolderOpen } from "lucide-react";

import { CmsUnavailable } from "@/components/site/cms-unavailable";
import { TokenGate } from "@/components/site/token-gate";
import { PageHeading } from "@/components/site/page-heading";
import { getPublicPortfolio, type Project } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "代表專案",
  description: "CMS 代表專案資料，包含角色、技術標籤與項目狀態。",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const payload = await getPublicPortfolio(token);
  if (payload.state === "database-unavailable") return <CmsUnavailable />;
  if (payload.state === "token-required") return <TokenGate />;
  if (payload.state !== "ready") notFound();

  const { projects } = payload.portfolio;
  const activeCount = projects.filter(
    (project) => project.status === "ACTIVE"
  ).length;
  const doneCount = projects.length - activeCount;

  return (
    <div className="px-5 py-14 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <PageHeading
          eyebrow="Projects"
          title="代表專案"
          description="完整展示專案名稱、角色、時段、狀態與技術標籤。"
        />

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Summary label="全部專案" value={projects.length} />
          <Summary label="進行中" value={activeCount} />
          <Summary label="已結束" value={doneCount} />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="mt-2 text-4xl font-semibold">{value}</p>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-lg border border-neutral-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(26,25,24,0.12)]">
      <span
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: project.accentColor }}
      />
      <div className="flex items-start justify-between gap-4">
        <div
          className="flex size-12 items-center justify-center rounded-md text-white"
          style={{ backgroundColor: project.accentColor }}
        >
          <FolderOpen className="size-5" />
        </div>
        <span
          className="rounded-md px-2.5 py-1 text-xs font-medium"
          style={{
            backgroundColor: `${project.accentColor}1f`,
            color: project.accentColor,
          }}
        >
          {project.status === "ACTIVE" ? "進行中" : "已結束"}
        </span>
      </div>

      <div className="mt-7">
        <h2 className="text-2xl font-semibold">{project.name}</h2>
        <p className="mt-3 text-sm leading-7 text-neutral-600">
          {project.description}
        </p>
      </div>

      <div className="mt-6 grid gap-3 text-sm text-neutral-600 sm:grid-cols-2">
        <div className="rounded-lg bg-[#fbfaf7] p-4">
          <p className="text-xs text-neutral-500">角色</p>
          <p className="mt-2 font-medium text-neutral-950">{project.role}</p>
        </div>
        <div className="rounded-lg bg-[#fbfaf7] p-4">
          <p className="text-xs text-neutral-500">狀態</p>
          <p className="mt-2 inline-flex items-center gap-2 font-medium text-neutral-950">
            {project.status === "ACTIVE" ? "進行中" : "已結束"}
            <ArrowUpRight className="size-4 text-emerald-700" />
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm text-neutral-500">
        <CalendarDays className="size-4" />
        {project.period}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-neutral-950 px-3 py-1.5 text-sm font-medium text-white"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
