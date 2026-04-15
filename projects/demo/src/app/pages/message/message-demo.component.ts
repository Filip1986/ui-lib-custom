import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Message component.
 */
@Component({
  selector: 'app-message-demo',
  standalone: true,
  templateUrl: './message-demo.component.html',
  styleUrl: './message-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageDemoComponent {}
