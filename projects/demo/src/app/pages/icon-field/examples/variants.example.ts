import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiLibInput } from 'ui-lib-custom/input';
import { IconFieldComponent, InputIconComponent } from 'ui-lib-custom/icon-field';

@Component({
  standalone: true,
  imports: [FormsModule, UiLibInput, IconFieldComponent, InputIconComponent],
  templateUrl: './variants.example.html',
})
export class MyComponent {
  public materialValue: string = '';
  public bootstrapValue: string = '';
  public minimalValue: string = '';
}
