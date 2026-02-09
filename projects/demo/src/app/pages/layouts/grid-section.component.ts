import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Card, Grid } from 'ui-lib-custom';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';

@Component({
  selector: 'app-layout-grid-section',
  standalone: true,
  imports: [Card, Grid, DocDemoViewportComponent],
  templateUrl: './grid-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutGridSectionComponent {}
