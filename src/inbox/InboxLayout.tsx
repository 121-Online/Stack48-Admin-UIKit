import type { ReactNode } from "react";
import { cn } from "../lib/cn";

/**
 * Props for {@link InboxLayout}.
 */
export interface InboxLayoutProps {
  /** Left rail. Typically {@link FolderList}. Hidden below the `md` breakpoint. */
  folderRail?: ReactNode;
  /** Centre column. Typically {@link MessageList}. */
  list: ReactNode;
  /** Right reading pane. Typically {@link ThreadView}. */
  readingPane?: ReactNode;
  /** When true, the list shrinks (or hides below `lg`) and the pane is shown. */
  readingPaneOpen?: boolean;
  /**
   * Optional chrome above the list + pane (mobile folder select, a title).
   * Search lives on {@link MessageList} by default.
   */
  toolbar?: ReactNode;
  className?: string;
}

/**
 * Three-pane Gmail-style inbox chrome: folder rail, message list, reading pane.
 *
 * Presentational — pass the pane contents as nodes. Does not own routing or
 * data. Matches GTM `InboxContent` breakpoints (`md` rail, `lg` split pane).
 */
export function InboxLayout({
  folderRail,
  list,
  readingPane,
  readingPaneOpen = false,
  toolbar,
  className,
}: InboxLayoutProps) {
  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 overflow-hidden bg-card border-t border-border",
        className,
      )}
    >
      {folderRail ? (
        <aside className="hidden md:flex w-52 flex-shrink-0 flex-col border-r border-border bg-zinc-50/60 overflow-y-auto">
          {folderRail}
        </aside>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col">
        {toolbar}
        <div className="flex min-h-0 flex-1">
          <section
            className={cn(
              "min-w-0 flex flex-col",
              readingPaneOpen
                ? "hidden lg:flex lg:w-[46%] lg:border-r lg:border-border"
                : "flex flex-1",
            )}
            aria-label="Message list"
          >
            {list}
          </section>
          {readingPaneOpen && readingPane ? (
            <section
              className="flex min-w-0 flex-1 flex-col overflow-y-auto bg-zinc-50"
              aria-label="Reading pane"
            >
              {readingPane}
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
