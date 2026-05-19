import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Accordion, AccordionPanel, AccordionToggleIcon } from 'ui-lib-custom/accordion';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import type { AccordionExpandMode, AccordionSize, AccordionVariant } from 'ui-lib-custom/accordion';
import { Badge } from 'ui-lib-custom/badge';
import { Button } from 'ui-lib-custom/button';
import { Tabs, Tab } from 'ui-lib-custom/tabs';
import type { TabsValue } from 'ui-lib-custom/tabs';
import { Icon } from 'ui-lib-custom/icon';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { ThemeScopeDirective } from '@demo/shared/theme-scope.directive';
import { VariantComparisonComponent } from '../../shared/components/variant-comparison/variant-comparison.component';
import { AccordionBasicExampleComponent } from '@demo/examples/accordion-basic-example.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { Panel } from 'ui-lib-custom/panel';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

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

/**
 * Demo page showcasing accordion variants and behaviors.
 */
@Component({
  selector: 'app-accordion-demo',
  standalone: true,
  imports: [
    Panel,
    CommonModule,
    Accordion,
    AccordionPanel,
    AccordionToggleIcon,
    CodeSnippet,
    Badge,
    Button,
    Tabs,
    Tab,
    Icon,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocDemoViewportComponent,
    ThemeScopeDirective,
    VariantComparisonComponent,
    AccordionBasicExampleComponent,
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
  public readonly importCode: string =
    "import { Accordion, AccordionPanel } from 'ui-lib-custom/accordion'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

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
    { id: 'keyboard-navigation', label: 'Keyboard Navigation' },
    { id: 'api', label: 'API Reference' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'value',
      type: 'string | string[] | null',
      default: 'null',
      description: 'Active tab value(s). Can be a single string or array for multiple mode.',
    },
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description: 'Allows expanding multiple panels simultaneously.',
    },
    {
      name: 'lazy',
      type: 'boolean',
      default: 'false',
      description: 'Renders panel content lazily (only when first opened).',
    },
    {
      name: 'expandIcon',
      type: 'string | null',
      default: 'null',
      description: 'Icon for the expand chevron.',
    },
    {
      name: 'collapseIcon',
      type: 'string | null',
      default: 'null',
      description: 'Icon for the collapse chevron.',
    },
    {
      name: 'toggleIconPos',
      type: "'start' | 'end'",
      default: "'end'",
      description: 'Position of the toggle icon relative to the header label.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Accordion size.' },
    {
      name: 'styleClass',
      type: 'string | null',
      default: 'null',
      description: 'Additional CSS class.',
    },
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

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-15',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
    apgPattern: {
      name: 'Accordion',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/accordion/',
    },
    humanPending: [
      'NVDA + Chrome — state change announcements',
      'VoiceOver + Safari — aria-expanded on panel headers',
      'Visual contrast ratio — focus ring vs. background',
    ],
  };

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

  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: 'Enter / Space', suffix: 'on header', action: 'Toggles the panel open or closed.' },
    { key: '↓ / ↑', action: 'Moves focus to the next or previous panel header.' },
    { key: 'Home / End', action: 'Moves focus to the first or last panel header.' },
    {
      key: 'Tab / Shift+Tab',
      action:
        'Moves focus into or out of the accordion in the standard tab order. Open panel content is included.',
    },
  ];

  public readonly accordionApiRows: readonly ApiPropRow[] = [
    {
      name: 'variant',
      type: 'AccordionVariant',
      default: 'null',
      description: 'Visual style: material | bootstrap | minimal.',
    },
    {
      name: 'size',
      type: 'AccordionSize',
      default: "'md'",
      description: 'Spacing scale: sm | md | lg.',
    },
    {
      name: 'expandMode',
      type: "'single' | 'multiple'",
      default: "'single'",
      description: 'Allow one or many panels to be expanded.',
    },
    {
      name: 'expandedPanels',
      type: 'string[]',
      description: 'Controlled list of expanded panel ids.',
    },
    {
      name: 'defaultExpandedPanels',
      type: 'string[]',
      description: 'Uncontrolled initial expanded panels.',
    },
    {
      name: 'expandedChange',
      type: 'OutputEmitterRef<AccordionChangeEvent>',
      description: 'Emits on expansion state changes.',
    },
    {
      name: 'panelToggle',
      type: 'OutputEmitterRef<AccordionChangeEvent>',
      description: 'Emits every toggle interaction.',
    },
  ];
}
