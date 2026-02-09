import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Card, Container, Grid, Inline, Stack } from 'ui-lib-custom';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';

@Component({
  selector: 'app-layout-semantic-spacing-section',
  standalone: true,
  imports: [Card, Grid, Stack, Inline, Container, DocDemoViewportComponent],
  templateUrl: './semantic-spacing-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutSemanticSpacingSectionComponent {}
