import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { NgForm } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent, Button],
  templateUrl: './template-driven.example.html',
})
export class MyComponent {
  public templateDrivenHtml: string = '';

  public submitTemplateDriven(form: NgForm): void {
    form.control.markAllAsTouched();
  }
}
