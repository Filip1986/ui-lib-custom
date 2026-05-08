import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Button } from 'ui-lib-custom/button';
import type {
  ButtonAppearance,
  ButtonSeverity,
  ButtonSize,
  ButtonVariant,
} from 'ui-lib-custom/button';
import { ButtonGroup } from 'ui-lib-custom';

interface ButtonLogEntry {
  timestamp: string;
  message: string;
}

/**
 * Demo page for the Button component.
 * Shows all variants, appearances, severities, sizes, icons, and states.
 */
@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [Button, ButtonGroup],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonsComponent {
  public readonly activeVariant: WritableSignal<ButtonVariant> = signal<ButtonVariant>('material');
  public readonly eventLog: WritableSignal<ButtonLogEntry[]> = signal<ButtonLogEntry[]>([]);

  public readonly variants: ButtonVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly appearances: ButtonAppearance[] = ['solid', 'outline', 'ghost'];
  public readonly severities: ButtonSeverity[] = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'help',
    'danger',
    'contrast',
  ];
  public readonly sizes: ButtonSize[] = ['small', 'medium', 'large'];

  public setVariant(variant: ButtonVariant): void {
    this.activeVariant.set(variant);
  }

  public logEvent(message: string): void {
    const timestamp: string = new Date().toLocaleTimeString();
    this.eventLog.update((entries: ButtonLogEntry[]): ButtonLogEntry[] => [
      { timestamp, message },
      ...entries.slice(0, 9),
    ]);
  }
}
