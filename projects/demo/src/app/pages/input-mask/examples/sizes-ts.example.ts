import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskComponent } from 'ui-lib-custom/input-mask';

@Component({
  standalone: true,
  imports: [InputMaskComponent, FormsModule],
  templateUrl: './sizes-ts.example.html',
})
export class MyComponent {
  sizeValues = { sm: null, md: null, lg: null };
}
