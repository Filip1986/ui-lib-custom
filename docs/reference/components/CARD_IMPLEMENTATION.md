# Card Implementation Notes

## Architecture
- Single `.card` root with header/body/footer sections (see `card.html`).
- Signal-based inputs with `computed()` class list generation.
- Optional header/footer rendering controlled by `showHeader`/`showFooter` signals.
- Close icon emits a `closed` output when clicked.
- `ViewEncapsulation.None` to allow CSS variables to cascade across slots.

## Styling Strategy
- SCSS defines base variables on `:host` and applies layout in `.card`.
- Variants (`card-material`, `card-bootstrap`, `card-minimal`) adjust radius, borders, and backgrounds.
- Elevation classes map to shadow tokens with hover overrides.
- Hover state uses `transform: translateY(-2px)` and `--uilib-card-shadow-hover`.
- Header/footer backgrounds are configurable via CSS vars and inline styles.

## Performance
- `ChangeDetectionStrategy.OnPush` plus signal inputs.
- Minimal DOM: header/footer only render when enabled.
- No subscriptions; `computed()` memoizes class lists.

## Accessibility Implementation
- Semantic projection: slots allow consumers to use headings, lists, and buttons.
- Close icon is a button-like icon; pair with descriptive header text.
- Focus handling relies on native focusable elements inside card content.

## Variant Differences

| Aspect | Material | Bootstrap | Minimal |
| --- | --- | --- | --- |
| Border radius | `--uilib-radius-md` | `--uilib-radius-sm` | `0` |
| Border width | `0` | `1px` | `0` (uses inset separators) |
| Header/footer bg | `surface-alt` | `surface-alt` | `card-bg` |
| Shadow | medium/high | token-driven + border | none/low |

## Extension Points
- Override `--uilib-card-*` CSS vars on host or theme scopes.
- Use `headerBg`/`footerBg` inputs to set inline overrides.
- Provide custom header/footer markup via slots.

## Testing
- Spec coverage in `projects/ui-lib-custom/src/lib/card/card.spec.ts`.
- Key scenarios:
  - Class application for variant/elevation/border/hover.
  - Header/footer slot projection.
- Run tests:
  - `npm test`

## Known Limitations
- No internal focus management; relies on content elements.
- `closed` output does not remove the card; parent must react.

## Future Enhancements
- Add optional action slots for header/footer utilities.
- Provide density presets for padding.
- Add a dedicated interactive card mode with keyboard focus style.

