import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibTextarea } from 'ui-lib-custom/textarea';

@Component({
  standalone: true,
  imports: [UiLibTextarea, FormsModule],
  templateUrl: './readonly.example.html',
})
export class MyComponent {
  public readonlyValue: string = 'You can read but not edit this content.';
}
