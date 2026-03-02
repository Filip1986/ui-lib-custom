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
  @Input() public title: string = 'Code';
  @Input({ required: true }) public code: string = '';
  @Input() public language: string = '';

  public readonly copied = signal<boolean>(false);

  public async copy(): Promise<void> {
    const text = this.code.trimEnd();

    try {
      await navigator.clipboard.writeText(text);
    } catch {
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
