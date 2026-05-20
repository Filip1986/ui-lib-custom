import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';
import type { EditorTextChangeEvent, EditorSelectionChangeEvent } from 'ui-lib-custom/editor';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent],
  templateUrl: './events.example.html',
})
export class MyComponent {
  public eventsHtml: string = '<p>Select text and type to emit events.</p>';

  public onTextChange(event: EditorTextChangeEvent): void {
    console.log('textChange', event.htmlValue);
  }

  public onSelectionChange(event: EditorSelectionChangeEvent): void {
    console.log('selectionChange', event.selection?.toString());
  }
}
