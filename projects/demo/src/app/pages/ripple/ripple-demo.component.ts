import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Ripple } from 'ui-lib-custom/ripple';
import { Button } from 'ui-lib-custom/button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocSectionComponent } from '@demo/shared/doc-page/doc-section.component';

/**
 * Demo page for the Ripple directive.
 */
@Component({
  selector: 'app-ripple-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    Ripple,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocCssVarsTableComponent,
    DocKeyboardNavComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
    DocSectionComponent,
  ],
  templateUrl: './ripple-demo.component.html',
  styleUrl: './ripple-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RippleDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 8,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 8,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
  };

  public readonly importCode: string = "import { Ripple } from 'ui-lib-custom/ripple'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly cssVarRows: CssVarRow[] = [
    {
      variable: '--uilib-ripple-color',
      default: 'rgba(255, 255, 255, 0.35)',
      description: 'Wave background colour.',
    },
    { variable: '--uilib-ripple-duration', default: '600ms', description: 'Animation duration.' },
    {
      variable: '--uilib-ripple-easing',
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      description: 'Animation timing function.',
    },
  ];

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'dark-ripple', label: 'Dark Ripple' },
    { id: 'custom-duration', label: 'Custom Duration' },
    { id: 'disabled', label: 'Disabled' },
    { id: 'any-element', label: 'Any Element' },
    {
      id: 'api',
      label: 'API',
      children: [
        { id: 'api-inputs', label: 'Inputs' },
        { id: 'api-css', label: 'CSS Custom Properties' },
      ],
    },
    {
      id: 'accessibility',
      label: 'Accessibility',
      children: [
        { id: 'a11y-aria', label: 'ARIA Attributes' },
        { id: 'a11y-keyboard', label: 'Keyboard' },
      ],
    },
  ];

  public readonly snippets: {
    readonly import: string;
    readonly basic: string;
    readonly basicTs: string;
    readonly darkRipple: string;
    readonly darkRippleTs: string;
    readonly customDuration: string;
    readonly customDurationTs: string;
    readonly disabled: string;
    readonly disabledTs: string;
    readonly anyElement: string;
    readonly anyElementTs: string;
  } = {
    import: `import { Ripple } from 'ui-lib-custom/ripple';`,
    basic: `<ui-lib-button severity="primary" uiLibRipple>Primary Button</ui-lib-button>
<ui-lib-button severity="secondary" uiLibRipple>Secondary Button</ui-lib-button>
<ui-lib-button severity="danger" uiLibRipple>Danger Button</ui-lib-button>`,
    basicTs: `import { Component } from '@angular/core';
import { Button } from 'ui-lib-custom/button';
import { Ripple } from 'ui-lib-custom/ripple';

@Component({
  standalone: true,
  imports: [Button, Ripple],
  templateUrl: './my.component.html',
})
export class MyComponent {}`,
    darkRipple: `<!-- Use a dark ripple colour on light or white surfaces -->
<ui-lib-button appearance="soft" uiLibRipple [rippleColor]="'rgba(0,0,0,0.12)'">
  Light Button
</ui-lib-button>

<!-- Per-element surface with custom indigo ripple -->
<div uiLibRipple [rippleColor]="'rgba(99,102,241,0.25)'">
  Click me — card surface
</div>`,
    darkRippleTs: `import { Component } from '@angular/core';
import { Button } from 'ui-lib-custom/button';
import { Ripple } from 'ui-lib-custom/ripple';

@Component({
  standalone: true,
  imports: [Button, Ripple],
  templateUrl: './my.component.html',
})
export class MyComponent {}`,
    customDuration: `<ui-lib-button uiLibRipple [rippleDuration]="'200ms'">Fast (200ms)</ui-lib-button>
<ui-lib-button uiLibRipple>Default (600ms)</ui-lib-button>
<ui-lib-button uiLibRipple [rippleDuration]="'1200ms'">Slow (1200ms)</ui-lib-button>`,
    customDurationTs: `import { Component } from '@angular/core';
import { Button } from 'ui-lib-custom/button';
import { Ripple } from 'ui-lib-custom/ripple';

@Component({
  standalone: true,
  imports: [Button, Ripple],
  templateUrl: './my.component.html',
})
export class MyComponent {}`,
    disabled: `<ui-lib-button uiLibRipple [disabled]="isDisabled()">
  {{ isDisabled() ? 'Ripple disabled' : 'Ripple enabled' }}
</ui-lib-button>`,
    disabledTs: `import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Button } from 'ui-lib-custom/button';
import { Ripple } from 'ui-lib-custom/ripple';

@Component({
  standalone: true,
  imports: [Button, Ripple],
  templateUrl: './my.component.html',
})
export class MyComponent {
  public readonly isDisabled: WritableSignal<boolean> = signal<boolean>(false);

  public toggleDisabled(): void {
    this.isDisabled.set(!this.isDisabled());
  }
}`,
    anyElement: `<ul>
  <li uiLibRipple [rippleColor]="'rgba(99,102,241,0.2)'">List item one</li>
  <li uiLibRipple [rippleColor]="'rgba(99,102,241,0.2)'">List item two</li>
  <li uiLibRipple [rippleColor]="'rgba(99,102,241,0.2)'">List item three</li>
</ul>`,
    anyElementTs: `import { Component } from '@angular/core';
import { Ripple } from 'ui-lib-custom/ripple';

@Component({
  standalone: true,
  imports: [Ripple],
  templateUrl: './my.component.html',
})
export class MyComponent {}`,
  } as const;

  public readonly isDisabled: WritableSignal<boolean> = signal<boolean>(false);

  public toggleDisabled(): void {
    this.isDisabled.set(!this.isDisabled());
  }

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: '[uilibRipple]',
      type: 'directive',
      description: 'Apply to any element to add a Material-style ink ripple on click.',
    },
    {
      name: 'rippleColor',
      type: 'string',
      default: "'currentColor'",
      description: 'CSS colour of the ripple (accepts any valid CSS colour value).',
    },
    {
      name: 'rippleOpacity',
      type: 'number',
      default: '0.12',
      description: 'Opacity multiplier applied to the ripple colour.',
    },
    {
      name: 'rippleDuration',
      type: 'number',
      default: '400',
      description: 'Ripple animation duration in milliseconds.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    {
      key: 'Enter',
      action:
        'Fires the native <code>click</code> event on <code>&lt;button&gt;</code> / <code>&lt;a&gt;</code> elements — the ripple effect responds automatically.',
    },
    {
      key: 'Space',
      action: 'Same as <kbd>Enter</kbd> for <code>&lt;button&gt;</code> elements.',
    },
  ];

  public readonly apiInputRows: ApiPropRow[] = [
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'When true, no ripple wave is produced on click.',
    },
    {
      name: 'rippleColor',
      type: 'string',
      default: "''",
      description:
        'Inline override for <code>--uilib-ripple-color</code>. Any valid CSS colour (e.g. <code>rgba(0,0,0,0.12)</code>).',
    },
    {
      name: 'rippleDuration',
      type: 'string',
      default: "''",
      description:
        "Inline override for <code>--uilib-ripple-duration</code> (e.g. <code>'400ms'</code>).",
    },
  ];
}
