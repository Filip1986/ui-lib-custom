import type { UI_LIB_EN } from './en';

/**
 * Every translation key understood by the library, derived from the canonical
 * English bundle (`UI_LIB_EN`). Single source of truth: add a key to `en.ts` and
 * it appears here automatically, and the built-in locale bundles are then required
 * to provide it.
 */
export type UiLibTranslationKey = keyof typeof UI_LIB_EN;

/**
 * A complete translation bundle — every known key must be present. Used to type
 * the built-in locale constants (`UI_LIB_DE`/`FR`/`ES`) so a missing key is a
 * compile error. The runtime counterpart is `i18n.bundles.spec.ts`.
 */
export type UiLibTranslationBundle = Record<UiLibTranslationKey, string>;

/**
 * A consumer-supplied bundle. Known keys are type-checked and autocompleted;
 * arbitrary extra keys are allowed so apps and downstream libraries can register
 * their own strings. Partial by design — the service merges it over the English
 * base, so untranslated keys still render.
 */
export type UiLibPartialBundle = Partial<Record<UiLibTranslationKey, string>> &
  Record<string, string>;

/** Supported locale identifier (BCP 47 tag, e.g. 'en', 'ar', 'fr-CA'). */
export type UiLibLocale = string;

/** Parameters for ICU-style interpolation in translated strings. */
export type UiLibTranslateParams = Record<string, string | number>;
