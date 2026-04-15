import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Paginator component.
 */
@Component({
  selector: 'app-paginator-demo',
  standalone: true,
  templateUrl: './paginator-demo.component.html',
  styleUrl: './paginator-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorDemoComponent {}
