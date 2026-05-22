import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent],
  templateUrl: './filled.example.html',
})
export class MyComponent {
  public filledHtml: string = '<p>Filled mode editor.</p>';
}
