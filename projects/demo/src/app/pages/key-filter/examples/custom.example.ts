import { Component } from '@angular/core';
import { KeyFilterDirective } from 'ui-lib-custom/key-filter';

@Component({
  standalone: true,
  imports: [KeyFilterDirective],
  templateUrl: './custom.example.html',
})
export class MyComponent {
  public readonly vowelPattern: RegExp = /[aeiouAEIOU]/;
}
