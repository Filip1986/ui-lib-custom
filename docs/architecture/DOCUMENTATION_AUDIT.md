# Documentation Audit

Date: 2026-02-19

## Scope

Files reviewed:

- `docs/reference/components/*.md`
- `docs/reference/components/README.md`
- `README.md`
- `DOCUMENTATION_MAP.md`
- Template examples: `docs/reference/components/BADGE.md`, `docs/reference/components/ACCORDION.md`

## Inventory: Component Documentation

### API references (`COMPONENT.md`)

- `ACCORDION.md`
- `BADGE.md`
- `BUTTON.md`
- `CHECKBOX.md`
- `ICON.md`
- `ICON_BUTTON.md`
- `SELECTBUTTON.md`
- `TABS.md`

### Implementation notes (`COMPONENT_IMPLEMENTATION.md`)

- `ACCORDION_IMPLEMENTATION.md`
- `BADGE_IMPLEMENTATION.md`
- `BUTTON_IMPLEMENTATION.md`
- `SELECTBUTTON_IMPLEMENTATION.md`
- `TABS_IMPLEMENTATION.md`

### Supplemental component docs

- `SELECTBUTTON_API.md`
- `SELECTBUTTON_RESEARCH.md`

### Coverage summary (based on component entry points)

| Component | API Doc | Implementation Doc | Notes |
| --- | --- | --- | --- |
| Accordion | ✅ `ACCORDION.md` | ✅ `ACCORDION_IMPLEMENTATION.md` | Complete. |
| Badge | ✅ `BADGE.md` | ✅ `BADGE_IMPLEMENTATION.md` | Complete. |
| Button | ✅ `BUTTON.md` | ✅ `BUTTON_IMPLEMENTATION.md` | Complete; README also includes a summary. |
| Card | ❌ (README only) | ❌ | Needs dedicated docs. |
| Checkbox | ✅ `CHECKBOX.md` | ❌ | Missing implementation doc. |
| Icon | ✅ `ICON.md` | ❌ | Missing implementation doc. |
| Icon Button | ✅ `ICON_BUTTON.md` | ❌ | Missing implementation doc. |
| Input | ❌ | ❌ | Needs both docs. |
| Layout | ❌ | ❌ | Needs layout component docs (Stack/Inline/Grid/Container). |
| Select | ❌ | ❌ | Needs both docs. |
| Select Button | ✅ `SELECTBUTTON.md` | ✅ `SELECTBUTTON_IMPLEMENTATION.md` | Complete; also has API + research supplements. |
| Tabs | ✅ `TABS.md` | ✅ `TABS_IMPLEMENTATION.md` | Complete. |

## Root README.md Audit

### Components documented only in `README.md`

- Button
- Card

### Extracted Button content

Includes:

- Overview and variants/sizes/colors.
- Import example and usage examples (HTML).
- Basic API table for inputs.

Missing vs standards:

- Outputs, types, and events.
- Accessibility section.
- Theming section (CSS vars).
- Advanced usage/real-world examples beyond basics.
- Implementation notes and performance characteristics.

### Extracted Card content

Includes:

- Overview and variants/elevation list.
- Import example and usage examples (HTML).
- Basic API table for inputs.

Missing vs standards:

- Outputs, types, and events.
- Accessibility section.
- Theming section (CSS vars).
- Composition guidance and real-world examples.
- Implementation notes and performance characteristics.

## Documentation Standards (Template Extraction)

From `BADGE.md` and `ACCORDION.md`, the standard structure includes:

1. **Title + Overview**
2. **Features** (bulleted, design + performance characteristics)
3. **Usage**
   - Import snippet
   - Basic example
4. **API Reference**
   - Inputs table
   - Outputs table (if applicable)
   - Types
5. **Examples**
   - Variants
   - Sizes
   - Advanced cases
6. **Theming**
   - CSS variables table
   - Theme override example
7. **Accessibility**
8. **Performance** (optional, often included in badge)
9. **Composition/Integration** (optional)

## Gap Analysis

| Component | API Doc | Implementation Doc | Quality | Gaps |
| --- | --- | --- | --- | --- |
| Button | ✅ | ✅ | Good | README still has duplicate partial docs. |
| Card | README only | None | Partial | Needs API + implementation docs. |
| Badge | ✅ | ✅ | Good | None. |
| Accordion | ✅ | ✅ | Good | None. |
| Tabs | ✅ | ✅ | Good | None. |
| Input | None | None | None | Needs API + implementation docs. |
| Select | None | None | None | Needs API + implementation docs. |
| Select Button | ✅ | ✅ | Good | None (optional: consolidate extra API/Research files). |
| Checkbox | ✅ | None | Partial | Needs implementation doc. |
| Icon | ✅ | None | Partial | Needs implementation doc. |
| Icon Button | ✅ | None | Partial | Needs implementation doc. |
| Layout (Stack/Inline/Grid/Container) | None | None | None | Needs docs per primitive. |

## Priority Order

1. **Input, Select, Card, Layout** (no docs or README-only; core primitives and common usage).
2. **Checkbox, Icon, Icon Button** (API present, missing implementation docs).
3. **Button README cleanup** (remove duplicate sections or point to component docs).
4. **SelectButton supplemental docs cleanup** (optional consolidation of API/Research into main docs).

## Notes

- `docs/reference/components/README.md` claims Button/Card are “existing” and documented, but they only live in `README.md` currently.
- `DOCUMENTATION_MAP.md` also points to Button/Card in the root README.
- Consider updating the component index and documentation map after Button/Card docs are created.

