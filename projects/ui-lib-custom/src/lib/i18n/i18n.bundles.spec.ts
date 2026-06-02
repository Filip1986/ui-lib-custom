import { UI_LIB_EN } from './en';
import { UI_LIB_DE } from './de';
import { UI_LIB_FR } from './fr';
import { UI_LIB_ES } from './es';
import type { UiLibTranslationBundle, UiLibTranslationKey } from './i18n.types';

/**
 * Locale parity + integrity tests.
 *
 * `UI_LIB_EN` is the canonical bundle: it defines the complete set of keys and
 * the `{placeholder}` tokens each value may interpolate. Every other locale must
 * mirror that key set exactly. These tests are the regression guard that fails
 * the build when a key is added to `en.ts` but forgotten in another locale (or
 * vice-versa), or when a translation drops/renames an interpolation token.
 *
 * The bundle *types* (`UiLibTranslationBundle`) already enforce key completeness
 * at compile time; these runtime checks additionally guard against `as` casts,
 * empty strings, and placeholder drift that types cannot catch.
 */

/** Non-canonical locale bundles, keyed by their public export name. */
const LOCALE_BUNDLES: ReadonlyArray<readonly [string, UiLibTranslationBundle]> = [
  ['UI_LIB_DE', UI_LIB_DE],
  ['UI_LIB_FR', UI_LIB_FR],
  ['UI_LIB_ES', UI_LIB_ES],
];

/** Extract the set of `{placeholder}` token names from a translation value. */
function placeholders(value: string): Set<string> {
  const tokens: Set<string> = new Set<string>();
  for (const match of value.matchAll(/\{(\w+)\}/g)) {
    const token: string | undefined = match[1];
    if (token !== undefined) tokens.add(token);
  }
  return tokens;
}

const EN_KEYS: ReadonlyArray<UiLibTranslationKey> = (
  Object.keys(UI_LIB_EN) as UiLibTranslationKey[]
).sort();

describe('i18n bundles — canonical English', (): void => {
  it('defines a non-empty key set', (): void => {
    expect(EN_KEYS.length).toBeGreaterThan(0);
  });

  it('has no empty or whitespace-only values', (): void => {
    const empty: ReadonlyArray<UiLibTranslationKey> = EN_KEYS.filter(
      (key: UiLibTranslationKey): boolean => UI_LIB_EN[key].trim().length === 0,
    );
    expect(empty).toEqual([]);
  });

  it('uses dotted `<component>.<token>` key naming', (): void => {
    const malformed: ReadonlyArray<UiLibTranslationKey> = EN_KEYS.filter(
      (key: UiLibTranslationKey): boolean => !/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(key),
    );
    expect(malformed).toEqual([]);
  });
});

describe.each(LOCALE_BUNDLES)(
  'i18n bundles — %s parity with UI_LIB_EN',
  (_name: string, bundle: UiLibTranslationBundle): void => {
    const localeKeys: ReadonlyArray<string> = Object.keys(bundle).sort();

    it('has no keys missing relative to English', (): void => {
      const missing: ReadonlyArray<UiLibTranslationKey> = EN_KEYS.filter(
        (key: UiLibTranslationKey): boolean => !(key in bundle),
      );
      expect(missing).toEqual([]);
    });

    it('has no extra keys not present in English', (): void => {
      const extra: ReadonlyArray<string> = localeKeys.filter(
        (key: string): boolean => !(key in UI_LIB_EN),
      );
      expect(extra).toEqual([]);
    });

    it('has no empty or whitespace-only values', (): void => {
      const empty: ReadonlyArray<UiLibTranslationKey> = EN_KEYS.filter(
        (key: UiLibTranslationKey): boolean => bundle[key].trim().length === 0,
      );
      expect(empty).toEqual([]);
    });

    it('preserves the same {placeholder} tokens as English for every key', (): void => {
      const mismatched: ReadonlyArray<UiLibTranslationKey> = EN_KEYS.filter(
        (key: UiLibTranslationKey): boolean => {
          const expected: Set<string> = placeholders(UI_LIB_EN[key]);
          const actual: Set<string> = placeholders(bundle[key]);
          if (expected.size !== actual.size) return true;
          for (const token of expected) {
            if (!actual.has(token)) return true;
          }
          return false;
        },
      );
      expect(mismatched).toEqual([]);
    });
  },
);
