# AGENTS.md — Stack48 Admin UI

Instructions for coding agents working in this repo or consuming the kit from an app.

This kit is **presentational**. It is consumed as **git source**, not from npm. **Props in, events out. No fetching.**

## Install

```json
"@stack48/admin-ui": "github:121-Online/Stack48-Admin-UIKit#vX.Y.Z"
```

Pin a release tag. `pnpm install` runs `prepare`, which builds `dist/` (ESM + `.d.ts` + CSS).

Copy-in: copy `src/` into the app and import from that path. Still add the preset and CSS.

Peer deps (do not bundle): `react` >= 18, `react-dom` >= 18, `tailwindcss` ^3.4. Optional peer: `recharts` ^2.12 (activity / reputation / horizontal-funnel plots only).

## Theme

1. Tailwind **v3** config:

```ts
import adminUi, { adminUiContentGlobs } from "@stack48/admin-ui/preset";

export default {
  presets: [adminUi],
  content: ["./src/**/*.{ts,tsx}", ...adminUiContentGlobs],
};
```

2. CSS, **after** `@tailwind` directives:

```ts
import "@stack48/admin-ui/styles.css";
```

3. Dark mode is class-based (`.dark` on `html`). GTM production is light-only; do not enable dark unless the app asks.

Do not restyle tokens to “look nicer”. Match GTM: Inter 13px, zinc-50 canvas, zinc-900 primary buttons, blue-500 brand/focus, 2px radius, 1px `border-border`, no drop shadow on stat tiles.

## Rules (non-negotiable)

1. **Presentational only.** No Supabase, Resend, `fetch`, React Query, cookies, auth, or domain rules. No hidden I/O. If it needs a server, it does not belong in this kit.
2. **Data via props.** Every component is presentational. Callers pass rows, counts, labels, and callbacks.
3. **Professional ops tool.** Linear/Stripe-dashboard density, not a marketing site.
4. **Dense.** Default type is 13px. Prefer `text-caption` (11px) and `text-xs` (12px) for chrome.
5. **Full-width layouts.** Sidebars are `w-sidebar` (16rem); the header is `h-header` (3.5rem).
6. **No boxy cartoon cards.** `bg-card` + `border border-border` + `rounded-sm` (2px). GTM `.stat-card` has **no shadow**.

## Import map — every public export

Prefer subpath imports. `@stack48/admin-ui/components/<ns>` re-exports the same namespace as `@stack48/admin-ui/<ns>`. The root barrel also re-exports everything; apps should still import from subpaths.

Equivalent:

```ts
import { Button } from "@stack48/admin-ui/primitives";
import { Button } from "@stack48/admin-ui/components/primitives";
```

### `@stack48/admin-ui`

| Export                                                                                                                                                                    | Kind                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `cn`                                                                                                                                                                      | class helper          |
| `tokens`, `zinc`, `blue`, `red`, `emerald`, `amber`, `hsl`, `lightSemantic`, `darkSemantic`, `radii`, `shadows`, `typography`, `spacing`, `layout`, `semanticCssVarNames` | tokens                |
| `Tokens`, `SemanticCssVarName`                                                                                                                                            | types                 |
| `preset`, `adminUiContentGlobs`                                                                                                                                           | Tailwind              |
| plus every namespace export below                                                                                                                                         | convenience re-export |

### `@stack48/admin-ui/tokens`

`tokens`, `zinc`, `blue`, `red`, `emerald`, `amber`, `hsl`, `lightSemantic`, `darkSemantic`, `radii`, `shadows`, `typography`, `spacing`, `layout`, `semanticCssVarNames`, types `Tokens`, `SemanticCssVarName`.

### `@stack48/admin-ui/preset`

Default: Tailwind v3 preset. Named: `adminUiContentGlobs`.

### `@stack48/admin-ui/cn`

`cn()`.

### CSS

| Subpath                        | File                                   |
| ------------------------------ | -------------------------------------- |
| `@stack48/admin-ui/styles.css` | fonts + variables + GTM body           |
| `@stack48/admin-ui/theme.css`  | CSS variables only (`:root` / `.dark`) |

### `@stack48/admin-ui/primitives`

`Button`, `buttonVariants`, `Input`, `Textarea`, `Label`, `labelVariants`, `Checkbox`, `Switch`, `Badge`, `badgeVariants`, `StatusIndicator`, `Section`, `SectionDivider`, `Separator`, `Skeleton`, `Select`, `SelectGroup`, `SelectValue`, `SelectTrigger`, `SelectContent`, `SelectLabel`, `SelectItem`, `SelectSeparator`, `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`, `Dialog`, `DialogPortal`, `DialogOverlay`, `DialogTrigger`, `DialogClose`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuGroup`, `DropdownMenuPortal`, `DropdownMenuSub`, `DropdownMenuSubContent`, `DropdownMenuSubTrigger`, `DropdownMenuRadioGroup`, `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverAnchor`, `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider`, `Toast`, `ToastProvider`, `ToastViewport`, `ToastTitle`, `ToastDescription`, `ToastClose`, `ToastAction`.

Types: `ButtonProps`, `InputProps`, `TextareaProps`, `LabelProps`, `CheckboxProps`, `SwitchProps`, `BadgeProps`, `StatusIndicatorProps`, `StatusIndicatorStatus`, `SectionProps`, `SectionDividerProps`, `SeparatorProps`, `SkeletonProps`, `SelectTriggerProps`, `SelectContentProps`, `SelectLabelProps`, `SelectItemProps`, `SelectSeparatorProps`, `TabsListProps`, `TabsTriggerProps`, `TabsContentProps`, `DialogOverlayProps`, `DialogContentProps`, `DialogTitleProps`, `DialogDescriptionProps`, `DropdownMenuSubTriggerProps`, `DropdownMenuSubContentProps`, `DropdownMenuContentProps`, `DropdownMenuItemProps`, `DropdownMenuCheckboxItemProps`, `DropdownMenuRadioItemProps`, `DropdownMenuLabelProps`, `DropdownMenuSeparatorProps`, `PopoverContentProps`, `TooltipContentProps`, `ToastProps`, `ToastViewportProps`, `ToastActionProps`, `ToastCloseProps`, `ToastTitleProps`, `ToastDescriptionProps`, `ToastActionElement`.

### `@stack48/admin-ui/admin`

`AppShell`, `Sidebar`, `Breadcrumb`, `Breadcrumbs`, `PageHeader`, `Topbar`, `Panel`, `SettingsGroup`, `ChartSlot`, `DataTable`, `DataTableToolbar`, `DataTablePagination`, `pageWindow`, `FilterCheckbox`, `FilterSelect`, `ChipList`, `MultiSelectFilter`, `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell`, `TableMessage`, `DataTableRoot`, `DataTableHead`, `DataTableBody`, `DataTableRow`, `DataTableCell` (GTM aliases of `Table*`), `isActiveRoute`, `defaultRenderLink`.

Types: `AppShellProps`, `SidebarNavGroup`, `SidebarNavItem`, `SidebarProps`, `BreadcrumbItem`, `BreadcrumbProps`, `BreadcrumbsProps`, `PageHeaderProps`, `TopbarProps`, `PanelProps`, `SettingsGroupProps`, `ChartSlotProps`, `ColumnDef`, `DataTableProps`, `PaginationState`, `SortState`, `DataTableToolbarProps`, `DataTablePaginationProps`, `FilterCheckboxProps`, `FilterOption`, `FilterSelectProps`, `ChipListProps`, `MultiSelectFilterProps`, `TableCellProps`, `TableProps`, `TableRowProps`, `RenderLink`, `RenderLinkProps`.

### `@stack48/admin-ui/charts`

`ChartA11y`, `ChartEmpty`, `HiddenDataTable`, `ChartTooltip`, `chartColors`, `DailyActivityChart`, `defaultDailyActivitySeries`, `defaultFunnelColors`, `DeliveryFunnel`, `DeliveryFunnelHorizontal`, `defaultDateLabel`, `defaultDateTick`, `defaultNumberFormat`, `defaultPercentFormat`, `KpiDivider`, `KpiItem`, `KpiStrip`, `KpiTile`, `KpiTileRow`, `MetricsHeader`, `BounceRateChart`, `ComplaintRateChart`, `defaultBounceThresholds`, `defaultComplaintThresholds`, `RateTrendChart`, `Sparkline`, `StackedBars`, `TaperedFunnel`, `defaultRegionCoordinates`, `WorldMap`.

Types: `ChartTooltipItem`, `ChartColorName`, `ChartSeries`, `DailyActivityChartProps`, `DailyActivityPoint`, `DeliveryFunnelHorizontalProps`, `DeliveryFunnelProps`, `FunnelStage`, `DateFormatter`, `NumberFormatter`, `PercentFormatter`, `KpiDelta`, `KpiDividerProps`, `KpiItemProps`, `KpiStripProps`, `MetricStatus`, `KpiTileProps`, `KpiTileRowProps`, `MetricsHeaderBreakdown`, `MetricsHeaderBreakdownItem`, `MetricsHeaderFact`, `MetricsHeaderProps`, `MetricsHeaderStat`, `RateThreshold`, `RateTrendChartProps`, `RateTrendPoint`, `SparklineProps`, `StackedBarSegment`, `StackedBarsProps`, `TaperedFunnelProps`, `TaperedFunnelStage`, `WorldMapCoordinates`, `WorldMapProps`, `WorldMapRegion`, `WorldMapViewMode`.

### `@stack48/admin-ui/inbox`

`InboxLayout`, `FolderList`, `MessageList`, `ThreadView`, `MessageMeta`, `SandboxedHtml`, `buildInboxHtmlSrcDoc`, `INBOX_HTML_CSP`, `useInboxKeyboard`, `INBOX_SHORTCUTS`, `isEditableKeyboardTarget`, `nextFocusedIndex`, `resolveInboxKey`.

Types: `InboxLayoutProps`, `FolderListProps`, `MessageListProps`, `ThreadViewProps`, `MessageMetaProps`, `SandboxedHtmlProps`, `InboxKeyboardCallbacks`, `InboxKeyboardOptions`, `InboxKeyAction`, `InboxKeyEvent`, `InboxShortcut`, `InboxAttachment`, `InboxChip`, `InboxChipVariant`, `InboxFolder`, `InboxFolderIconName`, `InboxListItem`, `InboxMailbox`, `InboxMessageDirection`, `InboxPageEvent`, `InboxThreadMessage`.

Untrusted HTML only through `SandboxedHtml` (`sandbox=""` iframe + CSP `srcdoc`). Never `dangerouslySetInnerHTML`.

### `@stack48/admin-ui/states`

`EmptyState`, `LoadingState`, `Spinner`, `ErrorState`, `Banner`, `InlineAlert`, `StaleWarning`, `FormField`, `FormSection`, `ConfirmDialog`, `MultiEmailModal`, `testQueuedMessage`, `ScheduleEditor`, `SendingIdentityEditor`, `DAY_KEYS`, `DAY_LABELS`, `DEFAULT_CONFIRM_TOKEN`, `DEFAULT_EMAIL_PATTERN`, `DEFAULT_MAX_EMAILS`, `DEFAULT_SCHEDULE`, `EMPTY_SENDING_IDENTITY`, `HHMM_PATTERN`, `LOCAL_PART_PATTERN`, `filterTimezones`, `isTypeConfirmAccepted`, `isValidEmail`, `listTimezones`, `parseEmailList`, `previewFromAddress`, `previewReplyToAddress`, `timeToMinutes`, `validateDayWindow`, `validateFromName`, `validateLocalPart`, `validateSchedule`, `validateSendingIdentity`, `validateTimezone`.

Types: `EmptyStateProps`, `LoadingStateProps`, `LoadingStateVariant`, `SpinnerProps`, `ErrorStateProps`, `AlertTone`, `InlineAlertProps`, `StaleWarningProps`, `FormFieldProps`, `FormSectionProps`, `ConfirmDialogProps`, `ConfirmMode`, `MultiEmailModalProps`, `ScheduleEditorProps`, `SendingDomainOption`, `SendingIdentityEditorProps`, `DayKey`, `DayWindow`, `ScheduleValue`, `SendingIdentityValue`, `ValidationResult`.

Validation defaults are **format checks**. Replace them from the app. The kit does not send mail.

## Compose

```
src/primitives   customised shadcn (Button, Input, Dialog, Table, …)
src/admin        composed chrome (shell, sidebar, header, page, table toolbar)
src/charts       presentational charts
src/inbox        thread / message surfaces
src/states       empty / loading / error / modal frames
```

- New components go in the matching folder, with a Storybook story, TSDoc, a docs page, and a changeset.
- Export from the folder `index.ts` **and** `src/components/<namespace>.ts` so both subpaths work.
- Apps compose primitives into pages. Do not hide product rules inside the kit.
- Do not duplicate primitives under `*/_internal`. Import from `src/primitives`.

## Do / don’t (visual)

| Do                                               | Don’t                                                                   |
| ------------------------------------------------ | ----------------------------------------------------------------------- |
| `rounded-sm`, 1px `border-border`                | `rounded-2xl`, `shadow-xl` metric tiles                                 |
| `bg-background` canvas, `bg-card` panels         | Rainbow section cards                                                   |
| `bg-primary` for the main action (zinc-900)      | Make every button brand-blue                                            |
| `text-brand` / `border-ring` for links and focus | Recolor `--primary` to blue                                             |
| `tabular-nums` on metrics                        | Title-case every label; GTM uses sentence case + uppercase micro labels |

## Token names (stable)

shadcn CSS variables: `--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--destructive`, `--destructive-foreground`, `--border`, `--input`, `--ring`, `--radius`.

Stack48 extras: `--brand`, `--brand-foreground`, `--brand-hover`, `--success`, `--success-foreground`, `--success-muted`, `--warning`, `--warning-foreground`, `--warning-muted`, `--sidebar`, `--sidebar-foreground`, `--sidebar-border`, `--sidebar-accent`, `--sidebar-width`, `--header-height`, `--font-sans`, `--font-mono`, `--font-size-body`, `--shadow-sm`, `--shadow-lg`.

`--primary` is zinc-900 (GTM `.btn-primary`). `--brand` / `--ring` is blue-500 (GTM `--accent`). shadcn `--accent` is the zinc-100 hover wash — do not confuse them.

JS: `tokens`, `zinc`, `blue`, `red`, `emerald`, `amber`, `lightSemantic`, `darkSemantic`, `radii`, `shadows`, `typography`, `spacing`, `layout`, `semanticCssVarNames`.

Tailwind: `bg-background`, `bg-card`, `bg-primary`, `bg-brand`, `bg-success`, `bg-warning`, `w-sidebar`, `h-header`, `text-body`, `text-caption`, `text-micro`, `text-2xs`, `rounded-sm`.

## Changing this kit

- `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm build-storybook` must pass.
- Every component PR: docs page, stories for every state, TSDoc on exports, a changeset. See `docs/CONTRIBUTING.md`.
- Do not modify the GTM dashboard repo from this project.
- Do not add a registry publish step.
