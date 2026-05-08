import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Tooltip } from 'ui-lib-custom/tooltip';

/**
 * Demo page for the Tooltip directive.
 */
@Component({
  selector: 'app-tooltip-demo',
  standalone: true,
  imports: [Tooltip],
  templateUrl: './tooltip-demo.component.html',
  styleUrl: './tooltip-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipDemoComponent {
  public readonly tooltipDisabled: WritableSignal<boolean> = signal<boolean>(false);
}
