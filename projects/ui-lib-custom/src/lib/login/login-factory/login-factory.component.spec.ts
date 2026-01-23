import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFactoryComponent } from './login-factory.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginVariant } from '../models/login-contract';

describe('LoginFactoryComponent', () => {
  let component: LoginFactoryComponent;
  let fixture: ComponentFixture<LoginFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFactoryComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render Login1Component for variant "1"', () => {
    component.variant = '1';
    fixture.detectChanges();
    const login1Element = fixture.nativeElement.querySelector('lib-login-1');
    expect(login1Element).toBeTruthy();
  });

  it('should render Login3Component for variant "2"', () => {
    component.variant = '2';
    fixture.detectChanges();
    const login3Element = fixture.nativeElement.querySelector('lib-login-3');
    expect(login3Element).toBeTruthy();
  });

  it('should render Login2Component for default variant', () => {
    component.variant = 'unknown' as LoginVariant;
    fixture.detectChanges();
    const login2Element = fixture.nativeElement.querySelector('lib-login-2');
    expect(login2Element).toBeTruthy();
  });

  it('should emit submitLogin event when child component emits it', () => {
    jest.spyOn(component.submitLogin, 'emit');
    component.onSubmitLogin({ username: 'testuser', password: 'password123', rememberMe: true });
    expect(component.submitLogin.emit).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123',
      rememberMe: true,
    });
  });

  it('should emit registerClick event when child component emits it', () => {
    jest.spyOn(component.registerClick, 'emit');
    component.onRegisterClick();
    expect(component.registerClick.emit).toHaveBeenCalled();
  });

  it('should emit forgotPasswordClick event when child component emits it', () => {
    jest.spyOn(component.forgotPasswordClick, 'emit');
    component.onForgotPasswordClick('testuser@example.com');
    expect(component.forgotPasswordClick.emit).toHaveBeenCalledWith('testuser@example.com');
  });

  it('should emit socialLoginClick event when child component emits it', () => {
    jest.spyOn(component.socialLoginClick, 'emit');
    component.onSocialLoginClick('google');
    expect(component.socialLoginClick.emit).toHaveBeenCalledWith('google');
  });

  it('should emit rememberMeChange event when child component emits it', () => {
    jest.spyOn(component.rememberMeChange, 'emit');
    component.onRememberMeChange(true);
    expect(component.rememberMeChange.emit).toHaveBeenCalledWith(true);
  });
});
