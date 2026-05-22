import { Component } from '@angular/core';
import { Checkbox } from 'ui-lib-custom/checkbox';

@Component({
  standalone: true,
  imports: [Checkbox],
  templateUrl: './checkbox-example.example.html',
})
export class MyComponent {
  public checkedPrimary: boolean = false;
}
