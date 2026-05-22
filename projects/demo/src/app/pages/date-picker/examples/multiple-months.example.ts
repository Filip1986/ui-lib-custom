import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './multiple-months.example.html',
})
export class MyComponent {
  multipleMonthDate: Date | null = new Date();
}
