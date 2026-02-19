# Accordion Implementation Notes

## Architecture
- Compound structure: `ui-lib-accordion` container managing expansion + keyboard focus; `ui-lib-accordion-panel` items render headers and content.
- Container provides context via `ACCORDION_CONTEXT` so panels can toggle, query expansion, and receive variant/size/expandMode.
- Panels register/unregister with the container; ids resolve from `value` or generated uuid/counter.

## Communication Pattern
- Context injection shares callbacks (`togglePanel`, `isPanelExpanded`, `focusHeader`) and signals (variant, size, expandMode).
- Container computes panel contexts with `contentChildren(AccordionPanel)` and `computed()` to keep state memoized.
- Toggling routes through container to respect expand mode (single clears others, multiple maintains a Set) and emits `panelToggle` + `expandedChange`.

## Performance
- Standalone + `ChangeDetectionStrategy.OnPush` everywhere.
- Signal-based inputs; derived state via `computed()`; expansion set stored as `Set<string>` for O(1) lookups.
- No subscriptions; effects confined to syncing controlled inputs and enforcing single-mode constraint.
- Minimal DOM: header button + content region; host classes computed once.

## Performance Characteristics

### Bundle Impact
- Component size: X KB (gzipped).
- Dependencies: `ui-lib-icon`.

### Runtime
- Change detection: OnPush.
- Signals: inputs + computed selection state.
- DOM nodes: header + content per panel.

### Benchmarks
- Initial render: X ms.
- Re-render on input change: X ms.

## Animation Strategy
- CSS-only expand/collapse using grid-row technique: `.accordion-panel-content` switches `grid-template-rows` between `0fr` and `1fr` with transition vars (`--uilib-accordion-content-animation-duration`, `--uilib-accordion-content-animation-easing`).
- Content fades in/out via opacity (`--uilib-accordion-content-fade-duration`) to reduce perceived layout jumps.
- Toggle icons cross-fade between `collapseIcon` and `expandIcon` layers with `--uilib-accordion-icon-animation-duration` and `--uilib-accordion-icon-animation-easing`.
- `will-change: grid-template-rows, opacity` is applied to content for smoother transitions on large panels.
- `accordionToggleIcon` template allows fully custom icon content.
- `prefers-reduced-motion` disables icon/content transitions when requested.

## Extension Points
- Theming via CSS vars (`--uilib-accordion-*`); variants map defaults for elevation, borders, spacing.
- Panel headers accept projected `accordionHeader` template for fully custom layouts (icons, metadata, actions).
- Custom toggle icon content via `accordionToggleIcon` template.
- `iconPosition` controls icon placement (default `end`).

## Future Enhancements
- Add `collapsible=false` option for single mode to keep one panel always open.
- Expose roving tabindex hints for better focus restoration after dynamic list changes.
- Optional lazy content rendering for heavy panel bodies.
- Demo: add async loading example and density controls.

## Backward Compatibility
- Existing headers/content and expand behavior continue to work.
- **Breaking:** icon placement default is now `end`; use `iconPosition="start"` to preserve prior layouts.
