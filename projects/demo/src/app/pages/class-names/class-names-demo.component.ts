import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming ClassNames component.
 */
@Component({
  selector: 'app-class-names-demo',
  standalone: true,
  templateUrl: './class-names-demo.component.html',
  styleUrl: './class-names-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassNamesDemoComponent {}
