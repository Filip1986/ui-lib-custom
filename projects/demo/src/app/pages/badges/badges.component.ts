import { Component, ChangeDetectionStrategy, signal, ViewChild } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Badge, Button, Card, Tabs, Tab } from 'ui-lib-custom';
import type { BadgeColor, BadgeVariant, BadgeSize, TabsValue } from 'ui-lib-custom';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { CodePreviewComponent } from '../../shared/components/code-preview/code-preview.component';
import { VariantComparisonComponent } from '../../shared/components/variant-comparison/variant-comparison.component';

type TabKey =
  | 'playground'
  | 'variants'
  | 'api-reference'
  | 'usage'
  | 'performance'
  | 'accessibility';

type ViewportPreset = { key: string; label: string; width: number; height: number };

/**
 * Demo page for badge variants and usage.
 */
@Component({
  selector: 'app-badges',
  standalone: true,
  imports: [
    Badge,
    Button,
    Tabs,
    Tab,
    DocPageLayoutComponent,
    DocCodeSnippetComponent,
    DocDemoViewportComponent,
    Card,
    FormsModule,
    CodePreviewComponent,
    VariantComparisonComponent,
  ],
  templateUrl: './badges.component.html',
  styleUrl: './badges.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgesComponent {
  public readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'variants', label: 'Variants' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
    { id: 'performance', label: 'Performance Features' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public readonly activeTab: WritableSignal<TabKey> = signal<TabKey>('playground');

  public setTab(tab: TabKey): void {
    this.activeTab.set(tab);
  }

  public onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as TabKey);
  }

  public readonly variant: WritableSignal<BadgeVariant> = signal<BadgeVariant>('solid');
  public readonly color: WritableSignal<BadgeColor> = signal<BadgeColor>('primary');
  public readonly size: WritableSignal<BadgeSize> = signal<BadgeSize>('md');
  public readonly pill: WritableSignal<boolean> = signal<boolean>(false);
  public readonly dot: WritableSignal<boolean> = signal<boolean>(false);
  public readonly text: WritableSignal<string> = signal<string>('New');

  public readonly variants: BadgeVariant[] = ['solid', 'outline', 'subtle'];
  public readonly colors: BadgeColor[] = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'neutral',
  ];
  public readonly sizes: BadgeSize[] = ['sm', 'md', 'lg'];

  public readonly snippets: { readonly usage: string } = {
    usage: `import { Badge } from 'ui-lib-custom';

@Component({
  imports: [Badge],
  template: \
    '<ui-lib-badge color="success" variant="solid">Active</ui-lib-badge>'
})`,
  } as const;

  @ViewChild(DocDemoViewportComponent) public viewport?: DocDemoViewportComponent;

  public get viewportPresets(): ViewportPreset[] {
    return this.viewport?.presets() ?? [];
  }

  public viewportDisplayWidth(): number {
    return this.viewport?.displayWidth() ?? 0;
  }

  public viewportDisplayHeight(): number {
    return this.viewport?.displayHeight() ?? 0;
  }

  public viewportCustomWidth(): number {
    return this.viewport?.customWidth() ?? 0;
  }

  public setViewportCustomWidth(value: number): void {
    this.viewport?.setCustomWidth(value);
  }

  public setViewportPreset(preset: ViewportPreset): void {
    this.viewport?.setPreset(preset);
  }

  public applyViewportCustom(): void {
    this.viewport?.setCustom();
  }

  public rotateViewport(): void {
    this.viewport?.rotate();
  }

  public setViewportDensity(value: 'default' | 'comfortable' | 'compact'): void {
    this.viewport?.setDensity(value);
  }

  public readonly badgeExample: string = `<ui-lib-badge color="success" variant="solid">Active</ui-lib-badge>`;
}
