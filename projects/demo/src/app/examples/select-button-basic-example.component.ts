import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SelectButton } from 'ui-lib-custom/select-button';

type SelectButtonOption = { label: string; value: string };

/**
 *
 */
@Component({
  selector: 'app-select-button-basic-example',
  standalone: true,
  imports: [SelectButton],
  template: '<ui-lib-select-button [options]="options" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectButtonBasicExampleComponent {
  public readonly options: SelectButtonOption[] = [
    { label: 'Monthly', value: 'monthly' },
    { label: 'Annual', value: 'annual' },
  ];
}
