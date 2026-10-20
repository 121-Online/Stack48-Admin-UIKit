/**
 * Active-route matching extracted from the GTM sidebar.
 *
 * `/` is exact. Other hrefs match themselves and nested paths
 * (`/leads` matches `/leads/abc`) unless `match` is `"exact"`.
 */
export function isActiveRoute(
  pathname: string | undefined,
  href: string,
  match: "exact" | "prefix" = href === "/" ? "exact" : "prefix",
): boolean {
  if (!pathname) {
    return false;
  }
  if (match === "exact" || href === "/") {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
