import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Button,
  Card,
  Checkbox,
  CheckboxSize,
  CheckboxVariant,
  Tabs,
  Tab,
  TabsValue,
} from 'ui-lib-custom';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';
import { CodePreviewComponent } from '../../shared/components/code-preview/code-preview.component';
import { VariantComparisonComponent } from '../../shared/components/variant-comparison/variant-comparison.component';

type TabKey = 'playground' | 'variants' | 'api-reference' | 'accessibility' | 'usage';
type ViewportPreset = { key: string; label: string; width: number; height: number };

@Component({
  selector: 'app-checkboxes',
  standalone: true,
  imports: [
    CommonModule,
    Checkbox,
    Button,
    Tabs,
    Tab,
    Card,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
    DocCodeSnippetComponent,
    FormsModule,
    CodePreviewComponent,
    VariantComparisonComponent,
  ],
  templateUrl: './checkboxes.component.html',
  styleUrl: './checkboxes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxesComponent {
  public readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'variants', label: 'Variants' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public readonly variants: CheckboxVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly sizes: CheckboxSize[] = ['sm', 'md', 'lg'];

  public readonly variant = signal<CheckboxVariant>('material');
  public readonly size = signal<CheckboxSize>('md');
  public readonly disabled = signal(false);
  public readonly indeterminate = signal(false);
  public readonly showDescription = signal(true);
  public readonly label = signal('Receive product updates');
  public readonly description = signal('Weekly highlights, delivered every Monday.');

  public checkedPrimary: boolean = false;
  public checkedSecondary: boolean = true;

  public readonly activeTab = signal<TabKey>('playground');

  @ViewChild(DocDemoViewportComponent) public viewport?: DocDemoViewportComponent;

  public readonly playgroundDescription = computed<string | null>((): string | null =>
    this.showDescription() ? this.description() : null
  );

  public readonly snippets = {
    usage: `import { Checkbox } from 'ui-lib-custom';

@Component({
  standalone: true,
  imports: [Checkbox],
  template: \`
    <ui-lib-checkbox
      label="Sync data"
      description="Keep devices aligned"
      variant="material"
      size="md"
      [(checked)]="syncEnabled">
    </ui-lib-checkbox>
  \`
})
export class SettingsComponent {
  syncEnabled = false;
}`,
  } as const;

  public readonly checkboxExample = `<ui-lib-checkbox label="Receive updates" [(checked)]="checkedPrimary"></ui-lib-checkbox>`;

  public selectVariant(value: CheckboxVariant): void {
    this.variant.set(value);
  }

  public selectSize(value: CheckboxSize): void {
    this.size.set(value);
  }

  public onPrimaryChange(next: boolean): void {
    this.checkedPrimary = next;
  }

  public onSecondaryChange(next: boolean): void {
    this.checkedSecondary = next;
  }

  public setTab(tab: TabKey): void {
    this.activeTab.set(tab);
  }

  public onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as TabKey);
  }

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
}
