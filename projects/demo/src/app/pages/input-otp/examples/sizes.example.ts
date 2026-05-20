import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputOtpComponent } from 'ui-lib-custom/input-otp';

@Component({
  standalone: true,
  imports: [InputOtpComponent, FormsModule],
  templateUrl: './sizes.example.html',
})
export class MyComponent {
  sizeValues = { sm: '', md: '', lg: '' };
}
