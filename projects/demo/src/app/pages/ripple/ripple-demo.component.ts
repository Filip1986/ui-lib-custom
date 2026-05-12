import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Ripple } from 'ui-lib-custom/ripple';
import { Button } from 'ui-lib-custom/button';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the Ripple directive.
 */
@Component({
  selector: 'app-ripple-demo',
  standalone: true,
  imports: [Ripple, Button, DocPageLayoutComponent, DocTocComponent, DocCodeSnippetComponent],
  templateUrl: './ripple-demo.component.html',
  styleUrl: './ripple-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RippleDemoComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

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
}
