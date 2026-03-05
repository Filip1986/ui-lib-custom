import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import type {
  TemplateRef,
  InputSignal,
  WritableSignal,
  Signal,
  OutputEmitterRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from '../button';
import { Card } from '../card';
import type { LoginFormVariant, SocialProvider } from './login-form.types';

export type { LoginFormVariant, SocialProvider } from './login-form.types';

/**
 * Login form component with optional social login actions.
 */
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
  public readonly variant: InputSignal<LoginFormVariant> = input<LoginFormVariant>('centered');
  public readonly showSocialLogin: InputSignal<boolean> = input<boolean>(false);
  public readonly showRememberMe: InputSignal<boolean> = input<boolean>(false);
  public readonly logoTemplate: InputSignal<TemplateRef<unknown> | null> =
    input<TemplateRef<unknown> | null>(null);

  public readonly login: OutputEmitterRef<{ email: string; password: string; remember: boolean }> =
    output<{ email: string; password: string; remember: boolean }>();
  public readonly forgotPassword: OutputEmitterRef<void> = output<void>();
  public readonly socialLogin: OutputEmitterRef<SocialProvider> = output<SocialProvider>();

  public readonly email: WritableSignal<string> = signal<string>('');
  public readonly password: WritableSignal<string> = signal<string>('');
  public readonly remember: WritableSignal<boolean> = signal<boolean>(true);

  public readonly layoutClass: Signal<string> = computed<string>(
    (): string => `login-${this.variant()}`
  );

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
