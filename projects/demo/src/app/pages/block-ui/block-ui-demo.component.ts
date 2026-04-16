import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming BlockUI component.
 */
@Component({
  selector: 'app-block-ui-demo',
  standalone: true,
  templateUrl: './block-ui-demo.component.html',
  styleUrl: './block-ui-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockUiDemoComponent {}
