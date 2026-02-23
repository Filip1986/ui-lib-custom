# Encapsulation Audit (ViewEncapsulation.None)

Date: 2026-02-24

All component SCSS files were audited to ensure every rule is host-scoped and no global selectors or unprefixed keyframes remain. Any leaking selectors were updated to start with `:host` (or `:host-context` where variant context is required). No `:root` declarations were found in component styles; global token declarations remain in theme files only.

| Component | SCSS file | Status | Notes |
| --- | --- | --- | --- |
| Accordion | projects/ui-lib-custom/src/lib/accordion/accordion.scss | Fixed | Removed unscoped `.ui-lib-accordion` selector. |
| Accordion Panel | projects/ui-lib-custom/src/lib/accordion/accordion-panel.scss | Fixed | Scoped panel styles and variant overrides; removed global selectors. |
| Alert | projects/ui-lib-custom/src/lib/alert/alert.scss | Fixed | Scoped host and child selectors. |
| Badge | projects/ui-lib-custom/src/lib/badge/badge.scss | Pass | Already host-scoped. |
| Button | projects/ui-lib-custom/src/lib/button/button.scss | Fixed | Scoped selectors and prefixed keyframes to `uilib-*`. |
| Button Group | projects/ui-lib-custom/src/lib/button-group/button-group.scss | Fixed | Scoped `.btn-group` selectors. |
| Card | projects/ui-lib-custom/src/lib/card/card.scss | Fixed | Scoped `.card` selector to host. |
| Checkbox | projects/ui-lib-custom/src/lib/checkbox/checkbox.scss | Fixed | Scoped internal element selectors to host. |
| Container | projects/ui-lib-custom/src/lib/layout/container.scss | Pass | Mixins only (no selectors). |
| Grid | projects/ui-lib-custom/src/lib/layout/grid.scss | Pass | Mixins only (no selectors). |
| Icon | projects/ui-lib-custom/src/lib/icon/icon.scss | Fixed | Scoped `.ui-lib-icon` selectors. |
| Icon Button | projects/ui-lib-custom/src/lib/icon-button/icon-button.scss | Fixed | Scoped `.icon-button` selectors. |
| Inline | projects/ui-lib-custom/src/lib/layout/inline.scss | Pass | Mixins only (no selectors). |
| Input | projects/ui-lib-custom/src/lib/input/input.scss | Fixed | Scoped `.ui-input` and state selectors to host. |
| Login | projects/ui-lib-custom/src/lib/login/login.component.scss | Fixed | Removed `::ng-deep`, scoped selectors to host. |
| Login 1 | projects/ui-lib-custom/src/lib/login/login-1/login-1.component.scss | Fixed | Scoped login layout selectors to host. |
| Login 2 | projects/ui-lib-custom/src/lib/login/login-2/login-2.component.scss | Fixed | Scoped login layout selectors to host. |
| Login 3 | projects/ui-lib-custom/src/lib/login/login-3/login-3.component.scss | Fixed | Scoped login layout selectors to host. |
| Login Factory | projects/ui-lib-custom/src/lib/login/login-factory/login-factory.component.scss | Pass | Host-only selector. |
| Login Form | projects/ui-lib-custom/src/lib/login-form/login-form.scss | Fixed | Scoped login form selectors to host. |
| Select | projects/ui-lib-custom/src/lib/select/select.scss | Fixed | Scoped selectors and prefixed keyframes to `uilib-select-spin`. |
| Select Button | projects/ui-lib-custom/src/lib/select-button/select-button.scss | Fixed | Scoped selectors to host and host state classes. |
| Sidebar Menu | projects/ui-lib-custom/src/lib/sidebar-menu/sidebar-menu.scss | Fixed | Scoped selectors to host. |
| Stack | projects/ui-lib-custom/src/lib/layout/stack.scss | Pass | Mixins only (no selectors). |
| Tabs | projects/ui-lib-custom/src/lib/tabs/tabs.scss | Fixed | Scoped all selectors to host. |

Notes:
- Keyframes are now prefixed with `uilib-` (`uilib-btn-spin`, `uilib-spin`, `uilib-select-spin`).
- No global selectors (`*, body, html`) or component-level `:root` declarations remain in component SCSS files.

