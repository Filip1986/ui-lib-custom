import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';
import { UiLibSelect } from 'ui-lib-custom/select';

@Component({
  standalone: true,
  imports: [FormsModule, FloatLabelComponent, UiLibSelect],
  templateUrl: './select.example.html',
})
export class MyComponent {
  public selectedCity: string | null = null;
  public readonly cityOptions = [
    { label: 'Amsterdam', value: 'amsterdam' },
    { label: 'Berlin', value: 'berlin' },
    { label: 'Lisbon', value: 'lisbon' },
  ];
}
