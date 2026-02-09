import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Card, Stack } from 'ui-lib-custom';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';

@Component({
  selector: 'app-layout-stack-section',
  standalone: true,
  imports: [Card, Stack, DocDemoViewportComponent],
  templateUrl: './stack-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutStackSectionComponent {}
