import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';

export interface CorePrinciple {
  number: number;
  title: string;
  tagline: string;
  bullets: string[];
}

export interface WowFactor {
  number: number;
  title: string;
  committed: boolean;
  status: 'achieved' | 'queued';
  meaning: string;
}

export interface LongTermLayer {
  from: string;
  to: string;
  items: string[];
}

export interface RevenueStream {
  rank: number;
  title: string;
  viability: string;
  description: string;
}

/**
 * Vision page — the strategic north star for ui-lib-custom.
 * Surfaces the content of docs/VISION.md in an interactive, readable format.
 */
@Component({
  selector: 'app-vision',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
  ],
  templateUrl: './vision.component.html',
  styleUrl: './vision.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisionComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly sections: DocSection[] = [
    { id: 'vision-statement', label: 'Vision Statement' },
    { id: 'core-philosophy', label: 'Core Philosophy' },
    { id: 'wow-factor', label: 'The Wow Factor' },
    { id: 'technical-identity', label: 'Technical Identity' },
    { id: 'component-philosophy', label: 'Component Philosophy' },
    { id: 'long-term-vision', label: 'Long-Term Vision' },
    { id: 'business-model', label: 'Business Model' },
    { id: 'non-negotiables', label: 'Non-Negotiables' },
  ];

  public readonly corePrinciples: CorePrinciple[] = [
    {
      number: 1,
      title: 'Angular-native, not React-ported',
      tagline: 'Feels impossible to build anywhere except Angular.',
      bullets: [
        'Signals-first',
        'Standalone-first',
        'SSR-native & Hydration-aware',
        'Zoneless-ready',
        'Typed forms integrated',
        'Angular CDK leveraged deeply',
        'Reactive by architecture',
      ],
    },
    {
      number: 2,
      title: 'Developer Experience is the Product',
      tagline: '"This library understands how I think."',
      bullets: [
        'Minimal boilerplate',
        'Predictable APIs',
        'Intelligent defaults',
        'Exceptional typing',
        'Excellent autocomplete',
        'Consistent naming',
        'No configuration hell',
      ],
    },
    {
      number: 3,
      title: 'Accessibility is Architecture',
      tagline: 'Enterprises trust it without hesitation.',
      bullets: [
        'Full keyboard navigation on every component',
        'Correct ARIA semantics — designed in, not bolted on',
        'Focus management that feels native',
        'Screen reader tested: NVDA, JAWS, VoiceOver',
        'Reduced motion support in every animation',
        'High contrast mode across all variants',
        'WCAG 2.1 AA as the floor — AAA as the aspiration',
        'axe-core passing with zero violations by default',
      ],
    },
    {
      number: 4,
      title: 'Performance is a Feature',
      tagline: '"This scales effortlessly."',
      bullets: [
        'Minimal runtime cost',
        'Tree-shakeable',
        'Lazy-render-friendly',
        'Signal-driven rendering',
        'Efficient hydration',
        'Minimal re-renders',
        'Optimized animations',
      ],
    },
    {
      number: 5,
      title: 'Composability over Configuration',
      tagline: 'Empowers creativity instead of limiting it.',
      bullets: [
        'Primitives and slots',
        'Directive-based extension',
        'Composition patterns',
        'Headless foundations',
        'Layered architecture',
        'No giant config objects',
      ],
    },
  ];

  public readonly wowFactors: WowFactor[] = [
    {
      number: 1,
      title: 'Elite Accessibility',
      committed: true,
      status: 'achieved',
      meaning:
        'The most accessible Angular component library ever built. Every component makes a11y engineers say: "Nothing else in Angular comes close."',
    },
    {
      number: 2,
      title: 'Astonishingly Good Theming',
      committed: false,
      status: 'queued',
      meaning:
        'Runtime switching, design token system, brand customization that takes minutes not days.',
    },
    {
      number: 3,
      title: 'Unmatched Forms Experience',
      committed: false,
      status: 'queued',
      meaning: 'The best typed, reactive, signal-native forms DX in Angular — ever.',
    },
    {
      number: 4,
      title: 'Exceptional DX',
      committed: false,
      status: 'queued',
      meaning:
        'APIs so predictable and autocomplete so accurate that developers never reach for docs for basic usage.',
    },
    {
      number: 5,
      title: 'Unbelievably Polished Animations',
      committed: false,
      status: 'queued',
      meaning: 'Motion that makes developers say "how did they do that."',
    },
    {
      number: 6,
      title: 'The Best Angular Table / Grid',
      committed: false,
      status: 'queued',
      meaning:
        'Performance, composability, and API quality that makes every other Angular data grid feel like a spreadsheet.',
    },
  ];

  public readonly architecturalPrinciples: string[] = [
    'Headless-first foundation',
    'Styled layer on top',
    'Design-token-driven',
    'CSS variables first',
    'Tailwind-compatible',
    'Signal-native APIs',
    'Zero legacy patterns',
    'Strict typing everywhere',
    'Composition-oriented',
    'Accessibility-native',
    'Animation-aware',
  ];

  public readonly qualityLayers: string[] = [
    'Basic Functionality',
    'API Quality',
    'Composability',
    'Accessibility',
    'Performance',
    'Theming',
    'DX Polish',
    'Documentation',
    'Edge Cases',
    'Emotional Delight',
    'Ecosystem Integration',
  ];

  public readonly longTermPath: string[] = [
    'Component Library',
    'UI Ecosystem',
    'Design System Platform',
    'Enterprise Tooling Platform',
  ];

  public readonly revenueStreams: RevenueStream[] = [
    {
      rank: 1,
      title: 'Premium Templates & Blocks',
      viability: 'After Public Beta',
      description:
        'Production-ready dashboard layouts, authentication flows, and data-heavy pages using library components. The PrimeTek model — developers love the free components; teams buy the "ship a full dashboard in a day" template.',
    },
    {
      rank: 2,
      title: 'Premium Themes',
      viability: 'After Public Beta',
      description:
        'Professionally designed CSS token sets: Stripe-style, Linear-style, enterprise dark, industry packs. All themes are CSS variable overrides — no lock-in, no special component code.',
    },
    {
      rank: 3,
      title: 'Enterprise Data Grid',
      viability: 'After Wow Factor #6',
      description:
        'Free tier: standard table features. Enterprise tier: server-side row model, row grouping, pivoting, Excel export, master-detail. The AG Grid model applied to Angular.',
    },
    {
      rank: 4,
      title: 'Support Contracts',
      viability: 'After v1.0 GA',
      description:
        'Priority issue SLAs, private access to the core team, architecture reviews, and migration assistance. For enterprise teams that standardise on the library.',
    },
    {
      rank: 5,
      title: 'Accessibility Audit Service',
      viability: 'Horizon',
      description:
        "Automated axe-core audits and manual WCAG 2.1 AA reports for a customer's entire app. The library's Elite Accessibility reputation makes this credible in a way no generic consultancy can match.",
    },
  ];

  public readonly nonNegotiables: string[] = [
    'API consistency',
    'Accessibility',
    'Performance',
    'Documentation quality',
    'Migration stability',
    'Typing excellence',
  ];

  public readonly neverDo: string[] = [
    'Gate basic components behind a paywall — one paywalled Button destroys ten years of community goodwill overnight.',
    'Create a "Community vs Enterprise" component split — fragmented sets mean fragmented docs, fragmented issue tracking, and a community that never fully trusts the free tier.',
    'Charge for fixes to accessibility bugs — a11y is architecture, not a premium feature.',
    'Rush to monetise before trust is earned — the sequence is quality → community → trust → revenue. Never in the other order.',
  ];

  public readonly emotionalGoals: string[] = [
    'productive',
    'inspired',
    'proud',
    'creative',
    'fast',
    'modern',
  ];

  public trackByNumber(index: number, item: CorePrinciple | WowFactor): number {
    return item.number;
  }

  public trackByRank(index: number, item: RevenueStream): number {
    return item.rank;
  }

  public trackByString(index: number, item: string): string {
    return item;
  }
}
