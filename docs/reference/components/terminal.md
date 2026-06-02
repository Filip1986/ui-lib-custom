# Terminal

**Selector:** `ui-lib-terminal`
**Entry point:** `import { Terminal } from 'ui-lib-custom/terminal'`

---

## Overview

Terminal — an interactive command-line interface component. Renders a command history, a prompt, and a text input. Command processing is delegated to TerminalService: the consumer injects the service, watches the `command` signal via `effect()`, and calls `sendResponse()`.

## API

### Inputs

| Name             | Type             | Default | Description                                                         |
| ---------------- | ---------------- | ------- | ------------------------------------------------------------------- | -------------------------------------------------------------- |
| `prompt`         | `string`         | `'$'`   | The prompt prefix string displayed before each command line.        |
| `variant`        | `TerminalVariant | null`   | `null`                                                              | Design variant. Inherits from ThemeConfigService when not set. |
| `welcomeMessage` | `string`         | `''`    | Optional welcome / banner message shown at the top of the terminal. |

### Outputs

_none_

## Content Projection

_none_

## Theming

| CSS Variable                         | Default                                       |
| ------------------------------------ | --------------------------------------------- |
| `--uilib-terminal-bg`                | `#1e1e1e`                                     |
| `--uilib-terminal-border`            | `1px solid var(--uilib-surface-300, #d1d5db)` |
| `--uilib-terminal-border-radius`     | `var(--uilib-radius-md, 0.5rem)`              |
| `--uilib-terminal-color`             | `#f0f0f0`                                     |
| `--uilib-terminal-font-family`       | `'Courier New', Courier, monospace`           |
| `--uilib-terminal-font-size`         | `0.875rem`                                    |
| `--uilib-terminal-input-caret-color` | `#4caf50`                                     |
| `--uilib-terminal-line-height`       | `1.5`                                         |
| `--uilib-terminal-max-height`        | `30rem`                                       |
| `--uilib-terminal-min-height`        | `18rem`                                       |
| `--uilib-terminal-padding`           | `1rem`                                        |
| `--uilib-terminal-prompt-color`      | `#4caf50`                                     |
| `--uilib-terminal-response-color`    | `#e0e0e0`                                     |
| `--uilib-terminal-response-indent`   | `1.5rem`                                      |
| `--uilib-terminal-scrollbar-bg`      | `#333333`                                     |
| `--uilib-terminal-scrollbar-thumb`   | `#555555`                                     |
| `--uilib-terminal-welcome-color`     | `#aaaaaa`                                     |

## Accessibility

**APG pattern:** No dedicated APG pattern

### Keyboard Interactions

| Test description                                      |
| ----------------------------------------------------- |
| ArrowDown after ArrowUp clears the input              |
| ArrowUp restores the previous command from history    |
| all prompt spans should have aria-hidden=             |
| command input should have a descriptive aria-label    |
| host should have aria-label=                          |
| host should have role=                                |
| output area should have aria-label=                   |
| output area should have role=                         |
| pressing Enter on empty input does not add to history |
| pressing Enter submits the current command to history |
| should add command to history when Enter is pressed   |
| should apply role=                                    |
| should apply variant class                            |
| should not submit empty or whitespace-only commands   |
| should pass axe check with a welcome message          |
| should pass axe check with bootstrap variant          |
| should pass axe check with command/response history   |
| should pass axe check with minimal variant            |
| should pass axe check with no welcome message         |

## Usage Examples

```typescript
@Component({
  template: `
    <ui-lib-terminal
      welcomeMessage="Welcome to the ui-lib terminal."
      prompt="$"
      (commandExecute)="onCommand($event)"
    />
  `,
})
export class MyComponent {
  onCommand(event: { command: string; callback: (response: string) => void }): void {
    const responses: Record<string, string> = {
      help: 'Available commands: help, version, clear',
      version: '1.0.0',
    };
    event.callback(responses[event.command] ?? `Unknown command: ${event.command}`);
  }
}
```

## Related

- [Competitive benchmark](../COMPETITIVE_BENCHMARKS.md#terminal)
- [Demo page](/components/terminal)
- [Design tokens](../systems/DESIGN_TOKENS.md)
- [Co-located README](../../../projects/ui-lib-custom/src/lib/terminal/README.md)
