# Combobox Component

## Accessibility

### ARIA Attributes

| Attribute | Element | Purpose |
| --- | --- | --- |
| `role="combobox"` | Host | Identifies as combobox |
| `aria-expanded` | Host | Indicates dropdown state |
| `aria-haspopup="listbox"` | Host | Indicates popup type |
| `aria-controls` | Host | Points to listbox ID |
| `aria-activedescendant` | Host | Points to focused option |
| `role="listbox"` | Dropdown | Identifies option container |
| `role="option"` | Option | Identifies each option |
| `aria-selected` | Option | Indicates selection state |

### Keyboard Interaction

| Key | Action |
| --- | --- |
| `Enter` / `Space` | Open dropdown, select focused option |
| `ArrowDown` | Open dropdown, move to next option |
| `ArrowUp` | Open dropdown, move to previous option |
| `Home` | Move to first option |
| `End` | Move to last option |
| `Escape` | Close dropdown |
| `Tab` | Move focus out of component |
| Character keys | Jump to option starting with character |

### Screen Reader Support

- Selected value is announced when focused
- Options are announced with their position (e.g., "1 of 5")
- Selected state is announced
- Disabled options announce as disabled

### Testing

```bash
npm run test:a11y -- --testPathPatterns=select
```
