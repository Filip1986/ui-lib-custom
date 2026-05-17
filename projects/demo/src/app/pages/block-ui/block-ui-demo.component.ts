import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { BlockUI } from 'ui-lib-custom/block-ui';
import { Button } from 'ui-lib-custom/button';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the BlockUI component.
 */
@Component({
  selector: 'app-block-ui-demo',
  standalone: true,
  imports: [CodeSnippet, BlockUI, Button, DocPageLayoutComponent, DocTocComponent],
  templateUrl: './block-ui-demo.component.html',
  styleUrl: './block-ui-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockUiDemoComponent {
  public readonly importCode: string = "import { BlockUI } from 'ui-lib-custom/block-ui'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'custom-mask', label: 'Custom Mask' },
    { id: 'variants', label: 'Variants' },
    {
      id: 'api',
      label: 'API',
      children: [
        { id: 'api-inputs', label: 'Inputs' },
        { id: 'api-slots', label: 'Content Slots' },
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
    readonly customMask: string;
    readonly variants: string;
  } = {
    import: `import { BlockUI } from 'ui-lib-custom/block-ui';`,
    basic: `<ui-lib-block-ui [(blocked)]="isBlocked">
  <!-- protected content -->
</ui-lib-block-ui>`,
    customMask: `<ui-lib-block-ui [(blocked)]="isBlocked">
  <!-- protected content -->
  <div blockTemplate class="my-spinner-content">
    <span class="spinner" role="img" aria-label="Loading"></span>
    Processing…
  </div>
</ui-lib-block-ui>`,
    variants: `<ui-lib-block-ui variant="material"  [(blocked)]="isBlocked">...</ui-lib-block-ui>
<ui-lib-block-ui variant="bootstrap" [(blocked)]="isBlocked">...</ui-lib-block-ui>
<ui-lib-block-ui variant="minimal"   [(blocked)]="isBlocked">...</ui-lib-block-ui>`,
  } as const;

  public readonly basicBlocked: WritableSignal<boolean> = signal<boolean>(false);
  public readonly spinnerBlocked: WritableSignal<boolean> = signal<boolean>(false);
  public readonly materialBlocked: WritableSignal<boolean> = signal<boolean>(false);
  public readonly bootstrapBlocked: WritableSignal<boolean> = signal<boolean>(false);
  public readonly minimalBlocked: WritableSignal<boolean> = signal<boolean>(false);

  public toggleBasic(): void {
    this.basicBlocked.update((value: boolean): boolean => !value);
  }

  public toggleSpinner(): void {
    this.spinnerBlocked.update((value: boolean): boolean => !value);
  }

  public toggleMaterial(): void {
    this.materialBlocked.update((value: boolean): boolean => !value);
  }

  public toggleBootstrap(): void {
    this.bootstrapBlocked.update((value: boolean): boolean => !value);
  }

  public toggleMinimal(): void {
    this.minimalBlocked.update((value: boolean): boolean => !value);
  }

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }
}
