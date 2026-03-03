import { Directive, input, type InputSignal } from '@angular/core';

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
