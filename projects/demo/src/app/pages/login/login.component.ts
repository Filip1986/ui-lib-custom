import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login1Component, Login2Component, Login3Component, LoginFormData } from 'ui-components';

interface LoginVariant {
  id: string;
  title: string;
  description: string;
  features: string[];
  importCode: string;
  usageCode: string;
  background: string;
}

@Component({
  selector: 'app-login',
  imports: [CommonModule, Login1Component, Login2Component, Login3Component],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginLoading = false;
  activeVariant = 'variant1';
  copiedStates: { [key: string]: boolean } = {};

  eventHandlersCode = `onLogin(data: LoginFormData) {
  console.log('Login attempt:', data);
  this.loginLoading = true;

  // Simulate API call
  setTimeout(() => {
    this.loginLoading = false;
    alert(\`Login successful!\\nUsername: \${data.username}\`);
  }, 2000);
}

onRegister() {
  // Navigate to registration page or show registration modal
  console.log('Register clicked');
}

onForgotPassword(username: string) {
  // Handle password reset flow
  console.log(\`Password reset requested for: \${username}\`);
}

onSocialLogin(provider: string) {
  // Handle social authentication
  console.log(\`Social login with: \${provider}\`);
}

onRememberMeChange(checked: boolean) {
  // Store remember me preference
  console.log('Remember me:', checked);
}`;

  variants: LoginVariant[] = [
    {
      id: 'variant1',
      title: 'Login Variant 1 - Card Style',
      description: 'Elegant card-based login with gradient header and clean Material Design elements. Features social login buttons and a modern, professional appearance.',
      features: [
        'Gradient header with icon',
        'Social login buttons (Google, Facebook, GitHub)',
        'Remember me checkbox',
        'Forgot password link',
        'Registration link',
        'Loading state with spinner',
        'Form validation'
      ],
      importCode: `import { Login1Component, LoginFormData } from 'ui-components';

@Component({
  selector: 'app-example',
  imports: [Login1Component],
  template: \`...\`
})
export class ExampleComponent { }`,
      usageCode: `<lib-login-1
  [loading]="loginLoading"
  (submitLogin)="onLogin($event)"
  (registerClick)="onRegister()"
  (forgotPasswordClick)="onForgotPassword($event)"
  (socialLoginClick)="onSocialLogin($event)"
  (rememberMeChange)="onRememberMeChange($event)"
></lib-login-1>`,
      background: 'card-style-bg'
    },
    {
      id: 'variant2',
      title: 'Login Variant 2 - Minimal Style',
      description: 'Clean, minimalist login design with focus on simplicity and usability. Perfect for modern applications that prioritize content over decoration.',
      features: [
        'Minimalist design approach',
        'Clean input fields with subtle borders',
        'Social login options',
        'Remember me functionality',
        'Forgot password support',
        'Simple registration flow',
        'Responsive layout'
      ],
      importCode: `import { Login2Component, LoginFormData } from 'ui-components';

@Component({
  selector: 'app-example',
  imports: [Login2Component],
  template: \`...\`
})
export class ExampleComponent { }`,
      usageCode: `<lib-login-2
  [loading]="loginLoading"
  (submitLogin)="onLogin($event)"
  (registerClick)="onRegister()"
  (forgotPasswordClick)="onForgotPassword($event)"
  (socialLoginClick)="onSocialLogin($event)"
  (rememberMeChange)="onRememberMeChange($event)"
></lib-login-2>`,
      background: 'minimal-style-bg'
    },
    {
      id: 'variant3',
      title: 'Login Variant 3 - Split Panel Style',
      description: 'Modern split-panel design with floating labels and a visually striking layout. Ideal for applications that want to make a strong visual impression.',
      features: [
        'Split-panel layout design',
        'Floating label inputs',
        'Prominent branding area',
        'Social authentication options',
        'Remember me checkbox',
        'Password recovery',
        'Sign-up navigation',
        'Modern animations'
      ],
      importCode: `import { Login3Component, LoginFormData } from 'ui-components';

@Component({
  selector: 'app-example',
  imports: [Login3Component],
  template: \`...\`
})
export class ExampleComponent { }`,
      usageCode: `<lib-login-3
  [loading]="loginLoading"
  (submitLogin)="onLogin($event)"
  (registerClick)="onRegister()"
  (forgotPasswordClick)="onForgotPassword($event)"
  (socialLoginClick)="onSocialLogin($event)"
  (rememberMeChange)="onRememberMeChange($event)"
></lib-login-3>`,
      background: 'split-style-bg'
    }
  ];

  selectVariant(variantId: string) {
    this.activeVariant = variantId;
  }

  getActiveVariant(): LoginVariant {
    return this.variants.find(v => v.id === this.activeVariant) || this.variants[0];
  }

  async copyToClipboard(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      this.copiedStates[key] = true;
      setTimeout(() => {
        this.copiedStates[key] = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  isCopied(key: string): boolean {
    return this.copiedStates[key] || false;
  }

  onLogin(data: LoginFormData) {
    console.log('Login attempt:', data);
    this.loginLoading = true;

    setTimeout(() => {
      this.loginLoading = false;
      alert(`Login successful!\nUsername: ${data.username}`);
    }, 2000);
  }

  onRegister() {
    alert('Register clicked');
  }

  onForgotPassword(username: string) {
    alert(`Password reset requested for: ${username}`);
  }

  onSocialLogin(provider: string) {
    alert(`Social login with: ${provider}`);
  }

  onRememberMeChange(checked: boolean) {
    console.log('Remember me:', checked);
  }
}
