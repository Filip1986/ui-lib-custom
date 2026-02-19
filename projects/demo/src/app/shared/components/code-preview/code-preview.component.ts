import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  code = input.required<string>();
  language = input<string>('html');

  showCode = signal(false);
  copied = signal(false);

  highlightedCode = computed(() => this.escapeHtml(this.code()));

  toggleCode(): void {
    this.showCode.update((value) => !value);
  }

  async copyCode(): Promise<void> {
    const text = this.code().trimEnd();

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        this.fallbackCopy(text);
      }
    } catch (error) {
      this.fallbackCopy(text);
    }

    this.showCopiedState();
  }

  private fallbackCopy(text: string): void {
    const textarea = document.createElement('textarea');
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
    setTimeout(() => this.copied.set(false), 2000);
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
