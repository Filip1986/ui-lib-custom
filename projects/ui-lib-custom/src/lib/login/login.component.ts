import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
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
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  public readonly title = input<string>('Sign In');
  public readonly variant = input<LoginVariant>('1');
  public readonly loading = input<boolean>(false);
  public readonly socialProviders = input<LoginSocialProvider[]>(DEFAULT_SOCIAL_PROVIDERS);

  /**
   * Configure which features are enabled in the login component
   */
  public readonly features = input<LoginFeatures>({
    showSocialLogin: true,
    showRememberMe: true,
    showForgotPassword: true,
    showRegisterLink: true,
  });

  // Output events
  public readonly submitLogin = output<LoginFormData>();
  public readonly registerClick = output<void>();
  public readonly forgotPasswordClick = output<string>();
  public readonly socialLoginClick = output<string>();
  public readonly rememberMeChange = output<boolean>();
}
