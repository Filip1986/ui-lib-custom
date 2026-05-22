import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Image } from 'ui-lib-custom/image';

@Component({
  standalone: true,
  imports: [Image],
  templateUrl: './two-way-binding.example.html',
})
export class MyComponent {
  public readonly previewVisible: WritableSignal<boolean> = signal<boolean>(false);
}
