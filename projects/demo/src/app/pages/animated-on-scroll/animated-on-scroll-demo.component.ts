import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { AnimateOnScroll } from 'ui-lib-custom/animate-on-scroll';
import { DocPageHeaderComponent } from '../../shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

/**
 * Demo page for the AnimateOnScroll directive.
 * Shows all built-in SCSS preset classes and demonstrates repeat mode,
 * custom threshold, and the full input/output API.
 */
@Component({
  selector: 'app-animated-on-scroll-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    AnimateOnScroll,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './animated-on-scroll-demo.component.html',
  styleUrl: './animated-on-scroll-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimatedOnScrollDemoComponent {
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
  public readonly snippetStagger: string = `<div class="uilib-aos-slide-up"\n     uiLibAnimateOnScroll enterClass="uilib-aos-active"\n     style="--uilib-animate-on-scroll-delay: 300ms">`;
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
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiInputRows: readonly ApiPropRow[] = [
    {
      name: 'enterClass',
      type: 'string',
      default: "''",
      description: 'Space-separated CSS class(es) added when the element enters the viewport.',
    },
    {
      name: 'leaveClass',
      type: 'string',
      default: "''",
      description:
        'Space-separated CSS class(es) added when the element leaves the viewport (once must be false).',
    },
    {
      name: 'threshold',
      type: 'number',
      default: '0.1',
      description: 'Ratio of element visibility required to trigger (0–1).',
    },
    {
      name: 'rootMargin',
      type: 'string',
      default: "'0px'",
      description: "IntersectionObserver root margin (e.g. '-50px 0px').",
    },
    {
      name: 'once',
      type: 'boolean',
      default: 'true',
      description: 'Unobserves the element after the first enter event.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Skips observer setup entirely when true.',
    },
  ];

  public readonly apiOutputRows: readonly ApiPropRow[] = [
    {
      name: '(enter)',
      type: 'OutputEmitterRef<void>',
      description: 'Emitted each time the element enters the viewport.',
    },
    {
      name: '(leave)',
      type: 'OutputEmitterRef<void>',
      description: 'Emitted each time the element leaves the viewport (once must be false).',
    },
  ];

  public readonly apiCssVarRows: readonly ApiPropRow[] = [
    {
      name: '--uilib-animate-on-scroll-duration',
      type: 'CSS var',
      default: '600ms',
      description: 'Transition duration for all built-in presets.',
    },
    {
      name: '--uilib-animate-on-scroll-easing',
      type: 'CSS var',
      default: 'cubic-bezier(0.4,0,0.2,1)',
      description: 'Easing function for all built-in presets.',
    },
    {
      name: '--uilib-animate-on-scroll-delay',
      type: 'CSS var',
      default: '0ms',
      description: 'Per-element delay — set inline for stagger effects.',
    },
    {
      name: '--uilib-animate-on-scroll-distance',
      type: 'CSS var',
      default: '30px',
      description: 'Translation distance used by slide-* presets.',
    },
  ];
}
