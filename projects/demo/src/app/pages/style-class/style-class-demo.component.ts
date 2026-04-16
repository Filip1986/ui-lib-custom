import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming StyleClass component.
 */
@Component({
  selector: 'app-style-class-demo',
  standalone: true,
  templateUrl: './style-class-demo.component.html',
  styleUrl: './style-class-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StyleClassDemoComponent {}
