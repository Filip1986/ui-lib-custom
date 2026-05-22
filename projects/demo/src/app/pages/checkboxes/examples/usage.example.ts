import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'ui-lib-custom/checkbox';

@Component({
  standalone: true,
  imports: [Checkbox, FormsModule],
  templateUrl: './usage.example.html',
})
export class MyComponent {
  public syncStatus: string = 'DISABLED';
}
