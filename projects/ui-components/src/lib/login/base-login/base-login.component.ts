import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LoginFeatures, LoginFormData } from '../models/login-contract';
import { CheckboxChangeEvent } from 'primeng/checkbox';

import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    CardModule,
    DividerModule,
    RippleModule
],
  template: '',
})
export class BaseLoginComponent implements OnInit {
  private static readonly REMEMBER_ME_KEY = 'remember_me_preference';

  @Input() title = 'Sign In';

  /**
   * Login features configuration
   */
  @Input() features: LoginFeatures = {
    showSocialLogin: true,
    showRememberMe: true,
    showForgotPassword: true,
    showRegisterLink: true,
  };

  /**
   * Loading state for the login button
   */
  @Input() loading = false;

  // Output events
  @Output() submitLogin: EventEmitter<LoginFormData> = new EventEmitter<LoginFormData>();
  @Output() registerClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() forgotPasswordClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() socialLoginClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() rememberMeChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Form and state
  loginForm: FormGroup;
  submitted = false;
  rememberMe = false;


  constructor(
    protected formBuilder: FormBuilder,
    protected messageService: MessageService,
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
  onRememberMeChange(event: CheckboxChangeEvent): void {
    this.setRememberMePreference(event.checked);
    this.rememberMeChange.emit(event.checked);
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    this.submitted = true;

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
      rememberMe: [this.rememberMe],
    });
  }

  /**
   * Initialize remember me preference from localStorage
   */
  private initializeRememberMe(): void {
    const rememberMePreference: boolean = this.getRememberMePreference();
    this.rememberMe = rememberMePreference;
    this.loginForm.patchValue({ rememberMe: rememberMePreference });
  }

  private getRememberMePreference(): boolean {
    return localStorage.getItem(BaseLoginComponent.REMEMBER_ME_KEY) === 'true';
  }

  private setRememberMePreference(value: boolean): void {
    localStorage.setItem(BaseLoginComponent.REMEMBER_ME_KEY, value.toString());
  }
}
