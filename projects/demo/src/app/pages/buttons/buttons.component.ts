import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'ui-lib-custom';
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
    { id: 'material', label: 'Material Design Variant' },
    { id: 'bootstrap', label: 'Bootstrap Variant' },
    { id: 'minimal', label: 'Minimal Variant' },
    { id: 'properties', label: 'Properties' },
  ];
}
