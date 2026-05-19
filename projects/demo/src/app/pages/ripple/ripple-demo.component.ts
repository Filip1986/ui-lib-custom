import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Ripple } from 'ui-lib-custom/ripple';
import { Button } from 'ui-lib-custom/button';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { DocPageHeaderComponent } from '../../shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import { DocCssVarsTableComponent } from '../../shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '../../shared/doc-page/doc-css-vars-table.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocKeyboardNavComponent } from '../../shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '../../shared/doc-page/doc-keyboard-nav.component';

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
    DocQualityBadgeComponent,
    DocKeyboardNavComponent,
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
    readonly darkRipple: string;
    readonly customDuration: string;
    readonly disabled: string;
    readonly anyElement: string;
  } = {
    import: `import { Ripple } from 'ui-lib-custom/ripple';`,
    basic: `<ui-lib-button severity="primary" uiLibRipple>Primary Button</ui-lib-button>
<ui-lib-button severity="secondary" uiLibRipple>Secondary Button</ui-lib-button>
<ui-lib-button severity="danger" uiLibRipple>Danger Button</ui-lib-button>`,
    darkRipple: `<!-- Use a dark ripple colour on light or white surfaces -->
<ui-lib-button appearance="soft" uiLibRipple [rippleColor]="'rgba(0,0,0,0.12)'">
  Light Button
</ui-lib-button>

<!-- Per-element surface with custom indigo ripple -->
<div uiLibRipple [rippleColor]="'rgba(99,102,241,0.25)'">
  Click me — card surface
</div>`,
    customDuration: `<ui-lib-button uiLibRipple [rippleDuration]="'200ms'">Fast (200ms)</ui-lib-button>
<ui-lib-button uiLibRipple>Default (600ms)</ui-lib-button>
<ui-lib-button uiLibRipple [rippleDuration]="'1200ms'">Slow (1200ms)</ui-lib-button>`,
    disabled: `<ui-lib-button uiLibRipple [disabled]="isDisabled()">
  {{ isDisabled() ? 'Ripple disabled' : 'Ripple enabled' }}
</ui-lib-button>`,
    anyElement: `<ul>
  <li uiLibRipple [rippleColor]="'rgba(99,102,241,0.2)'">List item one</li>
  <li uiLibRipple [rippleColor]="'rgba(99,102,241,0.2)'">List item two</li>
  <li uiLibRipple [rippleColor]="'rgba(99,102,241,0.2)'">List item three</li>
</ul>`,
  } as const;

  public readonly isDisabled: WritableSignal<boolean> = signal<boolean>(false);

  public toggleDisabled(): void {
    this.isDisabled.set(!this.isDisabled());
  }

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

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
}
