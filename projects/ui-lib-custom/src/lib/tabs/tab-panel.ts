import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  input,
  ViewEncapsulation,
  inject,
} from '@angular/core';

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
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly id = input<string>('');
  public readonly labelId = input<string>('');
  public readonly active = input<boolean>(false);

  public readonly panelClasses = computed<string>((): string => {
    const classes = ['tab-panel'];
    if (this.active()) {
      classes.push('tab-panel-active');
    }
    return classes.join(' ');
  });

  public focus(): void {
    this.el.nativeElement.focus();
  }
}
