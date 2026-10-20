# Section

GTM page section (`src/components/ui/Section`). Full-width header + children. No card chrome on the section itself.

Also exports `SectionDivider` — hairline `bg-zinc-100` with `my-6`.

## Props

### Section

| Name          | Type        | Default  | Description                                                      |
| ------------- | ----------- | -------- | ---------------------------------------------------------------- |
| `title`       | `string`    | —        | `text-sm font-semibold`.                                         |
| `description` | `string`    | —        | One muted line. Empty string still reserves a line (GTM layout). |
| `action`      | `ReactNode` | —        | Right-aligned header slot.                                       |
| `children`    | `ReactNode` | required | Body. Caller supplies any `border` / `bg-card`.                  |
| `className`   | `string`    | —        | e.g. `mb-6`.                                                     |

### SectionDivider

| Name        | Type     | Default | Description                |
| ----------- | -------- | ------- | -------------------------- |
| `className` | `string` | —       | Merged onto the separator. |

## Usage

```tsx
import { Badge, Section, SectionDivider } from "@stack48/admin-ui/primitives";

<Section title="Send configuration" description="Caps and breaker" action={<Badge variant="danger">Breaker active</Badge>}>
  {children}
</Section>
<SectionDivider />
```

## Do / don’t

**Do**

- Keep the section full-width. Children can be a 1px zinc panel (`rounded-sm p-4`).
- Use sentence-case titles (`Send configuration`).

**Don’t**

- Wrap the whole section in a coloured / shadowed card.
- Centre the title in a marketing column.

## Accessibility

- Title is an `<h2>`. Do not nest another `h2` immediately inside without a reason.
- `SectionDivider` is decorative (`decorative` on the Radix separator).
- The reserved empty description line is visual alignment, not a live region.
