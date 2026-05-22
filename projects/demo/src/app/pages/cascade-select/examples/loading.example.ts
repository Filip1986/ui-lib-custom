import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibCascadeSelect } from 'ui-lib-custom/cascade-select';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibCascadeSelect],
  templateUrl: './loading.example.html',
})
export class MyComponent {
  public loadingCode: string | null = null;
  public loading: boolean = true;
  public countries = [
    /* your country data */
  ];
}
