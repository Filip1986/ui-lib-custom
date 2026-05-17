import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { AnimateOnScroll } from 'ui-lib-custom/animate-on-scroll';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the AnimateOnScroll directive.
 * Shows all built-in SCSS preset classes and demonstrates repeat mode,
 * custom threshold, and the full input/output API.
 */
@Component({
  selector: 'app-animated-on-scroll-demo',
  standalone: true,
  imports: [CodeSnippet, AnimateOnScroll, DocPageLayoutComponent, DocTocComponent],
  templateUrl: './animated-on-scroll-demo.component.html',
  styleUrl: './animated-on-scroll-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimatedOnScrollDemoComponent {
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
}
