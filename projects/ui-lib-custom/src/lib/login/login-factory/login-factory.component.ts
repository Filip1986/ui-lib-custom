import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  LoginFeatures,
  LoginFormData,
  LoginVariant,
  LoginSocialProvider,
} from '../models/login-contract';
import { Login1Component } from '../login-1/login-1.component';
import { Login3Component } from '../login-3/login-3.component';
import { Login2Component } from '../login-2/login-2.component';

@Component({
  selector: 'lib-login-factory',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Login1Component, Login3Component, Login2Component],
  templateUrl: './login-factory.component.html',
  styleUrl: './login-factory.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFactoryComponent {
  title = input<string>('Sign In');
  variant = input<LoginVariant>('1');
  loading = input<boolean>(false);
  features = input<LoginFeatures>({
    showSocialLogin: true,
    showRememberMe: true,
    showForgotPassword: true,
    showRegisterLink: true,
  });
  socialProviders = input<LoginSocialProvider[]>([]);

  submitLogin = output<LoginFormData>();
  registerClick = output<void>();
  forgotPasswordClick = output<string>();
  socialLoginClick = output<string>();
  rememberMeChange = output<boolean>();

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
