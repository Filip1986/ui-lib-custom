import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginFactoryComponent } from './login-factory/login-factory.component';
import { LoginFeatures, LoginFormData, LoginVariant } from './models/login-contract';

@Component({
  selector: 'lib-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    LoginFactoryComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @Input() title = 'Sign In';
  @Input() variant: LoginVariant = '1';
  @Input() loading = false;

  /**
   * Configure which features are enabled in the login component
   */
  @Input() features: LoginFeatures = {
    showSocialLogin: true,
    showRememberMe: true,
    showForgotPassword: true,
    showRegisterLink: true,
  };

  // Output events
  @Output() submitLogin: EventEmitter<LoginFormData> = new EventEmitter<LoginFormData>();
  @Output() registerClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() forgotPasswordClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() socialLoginClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() rememberMeChange: EventEmitter<boolean> = new EventEmitter<boolean>();
}
