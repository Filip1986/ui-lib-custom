import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { EditorComponent } from 'ui-lib-custom/editor';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, EditorComponent, Button],
  templateUrl: './reactive.example.html',
})
export class MyComponent {
  public readonly reactiveForm = new FormGroup({
    content: new FormControl<string | null>('', { validators: [Validators.required] }),
  });
}
