# JavaScript Runtime Standards — ui-lib-custom

> **Full rationale and examples:** See [`platform/docs/standards/JS-STANDARDS.md`](../../../platform/docs/standards/JS-STANDARDS.md) for the complete reference.
> This document covers the project-specific rules and adaptations for an **Angular component library** with `ViewEncapsulation.None`.

---

## Project context

`ui-lib-custom` is a component library, not an application. Components:

- Are created and destroyed frequently by consumers
- Run with `ViewEncapsulation.None` — all DOM manipulation is globally visible
- Must not create Web Workers (that is the consuming application's responsibility)
- Do not own fetch/SSR infrastructure — HTTP calls live in the demo app's services only

These constraints make three platform rules especially critical for this library.

---

## 1. Memory cleanup is non-negotiable

Library components are instantiated and destroyed far more often than application components. Every acquired resource must be released on destroy.

```typescript
private readonly destroyReference = inject(DestroyRef);

ngOnInit(): void {
  const observer = new ResizeObserver(this.handleResize.bind(this));
  observer.observe(this.host.nativeElement);

  // Without this — observer survives the component, leaks memory, and fires on the wrong DOM
  this.destroyReference.onDestroy((): void => observer.disconnect());
}
```

Apply this pattern to: `ResizeObserver`, `IntersectionObserver`, `MutationObserver`, `setInterval`, `setTimeout`, manually attached event listeners, and any `RxJS` subscription.

---

## 2. Layout thrashing — elevated risk under ViewEncapsulation.None

With `ViewEncapsulation.None`, component styles are global. Reads and writes to DOM geometry in library components can trigger layout recalculation that affects the entire consumer page. Be especially disciplined about the batch-reads-then-writes rule.

```typescript
// ❌ Forced layout on every iteration — affects the consumer's entire page layout
for (const row of this.rows()) {
  row.nativeElement.style.height = `${container.nativeElement.offsetHeight / this.rows().length}px`;
}

// ✅ Read once, then write
const rowHeight = container.nativeElement.offsetHeight / this.rows().length;
for (const row of this.rows()) {
  row.nativeElement.style.height = `${rowHeight}px`;
}
```

Use `ResizeObserver` for size detection — never poll `offsetWidth` / `offsetHeight`.

---

## 3. Web Workers — do not create them in library code

Library components must not instantiate `Worker` or `SharedWorker`. Web Workers are a consumer-application concern. If a heavy computation is needed (e.g., in a future data grid), expose a callback or injection token so consumers can provide their own worker strategy.

---

## AbortController — demo app and service code only

`AbortController` is relevant for HTTP calls made in the demo app's services. Any `fetch()` call in `projects/demo/` must pass a `signal:` — see platform standard §9 for the full pattern.

---

## All other rules

The following platform standard sections apply without project-specific modification:

| Section | Topic |
|---------|-------|
| §2 | The cost of JavaScript — bundle phases and tree-shaking discipline |
| §3 | Data structures — `Map`, `Set`, `WeakMap` over plain objects |
| §4 | `structuredClone()` over JSON round-trip |
| §6 | Event loop and scheduling — microtasks, yielding for long tasks |
| §8 | CSS over JS for animation — `transform`/`opacity` (enforced by Stylelint) |
| §11 | Native browser API preference over packages |
| §12 | Dependency hygiene — library bundles ship to consumers; every byte counts twice |
| §13 | Code predictability — stable shapes, `const`, composition |

---

## Review checklist additions (library-specific)

Extend the platform review checklist with:

- [ ] Observers, timers, and event listeners cleaned up via `DestroyRef.onDestroy()`
- [ ] No DOM geometry reads interspersed with writes in the same synchronous block
- [ ] `ResizeObserver` used for size detection — no polling of `offsetWidth` / `offsetHeight`
- [ ] No `Worker` instantiated in library code — consumer's responsibility
- [ ] New npm dependency size checked on bundlephobia before install (consumers pay the cost)

---

## See also

| Document | Why it relates |
|----------|----------------|
| [`platform/docs/standards/JS-STANDARDS.md`](../../../platform/docs/standards/JS-STANDARDS.md) | Full reference — all sections, rationale, and code examples |
| [`CSS-STANDARDS.md`](CSS-STANDARDS.md) | Animation rules and ViewEncapsulation.None CSS discipline |
| [`HTML-STANDARDS.md`](HTML-STANDARDS.md) | Template rules that interact with the DOM manipulation patterns here |
| [`LIBRARY_CONVENTIONS.md`](../../LIBRARY_CONVENTIONS.md) | Cross-entry-point, token, and cascade layer rules for this library |

*Last reviewed: 2026-05-24 — Document created.*

