import type { Signal } from '@angular/core';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';

import { AnimateOnScroll } from 'ui-lib-custom/animate-on-scroll';

import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocCodeExampleComponent } from '@demo/shared/doc-page/doc-code-example.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';

import { staggerHtml, staggerTs } from './snippets.generated';
/**
 * Demo page for the AnimateOnScroll directive.
 * Shows all built-in SCSS preset classes and demonstrates repeat mode,
 * custom threshold, and the full input/output API.
 */
@Component({
  selector: 'app-animated-on-scroll-demo',
  standalone: true,
  imports: [
    AnimateOnScroll,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
    DocSectionComponent,
    DocAriaTableComponent,
    DocKeyboardNavComponent,
    DocCssVarsTableComponent,
  ],
  templateUrl: './animated-on-scroll-demo.component.html',
  styleUrl: './animated-on-scroll-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimatedOnScrollDemoComponent {
  public readonly staggerHtml: string = staggerHtml;
  public readonly staggerTs: string = staggerTs;

  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string =
    "import { AnimateOnScroll } from 'ui-lib-custom/animate-on-scroll'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'fade-in', label: 'Fade In' },
    { id: 'slide-up', label: 'Slide Up' },
    { id: 'slide-down', label: 'Slide Down' },
    { id: 'slide-left-right', label: 'Slide Left & Right' },
    { id: 'zoom', label: 'Zoom In & Out' },
    { id: 'stagger', label: 'Stagger Effect' },
    { id: 'repeat-on-scroll', label: 'Repeat on Scroll' },
    { id: 'api', label: 'API' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'css-vars', label: 'CSS Custom Properties' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Host element',
      attribute: '(none added)',
      value: '—',
      notes:
        'The directive adds and removes CSS classes only. It does not modify <code>role</code>, <code>aria-*</code>, or tab order.',
    },
    {
      element: 'Host element (prefers-reduced-motion)',
      attribute: '(animation skipped)',
      value: '—',
      notes:
        'When the user has enabled <code>prefers-reduced-motion: reduce</code>, the directive skips animations and applies the enter class immediately so content is never hidden.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: '(none)',
      action:
        'The directive is purely visual. It does not add any keyboard interaction — focus and navigation behaviour are determined by the host element.',
    },
  ];

  public readonly cssVarRows: readonly CssVarRow[] = [
    {
      variable: '--uilib-animate-on-scroll-duration',
      default: '600ms',
      description: 'Animation duration. Inherits --uilib-transition-duration when set.',
    },
    {
      variable: '--uilib-animate-on-scroll-easing',
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      description: 'Animation easing function.',
    },
    {
      variable: '--uilib-animate-on-scroll-distance',
      default: '30px',
      description: 'Translate distance for slide animations.',
    },
    {
      variable: '--uilib-animate-on-scroll-delay',
      default: '0ms',
      description: 'Delay before the animation starts (useful for stagger effects).',
    },
  ];
}
