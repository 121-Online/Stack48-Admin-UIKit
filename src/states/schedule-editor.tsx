"use client";

import { useId, useMemo, useState } from "react";
import { cn } from "../lib/cn";
import { Checkbox } from "../primitives/checkbox";
import { Input } from "../primitives/input";
import { Label } from "../primitives/label";
import { FormField } from "./form-field";
import {
  DAY_KEYS,
  DAY_LABELS,
  DEFAULT_SCHEDULE,
  filterTimezones,
  listTimezones,
  validateDayWindow,
  validateSchedule,
  validateTimezone,
  type DayKey,
  type DayWindow,
  type ScheduleValue,
  type ValidationResult,
} from "./validation";

/**
 * Props for {@link ScheduleEditor}.
 */
export interface ScheduleEditorProps {
  value: ScheduleValue;
  onChange?: (value: ScheduleValue, valid: boolean) => void;
  disabled?: boolean;
  /** Override the IANA list (defaults to `Intl.supportedValuesOf`). */
  timezones?: string[];
  validateTimezone?: (value: string) => ValidationResult;
  validateWindow?: (day: DayKey, window: DayWindow) => ValidationResult;
  validateSchedule?: (value: ScheduleValue) => ValidationResult;
  defaultValue?: ScheduleValue;
  resetLabel?: string;
  timezoneLabel?: string;
  windowsLabel?: string;
  hint?: string;
  className?: string;
}

/**
 * Presentational day / time-window picker from GTM `ScheduleEditor`.
 *
 * Timezone typeahead, Mon–Sun rows, reset to the supplied default. Validity
 * is format-only unless the app passes validators. No campaign types.
 *
 * @example
 * ```tsx
 * <ScheduleEditor value={schedule} onChange={(next, valid) => save(next, valid)} />
 * ```
 */
export function ScheduleEditor({
  value,
  onChange,
  disabled = false,
  timezones,
  validateTimezone: validateTimezoneProp,
  validateWindow: validateWindowProp,
  validateSchedule: validateScheduleProp,
  defaultValue = DEFAULT_SCHEDULE,
  resetLabel = "Reset to Mon-Fri 09:00-17:00",
  timezoneLabel = "Time zone",
  windowsLabel = "Sending hours",
  hint = "Emails send only inside these hours, in this time zone. Outside them they wait in the queue.",
  className,
}: ScheduleEditorProps) {
  const listId = useId();
  const available = useMemo(() => timezones ?? listTimezones(), [timezones]);
  const [timezoneSearch, setTimezoneSearch] = useState("");
  const [timezoneFocused, setTimezoneFocused] = useState(false);

  const checkTimezone = validateTimezoneProp ?? ((tz: string) => validateTimezone(tz, available));
  const checkWindow =
    validateWindowProp ?? ((_: DayKey, window: DayWindow) => validateDayWindow(window));
  const checkSchedule = validateScheduleProp ?? validateSchedule;

  const tzResult = checkTimezone(value.timezone);
  const scheduleResult = checkSchedule(value);
  const filtered = filterTimezones(
    available,
    timezoneFocused ? timezoneSearch : value.timezone,
    value.timezone,
  );

  function emit(next: ScheduleValue) {
    onChange?.(next, checkSchedule(next).valid);
  }

  function handleTimezone(next: string) {
    setTimezoneSearch(next);
    emit({ ...value, timezone: next });
  }

  function handleWindow(day: DayKey, patch: Partial<DayWindow>) {
    const current = value.windows[day] ?? defaultValue.windows[day];
    emit({
      ...value,
      windows: {
        ...value.windows,
        [day]: { ...current, ...patch },
      },
    });
  }

  return (
    <div className={cn("space-y-4", className)}>
      <FormField
        label={timezoneLabel}
        htmlFor={`${listId}-timezone`}
        error={!tzResult.valid && value.timezone ? tzResult.error : undefined}
      >
        <Input
          id={`${listId}-timezone`}
          type="text"
          list={listId}
          value={timezoneFocused ? timezoneSearch || value.timezone : value.timezone}
          onChange={(event) => handleTimezone(event.target.value)}
          onFocus={() => {
            setTimezoneFocused(true);
            setTimezoneSearch(value.timezone);
          }}
          onBlur={() => {
            setTimezoneFocused(false);
            if (!available.includes(timezoneSearch)) setTimezoneSearch("");
          }}
          placeholder="Search time zones..."
          disabled={disabled}
          autoComplete="off"
        />
      </FormField>
      <datalist id={listId}>
        {filtered.map((tz) => (
          <option key={tz} value={tz} />
        ))}
      </datalist>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <Label variant="form">{windowsLabel}</Label>
          <button
            type="button"
            className="text-[10px] text-brand hover:underline disabled:opacity-50"
            disabled={disabled}
            onClick={() => emit(structuredClone(defaultValue))}
          >
            {resetLabel}
          </button>
        </div>

        <div className="divide-y divide-zinc-100 rounded-sm border border-border">
          {DAY_KEYS.map((day) => {
            const window = value.windows[day] ?? defaultValue.windows[day];
            const dayError = checkWindow(day, window);
            const startId = `${listId}-${day}-start`;
            const endId = `${listId}-${day}-end`;
            return (
              <div key={day} className="flex flex-wrap items-center gap-2 px-3 py-2">
                <label className="flex w-24 items-center gap-2">
                  <Checkbox
                    checked={window.enabled}
                    disabled={disabled}
                    onCheckedChange={(checked) => handleWindow(day, { enabled: checked === true })}
                    aria-label={DAY_LABELS[day]}
                  />
                  <span className="text-sm">{DAY_LABELS[day]}</span>
                </label>
                <Input
                  id={startId}
                  type="time"
                  step={60}
                  value={window.start}
                  disabled={disabled}
                  onChange={(event) => handleWindow(day, { start: event.target.value })}
                  className="w-24"
                  aria-label={`${DAY_LABELS[day]} start`}
                />
                <span className="text-sm text-zinc-400">to</span>
                <Input
                  id={endId}
                  type="time"
                  step={60}
                  value={window.end}
                  disabled={disabled}
                  onChange={(event) => handleWindow(day, { end: event.target.value })}
                  className="w-24"
                  aria-label={`${DAY_LABELS[day]} end`}
                />
                {window.enabled && !dayError.valid ? (
                  <span className="text-[10px] text-red-600">{dayError.error}</span>
                ) : null}
              </div>
            );
          })}
        </div>
        {!scheduleResult.valid ? (
          <p className="text-[10px] font-medium text-amber-600" role="status">
            Schedule has invalid values. Fix them before saving.
          </p>
        ) : null}
      </div>

      {hint ? <p className="text-[10px] text-zinc-500">{hint}</p> : null}
    </div>
  );
}
