/** InputNumber supports decimal and currency display modes. */
export type InputNumberMode = 'decimal' | 'currency';

/** Spinner button placement options. */
export type InputNumberButtonLayout = 'stacked' | 'horizontal' | 'vertical';

/** Currency display mode forwarded to Intl.NumberFormat. */
export type InputNumberCurrencyDisplay = 'symbol' | 'code' | 'name' | 'narrowSymbol';

/** Locale matcher strategy forwarded to Intl.NumberFormat. */
export type InputNumberLocaleMatcher = 'best fit' | 'lookup';

/** Default values shared by InputNumber component APIs and formatter engine. */
export const INPUT_NUMBER_DEFAULTS: Readonly<{
  mode: 'decimal';
  buttonLayout: 'stacked';
  step: 1;
  min: null;
  max: null;
  minFractionDigits: null;
  maxFractionDigits: null;
  useGrouping: true;
  currencyDisplay: 'symbol';
  localeMatcher: 'best fit';
  showButtons: false;
  format: true;
  showClear: false;
}> = {
  mode: 'decimal',
  buttonLayout: 'stacked',
  step: 1,
  min: null,
  max: null,
  minFractionDigits: null,
  maxFractionDigits: null,
  useGrouping: true,
  currencyDisplay: 'symbol',
  localeMatcher: 'best fit',
  showButtons: false,
  format: true,
  showClear: false,
} as const;
