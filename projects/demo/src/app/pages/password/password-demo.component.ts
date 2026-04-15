import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Password component.
 */
@Component({
  selector: 'app-password-demo',
  standalone: true,
  templateUrl: './password-demo.component.html',
  styleUrl: './password-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordDemoComponent {}
