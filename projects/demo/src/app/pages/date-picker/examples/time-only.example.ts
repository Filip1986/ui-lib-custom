import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './time-only.example.html',
})
export class MyComponent {
  timeOnlyValue: Date | null = new Date();
}
