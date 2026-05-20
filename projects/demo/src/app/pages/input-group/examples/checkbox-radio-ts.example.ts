import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupComponent, InputGroupAddonComponent } from 'ui-lib-custom/input-group';
import { UiLibInput } from 'ui-lib-custom/input';
import { Checkbox } from 'ui-lib-custom/checkbox';

@Component({
  standalone: true,
  imports: [InputGroupComponent, InputGroupAddonComponent, UiLibInput, Checkbox, FormsModule],
  templateUrl: './checkbox-radio-ts.example.html',
})
export class MyComponent {
  acceptTerms: boolean = false;
  priorityOnly: boolean = true;
}
