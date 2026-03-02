import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  TemplateRef,
  ViewChild,
  input,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { TabsLazyMode, TabsValue } from './tabs.types';

@Directive({
  selector: '[uiLibTabLabel]',
  standalone: true,
})
export class TabLabel {
  public readonly template = inject<TemplateRef<unknown>>(TemplateRef);
}

@Directive({
  selector: '[uiLibTabContent]',
  standalone: true,
})
export class TabContent {
  public readonly template = inject<TemplateRef<unknown>>(TemplateRef);
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
  public readonly value = input<TabsValue | null>(null);
  public readonly label = input<string | null>(null);
  public readonly disabled = input<boolean>(false);
  public readonly closable = input<boolean>(false);
  /** Per-tab lazy override; falls back to the parent tabs lazy mode when undefined. */
  public readonly lazy = input<TabsLazyMode | undefined>(undefined);

  @ViewChild('defaultContent', { static: true }) public content?: TemplateRef<unknown>;
  @ContentChild(TabLabel) public labelTemplate?: TabLabel;
  @ContentChild(TabContent) public contentTemplate?: TabContent;
}
