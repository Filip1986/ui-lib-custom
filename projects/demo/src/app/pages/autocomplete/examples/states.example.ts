import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibAutoComplete } from 'ui-lib-custom/autocomplete';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibAutoComplete],
  templateUrl: './states.example.html',
})
export class MyComponent {
  disabledValue: string | null = 'disabled';
  invalidValue: string | null = null;
}
