# Breadcrumb

**Selector:** `ui-lib-breadcrumb`
**Package:** `ui-lib-custom/breadcrumb`
**Content projection:** yes — optional `<ng-template #separator>` for a custom separator character or element

> Items are driven by a `BreadcrumbItem[]` data array (not projected child components). Each item can be a router link, a plain URL anchor, or a command callback — all three navigation patterns are handled differently in the template.

## Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `items` | `BreadcrumbItem[]` | `[]` | Navigation items rendered after the optional `home` item |
| `home` | `BreadcrumbItem \| null` | `null` | Pinned first crumb; prepended to `items` internally |
| `variant` | `'material' \| 'bootstrap' \| 'minimal' \| null` | `null` | Visual variant; falls back to `ThemeConfigService` when null |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token |
| `styleClass` | `string \| null` | `null` | Extra CSS class appended to the host `<nav>` element |
| `ariaLabel` | `string` | `'Breadcrumb'` | Accessible label for the `<nav>` landmark |

**`BreadcrumbItem` shape:** `{ label?, icon?, url?, routerLink?, target?, command?, disabled?, styleClass? }`

## Outputs

| Name | Payload | Notes |
|------|---------|-------|
| `itemClick` | `BreadcrumbItemClickEvent` | Emitted on click or keyboard activation of any item; payload contains `{ item, originalEvent }` |

## Usage

```html
<!-- Data-driven breadcrumb -->
<ui-lib-breadcrumb [items]="crumbs" [home]="{ label: 'Home', routerLink: '/' }" />

<!-- Custom separator -->
<ui-lib-breadcrumb [items]="crumbs">
  <ng-template #separator>›</ng-template>
</ui-lib-breadcrumb>
```
