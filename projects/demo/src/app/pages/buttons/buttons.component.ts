import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button, ButtonAppearance, ButtonColor, ButtonSize, ButtonVariant, IconPosition } from 'ui-lib-custom';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';

@Component({
  selector: 'app-buttons',
  imports: [CommonModule, Button, DocPageLayoutComponent, DocDemoViewportComponent],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsComponent {
  readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'properties', label: 'Properties' },
  ];

  variant = signal<ButtonVariant>('material');
  appearance = signal<ButtonAppearance>('solid');
  size = signal<ButtonSize>('medium');
  color = signal<ButtonColor>('primary');
  disabled = signal(false);
  loading = signal(false);
  fullWidth = signal(false);
  iconPosition = signal<IconPosition>('start');
  label = signal('Click me');

  readonly variants: ButtonVariant[] = ['material', 'bootstrap', 'minimal'];
  readonly appearances: ButtonAppearance[] = ['solid', 'outline', 'ghost'];
  readonly sizes: ButtonSize[] = ['small', 'medium', 'large'];
  readonly colors: ButtonColor[] = ['primary', 'secondary', 'success', 'danger', 'warning'];
  readonly iconPositions: IconPosition[] = ['start', 'end'];
}
