import type { ReactNode } from "react";

export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-normal text-emerald-700">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-normal text-neutral-950 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-base leading-7 text-neutral-600">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}
