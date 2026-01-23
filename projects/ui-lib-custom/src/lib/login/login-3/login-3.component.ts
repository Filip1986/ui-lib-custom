import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseLoginComponent } from '../base-login/base-login.component';

@Component({
  selector: 'lib-login-3',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
],
  templateUrl: './login-3.component.html',
  styleUrls: ['./login-3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login3Component extends BaseLoginComponent {
  /**
   * Override loading property from base component
   */
  override loading = input<boolean>(false);

  constructor(protected override formBuilder: FormBuilder) {
    super(formBuilder);
  }
}
