import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from '../button/button';
import { Card } from '../card/card';

export type LoginFormVariant = 'centered' | 'split' | 'minimal';
export type SocialProvider = 'google' | 'github' | 'microsoft';

@Component({
  selector: 'ui-lib-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule, Button, Card],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginForm {
  variant = input<LoginFormVariant>('centered');
  showSocialLogin = input<boolean>(true);
  showRememberMe = input<boolean>(true);
  logoTemplate = input<TemplateRef<unknown> | null>(null);

  login = output<{ email: string; password: string; remember: boolean }>();
  forgotPassword = output<void>();
  socialLogin = output<SocialProvider>();

  readonly email = signal('');
  readonly password = signal('');
  readonly remember = signal(true);

  readonly layoutClass = computed(() => `login-${this.variant()}`);

  onSubmit(): void {
    this.login.emit({
      email: this.email().trim(),
      password: this.password(),
      remember: this.remember(),
    });
  }

  onForgot(): void {
    this.forgotPassword.emit();
  }

  onSocial(provider: SocialProvider): void {
    this.socialLogin.emit(provider);
  }
}
