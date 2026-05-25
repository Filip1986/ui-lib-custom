import type { Signal } from '@angular/core';
import { Injectable, signal, computed, inject, LOCALE_ID } from '@angular/core';
import type { UiLibTranslationBundle, UiLibLocale, UiLibTranslateParams } from './i18n.types';
import { UI_LIB_EN } from './en';

/**
 * Signal-based i18n service for ui-lib-custom.
 *
 * Inject in any component to translate user-visible strings:
 *   const i18n = inject(UiLibI18nService);
 *   const label = i18n.translate('select.clear');
 *
 * Provide a custom bundle at the app root to localise the library:
 *   providers: [{ provide: UI_LIB_TRANSLATIONS, useValue: myFrenchBundle }]
 */
@Injectable({ providedIn: 'root' })
export class UiLibI18nService {
  private readonly _angularLocale: string = inject(LOCALE_ID);

  /** Currently active locale identifier (BCP 47). Defaults to Angular's LOCALE_ID. */
  public readonly locale: ReturnType<typeof signal<UiLibLocale>> = signal<UiLibLocale>(
    this._angularLocale || 'en',
  );

  /** Active translation bundle. Defaults to the built-in English bundle. */
  public readonly bundle: ReturnType<typeof signal<UiLibTranslationBundle>> =
    signal<UiLibTranslationBundle>({ ...UI_LIB_EN });

  /** Direction of the current locale ('ltr' | 'rtl'). */
  public readonly dir: Signal<'ltr' | 'rtl'> = computed<'ltr' | 'rtl'>((): 'ltr' | 'rtl' =>
    RTL_LOCALES.test(this.locale()) ? 'rtl' : 'ltr',
  );

  /**
   * Translate a key, interpolating `{placeholder}` tokens with `params`.
   * Falls back to the key itself if no translation is found.
   */
  public translate(key: string, params?: UiLibTranslateParams): string {
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
  public setBundle(bundle: UiLibTranslationBundle, locale: UiLibLocale): void {
    this.locale.set(locale);
    this.bundle.set({ ...UI_LIB_EN, ...bundle });
  }

  /**
   * Merge additional keys into the current bundle without replacing it.
   * Useful for component-library-level extensions.
   */
  public extend(extra: UiLibTranslationBundle): void {
    this.bundle.set({ ...this.bundle(), ...extra });
  }
}

/** Regex matching RTL locale prefixes (Arabic, Hebrew, Persian, Urdu, etc.). */
const RTL_LOCALES: RegExp = /^(ar|he|fa|ur|yi|dv|ha|khw|ks|ku|ps|sd|ug|uz-Arab)/;
