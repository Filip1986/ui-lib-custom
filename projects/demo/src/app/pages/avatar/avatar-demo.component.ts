import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Avatar component.
 */
@Component({
  selector: 'app-avatar-demo',
  standalone: true,
  templateUrl: './avatar-demo.component.html',
  styleUrl: './avatar-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarDemoComponent {}
