# Terminal

An interactive command-line interface component. Renders a scrollable command history, a configurable prompt, and a text input. Command processing is fully delegated to `TerminalService`, giving consumers complete control over command handling.

---

## Package path

```ts
import { Terminal, TerminalService } from 'ui-lib-custom/terminal';
import type { TerminalHistoryItem, TerminalVariant, TerminalCommand } from 'ui-lib-custom/terminal';
```

---

## Selector

```html
<ui-lib-terminal />
```

---

## Inputs

| Input            | Type                               | Default      | Description                                                     |
| ---------------- | ---------------------------------- | ------------ | --------------------------------------------------------------- |
| `welcomeMessage` | `string`                           | `''`         | Optional banner text shown at the top (supports `\n` newlines). |
| `prompt`         | `string`                           | `'$'`        | The prompt prefix rendered before each command line.            |
| `variant`        | `TerminalVariant \| null`          | `null`       | Design variant. Falls back to `ThemeConfigService` when `null`. |

---

## Outputs

None. Interactions are handled through `TerminalService`.

---

## Service API — `TerminalService`

The terminal uses a service-driven architecture. Place `<ui-lib-terminal />` in your template, then inject `TerminalService` in your component to handle commands.

### Properties

| Property  | Type                              | Description                                                    |
| --------- | --------------------------------- | -------------------------------------------------------------- |
| `history` | `Signal<TerminalHistoryItem[]>`   | Read-only signal of all command/response pairs.                |
| `command` | `Signal<TerminalCommand \| null>` | Emits whenever the user submits a command. Watch with `effect()`. |

### Methods

| Method                          | Description                                                                            |
| ------------------------------- | -------------------------------------------------------------------------------------- |
| `sendResponse(response: string)` | Adds a response to the most recent pending command.                                   |
| `clear()`                       | Clears all history and resets the pending command.                                     |

> **Note:** `submitCommand()` is called internally by the Terminal component and should not be called by consumers directly.

---

## Types

```ts
export type TerminalVariant = 'material' | 'bootstrap' | 'minimal';

export interface TerminalHistoryItem {
  readonly command: string;
  readonly response: string | null;
}

export interface TerminalCommand {
  readonly id: number;   // unique id, incremented on every submission
  readonly text: string; // the raw command text entered by the user
}
```

---

## Variants

| Variant     | Description                                              |
| ----------- | -------------------------------------------------------- |
| `material`  | Dark terminal with green prompt, elevated shadow.        |
| `bootstrap` | Dark Bootstrap-style terminal with teal prompt.          |
| `minimal`   | GitHub-dark style with blue prompt and subtle border.    |

---

## Keyboard navigation

| Key      | Behaviour                                       |
| -------- | ----------------------------------------------- |
| `Enter`  | Submit the current command.                     |
| `↑`      | Navigate to the previous command in history.    |
| `↓`      | Navigate to the next command (or clear input).  |

---

## Minimal usage example

```ts
// app.component.ts
import { Component, effect, inject } from '@angular/core';
import { Terminal, TerminalService } from 'ui-lib-custom/terminal';
import type { TerminalCommand } from 'ui-lib-custom/terminal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Terminal],
  template: `
    <ui-lib-terminal
      welcomeMessage="Type 'help' to get started."
      prompt="$"
    />
  `,
})
export class AppComponent {
  private readonly terminalService = inject(TerminalService);

  constructor() {
    effect((): void => {
      const command: TerminalCommand | null = this.terminalService.command();
      if (command === null) return;

      switch (command.text.toLowerCase()) {
        case 'help':
          this.terminalService.sendResponse('Commands: help, date, clear');
          break;
        case 'date':
          this.terminalService.sendResponse(new Date().toLocaleString());
          break;
        case 'clear':
          this.terminalService.clear();
          break;
        default:
          this.terminalService.sendResponse(`Unknown command: ${command.text}`);
      }
    });
  }
}
```

---

## CSS variables

All tokens follow the pattern `--uilib-terminal-{property}[-{variant}]`:

| Variable                            | Default              | Description                        |
| ----------------------------------- | -------------------- | ---------------------------------- |
| `--uilib-terminal-bg`               | `#1e1e1e`            | Terminal background colour.        |
| `--uilib-terminal-color`            | `#f0f0f0`            | Default text colour.               |
| `--uilib-terminal-prompt-color`     | `#4caf50`            | Prompt text colour.                |
| `--uilib-terminal-response-color`   | `#e0e0e0`            | Response text colour.              |
| `--uilib-terminal-welcome-color`    | `#aaaaaa`            | Welcome message colour.            |
| `--uilib-terminal-border`           | `1px solid …`        | Terminal border.                   |
| `--uilib-terminal-border-radius`    | `var(--uilib-radius-md)` | Corner radius.                 |
| `--uilib-terminal-padding`          | `1rem`               | Inner padding.                     |
| `--uilib-terminal-font-family`      | `'Courier New', …`   | Monospace font stack.              |
| `--uilib-terminal-font-size`        | `0.875rem`           | Font size.                         |
| `--uilib-terminal-min-height`       | `18rem`              | Minimum scrollable area height.    |
| `--uilib-terminal-max-height`       | `30rem`              | Maximum scrollable area height.    |
| `--uilib-terminal-input-caret-color`| `#4caf50`            | Text-cursor colour in the input.   |

---

## Accessibility

### ARIA attributes

| Element                            | Attribute                      | Value / Notes                                           |
| ---------------------------------- | ------------------------------ | ------------------------------------------------------- |
| `ui-lib-terminal` host             | `role`                         | `region`                                                |
| `ui-lib-terminal` host             | `aria-label`                   | `"Terminal"`                                            |
| `ui-lib-terminal` host             | `id`                           | `ui-lib-terminal-{n}` (unique per instance)             |
| `.ui-lib-terminal__output` div     | `role`                         | `log` (implies `aria-live="polite"`, `aria-relevant="additions text"`) |
| `.ui-lib-terminal__output` div     | `aria-label`                   | `"Terminal output"`                                     |
| `.ui-lib-terminal__output` div     | `id`                           | `ui-lib-terminal-{n}-output`                            |
| `.ui-lib-terminal__output` div     | `aria-atomic`                  | `false` — individual entries are announced incrementally |
| `.ui-lib-terminal__input` input    | `aria-label`                   | `"Terminal command input"`                              |
| `.ui-lib-terminal__input` input    | `aria-autocomplete`            | `none`                                                  |
| `.ui-lib-terminal__prompt` spans   | `aria-hidden`                  | `true` — decorative, not read aloud                     |

### Notes

- The output area uses `role="log"` which is a live region that announces new content as it is added. Screen readers will read out new commands and responses automatically without moving focus.
- The command input is always focusable and labelled; clicking anywhere on the terminal surface focuses it.
- Prompt symbols (`$`, `>`, `~`) are wrapped in `aria-hidden="true"` spans so they are not read by screen readers.
- Focus is never trapped inside the terminal — keyboard users can Tab out at any time.
- Keyboard focus on the input shows a visible outline (`outline: 2px solid`) drawn using the current prompt-caret colour, so it adapts to all three design variants.
- Animations and transitions honour `prefers-reduced-motion: reduce` — all durations are collapsed to `0.01ms` when the OS preference is set.
- See **Keyboard navigation** above for key bindings.

