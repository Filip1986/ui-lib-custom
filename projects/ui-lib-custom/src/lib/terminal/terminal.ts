import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
  type AfterViewChecked,
  type ElementRef,
  type InputSignal,
  type Signal,
  type WritableSignal,
} from '@angular/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { TerminalService } from './terminal.service';
import type { TerminalHistoryItem, TerminalVariant } from './terminal.types';

export type { TerminalHistoryItem, TerminalVariant } from './terminal.types';
export { TerminalService } from './terminal.service';

/**
 * Terminal — an interactive command-line interface component.
 *
 * Renders a command history, a prompt, and a text input.
 * Command processing is delegated to TerminalService: the consumer injects the service,
 * watches the `command` signal via `effect()`, and calls `sendResponse()`.
 *
 * @example
 * // app.component.html
 * <ui-lib-terminal welcomeMessage="Type 'help' to see available commands." prompt="$" />
 *
 * // app.component.ts
 * private readonly terminalService = inject(TerminalService);
 *
 * constructor() {
 *   effect(() => {
 *     const cmd = this.terminalService.command();
 *     if (cmd !== null) {
 *       this.terminalService.sendResponse(this.process(cmd.text));
 *     }
 *   });
 * }
 */
@Component({
  selector: 'ui-lib-terminal',
  standalone: true,
  templateUrl: './terminal.html',
  styleUrl: './terminal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
    role: 'region',
    'aria-label': 'Terminal',
  },
})
export class Terminal implements AfterViewChecked {
  private readonly terminalService: TerminalService = inject(TerminalService);
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  @ViewChild('commandInput') private readonly commandInput?: ElementRef<HTMLInputElement>;
  @ViewChild('terminalContent') private readonly terminalContent?: ElementRef<HTMLDivElement>;

  /** Optional welcome / banner message shown at the top of the terminal. */
  public readonly welcomeMessage: InputSignal<string> = input<string>('');

  /** The prompt prefix string displayed before each command line. */
  public readonly prompt: InputSignal<string> = input<string>('$');

  /** Design variant. Inherits from ThemeConfigService when not set. */
  public readonly variant: InputSignal<TerminalVariant | null> = input<TerminalVariant | null>(
    null
  );

  /** Current text value in the command input field. */
  public readonly currentCommand: WritableSignal<string> = signal<string>('');

  /** Terminal history driven by TerminalService. */
  public readonly history: Signal<TerminalHistoryItem[]> = this.terminalService.history;

  /** Previously typed commands for arrow-key history navigation. */
  private readonly commandHistory: WritableSignal<string[]> = signal<string[]>([]);
  private readonly historyNavigationIndex: WritableSignal<number> = signal<number>(-1);

  private pendingScroll: boolean = false;

  /** Resolved variant — input wins, then falls back to global ThemeConfigService. */
  public readonly effectiveVariant: Signal<TerminalVariant> = computed<TerminalVariant>(
    (): TerminalVariant => this.variant() ?? this.themeConfig.variant()
  );

  /** CSS classes applied to the host element. */
  public readonly hostClasses: Signal<string> = computed<string>((): string =>
    ['ui-lib-terminal', `ui-lib-terminal--${this.effectiveVariant()}`].join(' ')
  );

  public ngAfterViewChecked(): void {
    if (this.pendingScroll) {
      this.scrollToBottom();
      this.pendingScroll = false;
    }
  }

  /** Focuses the hidden input — called when the user clicks anywhere on the terminal. */
  public focusInput(): void {
    this.commandInput?.nativeElement.focus();
  }

  /** Syncs the input value signal when the native input changes. */
  public onInputChange(event: Event): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    this.currentCommand.set(target.value);
  }

  /** Handles keyboard navigation and command submission. */
  public handleKeydown(event: KeyboardEvent): void {
    const key: string = event.key;

    if (key === 'Enter') {
      event.preventDefault();
      const trimmed: string = this.currentCommand().trim();
      if (trimmed) {
        this.commandHistory.update((prev: string[]): string[] => [trimmed, ...prev]);
        this.historyNavigationIndex.set(-1);
        this.terminalService.submitCommand(trimmed);
        this.currentCommand.set('');
        this.pendingScroll = true;
      }
      return;
    }

    if (key === 'ArrowUp') {
      event.preventDefault();
      const history: string[] = this.commandHistory();
      const nextIndex: number = Math.min(this.historyNavigationIndex() + 1, history.length - 1);
      this.historyNavigationIndex.set(nextIndex);
      const entry: string | undefined = history[nextIndex];
      if (entry !== undefined) {
        this.currentCommand.set(entry);
      }
      return;
    }

    if (key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex: number = Math.max(this.historyNavigationIndex() - 1, -1);
      this.historyNavigationIndex.set(nextIndex);
      if (nextIndex === -1) {
        this.currentCommand.set('');
      } else {
        const entry: string | undefined = this.commandHistory()[nextIndex];
        if (entry !== undefined) {
          this.currentCommand.set(entry);
        }
      }
      return;
    }
  }

  private scrollToBottom(): void {
    const content: HTMLDivElement | undefined = this.terminalContent?.nativeElement;
    if (content !== undefined) {
      content.scrollTop = content.scrollHeight;
    }
  }
}
