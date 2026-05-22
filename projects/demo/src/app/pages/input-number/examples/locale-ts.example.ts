import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from 'ui-lib-custom/input-number';

@Component({
  standalone: true,
  imports: [InputNumberComponent, FormsModule],
  templateUrl: './locale-ts.example.html',
})
export class MyComponent {
  localeValues = { enUS: 1234567.89, deDE: 1234567.89, enIN: 1234567.89, jpJP: 1234567.89 };
}
