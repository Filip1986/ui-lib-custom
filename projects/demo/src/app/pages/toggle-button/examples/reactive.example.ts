import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToggleButton } from 'ui-lib-custom/toggle-button';

@Component({
  standalone: true,
  imports: [ToggleButton, ReactiveFormsModule],
  templateUrl: './reactive.example.html',
})
export class MyComponent {
  public readonly form = new FormGroup({
    notifications: new FormControl<boolean>(false),
    darkMode: new FormControl<boolean>(true),
  });
}
