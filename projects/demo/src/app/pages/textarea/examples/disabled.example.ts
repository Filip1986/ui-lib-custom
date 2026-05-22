import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibTextarea } from 'ui-lib-custom/textarea';

@Component({
  standalone: true,
  imports: [UiLibTextarea, FormsModule],
  templateUrl: './disabled.example.html',
})
export class MyComponent {
  public disabledValue: string = 'This field cannot be edited.';
}
