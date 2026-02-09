import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Card, Inline } from 'ui-lib-custom';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';

@Component({
  selector: 'app-layout-inline-section',
  standalone: true,
  imports: [Card, Inline, DocDemoViewportComponent],
  templateUrl: './inline-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutInlineSectionComponent {}
