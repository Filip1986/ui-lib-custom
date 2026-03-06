import type { OnInit, InputSignal, WritableSignal, OutputEmitterRef } from '@angular/core';
import type { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import type { LoginFeatures, LoginFormData, LoginSocialProvider } from '../models/login-contract';
import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export const DEFAULT_SOCIAL_PROVIDERS: LoginSocialProvider[] = [
  { id: 'google', label: 'Google', icon: 'google' },
  { id: 'github', label: 'GitHub', icon: 'github' },
  { id: 'microsoft', label: 'Microsoft', icon: 'microsoft' },
];

interface LoginFormControls {
  username: FormControl<string>;
  password: FormControl<string>;
  rememberMe: FormControl<boolean>;
}

const requiredValidator: ValidatorFn = Validators.required;

/**
 * Shared base class for login variants, providing form logic and events.
 */
@Component({
  selector: 'lib-base-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BaseLoginComponent implements OnInit {
  private static readonly REMEMBER_ME_KEY: string = 'remember_me_preference';

  private readonly formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  public readonly title: InputSignal<string> = input<string>('Sign In');

  /**
   * Login features configuration
   */
  public readonly features: InputSignal<LoginFeatures> = input<LoginFeatures>({
    showSocialLogin: true,
    showRememberMe: true,
    showForgotPassword: true,
    showRegisterLink: true,
  });

  /**
   * Loading state for the login button
   */
  public readonly loading: InputSignal<boolean> = input<boolean>(false);

  /**
   * Available social login providers
   */
  public readonly socialProviders: InputSignal<LoginSocialProvider[]> =
    input<LoginSocialProvider[]>(DEFAULT_SOCIAL_PROVIDERS);

  // Output events
  public readonly submitLogin: OutputEmitterRef<LoginFormData> = output<LoginFormData>();
  public readonly registerClick: OutputEmitterRef<void> = output<void>();
  public readonly forgotPasswordClick: OutputEmitterRef<string> = output<string>();
  public readonly socialLoginClick: OutputEmitterRef<string> = output<string>();
  public readonly rememberMeChange: OutputEmitterRef<boolean> = output<boolean>();

  // Form and state as signals
  public readonly loginForm: FormGroup<LoginFormControls> = this.createLoginForm();
  public readonly submitted: WritableSignal<boolean> = signal<boolean>(false);
  public readonly rememberMe: WritableSignal<boolean> = signal<boolean>(false);

  /**
   * Getter for form controls
   */
  public get formControls(): FormGroup<LoginFormControls>['controls'] {
    return this.loginForm.controls;
  }

  /**
   * Initialize the component
   */
  public ngOnInit(): void {
    this.initializeRememberMe();
  }

  /**
   * Handle remember me checkbox change
   */
  public onRememberMeChange(event: Event): void {
    const checked: boolean = (event.target as HTMLInputElement).checked;
    this.setRememberMePreference(checked);
    this.rememberMeChange.emit(checked);
  }

  /**
   * Handle form submission
   */
  public onSubmit(): void {
    this.submitted.set(true);

    if (this.loginForm.invalid) {
      return;
    }

    const formValue: LoginFormData = this.loginForm.getRawValue();
    this.setRememberMePreference(formValue.rememberMe);

    // Emit login data instead of making the request directly
    this.submitLogin.emit(formValue);
  }

  /**
   * Handle register button click
   */
  public onRegister(): void {
    this.registerClick.emit();
  }

  /**
   * Handle forgot password link click
   */
  public onForgotPassword(): void {
    const email: string = this.formControls.username.value;
    this.forgotPasswordClick.emit(email);
  }

  /**
   * Handle social login button click
   */
  public onSocialLogin(provider: string): void {
    this.socialLoginClick.emit(provider);
  }

  /**
   * Create the login form
   */
  private createLoginForm(): FormGroup<LoginFormControls> {
    return this.formBuilder.group<LoginFormControls>({
      username: this.formBuilder.control('', { validators: [requiredValidator] }),
      password: this.formBuilder.control('', { validators: [requiredValidator] }),
      rememberMe: this.formBuilder.control(false),
    });
  }

  /**
   * Initialize remember me preference from localStorage
   */
  private initializeRememberMe(): void {
    const rememberMePreference: boolean = this.getRememberMePreference();
    this.rememberMe.set(rememberMePreference);
    this.loginForm.patchValue({ rememberMe: rememberMePreference });
  }

  private getRememberMePreference(): boolean {
    return localStorage.getItem(BaseLoginComponent.REMEMBER_ME_KEY) === 'true';
  }

  private setRememberMePreference(value: boolean): void {
    localStorage.setItem(BaseLoginComponent.REMEMBER_ME_KEY, value.toString());
  }
}
