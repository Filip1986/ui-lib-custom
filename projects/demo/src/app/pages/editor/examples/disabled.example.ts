import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent],
  templateUrl: './disabled.example.html',
})
export class MyComponent {
  public readonly disabledHtml: string = '<p>This editor is disabled.</p>';
}
