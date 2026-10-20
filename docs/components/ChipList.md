# ChipList

Read-only chip row extracted from GTM `VocabChipList`. Use in table cells for platform / service arrays. Empty values render an em dash.

## Props

| Name         | Type                            | Default | Description                    |
| ------------ | ------------------------------- | ------- | ------------------------------ |
| `values`     | `string[] \| null \| undefined` | —       | Chip values.                   |
| `labels`     | `Record<string, string>`        | `{}`    | Display map.                   |
| `maxVisible` | `number`                        | `3`     | Extra values collapse to `+N`. |

## Usage

```tsx
<ChipList values={lead.platforms} labels={PLATFORM_LABELS} maxVisible={3} />
```

## Do / don’t

| Do                                 | Don’t                           |
| ---------------------------------- | ------------------------------- |
| Pass labels from the app vocab map | Truncate with CSS overflow only |
| Keep chips `text-[10px]` zinc-100  | Large rounded-full pills        |

## Accessibility

- Decorative. The full list is not in an `aria-label`; put a `title` on the cell if the remainder matters.
- Empty state is the character `—`.
