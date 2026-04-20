# Chart Research (PrimeNG v19 + Chart.js v4)

Source analyzed:
- PrimeNG (via `npm pack primeng@19`):
  - `package/chart/chart.d.ts`
  - `package/fesm2022/primeng-chart.mjs`
- Chart.js (via `npm pack chart.js@4`):
  - `package/dist/index.d.ts`
  - `package/dist/types/index.d.ts`

## 1) PrimeNG Chart API Surface

### Component selector and role
- Selector: `p-chart`
- Rendering element: `<canvas role="img">`
- Accessibility inputs: `ariaLabel`, `ariaLabelledBy`

### Inputs (public)

| Input | Type | Default (from implementation) | Notes |
|---|---|---:|---|
| `type` | `'bar' \| 'line' \| 'scatter' \| 'bubble' \| 'pie' \| 'doughnut' \| 'polarArea' \| 'radar' \| undefined` | `undefined` | Chart.js chart type passed into constructor config |
| `plugins` | `any[]` | `[]` | Per-instance plugin array passed to Chart.js config |
| `width` | `string \| undefined` | `undefined` | Applied to wrapper and canvas width when responsive sizing is overridden |
| `height` | `string \| undefined` | `undefined` | Applied to wrapper and canvas height when responsive sizing is overridden |
| `responsive` | `boolean` | `true` | Intended to toggle responsive redraw behavior |
| `ariaLabel` | `string \| undefined` | `undefined` | Mapped to canvas `aria-label` |
| `ariaLabelledBy` | `string \| undefined` | `undefined` | Mapped to canvas `aria-labelledby` |
| `data` | `any` | `undefined` | Setter calls `reinit()` after assignment |
| `options` | `any` | `{}` | Setter calls `reinit()` after assignment |

### Outputs (public)

| Output | Type | Emission behavior |
|---|---|---|
| `onDataSelect` | `EventEmitter<any>` | Emitted on canvas click when nearest element and dataset info are available |

Observed payload shape:
- `originalEvent: Event`
- `element: InteractionItem` (first nearest hit)
- `dataset: InteractionItem[]` (dataset mode hit result)

### Template/projection slots
- No template keys/slots are exposed.
- No content projection points (`ng-content`) in the template.

### Public methods (declared)

| Method | Purpose |
|---|---|
| `getCanvas()` | Returns underlying canvas element |
| `getBase64Image()` | Proxies to `chart.toBase64Image()` |
| `generateLegend()` | Proxies to `chart.generateLegend()` |
| `refresh()` | Calls `chart.update()` |
| `reinit()` | Calls `chart.destroy()` then `initChart()` |

### Lifecycle and Chart.js wrapping behavior
- `ngAfterViewInit()` initializes chart once and sets `initialized = true`.
- `data` and `options` setters call `reinit()`, so updates are implemented as full destroy + recreate.
- `ngOnDestroy()` destroys chart and clears internal reference.
- Chart creation is executed in `NgZone.runOutsideAngular(...)`.
- PrimeNG imports `Chart` from `chart.js/auto`, which auto-registers all built-in controllers/elements/plugins/scales.

### Responsive behavior in PrimeNG wrapper
- `responsive` defaults to `true`.
- In `initChart()`, wrapper logic mutates `opts.responsive` and `opts.maintainAspectRatio` when width/height are set.
- Actual constructor call passes `options: this.options`; this means responsive mutations only apply when `this.options` is an object reference that got mutated through `opts`.

### Underlying Chart.js instance exposure
- Internal instance stored as `chart: any`.
- Read access is indirect through helper methods (`getCanvas`, `getBase64Image`, `generateLegend`, `refresh`) rather than a typed public signal/input model.

---

## 2) Chart.js v4 API Surface (Research Notes)

### Constructor and generics
From `dist/types/index.d.ts`:
- `new Chart<TType, TData, TLabel>(item, config)` where:
  - `item: ChartItem` (`string`, `CanvasRenderingContext2D`, `HTMLCanvasElement`, `{ canvas }`, or array-like)
  - `config: ChartConfiguration<TType, TData, TLabel> | ChartConfigurationCustomTypesPerDataset<...>`

### Registration system
- `Chart.register(...items)` and `Chart.unregister(...items)` are static APIs.
- `registerables` exports the built-in registrable set.
- `chart.js/auto` auto-registers built-ins (easy mode, larger bundle).
- `chart.js` + explicit `register(...)` enables tree-shakable selective registration.

### Lifecycle APIs
- Instance lifecycle methods include:
  - `update(mode?)`
  - `resize(width?, height?)`
  - `destroy()`
  - `render()`, `draw()`, `reset()`, `clear()`, `stop()`

### Defaults and overrides
- Static globals:
  - `Chart.defaults`
  - `Chart.overrides`
- Also exported singleton defaults object:
  - `defaults` (typed as `Defaults`)

### Supported chart types (core registry)
From `ChartTypeRegistry`:
- `bar`
- `line`
- `scatter`
- `bubble`
- `pie`
- `doughnut`
- `polarArea`
- `radar`

### Data and options typing model
- `ChartType` is `keyof ChartTypeRegistry`.
- `ChartData`, `ChartDataset`, and `ChartOptions` are generic and keyed by chart type.
- Dataset/chart option contracts vary by chart type via `ChartTypeRegistry`.

### Plugin architecture
- Plugin contract is typed via `Plugin<TType, O>` with mandatory `id`.
- Supports extensive lifecycle hooks: install/start/stop, before/after init/update/render/draw/destroy, event hooks, resize hook, dataset hooks, etc.
- Plugin options are integrated into chart options via plugin option maps.

### Responsive and resize behavior
- Runtime `chart.resize(...)` API is available.
- Responsive behavior is primarily configured through chart options (`responsive`, `maintainAspectRatio`, resize callbacks, etc.).

### Animation options
- Animation configuration appears at multiple levels in options typing:
  - `animation`
  - `animations`
  - `transitions`
- Specific controllers can also narrow animation option types.

---

## 3) Convention Divergences for `ui-lib-custom`

1. Input API style
- PrimeNG uses `@Input()` / `@Output()` decorators and `EventEmitter`.
- `ui-lib-custom` must use signal APIs: `input()`, `model()`, `output()`.

2. Typing strictness
- PrimeNG uses broad `any` for `data`, `options`, and `plugins`.
- `ui-lib-custom` should strongly type generics around `ChartType`, `ChartData`, `ChartOptions`, and plugin signatures.

3. Registration strategy
- PrimeNG imports from `chart.js/auto` (global all-in registration).
- `ui-lib-custom` design requires tree-shakable consumer registration (`chart.js` + explicit `Chart.register(...)`), with optional convenience helper (`provideChartDefaults()`).

4. Styling and theming bridge
- PrimeNG mostly forwards raw Chart.js options and uses limited wrapper styling.
- `ui-lib-custom` should map `--uilib-chart-*` CSS variables through a pure logic `ChartThemeService` into Chart.js options.

5. Update model
- PrimeNG uses full reinit (`destroy` + `new Chart`) for `data`/`options` setter changes.
- `ui-lib-custom` can prefer signal-driven incremental updates where safe and reserve reinit for structural changes.

6. Template extensibility
- PrimeNG `p-chart` exposes no template slots.
- `ui-lib-custom` can still keep wrapper minimal, but if extension points are needed they should use explicit content projection patterns consistent with library conventions.

7. Size/variant vocabulary conventions
- PrimeNG chart itself does not expose visual `size`/`variant` inputs.
- `ui-lib-custom` conventions still apply globally when any chart wrapper-level visual API is introduced:
  - size tokens: `sm` / `md` / `lg`
  - avoid Prime-style `small` / `large`
  - keep `filled` as boolean if such styling is introduced (do not use Prime `filled|outlined` variant style naming)

---

## 4) `ui-lib-custom` Value-Add over PrimeNG Wrapper

1. `ChartThemeService` (pure logic)
- Reads computed CSS variables from host/scope element.
- Produces partial Chart.js options (text color, grid color, tooltip palette, border colors, font defaults).
- Keeps theming deterministic and unit-testable without Angular runtime coupling.

2. Generic + typed convenience wrappers
- Generic `<ui-lib-chart>` for full flexibility.
- Convenience wrappers (`bar`, `line`, `pie`, `doughnut`) reduce consumer typing friction and provide stronger defaults.

3. Signal-driven reactivity
- Reacts to `data`, `options`, and theme changes using signals/computed/effects.
- Enables controlled update strategy (incremental `chart.update()` vs explicit reinit paths).

4. Registration ergonomics with tree-shaking
- Avoid hidden global registration side effects.
- Provide documented selective registration and optional helper (`provideChartDefaults()`) for common setups.

5. Better typed public API
- Replace `any`-heavy surface with explicit unions/generics and narrow event payload types.

---

## 5) Risks and Edge Cases to Track

1. Canvas sizing and responsive rules
- Wrapper width/height overrides can conflict with responsive defaults.
- Must define deterministic behavior for `height`/`width` + `responsive` + `maintainAspectRatio`.

2. Update-vs-recreate boundaries
- Some chart option/data shape changes are safer via full reinit.
- Need explicit rules to avoid stale scales/controllers or plugin state issues.

3. Theme updates performance
- Frequent CSS variable changes should batch chart updates to avoid repaint thrash.

4. Plugin typing and pass-through
- Keep plugin option typings strict while still allowing consumer plugin ecosystems.

5. SSR/browser guards
- Chart.js requires DOM canvas APIs; component must guard initialization in non-browser contexts.

---

## 6) Notes for Prompt 2

- Add Chart.js as:
  - root `devDependency` (for local build/tests/demo)
  - library `peerDependency` in `projects/ui-lib-custom/package.json`
- Create pure `ChartThemeService` (no Angular imports), with API shaped like:
  - read CSS vars from `Element`
  - return typed `DeepPartial<ChartOptions<TType>>`
- Define shared chart public types (`chart.types.ts`) with explicit unions and event payload interfaces.
- Decide update strategy matrix (when to `chart.update()` vs `destroy()+new Chart`).
- Keep chart registration opt-in; do not register globally in the component.

