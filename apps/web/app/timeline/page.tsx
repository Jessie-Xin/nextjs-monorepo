import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarClock, Clock3 } from "lucide-react";

import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { CmsUnavailable } from "@/components/site/cms-unavailable";
import { TokenGate } from "@/components/site/token-gate";
import { PageHeading } from "@/components/site/page-heading";
import { getPublicPortfolio } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "時間線",
  description: "CMS 代表項目的里程碑時間線。",
};

export const dynamic = "force-dynamic";

export default async function TimelinePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const payload = await getPublicPortfolio(token);
  if (payload.state === "database-unavailable") return <CmsUnavailable />;
  if (payload.state === "token-required") return <TokenGate />;
  if (payload.state !== "ready") notFound();

  const { milestones } = payload.portfolio;

  return (
    <>
      <section className="relative overflow-hidden bg-neutral-950 px-5 py-14 text-white sm:px-8 lg:py-20">
        <BackgroundBeams className="opacity-45" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-normal text-emerald-300">
              Timeline
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal sm:text-5xl">
              項目里程碑
            </h1>
            <p className="mt-4 text-base leading-7 text-white/62">
              依時間呈現產品立項、上線與交付節點。
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <PageHeading
            eyebrow="Milestones"
            title="里程碑資料"
            description="每個節點包含日期、標題與交付描述。"
          />

          <div className="mt-10 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <ol className="relative ml-3 space-y-7 border-l border-neutral-300">
              {milestones.map((milestone, index) => (
                <li key={milestone.id} className="ml-7">
                  <span
                    className="absolute -left-2 flex size-4 items-center justify-center rounded-full ring-4 ring-white"
                    style={{ backgroundColor: milestone.color }}
                  />
                  <article className="rounded-lg border border-neutral-200 bg-[#fbfaf7] p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500">
                          <CalendarClock className="size-4" />
                          {milestone.date}
                        </p>
                        <h2 className="mt-3 text-xl font-semibold">
                          {milestone.title}
                        </h2>
                        {milestone.projectName && (
                          <p className="mt-2 text-sm text-neutral-500">
                            {milestone.projectName}
                          </p>
                        )}
                      </div>
                      <span
                        className="inline-flex w-fit items-center gap-2 rounded-md px-2.5 py-1 text-xs font-medium"
                        style={{
                          backgroundColor: `${milestone.color}1f`,
                          color: milestone.color,
                        }}
                      >
                        <Clock3 className="size-3.5" />
                        節點 {index + 1}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-neutral-600">
                      {milestone.description}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
