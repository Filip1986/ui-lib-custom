import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseLoginComponent } from '../base-login/base-login.component';

@Component({
  selector: 'lib-login-2',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
],
  templateUrl: './login-2.component.html',
  styleUrls: ['./login-2.component.scss'],
})
export class Login2Component extends BaseLoginComponent {
  /**
   * Override loading property from base component
   */
  @Input() override loading = false;

  constructor(protected override formBuilder: FormBuilder) {
    super(formBuilder);
  }
}
