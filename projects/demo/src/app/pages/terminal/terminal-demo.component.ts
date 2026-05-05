import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { Terminal, TerminalService } from 'ui-lib-custom/terminal';
import type { TerminalCommand, TerminalVariant } from 'ui-lib-custom/terminal';

const HELP_TEXT: string = [
  'Available commands:',
  '  help       — show this help message',
  '  date       — print current date and time',
  '  whoami     — print current user',
  '  echo <msg> — print a message',
  '  clear      — clear the terminal',
  '  variant <name> — switch variant (material | bootstrap | minimal)',
].join('\n');

/**
 * Demo page for the Terminal component.
 */
@Component({
  selector: 'app-terminal-demo',
  standalone: true,
  imports: [Terminal],
  templateUrl: './terminal-demo.component.html',
  styleUrl: './terminal-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminalDemoComponent {
  private readonly terminalService: TerminalService = inject(TerminalService);

  public readonly activeVariant: WritableSignal<TerminalVariant> =
    signal<TerminalVariant>('material');

  constructor() {
    effect((): void => {
      const command: TerminalCommand | null = this.terminalService.command();
      if (command === null) {
        return;
      }

      const text: string = command.text.trim();
      const lower: string = text.toLowerCase();

      if (lower === 'help') {
        this.terminalService.sendResponse(HELP_TEXT);
        return;
      }

      if (lower === 'date') {
        this.terminalService.sendResponse(new Date().toLocaleString());
        return;
      }

      if (lower === 'whoami') {
        this.terminalService.sendResponse('demo-user');
        return;
      }

      if (lower === 'clear') {
        this.terminalService.clear();
        return;
      }

      if (lower.startsWith('echo ')) {
        this.terminalService.sendResponse(text.slice(5));
        return;
      }

      if (lower.startsWith('variant ')) {
        const requested: string = lower.slice(8).trim();
        const valid: TerminalVariant[] = ['material', 'bootstrap', 'minimal'];
        if ((valid as string[]).includes(requested)) {
          this.activeVariant.set(requested as TerminalVariant);
          this.terminalService.sendResponse(`Variant switched to: ${requested}`);
        } else {
          this.terminalService.sendResponse(
            `Unknown variant "${requested}". Use: material | bootstrap | minimal`
          );
        }
        return;
      }

      this.terminalService.sendResponse(`Command not found: ${text}. Type "help" for usage.`);
    });
  }
}
