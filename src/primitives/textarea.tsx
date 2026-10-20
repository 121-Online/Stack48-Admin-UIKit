import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../lib/cn";

/** Props for {@link Textarea}. Native `<textarea>` attributes plus `className`. */
export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * GTM `.input-field` applied to a multiline control.
 * Same chrome as {@link Input}; height is content-driven (`min-h` via className).
 *
 * @example
 * ```tsx
 * <Textarea rows={4} placeholder="Talking points" />
 * ```
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, ...props },
  ref,
) {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-sm border border-input bg-card px-2.5 py-1.5 text-sm text-foreground transition-colors placeholder:text-zinc-400 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
