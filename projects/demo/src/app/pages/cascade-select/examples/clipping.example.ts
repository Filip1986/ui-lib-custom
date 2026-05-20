import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibCascadeSelect } from 'ui-lib-custom/cascade-select';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibCascadeSelect],
  templateUrl: './clipping.example.html',
})
export class MyComponent {
  public clippingCode: string | null = null;
  public countries = [
    /* your country data */
  ];
}
