import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorComponent } from './editor';
import { EditorToolbarDirective } from './editor-toolbar.directive';
import type { EditorTextChangeEvent } from './editor.types';
import * as editorSanitizer from './editor-sanitizer';

jest.mock('./editor-sanitizer', (): typeof editorSanitizer => {
  const actual: typeof editorSanitizer =
    jest.requireActual<typeof editorSanitizer>('./editor-sanitizer');
  return {
    ...actual,
    sanitizeHtml: jest.fn(actual.sanitizeHtml),
    stripHtmlTags: jest.fn(actual.stripHtmlTags),
  };
});

const actualSanitizer: typeof editorSanitizer =
  jest.requireActual<typeof editorSanitizer>('./editor-sanitizer');

interface ClipboardEventInitLike {
  readonly bubbles?: boolean;
  readonly cancelable?: boolean;
  readonly clipboardData?: DataTransfer | null;
}

class ClipboardEventShim extends Event {
  public readonly clipboardData: DataTransfer | null;

  constructor(type: string, init: ClipboardEventInitLike = {}) {
    const eventInit: EventInit = {};
    if (typeof init.bubbles === 'boolean') {
      eventInit.bubbles = init.bubbles;
    }
    if (typeof init.cancelable === 'boolean') {
      eventInit.cancelable = init.cancelable;
    }
    super(type, eventInit);
    this.clipboardData = init.clipboardData ?? null;
  }
}

@Component({
  standalone: true,
  imports: [FormsModule, EditorComponent],
  template: ` <ui-lib-editor [ngModelOptions]="{ standalone: true }" [(ngModel)]="value" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class NgModelHostComponent {
  public value: string = '<p>initial</p>';
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, EditorComponent],
  template: `
    <form [formGroup]="form">
      <ui-lib-editor formControlName="content" />
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ReactiveHostComponent {
  public readonly form: FormGroup<{ content: FormControl<string | null> }> = new FormGroup<{
    content: FormControl<string | null>;
  }>({
    content: new FormControl<string | null>('<p>initial reactive</p>'),
  });
}

@Component({
  standalone: true,
  imports: [EditorComponent, EditorToolbarDirective],
  template: `
    <ui-lib-editor>
      <div editorToolbar class="custom-toolbar">Custom Toolbar</div>
    </ui-lib-editor>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CustomToolbarHostComponent {}

describe('EditorComponent', (): void => {
  let fixture: ComponentFixture<EditorComponent>;
  let component: EditorComponent;

  let originalClipboardEvent: typeof globalThis.ClipboardEvent | undefined;
  let execCommandMock: jest.Mock<boolean, [string, boolean, string | undefined]>;
  let queryCommandStateMock: jest.Mock<boolean, [string]>;
  let queryCommandValueMock: jest.Mock<string, [string]>;

  beforeAll((): void => {
    originalClipboardEvent = globalThis.ClipboardEvent;
    Object.defineProperty(globalThis, 'ClipboardEvent', {
      configurable: true,
      writable: true,
      value: ClipboardEventShim,
    });
  });

  afterAll((): void => {
    if (originalClipboardEvent) {
      Object.defineProperty(globalThis, 'ClipboardEvent', {
        configurable: true,
        writable: true,
        value: originalClipboardEvent,
      });
      return;
    }

    Object.defineProperty(globalThis, 'ClipboardEvent', {
      configurable: true,
      writable: true,
      value: undefined,
    });
  });

  beforeEach(async (): Promise<void> => {
    execCommandMock = jest.fn<boolean, [string, boolean, string | undefined]>((): boolean => true);
    queryCommandStateMock = jest.fn<boolean, [string]>((): boolean => false);
    queryCommandValueMock = jest.fn<string, [string]>((): string => 'p');

    Object.defineProperty(document, 'execCommand', {
      configurable: true,
      writable: true,
      value: execCommandMock,
    });
    Object.defineProperty(document, 'queryCommandState', {
      configurable: true,
      writable: true,
      value: queryCommandStateMock,
    });
    Object.defineProperty(document, 'queryCommandValue', {
      configurable: true,
      writable: true,
      value: queryCommandValueMock,
    });

    await TestBed.configureTestingModule({
      imports: [EditorComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await detectAndFlush(fixture);

    const sanitizeMock: jest.MockedFunction<typeof editorSanitizer.sanitizeHtml> =
      editorSanitizer.sanitizeHtml as jest.MockedFunction<typeof editorSanitizer.sanitizeHtml>;
    const stripMock: jest.MockedFunction<typeof editorSanitizer.stripHtmlTags> =
      editorSanitizer.stripHtmlTags as jest.MockedFunction<typeof editorSanitizer.stripHtmlTags>;
    sanitizeMock.mockReset();
    sanitizeMock.mockImplementation((html: string): string => actualSanitizer.sanitizeHtml(html));
    stripMock.mockReset();
    stripMock.mockImplementation((html: string): string => actualSanitizer.stripHtmlTags(html));
  });

  afterEach((): void => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });

  function detectAndFlush<T>(targetFixture: ComponentFixture<T>): Promise<void> {
    targetFixture.detectChanges();
    return Promise.resolve().then((): void => {
      targetFixture.detectChanges();
    });
  }

  function hostEl(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  function editorContentEl(): HTMLDivElement {
    const element: HTMLDivElement | null = hostEl().querySelector('.ui-lib-editor-content');
    if (!element) {
      throw new Error('Expected editor content element.');
    }
    return element;
  }

  function toolbarEl(): HTMLElement {
    const element: HTMLElement | null = hostEl().querySelector('.ui-lib-editor-toolbar');
    if (!element) {
      throw new Error('Expected toolbar element.');
    }
    return element;
  }

  function toolbarButtons(): HTMLButtonElement[] {
    return Array.from(hostEl().querySelectorAll('.ui-lib-editor-toolbar-button'));
  }

  function toolbarSelectEl(): HTMLSelectElement {
    const element: HTMLSelectElement | null = hostEl().querySelector(
      '.ui-lib-editor-toolbar-select'
    );
    if (!element) {
      throw new Error('Expected toolbar select element.');
    }
    return element;
  }

  function buttonByAriaLabel(label: string): HTMLButtonElement {
    const button: HTMLButtonElement | null = hostEl().querySelector(
      `.ui-lib-editor-toolbar-button[aria-label="${label}"]`
    );
    if (!button) {
      throw new Error(`Expected toolbar button with aria-label: ${label}`);
    }
    return button;
  }

  function createClipboardData(html: string, plainText: string): DataTransfer {
    return {
      getData: (type: string): string => {
        if (type === 'text/html') {
          return html;
        }
        if (type === 'text/plain') {
          return plainText;
        }
        return '';
      },
    } as DataTransfer;
  }

  function createPasteEvent(html: string, plainText: string): Event {
    return new ClipboardEvent('paste', {
      bubbles: true,
      cancelable: true,
      clipboardData: createClipboardData(html, plainText),
    });
  }

  describe('Creation & Defaults', (): void => {
    it('creates component with default toolbar and content semantics', (): void => {
      expect(component).toBeTruthy();
      expect(toolbarSelectEl()).toBeTruthy();
      expect(toolbarButtons().length).toBeGreaterThan(0);
      expect(editorContentEl().getAttribute('contenteditable')).toBe('true');
      expect(editorContentEl().getAttribute('role')).toBe('textbox');
      expect(editorContentEl().getAttribute('aria-multiline')).toBe('true');
      expect(hostEl().classList.contains('ui-lib-editor')).toBeTruthy();
      expect(hostEl().classList.contains('ui-lib-editor--size-md')).toBeTruthy();
    });
  });

  describe('CVA Integration', (): void => {
    it('writeValue sets and clears content', (): void => {
      component.writeValue('<p>Hello</p>');
      fixture.detectChanges();
      expect(editorContentEl().innerHTML).toBe('<p>Hello</p>');

      component.writeValue(null);
      fixture.detectChanges();
      expect(editorContentEl().innerHTML).toBe('');
    });

    it('typing emits onChange callback', (): void => {
      const onChange: jest.Mock<void, [string]> = jest.fn<void, [string]>();
      component.registerOnChange(onChange);

      editorContentEl().innerHTML = '<p>typed</p>';
      editorContentEl().dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();

      expect(onChange).toHaveBeenCalledWith('<p>typed</p>');
    });

    it('focusout emits onTouched callback', (): void => {
      const onTouched: jest.Mock<void, []> = jest.fn<void, []>();
      component.registerOnTouched(onTouched);

      editorContentEl().dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      editorContentEl().dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
      fixture.detectChanges();

      expect(onTouched).toHaveBeenCalled();
    });

    it('setDisabledState updates editable attribute and disabled class', (): void => {
      component.setDisabledState(true);
      fixture.detectChanges();

      expect(editorContentEl().getAttribute('contenteditable')).toBe('false');
      expect(hostEl().classList.contains('ui-lib-editor--disabled')).toBeTruthy();
    });
  });

  describe('Toolbar State', (): void => {
    it('executeCommand calls document.execCommand with expected args', (): void => {
      component.executeCommand('bold');
      expect(execCommandMock).toHaveBeenCalledWith('bold', false, undefined);
    });

    it('updates toolbarState from queryCommandState and queryCommandValue', (): void => {
      queryCommandStateMock.mockImplementation(
        (command: string): boolean => command === 'bold' || command === 'insertOrderedList'
      );
      queryCommandValueMock.mockImplementation((command: string): string =>
        command === 'formatBlock' ? 'h2' : ''
      );

      component.executeCommand('bold');
      fixture.detectChanges();

      const state: ReturnType<EditorComponent['getToolbarState']> = component.getToolbarState();
      expect(state.bold).toBeTruthy();
      expect(state.orderedList).toBeTruthy();
      expect(state.blockFormat).toBe('h2');
      expect(toolbarSelectEl().value).toBe('h2');
    });
  });

  describe('Toolbar Interaction', (): void => {
    it('mousedown on toolbar button prevents default', (): void => {
      const boldButton: HTMLButtonElement = buttonByAriaLabel('Bold');
      const mouseDown: MouseEvent = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
      });

      boldButton.dispatchEvent(mouseDown);
      expect(mouseDown.defaultPrevented).toBeTruthy();
    });

    it('clicking bold button executes bold command', (): void => {
      buttonByAriaLabel('Bold').click();
      expect(execCommandMock).toHaveBeenCalledWith('bold', false, undefined);
    });

    it('changing heading select executes formatBlock', (): void => {
      const select: HTMLSelectElement = toolbarSelectEl();
      select.value = 'h1';
      select.dispatchEvent(new Event('change', { bubbles: true }));

      expect(execCommandMock).toHaveBeenCalledWith('formatBlock', false, '<h1>');
    });
  });

  describe('Readonly', (): void => {
    it('sets contenteditable false and disables toolbar controls', async (): Promise<void> => {
      fixture.componentRef.setInput('readonly', true);
      await detectAndFlush(fixture);

      expect(editorContentEl().getAttribute('contenteditable')).toBe('false');
      expect(toolbarButtons().every((button: HTMLButtonElement): boolean => button.disabled)).toBe(
        true
      );
      expect(toolbarSelectEl().disabled).toBeTruthy();
    });
  });

  describe('Disabled', (): void => {
    it('sets contenteditable false, disabled class, and disables toolbar controls', async (): Promise<void> => {
      fixture.componentRef.setInput('disabled', true);
      await detectAndFlush(fixture);

      expect(editorContentEl().getAttribute('contenteditable')).toBe('false');
      expect(hostEl().classList.contains('ui-lib-editor--disabled')).toBeTruthy();
      expect(toolbarButtons().every((button: HTMLButtonElement): boolean => button.disabled)).toBe(
        true
      );
      expect(toolbarSelectEl().disabled).toBeTruthy();
    });
  });

  describe('Variant/Size/Filled', (): void => {
    it('applies variant, size, and filled classes', async (): Promise<void> => {
      fixture.componentRef.setInput('variant', 'bootstrap');
      fixture.componentRef.setInput('size', 'lg');
      fixture.componentRef.setInput('filled', true);
      await detectAndFlush(fixture);

      expect(hostEl().classList.contains('ui-lib-editor--bootstrap')).toBeTruthy();
      expect(hostEl().classList.contains('ui-lib-editor--size-lg')).toBeTruthy();
      expect(hostEl().classList.contains('ui-lib-editor--filled')).toBeTruthy();
    });
  });

  describe('Custom Toolbar', (): void => {
    it('renders projected toolbar and hides default toolbar controls', async (): Promise<void> => {
      const customFixture: ComponentFixture<CustomToolbarHostComponent> = TestBed.createComponent(
        CustomToolbarHostComponent
      );
      customFixture.detectChanges();
      await detectAndFlush(customFixture);

      const root: HTMLElement = customFixture.nativeElement as HTMLElement;
      const projected: HTMLElement | null = root.querySelector('.custom-toolbar');
      const defaultBoldButton: Element | null = root.querySelector(
        '.ui-lib-editor-toolbar-button[aria-label="Bold"]'
      );
      if (!projected) {
        throw new Error('Expected projected toolbar content.');
      }

      const projectedText: string = projected.textContent;
      expect(projectedText.trim()).toBe('Custom Toolbar');
      expect(defaultBoldButton).toBeNull();

      customFixture.destroy();
    });
  });

  describe('Paste Handling', (): void => {
    it('uses sanitizeHtml for html clipboard content', (): void => {
      const sanitizeMock: jest.MockedFunction<typeof editorSanitizer.sanitizeHtml> =
        editorSanitizer.sanitizeHtml as jest.MockedFunction<typeof editorSanitizer.sanitizeHtml>;
      sanitizeMock.mockReturnValue('<p>clean</p>');

      editorContentEl().dispatchEvent(createPasteEvent('<p onclick="x()">bad</p>', 'bad'));

      expect(sanitizeMock).toHaveBeenCalledWith('<p onclick="x()">bad</p>');
      expect(execCommandMock).toHaveBeenCalledWith('insertHTML', false, '<p>clean</p>');
    });

    it('inserts plain text via insertText when html is not present', (): void => {
      editorContentEl().dispatchEvent(createPasteEvent('', 'plain text only'));

      expect(execCommandMock).toHaveBeenCalledWith('insertText', false, 'plain text only');
    });
  });

  describe('Placeholder', (): void => {
    it('host has empty class when content is empty and removes it when content is set', (): void => {
      component.writeValue('');
      fixture.detectChanges();
      expect(hostEl().classList.contains('ui-lib-editor--empty')).toBeTruthy();

      component.writeValue('<p>filled</p>');
      fixture.detectChanges();
      expect(hostEl().classList.contains('ui-lib-editor--empty')).toBeFalsy();
    });
  });

  describe('Events', (): void => {
    it('emits textChange with expected payload shape on input', (): void => {
      const textChangeSpy: jest.Mock<void, [EditorTextChangeEvent]> = jest.fn<
        void,
        [EditorTextChangeEvent]
      >();
      component.textChange.subscribe((event: EditorTextChangeEvent): void => textChangeSpy(event));

      editorContentEl().innerHTML = '<p>Typed Value</p>';
      editorContentEl().dispatchEvent(new Event('input', { bubbles: true }));

      expect(textChangeSpy).toHaveBeenCalled();
      const firstCall: [EditorTextChangeEvent] | undefined = textChangeSpy.mock.calls[0];
      if (!firstCall) {
        throw new Error('Expected textChange payload call.');
      }
      const payload: EditorTextChangeEvent = firstCall[0];
      expect(payload.htmlValue).toBe('<p>Typed Value</p>');
      expect(payload.textValue).toBe('Typed Value');
      expect(payload.originalEvent).toBeInstanceOf(Event);
    });

    it('emits selectionChange when selectionchange occurs inside editor', (): void => {
      const selectionSpy: jest.Mock<void, [unknown]> = jest.fn<void, [unknown]>();
      component.selectionChange.subscribe((event: unknown): void => selectionSpy(event));

      const textNode: Text = document.createTextNode('Selection');
      editorContentEl().appendChild(textNode);
      const selectionLike: Selection = {
        anchorNode: textNode,
        focusNode: textNode,
      } as unknown as Selection;

      Object.defineProperty(document, 'getSelection', {
        configurable: true,
        writable: true,
        value: jest.fn<Selection | null, []>((): Selection | null => selectionLike),
      });

      document.dispatchEvent(new Event('selectionchange'));

      expect(selectionSpy).toHaveBeenCalled();
    });
  });

  describe('Template-Driven & Reactive Forms', (): void => {
    it('supports ngModel two-way binding', async (): Promise<void> => {
      const ngModelFixture: ComponentFixture<NgModelHostComponent> =
        TestBed.createComponent(NgModelHostComponent);
      ngModelFixture.detectChanges();
      await detectAndFlush(ngModelFixture);

      const root: HTMLElement = ngModelFixture.nativeElement as HTMLElement;
      const contentElement: HTMLDivElement | null = root.querySelector('.ui-lib-editor-content');
      if (!contentElement) {
        throw new Error('Expected editor content element for ngModel host.');
      }

      expect(contentElement.innerHTML).toBe('<p>initial</p>');

      contentElement.innerHTML = '<p>updated</p>';
      contentElement.dispatchEvent(new Event('input', { bubbles: true }));
      ngModelFixture.detectChanges();

      expect(ngModelFixture.componentInstance.value).toBe('<p>updated</p>');
      ngModelFixture.destroy();
    });

    it('supports formControlName binding', async (): Promise<void> => {
      const reactiveFixture: ComponentFixture<ReactiveHostComponent> =
        TestBed.createComponent(ReactiveHostComponent);
      reactiveFixture.detectChanges();
      await detectAndFlush(reactiveFixture);

      const root: HTMLElement = reactiveFixture.nativeElement as HTMLElement;
      const contentElement: HTMLDivElement | null = root.querySelector('.ui-lib-editor-content');
      if (!contentElement) {
        throw new Error('Expected editor content element for reactive host.');
      }

      reactiveFixture.componentInstance.form.controls.content.setValue('<p>from control</p>');
      reactiveFixture.detectChanges();
      await detectAndFlush(reactiveFixture);
      expect(contentElement.innerHTML).toBe('<p>from control</p>');

      contentElement.innerHTML = '<p>from view</p>';
      contentElement.dispatchEvent(new Event('input', { bubbles: true }));
      reactiveFixture.detectChanges();
      expect(reactiveFixture.componentInstance.form.controls.content.value).toBe(
        '<p>from view</p>'
      );

      reactiveFixture.destroy();
    });
  });

  describe('Cleanup', (): void => {
    it('removes registered event listeners on destroy', (): void => {
      const originalRemoveEventListener: (
        this: EventTarget,
        type: string,
        callback: EventListenerOrEventListenerObject,
        options?: boolean | EventListenerOptions
      ) => void = EventTarget.prototype.removeEventListener;

      const removeListenerMock: jest.Mock = jest.fn(function removeListenerProxy(
        this: EventTarget,
        type: string,
        callback: EventListenerOrEventListenerObject,
        options?: boolean | EventListenerOptions
      ): void {
        originalRemoveEventListener.call(this, type, callback, options);
      });

      EventTarget.prototype.removeEventListener =
        removeListenerMock as typeof EventTarget.prototype.removeEventListener;
      fixture.destroy();

      expect(removeListenerMock).toHaveBeenCalled();
      EventTarget.prototype.removeEventListener = originalRemoveEventListener;
    });
  });

  describe('ARIA', (): void => {
    it('reflects ariaLabel and ariaLabelledBy and readonly aria state', async (): Promise<void> => {
      fixture.componentRef.setInput('ariaLabel', 'Editor Label');
      fixture.componentRef.setInput('ariaLabelledBy', 'editor-title');
      fixture.componentRef.setInput('readonly', true);
      await detectAndFlush(fixture);

      expect(editorContentEl().getAttribute('aria-label')).toBe('Editor Label');
      expect(editorContentEl().getAttribute('aria-labelledby')).toBe('editor-title');
      expect(editorContentEl().getAttribute('aria-readonly')).toBe('true');
    });

    it('sets toolbar role and aria-pressed for toggle buttons', (): void => {
      expect(toolbarEl().getAttribute('role')).toBe('toolbar');
      expect(buttonByAriaLabel('Bold').getAttribute('aria-pressed')).toBe('false');
    });
  });
});
