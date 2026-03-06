import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UiLibSelect } from 'ui-lib-custom/select';

type SelectOptionItem = { label: string; value: string };

/**
 *
 */
@Component({
  selector: 'app-select-basic-example',
  standalone: true,
  imports: [UiLibSelect],
  template: '<ui-lib-select label="Choose" [options]="options" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectBasicExampleComponent {
  public readonly options: SelectOptionItem[] = [
    { label: 'Design', value: 'design' },
    { label: 'Engineering', value: 'engineering' },
    { label: 'Marketing', value: 'marketing' },
  ];
}
