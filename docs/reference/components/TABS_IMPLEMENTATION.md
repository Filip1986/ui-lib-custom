# Tabs Implementation Notes

## Architecture
- Compound component: `ui-lib-tabs` hosts the tablist and panels; projected `ui-lib-tab` provides label/content templates; `ui-lib-tab-panel` renders each panel.
- Context is computed from `contentChildren(Tab)`; each tab context includes value, index, lazy mode, label template, and content template.
- Selection is controlled or uncontrolled:
  - Controlled: `selectedValue`/`selectedIndex`.
  - Uncontrolled: `defaultValue`/`defaultIndex` with internal signal state.
- Panel lazy loading supports eager (`false`), unmount, and keep-alive.

## Communication Pattern
- Tabs collect child `Tab` instances via `contentChildren(Tab)` and map them into `tabContexts`.
- Clicking a tab calls `onSelect(tab)`, updates selection, and emits `selectedChange` + `selectedIndexChange`.
- `ui-lib-tab-panel` receives `id`, `labelId`, and `active` bindings; panels map to tabs by index.
- Per-tab inputs (`value`, `label`, `disabled`, `closable`, `lazy`) override parent defaults.

## Scrollable Tabs
- Overflow detection uses `ResizeObserver` + scroll metrics to compute `overflowDetected`, `canScrollPrev`, and `canScrollNext`.
- Scroll arrows render only when `scrollBehavior="arrows"` and overflow is detected.
- Scroll state updates are throttled with `requestAnimationFrame` to avoid layout thrash.
- RTL support detects scroll axis behavior and normalizes scroll positions for correct arrow enablement.

## Navigation Mode
- `mode="navigation"` renders the tab list only; panels are skipped.
- Selection emits `navigate` for router-driven flows.
- Use navigation mode when tabs map to routes and content is rendered by the router.

## Lazy Loading
- Global `lazy` mode controls panel rendering (eager, unmount, keep-alive).
- Per-tab lazy (`ui-lib-tab[lazy]`) overrides the parent mode.
- `uiLibTabContent` defers heavy templates until activation; default content uses projected content.
- Keep-alive caches rendered panels in `renderedValues` to avoid re-instantiation.

## Animation Strategy
- Material variant uses an indicator element with animated `transform` and `width`.
- Panel visibility toggles via `.tab-panel-active` + `display` to avoid layout cost.
- Reduced motion is respected via CSS rules in `tabs.scss`.

## Keyboard Navigation
- Arrow keys move focus across tabs (Left/Right or Up/Down for vertical).
- Home/End jump to first/last enabled tab.
- Enter/Space activates the focused tab.
- Roving tabindex ensures only the active tab is focusable.

## Accessibility Implementation
- `role="tablist"` on the tab list, `role="tab"` on triggers, `role="tabpanel"` on panels.
- `aria-selected`, `aria-controls`, and `aria-labelledby` are kept in sync.
- Disabled tabs set `aria-disabled="true"` and are skipped by roving focus.
- Focus-visible uses `--uilib-focus-ring-color` tokens.

## Performance
- `ChangeDetectionStrategy.OnPush` with signal-based state.
- `computed()` memoizes class strings, selection state, and context lists.
- Lazy modes reduce DOM weight for large tab sets.
- Indicator updates are scheduled with `queueMicrotask` to avoid layout thrash.

## Performance Characteristics

### Bundle Impact
- Component size: X KB (gzipped).
- Dependencies: `ui-lib-icon` (scroll arrows), `ui-lib-tab-panel`.

### Runtime
- Change detection: OnPush.
- Signals: inputs + computed selection/contexts.
- DOM nodes: tab buttons + optional panels.

### Benchmarks
- Initial render: X ms.
- Re-render on selection change: X ms.

## Extension Points
- Custom labels via `uiLibTabLabel` template.
- Lazy content via `uiLibTabContent` template.
- Style customization with `--uilib-tabs-*`, `--uilib-tab-*`, and `--uilib-tabs-indicator-*` variables.
- Navigation mode for router-driven UX.
