import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewEncapsulation,
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
import { KEYBOARD_KEYS } from 'ui-lib-custom/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import {
  CASCADE_SELECT_CLASSNAMES,
  CASCADE_SELECT_DEFAULTS,
  CASCADE_SELECT_IDS,
} from './cascade-select.constants';
import type {
  CascadeSelectChangeEvent,
  CascadeSelectGroupChangeEvent,
  CascadeSelectHideEvent,
  CascadeSelectShowEvent,
  CascadeSelectSize,
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

export type {
  CascadeSelectVariant,
  CascadeSelectSize,
  CascadeSelectChangeEvent,
  CascadeSelectShowEvent,
  CascadeSelectHideEvent,
  CascadeSelectGroupChangeEvent,
} from './cascade-select.types';

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
    '[attr.aria-haspopup]': '"tree"',
    '[attr.aria-controls]': 'panelVisible() ? panelId() : null',
    '[attr.aria-activedescendant]': 'activeDescendantId() || null',
    '[attr.aria-disabled]': 'isDisabled() || loading() ? "true" : null',
    '[attr.aria-invalid]': 'invalid() ? "true" : null',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-labelledby]': 'ariaLabelledBy() || null',
    '[attr.tabindex]': 'isDisabled() || loading() ? -1 : tabindex()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class UiLibCascadeSelect implements ControlValueAccessor, AfterViewChecked, OnDestroy {
  public readonly options: InputSignal<unknown[]> = input<unknown[]>([]);
  public readonly optionLabel: InputSignal<string> = input<string>('label');
  public readonly optionValue: InputSignal<string | undefined> = input<string | undefined>(
    undefined
  );
  public readonly optionGroupLabel: InputSignal<string> = input<string>('label');
  public readonly optionGroupChildren: InputSignal<string[]> = input<string[]>([]);
  public readonly optionDisabled: InputSignal<string | undefined> = input<string | undefined>(
    undefined
  );
  public readonly placeholder: InputSignal<string> = input<string>(
    CASCADE_SELECT_DEFAULTS.Placeholder
  );
  public readonly variant: InputSignal<CascadeSelectVariant | undefined> = input<
    CascadeSelectVariant | undefined
  >(undefined);
  public readonly size: InputSignal<CascadeSelectSize> = input<CascadeSelectSize>(
    CASCADE_SELECT_DEFAULTS.Size
  );
  public readonly disabled: InputSignal<boolean> = input<boolean>(false);
  public readonly invalid: InputSignal<boolean> = input<boolean>(false);
  public readonly loading: InputSignal<boolean> = input<boolean>(false);
  public readonly showClear: InputSignal<boolean> = input<boolean>(false);
  public readonly fluid: InputSignal<boolean> = input<boolean>(false);
  public readonly filled: InputSignal<boolean> = input<boolean>(false);
  public readonly tabindex: InputSignal<number> = input<number>(0);
  public readonly inputId: InputSignal<string> = input<string>('');
  public readonly appendTo: InputSignal<string | HTMLElement | undefined> = input<
    string | HTMLElement | undefined
  >('body');
  public readonly ariaLabel: InputSignal<string | null> = input<string | null>(null);
  public readonly ariaLabelledBy: InputSignal<string | null> = input<string | null>(null);

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onChange: OutputEmitterRef<CascadeSelectChangeEvent> =
    output<CascadeSelectChangeEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onGroupChange: OutputEmitterRef<CascadeSelectGroupChangeEvent> =
    output<CascadeSelectGroupChangeEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onShow: OutputEmitterRef<CascadeSelectShowEvent> =
    output<CascadeSelectShowEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onHide: OutputEmitterRef<CascadeSelectHideEvent> =
    output<CascadeSelectHideEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onClear: OutputEmitterRef<void> = output<void>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onFocus: OutputEmitterRef<FocusEvent> = output<FocusEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onBlur: OutputEmitterRef<FocusEvent> = output<FocusEvent>();

  public readonly optionTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    CascadeSelectOptionDirective,
    { read: TemplateRef }
  );
  public readonly valueTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    CascadeSelectValueDirective,
    { read: TemplateRef }
  );
  public readonly dropdownIconTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    CascadeSelectDropdownIconDirective,
    { read: TemplateRef }
  );
  public readonly optionGroupIconTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    CascadeSelectOptionGroupIconDirective,
    { read: TemplateRef }
  );
  public readonly headerTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    CascadeSelectHeaderDirective,
    { read: TemplateRef }
  );
  public readonly footerTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    CascadeSelectFooterDirective,
    { read: TemplateRef }
  );
  public readonly loadingTemplate: Signal<TemplateRef<unknown> | undefined> = contentChild(
    CascadeSelectLoadingDirective,
    { read: TemplateRef }
  );

  public readonly panelVisible: WritableSignal<boolean> = signal<boolean>(false);
  public readonly activePath: WritableSignal<unknown[]> = signal<unknown[]>([]);
  public readonly activeOptionPerLevel: WritableSignal<Map<number, unknown>> = signal<
    Map<number, unknown>
  >(new Map<number, unknown>());
  public readonly internalValue: WritableSignal<unknown | null> = signal<unknown | null>(null);

  private readonly focusedLevel: WritableSignal<number> = signal<number>(0);
  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);
  private readonly hostElement: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly documentRef: Document = inject(DOCUMENT);
  private readonly triggerElement: Signal<ElementRef<HTMLElement> | undefined> = viewChild(
    'triggerElement',
    { read: ElementRef }
  );
  private readonly panelElement: Signal<ElementRef<HTMLElement> | undefined> = viewChild(
    'panelElement',
    { read: ElementRef }
  );

  private readonly uniqueIdValue: string = `${CASCADE_SELECT_IDS.Prefix}-${++cascadeSelectIdCounter}`;

  private onModelChange: (value: unknown) => void = (): void => {};
  private onModelTouched: () => void = (): void => {};

  public readonly controlId: Signal<string> = computed<string>((): string => {
    const id: string = this.inputId().trim();
    return id || `${this.uniqueIdValue}-control`;
  });

  public readonly panelId: Signal<string> = computed<string>(
    (): string => `${this.uniqueIdValue}-panel`
  );

  public readonly effectiveVariant: Signal<CascadeSelectVariant> = computed<CascadeSelectVariant>(
    (): CascadeSelectVariant => this.variant() ?? this.themeConfig.variant()
  );

  public readonly isDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.cvaDisabled()
  );

  public readonly selectedOption: Signal<unknown | null> = computed<unknown | null>(
    (): unknown | null => this.findOptionByValue(this.internalValue())
  );

  public readonly displayValue: Signal<string> = computed<string>((): string => {
    const selectedOption: unknown | null = this.selectedOption();
    if (selectedOption === null) {
      return '';
    }
    return this.resolveOptionLabel(selectedOption);
  });

  public readonly hasValue: Signal<boolean> = computed<boolean>(
    (): boolean => this.selectedOption() !== null
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
    (): string | null => {
      if (!this.panelVisible()) {
        return null;
      }

      const currentLevel: number = this.focusedLevel();
      const currentOptions: unknown[] = this.getOptionsForLevel(currentLevel);
      const currentActiveOption: unknown | undefined =
        this.activeOptionPerLevel().get(currentLevel);
      if (!currentActiveOption) {
        return null;
      }

      const currentIndex: number = currentOptions.findIndex(
        (option: unknown): boolean => option === currentActiveOption
      );
      if (currentIndex < 0) {
        return null;
      }

      return this.getOptionId(currentLevel, currentIndex);
    }
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
    if (this.panelVisible()) classes.push(CASCADE_SELECT_CLASSNAMES.Open);

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
    this.onShow.emit({ originalEvent: event });
  }

  public closePanel(event: Event): void {
    if (!this.panelVisible()) {
      return;
    }

    this.panelVisible.set(false);
    this.activePath.set([]);
    this.activeOptionPerLevel.set(new Map<number, unknown>());
    this.focusedLevel.set(0);
    this.onModelTouched();
    this.onHide.emit({ originalEvent: event });
  }

  public clearSelection(event: Event): void {
    if (this.isDisabled() || this.loading()) {
      return;
    }

    this.internalValue.set(null);
    this.onModelChange(null);
    this.onClear.emit();
    this.onChange.emit({ originalEvent: event, value: null });
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
    this.onChange.emit({ originalEvent: event, value });
    this.closePanel(event);
  }

  public onOptionHover(level: number, option: unknown): void {
    if (!this.panelVisible() || this.isOptionDisabled(option)) {
      return;
    }

    this.setActiveOption(level, option, new Event('hover'));
  }

  public getOptionId(level: number, index: number): string {
    return `${this.uniqueIdValue}-option-${level}-${index}`;
  }

  public getLevelRole(level: number): 'tree' | 'group' {
    return level === 0 ? 'tree' : 'group';
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
        Boolean(childrenKey) && this.isOptionGroup(option, level)
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
        Boolean(childrenKey) && this.isOptionGroup(option, level)
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

  @HostListener('focus', ['$event'])
  public onHostFocus(event: FocusEvent): void {
    this.onFocus.emit(event);
  }

  @HostListener('blur', ['$event'])
  public onHostBlur(event: FocusEvent): void {
    this.onBlur.emit(event);
    this.onModelTouched();
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
      (option: unknown, level: number): boolean => this.isOptionGroup(option, level)
    );

    this.activeOptionPerLevel.set(activeMap);
    this.activePath.set(groupPath);
    this.focusedLevel.set(Math.max(0, pathToSelectedOption.length - 1));
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
  }

  private setActiveOption(level: number, option: unknown, event: Event): void {
    const nextActiveMap: Map<number, unknown> = new Map<number, unknown>(
      this.activeOptionPerLevel()
    );
    nextActiveMap.set(level, option);
    this.removeLevelsAfter(nextActiveMap, level);

    this.activeOptionPerLevel.set(nextActiveMap);
    this.focusedLevel.set(level);

    const nextPath: unknown[] = this.buildGroupPathFromMap(nextActiveMap);
    this.activePath.set(nextPath);

    if (this.isOptionGroup(option, level)) {
      this.onGroupChange.emit({ originalEvent: event, level, value: option });
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
  }

  private moveToParentLevel(event: KeyboardEvent): void {
    const currentLevel: number = this.focusedLevel();
    if (currentLevel <= 0) {
      return;
    }

    const parentLevel: number = currentLevel - 1;
    const nextActiveMap: Map<number, unknown> = new Map<number, unknown>(
      this.activeOptionPerLevel()
    );
    this.removeLevelsAfter(nextActiveMap, parentLevel);

    this.activeOptionPerLevel.set(nextActiveMap);
    this.focusedLevel.set(parentLevel);
    this.activePath.set(this.buildGroupPathFromMap(nextActiveMap));

    const parentOption: unknown | undefined = nextActiveMap.get(parentLevel);
    if (parentOption) {
      this.onGroupChange.emit({ originalEvent: event, level: parentLevel, value: parentOption });
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
    level: number
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
        level + 1
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
    path: unknown[]
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
        nextPath
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
    this.clearPanelCssVariables(panel);
  }

  private resolveAppendTarget(): HTMLElement | null {
    const appendTarget: string | HTMLElement | undefined = this.appendTo();
    if (appendTarget === undefined) {
      return null;
    }

    if (appendTarget instanceof HTMLElement) {
      return appendTarget;
    }

    const normalizedTarget: string = appendTarget.trim();
    if (!normalizedTarget || normalizedTarget === 'self') {
      return null;
    }

    if (normalizedTarget === 'body') {
      return this.documentRef.body;
    }

    return this.documentRef.querySelector<HTMLElement>(normalizedTarget);
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
        200
      )
    );
    const maxWidth: number = Math.max(0, viewportWidth - viewportPadding * 2);
    const panelWidth: number = Math.min(preferredWidth, maxWidth);
    const maxHeight: number = this.parsePixelValue(
      this.resolveCssVariableValue('--uilib-cascade-select-panel-max-height', '260'),
      260
    );
    const availableBelow: number = viewportHeight - rect.bottom - offset - viewportPadding;
    const availableAbove: number = rect.top - offset - viewportPadding;
    const useAbove: boolean =
      availableBelow < Math.min(maxHeight, 180) && availableAbove > availableBelow;
    const safeLeft: number = Math.min(
      Math.max(viewportPadding, rect.left),
      Math.max(viewportPadding, viewportWidth - panelWidth - viewportPadding)
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
      this.hostElement.nativeElement
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
