import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';
import { IconFieldComponent, InputIconComponent } from 'ui-lib-custom/icon-field';

@Component({
  standalone: true,
  imports: [FormsModule, FloatLabelComponent, IconFieldComponent, InputIconComponent],
  templateUrl: './float-label.example.html',
})
export class MyComponent {
  public emailValue: string = '';
  public usernameValue: string = '';
  public passwordValue: string = '';
}
