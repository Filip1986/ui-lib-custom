import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { LoginFactoryComponent } from './login-factory/login-factory.component';
import { LoginFeatures, LoginFormData, LoginVariant } from './models/login-contract';

@Component({
  selector: 'lib-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    DividerModule,
    RippleModule,
    LoginFactoryComponent
],
  providers: [MessageService],
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
