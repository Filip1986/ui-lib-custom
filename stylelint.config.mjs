// stylelint.config.mjs — ui-lib-custom
// Rules follow the same principles as platform/docs/standards/CSS-STANDARDS.md.
//
// Key difference from platform:
//   This project uses ViewEncapsulation.None — ALL component styles are global.
//   BEM naming + the `uilib-` class prefix are the ONLY collision protection.
//   Tokens use --uilib-* CSS custom properties (not --as-*).
//
// Severity guide:
//   error   → blocks commit / CI
//   warning → surfaced in lint output, does NOT block CI

/** @type {import('stylelint').Config} */
export default {
  customSyntax: 'postcss-scss',

  plugins: [
    'stylelint-scss',
    'stylelint-declaration-strict-value',
    'stylelint-high-performance-animation',
  ],

  rules: {
    // ── Correctness ───────────────────────────────────────────────────────────
    'color-no-invalid-hex': true,
    'no-duplicate-selectors': true,
    'no-empty-source': true,
    'shorthand-property-no-redundant-values': true,
    'no-duplicate-at-import-rules': true,

    // ── Architecture: specificity & structure ─────────────────────────────────
    // No ID selectors — IDs carry 100 specificity points and cannot be overridden
    'selector-max-id': 0,

    // Max 2 levels of nesting
    // At-rules (@media, @container, @layer, @supports) are structural, not specificity-inflating
    'max-nesting-depth': [
      2,
      {
        ignoreAtRules: ['media', 'container', 'layer', 'supports', 'keyframes'],
      },
    ],

    // !important kills the cascade — warning, not error, because theme overrides may need it
    'declaration-no-important': [true, { severity: 'warning' }],

    // Note: ::ng-deep rule is NOT applied here because this library uses
    // ViewEncapsulation.None — styles are already global by design.

    // transition: all triggers every renderable property
    'declaration-property-value-disallowed-list': [
      {
        '/^transition/': ['/\\ball\\b/'],
        'text-align': ['left', 'right'],
      },
      {
        message:
          "'transition: all' is expensive — name specific properties. " +
          "'text-align: left/right' breaks RTL — use 'start'/'end'.",
      },
    ],

    // ── Token enforcement: no raw values for colour or font-size ──────────────
    // All colour and font-size values must use --uilib-* CSS custom properties.
    // Raw hex, rgb(), hsl(), or named colours are not allowed.
    'scale-unlimited/declaration-strict-value': [
      [
        '/color$/',
        'background-color',
        'border-color',
        'outline-color',
        'fill',
        'stroke',
        'font-size',
      ],
      {
        ignoreValues: {
          '': [
            'inherit',
            'transparent',
            'currentColor',
            'none',
            'unset',
            'initial',
            'revert',
            '/^var\\(--uilib-/', // must use --uilib-* namespace
            '/^var\\(--demo-/',  // demo-app-specific tokens are also allowed
            '/^clamp\\(/',       // fluid sizing is acceptable
            '/^oklch\\(/',       // oklch() allowed in token definition files
            '/^color-mix\\(/',   // color-mix() allowed
          ],
        },
        expandShorthand: false,
        disableFix: true,
        severity: 'error',
        message:
          "Use a design token — var(--uilib-*). Raw values are not allowed.",
      },
    ],

    // ── Performance: no layout-triggering animations ──────────────────────────
    'plugin/no-low-performance-animation-properties': [
      true,
      { severity: 'warning' },
    ],

    // ── Logical properties ────────────────────────────────────────────────────
    'property-disallowed-list': [
      [
        'margin-left',
        'margin-right',
        'padding-left',
        'padding-right',
        'border-left',
        'border-right',
        'border-top-left-radius',
        'border-top-right-radius',
        'border-bottom-left-radius',
        'border-bottom-right-radius',
      ],
      {
        severity: 'warning',
        message:
          'Use logical properties for RTL/i18n: margin-inline-*, padding-inline-*, border-inline-*.',
      },
    ],

    // ── SCSS quality ──────────────────────────────────────────────────────────
    'scss/no-duplicate-dollar-variables': [
      true,
      { ignoreInsideAtRules: ['if', 'mixin', 'function', 'each', 'while'] },
    ],
    'scss/at-use-no-unnamespaced': true,
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/no-global-function-names': true,
    'scss/dollar-variable-no-missing-interpolation': true,
  },

  overrides: [
    {
      // Token and theme source files define raw values — exempt from token-enforcement.
      files: [
        'projects/ui-lib-custom/src/lib/themes/**/*.scss',
        'projects/ui-lib-custom/src/lib/tokens/**/*.scss',
        'projects/ui-lib-custom/src/styles/**/*.scss',
        'projects/*/src/styles/**/*.scss',
      ],
      rules: {
        'scale-unlimited/declaration-strict-value': null,
        'property-disallowed-list': null,
      },
    },
    {
      // Reset / normalise files legitimately use element selectors and physical properties
      files: ['**/styles/_reset.scss', '**/styles/_base.scss', '**/styles/_normalize.scss'],
      rules: {
        'scale-unlimited/declaration-strict-value': null,
        'property-disallowed-list': null,
        'declaration-no-important': null,
      },
    },
  ],

  ignoreFiles: [
    'node_modules/**',
    'dist/**',
    'coverage/**',
    'storybook-static/**',
    'tmp/**',
    'out-tsc/**',
    '**/*.js',
    '**/*.ts',
  ],
};

