import { Component } from '@angular/core';
import { ImageCompare } from 'ui-lib-custom/image-compare';

@Component({
  standalone: true,
  imports: [ImageCompare],
  templateUrl: './basic.example.html',
})
export class MyComponent {}
