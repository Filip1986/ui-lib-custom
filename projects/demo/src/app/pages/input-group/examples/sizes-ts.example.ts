import { Component } from '@angular/core';
import { InputGroupComponent, InputGroupAddonComponent } from 'ui-lib-custom/input-group';
import { UiLibInput } from 'ui-lib-custom/input';

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, UiLibInput],
  templateUrl: './sizes-ts.example.html',
})
export class MyComponent {}
