import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Starter Template.
 */
@Component({
  selector: 'app-starter-template',
  standalone: true,
  templateUrl: './starter-template.component.html',
  styleUrl: './starter-template.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarterTemplateComponent {}
