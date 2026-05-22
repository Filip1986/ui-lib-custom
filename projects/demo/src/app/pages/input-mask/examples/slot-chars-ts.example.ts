import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FormsModule],
  templateUrl: './slot-chars-ts.example.html',
})
export class MyComponent {
  slotValues = { underscore: null, hash: null, star: null };
}
