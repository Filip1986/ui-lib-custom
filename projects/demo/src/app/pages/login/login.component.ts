import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Login1Component,
  Login2Component,
  Login3Component,
  LoginForm,
  Tabs,
  Tab,
  Card,
} from 'ui-lib-custom';
import type { LoginFormData, TabsValue } from 'ui-lib-custom';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocDemoViewportComponent } from '@demo/shared/doc-page/doc-demo-viewport.component';

interface LoginVariant {
  id: string;
  title: string;
  description: string;
  features: string[];
  importCode: string;
  usageCode: string;
  background: string;
}

type TabKey = 'variants' | 'api-reference';

/**
 * Demo page for login form variants.
 */
@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    Tabs,
    Tab,
    Card,
    Login1Component,
    Login2Component,
    Login3Component,
    LoginForm,
    DocPageLayoutComponent,
    DocDemoViewportComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public readonly sections: DocSection[] = [
    { id: 'variants', label: 'Variants' },
    { id: 'api-reference', label: 'API Reference' },
  ];

  public readonly activeTab: WritableSignal<TabKey> = signal<TabKey>('variants');

  public setTab(tab: TabKey): void {
    this.activeTab.set(tab);
  }

  public onTabChange(value: TabsValue | null): void {
    if (value === null) return;
    this.setTab(value as TabKey);
  }

  public readonly loginLoading: WritableSignal<boolean> = signal<boolean>(false);
  public readonly activeVariant: WritableSignal<string> = signal<string>('variant1');
  public readonly copiedStates: WritableSignal<Record<string, boolean>> = signal<
    Record<string, boolean>
  >({});

  public readonly eventHandlersCode: string = `onLogin(data: LoginFormData) {
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

  public readonly variants: LoginVariant[] = [
    {
      id: 'variant1',
      title: 'Login Variant 1 - Card Style',
      description:
        'Elegant card-based login with gradient header and clean Material Design elements. Features social login buttons and a modern, professional appearance.',
      features: [
        'Gradient header with icon',
        'Social login buttons (Google, Facebook, GitHub)',
        'Remember me checkbox',
        'Forgot password link',
        'Registration link',
        'Loading state with spinner',
        'Form validation',
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
      background: 'card-style-bg',
    },
    {
      id: 'variant2',
      title: 'Login Variant 2 - Minimal Style',
      description:
        'Clean, minimalist login design with focus on simplicity and usability. Perfect for modern applications that prioritize content over decoration.',
      features: [
        'Minimalist design approach',
        'Clean input fields with subtle borders',
        'Social login options',
        'Remember me functionality',
        'Forgot password support',
        'Simple registration flow',
        'Responsive layout',
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
      background: 'minimal-style-bg',
    },
    {
      id: 'variant3',
      title: 'Login Variant 3 - Split Panel Style',
      description:
        'Modern split-panel design with floating labels and a visually striking layout. Ideal for applications that want to make a strong visual impression.',
      features: [
        'Split-panel layout design',
        'Floating label inputs',
        'Prominent branding area',
        'Social authentication options',
        'Remember me checkbox',
        'Password recovery',
        'Sign-up navigation',
        'Modern animations',
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
      background: 'split-style-bg',
    },
    {
      id: 'login-form',
      title: 'Login Form (New) - Centered/Split/Minimal',
      description:
        'New composable login form that switches between centered, split, and minimal variants, using library Button/Card and CSS-variable theming.',
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
      background: 'card-style-bg',
    },
  ];

  public selectVariant(variantId: string): void {
    this.activeVariant.set(variantId);
  }

  public onVariantChange(value: TabsValue | null): void {
    if (value) {
      this.activeVariant.set(String(value));
    }
  }

  public getActiveVariant(): LoginVariant {
    const current: LoginVariant | undefined = this.variants.find(
      (v: LoginVariant): boolean => v.id === this.activeVariant()
    );
    if (current) {
      return current;
    }
    const fallback: LoginVariant | undefined = this.variants[0];
    if (fallback) {
      return fallback;
    }
    return {
      id: 'variant1',
      title: 'Login Variant 1',
      description: '',
      features: [],
      importCode: '',
      usageCode: '',
      background: '',
    };
  }

  public async copyToClipboard(text: string, key: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.copiedStates.update(
        (s: Record<string, boolean>): Record<string, boolean> => ({
          ...s,
          [key]: true,
        })
      );
      setTimeout((): void => {
        this.copiedStates.update(
          (s: Record<string, boolean>): Record<string, boolean> => ({
            ...s,
            [key]: false,
          })
        );
      }, 2000);
    } catch (err: unknown) {
      const message: string = err instanceof Error ? err.message : String(err);
      console.error('Failed to copy:', message);
    }
  }

  public isCopied(key: string): boolean {
    return this.copiedStates()[key] || false;
  }

  public onLogin(data: LoginFormData): void {
    console.warn('Login attempt:', data);
    this.loginLoading.set(true);

    setTimeout((): void => {
      this.loginLoading.set(false);
      alert(`Login successful!\nUsername: ${data.username}`);
    }, 2000);
  }

  public onRegister(): void {
    alert('Register clicked');
  }

  public onForgotPassword(username: string): void {
    alert(`Password reset requested for: ${username}`);
  }

  public onSocialLogin(provider: string): void {
    alert(`Social login with: ${provider}`);
  }

  public onRememberMeChange(checked: boolean): void {
    console.warn('Remember me:', checked);
  }

  public onLoginForm(data: { email: string; password: string; remember: boolean }): void {
    alert(`Login submitted: ${data.email}\nRemember: ${data.remember}`);
  }
}
