import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BaseLoginComponent } from './base-login.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('BaseLoginComponent', () => {
  let component: BaseLoginComponent;
  let fixture: ComponentFixture<BaseLoginComponent>;

  beforeEach(async () => {
    localStorage.removeItem('remember_me_preference');
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BaseLoginComponent],
      providers: [FormBuilder, provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', () => {
    it('should create a login form with default values', () => {
      expect(component.loginForm).toBeTruthy();
      expect(component.loginForm.get('username')?.value).toBe('');
      expect(component.loginForm.get('password')?.value).toBe('');
      expect(component.loginForm.get('rememberMe')?.value).toBe(false);
    });

    it('should initialize rememberMe from localStorage', () => {
      localStorage.setItem('remember_me_preference', 'true');
      component.ngOnInit();
      expect(component.rememberMe()).toBe(true);
      expect(component.loginForm.get('rememberMe')?.value).toBe(true);
    });
  });

  describe('onRememberMeChange', () => {
    let setItemSpy: jasmine.Spy;

    beforeEach(() => {
      // Mock localStorage
      setItemSpy = spyOn(localStorage, 'setItem');
    });

    it('should update localStorage and emit rememberMeChange', () => {
      const event = { target: { checked: true } } as any;

      spyOn(component.rememberMeChange, 'emit');

      component.onRememberMeChange(event);

      expect(setItemSpy).toHaveBeenCalledWith('remember_me_preference', 'true');
      expect(component.rememberMeChange.emit).toHaveBeenCalledWith(true);
    });
  });

  describe('onSubmit', () => {
    it('should not submit the form if it is invalid', () => {
      component.loginForm.get('username')?.setErrors({ required: true });
      spyOn(component.submitLogin, 'emit');

      component.onSubmit();

      expect(component.submitted()).toBe(true);
      expect(component.submitLogin.emit).not.toHaveBeenCalled();
    });

    it('should emit submitLogin with form data if the form is valid', () => {
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

  describe('onRegister', () => {
    it('should emit registerClick', () => {
      spyOn(component.registerClick, 'emit');

      component.onRegister();

      expect(component.registerClick.emit).toHaveBeenCalled();
    });
  });

  describe('onForgotPassword', () => {
    it('should emit forgotPasswordClick with the username', () => {
      component.loginForm.get('username')?.setValue('testuser@example.com');
      spyOn(component.forgotPasswordClick, 'emit');

      component.onForgotPassword();

      expect(component.forgotPasswordClick.emit).toHaveBeenCalledWith('testuser@example.com');
    });
  });

  describe('onSocialLogin', () => {
    it('should emit socialLoginClick with the provider', () => {
      spyOn(component.socialLoginClick, 'emit');

      component.onSocialLogin('google');

      expect(component.socialLoginClick.emit).toHaveBeenCalledWith('google');
    });
  });
});
