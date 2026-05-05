import { Pipe } from '@angular/core';
import type { PipeTransform } from '@angular/core';

/**
 * ClassNameValue — accepted input for {@link classNames} and {@link ClassNamesPipe}.
 *
 * Mirrors the PrimeNG `classnames` utility surface:
 * - A plain `string` is included as-is.
 * - An object whose values are booleans: keys with truthy values are included.
 * - An array of any of the above (nested arbitrarily).
 * - Falsy primitives (`null`, `undefined`, `false`) are silently ignored.
 */
export type ClassNameValue =
  | string
  | null
  | undefined
  | false
  | Record<string, boolean | null | undefined | false>
  | ClassNameValue[];

/**
 * Combines class name values into a single space-separated class string.
 *
 * Accepts strings, conditional objects, arrays, and falsy values (which are
 * ignored). Useful for composing host classes dynamically in TypeScript.
 *
 * @example
 * classNames('btn', isActive && 'btn--active', { 'btn--disabled': isDisabled })
 * // → 'btn btn--active' (when isActive=true, isDisabled=false)
 */
export function classNames(...values: ClassNameValue[]): string {
  const classes: string[] = [];

  for (const value of values) {
    if (!value) {
      continue;
    }
    if (typeof value === 'string') {
      classes.push(value);
    } else if (Array.isArray(value)) {
      const nested: string = classNames(...value);
      if (nested) {
        classes.push(nested);
      }
    } else {
      for (const [key, active] of Object.entries(value)) {
        if (active) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
}

/**
 * ClassNamesPipe — Angular pipe wrapper around {@link classNames}.
 *
 * Use in templates to compose class strings from strings, conditional objects,
 * or arrays. Additional arguments are passed as extra values to `classNames`.
 *
 * @example
 * <!-- Object syntax -->
 * <div [class]="{ active: isActive, disabled: isDisabled } | classNames"></div>
 *
 * <!-- String with additional object -->
 * <div [class]="'btn' | classNames:{ 'btn--lg': isLarge }"></div>
 *
 * <!-- Array flattening -->
 * <div [class]="['base', isActive && 'active'] | classNames"></div>
 */
@Pipe({
  name: 'classNames',
  standalone: true,
  pure: true,
})
export class ClassNamesPipe implements PipeTransform {
  /** Transforms `value` and any `additional` args into a single class string. */
  public transform(value: ClassNameValue, ...additional: ClassNameValue[]): string {
    return classNames(value, ...additional);
  }
}
