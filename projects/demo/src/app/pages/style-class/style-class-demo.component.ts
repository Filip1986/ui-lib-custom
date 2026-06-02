import type { Signal } from '@angular/core';
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';

import { Button } from 'ui-lib-custom/button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { StyleClass } from 'ui-lib-custom/style-class';

import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';

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
    DocSectionComponent,
    DocAriaTableComponent,
    DocKeyboardNavComponent,
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

  private readonly snippetStyleClassTs: string = `import { Component } from '@angular/core';
import { StyleClass } from 'ui-lib-custom/style-class';

@Component({
  standalone: true,
  imports: [StyleClass],
  templateUrl: './my.component.html',
})
export class MyComponent {}
`;

  public readonly snippetToggleMode: string = `<button\n  [uiLibStyleClass]="'@next'"\n  toggleClass="sc-panel--open"\n>\n  Toggle Panel\n</button>\n<div class="sc-panel">...</div>`;
  public readonly snippetToggleModeTs: string = this.snippetStyleClassTs;
  public readonly snippetFadeAnimation: string = `<button\n  [uiLibStyleClass]="'@next'"\n  enterFromClass="hidden"\n  enterActiveClass="fade-in"\n  leaveActiveClass="fade-out"\n  leaveToClass="hidden"\n  [hideOnOutsideClick]="true"\n>Show Panel</button>\n<div class="hidden">...</div>`;
  public readonly snippetFadeAnimationTs: string = this.snippetStyleClassTs;
  public readonly snippetSlideAnimation: string = `<button\n  [uiLibStyleClass]="'@next'"\n  enterFromClass="slide-hidden"\n  enterActiveClass="slide-down"\n  enterDoneClass="slide-open"\n  leaveActiveClass="slide-up"\n  leaveDoneClass="slide-hidden"\n>Toggle Slide</button>`;
  public readonly snippetSlideAnimationTs: string = this.snippetStyleClassTs;
  public readonly snippetSpecialSelectors: string = `<!-- @prev -->\n<div class="target">Prev target</div>\n<button [uiLibStyleClass]="'@prev'"\n        toggleClass="is-active">Toggle</button>\n\n<!-- @parent -->\n<div class="parent">\n  <button [uiLibStyleClass]="'@parent'"\n          toggleClass="is-active">Toggle</button>\n</div>`;
  public readonly snippetSpecialSelectorsTs: string = this.snippetStyleClassTs;
  public readonly snippetCssSelector: string = `<button\n  [uiLibStyleClass]="'#my-panel'"\n  toggleClass="is-open"\n>Toggle</button>\n\n<div id="my-panel">...</div>`;
  public readonly snippetCssSelectorTs: string = this.snippetStyleClassTs;
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
    { id: 'css-vars', label: 'CSS Custom Properties' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiInputRows: readonly ApiPropRow[] = [
    {
      name: 'uiLibStyleClass',
      type: 'string',
      description: 'CSS selector for the target element. Required.',
      required: true,
    },
    {
      name: 'enterActiveClass',
      type: 'string',
      default: "''",
      description: 'Class(es) applied during the enter transition.',
    },
    {
      name: 'leaveActiveClass',
      type: 'string',
      default: "''",
      description: 'Class(es) applied during the leave transition.',
    },
    {
      name: 'enterToClass',
      type: 'string',
      default: "''",
      description: 'Class(es) applied at the end of the enter transition.',
    },
    {
      name: 'leaveToClass',
      type: 'string',
      default: "''",
      description: 'Class(es) applied at the end of the leave transition.',
    },
    {
      name: 'toggleClass',
      type: 'string',
      default: "''",
      description: 'Class(es) toggled on each trigger click.',
    },
    {
      name: 'hideOnOutsideClick',
      type: 'boolean',
      default: 'false',
      description: 'Triggers the leave transition when clicking outside.',
    },
  ];

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Host element',
      attribute: '(none added)',
      value: '—',
      notes:
        'The directive adds and removes CSS classes and drives enter/leave transitions. It does not modify <code>aria-*</code> attributes automatically.',
    },
    {
      element: 'Toggle trigger',
      attribute: 'aria-expanded',
      value: 'true / false',
      notes:
        'When using <code>StyleClass</code> to show/hide a panel or menu, add <code>aria-expanded</code> to the trigger element and update it alongside the toggle — <code>StyleClass</code> itself does not manage this attribute.',
    },
    {
      element: 'Controlled panel',
      attribute: 'aria-hidden',
      value: 'true / false',
      notes:
        'Hidden panels should carry <code>aria-hidden="true"</code> when invisible. Manage this alongside your toggle state rather than relying on the directive.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: '(host element key)',
      action:
        "The directive responds to the host element's normal interaction events (click by default). Keyboard activation (Enter / Space on a button host) works automatically because the browser fires <code>click</code> for those keys.",
    },
  ];
}
