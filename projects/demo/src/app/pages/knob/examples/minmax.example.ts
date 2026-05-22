import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './minmax.example.html',
})
export class MyComponent {
  value: number = -20;
}
