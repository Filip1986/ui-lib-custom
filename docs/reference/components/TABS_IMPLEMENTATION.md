# Tabs Implementation Notes

## Architecture
- Compound pattern: `ui-lib-tabs` hosts tablist and panels; projected `ui-lib-tab` carries label/content templates; `ui-lib-tab-panel` renders panels.
- Roving tabindex on tab triggers; orientation-aware keyboard map; animated indicator for material variant.
- Controlled/uncontrolled: `selectedIndex`/`selectedValue` vs `defaultIndex`/`defaultValue`; internal signal keeps state when uncontrolled.
- Lazy rendering: `lazy=false` eager; `lazy='unmount'` removes inactive panels; `lazy='keep-alive'` caches once rendered.
- Focus: stays on trigger by default; optional `focusPanelOnSelect` moves focus into active panel.
- Scroll detection: ResizeObserver updates overflow state; scroll position drives arrow enablement with rAF throttling and RTL normalization.
- Lazy resolution: effective lazy mode uses `tab.lazy ?? tabs.lazy`; panels use `uiLibTabContent` when present, otherwise projected content.

## Performance
- Standalone + OnPush + signals throughout; computed classes/ids only.
- Single host elements for tabs/panels; minimal DOM (buttons for triggers, direct panel hosts).
- Indicator updates scheduled via `queueMicrotask` to avoid layout thrash; only material variant computes indicator position.
- Lazy modes reduce DOM weight for large tab sets; `keep-alive` avoids remount cost.
- Large tab sets: arrows render only on overflow; scroll updates are batched in rAF; prefer `keep-alive` to avoid remount churn.

## Extension Points
- Styling via CSS vars (`--uilib-tabs-*`, `--uilib-tab-*`, `--uilib-tabs-indicator-*`); variants map to tokens.
- Slots: `uiLibTabLabel` template for custom labels (icons, stacks); panel content via projection.
- Events: `selectedChange`, `selectedIndexChange`, `tabClose`, `tabFocus` for external orchestration; controlled mode with `selectedValue` preferred for dynamic lists.
- Scroll behavior: `scrollBehavior='arrows'` renders prev/next buttons when overflow is detected; ResizeObserver drives visibility and disablement.
- Navigation mode: `mode='navigation'` skips panels and emits `navigate` on selection for router-driven UIs
- Future: primitives (`ui-lib-tab-list`) if deeper composition needed.
- Per-tab lazy: `ui-lib-tab[lazy]` overrides parent `lazy`; `uiLibTabContent` defers template instantiation until activation
