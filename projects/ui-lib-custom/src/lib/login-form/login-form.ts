import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewEncapsulation,
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
  encapsulation: ViewEncapsulation.None,
})
export class LoginForm {
  public readonly variant = input<LoginFormVariant>('centered');
  public readonly showSocialLogin = input<boolean>(false);
  public readonly showRememberMe = input<boolean>(false);
  public readonly logoTemplate = input<TemplateRef<unknown> | null>(null);

  public readonly login = output<{ email: string; password: string; remember: boolean }>();
  public readonly forgotPassword = output<void>();
  public readonly socialLogin = output<SocialProvider>();

  public readonly email = signal('');
  public readonly password = signal('');
  public readonly remember = signal(true);

  public readonly layoutClass = computed<string>(() => `login-${this.variant()}`);

  public onSubmit(): void {
    this.login.emit({
      email: this.email().trim(),
      password: this.password(),
      remember: this.remember(),
    });
  }

  public onForgot(): void {
    this.forgotPassword.emit();
  }

  public onSocial(provider: SocialProvider): void {
    this.socialLogin.emit(provider);
  }
}
