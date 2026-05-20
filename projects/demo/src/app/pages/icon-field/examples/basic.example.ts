import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldComponent, InputIconComponent } from 'ui-lib-custom/icon-field';

@Component({
  standalone: true,
  imports: [FormsModule, IconFieldComponent, InputIconComponent],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  public searchValue: string = '';
  public loadingValue: string = '';
}
