import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleButton } from 'ui-lib-custom/toggle-button';

@Component({
  standalone: true,
  imports: [ToggleButton, FormsModule],
  templateUrl: './ng-model.example.html',
})
export class MyComponent {
  public notificationsEnabled: boolean = false;
}
