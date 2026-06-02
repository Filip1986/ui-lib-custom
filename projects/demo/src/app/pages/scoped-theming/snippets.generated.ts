/* eslint-disable */
// AUTO-GENERATED — run `node scripts/generate-snippets.mjs` to regenerate.
// Do not edit manually.

export const componentThemeCodeHtml = `<!-- String shorthand -->
<ui-lib-card theme="dark"> Dark themed card </ui-lib-card>

<!-- Full config -->
<ui-lib-card [theme]="{ colorScheme: 'dark' }"> Dark themed card </ui-lib-card>`;

export const componentThemeCodeTs = `import { Component } from '@angular/core';
import { Card } from 'ui-lib-custom/card';

@Component({
  standalone: true,
  imports: [Card],
  templateUrl: './component-theme-code.example.html',
})
export class MyComponent {}`;

export const directiveCodeHtml = `<!-- Using directive -->
<div [uiLibTheme]="'dark'">
  <ui-lib-button>Dark button</ui-lib-button>
</div>

<!-- Shorthand directives -->
<section [uiLibDarkTheme]="true">
  <ui-lib-button>Dark button</ui-lib-button>
</section>`;

export const directiveCodeTs = `import { Component } from '@angular/core';
import { ThemeScopeDirective, DarkThemeDirective } from 'ui-lib-custom/theme';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [ThemeScopeDirective, DarkThemeDirective, Button],
  templateUrl: './directive-code.example.html',
})
export class MyComponent {}`;
