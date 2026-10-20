import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

/** Props for {@link Input}. Native `<input>` attributes plus `className`. */
export type InputProps = InputHTMLAttributes<HTMLInputElement>;

/**
 * GTM `.input-field` as a shadcn Input.
 * Full width, 2px radius, zinc-300 border, blue-500 focus ring.
 *
 * @example
 * ```tsx
 * <Input placeholder="Search leads" />
 * <Input type="number" min={0} />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type = "text", ...props },
  ref,
) {
  return (
    <input
      type={type}
      className={cn(
        "flex w-full rounded-sm border border-input bg-card px-2.5 py-1.5 text-sm text-foreground transition-colors placeholder:text-zinc-400 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
