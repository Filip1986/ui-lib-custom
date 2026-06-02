import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  ViewEncapsulation,
  afterNextRender,
  computed,
  contentChild,
  forwardRef,
  inject,
  input,
  output,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import type {
  AfterViewChecked,
  InputSignal,
  OnDestroy,
  OutputEmitterRef,
  Signal,
  WritableSignal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import type { ControlValueAccessor } from '@angular/forms';
import {
  KEYBOARD_KEYS,
  claimOverlayZIndex,
  releaseOverlayZIndex,
  resolveOverlayAppendTarget,
} from 'ui-lib-custom/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import { UiLibI18nService } from 'ui-lib-custom/i18n';
import {
  CASCADE_SELECT_CLASSNAMES,
  CASCADE_SELECT_DEFAULTS,
  CASCADE_SELECT_IDS,
} from './cascade-select.constants';
import type {
  CascadeSelectChangeEvent,
  CascadeSelectGroupChangeEvent,
  CascadeSelectHideEvent,
  CascadeSelectOptionContext,
  CascadeSelectOptionGroupIconContext,
  CascadeSelectShowEvent,
  CascadeSelectSize,
  CascadeSelectValueContext,
  CascadeSelectVariant,
} from './cascade-select.types';
import {
  CascadeSelectDropdownIconDirective,
  CascadeSelectFooterDirective,
  CascadeSelectHeaderDirective,
  CascadeSelectLoadingDirective,
  CascadeSelectOptionDirective,
  CascadeSelectOptionGroupIconDirective,
  CascadeSelectValueDirective,
} from './directives/cascade-select-templates.directive';

let cascadeSelectIdCounter: number = 0;
const CASCADE_SELECT_PANEL_MODE_CLASSES: readonly string[] = [
  'ui-lib-cascade-select__panel--material',
  'ui-lib-cascade-select__panel--bootstrap',
  'ui-lib-cascade-select__panel--minimal',
];

/**
 * CascadeSelect component with hierarchical single-value selection.
 */
@Component({
  selector: 'ui-lib-cascade-select',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './cascade-select.html',
  styleUrl: './cascade-select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof UiLibCascadeSelect => UiLibCascadeSelect),
      multi: true,
    },
  ],
  host: {
    '[class]': 'hostClasses()',
    '[attr.role]': '"combobox"',
    '[attr.aria-expanded]': 'panelVisible() ? "true" : "false"',
    '[attr.aria-haspopup]': '"listbox"',
    '[attr.aria-controls]': 'listboxId',
    '[attr.aria-activedescendant]': 'focusedItemId() || null',
    '[attr.aria-disabled]': 'isDisabled() || loading() ? "true" : null',
    '[attr.aria-invalid]': 'invalid() ? "true" : null',
    '[attr.aria-label]':
      'ariaLabel() || (ariaLabelledBy() ? null : i18n.translate("cascade-select.label"))',
    '[attr.aria-labelledby]': 'ariaLabelledBy() || null',
    '[attr.tabindex]': 'isDisabled() || loading() ? -1 : tabindex()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class UiLibCascadeSelect implements ControlValueAccessor, AfterViewChecked, OnDestroy {
  /** Root-level option objects for the first column. Default: `[]`. */
  public readonly options: InputSignal<unknown[]> = input<unknown[]>([]);
  /** Field name used as the display label for leaf options. Default: `'label'`. */
  public readonly optionLabel: InputSignal<string> = input<string>('label');
  /** Field name whose value is emitted on selection. `undefined` emits the whole option object. Default: `undefined`. */
  public readonly optionValue: InputSignal<string | undefined> = input<string | undefined>(
    undefined,
  );
  /** Field name used as the display label for group-level options. Default: `'label'`. */
  public readonly optionGroupLabel: InputSignal<string> = input<string>('label');
  /** Array of field names for children at each nesting level (e.g. `['states', 'cities']`). Default: `[]`. */
  public readonly optionGroupChildren: InputSignal<string[]> = input<string[]>([]);
  /** Field name that, when truthy on an option, marks it as non-selectable. Default: `undefined`. */
  public readonly optionDisabled: InputSignal<string | undefined> = input<string | undefined>(
    undefined,
  );
  /** Placeholder text shown when no value is selected. Default: `'Select'`. */
  public readonly placeholder: InputSignal<string> = input<string>(
    CASCADE_SELECT_DEFAULTS.Placeholder,
  );
  /** Visual style variant. Falls back to the global `ThemeConfigService` variant when `undefined`. Default: `undefined`. */
  public readonly variant: InputSignal<CascadeSelectVariant | undefined> = input<
    CascadeSelectVariant | undefined
  >(undefined);
  /** Control height: `'sm'` (36 px) · `'md'` (44 px) · `'lg'` (52 px). Default: `'md'`. */
  public readonly size: InputSignal<CascadeSelectSize> = input<CascadeSelectSize>(
    CASCADE_SELECT_DEFAULTS.Size,
  );
  /** Disables the control; sets `aria-disabled` on the host. Default: `false`. */
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  /** Applies error border styling and sets `aria-invalid="true"` on the host. Default: `false`. */
  public readonly invalid: InputSignal<boolean> = input<boolean>(false);
  /** Shows a loading spinner and disables all interaction. Default: `false`. */
  public readonly loading: InputSignal<boolean> = input<boolean>(false);
  /** Show a clear (×) button when the field has a value. Default: `false`. */
  public readonly showClear: InputSignal<boolean> = input<boolean>(false);
  /** Stretch the component to fill its container width. Default: `false`. */
  public readonly fluid: InputSignal<boolean> = input<boolean>(false);
  /** Apply a filled background appearance. Default: `false`. */
  public readonly filled: InputSignal<boolean> = input<boolean>(false);
  /** Tab index of the host element. Default: `0`. */
  public readonly tabindex: InputSignal<number> = input<number>(0);
  /** Custom `id` for the trigger control (for external `<label for="">` association). Default: `''`. */
  public readonly inputId: InputSignal<string> = input<string>('');
  /** Where to mount the detached dropdown panel; `'body'` appends to `document.body`. Default: `'body'`. */
  public readonly appendTo: InputSignal<string | HTMLElement | undefined> = input<
    string | HTMLElement | undefined
  >('body');
  /** Sets `aria-label` on the host combobox. Default: `null`. */
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);
  /** Sets `aria-labelledby` on the host combobox to reference an external label. Default: `null`. */
  public readonly ariaLabelledBy: InputSignal<string | null> = input<string | null>(null);

  /** Emitted when a leaf option is selected. Named `cascadeChange` (not `change`) to avoid shadowing the native DOM `change` event. */
  public readonly cascadeChange: OutputEmitterRef<CascadeSelectChangeEvent> =
    output<CascadeSelectChangeEvent>();
  /** Emitted when the user navigates into a sub-group at any level. */
  public readonly groupChange: OutputEmitterRef<CascadeSelectGroupChangeEvent> =
    output<CascadeSelectGroupChangeEvent>();
  /** Emitted when the dropdown panel is opened. */
  public readonly show: OutputEmitterRef<CascadeSelectShowEvent> = output<CascadeSelectShowEvent>();
  /** Emitted when the dropdown panel is closed. */
  public readonly hide: OutputEmitterRef<CascadeSelectHideEvent> = output<CascadeSelectHideEvent>();
  /** Emitted when the clear (×) button is clicked. */
  public readonly clear: OutputEmitterRef<void> = output<void>();
  /** Host received focus. Named `cascadeSelectFocus` (not `focus`) to avoid shadowing the native DOM `focus` event. */
  public readonly cascadeSelectFocus: OutputEmitterRef<FocusEvent> = output<FocusEvent>();
  /** Host lost focus. Named `cascadeSelectBlur` (not `blur`) to avoid shadowing the native DOM `blur` event. */
  public readonly cascadeSelectBlur: OutputEmitterRef<FocusEvent> = output<FocusEvent>();

  /** Custom option row template. Context: `{ $implicit: option }`. Selector: `[uiCascadeSelectOption]`. */
  public readonly optionTemplate: Signal<TemplateRef<CascadeSelectOptionContext> | undefined> =
    contentChild(CascadeSelectOptionDirective, { read: TemplateRef });
  /** Custom selected-value display template. Context: `{ $implicit: selectedOption }`. Selector: `[uiCascadeSelectValue]`. */
  public readonly valueTemplate: Signal<TemplateRef<CascadeSelectValueContext> | undefined> =
    contentChild(CascadeSelectValueDirective, { read: TemplateRef });
  /** Custom dropdown-button icon. No context. Selector: `[uiCascadeSelectDropdownIcon]`. */
  public readonly dropdownIconTemplate: Signal<TemplateRef<void> | undefined> = contentChild(
    CascadeSelectDropdownIconDirective,
    { read: TemplateRef },
  );
  /** Custom sub-menu chevron icon. Context: `{ $implicit: groupOption }`. Selector: `[uiCascadeSelectOptionGroupIcon]`. */
  public readonly optionGroupIconTemplate: Signal<
    TemplateRef<CascadeSelectOptionGroupIconContext> | undefined
  > = contentChild(CascadeSelectOptionGroupIconDirective, { read: TemplateRef });
  /** Slot rendered above the option columns. No context. Selector: `[uiCascadeSelectHeader]`. */
  public readonly headerTemplate: Signal<TemplateRef<void> | undefined> = contentChild(
    CascadeSelectHeaderDirective,
    { read: TemplateRef },
  );
  /** Slot rendered below the option columns. No context. Selector: `[uiCascadeSelectFooter]`. */
  public readonly footerTemplate: Signal<TemplateRef<void> | undefined> = contentChild(
    CascadeSelectFooterDirective,
    { read: TemplateRef },
  );
  /** Custom loading indicator. No context. Selector: `[uiCascadeSelectLoading]`. */
  public readonly loadingTemplate: Signal<TemplateRef<void> | undefined> = contentChild(
    CascadeSelectLoadingDirective,
    { read: TemplateRef },
  );

  public readonly panelVisible: WritableSignal<boolean> = signal<boolean>(false);
  public readonly activePath: WritableSignal<unknown[]> = signal<unknown[]>([]);
  public readonly activeOptionPerLevel: WritableSignal<Map<number, unknown>> = signal<
    Map<number, unknown>
  >(new Map<number, unknown>());
  public readonly focusedItemId: WritableSignal<string> = signal<string>('');
  public readonly internalValue: WritableSignal<unknown | null> = signal<unknown | null>(null);

  private readonly focusedLevel: WritableSignal<number> = signal<number>(0);
  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  protected readonly i18n: UiLibI18nService = inject(UiLibI18nService);
  private readonly hostElement: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly documentRef: Document = inject(DOCUMENT);
  private readonly triggerElement: Signal<ElementRef<HTMLElement> | undefined> = viewChild(
    'triggerElement',
    { read: ElementRef },
  );
  private readonly panelElement: Signal<ElementRef<HTMLElement> | undefined> = viewChild(
    'panelElement',
    { read: ElementRef },
  );

  public readonly cascadeSelectId: string = `${CASCADE_SELECT_IDS.Prefix}-${++cascadeSelectIdCounter}`;
  public readonly listboxId: string = `${this.cascadeSelectId}-listbox`;

  private onModelChange: (value: unknown) => void = (): void => {};
  private onModelTouched: () => void = (): void => {};

  constructor() {
    // Wire focus/blur as imperative listeners to prevent Angular from conflating
    // the output names ('focus'/'blur') with the native host events, which would
    // create a circular dispatch via the compiler-generated host-event bindings.
    // Deferred to afterNextRender() for SSR safety; cleaned up via DestroyRef.
    const destroyRef: DestroyRef = inject(DestroyRef);
    afterNextRender((): void => {
      const hostEl: HTMLElement = this.hostElement.nativeElement;
      const focusHandler: (event: FocusEvent) => void = (event: FocusEvent): void => {
        this.onHostFocus(event);
      };
      const blurHandler: (event: FocusEvent) => void = (event: FocusEvent): void => {
        this.onHostBlur(event);
      };
      hostEl.addEventListener('focus', focusHandler);
      hostEl.addEventListener('blur', blurHandler);
      destroyRef.onDestroy((): void => {
        hostEl.removeEventListener('focus', focusHandler);
        hostEl.removeEventListener('blur', blurHandler);
      });
    });
  }

  public readonly controlId: Signal<string> = computed<string>((): string => {
    const id: string = this.inputId().trim();
    return id || `${this.cascadeSelectId}-control`;
  });

  public readonly panelId: Signal<string> = computed<string>((): string => this.listboxId);

  public readonly effectiveVariant: Signal<CascadeSelectVariant> = computed<CascadeSelectVariant>(
    (): CascadeSelectVariant => this.variant() ?? this.themeConfig.variant(),
  );

  public readonly isDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.cvaDisabled(),
  );

  public readonly selectedOption: Signal<unknown | null> = computed<unknown | null>(
    (): unknown | null => this.findOptionByValue(this.internalValue()),
  );

  public readonly displayValue: Signal<string> = computed<string>((): string => {
    const selectedOption: unknown | null = this.selectedOption();
    if (selectedOption === null) {
      return '';
    }
    return this.resolveOptionLabel(selectedOption);
  });

  public readonly hasValue: Signal<boolean> = computed<boolean>(
    (): boolean => this.selectedOption() !== null,
  );

  public readonly visibleLevels: Signal<unknown[][]> = computed<unknown[][]>((): unknown[][] => {
    const levels: unknown[][] = [this.options()];
    const currentPath: unknown[] = this.activePath();

    for (let level: number = 0; level < currentPath.length; level += 1) {
      const option: unknown | undefined = currentPath[level];
      if (!option || !this.isOptionGroup(option, level)) {
        break;
      }
      levels.push(this.getOptionChildren(option, level));
    }

    return levels;
  });

  public readonly activeDescendantId: Signal<string | null> = computed<string | null>(
    (): string | null => this.focusedItemId() || null,
  );

  public readonly resolvedPlaceholder: Signal<string> = computed<string>(
    (): string => this.placeholder() || this.i18n.translate('cascade-select.placeholder'),
  );

  public readonly hostClasses: Signal<string> = computed<string>((): string => {
    const classes: string[] = [
      CASCADE_SELECT_CLASSNAMES.Root,
      `${CASCADE_SELECT_CLASSNAMES.Root}--${this.effectiveVariant()}`,
      `${CASCADE_SELECT_CLASSNAMES.Root}--size-${this.size()}`,
    ];

    if (this.isDisabled()) classes.push(CASCADE_SELECT_CLASSNAMES.Disabled);
    if (this.invalid()) classes.push(CASCADE_SELECT_CLASSNAMES.Invalid);
    if (this.loading()) classes.push(CASCADE_SELECT_CLASSNAMES.Loading);
    if (this.fluid()) classes.push(CASCADE_SELECT_CLASSNAMES.Fluid);
    if (this.filled()) classes.push(CASCADE_SELECT_CLASSNAMES.Filled);
    if (this.panelVisible()) {
      classes.push(CASCADE_SELECT_CLASSNAMES.Open, CASCADE_SELECT_CLASSNAMES.InputWrapperFocus);
    }
    if (this.hasValue()) {
      classes.push(
        CASCADE_SELECT_CLASSNAMES.HasValue,
        CASCADE_SELECT_CLASSNAMES.InputWrapperFilled,
      );
    }

    return classes.join(' ');
  });

  public writeValue(value: unknown): void {
    this.internalValue.set(value ?? null);
  }

  public registerOnChange(fn: (value: unknown) => void): void {
    this.onModelChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onModelTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  public togglePanel(event: Event): void {
    if (this.isDisabled() || this.loading()) {
      return;
    }

    if (this.panelVisible()) {
      this.closePanel(event);
      return;
    }

    this.openPanel(event);
  }

  public openPanel(event: Event): void {
    if (this.panelVisible() || this.isDisabled() || this.loading()) {
      return;
    }

    this.panelVisible.set(true);
    this.initializeNavigationFromValue();
    this.show.emit({ originalEvent: event });
  }

  public closePanel(event: Event): void {
    if (!this.panelVisible()) {
      return;
    }

    this.panelVisible.set(false);
    this.activePath.set([]);
    this.activeOptionPerLevel.set(new Map<number, unknown>());
    this.focusedItemId.set('');
    this.focusedLevel.set(0);
    this.onModelTouched();
    this.hide.emit({ originalEvent: event });
  }

  public clearSelection(event: Event): void {
    if (this.isDisabled() || this.loading()) {
      return;
    }

    this.internalValue.set(null);
    this.onModelChange(null);
    this.clear.emit();
    this.cascadeChange.emit({ originalEvent: event, value: null });
  }

  public onOptionInteraction(event: Event, level: number, option: unknown): void {
    if (this.isOptionDisabled(option)) {
      return;
    }

    this.setActiveOption(level, option, event);

    if (this.isOptionGroup(option, level)) {
      return;
    }

    const value: unknown = this.resolveOptionValue(option);
    this.internalValue.set(value);
    this.onModelChange(value);
    this.cascadeChange.emit({ originalEvent: event, value });
    this.closePanel(event);
  }

  public onOptionHover(level: number, option: unknown): void {
    if (!this.panelVisible() || this.isOptionDisabled(option)) {
      return;
    }

    this.setActiveOption(level, option, new Event('hover'));
  }

  public getOptionId(level: number, index: number): string {
    const option: unknown | undefined = this.getOptionsForLevel(level)[index];
    if (!option) {
      return `${this.cascadeSelectId}-item-${level}-${index}`;
    }
    return this.getItemId(option, level, index);
  }

  public getItemId(item: unknown, level: number, index?: number): string {
    const resolvedValue: unknown = this.resolveOptionValue(item);
    const baseValue: string = String(resolvedValue ?? this.resolveOptionLabel(item));
    const normalizedValue: string = baseValue
      .trim()
      .replace(/[^A-Za-z0-9_-]+/g, '-')
      .toLowerCase();
    const safeIndex: number = index ?? -1;
    return `${this.cascadeSelectId}-item-${level}-${safeIndex}-${normalizedValue || 'option'}`;
  }

  public isSubListOpen(item: unknown, level: number): boolean {
    const pathOption: unknown | undefined = this.activePath()[level];
    return pathOption === item;
  }

  public getLevelListboxId(level: number): string {
    return level === 0 ? this.listboxId : `${this.cascadeSelectId}-listbox-${level}`;
  }

  public getLevelAriaLabel(level: number): string {
    if (level === 0) {
      return this.resolvedPlaceholder();
    }

    const parent: unknown | undefined = this.activePath()[level - 1];
    if (!parent) {
      return this.resolvedPlaceholder();
    }
    return this.i18n.translate('cascade-select.sublevel-label', {
      label: this.resolveOptionLabel(parent),
    });
  }

  public optionTrackBy(index: number, option: unknown): string {
    return `${index}-${this.resolveOptionLabel(option)}`;
  }

  public isOptionActive(level: number, option: unknown): boolean {
    return this.activeOptionPerLevel().get(level) === option;
  }

  public isOptionSelected(option: unknown): boolean {
    const currentValue: unknown | null = this.internalValue();
    if (currentValue === null) {
      return false;
    }

    const isGroupOption: boolean = this.optionGroupChildren().some(
      (childrenKey: string, level: number): boolean =>
        Boolean(childrenKey) && this.isOptionGroup(option, level),
    );
    if (isGroupOption) {
      return false;
    }

    return this.matchesValue(option, currentValue);
  }

  public isOptionGroupAtLevel(option: unknown, level: number): boolean {
    return this.isOptionGroup(option, level);
  }

  public resolveOptionLabel(option: unknown): string {
    if (option === null || option === undefined) {
      return '';
    }

    if (typeof option !== 'object') {
      return String(option);
    }

    const optionRecord: Record<string, unknown> = option as Record<string, unknown>;
    const usesGroupLabel: boolean = this.optionGroupChildren().some(
      (childrenKey: string, level: number): boolean =>
        Boolean(childrenKey) && this.isOptionGroup(option, level),
    );
    const preferredKey: string = usesGroupLabel ? this.optionGroupLabel() : this.optionLabel();
    const preferredValue: unknown = optionRecord[preferredKey];

    if (preferredValue !== undefined && preferredValue !== null) {
      return String(preferredValue);
    }

    const fallbackKey: string = usesGroupLabel ? this.optionLabel() : this.optionGroupLabel();
    const fallbackValue: unknown = optionRecord[fallbackKey];

    if (fallbackValue !== undefined && fallbackValue !== null) {
      return String(fallbackValue);
    }

    return String(option);
  }

  public resolveOptionValue(option: unknown): unknown {
    const valueKey: string | undefined = this.optionValue();
    if (!valueKey) {
      return option;
    }

    const optionRecord: Record<string, unknown> | null = this.toRecord(option);
    if (!optionRecord) {
      return option;
    }

    return optionRecord[valueKey] ?? option;
  }

  public isOptionGroup(option: unknown, level: number): boolean {
    const childrenKey: string | undefined = this.optionGroupChildren()[level];
    if (!childrenKey) {
      return false;
    }

    const optionRecord: Record<string, unknown> | null = this.toRecord(option);
    if (!optionRecord) {
      return false;
    }

    const children: unknown = optionRecord[childrenKey];
    return Array.isArray(children) && children.length > 0;
  }

  public getOptionChildren(option: unknown, level: number): unknown[] {
    const childrenKey: string | undefined = this.optionGroupChildren()[level];
    if (!childrenKey) {
      return [];
    }

    const optionRecord: Record<string, unknown> | null = this.toRecord(option);
    if (!optionRecord) {
      return [];
    }

    const children: unknown = optionRecord[childrenKey];
    return Array.isArray(children) ? children : [];
  }

  public isOptionDisabled(option: unknown): boolean {
    const disabledKey: string | undefined = this.optionDisabled();
    if (!disabledKey) {
      return false;
    }

    const optionRecord: Record<string, unknown> | null = this.toRecord(option);
    if (!optionRecord) {
      return false;
    }

    return optionRecord[disabledKey] === true;
  }

  public findOptionByValue(value: unknown): unknown | null {
    if (value === null || value === undefined) {
      return null;
    }

    return this.findOptionByValueInLevel(this.options(), value, 0);
  }

  public getOptionPath(targetOption: unknown): unknown[] {
    return this.getOptionPathInLevel(this.options(), targetOption, 0, []);
  }

  public ngAfterViewChecked(): void {
    if (!this.panelVisible()) {
      return;
    }

    this.syncPanelMount();
  }

  public ngOnDestroy(): void {
    const panel: HTMLElement | null = this.panelElement()?.nativeElement ?? null;
    if (panel?.isConnected) {
      panel.remove();
    }
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    if (!this.panelVisible()) {
      return;
    }

    const target: Node | null = event.target as Node | null;
    if (!target) {
      return;
    }

    const clickedInsideHost: boolean = this.hostElement.nativeElement.contains(target);
    const panel: HTMLElement | null = this.panelElement()?.nativeElement ?? null;
    const clickedInsidePanel: boolean = panel?.contains(target) === true;
    if (!clickedInsideHost && !clickedInsidePanel) {
      this.closePanel(event);
    }
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    this.positionMountedPanel();
  }

  @HostListener('window:scroll')
  public onWindowScroll(): void {
    this.positionMountedPanel();
  }

  // focus/blur are wired imperatively to avoid the Angular HostListener + output
  // naming conflict: when both @HostListener('blur') and output<FocusEvent>() named
  // 'blur' exist on the same element, Angular creates a circular dispatch loop.
  // Imperative addEventListener bypasses the Angular event-binding system entirely.
  public onHostFocus(event: FocusEvent): void {
    this.cascadeSelectFocus.emit(event);
  }

  public onHostBlur(event: FocusEvent): void {
    this.onModelTouched();
    this.cascadeSelectBlur.emit(event);
  }

  public onKeydown(event: KeyboardEvent): void {
    if (this.isDisabled() || this.loading()) {
      return;
    }

    switch (event.key) {
      case KEYBOARD_KEYS.Enter:
      case KEYBOARD_KEYS.Space: {
        event.preventDefault();
        if (!this.panelVisible()) {
          this.openPanel(event);
          return;
        }
        this.activateFocusedOption(event);
        return;
      }
      case KEYBOARD_KEYS.ArrowDown:
        event.preventDefault();
        if (!this.panelVisible()) {
          this.openPanel(event);
          return;
        }
        this.moveFocus(event, 1);
        return;
      case KEYBOARD_KEYS.ArrowUp:
        event.preventDefault();
        if (!this.panelVisible()) {
          this.openPanel(event);
          return;
        }
        this.moveFocus(event, -1);
        return;
      case KEYBOARD_KEYS.ArrowRight:
        if (!this.panelVisible()) {
          return;
        }
        event.preventDefault();
        this.expandFocusedGroup(event);
        return;
      case KEYBOARD_KEYS.ArrowLeft:
        if (!this.panelVisible()) {
          return;
        }
        event.preventDefault();
        this.moveToParentLevel(event);
        return;
      case KEYBOARD_KEYS.Escape:
        if (!this.panelVisible()) {
          return;
        }
        event.preventDefault();
        this.closePanel(event);
        return;
      case KEYBOARD_KEYS.Tab:
        if (this.panelVisible()) {
          this.closePanel(event);
        }
        return;
      case KEYBOARD_KEYS.Home:
        if (!this.panelVisible()) {
          return;
        }
        event.preventDefault();
        this.setFirstEnabledInCurrentLevel(event);
        return;
      case KEYBOARD_KEYS.End:
        if (!this.panelVisible()) {
          return;
        }
        event.preventDefault();
        this.setLastEnabledInCurrentLevel(event);
        return;
      default:
        return;
    }
  }

  private initializeNavigationFromValue(): void {
    const selectedOption: unknown | null = this.selectedOption();
    if (!selectedOption) {
      this.initializeNavigationFromRoot();
      return;
    }

    const pathToSelectedOption: unknown[] = this.getOptionPath(selectedOption);
    const activeMap: Map<number, unknown> = new Map<number, unknown>();

    pathToSelectedOption.forEach((option: unknown, level: number): void => {
      activeMap.set(level, option);
    });

    const groupPath: unknown[] = pathToSelectedOption.filter(
      (option: unknown, level: number): boolean => this.isOptionGroup(option, level),
    );

    this.activeOptionPerLevel.set(activeMap);
    this.activePath.set(groupPath);
    this.focusedLevel.set(Math.max(0, pathToSelectedOption.length - 1));
    this.syncFocusedItemIdFromActiveMap();
  }

  private initializeNavigationFromRoot(): void {
    const firstEnabledOption: unknown | null = this.findFirstEnabledOption(0);
    const activeMap: Map<number, unknown> = new Map<number, unknown>();

    if (firstEnabledOption !== null) {
      activeMap.set(0, firstEnabledOption);
    }

    this.activeOptionPerLevel.set(activeMap);
    this.activePath.set([]);
    this.focusedLevel.set(0);
    this.syncFocusedItemIdFromActiveMap();
  }

  private setActiveOption(level: number, option: unknown, event: Event): void {
    const nextActiveMap: Map<number, unknown> = new Map<number, unknown>(
      this.activeOptionPerLevel(),
    );
    nextActiveMap.set(level, option);
    this.removeLevelsAfter(nextActiveMap, level);

    this.activeOptionPerLevel.set(nextActiveMap);
    this.focusedLevel.set(level);
    this.focusedItemId.set(this.resolveItemIdAtLevel(option, level));

    const nextPath: unknown[] = this.buildGroupPathFromMap(nextActiveMap);
    this.activePath.set(nextPath);

    if (this.isOptionGroup(option, level)) {
      this.groupChange.emit({ originalEvent: event, level, value: option });
    }
  }

  private moveFocus(event: KeyboardEvent, delta: number): void {
    const currentLevel: number = this.focusedLevel();
    const currentOptions: unknown[] = this.getOptionsForLevel(currentLevel);
    if (!currentOptions.length) {
      return;
    }

    const currentActiveOption: unknown | undefined = this.activeOptionPerLevel().get(currentLevel);
    const currentIndex: number = currentActiveOption
      ? currentOptions.findIndex((option: unknown): boolean => option === currentActiveOption)
      : -1;

    let attempts: number = 0;
    let nextIndex: number = currentIndex;

    do {
      nextIndex = (nextIndex + delta + currentOptions.length) % currentOptions.length;
      attempts += 1;

      if (!this.isOptionDisabled(currentOptions[nextIndex])) {
        this.setActiveOption(currentLevel, currentOptions[nextIndex], event);
        return;
      }
    } while (attempts <= currentOptions.length);
  }

  private activateFocusedOption(event: KeyboardEvent): void {
    const currentLevel: number = this.focusedLevel();
    const focusedOption: unknown | null = this.getFocusedOption(currentLevel);
    if (!focusedOption) {
      return;
    }

    if (this.isOptionGroup(focusedOption, currentLevel)) {
      this.expandFocusedGroup(event);
      return;
    }

    this.onOptionInteraction(event, currentLevel, focusedOption);
  }

  private expandFocusedGroup(event: KeyboardEvent): void {
    const currentLevel: number = this.focusedLevel();
    const focusedOption: unknown | null = this.getFocusedOption(currentLevel);
    if (!focusedOption || !this.isOptionGroup(focusedOption, currentLevel)) {
      return;
    }

    this.setActiveOption(currentLevel, focusedOption, event);

    const childLevel: number = currentLevel + 1;
    const firstEnabledChildOption: unknown | null = this.findFirstEnabledOption(childLevel);
    if (!firstEnabledChildOption) {
      return;
    }

    this.setActiveOption(childLevel, firstEnabledChildOption, event);
    // During ArrowRight navigation, if the first child is also a group, keep that child level
    // collapsed so one key press advances exactly one level.
    if (this.isOptionGroup(firstEnabledChildOption, childLevel)) {
      this.activePath.set(this.activePath().slice(0, childLevel));
    }
  }

  private moveToParentLevel(event: KeyboardEvent): void {
    const currentLevel: number = this.focusedLevel();
    if (currentLevel <= 0) {
      return;
    }

    const parentLevel: number = currentLevel - 1;
    const nextActiveMap: Map<number, unknown> = new Map<number, unknown>(
      this.activeOptionPerLevel(),
    );
    this.removeLevelsAfter(nextActiveMap, parentLevel);

    this.activeOptionPerLevel.set(nextActiveMap);
    this.focusedLevel.set(parentLevel);
    const nextPath: unknown[] = this.buildGroupPathFromMap(nextActiveMap);
    const parentOption: unknown | undefined = nextActiveMap.get(parentLevel);
    // Exclude the parent group from activePath so moving left collapses its child list.
    if (parentOption && this.isOptionGroup(parentOption, parentLevel)) {
      this.activePath.set(nextPath.slice(0, parentLevel));
    } else {
      this.activePath.set(nextPath);
    }

    if (parentOption) {
      this.groupChange.emit({ originalEvent: event, level: parentLevel, value: parentOption });
    }
  }

  private setFirstEnabledInCurrentLevel(event: KeyboardEvent): void {
    const currentLevel: number = this.focusedLevel();
    const firstEnabledOption: unknown | null = this.findFirstEnabledOption(currentLevel);
    if (firstEnabledOption !== null) {
      this.setActiveOption(currentLevel, firstEnabledOption, event);
    }
  }

  private setLastEnabledInCurrentLevel(event: KeyboardEvent): void {
    const currentLevel: number = this.focusedLevel();
    const lastEnabledOption: unknown | null = this.findLastEnabledOption(currentLevel);
    if (lastEnabledOption !== null) {
      this.setActiveOption(currentLevel, lastEnabledOption, event);
    }
  }

  private syncFocusedItemIdFromActiveMap(): void {
    const level: number = this.focusedLevel();
    const activeOption: unknown | undefined = this.activeOptionPerLevel().get(level);
    if (!activeOption) {
      this.focusedItemId.set('');
      return;
    }
    this.focusedItemId.set(this.resolveItemIdAtLevel(activeOption, level));
  }

  private resolveItemIdAtLevel(item: unknown, level: number): string {
    const itemIndex: number = this.getOptionsForLevel(level).findIndex(
      (candidate: unknown): boolean => candidate === item,
    );
    return this.getItemId(item, level, itemIndex >= 0 ? itemIndex : undefined);
  }

  private findFirstEnabledOption(level: number): unknown | null {
    const levelOptions: unknown[] = this.getOptionsForLevel(level);
    for (let index: number = 0; index < levelOptions.length; index += 1) {
      if (!this.isOptionDisabled(levelOptions[index])) {
        return levelOptions[index];
      }
    }
    return null;
  }

  private findLastEnabledOption(level: number): unknown | null {
    const levelOptions: unknown[] = this.getOptionsForLevel(level);
    for (let index: number = levelOptions.length - 1; index >= 0; index -= 1) {
      if (!this.isOptionDisabled(levelOptions[index])) {
        return levelOptions[index];
      }
    }
    return null;
  }

  private getFocusedOption(level: number): unknown | null {
    const activeOption: unknown | undefined = this.activeOptionPerLevel().get(level);
    if (activeOption) {
      return activeOption;
    }

    return this.findFirstEnabledOption(level);
  }

  private getOptionsForLevel(level: number): unknown[] {
    if (level === 0) {
      return this.options();
    }

    const parentOption: unknown | undefined = this.activePath()[level - 1];
    if (!parentOption) {
      return [];
    }

    return this.getOptionChildren(parentOption, level - 1);
  }

  private buildGroupPathFromMap(activeMap: Map<number, unknown>): unknown[] {
    const path: unknown[] = [];

    for (let level: number = 0; level <= activeMap.size; level += 1) {
      const option: unknown | undefined = activeMap.get(level);
      if (!option || !this.isOptionGroup(option, level)) {
        break;
      }
      path.push(option);
    }

    return path;
  }

  private removeLevelsAfter(activeMap: Map<number, unknown>, level: number): void {
    Array.from(activeMap.keys()).forEach((currentLevel: number): void => {
      if (currentLevel > level) {
        activeMap.delete(currentLevel);
      }
    });
  }

  private findOptionByValueInLevel(
    options: unknown[],
    value: unknown,
    level: number,
  ): unknown | null {
    for (let index: number = 0; index < options.length; index += 1) {
      const option: unknown = options[index];

      if (this.matchesValue(option, value)) {
        return option;
      }

      if (!this.isOptionGroup(option, level)) {
        continue;
      }

      const matchedChildOption: unknown | null = this.findOptionByValueInLevel(
        this.getOptionChildren(option, level),
        value,
        level + 1,
      );

      if (matchedChildOption !== null) {
        return matchedChildOption;
      }
    }

    return null;
  }

  private getOptionPathInLevel(
    options: unknown[],
    targetOption: unknown,
    level: number,
    path: unknown[],
  ): unknown[] {
    for (let index: number = 0; index < options.length; index += 1) {
      const option: unknown = options[index];
      const nextPath: unknown[] = [...path, option];

      if (option === targetOption) {
        return nextPath;
      }

      if (!this.isOptionGroup(option, level)) {
        continue;
      }

      const childPath: unknown[] = this.getOptionPathInLevel(
        this.getOptionChildren(option, level),
        targetOption,
        level + 1,
        nextPath,
      );

      if (childPath.length > 0) {
        return childPath;
      }
    }

    return [];
  }

  private matchesValue(option: unknown, value: unknown): boolean {
    const resolvedOptionValue: unknown = this.resolveOptionValue(option);
    const optionValueKey: string | undefined = this.optionValue();

    if (!optionValueKey) {
      return Object.is(resolvedOptionValue, value);
    }

    const candidateValue: unknown = this.extractValueFromMaybeObject(value, optionValueKey);
    return Object.is(resolvedOptionValue, candidateValue);
  }

  private extractValueFromMaybeObject(value: unknown, key: string): unknown {
    const valueRecord: Record<string, unknown> | null = this.toRecord(value);
    if (!valueRecord) {
      return value;
    }

    return valueRecord[key] ?? value;
  }

  private toRecord(value: unknown): Record<string, unknown> | null {
    if (value === null || typeof value !== 'object') {
      return null;
    }

    return value as Record<string, unknown>;
  }

  private syncPanelMount(): void {
    const panel: HTMLElement | null = this.panelElement()?.nativeElement ?? null;
    if (!panel) {
      return;
    }

    const mountTarget: HTMLElement | null = this.resolveAppendTarget();
    if (!mountTarget) {
      this.mountPanelToHost(panel);
      return;
    }

    if (panel.parentElement !== mountTarget) {
      mountTarget.appendChild(panel);
    }

    this.syncPanelClasses(panel, this.effectiveVariant());
    this.syncPanelCssVariables(panel);
    panel.classList.add('ui-lib-cascade-select__panel--overlay');
    claimOverlayZIndex(panel);
    this.positionMountedPanel();
  }

  private mountPanelToHost(panel: HTMLElement): void {
    const host: HTMLElement = this.hostElement.nativeElement;
    if (panel.parentElement !== host) {
      host.appendChild(panel);
    }

    panel.classList.remove('ui-lib-cascade-select__panel--overlay');
    this.clearPanelModeClasses(panel);
    panel.style.removeProperty('position');
    panel.style.removeProperty('top');
    panel.style.removeProperty('left');
    panel.style.removeProperty('width');
    releaseOverlayZIndex(panel);
    this.clearPanelCssVariables(panel);
  }

  private resolveAppendTarget(): HTMLElement | null {
    return resolveOverlayAppendTarget(this.appendTo(), this.documentRef);
  }

  private positionMountedPanel(): void {
    if (!this.panelVisible()) {
      return;
    }

    const panel: HTMLElement | null = this.panelElement()?.nativeElement ?? null;
    const trigger: HTMLElement | null = this.triggerElement()?.nativeElement ?? null;
    if (!panel || !trigger || !panel.classList.contains('ui-lib-cascade-select__panel--overlay')) {
      return;
    }

    const rect: DOMRect = trigger.getBoundingClientRect();
    const viewportWidth: number =
      this.documentRef.defaultView?.innerWidth ?? this.documentRef.documentElement.clientWidth;
    const viewportHeight: number =
      this.documentRef.defaultView?.innerHeight ?? this.documentRef.documentElement.clientHeight;

    const viewportPadding: number = 8;
    const offset: number = 6;
    const preferredWidth: number = Math.max(
      rect.width,
      this.parsePixelValue(
        this.resolveCssVariableValue('--uilib-cascade-select-panel-min-width', '200'),
        200,
      ),
    );
    const maxWidth: number = Math.max(0, viewportWidth - viewportPadding * 2);
    const panelWidth: number = Math.min(preferredWidth, maxWidth);
    const maxHeight: number = this.parsePixelValue(
      this.resolveCssVariableValue('--uilib-cascade-select-panel-max-height', '260'),
      260,
    );
    const availableBelow: number = viewportHeight - rect.bottom - offset - viewportPadding;
    const availableAbove: number = rect.top - offset - viewportPadding;
    const useAbove: boolean =
      availableBelow < Math.min(maxHeight, 180) && availableAbove > availableBelow;
    const safeLeft: number = Math.min(
      Math.max(viewportPadding, rect.left),
      Math.max(viewportPadding, viewportWidth - panelWidth - viewportPadding),
    );

    panel.style.position = 'fixed';
    panel.style.left = `${safeLeft}px`;
    panel.style.width = `${panelWidth}px`;
    panel.style.top = useAbove
      ? `${Math.max(viewportPadding, rect.top - offset - maxHeight)}px`
      : `${Math.min(viewportHeight - viewportPadding, rect.bottom + offset)}px`;
  }

  private syncPanelClasses(panel: HTMLElement, variant: CascadeSelectVariant): void {
    this.clearPanelModeClasses(panel);
    panel.classList.add(`ui-lib-cascade-select__panel--${variant}`);
  }

  private syncPanelCssVariables(panel: HTMLElement): void {
    const windowRef: Window | null = this.documentRef.defaultView;
    if (!windowRef) {
      return;
    }

    const hostStyles: CSSStyleDeclaration = windowRef.getComputedStyle(
      this.hostElement.nativeElement,
    );
    for (let index: number = 0; index < hostStyles.length; index += 1) {
      const name: string = hostStyles.item(index);
      if (!name.startsWith('--uilib-cascade-select-')) {
        continue;
      }

      const value: string = hostStyles.getPropertyValue(name);
      panel.style.setProperty(name, value);
    }
  }

  private clearPanelCssVariables(panel: HTMLElement): void {
    for (let index: number = panel.style.length - 1; index >= 0; index -= 1) {
      const name: string = panel.style.item(index);
      if (name.startsWith('--uilib-cascade-select-')) {
        panel.style.removeProperty(name);
      }
    }
  }

  private clearPanelModeClasses(panel: HTMLElement): void {
    CASCADE_SELECT_PANEL_MODE_CLASSES.forEach((panelModeClass: string): void => {
      panel.classList.remove(panelModeClass);
    });
  }

  private resolveCssVariableValue(variableName: string, fallback: string): string {
    const windowRef: Window | null = this.documentRef.defaultView;
    if (!windowRef) {
      return fallback;
    }

    const rawValue: string = windowRef
      .getComputedStyle(this.hostElement.nativeElement)
      .getPropertyValue(variableName)
      .trim();
    return rawValue || fallback;
  }

  private parsePixelValue(value: string, fallback: number): number {
    const parsed: number = Number.parseInt(value, 10);
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
    return fallback;
  }
}
