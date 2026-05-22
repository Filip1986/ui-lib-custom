import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibCascadeSelect } from 'ui-lib-custom/cascade-select';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibCascadeSelect],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  public cityCode: string | null = null;
  public countries = [
    /* your country data */
  ];
}
