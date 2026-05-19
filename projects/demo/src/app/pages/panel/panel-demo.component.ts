import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Panel } from 'ui-lib-custom/panel';
import type { PanelToggleEvent, PanelVariant } from 'ui-lib-custom/panel';
import { Button } from 'ui-lib-custom/button';
import {
  TableComponent,
  TableColumnComponent,
  TableColumnBodyDirective,
} from 'ui-lib-custom/table';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageHeaderComponent } from '../../shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import { DocCssVarsTableComponent } from '../../shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '../../shared/doc-page/doc-css-vars-table.component';
import { DocKeyboardNavComponent } from '../../shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '../../shared/doc-page/doc-keyboard-nav.component';
import { DocQualityBadgeComponent } from '../../shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '../../shared/doc-page/doc-quality-badge.component';
import { DocCodeExampleComponent } from '../../shared/doc-page/doc-code-example.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

interface InputRow {
  readonly input: string;
  readonly type: string;
  readonly default: string;
  readonly description: string;
}

interface OutputRow {
  readonly output: string;
  readonly type: string;
  readonly description: string;
}

interface ProjectionRow {
  readonly slot: string;
  readonly selector: string;
  readonly description: string;
}

interface AriaRow {
  readonly element: string;
  readonly attribute: string;
  readonly value: string;
  readonly notes: string;
}

/**
 * Demo page for the Panel component.
 */
@Component({
  selector: 'app-panel-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    Panel,
    Button,
    TableComponent,
    TableColumnComponent,
    TableColumnBodyDirective,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocCssVarsTableComponent,
    DocKeyboardNavComponent,
    DocQualityBadgeComponent,
    DocCodeExampleComponent,
  ],
  templateUrl: './panel-demo.component.html',
  styleUrl: './panel-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelDemoComponent {
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
      name: 'Disclosure (Show/Hide)',
      url: 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/',
    },
    humanPending: [
      'NVDA + Chrome — aria-expanded announcement on toggle button',
      'VoiceOver + Safari — role="region" + aria-labelledby wiring',
      'Visual contrast — focus ring on toggle button',
    ],
  };

  public readonly importCode: string = "import { Panel } from 'ui-lib-custom/panel'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'toggleable', label: 'Toggleable' },
    { id: 'collapsed-default', label: 'Collapsed by Default' },
    { id: 'custom-header', label: 'Custom Header' },
    { id: 'header-icons', label: 'Header Icons' },
    { id: 'footer', label: 'Footer' },
    { id: 'no-header', label: 'No Header' },
    { id: 'variants', label: 'Design Variants' },
    { id: 'playground', label: 'Playground' },
    {
      id: 'api',
      label: 'API',
      children: [
        { id: 'api-inputs', label: 'Inputs' },
        { id: 'api-outputs', label: 'Outputs' },
        { id: 'api-projection', label: 'Content Projection' },
      ],
    },
    { id: 'css-vars', label: 'CSS Custom Properties' },
    {
      id: 'accessibility',
      label: 'Accessibility',
      children: [
        { id: 'a11y-aria', label: 'ARIA Attributes' },
        { id: 'a11y-keyboard', label: 'Keyboard' },
      ],
    },
  ];

  public readonly variants: PanelVariant[] = ['material', 'bootstrap', 'minimal'];

  public readonly snippets: {
    readonly import: string;
    readonly basic: string;
    readonly basicTs: string;
    readonly toggleable: string;
    readonly toggleableTs: string;
    readonly collapsedDefault: string;
    readonly collapsedDefaultTs: string;
    readonly customHeader: string;
    readonly customHeaderTs: string;
    readonly headerIcons: string;
    readonly headerIconsTs: string;
    readonly footer: string;
    readonly footerTs: string;
    readonly noHeader: string;
    readonly noHeaderTs: string;
    readonly variants: string;
    readonly variantsTs: string;
  } = {
    import: `import { Panel } from 'ui-lib-custom/panel';`,
    basic: `<ui-lib-panel header="Introduction">
  <p>Panel body content.</p>
</ui-lib-panel>`,
    basicTs: `import { Component } from '@angular/core';
import { Panel } from 'ui-lib-custom/panel';

@Component({
  standalone: true,
  imports: [Panel],
  templateUrl: './my.component.html',
})
export class MyComponent {}`,
    toggleable: `<ui-lib-panel
  header="Collapsible Section"
  [toggleable]="true"
  [(collapsed)]="isCollapsed"
  (toggled)="handleToggle($event)"
>
  <p>Click the chevron button in the header to toggle visibility.</p>
</ui-lib-panel>`,
    toggleableTs: `import { Component, signal } from '@angular/core';
import { Panel } from 'ui-lib-custom/panel';
import type { PanelToggleEvent } from 'ui-lib-custom/panel';

@Component({
  standalone: true,
  imports: [Panel],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly isCollapsed = signal<boolean>(false);

  public handleToggle(event: PanelToggleEvent): void {
    console.log('Toggled:', event.collapsed);
  }
}`,
    collapsedDefault: `<ui-lib-panel header="Advanced Options" [toggleable]="true" [collapsed]="true">
  <p>Hidden until expanded.</p>
</ui-lib-panel>`,
    collapsedDefaultTs: `import { Component } from '@angular/core';
import { Panel } from 'ui-lib-custom/panel';

@Component({
  standalone: true,
  imports: [Panel],
  templateUrl: './my.component.html',
})
export class MyComponent {}`,
    customHeader: `<ui-lib-panel [toggleable]="true">
  <span panelHeader>
    <strong>Featured</strong>
    <span class="badge">New</span>
  </span>
  <p>Body content.</p>
</ui-lib-panel>`,
    customHeaderTs: `import { Component } from '@angular/core';
import { Panel } from 'ui-lib-custom/panel';

@Component({
  standalone: true,
  imports: [Panel],
  templateUrl: './my.component.html',
})
export class MyComponent {}`,
    headerIcons: `<ui-lib-panel header="Report" [toggleable]="true">
  <button panelIcons type="button" (click)="refresh()">↻</button>
  <button panelIcons type="button" (click)="download()">↓</button>
  <p>Body content.</p>
</ui-lib-panel>`,
    headerIconsTs: `import { Component } from '@angular/core';
import { Panel } from 'ui-lib-custom/panel';

@Component({
  standalone: true,
  imports: [Panel],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public refresh(): void { /* reload data */ }
  public download(): void { /* export data */ }
}`,
    footer: `<ui-lib-panel header="Terms of Service">
  <p>Body content.</p>
  <div panelFooter>
    <button type="button">Decline</button>
    <button type="button">Accept</button>
  </div>
</ui-lib-panel>`,
    footerTs: `import { Component } from '@angular/core';
import { Panel } from 'ui-lib-custom/panel';

@Component({
  standalone: true,
  imports: [Panel],
  templateUrl: './my.component.html',
})
export class MyComponent {}`,
    noHeader: `<!-- No header input — header area is automatically hidden -->
<ui-lib-panel>
  <p>This panel has no header. The header area is not rendered.</p>
</ui-lib-panel>

<!-- With a footer, but still no header -->
<ui-lib-panel>
  <p>Body content.</p>
  <div panelFooter>
    <button type="button">Cancel</button>
    <button type="button">Confirm</button>
  </div>
</ui-lib-panel>`,
    noHeaderTs: `import { Component } from '@angular/core';
import { Panel } from 'ui-lib-custom/panel';

@Component({
  standalone: true,
  imports: [Panel],
  templateUrl: './my.component.html',
})
export class MyComponent {}`,
    variants: `<ui-lib-panel header="Material Panel"  variant="material"  [toggleable]="true" />
<ui-lib-panel header="Bootstrap Panel" variant="bootstrap" [toggleable]="true" />
<ui-lib-panel header="Minimal Panel"   variant="minimal"   [toggleable]="true" />`,
    variantsTs: `import { Component } from '@angular/core';
import { Panel } from 'ui-lib-custom/panel';

@Component({
  standalone: true,
  imports: [Panel],
  templateUrl: './my.component.html',
})
export class MyComponent {}`,
  } as const;

  // ---- API data -----------------------------------------------------------

  public readonly inputRows: InputRow[] = [
    {
      input: '<code>header</code>',
      type: '<code>string</code>',
      default: "<code>''</code>",
      description: 'Header title text. Use <code>[panelHeader]</code> projection for rich HTML.',
    },
    {
      input: '<code>toggleable</code>',
      type: '<code>boolean</code>',
      default: '<code>false</code>',
      description: 'Whether the body can be collapsed and expanded.',
    },
    {
      input: '<code>collapsed</code>',
      type: '<code>boolean</code> (model)',
      default: '<code>false</code>',
      description: 'Two-way bound collapsed state. Use <code>[(collapsed)]</code> with a signal.',
    },
    {
      input: '<code>variant</code>',
      type: "<code>'material' | 'bootstrap' | 'minimal' | null</code>",
      default: '<code>null</code>',
      description:
        'Design variant. Falls back to <code>ThemeConfigService</code> when <code>null</code>.',
    },
    {
      input: '<code>styleClass</code>',
      type: '<code>string | null</code>',
      default: '<code>null</code>',
      description: 'Additional CSS classes added to the host element.',
    },
  ];

  public readonly outputRows: OutputRow[] = [
    {
      output: '<code>toggled</code>',
      type: '<code>PanelToggleEvent</code>',
      description: 'Emitted when the collapsed state changes via the toggle button.',
    },
  ];

  public readonly projectionRows: ProjectionRow[] = [
    {
      slot: 'Body',
      selector: '<em>(default)</em>',
      description: 'Main body content.',
    },
    {
      slot: 'Custom header',
      selector: '<code>[panelHeader]</code>',
      description: 'Replaces the text header area. The toggle button is preserved.',
    },
    {
      slot: 'Header icons',
      selector: '<code>[panelIcons]</code>',
      description: 'Action elements placed in the header right area, before the toggle button.',
    },
    {
      slot: 'Footer',
      selector: '<code>[panelFooter]</code>',
      description: 'Content below the body. Always visible regardless of collapsed state.',
    },
  ];

  public readonly cssVarRows: CssVarRow[] = [
    {
      variable: '--uilib-panel-border-color',
      default: 'var(--uilib-surface-300)',
      description: 'Panel border colour.',
    },
    {
      variable: '--uilib-panel-border-radius',
      default: 'var(--uilib-radius-md)',
      description: 'Panel corner radius.',
    },
    {
      variable: '--uilib-panel-header-bg',
      default: 'var(--uilib-surface)',
      description: 'Header background.',
    },
    {
      variable: '--uilib-panel-header-color',
      default: 'var(--uilib-color-text)',
      description: 'Header text colour.',
    },
    {
      variable: '--uilib-panel-header-font-size',
      default: '0.9375rem',
      description: 'Header font size.',
    },
    {
      variable: '--uilib-panel-header-font-weight',
      default: '600',
      description: 'Header font weight.',
    },
    {
      variable: '--uilib-panel-header-padding',
      default: '0.75rem 1rem',
      description: 'Header padding.',
    },
    {
      variable: '--uilib-panel-content-padding',
      default: '1rem',
      description: 'Body content padding.',
    },
    {
      variable: '--uilib-panel-footer-bg',
      default: 'var(--uilib-surface-50)',
      description: 'Footer background.',
    },
    {
      variable: '--uilib-panel-footer-padding',
      default: '0.75rem 1rem',
      description: 'Footer padding.',
    },
    {
      variable: '--uilib-panel-toggle-color',
      default: 'var(--uilib-color-primary)',
      description: 'Toggle button icon colour.',
    },
    {
      variable: '--uilib-panel-toggle-hover-bg',
      default: 'var(--uilib-surface-100)',
      description: 'Toggle button hover background.',
    },
    {
      variable: '--uilib-panel-toggle-size',
      default: '1.75rem',
      description: 'Toggle button width and height.',
    },
    {
      variable: '--uilib-panel-transition',
      default: '200ms ease',
      description: 'Collapse animation duration and easing.',
    },
  ];

  public readonly ariaRows: AriaRow[] = [
    {
      element: 'Host',
      attribute: '<code>role</code>',
      value: '<code>region</code>',
      notes: 'Marks the panel as a named landmark region.',
    },
    {
      element: 'Host',
      attribute: '<code>aria-labelledby</code>',
      value: 'Header <code>id</code>',
      notes: 'Points to the header element to give the region an accessible name.',
    },
    {
      element: 'Header <code>&lt;div&gt;</code>',
      attribute: '<code>id</code>',
      value: '<code>ui-lib-panel-{n}-header</code>',
      notes: 'Unique per-instance; referenced by <code>aria-labelledby</code>.',
    },
    {
      element: 'Content <code>&lt;div&gt;</code>',
      attribute: '<code>id</code>',
      value: '<code>ui-lib-panel-{n}-content</code>',
      notes: 'Unique per-instance; referenced by <code>aria-controls</code>.',
    },
    {
      element: 'Content <code>&lt;div&gt;</code>',
      attribute: '<code>aria-hidden</code>',
      value: '<code>true</code> when collapsed',
      notes: 'Removed when expanded so AT reads the body content.',
    },
    {
      element: 'Toggle <code>&lt;button&gt;</code>',
      attribute: '<code>aria-expanded</code>',
      value: '<code>true</code> / <code>false</code>',
      notes: 'Communicates the current open/closed state to screen readers.',
    },
    {
      element: 'Toggle <code>&lt;button&gt;</code>',
      attribute: '<code>aria-controls</code>',
      value: 'Content <code>id</code>',
      notes: 'Associates the button with the region it controls.',
    },
    {
      element: 'Toggle <code>&lt;button&gt;</code>',
      attribute: '<code>aria-label</code>',
      value: '<code>Toggle panel</code>',
      notes: 'Descriptive label for the icon-only button.',
    },
    {
      element: 'Toggle icon <code>&lt;span&gt;</code>',
      attribute: '<code>aria-hidden</code>',
      value: '<code>true</code>',
      notes: 'Decorative chevron is hidden from assistive technology.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Tab',
      target: 'Toggle button',
      action: 'Moves focus to or away from the toggle button.',
    },
    {
      key: 'Enter',
      target: 'Toggle button',
      action: 'Toggles the panel open or collapsed.',
    },
    {
      key: 'Space',
      target: 'Toggle button',
      action: 'Toggles the panel open or collapsed.',
    },
  ];

  // ---- Demo state ---------------------------------------------------------

  public readonly isToggleableCollapsed: WritableSignal<boolean> = signal<boolean>(false);
  public readonly isStartCollapsed: WritableSignal<boolean> = signal<boolean>(true);
  public readonly lastToggleEvent: WritableSignal<PanelToggleEvent | null> =
    signal<PanelToggleEvent | null>(null);

  // ---- Playground ---------------------------------------------------------

  public readonly playgroundToggleable: WritableSignal<boolean> = signal<boolean>(true);
  public readonly playgroundCollapsed: WritableSignal<boolean> = signal<boolean>(false);
  public readonly playgroundVariant: WritableSignal<PanelVariant> =
    signal<PanelVariant>('material');

  public togglePlaygroundToggleable(): void {
    const next: boolean = !this.playgroundToggleable();
    this.playgroundToggleable.set(next);
    if (!next) {
      this.playgroundCollapsed.set(false);
    }
  }

  public togglePlaygroundCollapsed(): void {
    if (!this.playgroundToggleable()) return;
    this.playgroundCollapsed.set(!this.playgroundCollapsed());
  }

  public setPlaygroundVariant(variant: PanelVariant): void {
    this.playgroundVariant.set(variant);
  }

  public handleToggle(event: PanelToggleEvent): void {
    this.lastToggleEvent.set(event);
  }

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }
}
