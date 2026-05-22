import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputOtpComponent } from 'ui-lib-custom/input-otp';

@Component({
  standalone: true,
  imports: [InputOtpComponent, FormsModule],
  templateUrl: './mask.example.html',
})
export class MyComponent {
  maskValue: string = '';
}
