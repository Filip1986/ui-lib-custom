import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  ViewChild,
  ViewEncapsulation,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import type { InputSignal, OutputEmitterRef, Signal, WritableSignal } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { ControlValueAccessor } from '@angular/forms';
import { KEYBOARD_KEYS } from 'ui-lib-custom/core';
import { ThemeConfigService } from 'ui-lib-custom/theme';
import {
  COLOR_PICKER_CLASSNAMES,
  COLOR_PICKER_DEFAULTS,
  COLOR_PICKER_IDS,
  COLOR_PICKER_KEYBOARD_STEPS,
  COLOR_PICKER_LIMITS,
} from './color-picker.constants';
import { clamp, formatColorValue, hsbToHex, toHsbColor } from './color-utils';
import type {
  ColorFormat,
  ColorPickerAppendTo,
  ColorPickerChangeEvent,
  ColorPickerValue,
  ColorPickerVariant,
  HsbColor,
} from './color-picker.types';

export type {
  ColorFormat,
  ColorPickerMode,
  ColorPickerVariant,
  RgbColor,
  HsbColor,
  ColorPickerValue,
  ColorPickerChangeEvent,
} from './color-picker.types';

let colorPickerIdCounter: number = 0;

type DragTarget = 'color' | 'hue' | null;
type PanelPlacement = 'below' | 'above';

@Component({
  selector: 'ui-lib-color-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './color-picker.html',
  styleUrl: './color-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof ColorPicker => ColorPicker),
      multi: true,
    },
  ],
  host: {
    class: COLOR_PICKER_CLASSNAMES.Root,
    '[class.ui-lib-colorpicker--inline]': 'inline()',
    '[class.ui-lib-colorpicker--disabled]': 'isDisabled()',
    '[class.ui-lib-colorpicker--material]': 'resolvedVariant() === "material"',
    '[class.ui-lib-colorpicker--bootstrap]': 'resolvedVariant() === "bootstrap"',
    '[class.ui-lib-colorpicker--minimal]': 'resolvedVariant() === "minimal"',
    '[class.ui-lib-colorpicker--open]': 'panelVisible()',
    '[attr.aria-disabled]': 'isDisabled() ? "true" : null',
  },
})
/**
 * Color picker component supporting popup and inline modes with CVA integration.
 */
// eslint-disable-next-line jsdoc/require-jsdoc
export class ColorPicker implements ControlValueAccessor {
  public readonly value: InputSignal<ColorPickerValue> = input<ColorPickerValue>(null);
  public readonly format: InputSignal<ColorFormat> = input<ColorFormat>(
    COLOR_PICKER_DEFAULTS.Format
  );
  public readonly inline: InputSignal<boolean> = input<boolean>(COLOR_PICKER_DEFAULTS.Inline);
  public readonly variant: InputSignal<ColorPickerVariant | null> =
    input<ColorPickerVariant | null>(null);
  public readonly disabled: InputSignal<boolean> = input<boolean>(COLOR_PICKER_DEFAULTS.Disabled);
  public readonly inputId: InputSignal<string> = input<string>(COLOR_PICKER_DEFAULTS.InputId);
  public readonly tabindex: InputSignal<number> = input<number>(COLOR_PICKER_DEFAULTS.TabIndex);
  public readonly appendTo: InputSignal<ColorPickerAppendTo> = input<ColorPickerAppendTo>(
    COLOR_PICKER_DEFAULTS.AppendTo
  );

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onChange: OutputEmitterRef<ColorPickerChangeEvent> =
    output<ColorPickerChangeEvent>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onShow: OutputEmitterRef<void> = output<void>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public readonly onHide: OutputEmitterRef<void> = output<void>();

  @ViewChild('triggerButton', { static: false })
  public triggerButton?: ElementRef<HTMLButtonElement>;
  @ViewChild('panelElement', { static: false }) public panelElement?: ElementRef<HTMLDivElement>;
  @ViewChild('colorAreaElement', { static: false })
  public colorAreaElement?: ElementRef<HTMLDivElement>;
  @ViewChild('hueElement', { static: false }) public hueElement?: ElementRef<HTMLDivElement>;

  public readonly hue: WritableSignal<number> = signal<number>(COLOR_PICKER_DEFAULTS.InitialHue);
  public readonly saturation: WritableSignal<number> = signal<number>(
    COLOR_PICKER_DEFAULTS.InitialSaturation
  );
  public readonly brightness: WritableSignal<number> = signal<number>(
    COLOR_PICKER_DEFAULTS.InitialBrightness
  );
  public readonly panelVisible: WritableSignal<boolean> = signal<boolean>(false);
  public readonly panelPlacement: WritableSignal<PanelPlacement> = signal<PanelPlacement>('below');

  private readonly cvaDisabled: WritableSignal<boolean> = signal<boolean>(false);
  private readonly dragTarget: WritableSignal<DragTarget> = signal<DragTarget>(null);
  private readonly touchedFromInlineInteraction: WritableSignal<boolean> = signal<boolean>(false);

  private readonly hostElement: ElementRef<HTMLElement> =
    inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly themeConfig: ThemeConfigService = inject(ThemeConfigService);

  private removeDragListeners: (() => void) | null = null;
  private readonly generatedId: string = `${COLOR_PICKER_IDS.Prefix}-${++colorPickerIdCounter}`;

  private onModelChange: (value: ColorPickerValue) => void = (): void => {};
  private onModelTouched: () => void = (): void => {};

  public readonly resolvedVariant: Signal<ColorPickerVariant> = computed<ColorPickerVariant>(
    (): ColorPickerVariant => this.variant() ?? this.themeConfig.variant()
  );

  public readonly isDisabled: Signal<boolean> = computed<boolean>(
    (): boolean => this.disabled() || this.cvaDisabled()
  );

  public readonly resolvedInputId: Signal<string> = computed<string>((): string => {
    const configuredId: string = this.inputId().trim();
    if (configuredId.length > 0) {
      return configuredId;
    }
    return `${this.generatedId}-${COLOR_PICKER_IDS.HiddenInputSuffix}`;
  });

  public readonly triggerId: Signal<string> = computed<string>(
    (): string => `${this.generatedId}-${COLOR_PICKER_IDS.TriggerSuffix}`
  );

  public readonly panelId: Signal<string> = computed<string>(
    (): string => `${this.generatedId}-${COLOR_PICKER_IDS.PanelSuffix}`
  );

  public readonly displayColor: Signal<string> = computed<string>((): string => {
    return `#${hsbToHex(this.currentHsb())}`;
  });

  public readonly hueOnlyColor: Signal<string> = computed<string>((): string => {
    return `hsl(${this.hue()}, 100%, 50%)`;
  });

  public readonly selectorLeft: Signal<number> = computed<number>((): number => this.saturation());

  public readonly selectorTop: Signal<number> = computed<number>(
    (): number => 100 - this.brightness()
  );

  public readonly hueHandleTop: Signal<number> = computed<number>((): number => {
    return (this.hue() / COLOR_PICKER_LIMITS.HueMax) * 100;
  });

  constructor() {
    effect((): void => {
      this.inline();
      if (this.inline()) {
        this.panelVisible.set(true);
      }
    });

    effect((): void => {
      const incomingValue: ColorPickerValue = this.value();
      if (incomingValue !== null) {
        this.applyValueToInternalState(incomingValue);
      }
    });

    this.destroyRef.onDestroy((): void => {
      this.detachDragListeners();
    });
  }

  public writeValue(value: ColorPickerValue): void {
    this.applyValueToInternalState(value);
  }

  public registerOnChange(fn: (value: ColorPickerValue) => void): void {
    this.onModelChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onModelTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }

  public togglePanel(): void {
    if (this.inline() || this.isDisabled()) {
      return;
    }

    if (this.panelVisible()) {
      this.closePanel();
      return;
    }

    this.openPanel();
  }

  public openPanel(): void {
    if (this.inline() || this.isDisabled() || this.panelVisible()) {
      return;
    }

    this.panelVisible.set(true);
    this.onShow.emit();
    requestAnimationFrame((): void => this.updatePanelPlacement());
  }

  public closePanel(): void {
    if (this.inline() || !this.panelVisible()) {
      return;
    }

    this.panelVisible.set(false);
    this.dragTarget.set(null);
    this.detachDragListeners();
    this.markTouched();
    this.onHide.emit();
    this.triggerButton?.nativeElement.focus();
  }

  public onTriggerClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.togglePanel();
  }

  public onTriggerKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }

    if (event.key === KEYBOARD_KEYS.Enter || event.key === KEYBOARD_KEYS.Space) {
      event.preventDefault();
      this.openPanel();
    }
  }

  public onPanelKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }

    if (event.key === KEYBOARD_KEYS.Escape) {
      event.preventDefault();
      this.closePanel();
      return;
    }

    if (event.key === KEYBOARD_KEYS.Enter || event.key === KEYBOARD_KEYS.Space) {
      this.emitColorChange(event);
      if (!this.inline()) {
        event.preventDefault();
        this.closePanel();
      }
    }
  }

  public onColorAreaMouseDown(event: MouseEvent): void {
    if (this.isDisabled()) {
      return;
    }

    event.preventDefault();
    this.dragTarget.set('color');
    this.updateColorAreaFromCoordinates(event.clientX, event.clientY, event);
    this.attachDragListeners();
  }

  public onColorAreaTouchStart(event: TouchEvent): void {
    if (this.isDisabled()) {
      return;
    }

    const firstTouch: Touch | undefined = event.touches[0];
    if (!firstTouch) {
      return;
    }

    event.preventDefault();
    this.dragTarget.set('color');
    this.updateColorAreaFromCoordinates(firstTouch.clientX, firstTouch.clientY, event);
    this.attachDragListeners();
  }

  public onHueMouseDown(event: MouseEvent): void {
    if (this.isDisabled()) {
      return;
    }

    event.preventDefault();
    this.dragTarget.set('hue');
    this.updateHueFromCoordinate(event.clientY, event);
    this.attachDragListeners();
  }

  public onHueTouchStart(event: TouchEvent): void {
    if (this.isDisabled()) {
      return;
    }

    const firstTouch: Touch | undefined = event.touches[0];
    if (!firstTouch) {
      return;
    }

    event.preventDefault();
    this.dragTarget.set('hue');
    this.updateHueFromCoordinate(firstTouch.clientY, event);
    this.attachDragListeners();
  }

  public onColorAreaKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }

    const acceleratedStep: number = event.shiftKey
      ? COLOR_PICKER_KEYBOARD_STEPS.Accelerated
      : COLOR_PICKER_KEYBOARD_STEPS.Saturation;

    if (event.key === KEYBOARD_KEYS.ArrowRight) {
      event.preventDefault();
      this.applyHsbUpdate(
        this.hue(),
        this.saturation() + acceleratedStep,
        this.brightness(),
        event
      );
      return;
    }

    if (event.key === KEYBOARD_KEYS.ArrowLeft) {
      event.preventDefault();
      this.applyHsbUpdate(
        this.hue(),
        this.saturation() - acceleratedStep,
        this.brightness(),
        event
      );
      return;
    }

    if (event.key === KEYBOARD_KEYS.ArrowUp) {
      event.preventDefault();
      this.applyHsbUpdate(
        this.hue(),
        this.saturation(),
        this.brightness() + acceleratedStep,
        event
      );
      return;
    }

    if (event.key === KEYBOARD_KEYS.ArrowDown) {
      event.preventDefault();
      this.applyHsbUpdate(
        this.hue(),
        this.saturation(),
        this.brightness() - acceleratedStep,
        event
      );
    }
  }

  public onHueKeydown(event: KeyboardEvent): void {
    if (this.isDisabled()) {
      return;
    }

    const hueStep: number = event.shiftKey
      ? COLOR_PICKER_KEYBOARD_STEPS.Accelerated
      : COLOR_PICKER_KEYBOARD_STEPS.Hue;

    if (event.key === KEYBOARD_KEYS.ArrowUp || event.key === KEYBOARD_KEYS.ArrowRight) {
      event.preventDefault();
      this.applyHsbUpdate(this.hue() + hueStep, this.saturation(), this.brightness(), event);
      return;
    }

    if (event.key === KEYBOARD_KEYS.ArrowDown || event.key === KEYBOARD_KEYS.ArrowLeft) {
      event.preventDefault();
      this.applyHsbUpdate(this.hue() - hueStep, this.saturation(), this.brightness(), event);
    }
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    if (this.inline() || !this.panelVisible()) {
      return;
    }

    const targetNode: Node | null = event.target as Node | null;
    if (!targetNode) {
      return;
    }

    if (!this.hostElement.nativeElement.contains(targetNode)) {
      this.closePanel();
    }
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    if (this.panelVisible() && !this.inline()) {
      this.updatePanelPlacement();
    }
  }

  private updatePanelPlacement(): void {
    const panel: HTMLDivElement | undefined = this.panelElement?.nativeElement;
    const trigger: HTMLButtonElement | undefined = this.triggerButton?.nativeElement;

    if (!panel || !trigger || this.inline()) {
      this.panelPlacement.set('below');
      return;
    }

    const triggerRect: DOMRect = trigger.getBoundingClientRect();
    const panelRect: DOMRect = panel.getBoundingClientRect();

    const availableBelow: number = window.innerHeight - triggerRect.bottom;
    const availableAbove: number = triggerRect.top;

    if (availableBelow < panelRect.height && availableAbove > availableBelow) {
      this.panelPlacement.set('above');
      return;
    }

    this.panelPlacement.set('below');
  }

  private applyValueToInternalState(value: ColorPickerValue): void {
    if (value === null) {
      this.hue.set(COLOR_PICKER_DEFAULTS.InitialHue);
      this.saturation.set(COLOR_PICKER_DEFAULTS.InitialSaturation);
      this.brightness.set(COLOR_PICKER_DEFAULTS.InitialBrightness);
      return;
    }

    const parsedValue: HsbColor | null = toHsbColor(value);
    if (!parsedValue) {
      return;
    }

    this.hue.set(clamp(parsedValue.h, COLOR_PICKER_LIMITS.HueMin, COLOR_PICKER_LIMITS.HueMax));
    this.saturation.set(
      clamp(parsedValue.s, COLOR_PICKER_LIMITS.SaturationMin, COLOR_PICKER_LIMITS.SaturationMax)
    );
    this.brightness.set(
      clamp(parsedValue.b, COLOR_PICKER_LIMITS.BrightnessMin, COLOR_PICKER_LIMITS.BrightnessMax)
    );
  }

  private currentHsb(): HsbColor {
    return {
      h: this.hue(),
      s: this.saturation(),
      b: this.brightness(),
    };
  }

  private applyHsbUpdate(hue: number, saturation: number, brightness: number, event: Event): void {
    this.hue.set(clamp(Math.round(hue), COLOR_PICKER_LIMITS.HueMin, COLOR_PICKER_LIMITS.HueMax));
    this.saturation.set(
      clamp(
        Math.round(saturation),
        COLOR_PICKER_LIMITS.SaturationMin,
        COLOR_PICKER_LIMITS.SaturationMax
      )
    );
    this.brightness.set(
      clamp(
        Math.round(brightness),
        COLOR_PICKER_LIMITS.BrightnessMin,
        COLOR_PICKER_LIMITS.BrightnessMax
      )
    );

    this.markTouchedFromInlineInteractionIfNeeded();
    this.emitColorChange(event);
  }

  private emitColorChange(event: Event): void {
    const formattedValue: ColorPickerValue = formatColorValue(this.currentHsb(), this.format());
    this.onModelChange(formattedValue);
    this.onChange.emit({
      originalEvent: event,
      value: formattedValue,
    });
  }

  private markTouched(): void {
    this.onModelTouched();
  }

  private markTouchedFromInlineInteractionIfNeeded(): void {
    if (!this.inline() || this.touchedFromInlineInteraction()) {
      return;
    }

    this.touchedFromInlineInteraction.set(true);
    this.markTouched();
  }

  private updateColorAreaFromCoordinates(clientX: number, clientY: number, event: Event): void {
    const colorArea: HTMLDivElement | undefined = this.colorAreaElement?.nativeElement;
    if (!colorArea) {
      return;
    }

    const areaRect: DOMRect = colorArea.getBoundingClientRect();
    const relativeX: number = clamp(clientX - areaRect.left, 0, areaRect.width);
    const relativeY: number = clamp(clientY - areaRect.top, 0, areaRect.height);

    const saturation: number = areaRect.width <= 0 ? 0 : (relativeX / areaRect.width) * 100;
    const brightness: number = areaRect.height <= 0 ? 0 : 100 - (relativeY / areaRect.height) * 100;

    this.applyHsbUpdate(this.hue(), saturation, brightness, event);
  }

  private updateHueFromCoordinate(clientY: number, event: Event): void {
    const hueElement: HTMLDivElement | undefined = this.hueElement?.nativeElement;
    if (!hueElement) {
      return;
    }

    const hueRect: DOMRect = hueElement.getBoundingClientRect();
    const relativeY: number = clamp(clientY - hueRect.top, 0, hueRect.height);
    const hueRatio: number = hueRect.height <= 0 ? 0 : relativeY / hueRect.height;
    const hue: number = hueRatio * COLOR_PICKER_LIMITS.HueMax;

    this.applyHsbUpdate(hue, this.saturation(), this.brightness(), event);
  }

  private attachDragListeners(): void {
    this.detachDragListeners();

    const mouseMoveHandler: (event: MouseEvent) => void = (event: MouseEvent): void => {
      this.handleDocumentMouseMove(event);
    };
    const mouseUpHandler: () => void = (): void => {
      this.handleDocumentPointerEnd();
    };
    const touchMoveHandler: (event: TouchEvent) => void = (event: TouchEvent): void => {
      this.handleDocumentTouchMove(event);
    };
    const touchEndHandler: () => void = (): void => {
      this.handleDocumentPointerEnd();
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
    document.addEventListener('touchmove', touchMoveHandler, { passive: false });
    document.addEventListener('touchend', touchEndHandler);
    document.addEventListener('touchcancel', touchEndHandler);

    this.removeDragListeners = (): void => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
      document.removeEventListener('touchmove', touchMoveHandler);
      document.removeEventListener('touchend', touchEndHandler);
      document.removeEventListener('touchcancel', touchEndHandler);
    };
  }

  private detachDragListeners(): void {
    this.removeDragListeners?.();
    this.removeDragListeners = null;
  }

  private handleDocumentMouseMove(event: MouseEvent): void {
    if (this.dragTarget() === 'color') {
      this.updateColorAreaFromCoordinates(event.clientX, event.clientY, event);
      return;
    }

    if (this.dragTarget() === 'hue') {
      this.updateHueFromCoordinate(event.clientY, event);
    }
  }

  private handleDocumentTouchMove(event: TouchEvent): void {
    const firstTouch: Touch | undefined = event.touches[0];
    if (!firstTouch) {
      return;
    }

    event.preventDefault();

    if (this.dragTarget() === 'color') {
      this.updateColorAreaFromCoordinates(firstTouch.clientX, firstTouch.clientY, event);
      return;
    }

    if (this.dragTarget() === 'hue') {
      this.updateHueFromCoordinate(firstTouch.clientY, event);
    }
  }

  private handleDocumentPointerEnd(): void {
    this.dragTarget.set(null);
    this.detachDragListeners();
  }
}
