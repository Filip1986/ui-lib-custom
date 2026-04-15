import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming InputOtp component.
 */
@Component({
  selector: 'app-input-otp-demo',
  standalone: true,
  templateUrl: './input-otp-demo.component.html',
  styleUrl: './input-otp-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputOtpDemoComponent {}
