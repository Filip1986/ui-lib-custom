import type { MaskDefinitions, MaskTestEntry } from './input-mask.types';

/**
 * Pure mask parser and buffer engine used by InputMask.
 *
 * This class contains no DOM or Angular logic; caret coordination is handled by the component.
 */
export class MaskEngine {
  /** Parsed mask entries used by seek/check/shift operations. */
  public readonly tests: MaskTestEntry[];

  /** Mutable current mask buffer. */
  public readonly buffer: string[];

  /** Initial mask buffer value with placeholders and literals. */
  public readonly defaultBuffer: string;

  /** Original mask index where optional section starts (`?` marker position). */
  public readonly partialPosition: number;

  /** First editable position in the parsed mask. */
  public readonly firstNonMaskPos: number | null;

  /** Last required editable position (before optional section). */
  public readonly lastRequiredNonMaskPos: number | null;

  /** Parsed mask length excluding `?` markers. */
  public readonly len: number;

  private readonly slotChar: string;

  /**
   * Creates a new pure mask engine from mask grammar and character rules.
   */
  constructor(mask: string, slotChar: string, characterPattern: string) {
    this.slotChar = slotChar;

    const definitions: MaskDefinitions = {
      '9': '[0-9]',
      a: characterPattern,
      '*': `${characterPattern}|[0-9]`,
    };

    let partialPosition: number = mask.length;
    let parsedLength: number = mask.length;
    let firstNonMaskPosition: number | null = null;
    let lastRequiredPosition: number | null = null;
    const parsedTests: MaskTestEntry[] = [];

    const maskTokens: string[] = mask.split('');

    for (let index: number = 0; index < maskTokens.length; index++) {
      const token: string = maskTokens[index] ?? '';

      if (token === '?') {
        parsedLength -= 1;
        partialPosition = index;
        continue;
      }

      if (definitions[token]) {
        parsedTests.push({
          regex: new RegExp(definitions[token]),
          literal: false,
          char: token,
        });

        if (firstNonMaskPosition === null) {
          firstNonMaskPosition = parsedTests.length - 1;
        }

        if (index < partialPosition) {
          lastRequiredPosition = parsedTests.length - 1;
        }

        continue;
      }

      parsedTests.push({
        regex: null,
        literal: true,
        char: token,
      });
    }

    const initialBuffer: string[] = [];

    for (let index: number = 0; index < maskTokens.length; index++) {
      const token: string = maskTokens[index] ?? '';

      if (token === '?') {
        continue;
      }

      if (definitions[token]) {
        initialBuffer.push(this.getPlaceholder(index));
      } else {
        initialBuffer.push(token);
      }
    }

    this.tests = parsedTests;
    this.buffer = initialBuffer;
    this.defaultBuffer = initialBuffer.join('');
    this.partialPosition = partialPosition;
    this.firstNonMaskPos = firstNonMaskPosition;
    this.lastRequiredNonMaskPos = lastRequiredPosition;
    this.len = parsedLength;
  }

  /** Get placeholder char for position `i`. */
  public getPlaceholder(i: number): string {
    if (this.slotChar.length === 0) {
      return '_';
    }

    if (i < this.slotChar.length) {
      return this.slotChar.charAt(i);
    }

    return this.slotChar.charAt(0);
  }

  /** Find next editable position after `pos`. */
  public seekNext(pos: number): number {
    let nextPosition: number = pos;

    while (++nextPosition < this.len && !this.isEditable(nextPosition)) {
      // Intentionally empty: scanning for the next editable position.
    }

    return nextPosition;
  }

  /** Find previous editable position before `pos`. */
  public seekPrev(pos: number): number {
    let previousPosition: number = pos;

    while (--previousPosition >= 0 && !this.isEditable(previousPosition)) {
      // Intentionally empty: scanning for the previous editable position.
    }

    return previousPosition;
  }

  /** Shift buffer left (after deletion). */
  public shiftL(begin: number, end: number): void {
    if (begin < 0) {
      return;
    }

    let sourceIndex: number = this.seekNext(end);

    for (let targetIndex: number = begin; targetIndex < this.len; targetIndex++) {
      if (!this.isEditable(targetIndex)) {
        continue;
      }

      const targetEntry: MaskTestEntry | undefined = this.tests[targetIndex];
      const sourceCharacter: string = this.buffer[sourceIndex] ?? '';

      if (
        sourceIndex < this.len &&
        this.isEditable(sourceIndex) &&
        targetEntry?.regex?.test(sourceCharacter)
      ) {
        this.buffer[targetIndex] = sourceCharacter;
        this.buffer[sourceIndex] = this.getPlaceholder(sourceIndex);
      } else {
        break;
      }

      sourceIndex = this.seekNext(sourceIndex);
    }
  }

  /** Shift buffer right (before insertion). */
  public shiftR(pos: number): void {
    let carry: string = this.getPlaceholder(pos);

    for (let index: number = pos; index < this.len; index++) {
      if (!this.isEditable(index)) {
        continue;
      }

      const nextIndex: number = this.seekNext(index);
      const currentValue: string = this.buffer[index] ?? '';
      const nextEntry: MaskTestEntry | undefined = this.tests[nextIndex];

      this.buffer[index] = carry;

      if (nextIndex < this.len && nextEntry?.regex?.test(currentValue)) {
        carry = currentValue;
      } else {
        break;
      }
    }
  }

  /** Clear buffer positions `[start, end)` back to placeholders. */
  public clearBuffer(start: number, end: number, keepBuffer: boolean): void {
    if (keepBuffer) {
      return;
    }

    for (let index: number = start; index < end && index < this.len; index++) {
      if (!this.isEditable(index)) {
        continue;
      }

      this.buffer[index] = this.getPlaceholder(index);
    }
  }

  /** Check if all required positions are filled. */
  public isCompleted(): boolean {
    if (this.firstNonMaskPos === null || this.lastRequiredNonMaskPos === null) {
      return true;
    }

    for (let index: number = this.firstNonMaskPos; index <= this.lastRequiredNonMaskPos; index++) {
      if (this.isEditable(index) && this.buffer[index] === this.getPlaceholder(index)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Validate and place `inputValue` into buffer.
   *
   * Returns the last matched position, current buffer string, and whether the input is incomplete
   * before the required boundary (caller can combine this with `autoClear`).
   */
  public checkVal(
    inputValue: string,
    allow: boolean,
    keepBuffer: boolean
  ): { lastMatch: number; bufferValue: string; shouldClear: boolean } {
    let lastMatch: number = -1;
    let position: number = 0;
    let index: number;

    for (index = 0; index < this.len; index++) {
      if (this.isEditable(index)) {
        this.buffer[index] = this.getPlaceholder(index);
        const entry: MaskTestEntry | undefined = this.tests[index];

        while (position++ < inputValue.length) {
          const inputChar: string = inputValue.charAt(position - 1);

          if (entry?.regex?.test(inputChar)) {
            if (!keepBuffer) {
              this.buffer[index] = inputChar;
            }
            lastMatch = index;
            break;
          }
        }

        if (position > inputValue.length) {
          this.clearBuffer(index + 1, this.len, keepBuffer);
          break;
        }
      } else {
        if (this.buffer[index] === inputValue.charAt(position)) {
          position += 1;
        }

        if (index < this.partialPosition) {
          lastMatch = index;
        }
      }
    }

    const shouldClear: boolean = !allow && lastMatch + 1 < this.partialPosition;

    if (shouldClear && keepBuffer) {
      // Keep current visible text when keepBuffer is enabled.
      return {
        lastMatch,
        bufferValue: this.getBufferValue(),
        shouldClear,
      };
    }

    if (!allow && !shouldClear) {
      return {
        lastMatch,
        bufferValue: this.getBufferValue().substring(0, lastMatch + 1),
        shouldClear,
      };
    }

    return {
      lastMatch,
      bufferValue: this.getBufferValue(),
      shouldClear,
    };
  }

  /** Extract unmasked value (only user-entered editable characters). */
  public getUnmaskedValue(): string {
    const unmaskedBuffer: string[] = [];

    for (let index: number = 0; index < this.buffer.length; index++) {
      if (!this.isEditable(index)) {
        continue;
      }

      const character: string = this.buffer[index] ?? '';
      if (character !== this.getPlaceholder(index)) {
        unmaskedBuffer.push(character);
      }
    }

    return unmaskedBuffer.join('');
  }

  /** Get current buffer as string. */
  public getBufferValue(): string {
    return this.buffer.join('');
  }

  /** Set a character at a buffer position (for keypress handling). */
  public setChar(pos: number, char: string): boolean {
    if (pos < 0 || pos >= this.len || !this.isEditable(pos)) {
      return false;
    }

    const entry: MaskTestEntry | undefined = this.tests[pos];

    if (!entry?.regex?.test(char)) {
      return false;
    }

    this.buffer[pos] = char;
    return true;
  }

  /** Reset buffer to default state. */
  public reset(): void {
    const defaultChars: string[] = this.defaultBuffer.split('');
    this.buffer.splice(0, this.buffer.length, ...defaultChars);
  }

  private isEditable(index: number): boolean {
    return Boolean(this.tests[index]?.regex);
  }
}
