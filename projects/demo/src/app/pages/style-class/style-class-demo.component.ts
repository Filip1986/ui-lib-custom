import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { StyleClass } from 'ui-lib-custom/style-class';
import { Button } from 'ui-lib-custom/button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the StyleClass directive.
 */
@Component({
  selector: 'app-style-class-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    StyleClass,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
  ],
  templateUrl: './style-class-demo.component.html',
  styleUrl: './style-class-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StyleClassDemoComponent {
  public readonly importCode: string = "import { StyleClass } from 'ui-lib-custom/style-class'";
  public readonly snippetToggleMode: string = `<button\n  [uiLibStyleClass]="'@next'"\n  toggleClass="sc-panel--open"\n>\n  Toggle Panel\n</button>\n<div class="sc-panel">...</div>`;
  public readonly snippetFadeAnimation: string = `<button\n  [uiLibStyleClass]="'@next'"\n  enterFromClass="hidden"\n  enterActiveClass="fade-in"\n  leaveActiveClass="fade-out"\n  leaveToClass="hidden"\n  [hideOnOutsideClick]="true"\n>Show Panel</button>\n<div class="hidden">...</div>`;
  public readonly snippetSlideAnimation: string = `<button\n  [uiLibStyleClass]="'@next'"\n  enterFromClass="slide-hidden"\n  enterActiveClass="slide-down"\n  enterDoneClass="slide-open"\n  leaveActiveClass="slide-up"\n  leaveDoneClass="slide-hidden"\n>Toggle Slide</button>`;
  public readonly snippetSpecialSelectors: string = `<!-- @prev -->\n<div class="target">Prev target</div>\n<button [uiLibStyleClass]="'@prev'"\n        toggleClass="is-active">Toggle</button>\n\n<!-- @parent -->\n<div class="parent">\n  <button [uiLibStyleClass]="'@parent'"\n          toggleClass="is-active">Toggle</button>\n</div>`;
  public readonly snippetCssSelector: string = `<button\n  [uiLibStyleClass]="'#my-panel'"\n  toggleClass="is-open"\n>Toggle</button>\n\n<div id="my-panel">...</div>`;
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'toggle-mode', label: 'Toggle Mode' },
    { id: 'fade-animation', label: 'Fade Animation' },
    { id: 'slide-animation', label: 'Slide Animation' },
    { id: 'special-selectors', label: 'Special Selectors' },
    { id: 'css-selector', label: 'CSS Selector' },
    { id: 'api', label: 'API' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }
}
