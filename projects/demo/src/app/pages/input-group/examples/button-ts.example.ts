import { Component } from '@angular/core';
import { InputGroupComponent, InputGroupAddonComponent } from 'ui-lib-custom/input-group';
import { UiLibInput } from 'ui-lib-custom/input';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, UiLibInput, Button],
  templateUrl: './button-ts.example.html',
})
export class MyComponent {}
