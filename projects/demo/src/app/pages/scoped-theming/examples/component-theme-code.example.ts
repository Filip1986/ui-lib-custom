import { Component } from '@angular/core';
import { ThemeScopeDirective } from 'ui-lib-custom/theme';
import { Card } from 'ui-lib-custom/card';

@Component({
  standalone: true,
  imports: [ThemeScopeDirective, Card],
  templateUrl: './component-theme-code.example.html',
})
export class MyComponent {}
