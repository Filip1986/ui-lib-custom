import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Card, Container, Grid, Inline, Stack } from 'ui-lib-custom';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';

@Component({
  selector: 'app-layout-themed-layouts-section',
  standalone: true,
  imports: [Card, Container, Stack, Inline, Grid, DocDemoViewportComponent],
  templateUrl: './themed-layouts-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutThemedLayoutsSectionComponent {}
