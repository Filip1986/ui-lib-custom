import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from 'ui-lib-custom';
import { Button } from 'ui-lib-custom';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';

@Component({
  selector: 'app-cards',
  imports: [CommonModule, Card, Button, DocPageLayoutComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent {
  readonly sections: DocSection[] = [
    { id: 'material-variant', label: 'Material Design Variant' },
    { id: 'bootstrap-variant', label: 'Bootstrap Variant' },
    { id: 'minimal-variant', label: 'Minimal Variant' },
    { id: 'properties', label: 'Properties' },
  ];
}
