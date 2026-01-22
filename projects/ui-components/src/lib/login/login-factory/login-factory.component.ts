import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { LoginFeatures, LoginFormData, LoginVariant } from '../models/login-contract';
import { Login1Component } from '../login-1/login-1.component';
import { Login3Component } from '../login-3/login-3.component';
import { Login2Component } from '../login-2/login-2.component';

@Component({
  selector: 'lib-login-factory',
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
    Login1Component,
    Login3Component,
    Login2Component
],
  providers: [MessageService],
  templateUrl: './login-factory.component.html',
  styleUrl: './login-factory.component.scss',
})
export class LoginFactoryComponent {
  @Input() title = 'Sign In';
  @Input() variant: LoginVariant = '1';
  @Input() loading = false;
  @Input() features: LoginFeatures = {
    showSocialLogin: true,
    showRememberMe: true,
    showForgotPassword: true,
    showRegisterLink: true,
  };

  @Output() submitLogin: EventEmitter<LoginFormData> = new EventEmitter<LoginFormData>();
  @Output() registerClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() forgotPasswordClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() socialLoginClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() rememberMeChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  onSubmitLogin(data: LoginFormData): void {
    this.submitLogin.emit(data);
  }

  onRegisterClick(): void {
    this.registerClick.emit();
  }

  onForgotPasswordClick(email: string): void {
    this.forgotPasswordClick.emit(email);
  }

  onSocialLoginClick(provider: string): void {
    this.socialLoginClick.emit(provider);
  }

  onRememberMeChange(remembered: boolean): void {
    this.rememberMeChange.emit(remembered);
  }
}
