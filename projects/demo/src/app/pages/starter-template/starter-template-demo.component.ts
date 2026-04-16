import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Starter Template.
 */
@Component({
  selector: 'app-starter-template-demo',
  standalone: true,
  templateUrl: './starter-template-demo.component.html',
  styleUrl: './starter-template-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarterTemplateDemoComponent {}
