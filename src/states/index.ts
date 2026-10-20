/**
 * Shared empty, loading, error, alert, and modal frames.
 *
 * Presentational only — copy, rows, domains, and callbacks via props.
 * Validation defaults are format checks; replace them from the app.
 *
 * @packageDocumentation
 */

export { EmptyState } from "./empty-state";
export type { EmptyStateProps } from "./empty-state";

export { LoadingState, Spinner } from "./loading-state";
export type { LoadingStateProps, LoadingStateVariant, SpinnerProps } from "./loading-state";

export { ErrorState } from "./error-state";
export type { ErrorStateProps } from "./error-state";

export { Banner, InlineAlert } from "./inline-alert";
export type { AlertTone, InlineAlertProps } from "./inline-alert";

export { StaleWarning } from "./stale-warning";
export type { StaleWarningProps } from "./stale-warning";

export { FormField } from "./form-field";
export type { FormFieldProps } from "./form-field";

export { FormSection } from "./form-section";
export type { FormSectionProps } from "./form-section";

export { ConfirmDialog } from "./confirm-dialog";
export type { ConfirmDialogProps, ConfirmMode } from "./confirm-dialog";

export { MultiEmailModal, testQueuedMessage } from "./multi-email-modal";
export type { MultiEmailModalProps } from "./multi-email-modal";

export { ScheduleEditor } from "./schedule-editor";
export type { ScheduleEditorProps } from "./schedule-editor";

export { SendingIdentityEditor } from "./sending-identity-editor";
export type { SendingDomainOption, SendingIdentityEditorProps } from "./sending-identity-editor";

export {
  DAY_KEYS,
  DAY_LABELS,
  DEFAULT_CONFIRM_TOKEN,
  DEFAULT_EMAIL_PATTERN,
  DEFAULT_MAX_EMAILS,
  DEFAULT_SCHEDULE,
  EMPTY_SENDING_IDENTITY,
  HHMM_PATTERN,
  LOCAL_PART_PATTERN,
  filterTimezones,
  isTypeConfirmAccepted,
  isValidEmail,
  listTimezones,
  parseEmailList,
  previewFromAddress,
  previewReplyToAddress,
  timeToMinutes,
  validateDayWindow,
  validateFromName,
  validateLocalPart,
  validateSchedule,
  validateSendingIdentity,
  validateTimezone,
} from "./validation";
export type {
  DayKey,
  DayWindow,
  ScheduleValue,
  SendingIdentityValue,
  ValidationResult,
} from "./validation";
