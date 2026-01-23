import { Component, ChangeDetectionStrategy, OnInit, input, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginFeatures, LoginFormData } from '../models/login-contract';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
],
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseLoginComponent implements OnInit {
  private static readonly REMEMBER_ME_KEY = 'remember_me_preference';

  title = input<string>('Sign In');

  /**
   * Login features configuration
   */
  features = input<LoginFeatures>({
    showSocialLogin: true,
    showRememberMe: true,
    showForgotPassword: true,
    showRegisterLink: true,
  });

  /**
   * Loading state for the login button
   */
  loading = input<boolean>(false);

  // Output events
  submitLogin = output<LoginFormData>();
  registerClick = output<void>();
  forgotPasswordClick = output<string>();
  socialLoginClick = output<string>();
  rememberMeChange = output<boolean>();

  // Form and state as signals
  loginForm: FormGroup;
  submitted = signal(false);
  rememberMe = signal(false);


  constructor(
    protected formBuilder: FormBuilder
  ) {
    this.loginForm = this.createLoginForm();
  }

  /**
   * Getter for form controls
   */
  get formControls() {
    return this.loginForm.controls;
  }

  /**
   * Initialize the component
   */
  ngOnInit(): void {
    this.initializeRememberMe();
  }

  /**
   * Handle remember me checkbox change
   */
  onRememberMeChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.setRememberMePreference(checked);
    this.rememberMeChange.emit(checked);
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    this.submitted.set(true);

    if (this.loginForm.invalid) {
      return;
    }

    const { username, password, rememberMe } = this.loginForm.value;
    this.setRememberMePreference(rememberMe);

    // Emit login data instead of making the request directly
    this.submitLogin.emit({
      username,
      password,
      rememberMe,
    });
  }

  /**
   * Handle register button click
   */
  onRegister(): void {
    this.registerClick.emit();
  }

  /**
   * Handle forgot password link click
   */
  onForgotPassword(): void {
    const email: string = this.formControls['username'].value || '';
    this.forgotPasswordClick.emit(email);
  }

  /**
   * Handle social login button click
   */
  onSocialLogin(provider: string): void {
    this.socialLoginClick.emit(provider);
  }

  /**
   * Create the login form
   */
  private createLoginForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [this.rememberMe()],
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
