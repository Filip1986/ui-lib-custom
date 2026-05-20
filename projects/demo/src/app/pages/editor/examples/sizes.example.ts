import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent],
  templateUrl: './sizes.example.html',
})
export class MyComponent {
  public readonly sizeValues = {
    sm: '<p>Small editor.</p>',
    md: '<p>Medium editor.</p>',
    lg: '<p>Large editor.</p>',
  };
}
