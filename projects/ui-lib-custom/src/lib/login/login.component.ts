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
import type {
  LoginFeatures,
  LoginFormData,
  LoginVariant,
  LoginSocialProvider,
} from './models/login-contract';
import { DEFAULT_SOCIAL_PROVIDERS } from './base-login/base-login.component';
import type { InputSignal, OutputEmitterRef } from '@angular/core';

/**
 * Login container component that renders the selected login variant and emits auth events.
 */
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
  public readonly title: InputSignal<string> = input<string>('Sign In');
  public readonly variant: InputSignal<LoginVariant> = input<LoginVariant>('1');
  public readonly loading: InputSignal<boolean> = input<boolean>(false);
  public readonly socialProviders: InputSignal<LoginSocialProvider[]> =
    input<LoginSocialProvider[]>(DEFAULT_SOCIAL_PROVIDERS);

  /**
   * Configure which features are enabled in the login component
   */
  public readonly features: InputSignal<LoginFeatures> = input<LoginFeatures>({
    showSocialLogin: true,
    showRememberMe: true,
    showForgotPassword: true,
    showRegisterLink: true,
  });

  // Output events
  public readonly submitLogin: OutputEmitterRef<LoginFormData> = output<LoginFormData>();
  public readonly registerClick: OutputEmitterRef<void> = output<void>();
  public readonly forgotPasswordClick: OutputEmitterRef<string> = output<string>();
  public readonly socialLoginClick: OutputEmitterRef<string> = output<string>();
  public readonly rememberMeChange: OutputEmitterRef<boolean> = output<boolean>();
}
