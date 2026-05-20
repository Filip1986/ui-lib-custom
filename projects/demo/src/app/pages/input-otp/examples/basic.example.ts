import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputOtpComponent } from 'ui-lib-custom/input-otp';

@Component({
  standalone: true,
  imports: [InputOtpComponent, FormsModule],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  basicValue: string = '';
}
