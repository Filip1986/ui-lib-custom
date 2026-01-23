import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginFeatures, LoginFormData, LoginVariant } from '../models/login-contract';
import { Login1Component } from '../login-1/login-1.component';
import { Login3Component } from '../login-3/login-3.component';
import { Login2Component } from '../login-2/login-2.component';

@Component({
  selector: 'lib-login-factory',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    Login1Component,
    Login3Component,
    Login2Component
],
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
