import type { ReactNode } from "react";

import { cn } from "@workspace/ui/lib/utils";

export function HoverBorderGradientLink({
  className,
  children,
  href,
  target,
  rel,
}: {
  className?: string;
  children: ReactNode;
  href: string;
  target?: string;
  rel?: string;
}) {
  return (
    <a
      className={cn(
        "group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md p-px text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-emerald-500/60",
        className
      )}
      href={href}
      rel={rel}
      target={target}
    >
      <span className="absolute aspect-square w-[180%] bg-[conic-gradient(from_0deg,transparent_0deg,#3D8A5A_70deg,#4F8AAB_150deg,#D58A6A_230deg,transparent_320deg)] opacity-80 transition duration-500 group-hover:opacity-100 [animation:cv-border-spin_5s_linear_infinite]" />
      <span className="relative inline-flex h-full w-full items-center justify-center gap-2 rounded-[7px] bg-neutral-950 px-4 text-white transition group-hover:bg-neutral-900">
        {children}
      </span>
    </a>
  );
}
