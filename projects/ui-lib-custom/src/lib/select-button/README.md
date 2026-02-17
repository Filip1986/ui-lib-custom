# SelectButton

Minimal usage example:

```html
<ui-lib-select-button
  [options]="options"
  optionLabel="label"
  optionValue="value"
  [(value)]="value"
/>
```

Custom item template:

```html
<ui-lib-select-button [options]="options" [(value)]="value">
  <ng-template #item let-option>
    {{ option.label }}
  </ng-template>
</ui-lib-select-button>
```
