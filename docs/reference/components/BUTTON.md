# Button Theming (CSS Variables)

This button implementation is fully driven by CSS custom properties so changing theme variables updates every severity without rebuilds.

## Core variables
- Colors: `--uilib-button-{primary|secondary|success|danger|warning}-{bg|bg-hover|bg-active|border|fg}`
- Radius: `--uilib-button-radius` (falls back to `--uilib-radius-md`)
- Shadows: `--uilib-button-shadow`, `--uilib-button-shadow-hover`
- Focus: `--uilib-button-focus-color`, `--uilib-button-focus-ring`, `--uilib-button-focus-ring-color`
- Sizes: `--uilib-button-padding-{small|medium|large}`, `--uilib-button-font-size-{small|medium|large}`
- Layout: `--uilib-button-gap`, `--uilib-button-border-width`, `--uilib-button-border-style`, `--uilib-button-text-transform`, `--uilib-button-letter-spacing`

## Severity classes
- `.btn-primary|secondary|success|danger|warning` pick up the matching `--uilib-button-*` variables.
- Appearance modifiers (`-appearance-outline`, `-appearance-ghost`) rely on the same variables and do not introduce new colors.

## Variants
- `.btn-material`: adjusts `--uilib-button-shadow`, `--uilib-button-shadow-hover`, text transform, and letter spacing.
- `.btn-bootstrap`: narrows the radius via `--uilib-button-radius` and keeps solid borders.
- `.btn-minimal`: removes shadows and uses transparent backgrounds while still reading `--btn-*` severity variables for color.

## Sizing
Use `.btn-small`, `.btn-medium`, `.btn-large` to switch padding and font sizes via the size variables above.

## Theming
`projects/ui-lib-custom/src/lib/themes/themes.css` defines defaults for light/dark, including active states and size variables. Updating `--uilib-color-primary` (or any mapped color) propagates through the button variables automatically.

## Tips
- Override variables at `:root`, `[data-theme]`, or a scoped container to preview themes side-by-side.
- To customize a single instance, set inline styles like `style="--uilib-button-primary-bg: var(--uilib-color-primary-500);"`.
