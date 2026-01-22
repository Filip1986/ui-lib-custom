import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login3Component } from './login-3.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

describe('Login3Component', () => {
  let component: Login3Component;
  let fixture: ComponentFixture<Login3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login3Component, ReactiveFormsModule],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(Login3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should override usernameConfig and passwordConfig on initialization', () => {
    expect(component.usernameConfig.errorMessage).toBe(
      'Please enter a valid username or email address',
    );
    expect(component.usernameConfig.labelStyle).toBe('float');
    expect(component.usernameConfig.iconPosition).toBe('left');
    expect(component.usernameConfig.containerClass).toBe('login-3-input-container');
    expect(component.usernameConfig.inputClass).toBe('login-3-input');

    expect(component.passwordConfig.errorMessage).toBe('Password is required');
    expect(component.passwordConfig.labelStyle).toBe('float');
    expect(component.passwordConfig.iconPosition).toBe('left');
    expect(component.passwordConfig.containerClass).toBe('login-3-input-container');
    expect(component.passwordConfig.inputClass).toBe('login-3-input');
  });

  it('should call onSubmit and emit submitLogin if the form is valid', () => {
    jest.spyOn(component.submitLogin, 'emit');
    component.loginForm.setValue({
      username: 'testuser',
      password: 'password123',
      rememberMe: true,
    });

    component.onSubmit();

    expect(component.submitLogin.emit).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123',
      rememberMe: true,
    });
  });

  it('should call onRememberMeChange and update localStorage', () => {
    const event = { checked: true } as any;

    const setItemSpy = jest.fn();
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: setItemSpy,
        getItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });

    jest.spyOn(component.rememberMeChange, 'emit');

    component.onRememberMeChange(event);

    expect(setItemSpy).toHaveBeenCalledWith('remember_me_preference', 'true');
    expect(component.rememberMeChange.emit).toHaveBeenCalledWith(true);
  });

  it('should emit registerClick when onRegister is called', () => {
    jest.spyOn(component.registerClick, 'emit');

    component.onRegister();

    expect(component.registerClick.emit).toHaveBeenCalled();
  });

  it('should emit forgotPasswordClick with username when onForgotPassword is called', () => {
    component.loginForm.get('username')?.setValue('testuser@example.com');
    jest.spyOn(component.forgotPasswordClick, 'emit');

    component.onForgotPassword();

    expect(component.forgotPasswordClick.emit).toHaveBeenCalledWith('testuser@example.com');
  });

  it('should emit socialLoginClick with provider when onSocialLogin is called', () => {
    jest.spyOn(component.socialLoginClick, 'emit');

    component.onSocialLogin('google');

    expect(component.socialLoginClick.emit).toHaveBeenCalledWith('google');
  });
});
