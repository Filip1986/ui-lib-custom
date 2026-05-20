import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent],
  templateUrl: './readonly.example.html',
})
export class MyComponent {
  public readonly readonlyHtml: string = '<h2>Readonly</h2><p><strong>Important</strong> details.</p>';
}
