import { ChangeDetectionStrategy, Component, HostListener, signal, viewChild } from '@angular/core';
import type { Signal, WritableSignal, OnDestroy } from '@angular/core';
import { DocPageHeaderComponent } from '../../shared/doc-page/doc-page-header.component';
import { DocPageLayoutComponent } from '../../shared/doc-page/doc-page-layout.component';
import { DocTocComponent } from '../../shared/doc-page/doc-toc.component';
import type { DocSection } from '../../shared/doc-page/doc-section.model';

/**
 *
 */
@Component({
  selector: 'app-keyboard-guide-demo',
  standalone: true,
  imports: [DocPageHeaderComponent, DocPageLayoutComponent, DocTocComponent],
  templateUrl: './keyboard-guide-demo.component.html',
  styleUrl: './keyboard-guide-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardGuideDemoComponent implements OnDestroy {
  public readonly layout: Signal<DocPageLayoutComponent | undefined> =
    viewChild(DocPageLayoutComponent);

  public readonly sections: DocSection[] = [
    { id: 'keyboard', label: 'Keyboard Layout' },
    { id: 'shortcuts', label: 'Shortcut Reference' },
  ];

  public readonly pressedKeys: WritableSignal<ReadonlySet<string>> = signal<ReadonlySet<string>>(
    new Set()
  );

  public readonly highlightedKeys: WritableSignal<ReadonlySet<string>> = signal<
    ReadonlySet<string>
  >(new Set(['ctrl', 'k']));

  private readonly highlightTimer: ReturnType<typeof setTimeout>;

  constructor() {
    this.highlightTimer = setTimeout((): void => {
      this.highlightedKeys.set(new Set());
    }, 3000);
  }

  public ngOnDestroy(): void {
    clearTimeout(this.highlightTimer);
  }

  @HostListener('window:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    const normalized: string = this.normalizeKey(event.key);
    this.pressedKeys.update((keys: ReadonlySet<string>): ReadonlySet<string> => {
      const next: Set<string> = new Set(keys);
      next.add(normalized);
      return next;
    });
  }

  @HostListener('window:keyup')
  public onKeyUp(): void {
    this.pressedKeys.set(new Set());
  }

  public isActive(keyId: string): boolean {
    return this.pressedKeys().has(keyId);
  }

  public isHighlighted(keyId: string): boolean {
    return this.highlightedKeys().has(keyId);
  }

  public scrollTo(id: string): void {
    this.layout()?.scrollToSection(id);
  }

  private normalizeKey(key: string): string {
    const keyMap: Record<string, string> = {
      Control: 'ctrl',
      Alt: 'alt',
      Shift: 'shift',
      Enter: 'enter',
      Backspace: 'backspace',
      Tab: 'tab',
      Escape: 'esc',
      Insert: 'ins',
      Delete: 'del',
      Home: 'home',
      End: 'end',
      PageUp: 'pgup',
      PageDown: 'pgdn',
      ArrowUp: 'arrowup',
      ArrowDown: 'arrowdown',
      ArrowLeft: 'arrowleft',
      ArrowRight: 'arrowright',
      Meta: 'win',
      ' ': 'space',
      CapsLock: 'capslock',
    };
    return keyMap[key] ?? key.toLowerCase();
  }
}
