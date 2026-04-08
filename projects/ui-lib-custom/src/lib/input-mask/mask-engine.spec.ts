import { MaskEngine } from './mask-engine';
import type { MaskTestEntry } from './input-mask.types';

describe('MaskEngine', (): void => {
  it('parses phone mask tokens and literals correctly', (): void => {
    const engine: MaskEngine = new MaskEngine('(999) 999-9999', '_', '[A-Za-z]');
    const editableOne: MaskTestEntry = engine.tests[1] as MaskTestEntry;

    expect(engine.tests).toHaveLength(14);
    expect(engine.tests[0]).toEqual({ regex: null, literal: true, char: '(' });
    expect(editableOne.literal).toBeFalsy();
    expect(editableOne.regex?.test('5')).toBeTruthy();
    expect(engine.tests[4]).toEqual({ regex: null, literal: true, char: ')' });
    expect(engine.tests[5]).toEqual({ regex: null, literal: true, char: ' ' });
    expect(engine.tests[9]).toEqual({ regex: null, literal: true, char: '-' });
  });

  it('marks positions after ? as optional', (): void => {
    const mask: string = '(999) 999-9999? x99999';
    const engine: MaskEngine = new MaskEngine(mask, '_', '[A-Za-z]');

    expect(engine.partialPosition).toBe(mask.indexOf('?'));
    expect(engine.lastRequiredNonMaskPos).toBe(13);

    engine.checkVal('1234567890', true, false);
    expect(engine.isCompleted()).toBeTruthy();
  });

  it('initializes buffer with default and custom slot chars', (): void => {
    const defaultEngine: MaskEngine = new MaskEngine('99-99', '_', '[A-Za-z]');
    const customEngine: MaskEngine = new MaskEngine('99-99', '#', '[A-Za-z]');

    expect(defaultEngine.getBufferValue()).toBe('__-__');
    expect(customEngine.getBufferValue()).toBe('##-##');
  });

  it('seekNext and seekPrev skip literal positions', (): void => {
    const engine: MaskEngine = new MaskEngine('99-99', '_', '[A-Za-z]');

    expect(engine.seekNext(1)).toBe(3);
    expect(engine.seekPrev(3)).toBe(1);
  });

  it('shiftL and shiftR move characters around literals', (): void => {
    const engine: MaskEngine = new MaskEngine('99-99', '_', '[A-Za-z]');

    engine.setChar(0, '1');
    engine.setChar(1, '2');
    engine.setChar(3, '3');
    engine.setChar(4, '4');

    expect(engine.getBufferValue()).toBe('12-34');

    engine.shiftL(1, 2);
    expect(engine.getBufferValue()).toBe('13-4_');

    engine.reset();
    engine.setChar(0, '1');
    engine.setChar(1, '2');
    engine.setChar(3, '3');
    engine.setChar(4, '4');

    engine.shiftR(1);
    expect(engine.getBufferValue()).toBe('1_-23');
  });

  it('checkVal handles valid, partial, and invalid values', (): void => {
    const engine: MaskEngine = new MaskEngine('(999) 999-9999', '_', '[A-Za-z]');

    const valid: { lastMatch: number; bufferValue: string; shouldClear: boolean } = engine.checkVal(
      '1234567890',
      true,
      false
    );
    expect(valid.shouldClear).toBeFalsy();
    expect(valid.bufferValue).toBe('(123) 456-7890');

    engine.reset();
    const partial: { lastMatch: number; bufferValue: string; shouldClear: boolean } =
      engine.checkVal('12345', false, false);
    expect(partial.shouldClear).toBeTruthy();

    engine.reset();
    const invalid: { lastMatch: number; bufferValue: string; shouldClear: boolean } =
      engine.checkVal('abc', false, false);
    expect(invalid.shouldClear).toBeTruthy();
    expect(engine.getUnmaskedValue()).toBe('');
  });

  it('isCompleted is true only when all required positions are filled', (): void => {
    const engine: MaskEngine = new MaskEngine('999-99', '_', '[A-Za-z]');

    engine.checkVal('1234', true, false);
    expect(engine.isCompleted()).toBeFalsy();

    engine.checkVal('12345', true, false);
    expect(engine.isCompleted()).toBeTruthy();
  });

  it('getUnmaskedValue strips literals and placeholders', (): void => {
    const engine: MaskEngine = new MaskEngine('(99) 99', '_', '[A-Za-z]');

    engine.checkVal('12', true, false);
    expect(engine.getBufferValue()).toBe('(12) __');
    expect(engine.getUnmaskedValue()).toBe('12');
  });

  it('clearBuffer respects keepBuffer true vs false', (): void => {
    const engine: MaskEngine = new MaskEngine('99-99', '_', '[A-Za-z]');

    engine.checkVal('1234', true, false);
    const beforeKeep: string = engine.getBufferValue();

    engine.clearBuffer(0, engine.len, true);
    expect(engine.getBufferValue()).toBe(beforeKeep);

    engine.clearBuffer(0, engine.len, false);
    expect(engine.getBufferValue()).toBe('__-__');
  });

  it('supports custom characterPattern such as Cyrillic', (): void => {
    const engine: MaskEngine = new MaskEngine('aa', '_', '[А-Яа-я]');

    expect(engine.setChar(0, 'Ж')).toBeTruthy();
    expect(engine.setChar(1, 'я')).toBeTruthy();
    expect(engine.setChar(1, 'A')).toBeFalsy();
    expect(engine.getUnmaskedValue()).toBe('Жя');
  });

  it('handles edge cases: empty mask, literals-only mask, and only ?', (): void => {
    const emptyMaskEngine: MaskEngine = new MaskEngine('', '_', '[A-Za-z]');
    expect(emptyMaskEngine.len).toBe(0);
    expect(emptyMaskEngine.tests).toHaveLength(0);
    expect(emptyMaskEngine.getBufferValue()).toBe('');
    expect(emptyMaskEngine.isCompleted()).toBeTruthy();

    const literalsOnlyEngine: MaskEngine = new MaskEngine('() -', '_', '[A-Za-z]');
    expect(
      literalsOnlyEngine.tests.every((entry: MaskTestEntry): boolean => entry.literal)
    ).toBeTruthy();
    expect(literalsOnlyEngine.getUnmaskedValue()).toBe('');
    expect(literalsOnlyEngine.isCompleted()).toBeTruthy();

    const optionalOnlyEngine: MaskEngine = new MaskEngine('?', '_', '[A-Za-z]');
    expect(optionalOnlyEngine.len).toBe(0);
    expect(optionalOnlyEngine.partialPosition).toBe(0);
    expect(optionalOnlyEngine.getBufferValue()).toBe('');
  });
});
