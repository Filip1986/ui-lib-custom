# PrimeNG Integration Guide

This document explains how PrimeNG has been integrated into the `@filip86/ui-components` library.

## Overview

The library now uses PrimeNG components internally to provide rich, feature-complete UI components. PrimeNG is declared as a **peer dependency**, meaning consuming applications must install it alongside the library.

## Latest Versions (as of January 2026)

- **Angular**: 21.1.1
- **PrimeNG**: 21.0.4
- **PrimeIcons**: 7.0.0
- **TypeScript**: 5.9.3

## What Was Done

### 1. Installation
PrimeNG and PrimeIcons were installed in the workspace:
```bash
npm install primeng@21 primeicons@7
```

### 2. Library Configuration

**Updated `projects/ui-components/package.json`:**
```json
{
  "peerDependencies": {
    "@angular/common": "^21.0.0 || ^22.0.0",
    "@angular/core": "^21.0.0 || ^22.0.0",
    "primeng": "^21.0.0",
    "primeicons": "^7.0.0"
  }
}
```

This ensures that:
- Consuming apps provide their own PrimeNG installation
- No version conflicts occur
- Only one copy of PrimeNG exists in `node_modules`

### 3. Demo App Styles

**Updated `projects/demo/src/styles.scss`:**
```scss
// PrimeNG Theme and Icons
@import "primeng/resources/themes/lara-light-blue/theme.css";
@import "primeng/resources/primeng.css";
@import "primeicons/primeicons.css";
```

### 4. Component Usage

Your components already import PrimeNG modules (example from `login.component.ts`):
```typescript
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
// ... etc
```

## For Consuming Applications

### Installation

When installing your library in another Angular application:

```bash
npm install @filip86/ui-components primeng primeicons
```

### Setup Styles

Consuming applications must include PrimeNG styles. Choose one of these methods:

#### Option 1: SCSS Import (Recommended)

In your `src/styles.scss`:
```scss
@import "primeng/resources/themes/lara-light-blue/theme.css";
@import "primeng/resources/primeng.css";
@import "primeicons/primeicons.css";
```

#### Option 2: Angular.json

In your `angular.json`:
```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/primeng/resources/themes/lara-light-blue/theme.css",
              "node_modules/primeng/resources/primeng.css",
              "node_modules/primeicons/primeicons.css",
              "src/styles.scss"
            ]
          }
        }
      }
    }
  }
}
```

### Available Themes

PrimeNG provides many themes. Replace `lara-light-blue` with any of these:
- `lara-light-blue` (default)
- `lara-light-indigo`
- `lara-light-purple`
- `lara-dark-blue`
- `lara-dark-indigo`
- `lara-dark-purple`
- `md-light-indigo` (Material Design)
- `md-dark-indigo` (Material Design)
- `bootstrap4-light-blue`
- `bootstrap4-dark-blue`
- And many more in `node_modules/primeng/resources/themes/`

### Usage Example

```typescript
import { Component } from '@angular/core';
import { LoginComponent } from '@filip86/ui-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent],
  template: `
    <lib-login 
      [variant]="'1'"
      [features]="{
        showSocialLogin: true,
        showRememberMe: true,
        showForgotPassword: true,
        showRegisterLink: true
      }"
      (submitLogin)="onLogin($event)"
      (registerClick)="onRegister()"
      (forgotPasswordClick)="onForgotPassword($event)"
    />
  `
})
export class AppComponent {
  onLogin(data: any) {
    console.log('Login data:', data);
  }

  onRegister() {
    console.log('Navigate to register');
  }

  onForgotPassword(email: string) {
    console.log('Forgot password for:', email);
  }
}
```

## Benefits of This Approach

1. **No Duplication**: PrimeNG is installed once and shared between library and app
2. **Consistent Styling**: Same theme applies across all components
3. **Smaller Bundle**: No additional overhead if apps already use PrimeNG
4. **Flexibility**: Apps can choose their preferred PrimeNG theme
5. **Tree-shaking**: Only imported PrimeNG modules are included in the bundle

## Version Compatibility

- **Angular**: 21.x - 22.x
- **PrimeNG**: 21.x
- **PrimeIcons**: 7.x
- **TypeScript**: 5.9+

## Troubleshooting

### Styles Not Showing

Make sure you've imported the PrimeNG theme CSS in your consuming application's global styles.

### Module Not Found Errors

Make sure you've imported the PrimeNG theme CSS in your consuming application's global styles.

### Module Not Found Errors

Ensure PrimeNG and PrimeIcons are installed in your consuming application:
```bash
npm list primeng primeicons
```

## Next Steps

- Explore other PrimeNG components to enhance your library
- Consider creating custom themes that match your brand
- Document which PrimeNG components your library uses for transparency
