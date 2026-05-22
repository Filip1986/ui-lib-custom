import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPicker } from 'ui-lib-custom';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [FormsModule, ColorPicker, Button],
  templateUrl: './template-driven.example.html',
})
export class MyComponent {
  public templateDrivenValue: string = '22c55e';

  public submitTemplateDriven(): void {
    // handle form submit
  }
}
