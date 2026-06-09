import type { CSSProperties } from "react";

import { cn } from "@workspace/ui/lib/utils";

const sparkles = [
  { top: "12%", left: "14%", size: 3, delay: "0s" },
  { top: "24%", left: "78%", size: 4, delay: "0.4s" },
  { top: "36%", left: "54%", size: 2, delay: "0.9s" },
  { top: "58%", left: "17%", size: 4, delay: "1.2s" },
  { top: "70%", left: "66%", size: 3, delay: "1.6s" },
  { top: "82%", left: "37%", size: 2, delay: "2s" },
  { top: "18%", left: "42%", size: 2, delay: "2.4s" },
  { top: "64%", left: "86%", size: 3, delay: "2.8s" },
];

export function Sparkles({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("absolute inset-0", className)}>
      {sparkles.map((sparkle) => (
        <span
          key={`${sparkle.top}-${sparkle.left}`}
          className="absolute rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.65)] [animation:cv-sparkle_3s_ease-in-out_infinite]"
          style={
            {
              top: sparkle.top,
              left: sparkle.left,
              width: sparkle.size,
              height: sparkle.size,
              animationDelay: sparkle.delay,
            } satisfies CSSProperties
          }
        />
      ))}
    </div>
  );
}
