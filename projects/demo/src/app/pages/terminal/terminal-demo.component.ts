import type { Signal, WritableSignal } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';

import type { TerminalCommand, TerminalVariant } from 'ui-lib-custom/terminal';
import { Terminal, TerminalService } from 'ui-lib-custom/terminal';

import type { ApiPropRow } from '@demo/shared/doc-page/doc-api-reference.component';
import { DocApiReferenceComponent } from '@demo/shared/doc-page/doc-api-reference.component';
import type { AriaRow } from '@demo/shared/doc-page/doc-aria-table.component';
import { DocAriaTableComponent } from '@demo/shared/doc-page/doc-aria-table.component';
import type { CssVarRow } from '@demo/shared/doc-page/doc-css-vars-table.component';
import { DocCssVarsTableComponent } from '@demo/shared/doc-page/doc-css-vars-table.component';
import type { KeyboardNavRow } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocKeyboardNavComponent } from '@demo/shared/doc-page/doc-keyboard-nav.component';
import { DocPageHeaderComponent } from '@demo/shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '@demo/shared/doc-page/doc-page-layout.component';
import type { ComponentQualityAudit } from '@demo/shared/doc-page/doc-quality-badge.component';
import { DocQualityBadgeComponent } from '@demo/shared/doc-page/doc-quality-badge.component';
import type { DocSection } from '@demo/shared/doc-page/doc-section.model';
import { DocTocComponent } from '@demo/shared/doc-page/doc-toc.component';

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
    DocCssVarsTableComponent,
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
    { id: 'css-vars', label: 'CSS Custom Properties' },
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
            `Unknown variant "${requested}". Use: material | bootstrap | minimal`,
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

  public readonly cssVarRows: readonly CssVarRow[] = [
    {
      variable: '--uilib-terminal-bg',
      default: '#1e1e1e',
      description: 'Background colour of the terminal.',
    },
    {
      variable: '--uilib-terminal-color',
      default: '#f0f0f0',
      description: 'Default text colour inside the terminal.',
    },
    {
      variable: '--uilib-terminal-prompt-color',
      default: '#4caf50',
      description: 'Colour of the prompt symbol and prefix.',
    },
    {
      variable: '--uilib-terminal-response-color',
      default: '#e0e0e0',
      description: 'Colour of command response output text.',
    },
    {
      variable: '--uilib-terminal-welcome-color',
      default: '#aaaaaa',
      description: 'Colour of the welcome message.',
    },
    {
      variable: '--uilib-terminal-border',
      default: '1px solid var(--uilib-surface-300)',
      description: 'Border shorthand applied to the terminal host.',
    },
    {
      variable: '--uilib-terminal-border-radius',
      default: 'var(--uilib-radius-md)',
      description: 'Corner radius of the terminal.',
    },
    {
      variable: '--uilib-terminal-padding',
      default: '1rem',
      description: 'Inner padding of the terminal content area.',
    },
    {
      variable: '--uilib-terminal-font-family',
      default: "'Courier New', Courier, monospace",
      description: 'Font family used throughout the terminal.',
    },
    {
      variable: '--uilib-terminal-font-size',
      default: '0.875rem',
      description: 'Base font size of the terminal text.',
    },
    {
      variable: '--uilib-terminal-line-height',
      default: '1.5',
      description: 'Line height of terminal text.',
    },
    {
      variable: '--uilib-terminal-min-height',
      default: '18rem',
      description: 'Minimum height of the terminal content area.',
    },
    {
      variable: '--uilib-terminal-max-height',
      default: '30rem',
      description: 'Maximum height before the content area starts scrolling.',
    },
    {
      variable: '--uilib-terminal-input-caret-color',
      default: '#4caf50',
      description: 'Colour of the text cursor in the command input.',
    },
    {
      variable: '--uilib-terminal-scrollbar-bg',
      default: '#333333',
      description: 'Track background colour of the terminal scrollbar.',
    },
    {
      variable: '--uilib-terminal-scrollbar-thumb',
      default: '#555555',
      description: 'Thumb colour of the terminal scrollbar.',
    },
    {
      variable: '--uilib-terminal-response-indent',
      default: '1.5rem',
      description: 'Left indentation of response output lines.',
    },
  ];
}
