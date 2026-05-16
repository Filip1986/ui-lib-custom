import { TestBed, type ComponentFixture } from '@angular/core/testing';
import {
  Component,
  ChangeDetectionStrategy,
  provideZonelessChangeDetection,
  signal,
  type WritableSignal,
} from '@angular/core';
import { CodeSnippet } from './code-snippet';
import type {
  CodeSnippetLanguage,
  CodeSnippetVariant,
  CodeSnippetSize,
} from './code-snippet.types';

// ─── Typed query helpers ───────────────────────────────────────────────────────

function query<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T | null {
  return (fixture.nativeElement as HTMLElement).querySelector<T>(selector);
}

function queryAll<T extends HTMLElement>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T[] {
  return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<T>(selector));
}

// ─── Test host ────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-test-host',
  standalone: true,
  imports: [CodeSnippet],
  template: `
    <ui-lib-code-snippet
      [code]="code()"
      [language]="language()"
      [filename]="filename()"
      [showWindowChrome]="showWindowChrome()"
      [showLineNumbers]="showLineNumbers()"
      [showCopyButton]="showCopyButton()"
      [variant]="variant()"
      [size]="size()"
      [maxHeight]="maxHeight()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestHostComponent {
  public readonly code: WritableSignal<string> = signal<string>('const x = 1;\nconst y = 2;');
  public readonly language: WritableSignal<CodeSnippetLanguage> =
    signal<CodeSnippetLanguage>('javascript');
  public readonly filename: WritableSignal<string | null> = signal<string | null>(null);
  public readonly showWindowChrome: WritableSignal<boolean> = signal<boolean>(true);
  public readonly showLineNumbers: WritableSignal<boolean> = signal<boolean>(true);
  public readonly showCopyButton: WritableSignal<boolean> = signal<boolean>(true);
  public readonly variant: WritableSignal<CodeSnippetVariant | null> =
    signal<CodeSnippetVariant | null>(null);
  public readonly size: WritableSignal<CodeSnippetSize> = signal<CodeSnippetSize>('md');
  public readonly maxHeight: WritableSignal<string | null> = signal<string | null>(null);
}

// ─── Suite ────────────────────────────────────────────────────────────────────

describe('CodeSnippet', (): void => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ── Rendering ───────────────────────────────────────────────────────────────

  it('creates the component', (): void => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders the code content', (): void => {
    const codeElement: HTMLElement | null = query<HTMLElement>(
      fixture,
      '.ui-lib-code-snippet__code'
    );
    expect(codeElement).not.toBeNull();
    expect((codeElement as HTMLElement).textContent).toContain('const x = 1;');
  });

  it('renders the correct number of line numbers', (): void => {
    const lineNumbers: HTMLElement[] = queryAll<HTMLElement>(
      fixture,
      '.ui-lib-code-snippet__line-number'
    );
    expect(lineNumbers.length).toBe(2);
  });

  it('updates line numbers when code changes', (): void => {
    host.code.set('line1\nline2\nline3');
    fixture.detectChanges();
    const lineNumbers: HTMLElement[] = queryAll<HTMLElement>(
      fixture,
      '.ui-lib-code-snippet__line-number'
    );
    expect(lineNumbers.length).toBe(3);
  });

  // ── Filename and language label ─────────────────────────────────────────────

  it('shows the language label in the tab when no filename is provided', (): void => {
    host.language.set('typescript');
    fixture.detectChanges();
    const tab: HTMLElement | null = query<HTMLElement>(fixture, '.ui-lib-code-snippet__tab-label');
    expect(tab).not.toBeNull();
    expect((tab as HTMLElement).textContent?.trim()).toBe('TypeScript');
  });

  it('shows the filename in the tab when provided', (): void => {
    host.filename.set('main.ts');
    fixture.detectChanges();
    const tab: HTMLElement | null = query<HTMLElement>(fixture, '.ui-lib-code-snippet__tab-label');
    expect(tab).not.toBeNull();
    expect((tab as HTMLElement).textContent?.trim()).toBe('main.ts');
  });

  // ── Visibility toggles ──────────────────────────────────────────────────────

  it('hides window chrome when showWindowChrome is false', (): void => {
    host.showWindowChrome.set(false);
    fixture.detectChanges();
    expect(query<HTMLElement>(fixture, '.ui-lib-code-snippet__window-chrome')).toBeNull();
  });

  it('shows window chrome when showWindowChrome is true', (): void => {
    expect(query<HTMLElement>(fixture, '.ui-lib-code-snippet__window-chrome')).not.toBeNull();
  });

  it('hides line numbers when showLineNumbers is false', (): void => {
    host.showLineNumbers.set(false);
    fixture.detectChanges();
    expect(query<HTMLElement>(fixture, '.ui-lib-code-snippet__line-numbers')).toBeNull();
  });

  it('hides copy button when showCopyButton is false', (): void => {
    host.showCopyButton.set(false);
    fixture.detectChanges();
    expect(query<HTMLElement>(fixture, '.ui-lib-code-snippet__copy-btn')).toBeNull();
  });

  // ── Variant classes ─────────────────────────────────────────────────────────

  it('applies material variant class', (): void => {
    host.variant.set('material');
    fixture.detectChanges();
    const card: HTMLElement | null = query<HTMLElement>(fixture, '.ui-lib-code-snippet__card');
    expect(card).not.toBeNull();
    expect((card as HTMLElement).classList.contains('ui-lib-code-snippet--material')).toBe(true);
  });

  it('applies bootstrap variant class', (): void => {
    host.variant.set('bootstrap');
    fixture.detectChanges();
    const card: HTMLElement | null = query<HTMLElement>(fixture, '.ui-lib-code-snippet__card');
    expect(card).not.toBeNull();
    expect((card as HTMLElement).classList.contains('ui-lib-code-snippet--bootstrap')).toBe(true);
  });

  it('applies minimal variant class', (): void => {
    host.variant.set('minimal');
    fixture.detectChanges();
    const card: HTMLElement | null = query<HTMLElement>(fixture, '.ui-lib-code-snippet__card');
    expect(card).not.toBeNull();
    expect((card as HTMLElement).classList.contains('ui-lib-code-snippet--minimal')).toBe(true);
  });

  // ── Size classes ────────────────────────────────────────────────────────────

  it('applies sm size class', (): void => {
    host.size.set('sm');
    fixture.detectChanges();
    const card: HTMLElement | null = query<HTMLElement>(fixture, '.ui-lib-code-snippet__card');
    expect(card).not.toBeNull();
    expect((card as HTMLElement).classList.contains('ui-lib-code-snippet--sm')).toBe(true);
  });

  it('applies lg size class', (): void => {
    host.size.set('lg');
    fixture.detectChanges();
    const card: HTMLElement | null = query<HTMLElement>(fixture, '.ui-lib-code-snippet__card');
    expect(card).not.toBeNull();
    expect((card as HTMLElement).classList.contains('ui-lib-code-snippet--lg')).toBe(true);
  });

  // ── Max height ──────────────────────────────────────────────────────────────

  it('applies maxHeight to the body element', (): void => {
    host.maxHeight.set('200px');
    fixture.detectChanges();
    const body: HTMLElement | null = query<HTMLElement>(fixture, '.ui-lib-code-snippet__body');
    expect(body).not.toBeNull();
    expect((body as HTMLElement).style.maxHeight).toBe('200px');
  });

  // ── Accessibility ───────────────────────────────────────────────────────────

  it('sets role="region" on the card', (): void => {
    const card: HTMLElement | null = query<HTMLElement>(fixture, '.ui-lib-code-snippet__card');
    expect(card).not.toBeNull();
    expect((card as HTMLElement).getAttribute('role')).toBe('region');
  });

  it('sets aria-label based on language when no filename is set', (): void => {
    host.language.set('css');
    fixture.detectChanges();
    const card: HTMLElement | null = query<HTMLElement>(fixture, '.ui-lib-code-snippet__card');
    expect(card).not.toBeNull();
    expect((card as HTMLElement).getAttribute('aria-label')).toBe('CSS code snippet');
  });

  it('sets aria-label using filename when provided', (): void => {
    host.filename.set('styles.css');
    fixture.detectChanges();
    const card: HTMLElement | null = query<HTMLElement>(fixture, '.ui-lib-code-snippet__card');
    expect(card).not.toBeNull();
    expect((card as HTMLElement).getAttribute('aria-label')).toBe('Code snippet: styles.css');
  });

  it('marks line numbers as aria-hidden', (): void => {
    const lineNumbers: HTMLElement | null = query<HTMLElement>(
      fixture,
      '.ui-lib-code-snippet__line-numbers'
    );
    expect(lineNumbers).not.toBeNull();
    expect((lineNumbers as HTMLElement).getAttribute('aria-hidden')).toBe('true');
  });

  it('marks window chrome as aria-hidden', (): void => {
    const chrome: HTMLElement | null = query<HTMLElement>(
      fixture,
      '.ui-lib-code-snippet__window-chrome'
    );
    expect(chrome).not.toBeNull();
    expect((chrome as HTMLElement).getAttribute('aria-hidden')).toBe('true');
  });

  it('gives the copy button an accessible label', (): void => {
    const button: HTMLButtonElement | null = query<HTMLButtonElement>(
      fixture,
      '.ui-lib-code-snippet__copy-btn'
    );
    expect(button).not.toBeNull();
    expect((button as HTMLButtonElement).getAttribute('aria-label')).toBe('Copy code to clipboard');
  });

  it('uses type="button" on the copy button', (): void => {
    const button: HTMLButtonElement | null = query<HTMLButtonElement>(
      fixture,
      '.ui-lib-code-snippet__copy-btn'
    );
    expect(button).not.toBeNull();
    expect((button as HTMLButtonElement).type).toBe('button');
  });

  // ── Copy interaction ────────────────────────────────────────────────────────

  it('sets aria-pressed to true after copy button click', async (): Promise<void> => {
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
    });

    const button: HTMLButtonElement | null = query<HTMLButtonElement>(
      fixture,
      '.ui-lib-code-snippet__copy-btn'
    );
    expect(button).not.toBeNull();
    (button as HTMLButtonElement).click();
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();

    expect((button as HTMLButtonElement).getAttribute('aria-pressed')).toBe('true');
  });

  it('sets data-language attribute on the pre element', (): void => {
    host.language.set('typescript');
    fixture.detectChanges();
    const pre: HTMLElement | null = query<HTMLElement>(fixture, '.ui-lib-code-snippet__pre');
    expect(pre).not.toBeNull();
    expect((pre as HTMLElement).getAttribute('data-language')).toBe('typescript');
  });
});
