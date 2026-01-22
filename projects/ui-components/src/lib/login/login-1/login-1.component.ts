import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseLoginComponent } from '../base-login/base-login.component';

@Component({
  selector: 'lib-login-1',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
],
  templateUrl: './login-1.component.html',
  styleUrls: ['./login-1.component.scss'],
})
export class Login1Component extends BaseLoginComponent {
  /**
   * Override loading property from base component
   */
  @Input() override loading = false;

  constructor(protected override formBuilder: FormBuilder) {
    super(formBuilder);
  }
}
