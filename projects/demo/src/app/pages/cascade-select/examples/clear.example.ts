import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibCascadeSelect } from 'ui-lib-custom/cascade-select';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibCascadeSelect],
  templateUrl: './clear.example.html',
})
export class MyComponent {
  public clearableCode: string | null = 'SYD';
  public countries = [
    /* your country data */
  ];
}
