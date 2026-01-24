import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doc-code-snippet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doc-code-snippet.component.html',
  styleUrl: './doc-code-snippet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocCodeSnippetComponent {
  @Input() title = 'Code';
  @Input({ required: true }) code = '';
  @Input() language = '';

  readonly copied = signal(false);

  async copy(): Promise<void> {
    const text = this.code.trimEnd();

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
    setTimeout(() => this.copied.set(false), 1500);
  }
}
