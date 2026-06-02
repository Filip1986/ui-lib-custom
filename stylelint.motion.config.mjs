/**
 * Minimal stylelint config for the motion-completeness audit.
 *
 * Runs ONLY the `uilib/no-unprefixed-motion` rule so that
 * `npm run lint:css:motion` exits 0 when all SCSS files have
 * a `@media (prefers-reduced-motion: reduce)` companion — and
 * reports only motion violations, not unrelated rule warnings.
 *
 * Full library lint: npm run lint:css
 * Motion audit only: npm run lint:css:motion
 */

/** @type {import('stylelint').Config} */
export default {
  customSyntax: 'postcss-scss',

  plugins: ['./stylelint-plugin/no-unprefixed-motion.mjs'],

  rules: {
    'uilib/no-unprefixed-motion': [true, { severity: 'error' }],
  },

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
