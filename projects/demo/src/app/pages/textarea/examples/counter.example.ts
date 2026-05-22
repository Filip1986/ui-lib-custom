import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibTextarea } from 'ui-lib-custom/textarea';

@Component({
  standalone: true,
  imports: [UiLibTextarea, FormsModule],
  templateUrl: './counter.example.html',
})
export class MyComponent {
  public counterValue: string = '';
}
