import { Component } from '@angular/core';
import { AnimateOnScroll } from 'ui-lib-custom/animate-on-scroll';

@Component({
  standalone: true,
  imports: [AnimateOnScroll],
  templateUrl: './stagger.example.html',
})
export class MyComponent {}
