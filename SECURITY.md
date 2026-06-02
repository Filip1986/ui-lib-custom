# Security Policy — ui-lib-custom

## Supported Versions

| Version  | Supported              |
| -------- | ---------------------- |
| latest   | ✅                     |
| < latest | ❌ — upgrade to latest |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Report vulnerabilities privately via GitHub's
[Security Advisory](../../security/advisories/new) feature, or by emailing
**hello@artificialsense.ai**.

Include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested remediation

You will receive a response within 48 hours. We appreciate responsible disclosure.

---

## Library-Specific Security Notes

### ViewEncapsulation.None — Global CSS Risk

`ui-lib-custom` uses `ViewEncapsulation.None` across all components. This means component styles
are injected globally. To prevent style leakage:

- All selectors use the `uilib-` prefix (e.g. `.uilib-button`)
- BEM naming prevents accidental overrides
- No global resets or `*` selectors are allowed in component styles
- **Never bypass this convention** — it affects all consumers' applications

### No innerHTML Binding

Components must never use `[innerHTML]` binding without explicit Angular `DomSanitizer` sanitization.
If a component needs to render user-controlled HTML, use `DomSanitizer.bypassSecurityTrustHtml()`
only after thorough review, and document the decision.

### No Direct DOM Manipulation

Direct DOM manipulation via `document.querySelector` or `element.nativeElement.innerHTML` is
forbidden. Always use Angular's `Renderer2` if DOM access is unavoidable.

### Peer Dependency Security

Wide peer dependency ranges (`^18 || ^19 || ^20`) mean consumers may use vulnerable versions.

- Publish security advisories when a peer dependency has a critical CVE
- Document minimum safe versions in the advisory

### Vulnerability in the Published Package

If a security vulnerability is discovered in the published npm package `ui-lib-custom`:

1. Fix the vulnerability on a private branch
2. Coordinate with the reporter on a disclosure timeline
3. Publish a patched version
4. Create a GitHub Security Advisory with CVE information

---

## Angular Security Best Practices Applied in This Library

- Content Security Policy (CSP) compatible — no inline scripts or eval
- Sanitization: Angular's built-in XSS protection is respected
- No use of `CUSTOM_ELEMENTS_SCHEMA` (bypasses Angular template security)
- No use of `NO_ERRORS_SCHEMA` in production code
