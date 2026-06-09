import type { CSSProperties } from "react";

import { cn } from "@workspace/ui/lib/utils";

const beams = [
  { left: "8%", delay: "0s", duration: "8s", tone: "via-emerald-300/70" },
  { left: "23%", delay: "1.2s", duration: "9s", tone: "via-sky-300/55" },
  { left: "41%", delay: "2.3s", duration: "7.5s", tone: "via-amber-300/55" },
  { left: "68%", delay: "0.7s", duration: "8.5s", tone: "via-rose-300/45" },
  { left: "84%", delay: "1.9s", duration: "10s", tone: "via-emerald-200/60" },
];

export function BackgroundBeams({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      {beams.map((beam) => (
        <span
          key={`${beam.left}-${beam.delay}`}
          className={cn(
            "absolute top-0 h-56 w-px bg-gradient-to-b from-transparent to-transparent blur-[1px] [animation-name:cv-beam] [animation-iteration-count:infinite] [animation-timing-function:linear]",
            beam.tone
          )}
          style={
            {
              left: beam.left,
              animationDelay: beam.delay,
              animationDuration: beam.duration,
            } satisfies CSSProperties
          }
        />
      ))}
    </div>
  );
}
