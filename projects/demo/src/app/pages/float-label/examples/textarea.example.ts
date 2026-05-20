import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FloatLabelComponent } from 'ui-lib-custom/float-label';

@Component({
  standalone: true,
  imports: [FormsModule, FloatLabelComponent],
  templateUrl: './textarea.example.html',
})
export class MyComponent {
  public notes: string = '';
}
