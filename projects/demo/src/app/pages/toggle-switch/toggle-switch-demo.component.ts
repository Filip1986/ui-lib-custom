import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitch } from 'ui-lib-custom/toggle-switch';
import type { ToggleSwitchSize, ToggleSwitchVariant } from 'ui-lib-custom/toggle-switch';
import { Card } from 'ui-lib-custom/card';

/**
 * Demo page for the ToggleSwitch component.
 */
@Component({
  selector: 'app-toggle-switch-demo',
  standalone: true,
  imports: [ToggleSwitch, Card, FormsModule, ReactiveFormsModule],
  templateUrl: './toggle-switch-demo.component.html',
  styleUrl: './toggle-switch-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ToggleSwitchDemoComponent {
  public readonly variants: ToggleSwitchVariant[] = ['material', 'bootstrap', 'minimal'];
  public readonly sizes: ToggleSwitchSize[] = ['sm', 'md', 'lg'];

  /** Playground controls */
  public readonly playgroundVariant: WritableSignal<ToggleSwitchVariant> =
    signal<ToggleSwitchVariant>('material');
  public readonly playgroundSize: WritableSignal<ToggleSwitchSize> = signal<ToggleSwitchSize>('md');
  public readonly playgroundDisabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly playgroundReadonly: WritableSignal<boolean> = signal<boolean>(false);
  public readonly playgroundLabel: WritableSignal<string> = signal<string>('Enable notifications');
  public playgroundChecked: boolean = false;

  /** Basic examples */
  public basicChecked: boolean = false;
  public preChecked: boolean = true;

  /** ngModel binding */
  public ngModelValue: boolean = false;

  /** Reactive form */
  public readonly notificationsControl: FormControl<boolean> = new FormControl<boolean>(false, {
    nonNullable: true,
  });
  public readonly disabledControl: FormControl<boolean> = new FormControl<boolean>(
    { value: true, disabled: true },
    { nonNullable: true }
  );

  public setPlaygroundVariant(variant: ToggleSwitchVariant): void {
    this.playgroundVariant.set(variant);
  }

  public setPlaygroundSize(size: ToggleSwitchSize): void {
    this.playgroundSize.set(size);
  }

  public reactiveFormText(): string {
    return this.notificationsControl.value ? 'Enabled' : 'Disabled';
  }
}
