import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './min-max.example.html',
})
export class MyComponent {
  minDate: Date = new Date(2026, 2, 5);
  maxDate: Date = new Date(2026, 2, 26);
  constrainedDate: Date | null = new Date(2026, 2, 12);
}
