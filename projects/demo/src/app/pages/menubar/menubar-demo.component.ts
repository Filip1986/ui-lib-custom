import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Menubar component.
 */
@Component({
  selector: 'app-menubar-demo',
  standalone: true,
  templateUrl: './menubar-demo.component.html',
  styleUrl: './menubar-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarDemoComponent {}
