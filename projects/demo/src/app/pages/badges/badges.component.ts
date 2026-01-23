import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Badge, Inline } from '../../../../../ui-lib-custom/src/public-api';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocSection } from '../../shared/doc-page/doc-section.model';

@Component({
  selector: 'app-badges',
  standalone: true,
  imports: [Badge, Inline, DocPageLayoutComponent],
  templateUrl: './badges.component.html',
  styleUrl: './badges.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgesComponent {
  readonly sections: DocSection[] = [
    { id: 'variants', label: 'Variants' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'pill-shape', label: 'Pill Shape' },
    { id: 'dot-indicators', label: 'Dot Indicators' },
    { id: 'real-world-examples', label: 'Real-World Examples' },
    { id: 'api-reference', label: 'API Reference' },
    { id: 'performance', label: 'Performance Features' },
  ];
}
