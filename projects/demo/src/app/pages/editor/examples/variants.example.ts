import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent],
  templateUrl: './variants.example.html',
})
export class MyComponent {
  public readonly variantValues = {
    material: '<p>Material variant content.</p>',
    bootstrap: '<p>Bootstrap variant content.</p>',
    minimal: '<p>Minimal variant content.</p>',
  };
}
