import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Listbox component.
 */
@Component({
  selector: 'app-listbox-demo',
  standalone: true,
  templateUrl: './listbox-demo.component.html',
  styleUrl: './listbox-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListboxDemoComponent {}
