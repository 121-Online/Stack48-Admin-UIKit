import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Join class names and resolve Tailwind conflicts (last token wins).
 *
 * @example
 * cn("px-2 py-1", compact && "py-0.5", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
