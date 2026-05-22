import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';
import { UiLibInput } from 'ui-lib-custom/input';

@Component({
  standalone: true,
  imports: [FormsModule, FloatLabelComponent, UiLibInput],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  public basicValue: string = '';
}
