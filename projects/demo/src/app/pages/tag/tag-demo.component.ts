import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Tag } from 'ui-lib-custom/tag';
import type { TagSeverity, TagSize, TagVariant } from 'ui-lib-custom/tag';
import { Button } from 'ui-lib-custom/button';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the Tag component.
 */
@Component({
  selector: 'app-tag-demo',
  standalone: true,
  imports: [Tag, Button, DocPageLayoutComponent, DocTocComponent, DocCodeSnippetComponent],
  templateUrl: './tag-demo.component.html',
  styleUrl: './tag-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagDemoComponent {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'severity', label: 'Severity' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'rounded', label: 'Rounded' },
    { id: 'icons', label: 'With Icons' },
    { id: 'dismissible', label: 'Dismissible' },
    { id: 'variants', label: 'Design Variants' },
    { id: 'playground', label: 'Playground' },
    {
      id: 'api',
      label: 'API',
      children: [
        { id: 'api-inputs', label: 'Inputs' },
        { id: 'api-outputs', label: 'Outputs' },
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

  public readonly severities: TagSeverity[] = [
    'primary',
    'secondary',
    'success',
    'info',
    'warn',
    'danger',
    'contrast',
  ];

  public readonly severityLabels: Record<TagSeverity, string> = {
    primary: 'Primary',
    secondary: 'Secondary',
    success: 'Success',
    info: 'Info',
    warn: 'Warning',
    danger: 'Danger',
    contrast: 'Contrast',
  };

  public readonly sizes: TagSize[] = ['sm', 'md', 'lg'];
  public readonly variants: TagVariant[] = ['material', 'bootstrap', 'minimal'];

  public readonly snippets: {
    readonly import: string;
    readonly severity: string;
    readonly sizes: string;
    readonly rounded: string;
    readonly icons: string;
    readonly dismissible: string;
    readonly variants: string;
  } = {
    import: `import { Tag } from 'ui-lib-custom/tag';`,
    severity: `<ui-lib-tag value="Primary"   severity="primary" />
<ui-lib-tag value="Secondary" severity="secondary" />
<ui-lib-tag value="Success"   severity="success" />
<ui-lib-tag value="Info"      severity="info" />
<ui-lib-tag value="Warning"   severity="warn" />
<ui-lib-tag value="Danger"    severity="danger" />
<ui-lib-tag value="Contrast"  severity="contrast" />`,
    sizes: `<ui-lib-tag value="Small"  size="sm" severity="primary" />
<ui-lib-tag value="Medium" size="md" severity="primary" />
<ui-lib-tag value="Large"  size="lg" severity="primary" />`,
    rounded: `<ui-lib-tag value="Primary" severity="primary" [rounded]="true" />
<ui-lib-tag value="Success" severity="success" [rounded]="true" />`,
    icons: `<ui-lib-tag value="Primary" icon="pi pi-tag"                  severity="primary" />
<ui-lib-tag value="Success" icon="pi pi-check-circle"          severity="success" />
<ui-lib-tag value="Warning" icon="pi pi-exclamation-triangle"  severity="warn" />`,
    dismissible: `<ui-lib-tag
  value="Python"
  severity="info"
  [dismissible]="true"
  (removed)="removeTag()"
/>`,
    variants: `<ui-lib-tag value="Tag" severity="primary" variant="material" />
<ui-lib-tag value="Tag" severity="primary" variant="bootstrap" />
<ui-lib-tag value="Tag" severity="primary" variant="minimal" />`,
  } as const;

  // ---- Playground ---------------------------------------------------------

  public readonly playgroundValue: WritableSignal<string> = signal<string>('Tag');
  public readonly playgroundSeverity: WritableSignal<TagSeverity> = signal<TagSeverity>('primary');
  public readonly playgroundSize: WritableSignal<TagSize> = signal<TagSize>('md');
  public readonly playgroundVariant: WritableSignal<TagVariant> = signal<TagVariant>('material');
  public readonly playgroundRounded: WritableSignal<boolean> = signal<boolean>(false);
  public readonly playgroundIcon: WritableSignal<string | null> = signal<string | null>(null);
  public readonly playgroundDismissible: WritableSignal<boolean> = signal<boolean>(false);

  public setSeverity(severity: TagSeverity): void {
    this.playgroundSeverity.set(severity);
  }

  public setSize(size: TagSize): void {
    this.playgroundSize.set(size);
  }

  public setVariant(variant: TagVariant): void {
    this.playgroundVariant.set(variant);
  }

  public toggleRounded(): void {
    this.playgroundRounded.set(!this.playgroundRounded());
  }

  public toggleIcon(): void {
    this.playgroundIcon.set(this.playgroundIcon() ? null : 'pi pi-tag');
  }

  public toggleDismissible(): void {
    this.playgroundDismissible.set(!this.playgroundDismissible());
  }

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }
}
