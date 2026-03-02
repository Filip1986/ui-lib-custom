import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { LoginFactoryComponent } from './login-factory.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginFactoryComponent', (): void => {
  let component: LoginFactoryComponent;
  let fixture: ComponentFixture<LoginFactoryComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [LoginFactoryComponent, ReactiveFormsModule],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', (): void => {
    expect(component).toBeTruthy();
  });

  it('should render Login1Component for variant "1"', (): void => {
    fixture.componentRef.setInput('variant', '1');
    fixture.detectChanges();
    const login1Element: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      'lib-login-1'
    );
    expect(login1Element).toBeTruthy();
  });

  it('should render Login2Component for variant "2"', (): void => {
    fixture.componentRef.setInput('variant', '2');
    fixture.detectChanges();
    const login2Element: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      'lib-login-2'
    );
    expect(login2Element).toBeTruthy();
  });

  it('should render Login3Component for variant "3"', (): void => {
    fixture.componentRef.setInput('variant', '3');
    fixture.detectChanges();
    const login3Element: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      'lib-login-3'
    );
    expect(login3Element).toBeTruthy();
  });

  it('should render Login1Component for default variant', (): void => {
    const login1Element: HTMLElement | null = (fixture.nativeElement as HTMLElement).querySelector(
      'lib-login-1'
    );
    expect(login1Element).toBeTruthy();
  });

  it('should emit submitLogin event when child component emits it', (): void => {
    spyOn(component.submitLogin, 'emit');
    component.onSubmitLogin({ username: 'testuser', password: 'password123', rememberMe: true });
    expect(component.submitLogin.emit).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123',
      rememberMe: true,
    });
  });

  it('should emit registerClick event when child component emits it', (): void => {
    spyOn(component.registerClick, 'emit');
    component.onRegisterClick();
    expect(component.registerClick.emit).toHaveBeenCalled();
  });

  it('should emit forgotPasswordClick event when child component emits it', (): void => {
    spyOn(component.forgotPasswordClick, 'emit');
    component.onForgotPasswordClick('testuser@example.com');
    expect(component.forgotPasswordClick.emit).toHaveBeenCalledWith('testuser@example.com');
  });

  it('should emit socialLoginClick event when child component emits it', (): void => {
    spyOn(component.socialLoginClick, 'emit');
    component.onSocialLoginClick('google');
    expect(component.socialLoginClick.emit).toHaveBeenCalledWith('google');
  });

  it('should emit rememberMeChange event when child component emits it', (): void => {
    spyOn(component.rememberMeChange, 'emit');
    component.onRememberMeChange(true);
    expect(component.rememberMeChange.emit).toHaveBeenCalledWith(true);
  });
});
