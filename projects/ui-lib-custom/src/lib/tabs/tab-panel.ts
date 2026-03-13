import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  input,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import type { InputSignal, Signal } from '@angular/core';

/**
 * Tab panel content container tied to a tab trigger.
 */
@Component({
  selector: 'ui-lib-tab-panel',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'panelClasses()',
    '[attr.role]': '"tabpanel"',
    '[attr.tabindex]': 'active() ? 0 : -1',
    '[attr.aria-labelledby]': 'labelId() || null',
    '[attr.aria-hidden]': '!active() ? true : null',
    '[hidden]': '!active()',
    '[id]': 'id()',
  },
})
export class TabPanel {
  private readonly el: ElementRef<HTMLElement> = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly id: InputSignal<string> = input<string>('');
  public readonly labelId: InputSignal<string> = input<string>('');
  public readonly active: InputSignal<boolean> = input<boolean>(false);

  public readonly panelClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = ['ui-lib-tab-panel'];
    if (this.active()) {
      classes.push('ui-lib-tab-panel--active');
    }
    return classes.join(' ');
  });

  public focus(): void {
    this.el.nativeElement.focus();
  }
}
