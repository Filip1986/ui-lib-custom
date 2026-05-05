import { classNames, ClassNamesPipe } from './class-names';
import type { ClassNameValue } from './class-names';

// ---------------------------------------------------------------------------
// classNames function
// ---------------------------------------------------------------------------

describe('classNames', (): void => {
  describe('string inputs', (): void => {
    it('returns a single string unchanged', (): void => {
      expect(classNames('foo')).toBe('foo');
    });

    it('joins multiple strings with a space', (): void => {
      expect(classNames('foo', 'bar', 'baz')).toBe('foo bar baz');
    });

    it('returns an empty string when called with no arguments', (): void => {
      expect(classNames()).toBe('');
    });
  });

  describe('falsy values', (): void => {
    it('ignores null values', (): void => {
      expect(classNames('foo', null, 'bar')).toBe('foo bar');
    });

    it('ignores undefined values', (): void => {
      expect(classNames('foo', undefined, 'bar')).toBe('foo bar');
    });

    it('ignores false values', (): void => {
      expect(classNames('foo', false, 'bar')).toBe('foo bar');
    });

    it('returns an empty string for all-falsy inputs', (): void => {
      expect(classNames(null, undefined, false)).toBe('');
    });
  });

  describe('object inputs', (): void => {
    it('includes keys whose values are true', (): void => {
      expect(classNames({ active: true, disabled: false })).toBe('active');
    });

    it('excludes keys whose values are false', (): void => {
      expect(classNames({ active: false })).toBe('');
    });

    it('excludes keys whose values are null', (): void => {
      expect(classNames({ active: null })).toBe('');
    });

    it('excludes keys whose values are undefined', (): void => {
      expect(classNames({ active: undefined })).toBe('');
    });

    it('includes multiple truthy keys from one object', (): void => {
      const result: string = classNames({ foo: true, bar: true, baz: false });
      expect(result).toBe('foo bar');
    });

    it('combines an object with a string', (): void => {
      expect(classNames('btn', { 'btn--active': true })).toBe('btn btn--active');
    });
  });

  describe('array inputs', (): void => {
    it('flattens a one-level array', (): void => {
      expect(classNames(['foo', 'bar'])).toBe('foo bar');
    });

    it('flattens nested arrays', (): void => {
      expect(classNames([['foo', ['bar']]])).toBe('foo bar');
    });

    it('ignores falsy values inside arrays', (): void => {
      expect(classNames(['foo', null, false, undefined, 'bar'])).toBe('foo bar');
    });

    it('handles mixed string and object elements in an array', (): void => {
      expect(classNames(['base', { active: true, hidden: false }])).toBe('base active');
    });
  });

  describe('mixed inputs', (): void => {
    it('combines strings, objects, and arrays', (): void => {
      const result: string = classNames('base', { active: true }, ['extra', null]);
      expect(result).toBe('base active extra');
    });

    it('handles the common conditional pattern', (): void => {
      // Use Math.random to prevent TypeScript from narrowing the booleans as constants.
      const isActive: boolean = Math.random() > -1;
      const isDisabled: boolean = Math.random() < -1;
      const result: string = classNames('btn', isActive && 'btn--active', {
        'btn--disabled': isDisabled,
      });
      expect(result).toBe('btn btn--active');
    });
  });
});

// ---------------------------------------------------------------------------
// ClassNamesPipe
// ---------------------------------------------------------------------------

describe('ClassNamesPipe', (): void => {
  let pipe: ClassNamesPipe;

  beforeEach((): void => {
    pipe = new ClassNamesPipe();
  });

  it('is defined', (): void => {
    expect(pipe).toBeTruthy();
  });

  it('transforms a string value', (): void => {
    expect(pipe.transform('foo')).toBe('foo');
  });

  it('transforms a conditional object', (): void => {
    expect(pipe.transform({ active: true, disabled: false })).toBe('active');
  });

  it('transforms an array value', (): void => {
    expect(pipe.transform(['foo', 'bar'])).toBe('foo bar');
  });

  it('ignores a falsy primary value', (): void => {
    expect(pipe.transform(null)).toBe('');
  });

  it('combines the primary value with additional arguments', (): void => {
    const result: string = pipe.transform('btn', { 'btn--active': true });
    expect(result).toBe('btn btn--active');
  });

  it('accepts multiple additional arguments', (): void => {
    const result: string = pipe.transform('a', 'b', 'c');
    expect(result).toBe('a b c');
  });

  it('ignores falsy additional arguments', (): void => {
    const extra: ClassNameValue = false as ClassNameValue;
    const result: string = pipe.transform('foo', null, extra, 'bar');
    expect(result).toBe('foo bar');
  });
});
