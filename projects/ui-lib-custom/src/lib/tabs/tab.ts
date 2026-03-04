import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';
import type { InputSignal } from '@angular/core';
import type { TabsLazyMode, TabsValue } from './tabs.types';
/**
 * Template directive for custom tab labels.
 */
@Directive({
  selector: '[uiLibTabLabel]',
  standalone: true,
})
export class TabLabel {
  public readonly template: TemplateRef<unknown> = inject<TemplateRef<unknown>>(TemplateRef);
}

/**
 * Template directive for custom tab content.
 */
@Directive({
  selector: '[uiLibTabContent]',
  standalone: true,
})
export class TabContent {
  public readonly template: TemplateRef<unknown> = inject<TemplateRef<unknown>>(TemplateRef);
}

/**
 * Tab definition used by the tabs container.
 */
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
  public readonly value: InputSignal<TabsValue | null> = input<TabsValue | null>(null);
  public readonly label: InputSignal<string | null> = input<string | null>(null);
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly closable: InputSignal<boolean> = input<boolean>(false);
  /** Per-tab lazy override; falls back to the parent tabs lazy mode when undefined. */
  public readonly lazy: InputSignal<TabsLazyMode | undefined> = input<TabsLazyMode | undefined>(
    undefined
  );

  @ViewChild('defaultContent', { static: true }) public content?: TemplateRef<unknown>;
  @ContentChild(TabLabel) public labelTemplate?: TabLabel;
  @ContentChild(TabContent) public contentTemplate?: TabContent;
}
