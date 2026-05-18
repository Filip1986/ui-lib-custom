import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { CodeSnippet } from 'ui-lib-custom/code-snippet';
import { Chip } from 'ui-lib-custom/chip';
import type { ChipSize, ChipVariant } from 'ui-lib-custom/chip';
import { Button } from 'ui-lib-custom/button';
import { DocPageHeaderComponent } from '../../shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import { DocCssVarsTableComponent } from '../../shared/doc-page/doc-css-vars-table.component';
import type { CssVarRow } from '../../shared/doc-page/doc-css-vars-table.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the Chip component.
 */
@Component({
  selector: 'app-chip-demo',
  standalone: true,
  imports: [
    CodeSnippet,
    Chip,
    Button,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocCssVarsTableComponent,
  ],
  templateUrl: './chip-demo.component.html',
  styleUrl: './chip-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipDemoComponent {
  public readonly importCode: string = "import { Chip } from 'ui-lib-custom/chip'";
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly cssVarRows: CssVarRow[] = [
    { variable: '--uilib-chip-bg', description: 'Chip background colour.' },
    { variable: '--uilib-chip-color', description: 'Chip text colour.' },
    { variable: '--uilib-chip-border', description: 'Chip border shorthand.' },
    { variable: '--uilib-chip-border-radius', description: 'Chip border radius.' },
    { variable: '--uilib-chip-padding-y', description: 'Vertical padding.' },
    { variable: '--uilib-chip-padding-x', description: 'Horizontal padding.' },
    {
      variable: '--uilib-chip-gap',
      description: 'Gap between icon, image, label, and remove button.',
    },
    { variable: '--uilib-chip-font-size', description: 'Font size.' },
    { variable: '--uilib-chip-font-weight', description: 'Font weight.' },
    { variable: '--uilib-chip-image-size', description: 'Circular image diameter.' },
    { variable: '--uilib-chip-remove-bg-hover', description: 'Remove button hover background.' },
    {
      variable: '--uilib-chip-transition',
      description: 'Transition shorthand. Respects <code>prefers-reduced-motion: reduce</code>.',
    },
  ];

  public readonly sections: DocSection[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'basic', label: 'Basic' },
    { id: 'icon', label: 'With Icon' },
    { id: 'image', label: 'With Image' },
    { id: 'removable', label: 'Removable' },
    { id: 'selectable', label: 'Selectable' },
    { id: 'sizes', label: 'Sizes' },
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

  public readonly sizes: ChipSize[] = ['sm', 'md', 'lg'];
  public readonly variants: ChipVariant[] = ['material', 'bootstrap', 'minimal'];

  public readonly snippets: {
    readonly import: string;
    readonly basic: string;
    readonly icon: string;
    readonly image: string;
    readonly removable: string;
    readonly selectable: string;
    readonly sizes: string;
    readonly variants: string;
  } = {
    import: `import { Chip } from 'ui-lib-custom/chip';`,
    basic: `<ui-lib-chip label="Action" />
<ui-lib-chip label="Comedy" />
<ui-lib-chip label="Mystery" />`,
    icon: `<ui-lib-chip label="Angular"  icon="pi pi-bolt" />
<ui-lib-chip label="Verified" icon="pi pi-check-circle" />
<ui-lib-chip label="Starred"  icon="pi pi-star" />`,
    image: `<ui-lib-chip label="Amy"   image="/assets/amy.png"   imageAlt="Amy Elsner" />
<ui-lib-chip label="Asiya" image="/assets/asiya.png" imageAlt="Asiya Javayant" />`,
    removable: `<ui-lib-chip
  label="Angular"
  [removable]="true"
  (removed)="removeChip('Angular')"
/>`,
    selectable: `<div role="listbox" aria-label="Frameworks" aria-multiselectable="true">
  <ui-lib-chip
    label="Angular"
    [selectable]="true"
    [selected]="isSelected"
    (selectedChange)="isSelected = $event"
  />
</div>`,
    sizes: `<ui-lib-chip label="Small"  size="sm" icon="pi pi-tag" />
<ui-lib-chip label="Medium" size="md" icon="pi pi-tag" />
<ui-lib-chip label="Large"  size="lg" icon="pi pi-tag" />`,
    variants: `<ui-lib-chip label="Label only" variant="material" />
<ui-lib-chip label="Label only" variant="bootstrap" />
<ui-lib-chip label="Label only" variant="minimal" />`,
  } as const;

  // ---- Removable demo -----------------------------------------------------

  public readonly activeChips: WritableSignal<string[]> = signal<string[]>([
    'Angular',
    'React',
    'Vue',
    'Svelte',
  ]);
  public readonly removedChips: WritableSignal<string[]> = signal<string[]>([]);

  // ---- Selectable demo ----------------------------------------------------

  public readonly demoFilter: { label: string; selected: WritableSignal<boolean> }[] = [
    { label: 'Angular', selected: signal<boolean>(true) },
    { label: 'React', selected: signal<boolean>(false) },
    { label: 'Vue', selected: signal<boolean>(false) },
    { label: 'Svelte', selected: signal<boolean>(false) },
  ];

  // ---- Playground ---------------------------------------------------------

  public readonly playgroundSize: WritableSignal<ChipSize> = signal<ChipSize>('md');
  public readonly playgroundVariant: WritableSignal<ChipVariant> = signal<ChipVariant>('material');
  public readonly playgroundRemovable: WritableSignal<boolean> = signal<boolean>(false);
  public readonly playgroundSelectable: WritableSignal<boolean> = signal<boolean>(false);
  public readonly playgroundSelected: WritableSignal<boolean> = signal<boolean>(false);
  public readonly playgroundIcon: WritableSignal<string | null> = signal<string | null>(null);

  public removeChip(label: string): void {
    this.activeChips.update((chips: string[]): string[] =>
      chips.filter((chip: string): boolean => chip !== label)
    );
    this.removedChips.update((removed: string[]): string[] => [...removed, label]);
  }

  public resetChips(): void {
    this.activeChips.set(['Angular', 'React', 'Vue', 'Svelte']);
    this.removedChips.set([]);
  }

  public setSize(size: ChipSize): void {
    this.playgroundSize.set(size);
  }

  public setVariant(variant: ChipVariant): void {
    this.playgroundVariant.set(variant);
  }

  public toggleRemovable(): void {
    this.playgroundRemovable.set(!this.playgroundRemovable());
  }

  public toggleSelectable(): void {
    const next: boolean = !this.playgroundSelectable();
    this.playgroundSelectable.set(next);
    if (!next) {
      this.playgroundSelected.set(false);
    }
  }

  public setPlaygroundSelected(value: boolean): void {
    this.playgroundSelected.set(value);
  }

  public toggleIcon(): void {
    this.playgroundIcon.set(this.playgroundIcon() ? null : 'pi pi-tag');
  }

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }
}
