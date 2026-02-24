# API Consistency Audit

Date: 2026-02-24

Scope: All components under `projects/ui-lib-custom/src/lib/`.

Legend:
- Yes/No: matches column requirement exactly.
- N/A: not applicable for the component.
- Token: no explicit shape input, but component honors global shape/radius tokens.
- Note: variant/size present but uses non-standard values.

| Component | Has `variant` input (material/bootstrap/minimal)? | Has `size` input (sm/md/lg)? | Has `disabled` input? | Has `severity/color` input where applicable? | Has `shape` input or honors global shape token? | Input names follow conventions? | Output names camelCase? | Inputs explicitly typed? | Inputs have defaults? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `ui-lib-button` | Yes | Yes (sm/md/lg + legacy) | Yes | Yes (severity/color) | Yes (rounded + tokens) | Yes (legacy alias kept) | N/A | Yes | Yes |
| `ui-lib-button-group` | Yes | Yes (sm/md/lg + legacy) | No | N/A | Token (buttons) | Yes | N/A | Yes | Yes |
| `ui-lib-card` | Yes | No | No | N/A | Token | Yes | Yes (`closed`) | Yes | Yes |
| `ui-lib-checkbox` | Yes | Yes (sm/md/lg) | Yes | N/A | Token | Yes | N/A | Yes | Yes |
| `ui-lib-input` | Yes | Yes (sm/md/lg) | Yes | N/A | Token | Yes | N/A | Yes | Yes |
| `ui-lib-select` | Yes | Yes (sm/md/lg) | Yes | N/A | Token | Yes | N/A | Yes | Yes |
| `ui-lib-select-button` | Yes | Yes (sm/md/lg + legacy) | Yes | N/A | Token | Yes | Yes (`onChange`, `valueChange`) | Yes | Yes |
| `ui-lib-badge` | No (solid/outline/subtle) | Yes (sm/md/lg) | No | Yes (color) | Yes (pill/dot + tokens) | Yes | N/A | Yes | Yes |
| `ui-lib-alert` | Yes | No | No | Yes (severity) | Token | Yes | Yes (`dismissed`) | Yes | Yes |
| `ui-lib-tabs` | Yes | Yes (sm/md/lg + legacy) | Yes | N/A | Token | Yes | Yes | Yes | Yes |
| `ui-lib-tab` | No | No | Yes | N/A | N/A | Yes | N/A | Yes | Yes |
| `ui-lib-tab-panel` | No | No | No | N/A | N/A | Yes | N/A | Yes | Yes |
| `ui-lib-accordion` | Yes | Yes (sm/md/lg) | No | N/A | Token | Yes | Yes (`expandedChange`, `panelToggle`) | Yes | Yes |
| `ui-lib-accordion-panel` | No | No | Yes | N/A | Token | Yes | N/A | Yes | Yes |
| `ui-lib-icon` | Yes (component variant) | Yes (xs–2xl) | No | Yes (color) | N/A | Yes | N/A | Yes | Yes |
| `ui-lib-icon-button` | Yes | Yes (sm/md/lg) | Yes | Yes (color) | Token | Yes | N/A | Yes | Yes |
| `ui-lib-stack` | No | No | No | N/A | N/A | Yes | N/A | Yes | Yes |
| `ui-lib-inline` | No | No | No | N/A | N/A | Yes | N/A | Yes | Yes |
| `ui-lib-grid` | No | No | No | N/A | N/A | Yes | N/A | Yes | Yes |
| `ui-lib-container` | No (size is ContainerSize) | No (uses container sizes) | No | N/A | N/A | Yes | N/A | Yes | Yes |
| `ui-lib-sidebar-menu` | No (classic/compact/modern) | No | No | N/A | Token | Yes | N/A | Yes | Yes |
| `ui-lib-form-field` | No | No | No | N/A | N/A | Yes | N/A | Yes | Yes |
| `ui-lib-login-form` | No (centered/split/minimal) | No | No | N/A | Token | Yes | Yes (`login`, `forgotPassword`, `socialLogin`) | Yes | Yes |
| `lib-login` | No (variant 1/2/3) | No | No | N/A | Token | Yes | Yes | Yes | Yes |
| `lib-login-factory` | No (variant 1/2/3) | No | No | N/A | Token | Yes | Yes | Yes | Yes |
| `lib-login-1` | No | No | No | N/A | Token | Yes | Yes (inherited) | Yes | Yes |
| `lib-login-2` | No | No | No | N/A | Token | Yes | Yes (inherited) | Yes | Yes |
| `lib-login-3` | No | No | No | N/A | Token | Yes | Yes (inherited) | Yes | Yes |

Notes:
- Standard size inputs are now `sm | md | lg` with legacy values retained where needed.
- Boolean inputs default to `false` unless the input is intentionally nullable (tri-state).
- Deprecated alias kept for `ui-lib-button` (`iconOnlyInput` -> `iconOnly`).

