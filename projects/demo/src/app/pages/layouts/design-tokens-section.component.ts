import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Card } from 'ui-lib-custom';

@Component({
  selector: 'app-layout-design-tokens-section',
  standalone: true,
  imports: [Card],
  templateUrl: './design-tokens-section.component.html',
  styleUrl: './layouts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutDesignTokensSectionComponent {}
