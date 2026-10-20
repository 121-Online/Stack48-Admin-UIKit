import type { ReactNode } from "react";

/** Full-width ops canvas for primitive stories. */
export function StoryFrame({ children }: { children: ReactNode }) {
  return <div className="min-h-[240px] w-full bg-background p-6 text-foreground">{children}</div>;
}
