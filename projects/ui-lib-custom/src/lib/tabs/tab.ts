import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  TemplateRef,
  ViewChild,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { TabsValue } from './tabs.types';

@Directive({
  selector: '[uiLibTabLabel]',
  standalone: true,
})
export class TabLabel {
  constructor(public readonly template: TemplateRef<unknown>) {}
}

@Component({
  selector: 'ui-lib-tab',
  standalone: true,
  template: '<ng-template><ng-content /></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Tab {
  value = input<TabsValue | null>(null);
  label = input<string | null>(null);
  disabled = input<boolean>(false);
  closable = input<boolean>(false);

  @ViewChild(TemplateRef, { static: true }) content?: TemplateRef<unknown>;
  @ContentChild(TabLabel) labelTemplate?: TabLabel;
}
