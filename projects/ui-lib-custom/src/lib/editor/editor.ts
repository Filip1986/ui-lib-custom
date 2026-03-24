import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ViewChild,
  ViewEncapsulation,
  afterNextRender,
  computed,
  contentChild,
  effect,
  forwardRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import type {
  ElementRef,
  InputSignal,
  OutputEmitterRef,
  Signal,
  WritableSignal,
  EffectRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import type { ControlValueAccessor } from '@angular/forms';
import type { ThemeVariant } from 'ui-lib-custom/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import {
  EDITOR_CSS_CLASSES,
  EDITOR_DEFAULTS,
  EDITOR_TOOLBAR_ARIA_LABELS,
} from './editor.constants';
import { sanitizeHtml, stripHtmlTags } from './editor-sanitizer';
import { EditorToolbarDirective } from './editor-toolbar.directive';
import type {
  EditorCommand,
  EditorSelectionChangeEvent,
  EditorTextChangeEvent,
  EditorToolbarState,
} from './editor.types';

const INITIAL_TOOLBAR_STATE: EditorToolbarState = {
  bold: false,
  italic: false,
  underline: false,
  strikeThrough: false,
  orderedList: false,
  unorderedList: false,
  alignLeft: false,
  alignCenter: false,
  alignRight: false,
  alignJustify: false,
  blockFormat: 'p',
};

/**
 * Native rich text editor with default toolbar and content projection support.
 */
@Component({
  selector: 'ui-lib-editor',
  standalone: true,
  imports: [EditorToolbarDirective],
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof EditorComponent => EditorComponent),
      multi: true,
    },
  ],
  host: {
    '[class]': 'hostClass()',
  },
})
export class EditorComponent implements ControlValueAccessor {
  public readonly variant: InputSignal<ThemeVariant | null> = input<ThemeVariant | null>(
    EDITOR_DEFAULTS.variant
  );
  public readonly size: InputSignal<'sm' | 'md' | 'lg'> = input<'sm' | 'md' | 'lg'>(
    EDITOR_DEFAULTS.size
  );
  public readonly placeholder: InputSignal<string> = input<string>(EDITOR_DEFAULTS.placeholder);
  public readonly readonly: InputSignal<boolean> = input<boolean>(EDITOR_DEFAULTS.readonly);
  public readonly disabled: InputSignal<boolean> = input<boolean>(EDITOR_DEFAULTS.disabled);
  public readonly filled: InputSignal<boolean> = input<boolean>(EDITOR_DEFAULTS.filled);
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);
  public readonly ariaLabelledBy: InputSignal<string | null> = input<string | null>(null);

  public readonly textChange: OutputEmitterRef<EditorTextChangeEvent> =
    output<EditorTextChangeEvent>();
  public readonly selectionChange: OutputEmitterRef<EditorSelectionChangeEvent> =
    output<EditorSelectionChangeEvent>();

  @ViewChild('editorContent') public editorContentRef!: ElementRef<HTMLDivElement>;

  public readonly customToolbar: Signal<EditorToolbarDirective | undefined> =
    contentChild(EditorToolbarDirective);

  public readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);
  public readonly focused: WritableSignal<boolean> = signal<boolean>(false);
  public readonly isEmpty: WritableSignal<boolean> = signal<boolean>(true);
  public readonly toolbarState: WritableSignal<EditorToolbarState> =
    signal<EditorToolbarState>(INITIAL_TOOLBAR_STATE);

  public readonly hasCustomToolbar: Signal<boolean> = computed<boolean>((): boolean =>
    Boolean(this.customToolbar())
  );

  public readonly isDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.cvaDisabled()
  );

  public readonly resolvedVariant: Signal<ThemeVariant> = computed<ThemeVariant>(
    (): ThemeVariant => this.variant() ?? this.themeConfigService.variant()
  );

  public readonly toolbarAriaLabels: typeof EDITOR_TOOLBAR_ARIA_LABELS = EDITOR_TOOLBAR_ARIA_LABELS;

  public readonly hostClass: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      EDITOR_CSS_CLASSES.Host,
      `${EDITOR_CSS_CLASSES.VariantPrefix}${this.resolvedVariant()}`,
      `${EDITOR_CSS_CLASSES.SizePrefix}${this.size()}`,
    ];

    if (this.filled()) {
      classes.push(EDITOR_CSS_CLASSES.Filled);
    }

    if (this.isDisabled()) {
      classes.push(EDITOR_CSS_CLASSES.Disabled);
    }

    if (this.readonly()) {
      classes.push(EDITOR_CSS_CLASSES.Readonly);
    }

    if (this.focused()) {
      classes.push(EDITOR_CSS_CLASSES.Focused);
    }

    if (this.isEmpty()) {
      classes.push(EDITOR_CSS_CLASSES.Empty);
    }

    return classes.join(' ');
  });

  private readonly themeConfigService: ThemeConfigService = inject(ThemeConfigService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly documentRef: Document = inject(DOCUMENT);

  private readonly stateRefreshEffectForReadonly: EffectRef;
  private readonly stateRefreshEffectForDisabled: EffectRef;

  private pendingValue: string | null = null;
  private hasInitializedEditor: boolean = false;
  private onModelChange: (value: string) => void = (): void => {};
  private onModelTouched: () => void = (): void => {};
  private readonly cleanupCallbacks: Array<() => void> = [];

  constructor() {
    afterNextRender((): void => this.initializeEditor());

    this.stateRefreshEffectForReadonly = effect((): void => {
      this.readonly();
      this.updateContentEditableAttribute();
    });

    this.stateRefreshEffectForDisabled = effect((): void => {
      this.isDisabled();
      this.updateContentEditableAttribute();
    });

    this.destroyRef.onDestroy((): void => {
      this.cleanupDomListeners();
      this.stateRefreshEffectForReadonly.destroy();
      this.stateRefreshEffectForDisabled.destroy();
    });
  }

  public writeValue(value: string | null): void {
    const normalizedValue: string = value ?? '';
    if (!this.hasInitializedEditor) {
      this.pendingValue = normalizedValue;
      return;
    }

    this.setEditorHtml(normalizedValue);
    this.refreshToolbarState();
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onModelChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onModelTouched = fn;
  }

  public setDisabledState(disabled: boolean): void {
    this.cvaDisabled.set(disabled);
  }

  public executeCommand(command: EditorCommand, value?: string): void {
    if (this.isDisabled() || this.readonly() || !this.hasInitializedEditor) {
      return;
    }

    const editorElement: HTMLDivElement = this.editorContentRef.nativeElement;
    const htmlBeforeCommand: string = editorElement.innerHTML;

    if (this.documentRef.activeElement !== editorElement) {
      editorElement.focus();
    }

    this.executeNativeCommand(command, value);

    const htmlAfterCommand: string = editorElement.innerHTML;
    if (htmlBeforeCommand !== htmlAfterCommand) {
      this.emitCurrentValueChange(null);
    }

    this.refreshToolbarState();
  }

  public getToolbarState(): EditorToolbarState {
    return this.toolbarState();
  }

  public onToolbarButtonClick(event: MouseEvent, command: EditorCommand, value?: string): void {
    event.preventDefault();
    this.executeCommand(command, value);
  }

  public onToolbarMouseDown(event: MouseEvent): void {
    event.preventDefault();
  }

  public onHeadingChange(event: Event): void {
    const selectElement: HTMLSelectElement | null =
      event.target instanceof HTMLSelectElement ? event.target : null;
    if (!selectElement) {
      return;
    }

    const selectedValue: string = selectElement.value;
    const normalizedValue: string = this.normalizeFormatBlockValue(selectedValue);
    this.executeCommand('formatBlock', normalizedValue);
  }

  public onInsertLink(): void {
    const promptResult: string | null = this.windowRef?.prompt('Enter URL:') ?? null;
    if (!promptResult) {
      return;
    }

    const trimmedValue: string = promptResult.trim();
    if (!trimmedValue) {
      return;
    }

    this.executeCommand('createLink', trimmedValue);
  }

  public onInsertImage(): void {
    const promptResult: string | null = this.windowRef?.prompt('Enter image URL:') ?? null;
    if (!promptResult) {
      return;
    }

    const trimmedValue: string = promptResult.trim();
    if (!trimmedValue) {
      return;
    }

    this.executeCommand('insertImage', trimmedValue);
  }

  public onTextColorClick(): void {
    const promptResult: string | null = this.windowRef?.prompt('Enter text color value:') ?? null;
    if (!promptResult) {
      return;
    }

    const trimmedValue: string = promptResult.trim();
    if (!trimmedValue) {
      return;
    }

    this.executeCommand('foreColor', trimmedValue);
  }

  public onBackgroundColorClick(): void {
    const promptResult: string | null =
      this.windowRef?.prompt('Enter background color value:') ?? null;
    if (!promptResult) {
      return;
    }

    const trimmedValue: string = promptResult.trim();
    if (!trimmedValue) {
      return;
    }

    this.executeCommand('backColor', trimmedValue);
  }

  private get windowRef(): Window | null {
    return this.documentRef.defaultView ?? null;
  }

  private initializeEditor(): void {
    if (this.hasInitializedEditor) {
      return;
    }

    this.hasInitializedEditor = true;

    const editorElement: HTMLDivElement = this.editorContentRef.nativeElement;
    this.applyPendingValueIfPresent();
    this.updateEmptyState();
    this.updateContentEditableAttribute();
    this.refreshToolbarState();

    this.addDomListener(editorElement, 'input', (event: Event): void => {
      this.emitCurrentValueChange(event);
      this.refreshToolbarState();
    });

    this.addDomListener(editorElement, 'focusin', (): void => {
      this.focused.set(true);
      this.changeDetectorRef.markForCheck();
    });

    this.addDomListener(editorElement, 'focusout', (): void => {
      this.focused.set(false);
      this.onModelTouched();
      this.changeDetectorRef.markForCheck();
    });

    this.addDomListener(editorElement, 'paste', (event: Event): void => {
      this.handlePasteEvent(event);
    });

    this.addDomListener(this.documentRef, 'selectionchange', (event: Event): void => {
      const currentSelection: Selection | null = this.documentRef.getSelection();
      if (!this.isSelectionInsideEditor(currentSelection)) {
        return;
      }

      this.refreshToolbarState();
      this.selectionChange.emit({
        selection: currentSelection,
        originalEvent: event,
      });
    });
  }

  private handlePasteEvent(event: Event): void {
    if (!(event instanceof ClipboardEvent)) {
      return;
    }

    event.preventDefault();

    const clipboardData: DataTransfer | null = event.clipboardData;
    if (!clipboardData) {
      return;
    }

    const htmlFromClipboard: string = clipboardData.getData('text/html');
    if (htmlFromClipboard) {
      const sanitizedHtml: string = sanitizeHtml(htmlFromClipboard);
      if (sanitizedHtml) {
        this.executeNativeCommand('insertHTML', sanitizedHtml);
      }
      this.emitCurrentValueChange(event);
      this.refreshToolbarState();
      return;
    }

    const plainTextFromClipboard: string = stripHtmlTags(clipboardData.getData('text/plain'));
    if (plainTextFromClipboard) {
      this.executeNativeCommand('insertText', plainTextFromClipboard);
    }

    this.emitCurrentValueChange(event);
    this.refreshToolbarState();
  }

  private emitCurrentValueChange(originalEvent: Event | null): void {
    if (!this.hasInitializedEditor) {
      return;
    }

    const editorElement: HTMLDivElement = this.editorContentRef.nativeElement;
    const htmlValue: string = editorElement.innerHTML;
    const textValue: string = editorElement.textContent.trim();

    this.onModelChange(htmlValue);
    this.textChange.emit({
      htmlValue,
      textValue,
      originalEvent,
    });

    this.updateEmptyState();
    this.changeDetectorRef.markForCheck();
  }

  private refreshToolbarState(): void {
    if (!this.hasInitializedEditor) {
      return;
    }

    const blockFormatValue: string = this.normalizeCommandValue(
      this.getCommandValue('formatBlock'),
      'p'
    );

    this.toolbarState.set({
      bold: this.getCommandState('bold'),
      italic: this.getCommandState('italic'),
      underline: this.getCommandState('underline'),
      strikeThrough: this.getCommandState('strikeThrough'),
      orderedList: this.getCommandState('insertOrderedList'),
      unorderedList: this.getCommandState('insertUnorderedList'),
      alignLeft: this.getCommandState('justifyLeft'),
      alignCenter: this.getCommandState('justifyCenter'),
      alignRight: this.getCommandState('justifyRight'),
      alignJustify: this.getCommandState('justifyFull'),
      blockFormat: blockFormatValue,
    });

    this.changeDetectorRef.markForCheck();
  }

  private updateContentEditableAttribute(): void {
    if (!this.hasInitializedEditor) {
      return;
    }

    const editorElement: HTMLDivElement = this.editorContentRef.nativeElement;
    const shouldBeEditable: boolean = !this.readonly() && !this.isDisabled();
    editorElement.setAttribute('contenteditable', shouldBeEditable ? 'true' : 'false');
  }

  private updateEmptyState(): void {
    if (!this.hasInitializedEditor) {
      return;
    }

    const editorElement: HTMLDivElement = this.editorContentRef.nativeElement;
    const textContent: string = editorElement.textContent;
    const isEmptyValue: boolean = textContent.trim().length === 0;
    this.isEmpty.set(isEmptyValue);
  }

  private applyPendingValueIfPresent(): void {
    if (this.pendingValue === null) {
      return;
    }

    this.setEditorHtml(this.pendingValue);
    this.pendingValue = null;
  }

  private setEditorHtml(value: string): void {
    if (!this.hasInitializedEditor) {
      this.pendingValue = value;
      return;
    }

    this.editorContentRef.nativeElement.innerHTML = value;
    this.updateEmptyState();
    this.changeDetectorRef.markForCheck();
  }

  private normalizeCommandValue(rawValue: string, fallbackValue: string): string {
    const normalizedValue: string = rawValue.trim().toLowerCase();
    if (!normalizedValue) {
      return fallbackValue;
    }

    if (normalizedValue.startsWith('<') && normalizedValue.endsWith('>')) {
      return normalizedValue.substring(1, normalizedValue.length - 1);
    }

    return normalizedValue;
  }

  private normalizeFormatBlockValue(value: string): string {
    const normalizedValue: string = value.trim().toLowerCase();
    if (!normalizedValue) {
      return '<p>';
    }

    if (normalizedValue.startsWith('<') && normalizedValue.endsWith('>')) {
      return normalizedValue;
    }

    return `<${normalizedValue}>`;
  }

  private isSelectionInsideEditor(selection: Selection | null): boolean {
    if (!selection || !this.hasInitializedEditor) {
      return false;
    }

    const editorElement: HTMLDivElement = this.editorContentRef.nativeElement;
    const anchorNode: Node | null = selection.anchorNode;
    const focusNode: Node | null = selection.focusNode;

    if (!anchorNode || !focusNode) {
      return false;
    }

    return editorElement.contains(anchorNode) && editorElement.contains(focusNode);
  }

  private getCommandState(command: EditorCommand): boolean {
    try {
      return this.documentRef.queryCommandState(command);
    } catch {
      return false;
    }
  }

  private getCommandValue(command: EditorCommand): string {
    try {
      return this.documentRef.queryCommandValue(command);
    } catch {
      return '';
    }
  }

  private executeNativeCommand(command: string, value?: string): boolean {
    try {
      return this.documentRef.execCommand(command, false, value ?? undefined);
    } catch {
      return false;
    }
  }

  private addDomListener(
    target: Document | HTMLElement,
    eventName: string,
    listener: EventListener
  ): void {
    target.addEventListener(eventName, listener);
    this.cleanupCallbacks.push((): void => {
      target.removeEventListener(eventName, listener);
    });
  }

  private cleanupDomListeners(): void {
    this.cleanupCallbacks.forEach((cleanupCallback: () => void): void => {
      cleanupCallback();
    });
    this.cleanupCallbacks.length = 0;
  }
}
