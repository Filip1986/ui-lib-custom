import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Card, Container } from 'ui-lib-custom';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';

@Component({
  selector: 'app-layout-container-section',
  standalone: true,
  imports: [Card, Container, DocDemoViewportComponent],
  templateUrl: './container-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutContainerSectionComponent {}
