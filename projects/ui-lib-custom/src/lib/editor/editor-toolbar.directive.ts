import { Directive } from '@angular/core';

/** Marker directive for projected custom editor toolbar content. */
@Directive({
  selector: '[editorToolbar]',
  standalone: true,
})
export class EditorToolbarDirective {}
