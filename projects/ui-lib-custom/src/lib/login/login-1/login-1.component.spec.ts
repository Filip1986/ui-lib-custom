import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login1Component } from './login-1.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('Login1Component', () => {
  let component: Login1Component;
  let fixture: ComponentFixture<Login1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login1Component, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Login1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a login form', () => {
    expect(component.loginForm).toBeTruthy();
    expect(component.loginForm.get('username')).toBeTruthy();
    expect(component.loginForm.get('password')).toBeTruthy();
  });

  it('should call onSubmit and emit submitLogin if the form is valid', () => {
    spyOn(component.submitLogin, 'emit');
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
    const event = { target: { checked: true } } as any;

    const setItemSpy = spyOn(localStorage, 'setItem');
    spyOn(component.rememberMeChange, 'emit');

    component.onRememberMeChange(event);

    expect(setItemSpy).toHaveBeenCalledWith('remember_me_preference', 'true');
    expect(component.rememberMeChange.emit).toHaveBeenCalledWith(true);
  });

  it('should emit registerClick when onRegister is called', () => {
    spyOn(component.registerClick, 'emit');

    component.onRegister();

    expect(component.registerClick.emit).toHaveBeenCalled();
  });

  it('should emit forgotPasswordClick with username when onForgotPassword is called', () => {
    component.loginForm.get('username')?.setValue('testuser@example.com');
    spyOn(component.forgotPasswordClick, 'emit');

    component.onForgotPassword();

    expect(component.forgotPasswordClick.emit).toHaveBeenCalledWith('testuser@example.com');
  });

  it('should emit socialLoginClick with provider when onSocialLogin is called', () => {
    spyOn(component.socialLoginClick, 'emit');

    component.onSocialLogin('google');

    expect(component.socialLoginClick.emit).toHaveBeenCalledWith('google');
  });
});
