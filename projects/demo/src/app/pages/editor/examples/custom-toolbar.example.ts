import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent, EditorToolbarDirective } from 'ui-lib-custom/editor';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent, EditorToolbarDirective],
  templateUrl: './custom-toolbar.example.html',
})
export class MyComponent {
  public customToolbarHtml: string = '<p>Use the projected toolbar controls.</p>';

  public onCustomHeadingChange(editor: EditorComponent, event: Event): void {
    const selectElement = event.target instanceof HTMLSelectElement ? event.target : null;
    if (!selectElement) return;
    editor.executeCommand('formatBlock', selectElement.value);
  }
}
