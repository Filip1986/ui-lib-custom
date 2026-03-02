import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BaseLoginComponent } from './base-login.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('BaseLoginComponent', (): void => {
  let component: BaseLoginComponent;
  let fixture: ComponentFixture<BaseLoginComponent>;

  beforeEach(async (): Promise<void> => {
    localStorage.removeItem('remember_me_preference');
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BaseLoginComponent],
      providers: [FormBuilder, provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach((): void => {
    localStorage.clear();
  });

  it('should create the component', (): void => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', (): void => {
    it('should create a login form with default values', (): void => {
      expect(component.loginForm).toBeTruthy();
      expect(component.loginForm.get('username')?.value).toBe('');
      expect(component.loginForm.get('password')?.value).toBe('');
      expect(component.loginForm.get('rememberMe')?.value).toBe(false);
    });

    it('should initialize rememberMe from localStorage', (): void => {
      localStorage.setItem('remember_me_preference', 'true');
      component.ngOnInit();
      expect(component.rememberMe()).toBe(true);
      expect(component.loginForm.get('rememberMe')?.value).toBe(true);
    });
  });

  describe('onRememberMeChange', (): void => {
    let setItemSpy: jasmine.Spy;

    beforeEach((): void => {
      // Mock localStorage
      setItemSpy = spyOn(localStorage, 'setItem');
    });

    it('should update localStorage and emit rememberMeChange', (): void => {
      const event = { target: { checked: true } } as { target: { checked: boolean } };

      spyOn(component.rememberMeChange, 'emit');

      component.onRememberMeChange(event);

      expect(setItemSpy).toHaveBeenCalledWith('remember_me_preference', 'true');
      expect(component.rememberMeChange.emit).toHaveBeenCalledWith(true);
    });
  });

  describe('onSubmit', (): void => {
    it('should not submit the form if it is invalid', (): void => {
      component.loginForm.get('username')?.setErrors({ required: true });
      spyOn(component.submitLogin, 'emit');

      component.onSubmit();

      expect(component.submitted()).toBe(true);
      expect(component.submitLogin.emit).not.toHaveBeenCalled();
    });

    it('should emit submitLogin with form data if the form is valid', (): void => {
      component.loginForm.setValue({
        username: 'testuser',
        password: 'password123',
        rememberMe: true,
      });
      spyOn(component.submitLogin, 'emit');

      component.onSubmit();

      expect(component.submitLogin.emit).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123',
        rememberMe: true,
      });
    });
  });

  describe('onRegister', (): void => {
    it('should emit registerClick', (): void => {
      spyOn(component.registerClick, 'emit');

      component.onRegister();

      expect(component.registerClick.emit).toHaveBeenCalled();
    });
  });

  describe('onForgotPassword', (): void => {
    it('should emit forgotPasswordClick with the username', (): void => {
      component.loginForm.get('username')?.setValue('testuser@example.com');
      spyOn(component.forgotPasswordClick, 'emit');

      component.onForgotPassword();

      expect(component.forgotPasswordClick.emit).toHaveBeenCalledWith('testuser@example.com');
    });
  });

  describe('onSocialLogin', (): void => {
    it('should emit socialLoginClick with the provider', (): void => {
      spyOn(component.socialLoginClick, 'emit');

      component.onSocialLogin('google');

      expect(component.socialLoginClick.emit).toHaveBeenCalledWith('google');
    });
  });
});
