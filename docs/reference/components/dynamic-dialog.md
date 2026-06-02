# Dynamic Dialog

**Selector:** `ui-lib-dynamic-dialog`
**Entry point:** `import { DynamicDialog } from 'ui-lib-custom/dynamic-dialog'`

---

## Overview

Internal shell component rendered by DialogService.open(). This component is NOT intended to be placed in templates directly. Use DialogService.open(SomeComponent, config) instead.

## API

### Inputs

| Name            | Type           | Default | Description |
| --------------- | -------------- | ------- | ----------- | ------------------------------------------------------------- |
| `componentType` | `Type<unknown> | null`   | `null`      | @internal — set by DialogService via ComponentRef.setInput(). |

### Outputs

_none_

## Content Projection

_none_

## Theming

_No component-level CSS variables detected._

## Accessibility

**APG pattern:** https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

### Keyboard Interactions

| Test description                                                                            |
| ------------------------------------------------------------------------------------------- |
| Escape key closes the dialog                                                                |
| Escape key from inside guest component content closes the dialog                            |
| Shift+Tab wraps from first focusable element back to last inside the panel                  |
| Tab wraps from last focusable element back to first inside the panel                        |
| activateFocusTrap() focuses the panel itself when no focusable child exists                 |
| activateFocusTrap() moves focus to the first focusable element inside the panel             |
| close button SVG icon is aria-hidden                                                        |
| close button has aria-label=                                                                |
| close button receives focus via FocusTrap when closable=true and no other focusable element |
| documents intentional axe rule skips                                                        |
| non-Escape key does not close the dialog                                                    |
| panel has aria-describedby when ariaDescribedby is configured                               |
| panel has aria-label=                                                                       |
| panel has aria-labelledby pointing to the title element when header is provided             |
| panel has aria-modal=                                                                       |
| panel has no aria-describedby when ariaDescribedby is not configured                        |
| panel has no aria-label when header text is present (aria-labelledby takes over)            |
| panel has no aria-labelledby when no header is provided                                     |
| panel has no aria-modal when modal=false                                                    |
| panel has role=                                                                             |
| panel has tabindex=                                                                         |
| panel uses config.ariaLabel when no header is provided                                      |
| passes axe when ariaDescribedby is configured                                               |
| passes axe when modal=false (non-modal) with header                                         |
| passes axe when modal=true with header                                                      |
| passes axe when no header and ariaLabel is provided                                         |
| restores focus to the trigger element when the dialog closes                                |
| should NOT close when a key other than Escape is pressed                                    |
| should apply the default center position class when position is not specified               |
| should apply the variant class to the panel                                                 |
| should call ref.close() when Escape is pressed on the panel                                 |

## Usage Examples

```typescript
import { DialogService } from 'ui-lib-custom/dynamic-dialog';

@Component({
  providers: [DialogService],
  template: `<ui-lib-button (click)="open()">Open Dialog</ui-lib-button>`,
})
export class MyComponent {
  private dialog = inject(DialogService);

  open(): void {
    const ref = this.dialog.open(MyDialogContentComponent, {
      header: 'Edit User',
      width: '480px',
      data: { userId: 42 },
    });
    ref.onClose.subscribe((result) => {
      if (result) this.save(result);
    });
  }
}
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#dynamic-dialog)
- [Demo page](/components/dynamic-dialog)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/dynamic-dialog/README.md)
