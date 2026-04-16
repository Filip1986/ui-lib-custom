import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Placeholder demo page for the upcoming Terminal component.
 */
@Component({
  selector: 'app-terminal-demo',
  standalone: true,
  templateUrl: './terminal-demo.component.html',
  styleUrl: './terminal-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminalDemoComponent {}
