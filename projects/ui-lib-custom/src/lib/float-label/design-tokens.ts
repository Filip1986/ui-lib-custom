/**
 * FloatLabel CSS variable design tokens.
 *
 * All tokens use the `--uilib-float-label-*` prefix.
 *
 * @example
 * ```css
 * :root {
 *   --uilib-float-label-color: #9ca3af;
 *   --uilib-float-label-focus-color: #2563eb;
 *   --uilib-float-label-transition-duration: 0.15s;
 * }
 * ```
 */
export const FLOAT_LABEL_DESIGN_TOKENS: Readonly<
  Record<string, Readonly<{ description: string; defaultValue: string }>>
> = {
  '--uilib-float-label-color': {
    description: 'Resting label color.',
    defaultValue: 'var(--uilib-text-secondary-color, #6b7280)',
  },
  '--uilib-float-label-active-color': {
    description: 'Label color when filled but not focused.',
    defaultValue: 'var(--uilib-text-secondary-color, #6b7280)',
  },
  '--uilib-float-label-focus-color': {
    description: 'Label color when control is focused.',
    defaultValue: 'var(--uilib-primary-color, #3b82f6)',
  },
  '--uilib-float-label-invalid-color': {
    description: 'Label color when projected control is invalid and dirty.',
    defaultValue: 'var(--uilib-error-color, #ef4444)',
  },
  '--uilib-float-label-font-size': {
    description: 'Resting label font size.',
    defaultValue: '1rem',
  },
  '--uilib-float-label-active-font-size': {
    description: 'Active/floating label font size.',
    defaultValue: '0.75rem',
  },
  '--uilib-float-label-font-weight': {
    description: 'Resting label font weight.',
    defaultValue: 'normal',
  },
  '--uilib-float-label-active-font-weight': {
    description: 'Active/floating label font weight.',
    defaultValue: 'normal',
  },
  '--uilib-float-label-position-x': {
    description: 'Horizontal offset from the inline start edge.',
    defaultValue: '0.75rem',
  },
  '--uilib-float-label-position-y': {
    description: 'Top offset used for textarea resting alignment.',
    defaultValue: '0.75rem',
  },
  '--uilib-float-label-over-active-top': {
    description: 'Top position for active over variant.',
    defaultValue: '0',
  },
  '--uilib-float-label-in-active-top': {
    description: 'Top position for active in variant.',
    defaultValue: '0.25rem',
  },
  '--uilib-float-label-transition-duration': {
    description: 'Transition duration for label position and typography changes.',
    defaultValue: '0.2s',
  },
  '--uilib-float-label-transition-timing': {
    description: 'Transition timing function for label animations.',
    defaultValue: 'ease',
  },
  '--uilib-float-label-in-input-padding-top': {
    description: 'Top padding for projected controls in in variant.',
    defaultValue: '1.5rem',
  },
  '--uilib-float-label-in-input-padding-bottom': {
    description: 'Bottom padding for projected controls in in variant.',
    defaultValue: '0.5rem',
  },
  '--uilib-float-label-on-border-radius': {
    description: 'Border radius for active on variant pill.',
    defaultValue: '4px',
  },
  '--uilib-float-label-on-active-background': {
    description: 'Background color for active on variant pill.',
    defaultValue: 'var(--uilib-surface-ground, #ffffff)',
  },
  '--uilib-float-label-on-active-padding': {
    description: 'Padding for active on variant pill.',
    defaultValue: '0 0.25rem',
  },
} as const;
