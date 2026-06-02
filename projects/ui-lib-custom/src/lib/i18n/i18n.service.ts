import type { Signal } from '@angular/core';
import { Injectable, signal, computed, inject, LOCALE_ID } from '@angular/core';
import type {
  UiLibTranslationKey,
  UiLibPartialBundle,
  UiLibLocale,
  UiLibTranslateParams,
} from './i18n.types';
import { UI_LIB_EN } from './en';

/**
 * Signal-based i18n service for ui-lib-custom.
 *
 * Inject in any component to translate user-visible strings:
 *   const i18n = inject(UiLibI18nService);
 *   const label = i18n.translate('select.clear');
 *
 * Localise the library at app startup by swapping the active bundle:
 *   inject(UiLibI18nService).setBundle(UI_LIB_FR, 'fr');
 * or override individual keys without replacing the whole bundle:
 *   inject(UiLibI18nService).extend({ 'select.clear': 'Vider' });
 *
 * See `docs/guides/I18N_GUIDE.md` for the full key catalogue and recipes.
 */
@Injectable({ providedIn: 'root' })
export class UiLibI18nService {
  private readonly _angularLocale: string = inject(LOCALE_ID);

  /** Currently active locale identifier (BCP 47). Defaults to Angular's LOCALE_ID. */
  public readonly locale: ReturnType<typeof signal<UiLibLocale>> = signal<UiLibLocale>(
    this._angularLocale || 'en',
  );

  /**
   * Active translation bundle. Defaults to the built-in English bundle. Typed as
   * a loose string map because at runtime it may hold consumer-registered keys
   * beyond the built-in `UiLibTranslationKey` set (see {@link extend}).
   */
  public readonly bundle: ReturnType<typeof signal<Record<string, string>>> = signal<
    Record<string, string>
  >({ ...UI_LIB_EN });

  /** Direction of the current locale ('ltr' | 'rtl'). */
  public readonly dir: Signal<'ltr' | 'rtl'> = computed<'ltr' | 'rtl'>((): 'ltr' | 'rtl' =>
    RTL_LOCALES.test(this.locale()) ? 'rtl' : 'ltr',
  );

  /**
   * Translate a key, interpolating `{placeholder}` tokens with `params`.
   * Falls back to the key itself if no translation is found.
   *
   * Known library keys (`UiLibTranslationKey`) are autocompleted and type-checked;
   * any other string is still accepted so consumers can resolve custom keys they
   * registered via {@link extend}.
   */
  public translate(
    key: UiLibTranslationKey | (string & {}),
    params?: UiLibTranslateParams,
  ): string {
    const raw: string = this.bundle()[key] ?? key;
    if (!params) return raw;
    return raw.replace(/\{(\w+)\}/g, (_match: string, name: string): string =>
      String((params as Record<string, unknown>)[name] ?? `{${name}}`),
    );
  }

  /**
   * Override the entire translation bundle (e.g. when lazy-loading a language pack).
   * Merges with the English base so untranslated keys still render.
   */
  public setBundle(bundle: UiLibPartialBundle, locale: UiLibLocale): void {
    this.locale.set(locale);
    this.bundle.set({ ...UI_LIB_EN, ...bundle });
  }

  /**
   * Merge additional keys into the current bundle without replacing it.
   * Useful for component-library-level extensions.
   */
  public extend(extra: UiLibPartialBundle): void {
    this.bundle.set({ ...this.bundle(), ...extra });
  }
}

/** Regex matching RTL locale prefixes (Arabic, Hebrew, Persian, Urdu, etc.). */
const RTL_LOCALES: RegExp = /^(ar|he|fa|ur|yi|dv|ha|khw|ks|ku|ps|sd|ug|uz-Arab)/;
