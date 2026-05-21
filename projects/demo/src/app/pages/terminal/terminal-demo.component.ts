import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import type { WritableSignal, Signal } from '@angular/core';
import { Terminal, TerminalService } from 'ui-lib-custom/terminal';
import type { TerminalCommand, TerminalVariant } from 'ui-lib-custom/terminal';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';

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
  imports: [
    Terminal,
    DocPageHeaderComponent,
    DocPageLayoutComponent,
    DocTocComponent,
    DocQualityBadgeComponent,
    DocApiReferenceComponent,
    DocAriaTableComponent,
    DocKeyboardNavComponent,
  ],
  templateUrl: './terminal-demo.component.html',
  styleUrl: './terminal-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminalDemoComponent {
  public readonly qualityAudit: ComponentQualityAudit = {
    date: '2026-05-18',
    tier: 1,
    scores: {
      api: 9,
      a11y: 9,
      perf: 9,
      comp: 8,
      theme: 9,
      dx: 9,
      docs: 9,
      polish: 9,
      angular: 9,
      feel: 9,
    },
    competitiveParity: 'pending',
  };

  private readonly terminalService: TerminalService = inject(TerminalService);

  public readonly importCode: string =
    "import { Terminal, TerminalService } from 'ui-lib-custom/terminal'";

  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'variants', label: 'Variants' },
    { id: 'interactive', label: 'Interactive' },
    { id: 'api', label: 'API Reference' },
    { id: 'accessibility', label: 'Accessibility' },
  ];

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  public readonly apiRows: ApiPropRow[] = [
    {
      name: 'welcomeMessage',
      type: 'string',
      default: "''",
      description: 'Message shown when the terminal initialises.',
    },
    {
      name: 'prompt',
      type: 'string',
      default: "'$'",
      description: 'Prompt string displayed before each input line.',
    },
    {
      name: 'variant',
      type: "'material' | 'bootstrap' | 'minimal' | null",
      default: 'null',
      description: 'Design variant.',
    },
  ];

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

  public readonly ariaRows: readonly AriaRow[] = [
    {
      element: 'Terminal host',
      attribute: 'role="log"',
      value: '—',
      notes:
        '<code>role="log"</code> tells screen readers the content is an ongoing log of output. New responses are announced via the implicit live region.',
    },
    {
      element: 'Terminal host',
      attribute: 'aria-live="polite"',
      value: '—',
      notes: 'Screen readers announce new command output without interrupting current speech.',
    },
    {
      element: 'Command input',
      attribute: 'aria-label="Command input"',
      value: '—',
      notes: 'The prompt input field carries a descriptive label for screen reader users.',
    },
    {
      element: 'Command history entries',
      attribute: 'aria-hidden="true"',
      value: '—',
      notes:
        'Past command entries are hidden from the accessibility tree — screen readers use the live region for output.',
    },
  ];

  public readonly keyboardRows: KeyboardNavRow[] = [
    { key: 'Enter', action: 'Submits the current command.' },
    { key: 'Arrow Up', action: 'Navigates to the previous command in history.' },
    {
      key: 'Arrow Down',
      action:
        'Navigates to the next command in history (or clears the input at the end of history).',
    },
    { key: 'Tab', action: 'Moves focus to the command input when the terminal receives focus.' },
    { key: 'Ctrl + C', action: 'Clears the current input line (browser-native behaviour).' },
  ];
}
