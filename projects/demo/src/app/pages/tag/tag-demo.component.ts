import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Tag component.
 */
@Component({
  selector: 'app-tag-demo',
  standalone: true,
  templateUrl: './tag-demo.component.html',
  styleUrl: './tag-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagDemoComponent {}
