import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming PickList component.
 */
@Component({
  selector: 'app-pick-list-demo',
  standalone: true,
  templateUrl: './pick-list-demo.component.html',
  styleUrl: './pick-list-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickListDemoComponent {}
