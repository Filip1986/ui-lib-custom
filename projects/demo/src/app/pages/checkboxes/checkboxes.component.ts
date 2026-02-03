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
import { DocControlGroupComponent } from '../../shared/doc-page/doc-control-group.component';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';

type TabKey = 'playground' | 'api-reference' | 'accessibility' | 'usage';

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
    DocControlGroupComponent,
    DocDemoViewportComponent,
    DocCodeSnippetComponent,
    FormsModule,
  ],
  templateUrl: './checkboxes.component.html',
  styleUrl: './checkboxes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxesComponent {
  readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  readonly variants: CheckboxVariant[] = ['material', 'bootstrap', 'minimal'];
  readonly sizes: CheckboxSize[] = ['sm', 'md', 'lg'];

  variant = signal<CheckboxVariant>('material');
  size = signal<CheckboxSize>('md');
  disabled = signal(false);
  indeterminate = signal(false);
  showDescription = signal(true);
  label = signal('Receive product updates');
  description = signal('Weekly highlights, delivered every Monday.');

  checkedPrimary = false;
  checkedSecondary = true;

  activeTab = signal<TabKey>('playground');

  @ViewChild(DocDemoViewportComponent) viewport?: DocDemoViewportComponent;

  readonly playgroundDescription = computed(() =>
    this.showDescription() ? this.description() : null
  );

  readonly snippets = {
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

  selectVariant(value: CheckboxVariant): void {
    this.variant.set(value);
  }

  selectSize(value: CheckboxSize): void {
    this.size.set(value);
  }

  onPrimaryChange(next: boolean): void {
    this.checkedPrimary = next;
  }

  onSecondaryChange(next: boolean): void {
    this.checkedSecondary = next;
  }

  setTab(tab: TabKey) {
    this.activeTab.set(tab);
  }

  onTabChange(value: TabsValue | null) {
    if (value === null) return;
    this.setTab(value as TabKey);
  }

  get viewportPresets() {
    return this.viewport?.presets() ?? [];
  }

  viewportDisplayWidth() {
    return this.viewport?.displayWidth() ?? 0;
  }

  viewportDisplayHeight() {
    return this.viewport?.displayHeight() ?? 0;
  }

  viewportCustomWidth() {
    return this.viewport?.customWidth() ?? 0;
  }

  setViewportCustomWidth(value: number) {
    this.viewport?.setCustomWidth(value);
  }

  setViewportPreset(preset: { key: string; label: string; width: number; height: number }) {
    this.viewport?.setPreset(preset);
  }

  applyViewportCustom() {
    this.viewport?.setCustom();
  }

  rotateViewport() {
    this.viewport?.rotate();
  }

  setViewportDensity(value: 'default' | 'comfortable' | 'compact') {
    this.viewport?.setDensity(value);
  }
}
