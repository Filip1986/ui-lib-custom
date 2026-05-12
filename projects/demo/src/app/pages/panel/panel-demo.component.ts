import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal } from '@angular/core';
import { Panel } from 'ui-lib-custom/panel';
import type { PanelToggleEvent, PanelVariant } from 'ui-lib-custom/panel';
import { Button } from 'ui-lib-custom/button';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 * Demo page for the Panel component.
 */
@Component({
  selector: 'app-panel-demo',
  standalone: true,
  imports: [Panel, Button, DocPageLayoutComponent, DocTocComponent, DocCodeSnippetComponent],
  templateUrl: './panel-demo.component.html',
  styleUrl: './panel-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelDemoComponent {
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
    readonly toggleable: string;
    readonly collapsedDefault: string;
    readonly customHeader: string;
    readonly headerIcons: string;
    readonly footer: string;
    readonly variants: string;
  } = {
    import: `import { Panel } from 'ui-lib-custom/panel';`,
    basic: `<ui-lib-panel header="Introduction">
  <p>Panel body content.</p>
</ui-lib-panel>`,
    toggleable: `<ui-lib-panel
  header="Collapsible Section"
  [toggleable]="true"
  [(collapsed)]="isCollapsed"
  (toggled)="handleToggle($event)"
>
  <p>Click the chevron button in the header to toggle visibility.</p>
</ui-lib-panel>`,
    collapsedDefault: `<ui-lib-panel header="Advanced Options" [toggleable]="true" [collapsed]="true">
  <p>Hidden until expanded.</p>
</ui-lib-panel>`,
    customHeader: `<ui-lib-panel [toggleable]="true">
  <span panelHeader>
    <strong>Featured</strong>
    <span class="badge">New</span>
  </span>
  <p>Body content.</p>
</ui-lib-panel>`,
    headerIcons: `<ui-lib-panel header="Report" [toggleable]="true">
  <button panelIcons type="button" (click)="refresh()">↻</button>
  <button panelIcons type="button" (click)="download()">↓</button>
  <p>Body content.</p>
</ui-lib-panel>`,
    footer: `<ui-lib-panel header="Terms of Service">
  <p>Body content.</p>
  <div panelFooter>
    <button type="button">Decline</button>
    <button type="button">Accept</button>
  </div>
</ui-lib-panel>`,
    variants: `<ui-lib-panel header="Material Panel"  variant="material"  [toggleable]="true" />
<ui-lib-panel header="Bootstrap Panel" variant="bootstrap" [toggleable]="true" />
<ui-lib-panel header="Minimal Panel"   variant="minimal"   [toggleable]="true" />`,
  } as const;

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
