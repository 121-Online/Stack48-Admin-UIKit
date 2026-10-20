/**
 * Presentational format checks used as defaults by states components.
 *
 * These are field-shape rules (email syntax, HH:MM, IANA timezone, local-part
 * charset). Product rules — forbidden domains, Resend status, audience
 * counts — stay in the app and are passed in via validator props.
 */

/** Default type-to-confirm token from GTM mailings (`SEND`). */
export const DEFAULT_CONFIRM_TOKEN = "SEND";

/** GTM send-test cap. */
export const DEFAULT_MAX_EMAILS = 5;

/** Loose RFC-5322-ish address used when the caller does not pass `validateEmail`. */
export const DEFAULT_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** 24-hour `HH:MM`. */
export const HHMM_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

/** Local-part charset for From / Reply-To (lowercase, no spaces). */
export const LOCAL_PART_PATTERN = /^[a-z0-9](?:[a-z0-9._-]*[a-z0-9])?$/;

/** Weekday keys used by {@link ScheduleEditor}. */
export const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

/** One weekday key. */
export type DayKey = (typeof DAY_KEYS)[number];

/** Sentence-case weekday labels matching GTM `ScheduleEditor`. */
export const DAY_LABELS: Record<DayKey, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

/** One day’s send window. */
export interface DayWindow {
  enabled: boolean;
  /** `HH:MM` 24-hour. */
  start: string;
  /** `HH:MM` 24-hour. */
  end: string;
}

/** Controlled value for {@link ScheduleEditor}. */
export interface ScheduleValue {
  timezone: string;
  windows: Record<DayKey, DayWindow>;
}

/** Result of a field-level format check. */
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Split a free-text email list on commas, semicolons, or whitespace.
 * Trims, lowercases, and de-duplicates while preserving first-seen order.
 */
export function parseEmailList(raw: string): string[] {
  const seen = new Set<string>();
  const emails: string[] = [];
  for (const part of raw.split(/[,;\s]+/)) {
    const email = part.trim().toLowerCase();
    if (!email || seen.has(email)) continue;
    seen.add(email);
    emails.push(email);
  }
  return emails;
}

/**
 * Default email format check. Override via `validateEmail` for app rules.
 */
export function isValidEmail(value: string, pattern: RegExp = DEFAULT_EMAIL_PATTERN): boolean {
  return pattern.test(value.trim());
}

/**
 * GTM mailing confirm: accept the token (`SEND`) or the expected count.
 * Comparison is case-insensitive for the token; the count must match exactly.
 */
export function isTypeConfirmAccepted(
  value: string,
  options: { token?: string; count?: number } = {},
): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  const token = options.token ?? DEFAULT_CONFIRM_TOKEN;
  if (trimmed.toUpperCase() === token.toUpperCase()) return true;
  if (options.count != null && trimmed === String(options.count)) return true;
  return false;
}

/** Minutes from midnight for a valid `HH:MM`, or `null`. */
export function timeToMinutes(value: string): number | null {
  if (!HHMM_PATTERN.test(value)) return null;
  return Number(value.slice(0, 2)) * 60 + Number(value.slice(3, 5));
}

/**
 * Default per-day window check: enabled days need valid `HH:MM` with start before end.
 */
export function validateDayWindow(window: DayWindow): ValidationResult {
  if (!window.enabled) return { valid: true };
  if (!HHMM_PATTERN.test(window.start)) {
    return { valid: false, error: "Invalid start time (HH:MM)" };
  }
  if (!HHMM_PATTERN.test(window.end)) {
    return { valid: false, error: "Invalid end time (HH:MM)" };
  }
  const start = timeToMinutes(window.start);
  const end = timeToMinutes(window.end);
  if (start == null || end == null || start >= end) {
    return { valid: false, error: "Start must be before end" };
  }
  return { valid: true };
}

/**
 * Default schedule check. Does not require a day to be enabled — the app can
 * tighten that with `validateSchedule`.
 */
export function validateSchedule(value: ScheduleValue): ValidationResult {
  const tz = validateTimezone(value.timezone);
  if (!tz.valid) return tz;
  for (const day of DAY_KEYS) {
    const window = value.windows[day];
    if (!window) return { valid: false, error: `${DAY_LABELS[day]} configuration missing` };
    const dayResult = validateDayWindow(window);
    if (!dayResult.valid) {
      return { valid: false, error: `${DAY_LABELS[day]}: ${dayResult.error}` };
    }
  }
  return { valid: true };
}

/** IANA timezone names from the runtime, with a short fallback list. */
export function listTimezones(): string[] {
  try {
    return Intl.supportedValuesOf("timeZone");
  } catch {
    return ["Europe/London", "America/New_York", "America/Los_Angeles", "UTC"];
  }
}

/**
 * Default timezone check: non-empty and present in `Intl.supportedValuesOf`
 * when that API exists.
 */
export function validateTimezone(
  value: string,
  timezones: string[] = listTimezones(),
): ValidationResult {
  const trimmed = value.trim();
  if (!trimmed) return { valid: false, error: "Time zone is required" };
  if (timezones.length > 0 && !timezones.includes(trimmed)) {
    return { valid: false, error: "Unknown time zone" };
  }
  return { valid: true };
}

/** Case-insensitive substring filter used by the timezone typeahead. */
export function filterTimezones(
  timezones: string[],
  query: string,
  selected?: string,
  limit = 50,
): string[] {
  const needle = query.trim().toLowerCase();
  const matches = needle ? timezones.filter((tz) => tz.toLowerCase().includes(needle)) : timezones;
  if (selected && !matches.includes(selected) && timezones.includes(selected)) {
    return [selected, ...matches].slice(0, limit);
  }
  return matches.slice(0, limit);
}

/** Controlled value for {@link SendingIdentityEditor}. */
export interface SendingIdentityValue {
  sendingDomain: string;
  fromLocalPart: string;
  fromName: string;
  replyToLocalPart: string;
}

/**
 * Default From / Reply-To local-part check. Empty is invalid for From,
 * allowed for Reply-To when `optional` is true.
 */
export function validateLocalPart(value: string, optional = false): ValidationResult {
  const trimmed = value.trim();
  if (!trimmed) {
    return optional ? { valid: true } : { valid: false, error: "Local part is required" };
  }
  if (trimmed.length > 64) return { valid: false, error: "Must be 64 characters or fewer" };
  if (!LOCAL_PART_PATTERN.test(trimmed)) {
    return { valid: false, error: "Use lowercase letters, numbers, dots, underscores, or hyphens" };
  }
  return { valid: true };
}

/** Optional display name: no control characters, max 100. */
export function validateFromName(value: string): ValidationResult {
  if (value === "") return { valid: true };
  if (value.length > 100) return { valid: false, error: "Must be 100 characters or fewer" };
  if (/[\r\n\0]/.test(value)) return { valid: false, error: "Cannot include line breaks" };
  return { valid: true };
}

/**
 * Default identity check. Domain must be non-empty; option lists and
 * “forbidden domain” rules belong to the caller.
 */
export function validateSendingIdentity(value: SendingIdentityValue): ValidationResult {
  if (!value.sendingDomain.trim()) {
    return { valid: false, error: "Sending domain is required" };
  }
  const local = validateLocalPart(value.fromLocalPart, false);
  if (!local.valid) return local;
  const name = validateFromName(value.fromName);
  if (!name.valid) return name;
  const reply = validateLocalPart(value.replyToLocalPart, true);
  if (!reply.valid) return reply;
  return { valid: true };
}

/** `Name <local@domain>` or `local@domain`. */
export function previewFromAddress(
  value: Pick<SendingIdentityValue, "fromName" | "fromLocalPart" | "sendingDomain">,
): string {
  const address = `${value.fromLocalPart || "…"}@${value.sendingDomain || "domain"}`;
  const name = value.fromName.trim();
  return name ? `${name} <${address}>` : address;
}

/** Reply-To falls back to the From local-part when blank. */
export function previewReplyToAddress(
  value: Pick<SendingIdentityValue, "fromLocalPart" | "replyToLocalPart" | "sendingDomain">,
): string {
  const local = value.replyToLocalPart.trim() || value.fromLocalPart || "…";
  return `${local}@${value.sendingDomain || "domain"}`;
}

function defaultWindow(enabled: boolean): DayWindow {
  return { enabled, start: "09:00", end: "17:00" };
}

/** GTM reset target: Europe/London, Mon–Fri 09:00–17:00. */
export const DEFAULT_SCHEDULE: ScheduleValue = {
  timezone: "Europe/London",
  windows: {
    mon: defaultWindow(true),
    tue: defaultWindow(true),
    wed: defaultWindow(true),
    thu: defaultWindow(true),
    fri: defaultWindow(true),
    sat: defaultWindow(false),
    sun: defaultWindow(false),
  },
};

/** Empty identity — the app supplies stored values and domain options. */
export const EMPTY_SENDING_IDENTITY: SendingIdentityValue = {
  sendingDomain: "",
  fromLocalPart: "",
  fromName: "",
  replyToLocalPart: "",
};
