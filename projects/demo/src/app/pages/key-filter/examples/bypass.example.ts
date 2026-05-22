import { Component } from '@angular/core';
import { KeyFilterDirective } from 'ui-lib-custom/key-filter';

@Component({
  standalone: true,
  imports: [KeyFilterDirective],
  templateUrl: './bypass.example.html',
})
export class MyComponent {
  public bypassEnabled: boolean = false;
}
