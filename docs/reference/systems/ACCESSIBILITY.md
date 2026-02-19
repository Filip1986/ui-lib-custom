# Accessibility Guide

## Overview
This library follows WCAG 2.1 AA standards and WAI-ARIA best practices.

## General Principles

### Keyboard Navigation
- All interactive elements are keyboard accessible.
- Focus order follows visual order.
- Focus indicators are always visible.
- Escape closes overlays and dropdowns.

### Screen Reader Support
- Semantic HTML used where possible.
- ARIA labels for icon-only buttons.
- Live regions for dynamic content when needed.
- Proper heading hierarchy in content.

### Visual Design
- Color contrast meets WCAG AA (4.5:1 for text).
- Focus rings visible against all backgrounds.
- No information conveyed by color alone.
- Reduced motion support via `prefers-reduced-motion`.

### Form Accessibility
- Labels associated with inputs.
- Error messages linked via `aria-describedby`.
- Required fields indicated.
- Validation states announced.

## Per-Component Accessibility

### Button Accessibility

#### Keyboard Interaction
| Key | Action |
| --- | --- |
| Tab | Move focus to/from button |
| Enter | Activate button |
| Space | Activate button |

#### ARIA Attributes
| Attribute | Usage |
| --- | --- |
| `aria-disabled` | Set when `disabled` or `loading` is true |
| `aria-busy` | Set when `loading` is true |
| `aria-pressed` | For toggle buttons |
| `aria-label` | Required for icon-only buttons |

#### Focus Management
- Focus ring uses `--uilib-button-focus-*`.
- Focus visible on keyboard navigation.
- No focus trap.

#### Screen Reader Announcements
- Button text is read.
- Loading state should be conveyed by `aria-busy` and optional hidden text.
- Disabled state is conveyed by `aria-disabled`.

#### Color Contrast
- All color variants meet 4.5:1 contrast by default.
- Focus ring meets 3:1 against backgrounds.

#### Common Issues & Solutions
- Icon-only buttons: always provide `aria-label`.
- Loading state: include a visually hidden text label if the action changes.

### Card Accessibility

#### Keyboard Interaction
| Key | Action |
| --- | --- |
| Tab | Focus interactive elements inside the card |

#### ARIA Attributes
| Attribute | Usage |
| --- | --- |
| n/a | Cards are containers; use semantic elements inside |

#### Focus Management
- Cards do not trap focus.
- Focus indicators belong to child controls.

#### Screen Reader Announcements
- Use headings in header slots for clarity.
- Provide accessible labels for close actions if used.

#### Color Contrast
- Ensure header/footer backgrounds meet 4.5:1 contrast.

#### Common Issues & Solutions
- Close icon should be paired with descriptive text or an explicit button label.

### Accordion Accessibility

#### Keyboard Interaction
| Key | Action |
| --- | --- |
| Tab | Move focus to header buttons |
| Arrow Up/Down | Move focus between headers |
| Home/End | Jump to first/last header |
| Enter | Toggle panel |
| Space | Toggle panel |

#### ARIA Attributes
| Attribute | Usage |
| --- | --- |
| `aria-expanded` | Set on header toggle |
| `aria-controls` | Points to panel id |
| `aria-disabled` | Set for disabled panels |
| `aria-labelledby` | Panel references header |

#### Focus Management
- Focus remains on the header after toggle.
- Disabled panels are skipped in roving focus.

#### Screen Reader Announcements
- Header text is read with expanded/collapsed state.
- Panel content is hidden when collapsed.

#### Color Contrast
- Focus ring and icon colors meet WCAG contrast.

#### Common Issues & Solutions
- Provide concise header text for screen reader clarity.

### Tabs Accessibility

#### Keyboard Interaction
| Key | Action |
| --- | --- |
| Tab | Focus active tab |
| Arrow Left/Right | Move focus (horizontal) |
| Arrow Up/Down | Move focus (vertical) |
| Home/End | Jump to first/last tab |
| Enter | Activate focused tab |
| Space | Activate focused tab |

#### ARIA Attributes
| Attribute | Usage |
| --- | --- |
| `role="tablist"` | Set on tab list |
| `role="tab"` | Set on each trigger |
| `role="tabpanel"` | Set on each panel |
| `aria-selected` | Active tab state |
| `aria-controls` | Points to panel id |
| `aria-labelledby` | Panel references tab id |

#### Focus Management
- Roving tabindex keeps only active tab focusable.
- Optional `focusPanelOnSelect` moves focus into the panel.

#### Screen Reader Announcements
- Tab labels are announced with selected state.
- Panels announce their content when activated.

#### Color Contrast
- Indicator and focus ring meet WCAG contrast.

#### Common Issues & Solutions
- Provide meaningful tab labels; avoid icon-only labels without `aria-label`.

### Select Accessibility

#### Keyboard Interaction
| Key | Action |
| --- | --- |
| Tab | Focus combobox |
| Enter | Open panel / select focused option |
| Space | Open panel / select focused option |
| Arrow Up/Down | Move focus between options |
| Escape | Close panel |

#### ARIA Attributes
| Attribute | Usage |
| --- | --- |
| `role="combobox"` | Set on control |
| `aria-expanded` | Open/closed state |
| `aria-controls` | Points to listbox |
| `role="listbox"` | Set on panel |
| `role="option"` | Set on each option |
| `aria-selected` | Selected option state |
| `aria-multiselectable` | Set when `multiple` is true |

#### Focus Management
- Focus remains on the combobox; search input receives focus when opened.
- Escape closes the panel and restores focus.

#### Screen Reader Announcements
- Selected value is announced via combobox text.
- Options announce selection state.

#### Color Contrast
- Hover/selected styles must meet contrast; use tokens for consistency.

#### Common Issues & Solutions
- Provide a visible label when possible; avoid placeholder-only usage.

### Input Accessibility

#### Keyboard Interaction
| Key | Action |
| --- | --- |
| Tab | Focus the input |
| Enter | Submit parent form |

#### ARIA Attributes
| Attribute | Usage |
| --- | --- |
| `aria-required` | When `required` is true |
| `aria-invalid` | When `error` is set |
| `aria-describedby` | Links error text |

#### Focus Management
- Focus ring uses input focus styles.
- Clear/toggle buttons are keyboard accessible.

#### Screen Reader Announcements
- Label text is associated with input.
- Error text is announced via `aria-describedby`.

#### Color Contrast
- Error and focus states meet WCAG contrast.

#### Common Issues & Solutions
- Avoid label-as-placeholder; use `label` input and floating modes.

### Checkbox Accessibility

#### Keyboard Interaction
| Key | Action |
| --- | --- |
| Tab | Focus checkbox |
| Space | Toggle checked state |
| Enter | Toggle checked state |

#### ARIA Attributes
| Attribute | Usage |
| --- | --- |
| `role="checkbox"` | Set on host |
| `aria-checked` | `true`, `false`, or `mixed` |
| `aria-disabled` | When disabled |
| `aria-labelledby` | References label text |
| `aria-describedby` | References description |

#### Focus Management
- Focus ring uses `--uilib-checkbox-focus-ring`.

#### Screen Reader Announcements
- Label and description are read when present.
- Indeterminate state announces `mixed`.

#### Color Contrast
- Checkmark and focus ring meet WCAG contrast.

#### Common Issues & Solutions
- Use `ariaLabel` only when there is no visible label.

## Testing

### Manual Testing Checklist
- [ ] Navigate with keyboard only.
- [ ] Test with screen reader (NVDA/VoiceOver).
- [ ] Check color contrast.
- [ ] Verify focus visibility.
- [ ] Test at 200% zoom.

### Automated Testing
- Integration with axe-core (if applicable).
- Accessibility unit tests.

