import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card, Button, CardVariant, CardElevation } from 'ui-lib-custom';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '../../shared/doc-page/doc-demo-viewport.component';

@Component({
  selector: 'app-cards',
  imports: [CommonModule, Card, Button, DocPageLayoutComponent, DocDemoViewportComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent {
  readonly sections: DocSection[] = [
    { id: 'playground', label: 'Playground' },
    { id: 'properties', label: 'Properties' },
  ];

  variant = signal<CardVariant>('material');
  elevation = signal<CardElevation>('medium');
  bordered = signal(false);
  hoverable = signal(false);
  title = signal('Card Title');
  body = signal('Cards can host arbitrary content and actions.');
  showHeader = signal(true);
  showFooter = signal(true);

  readonly variants: CardVariant[] = ['material', 'bootstrap', 'minimal'];
  readonly elevations: CardElevation[] = ['none', 'low', 'medium', 'high'];
}
