import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { EditorComponent } from './editor';
import { checkA11y, SKIP_COLOR_CONTRAST_RULES } from '../../test/a11y-utils';

@Component({
  standalone: true,
  imports: [EditorComponent],
  template: `
    <ui-lib-editor
      [ariaLabel]="ariaLabel"
      [readonly]="isReadonly"
      [disabled]="disabled"
      [placeholder]="placeholder"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class EditorA11yHostComponent {
  public ariaLabel: string = 'Rich text editor';
  public isReadonly: boolean = false;
  public disabled: boolean = false;
  public placeholder: string = 'Type here';
}

describe('Editor Accessibility', (): void => {
  let fixture: ComponentFixture<EditorA11yHostComponent>;

  beforeEach(async (): Promise<void> => {
    Object.defineProperty(document, 'execCommand', {
      configurable: true,
      writable: true,
      value: jest.fn<boolean, [string, boolean, string | undefined]>((): boolean => true),
    });
    Object.defineProperty(document, 'queryCommandState', {
      configurable: true,
      writable: true,
      value: jest.fn<boolean, [string]>((): boolean => false),
    });
    Object.defineProperty(document, 'queryCommandValue', {
      configurable: true,
      writable: true,
      value: jest.fn<string, [string]>((): string => 'p'),
    });

    await TestBed.configureTestingModule({
      imports: [EditorA11yHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorA11yHostComponent);
    fixture.detectChanges();
  });

  function hostEl(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  function contentEl(): HTMLDivElement {
    const element: HTMLDivElement | null = hostEl().querySelector('.ui-lib-editor-content');
    if (!element) {
      throw new Error('Expected editor content element to exist.');
    }
    return element;
  }

  function toolbarEl(): HTMLElement {
    const element: HTMLElement | null = hostEl().querySelector('.ui-lib-editor-toolbar');
    if (!element) {
      throw new Error('Expected editor toolbar element to exist.');
    }
    return element;
  }

  function boldButtonEl(): HTMLButtonElement {
    const element: HTMLButtonElement | null = hostEl().querySelector(
      '.ui-lib-editor-toolbar-button[aria-label="Bold"]'
    );
    if (!element) {
      throw new Error('Expected bold toolbar button to exist.');
    }
    return element;
  }

  async function detectAndFlush<T>(targetFixture: ComponentFixture<T>): Promise<void> {
    targetFixture.detectChanges();
    await Promise.resolve();
    targetFixture.detectChanges();
  }

  describe('axe-core baseline', (): void => {
    it('has no accessibility violations in default state', async (): Promise<void> => {
      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });

    it('has no accessibility violations in readonly state', async (): Promise<void> => {
      fixture.componentInstance.isReadonly = true;
      fixture.detectChanges();

      await checkA11y(fixture, { rules: SKIP_COLOR_CONTRAST_RULES });
    });
  });

  describe('semantics', (): void => {
    it('exposes textbox semantics for contenteditable surface', (): void => {
      expect(contentEl().getAttribute('role')).toBe('textbox');
      expect(contentEl().getAttribute('aria-multiline')).toBe('true');
      expect(contentEl().getAttribute('aria-label')).toBe('Rich text editor');
    });

    it('marks readonly and disabled aria attributes when state changes', async (): Promise<void> => {
      const directFixture: ComponentFixture<EditorComponent> =
        TestBed.createComponent(EditorComponent);
      directFixture.componentRef.setInput('ariaLabel', 'Rich text editor');
      directFixture.componentRef.setInput('readonly', true);
      directFixture.componentRef.setInput('disabled', true);
      await detectAndFlush(directFixture);

      const content: HTMLDivElement | null = (
        directFixture.nativeElement as HTMLElement
      ).querySelector('.ui-lib-editor-content');
      if (!content) {
        throw new Error('Expected editor content element for direct fixture.');
      }

      expect(content.getAttribute('aria-readonly')).toBe('true');
      expect(content.getAttribute('aria-disabled')).toBe('true');
      expect(content.getAttribute('contenteditable')).toBe('false');

      directFixture.destroy();
    });

    it('exposes toolbar role and button pressed state semantics', (): void => {
      expect(toolbarEl().getAttribute('role')).toBe('toolbar');
      expect(toolbarEl().getAttribute('aria-label')).toBe('Formatting options');
      expect(boldButtonEl().getAttribute('aria-pressed')).toBe('false');
    });
  });
});
