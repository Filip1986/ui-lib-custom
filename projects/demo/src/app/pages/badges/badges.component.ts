import { Component, ChangeDetectionStrategy, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Badge, Inline, BadgeColor, BadgeVariant, BadgeSize, Button, Card} from 'ui-lib-custom';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocCodeSnippetComponent } from '../../shared/doc-page/doc-code-snippet.component';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';
import { DocControlGroupComponent } from '../../shared/doc-page/doc-control-group.component';

@Component({
  selector: 'app-badges',
  standalone: true,
  imports: [Badge, Button, DocPageLayoutComponent, DocCodeSnippetComponent, DocControlGroupComponent, DocDemoViewportComponent, Card, FormsModule],
  templateUrl: './badges.component.html',
  styleUrl: './badges.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgesComponent {
  readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'performance', label: 'Performance Features' },
  ];

  variant = signal<BadgeVariant>('solid');
  color = signal<BadgeColor>('primary');
  size = signal<BadgeSize>('md');
  pill = signal(false);
  dot = signal(false);
  text = signal('New');

  readonly variants: BadgeVariant[] = ['solid', 'outline', 'subtle'];
  readonly colors: BadgeColor[] = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral'];
  readonly sizes: BadgeSize[] = ['sm', 'md', 'lg'];

  readonly snippets = {
    usage: `import { Badge } from 'ui-lib-custom';

@Component({
  imports: [Badge],
  template: \
    '<ui-lib-badge color="success" variant="solid">Active</ui-lib-badge>'
})`
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
}
