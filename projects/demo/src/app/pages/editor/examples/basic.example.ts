import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  public basicHtml: string = '<p>Welcome to the <strong>Editor</strong>.</p>';
}
