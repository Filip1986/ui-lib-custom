# Standards — ui-lib-custom

> Engineering standards for the `ui-lib-custom` Angular component library.
> Project-specific rules and adaptations only — each file links to the platform standard for full rationale and examples.

---

| File                                   | Covers                                                                                               |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [CSS-STANDARDS.md](CSS-STANDARDS.md)   | Token system (`--uilib-*`), `ViewEncapsulation.None` rules, BEM, cascade layers, Stylelint           |
| [HTML-STANDARDS.md](HTML-STANDARDS.md) | Semantic HTML, ARIA obligations, keyboard patterns, content projection, accessibility                |
| [JS-STANDARDS.md](JS-STANDARDS.md)     | JavaScript runtime: memory cleanup, layout thrashing under `ViewEncapsulation.None`, data structures |

## Platform reference

The `platform` project hosts the authoritative, extended versions of the CSS, HTML, and JS standards with full rationale, code examples, and review checklists:

```
platform/docs/standards/CSS-STANDARDS.md
platform/docs/standards/HTML-STANDARDS.md
platform/docs/standards/JS-STANDARDS.md
platform/docs/standards/TS-STANDARDS.md
```

When a rule is not covered here, consult the platform standard. When the projects diverge, this document takes precedence.
