import { Component, ChangeDetectionStrategy, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Badge,
  BadgeColor,
  BadgeVariant,
  BadgeSize,
  Button,
  Card,
  Tabs,
  Tab,
  TabsValue,
} from 'ui-lib-custom';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
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
  readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'variants', label: 'Variants' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'usage', label: 'Usage' },
    { id: 'performance', label: 'Performance Features' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  activeTab = signal<TabKey>('playground');

  setTab(tab: TabKey) {
    this.activeTab.set(tab);
  }

  onTabChange(value: TabsValue | null) {
    if (value === null) return;
    this.setTab(value as TabKey);
  }

  variant = signal<BadgeVariant>('solid');
  color = signal<BadgeColor>('primary');
  size = signal<BadgeSize>('md');
  pill = signal(false);
  dot = signal(false);
  text = signal('New');

  readonly variants: BadgeVariant[] = ['solid', 'outline', 'subtle'];
  readonly colors: BadgeColor[] = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'neutral',
  ];
  readonly sizes: BadgeSize[] = ['sm', 'md', 'lg'];

  readonly snippets = {
    usage: `import { Badge } from 'ui-lib-custom';

@Component({
  imports: [Badge],
  template: \
    '<ui-lib-badge color="success" variant="solid">Active</ui-lib-badge>'
})`,
  } as const;

  @ViewChild(DocDemoViewportComponent) viewport?: DocDemoViewportComponent;

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

  readonly badgeExample = `<ui-lib-badge color="success" variant="solid">Active</ui-lib-badge>`;
}
