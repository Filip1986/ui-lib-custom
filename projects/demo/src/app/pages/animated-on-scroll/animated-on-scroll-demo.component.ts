import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { AnimateOnScroll } from 'ui-lib-custom/animate-on-scroll';
import { DocPageHeaderComponent } from '../../shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '../../shared/doc-page/doc-code-example.component';
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
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }
}
