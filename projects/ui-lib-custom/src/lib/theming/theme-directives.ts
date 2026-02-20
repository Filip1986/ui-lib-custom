import { Directive, input } from '@angular/core';

@Directive({
  selector: '[uiLibDarkTheme]',
  standalone: true,
  host: {
    '[attr.data-theme]': 'active() ? "dark" : null',
  },
})
export class DarkThemeDirective {
  active = input(true, { alias: 'uiLibDarkTheme' });
}

@Directive({
  selector: '[uiLibLightTheme]',
  standalone: true,
  host: {
    '[attr.data-theme]': 'active() ? "light" : null',
  },
})
export class LightThemeDirective {
  active = input(true, { alias: 'uiLibLightTheme' });
}
