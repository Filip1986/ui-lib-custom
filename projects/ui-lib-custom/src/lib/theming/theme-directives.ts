import { Directive, input, type InputSignal } from '@angular/core';

/**
 * Applies the dark theme data attribute when active.
 */
@Directive({
  selector: '[uiLibDarkTheme]',
  standalone: true,
  host: {
    '[attr.data-theme]': 'active() ? "dark" : null',
  },
})
export class DarkThemeDirective {
  public readonly active: InputSignal<boolean> = input(true, { alias: 'uiLibDarkTheme' });
}

/**
 * Applies the light theme data attribute when active.
 */
@Directive({
  selector: '[uiLibLightTheme]',
  standalone: true,
  host: {
    '[attr.data-theme]': 'active() ? "light" : null',
  },
})
export class LightThemeDirective {
  public readonly active: InputSignal<boolean> = input(true, { alias: 'uiLibLightTheme' });
}
