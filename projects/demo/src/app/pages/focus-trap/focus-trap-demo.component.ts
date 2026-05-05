import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { FocusTrapDirective } from 'ui-lib-custom/focus-trap';

/**
 * Demo page for the FocusTrap directive.
 * Demonstrates basic usage, conditional activation, and the modal overlay pattern.
 */
@Component({
  selector: 'app-focus-trap-demo',
  standalone: true,
  imports: [FocusTrapDirective],
  templateUrl: './focus-trap-demo.component.html',
  styleUrl: './focus-trap-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FocusTrapDemoComponent {
  public readonly isModalOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly isTrapEnabled: WritableSignal<boolean> = signal<boolean>(true);
  public readonly formName: WritableSignal<string> = signal<string>('');
  public readonly formEmail: WritableSignal<string> = signal<string>('');

  public openModal(): void {
    this.isModalOpen.set(true);
  }

  public closeModal(): void {
    this.isModalOpen.set(false);
  }

  public toggleTrap(): void {
    this.isTrapEnabled.set(!this.isTrapEnabled());
  }

  public onFormNameChange(event: Event): void {
    this.formName.set((event.target as HTMLInputElement).value);
  }

  public onFormEmailChange(event: Event): void {
    this.formEmail.set((event.target as HTMLInputElement).value);
  }
}
