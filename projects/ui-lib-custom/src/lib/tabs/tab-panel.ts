import { ChangeDetectionStrategy, Component, ElementRef, computed, input } from '@angular/core';

@Component({
  selector: 'ui-lib-tab-panel',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'panelClasses()',
    '[attr.role]': '"tabpanel"',
    '[attr.tabindex]': 'active() ? 0 : -1',
    '[attr.aria-labelledby]': 'labelId() || null',
    '[attr.aria-hidden]': '!active() ? true : null',
    '[hidden]': '!active()',
    '[id]': 'id()',
  }
})
export class TabPanel {
  constructor(private readonly el: ElementRef<HTMLElement>) {}
  id = input<string>('');
  labelId = input<string>('');
  active = input<boolean>(false);

  panelClasses = computed(() => {
    const classes = ['tab-panel'];
    if (this.active()) {
      classes.push('tab-panel-active');
    }
    return classes.join(' ');
  });

  focus() {
    this.el.nativeElement.focus();
  }
}
