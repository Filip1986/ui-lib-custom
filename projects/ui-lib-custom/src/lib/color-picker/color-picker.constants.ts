import type { ColorFormat } from './color-picker.types';

export const COLOR_PICKER_CLASSNAMES: {
  readonly Root: 'ui-lib-colorpicker';
  readonly Inline: 'ui-lib-colorpicker--inline';
  readonly Disabled: 'ui-lib-colorpicker--disabled';
  readonly Material: 'ui-lib-colorpicker--material';
  readonly Bootstrap: 'ui-lib-colorpicker--bootstrap';
  readonly Minimal: 'ui-lib-colorpicker--minimal';
  readonly Open: 'ui-lib-colorpicker--open';
  readonly Trigger: 'ui-lib-colorpicker__trigger';
  readonly Panel: 'ui-lib-colorpicker__panel';
  readonly HueSlider: 'ui-lib-colorpicker__hue';
  readonly Spectrum: 'ui-lib-colorpicker__spectrum';
  readonly Selector: 'ui-lib-colorpicker__selector';
  readonly Swatch: 'ui-lib-colorpicker__swatch';
} = {
  Root: 'ui-lib-colorpicker',
  Inline: 'ui-lib-colorpicker--inline',
  Disabled: 'ui-lib-colorpicker--disabled',
  Material: 'ui-lib-colorpicker--material',
  Bootstrap: 'ui-lib-colorpicker--bootstrap',
  Minimal: 'ui-lib-colorpicker--minimal',
  Open: 'ui-lib-colorpicker--open',
  Trigger: 'ui-lib-colorpicker__trigger',
  Panel: 'ui-lib-colorpicker__panel',
  HueSlider: 'ui-lib-colorpicker__hue',
  Spectrum: 'ui-lib-colorpicker__spectrum',
  Selector: 'ui-lib-colorpicker__selector',
  Swatch: 'ui-lib-colorpicker__swatch',
} as const;

export const COLOR_PICKER_DEFAULTS: {
  readonly Format: ColorFormat;
  readonly Inline: boolean;
  readonly Disabled: boolean;
  readonly InputId: string;
  readonly TabIndex: number;
  readonly AppendTo: 'body';
  readonly InitialHue: number;
  readonly InitialSaturation: number;
  readonly InitialBrightness: number;
} = {
  Format: 'hex',
  Inline: false,
  Disabled: false,
  InputId: '',
  TabIndex: 0,
  AppendTo: 'body',
  InitialHue: 0,
  InitialSaturation: 100,
  InitialBrightness: 100,
} as const;

export const COLOR_PICKER_LIMITS: {
  readonly RedMin: 0;
  readonly RedMax: 255;
  readonly GreenMin: 0;
  readonly GreenMax: 255;
  readonly BlueMin: 0;
  readonly BlueMax: 255;
  readonly HueMin: 0;
  readonly HueMax: 359;
  readonly SaturationMin: 0;
  readonly SaturationMax: 100;
  readonly BrightnessMin: 0;
  readonly BrightnessMax: 100;
} = {
  RedMin: 0,
  RedMax: 255,
  GreenMin: 0,
  GreenMax: 255,
  BlueMin: 0,
  BlueMax: 255,
  HueMin: 0,
  HueMax: 359,
  SaturationMin: 0,
  SaturationMax: 100,
  BrightnessMin: 0,
  BrightnessMax: 100,
} as const;

export const COLOR_PICKER_KEYBOARD_STEPS: {
  readonly Hue: number;
  readonly Saturation: number;
  readonly Brightness: number;
  readonly Accelerated: number;
} = {
  Hue: 1,
  Saturation: 1,
  Brightness: 1,
  Accelerated: 10,
} as const;

export const COLOR_PICKER_IDS: {
  readonly Prefix: 'ui-lib-colorpicker';
  readonly TriggerSuffix: 'trigger';
  readonly PanelSuffix: 'panel';
  readonly SpectrumSuffix: 'spectrum';
  readonly HueSuffix: 'hue';
  readonly HiddenInputSuffix: 'input';
} = {
  Prefix: 'ui-lib-colorpicker',
  TriggerSuffix: 'trigger',
  PanelSuffix: 'panel',
  SpectrumSuffix: 'spectrum',
  HueSuffix: 'hue',
  HiddenInputSuffix: 'input',
} as const;
