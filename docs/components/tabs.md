# Tabs

Compact zinc pills matching GTM Campaign Configuration (`px-3 py-1.5 text-xs`, active = zinc-900). Not underline marketing tabs.

## Props

Root: Radix `value` / `defaultValue` / `onValueChange` / `orientation`.

### TabsTrigger

| Name       | Type      | Default  | Description             |
| ---------- | --------- | -------- | ----------------------- |
| `value`    | `string`  | required | Panel id.               |
| `disabled` | `boolean` | `false`  | Dimmed, not selectable. |

## Usage

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@stack48/admin-ui/primitives";

<Tabs defaultValue="targeting">
  <TabsList>
    <TabsTrigger value="targeting">Targeting / ICP</TabsTrigger>
    <TabsTrigger value="volume">Volume</TabsTrigger>
  </TabsList>
  <TabsContent value="targeting">{/* … */}</TabsContent>
</Tabs>;
```

## Do / don’t

**Do**

- Use for in-panel section switching (campaign config).
- Keep labels short (`Volume`, `Caps`).

**Don’t**

- Use full-width rounded-full segmented controls.
- Put navigation between _pages_ in Tabs — that is a sidebar / link.

## Accessibility

- `tablist` + `tab` + `tabpanel`. Arrow keys move between tabs.
- Active tab is `aria-selected`.
- Disabled tabs are not focusable.
- Each panel should start with a heading or labelled fieldset when content is long.
