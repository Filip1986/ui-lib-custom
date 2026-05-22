import { Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { ImageCompare } from 'ui-lib-custom/image-compare';

@Component({
  standalone: true,
  imports: [ImageCompare],
  templateUrl: './two-way-binding.example.html',
})
export class MyComponent {
  public readonly position: WritableSignal<number> = signal<number>(50);
}
