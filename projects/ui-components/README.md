# UiComponents

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.1.

## Installation

To use this library in your Angular application, install it along with its peer dependencies:

```bash
npm install @filip86/ui-components primeng primeicons
```

### Requirements

- **Angular**: 21.x or 22.x
- **PrimeNG**: 21.x
- **PrimeIcons**: 7.x
- **TypeScript**: 5.9+

### PrimeNG Setup

This library uses PrimeNG components internally. You need to include PrimeNG styles in your application.

**Add to your `styles.scss` or `angular.json`:**

```scss
// PrimeNG Theme and Icons
@import "primeng/resources/themes/lara-light-blue/theme.css";
@import "primeng/resources/primeng.css";
@import "primeicons/primeicons.css";
```

**Or in `angular.json`:**

```json
"styles": [
  "node_modules/primeng/resources/themes/lara-light-blue/theme.css",
  "node_modules/primeng/resources/primeng.css",
  "node_modules/primeicons/primeicons.css",
  "src/styles.scss"
]
```

You can choose any PrimeNG theme that suits your application. Available themes can be found in `node_modules/primeng/resources/themes/`.

## Usage

Import the components you need in your Angular application:

```typescript
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
    />
  `
})
export class AppComponent {
  onLogin(data: any) {
    console.log('Login data:', data);
  }
}
```

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the library, run:

```bash
ng build ui-components
```

This command will compile your project, and the build artifacts will be placed in the `dist/` directory.

### Publishing the Library

Once the project is built, you can publish your library by following these steps:

1. Navigate to the `dist` directory:
   ```bash
   cd dist/ui-components
   ```

2. Run the `npm publish` command to publish your library to the npm registry:
   ```bash
   npm publish
   ```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
