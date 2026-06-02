import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { InputSignal, Signal } from '@angular/core';

export interface KeyboardNavRow {
  readonly key: string; // 'Enter / Space', '↓ / ↑', 'Ctrl+S'
  readonly suffix?: string; // 'on header', 'on sub-item'
  readonly target?: string; // 'Dismiss button', 'Toggle button'
  readonly action: string; // May contain inline HTML (<code> etc.)
}

interface ParsedCombo {
  readonly parts: readonly string[];
}

interface ParsedRow {
  readonly alternatives: readonly ParsedCombo[];
  readonly suffix: string | undefined;
  readonly target: string | undefined;
  readonly action: string;
}

/**
 * Shared keyboard navigation table for demo pages.
 * Renders key-cap badges from a structured KeyboardNavRow array.
 */
@Component({
  selector: 'app-doc-keyboard-nav',
  standalone: true,
  imports: [],
  templateUrl: './doc-keyboard-nav.component.html',
  styleUrl: './doc-keyboard-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocKeyboardNavComponent {
  public readonly rows: InputSignal<KeyboardNavRow[]> = input.required<KeyboardNavRow[]>();

  public readonly hasTarget: Signal<boolean> = computed<boolean>((): boolean =>
    this.rows().some((row: KeyboardNavRow): boolean => row.target !== undefined),
  );

  public readonly parsedRows: Signal<readonly ParsedRow[]> = computed<readonly ParsedRow[]>(
    (): readonly ParsedRow[] =>
      this.rows().map(
        (row: KeyboardNavRow): ParsedRow => ({
          alternatives: this.parseKey(row.key),
          suffix: row.suffix,
          target: row.target,
          action: row.action,
        }),
      ),
  );

  private parseKey(key: string): readonly ParsedCombo[] {
    return key.split(' / ').map(
      (alternative: string): ParsedCombo => ({
        parts: alternative.split('+').map((part: string): string => part.trim()),
      }),
    );
  }
}
