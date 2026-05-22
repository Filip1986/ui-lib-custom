import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './sizes.example.html',
})
export class MyComponent {
  sizeValues = { sm: new Date(), md: new Date(), lg: new Date() };
}
