import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  Accordion,
  AccordionPanel,
  AccordionExpandMode,
  AccordionSize,
  AccordionVariant,
  Button,
  Card,
  Tab,
  Tabs,
  TabsValue,
  Icon,
  ThemeConfigService,
} from 'ui-lib-custom';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';
import { ThemeScopeDirective } from '@demo/shared/theme-scope.directive';
import { DocCodeSnippetComponent } from '@demo/shared/doc-page/doc-code-snippet.component';

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
  | 'api-reference'
  | 'accessibility';

@Component({
  selector: 'app-accordion-demo',
  standalone: true,
  imports: [
    CommonModule,
    Accordion,
    AccordionPanel,
    Card,
    Button,
    Tabs,
    Tab,
    Icon,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    ThemeScopeDirective,
    DocCodeSnippetComponent,
  ],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
  readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'controlled', label: 'Controlled Mode' },
    { id: 'custom-headers', label: 'Custom Headers' },
    { id: 'disabled', label: 'Disabled Panels' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  activeTab = signal<AccordionTab>('playground');

  setTab(tab: AccordionTab): void {
    this.activeTab.set(tab);
  }

  onTabChange(value: TabsValue | null): void {
    if (value === null) {
      return;
    }
    this.setTab(value as AccordionTab);
  }

  readonly variants: AccordionVariant[] = ['material', 'bootstrap', 'minimal'];
  readonly sizes: AccordionSize[] = ['sm', 'md', 'lg'];
  readonly expandModes: AccordionExpandMode[] = ['single', 'multiple'];

  variant = signal<AccordionVariant>('material');
  size = signal<AccordionSize>('md');
  expandMode = signal<AccordionExpandMode>('single');
  themeScope = signal<Record<string, string>>({});

  readonly faqItems: FaqItem[] = [
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

  readonly variantExamples: AccordionVariant[] = ['material', 'bootstrap', 'minimal'];
  readonly sizeExamples: AccordionSize[] = ['sm', 'md', 'lg'];

  readonly controlledExpanded = signal<string[]>(['shipping']);

  readonly customHeaderItems: FaqItem[] = [
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

  readonly disabledItems: FaqItem[] = [
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

  readonly snippets = {
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

  private readonly themeService = inject(ThemeConfigService);

  readonly appliedTheme = computed(() => this.themeService.getCssVars(this.themeService.preset()));

  @ViewChild(DocDemoViewportComponent) viewport?: DocDemoViewportComponent;

  setVariant(value: AccordionVariant): void {
    this.variant.set(value);
  }

  setSize(value: AccordionSize): void {
    this.size.set(value);
  }

  setExpandMode(value: AccordionExpandMode): void {
    this.expandMode.set(value);
  }

  toggleControlled(value: string | number): void {
    const id: string = String(value);
    this.controlledExpanded.update((current: string[]) => {
      const next: Set<string> = new Set<string>(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return Array.from(next);
    });
  }

  resetControlled(): void {
    this.controlledExpanded.set(['shipping']);
  }
}
