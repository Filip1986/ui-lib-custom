/** Flat key–value translation bundle. Values may contain `{placeholder}` tokens. */
export type UiLibTranslationBundle = Record<string, string>;

/** Supported locale identifier (BCP 47 tag, e.g. 'en', 'ar', 'fr-CA'). */
export type UiLibLocale = string;

/** Parameters for ICU-style interpolation in translated strings. */
export type UiLibTranslateParams = Record<string, string | number>;
