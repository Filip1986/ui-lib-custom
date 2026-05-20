import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobComponent } from 'ui-lib-custom/knob';

@Component({
  standalone: true,
  imports: [FormsModule, KnobComponent],
  templateUrl: './basic.example.html',
})
export class MyComponent {
  value: number = 40;
}
