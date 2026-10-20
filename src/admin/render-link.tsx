import type { MouseEventHandler, ReactNode } from "react";

/**
 * Props passed to a caller-supplied link renderer so chrome works with any
 * router (Next.js `Link`, React Router `Link`, plain `<a>`).
 */
export interface RenderLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  title?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  "aria-current"?: "page";
  "aria-label"?: string;
}

/**
 * Render a navigation target. Return a router `Link` (or any element that
 * accepts `href` + `className`) instead of a raw `<a>`.
 *
 * @example
 * renderLink={({ href, children, className, ...rest }) => (
 *   <Link href={href} className={className} {...rest}>{children}</Link>
 * )}
 */
export type RenderLink = (props: RenderLinkProps) => ReactNode;

/** Fallback: a real anchor. Apps with a router should pass `renderLink`. */
export function defaultRenderLink({ href, children, ...rest }: RenderLinkProps) {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
