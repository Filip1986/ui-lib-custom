import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import type { InputSignal, Signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Shared demo component for rendering code previews.
 */
@Component({
  selector: 'app-code-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="code-preview" [class.code-preview--expanded]="showCode()">
      <div class="code-preview__demo">
        <ng-content></ng-content>
      </div>

      <div class="code-preview__toolbar">
        <button
          type="button"
          class="code-toggle"
          (click)="toggleCode()"
          [attr.aria-expanded]="showCode()"
        >
          {{ showCode() ? 'Hide Code' : 'Show Code' }}
          <span class="icon">{{ showCode() ? '▲' : '▼' }}</span>
        </button>

        @if (showCode()) {
          <button type="button" class="copy-btn" (click)="copyCode()">
            {{ copied() ? '✓ Copied' : 'Copy' }}
          </button>
        }
      </div>

      @if (showCode()) {
        <div class="code-preview__code">
          <pre><code [attr.data-language]="language()" [innerHTML]="highlightedCode()"></code></pre>
        </div>
      }
    </div>
  `,
  styleUrl: './code-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodePreviewComponent {
  public readonly code: InputSignal<string> = input.required<string>();
  public readonly language: InputSignal<string> = input<string>('html');

  public readonly showCode: WritableSignal<boolean> = signal<boolean>(false);
  public readonly copied: WritableSignal<boolean> = signal<boolean>(false);

  public readonly highlightedCode: Signal<string> = computed<string>((): string =>
    this.escapeHtml(this.code())
  );

  public toggleCode(): void {
    this.showCode.update((value: boolean): boolean => !value);
  }

  public async copyCode(): Promise<void> {
    const text: string = this.code().trimEnd();

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      this.fallbackCopy(text);
    }

    this.showCopiedState();
  }

  private fallbackCopy(text: string): void {
    const textarea: HTMLTextAreaElement = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.left = '-9999px';

    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  private showCopiedState(): void {
    this.copied.set(true);
    setTimeout((): void => this.copied.set(false), 2000);
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
