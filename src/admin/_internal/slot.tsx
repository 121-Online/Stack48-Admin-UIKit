import {
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";

/**
 * Minimal asChild slot. Merge props onto the single child element.
 *
 * Temporary until a primitives `Slot` (Radix) lands. Do not export from the
 * public admin barrel.
 */
export function Slot({
  children,
  ...props
}: HTMLAttributes<HTMLElement> & { children?: ReactNode }) {
  if (!isValidElement(children)) {
    return null;
  }
  const child = children as ReactElement<HTMLAttributes<HTMLElement>>;
  return cloneElement(child, {
    ...props,
    ...child.props,
    className: cn(props.className, child.props.className),
  });
}
