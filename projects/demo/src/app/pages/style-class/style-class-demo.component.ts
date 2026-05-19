import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { StyleClass } from 'ui-lib-custom/style-class';
import { Button } from 'ui-lib-custom/button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';

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
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
  ],
  templateUrl: './style-class-demo.component.html',
  styleUrl: './style-class-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StyleClassDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 9,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 8,
      angular: 9,
      feel: 8,
    },
    competitiveParity: 'pending',
  };

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

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'selector',
      type: 'string',
      description: 'CSS selector for the target element (required).',
    },
    {
      name: 'enterFromClass',
      type: 'string | null',
      default: 'null',
      description: 'CSS class applied before enter animation.',
    },
    {
      name: 'enterActiveClass',
      type: 'string | null',
      default: 'null',
      description: 'CSS class applied during enter animation.',
    },
    {
      name: 'enterToClass',
      type: 'string | null',
      default: 'null',
      description: 'CSS class applied after enter animation.',
    },
    {
      name: 'leaveFromClass',
      type: 'string | null',
      default: 'null',
      description: 'CSS class applied before leave animation.',
    },
    {
      name: 'leaveActiveClass',
      type: 'string | null',
      default: 'null',
      description: 'CSS class applied during leave animation.',
    },
    {
      name: 'leaveToClass',
      type: 'string | null',
      default: 'null',
      description: 'CSS class applied after leave animation.',
    },
    {
      name: 'hideOnOutsideClick',
      type: 'boolean',
      default: 'false',
      description: 'Hides the target when clicking outside.',
    },
    {
      name: 'toggleClass',
      type: 'string | null',
      default: 'null',
      description: 'CSS class to toggle on each trigger click.',
    },
  ];

  public readonly apiInputRows: ApiPropRow[] = [
    {
      name: 'uiLibStyleClass',
      type: 'string',
      description:
        'Target selector: <code>@next</code>, <code>@prev</code>, <code>@parent</code>, <code>@grandparent</code>, or a CSS selector.',
      required: true,
    },
    {
      name: 'toggleClass',
      type: 'string',
      default: "''",
      description: 'Single class to toggle. When set, bypasses the full enter/leave lifecycle.',
    },
    {
      name: 'enterFromClass',
      type: 'string',
      default: "''",
      description: 'Class(es) applied at the start of enter.',
    },
    {
      name: 'enterActiveClass',
      type: 'string',
      default: "''",
      description: 'Class(es) applied during enter (e.g. animation class).',
    },
    {
      name: 'enterToClass',
      type: 'string',
      default: "''",
      description: 'Class(es) applied at end of enter transition.',
    },
    {
      name: 'enterDoneClass',
      type: 'string',
      default: "''",
      description: 'Class(es) kept after enter completes.',
    },
    {
      name: 'leaveFromClass',
      type: 'string',
      default: "''",
      description: 'Class(es) applied at the start of leave.',
    },
    {
      name: 'leaveActiveClass',
      type: 'string',
      default: "''",
      description: 'Class(es) applied during leave (e.g. animation class).',
    },
    {
      name: 'leaveToClass',
      type: 'string',
      default: "''",
      description: 'Class(es) applied at end of leave transition.',
    },
    {
      name: 'leaveDoneClass',
      type: 'string',
      default: "''",
      description: 'Class(es) kept after leave completes.',
    },
    {
      name: 'hideOnOutsideClick',
      type: 'boolean',
      default: 'false',
      description:
        'When <code>true</code>, clicking outside the target triggers leave / toggles off.',
    },
  ];
}
