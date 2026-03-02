import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
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
  styleUrls: ['./login-factory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LoginFactoryComponent {
  public readonly title = input<string>('Sign In');
  public readonly variant = input<LoginVariant>('1');
  public readonly loading = input<boolean>(false);
  public readonly features = input<LoginFeatures>({
    showSocialLogin: true,
    showRememberMe: true,
    showForgotPassword: true,
    showRegisterLink: true,
  });
  public readonly socialProviders = input<LoginSocialProvider[]>([]);

  public readonly submitLogin = output<LoginFormData>();
  public readonly registerClick = output<void>();
  public readonly forgotPasswordClick = output<string>();
  public readonly socialLoginClick = output<string>();
  public readonly rememberMeChange = output<boolean>();

  public onSubmitLogin(data: LoginFormData): void {
    this.submitLogin.emit(data);
  }

  public onRegisterClick(): void {
    this.registerClick.emit();
  }

  public onForgotPasswordClick(email: string): void {
    this.forgotPasswordClick.emit(email);
  }

  public onSocialLoginClick(provider: string): void {
    this.socialLoginClick.emit(provider);
  }

  public onRememberMeChange(remembered: boolean): void {
    this.rememberMeChange.emit(remembered);
  }
}
