import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { RadioButton } from 'ui-lib-custom/radio-button';
import type { RadioButtonChangeEvent } from 'ui-lib-custom/radio-button';

interface CityOption {
  label: string;
  value: string;
}

/**
 * Demo page for the RadioButton component.
 */
@Component({
  selector: 'app-radio-button-demo',
  standalone: true,
  imports: [RadioButton, FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './radio-button-demo.component.html',
  styleUrl: './radio-button-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonDemoComponent {
  // ── Basic demo ─────────────────────────────────────────────────────────────

  public selectedCity: string = '';
  public lastChangeEvent: RadioButtonChangeEvent | null = null;

  public readonly cities: CityOption[] = [
    { label: 'Chicago', value: 'chicago' },
    { label: 'New York', value: 'new-york' },
    { label: 'Los Angeles', value: 'los-angeles' },
    { label: 'Houston', value: 'houston' },
  ];

  // ── ngModel demo ───────────────────────────────────────────────────────────

  public selectedFruit: string = 'apple';

  public readonly fruits: CityOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
  ];

  // ── Reactive forms demo ────────────────────────────────────────────────────

  public readonly planForm: FormGroup = new FormGroup({
    plan: new FormControl<string>('starter'),
  });

  public readonly plans: CityOption[] = [
    { label: 'Starter', value: 'starter' },
    { label: 'Professional', value: 'professional' },
    { label: 'Enterprise', value: 'enterprise' },
  ];

  // ── Variant demo pre-selected values ─────────────────────────────────────

  public variantMaterialValue: string = 'c';
  public variantBootstrapValue: string = 'c';
  public variantMinimalValue: string = 'c';

  // ── Disabled demo ──────────────────────────────────────────────────────────

  public disabledValue: string = 'option-b';

  // ── Filled appearance demo ─────────────────────────────────────────────────

  public filledValue: string = 'one';

  public onCityChange(event: RadioButtonChangeEvent): void {
    this.lastChangeEvent = event;
  }
}
