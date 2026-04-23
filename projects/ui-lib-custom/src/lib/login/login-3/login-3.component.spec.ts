import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { Login3Component } from './login-3.component';
import { ReactiveFormsModule } from '@angular/forms';

const GOOGLE_ICON_SVG: string = '<svg></svg>';
const GITHUB_ICON_SVG: string = '<svg></svg>';
const MICROSOFT_ICON_SVG: string = '<svg></svg>';

describe('Login3Component', (): void => {
  let component: Login3Component;
  let fixture: ComponentFixture<Login3Component>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [Login3Component, ReactiveFormsModule],
      providers: [
        provideIcons({
          google: GOOGLE_ICON_SVG,
          github: GITHUB_ICON_SVG,
          microsoft: MICROSOFT_ICON_SVG,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', (): void => {
    expect(component).toBeTruthy();
  });

  it('should have a login form', (): void => {
    expect(component.loginForm).toBeTruthy();
    expect(component.loginForm.get('username')).toBeTruthy();
    expect(component.loginForm.get('password')).toBeTruthy();
  });

  it('should call onSubmit and emit submitLogin if the form is valid', (): void => {
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

  it('should call onRememberMeChange and update localStorage', (): void => {
    const input: HTMLInputElement = document.createElement('input');
    input.checked = true;
    const event: Event = new Event('change');
    Object.defineProperty(event, 'target', { value: input });

    const setItemSpy: jest.SpyInstance = jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(component.rememberMeChange, 'emit');

    component.onRememberMeChange(event);

    expect(setItemSpy).toHaveBeenCalledWith('remember_me_preference', 'true');
    expect(component.rememberMeChange.emit).toHaveBeenCalledWith(true);
  });

  it('should emit registerClick when onRegister is called', (): void => {
    jest.spyOn(component.registerClick, 'emit');

    component.onRegister();

    expect(component.registerClick.emit).toHaveBeenCalled();
  });

  it('should emit forgotPasswordClick with username when onForgotPassword is called', (): void => {
    component.loginForm.get('username')?.setValue('testuser@example.com');
    jest.spyOn(component.forgotPasswordClick, 'emit');

    component.onForgotPassword();

    expect(component.forgotPasswordClick.emit).toHaveBeenCalledWith('testuser@example.com');
  });

  it('should emit socialLoginClick with provider when onSocialLogin is called', (): void => {
    jest.spyOn(component.socialLoginClick, 'emit');

    component.onSocialLogin('google');

    expect(component.socialLoginClick.emit).toHaveBeenCalledWith('google');
  });
});
