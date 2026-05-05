import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Fluid, FluidDirective } from 'ui-lib-custom/fluid';

/**
 * Demo page for the Fluid component and FluidDirective.
 * Demonstrates how ui-lib-fluid stretches form controls to full width.
 */
@Component({
  selector: 'app-fluid-demo',
  standalone: true,
  imports: [Fluid, FluidDirective],
  templateUrl: './fluid-demo.component.html',
  styleUrl: './fluid-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FluidDemoComponent {
  public readonly isFluid: WritableSignal<boolean> = signal<boolean>(true);
  public readonly name: WritableSignal<string> = signal<string>('');
  public readonly email: WritableSignal<string> = signal<string>('');

  public toggleFluid(): void {
    this.isFluid.set(!this.isFluid());
  }

  public onNameChange(event: Event): void {
    this.name.set((event.target as HTMLInputElement).value);
  }

  public onEmailChange(event: Event): void {
    this.email.set((event.target as HTMLInputElement).value);
  }
}
