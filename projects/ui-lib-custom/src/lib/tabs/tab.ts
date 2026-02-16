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
import { TabsLazyMode, TabsValue } from './tabs.types';

@Directive({
  selector: '[uiLibTabLabel]',
  standalone: true,
})
export class TabLabel {
  constructor(public readonly template: TemplateRef<unknown>) {}
}

@Directive({
  selector: '[uiLibTabContent]',
  standalone: true,
})
export class TabContent {
  constructor(public readonly template: TemplateRef<unknown>) {}
}

@Component({
  selector: 'ui-lib-tab',
  standalone: true,
  template: `
    <ng-content select="[uiLibTabContent]" />
    <ng-template #defaultContent>
      <ng-content />
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Tab {
  value = input<TabsValue | null>(null);
  label = input<string | null>(null);
  disabled = input<boolean>(false);
  closable = input<boolean>(false);
  /** Per-tab lazy override; falls back to the parent tabs lazy mode when undefined. */
  lazy = input<TabsLazyMode | undefined>(undefined);

  @ViewChild('defaultContent', { static: true }) content?: TemplateRef<unknown>;
  @ContentChild(TabLabel) labelTemplate?: TabLabel;
  @ContentChild(TabContent) contentTemplate?: TabContent;
}
