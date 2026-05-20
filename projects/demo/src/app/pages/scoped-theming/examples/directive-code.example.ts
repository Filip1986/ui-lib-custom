import { Component } from '@angular/core';
import { ThemeScopeDirective, DarkThemeDirective } from 'ui-lib-custom/theme';
import { Button } from 'ui-lib-custom/button';

@Component({
  standalone: true,
  imports: [ThemeScopeDirective, DarkThemeDirective, Button],
  templateUrl: './directive-code.example.html',
})
export class MyComponent {}
