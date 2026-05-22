import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from 'ui-lib-custom/date-picker';

@Component({
  standalone: true,
  imports: [DatePickerComponent, FormsModule],
  templateUrl: './variants.example.html',
})
export class MyComponent {
  variantValues = { material: new Date(), bootstrap: new Date(), minimal: new Date() };
}
