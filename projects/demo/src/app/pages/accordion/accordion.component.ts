import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import {
  Accordion,
  AccordionPanel,
  AccordionToggleIcon,
  Badge,
  Button,
  Card,
  Tab,
  Tabs,
  Icon,
  ThemeConfigService,
} from 'ui-lib-custom';
import type {
  AccordionExpandMode,
  AccordionSize,
  AccordionVariant,
  TabsValue,
} from 'ui-lib-custom';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { ThemeScopeDirective } from '@demo/shared/theme-scope.directive';
import { DocCodeSnippetComponent } from '@demo/shared/doc-page/doc-code-snippet.component';
import { CodePreviewComponent } from '../../shared/components/code-preview/code-preview.component';
import { VariantComparisonComponent } from '../../shared/components/variant-comparison/variant-comparison.component';

interface FaqItem {
  value: string;
  header: string;
  content: string;
  disabled?: boolean;
}

type AccordionTab =
  | 'playground'
  | 'variants'
  | 'sizes'
  | 'controlled'
  | 'custom-headers'
  | 'disabled'
  | 'icons'
  | 'toggle-icons'
  | 'animations'
  | 'api-reference'
  | 'accessibility';

@Component({
  selector: 'app-accordion-demo',
  standalone: true,
  imports: [
    CommonModule,
    Accordion,
    AccordionPanel,
    AccordionToggleIcon,
    Badge,
    Card,
    Button,
    Tabs,
    Tab,
    Icon,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    ThemeScopeDirective,
    DocCodeSnippetComponent,
    CodePreviewComponent,
    VariantComparisonComponent,
  ],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
  public readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'controlled', label: 'Controlled Mode' },
    { id: 'custom-headers', label: 'Custom Headers' },
    { id: 'disabled', label: 'Disabled Panels' },
    { id: 'icons', label: 'Icon Customization' },
    { id: 'toggle-icons', label: 'Toggle Icon Templates' },
    { id: 'animations', label: 'Animations' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public readonly activeTab: WritableSignal<AccordionTab> = signal<AccordionTab>('playground');

  public setTab(tab: AccordionTab): void {
    this.activeTab.set(tab);
  }

  public onTabChange(value: TabsValue | null): void {
    if (value === null) {
      return;
    }
    this.setTab(value as AccordionTab);
  }

  public readonly variants: AccordionVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly sizes: AccordionSize[] = ['sm', 'md', 'lg'];
  public readonly expandModes: AccordionExpandMode[] = ['single', 'multiple'];

  public readonly variant: WritableSignal<AccordionVariant> = signal<AccordionVariant>('material');
  public readonly size: WritableSignal<AccordionSize> = signal<AccordionSize>('md');
  public readonly expandMode: WritableSignal<AccordionExpandMode> =
    signal<AccordionExpandMode>('single');
  public readonly themeScope: WritableSignal<Record<string, string>> = signal<
    Record<string, string>
  >({});

  public readonly faqItems: FaqItem[] = [
    {
      value: 'shipping',
      header: 'What are the shipping options?',
      content: 'We offer standard (5-7 days), express (2-3 days), and overnight shipping...',
    },
    {
      value: 'returns',
      header: 'What is your return policy?',
      content: 'Items can be returned within 30 days of purchase...',
    },
    {
      value: 'payment',
      header: 'What payment methods do you accept?',
      content: 'We accept all major credit cards, PayPal, and Apple Pay...',
    },
  ];

  public readonly variantExamples: AccordionVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly sizeExamples: AccordionSize[] = ['sm', 'md', 'lg'];

  public readonly controlledExpanded: WritableSignal<string[]> = signal<string[]>(['shipping']);

  public readonly customHeaderItems: FaqItem[] = [
    {
      value: 'overview',
      header: 'Project Overview',
      content: 'High level summary of the project goals and requirements.',
    },
    {
      value: 'milestones',
      header: 'Key Milestones',
      content: 'Track milestones with timelines and owners.',
    },
  ];

  public readonly disabledItems: FaqItem[] = [
    {
      value: 'active',
      header: 'Active Panel',
      content: 'This panel can be toggled normally.',
    },
    {
      value: 'locked',
      header: 'Disabled Panel',
      content: 'Disabled panels are focusable but cannot be toggled.',
      disabled: true,
    },
    {
      value: 'another',
      header: 'Another Active Panel',
      content: 'Demonstrates navigation skipping disabled panels.',
    },
  ];

  public readonly snippets: {
    readonly basic: string;
    readonly customHeader: string;
    readonly controlled: string;
  } = {
    basic: `<ui-lib-accordion variant="material" expandMode="single">
  <ui-lib-accordion-panel header="Shipping" value="shipping">
    Standard (5-7 days), express (2-3 days), and overnight shipping.
  </ui-lib-accordion-panel>
  <ui-lib-accordion-panel header="Returns" value="returns">
    Items can be returned within 30 days of purchase.
  </ui-lib-accordion-panel>
</ui-lib-accordion>`,
    customHeader: `<ui-lib-accordion>
  <ui-lib-accordion-panel value="faq-1">
    <div accordionHeader class="header-row">
      <ui-lib-icon name="help-circle" /> FAQ Item
    </div>
    Content goes here.
  </ui-lib-accordion-panel>
</ui-lib-accordion>`,
    controlled: `<ui-lib-accordion
  expandMode="multiple"
  [expandedPanels]="expanded"
  (expandedChange)="expanded = handleChange($event)"
>
  <ui-lib-accordion-panel header="One" value="one" />
  <ui-lib-accordion-panel header="Two" value="two" />
</ui-lib-accordion>`,
  } as const;

  private readonly themeService: ThemeConfigService = inject(ThemeConfigService);

  public readonly appliedTheme: Signal<Record<string, string>> = computed<Record<string, string>>(
    (): Record<string, string> => this.themeService.getCssVars(this.themeService.preset())
  );

  @ViewChild(DocDemoViewportComponent) public viewport?: DocDemoViewportComponent;

  public setVariant(value: AccordionVariant): void {
    this.variant.set(value);
  }

  public setSize(value: AccordionSize): void {
    this.size.set(value);
  }

  public setExpandMode(value: AccordionExpandMode): void {
    this.expandMode.set(value);
  }

  public toggleControlled(value: string | number): void {
    const id: string = String(value);
    this.controlledExpanded.update((current: string[]): string[] => {
      const next: Set<string> = new Set<string>(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return Array.from(next);
    });
  }

  public resetControlled(): void {
    this.controlledExpanded.set(['shipping']);
  }

  public readonly iconSnippets: Readonly<
    Record<'customIcons' | 'iconPosition' | 'toggleTemplate', string>
  > = {
    customIcons: `<ui-lib-accordion-panel
  header="Using Plus/Minus"
  expandIcon="minus"
  collapseIcon="plus"
/>`,
    iconPosition: `<ui-lib-accordion-panel
  iconPosition="start"
  header="Icon at Start"
/>`,
    toggleTemplate: `<ui-lib-accordion-panel>
  <ng-template accordionToggleIcon let-expanded>
    <span class="custom-indicator" [class.active]="expanded">
      {{ expanded ? '−' : '+' }}
    </span>
  </ng-template>
  Content
</ui-lib-accordion-panel>`,
  };

  public readonly reduceMotionDemo: WritableSignal<boolean> = signal<boolean>(false);

  public toggleReducedMotion(): void {
    this.reduceMotionDemo.update((value: boolean): boolean => !value);
  }

  public readonly accordionExample: string = `<ui-lib-accordion variant="material">
  <ui-lib-accordion-panel header="Shipping">
    Standard (5-7 days), express (2-3 days), and overnight options.
  </ui-lib-accordion-panel>
  <ui-lib-accordion-panel header="Returns">
    Items can be returned within 30 days of purchase.
  </ui-lib-accordion-panel>
</ui-lib-accordion>`;
}
