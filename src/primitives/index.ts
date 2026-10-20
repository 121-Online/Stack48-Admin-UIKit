/**
 * Customised shadcn primitives, styled to the GTM ops dashboard
 * (gtm.stack48.com): Inter 13px, zinc chrome, blue-500 focus, 2px radii.
 *
 * Presentational only — props in, events out. No data fetching.
 *
 * @packageDocumentation
 */

export { Button, buttonVariants } from "./button";
export type { ButtonProps } from "./button";

export { Input } from "./input";
export type { InputProps } from "./input";

export { Textarea } from "./textarea";
export type { TextareaProps } from "./textarea";

export { Label, labelVariants } from "./label";
export type { LabelProps } from "./label";

export { Checkbox } from "./checkbox";
export type { CheckboxProps } from "./checkbox";

export { Switch } from "./switch";
export type { SwitchProps } from "./switch";

export { Badge, badgeVariants } from "./badge";
export type { BadgeProps } from "./badge";

export { StatusIndicator } from "./status-indicator";
export type { StatusIndicatorProps, StatusIndicatorStatus } from "./status-indicator";

export { Section, SectionDivider } from "./section";
export type { SectionProps, SectionDividerProps } from "./section";

export { Separator } from "./separator";
export type { SeparatorProps } from "./separator";

export { Skeleton } from "./skeleton";
export type { SkeletonProps } from "./skeleton";

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "./select";
export type {
  SelectTriggerProps,
  SelectContentProps,
  SelectLabelProps,
  SelectItemProps,
  SelectSeparatorProps,
} from "./select";

export { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
export type { TabsListProps, TabsTriggerProps, TabsContentProps } from "./tabs";

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./dialog";
export type {
  DialogOverlayProps,
  DialogContentProps,
  DialogTitleProps,
  DialogDescriptionProps,
} from "./dialog";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "./dropdown-menu";
export type {
  DropdownMenuSubTriggerProps,
  DropdownMenuSubContentProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioItemProps,
  DropdownMenuLabelProps,
  DropdownMenuSeparatorProps,
} from "./dropdown-menu";

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from "./popover";
export type { PopoverContentProps } from "./popover";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./tooltip";
export type { TooltipContentProps } from "./tooltip";

export {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from "./toast";
export type {
  ToastProps,
  ToastViewportProps,
  ToastActionProps,
  ToastCloseProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastActionElement,
} from "./toast";
