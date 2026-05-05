/**
 * Types for the Terminal component.
 */

/** Visual design variant for the Terminal component. */
export type TerminalVariant = 'material' | 'bootstrap' | 'minimal';

/** A single entry in the terminal command history. */
export interface TerminalHistoryItem {
  readonly command: string;
  readonly response: string | null;
}

/**
 * A command submitted from the terminal input.
 * The `id` field ensures repeated identical commands still trigger reactivity.
 */
export interface TerminalCommand {
  readonly id: number;
  readonly text: string;
}
