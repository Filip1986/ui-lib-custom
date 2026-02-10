import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginFactoryComponent } from './login-factory/login-factory.component';
import {
  LoginFeatures,
  LoginFormData,
  LoginVariant,
  LoginSocialProvider,
} from './models/login-contract';
import { DEFAULT_SOCIAL_PROVIDERS } from './base-login/base-login.component';

@Component({
  selector: 'lib-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoginFactoryComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  title = input<string>('Sign In');
  variant = input<LoginVariant>('1');
  loading = input<boolean>(false);
  socialProviders = input<LoginSocialProvider[]>(DEFAULT_SOCIAL_PROVIDERS);

  /**
   * Configure which features are enabled in the login component
   */
  features = input<LoginFeatures>({
    showSocialLogin: true,
    showRememberMe: true,
    showForgotPassword: true,
    showRegisterLink: true,
  });

  // Output events
  submitLogin = output<LoginFormData>();
  registerClick = output<void>();
  forgotPasswordClick = output<string>();
  socialLoginClick = output<string>();
  rememberMeChange = output<boolean>();
}
