import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login1Component, Login2Component, Login3Component, LoginFormData, LoginForm } from 'ui-lib-custom';

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
  imports: [CommonModule, Login1Component, Login2Component, Login3Component, LoginForm],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginLoading = signal(false);
  activeVariant = signal('variant1');
  copiedStates = signal<{ [key: string]: boolean }>({});

  eventHandlersCode = `onLogin(data: LoginFormData) {
  console.log('Login attempt:', data);
  this.loginLoading.set(true);

  // Simulate API call
  setTimeout(() => {
    this.loginLoading.set(false);
    alert(\`Login successful!\\nUsername: \${data.username}\`);
  }, 2000);
}

onRegister() {
  console.log('Register clicked');
}

onForgotPassword(username: string) {
  console.log(\`Password reset requested for: \${username}\`);
}

onSocialLogin(provider: string) {
  console.log(\`Social login with: \${provider}\`);
}

onRememberMeChange(checked: boolean) {
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
      importCode: `import { Login1Component, LoginFormData } from 'ui-lib-custom';

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
      importCode: `import { Login2Component, LoginFormData } from 'ui-lib-custom';

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
      importCode: `import { Login3Component, LoginFormData } from 'ui-lib-custom';

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
    },
    {
      id: 'login-form',
      title: 'Login Form (New) - Centered/Split/Minimal',
      description: 'New composable login form that switches between centered, split, and minimal variants, using library Button/Card and CSS-variable theming.',
      features: [
        'Three structural variants (centered, split, minimal)',
        'Slots for logo and social buttons',
        'Remember me + forgot password hooks',
        'CSS variables for light/dark themes',
        'Uses ui-lib Button and Card components',
      ],
      importCode: `import { LoginForm } from 'ui-lib-custom';

@Component({
  selector: 'app-example',
  imports: [LoginForm],
  template: '...'
})
export class ExampleComponent { }`,
      usageCode: `<ui-lib-login-form
  [variant]="'centered'"
  [showSocialLogin]="true"
  [showRememberMe]="true"
  (login)="onLoginForm($event)"
  (forgotPassword)="onForgotPassword('')"
  (socialLogin)="onSocialLogin($event)">
  <ng-template #logo>My Brand</ng-template>
</ui-lib-login-form>`,
      background: 'card-style-bg'
    }
  ];

  selectVariant(variantId: string) {
    this.activeVariant.set(variantId);
  }

  getActiveVariant(): LoginVariant {
    return this.variants.find(v => v.id === this.activeVariant()) || this.variants[0];
  }

  async copyToClipboard(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      this.copiedStates.update(s => ({ ...s, [key]: true }));
      setTimeout(() => {
        this.copiedStates.update(s => ({ ...s, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  isCopied(key: string): boolean {
    return this.copiedStates()[key] || false;
  }

  onLogin(data: LoginFormData) {
    console.log('Login attempt:', data);
    this.loginLoading.set(true);

    setTimeout(() => {
      this.loginLoading.set(false);
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

  onLoginForm(data: { email: string; password: string; remember: boolean }) {
    alert(`Login submitted: ${data.email}\nRemember: ${data.remember}`);
  }
}
