import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import angularPlugin from '@angular-eslint/eslint-plugin';
import angularTemplateParser from '@angular-eslint/template-parser';
import angularTemplatePlugin from '@angular-eslint/eslint-plugin-template';
import jsdoc from 'eslint-plugin-jsdoc';

const tsconfigRootDir = path.dirname(fileURLToPath(import.meta.url));

export default [
  // Flat config ignores (eslintignore equivalent).
  {
    ignores: [
      '**/dist/**',
      '**/coverage/**',
      '**/storybook-static/**',
      '**/out-tsc/**',
      '**/playwright-report/**',
      '**/test-results/**',
      '**/tmp/**',
      '**/node_modules/**',
      '**/.angular/**',
      '.claude/**',
      // Demo example files contain intentionally partial TypeScript snippets
      // (class members, fragments, HTML strings) that cannot be parsed as modules.
      '**/examples/*.example.ts',
    ],
  },
  // TypeScript + Angular rules for source files.
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir,
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      '@angular-eslint': angularPlugin,
      jsdoc: jsdoc,
    },
    rules: {
      // TypeScript safety and correctness.
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/typedef': [
        'error',
        {
          variableDeclaration: true,
          propertyDeclaration: true,
          memberVariableDeclaration: true,
          parameter: true,
          arrowParameter: true,
          objectDestructuring: false,
          arrayDestructuring: false,
        },
      ],
      // JSDoc: require descriptions on exported symbols only.
      'jsdoc/require-jsdoc': [
        'warn',
        {
          publicOnly: true,
          require: {
            ClassDeclaration: true,
            MethodDefinition: false,
            FunctionDeclaration: false,
          },
          checkConstructors: false,
        },
      ],
      'jsdoc/require-description': ['warn', { contexts: ['ClassDeclaration'] }],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: false,
          allowTypedFunctionExpressions: false,
          allowHigherOrderFunctions: false,
          allowDirectConstAssertionInArrowFunctions: true,
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: { constructors: 'no-public' },
        },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'warn',

      // General correctness.
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-implicit-coercion': 'error',
      'prefer-const': 'error',
      eqeqeq: 'error',

      // Angular-specific best practices.
      '@angular-eslint/no-lifecycle-call': 'error',
      '@angular-eslint/use-lifecycle-interface': 'error',
      '@angular-eslint/no-output-on-prefix': 'error',
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@angular-eslint/no-inputs-metadata-property': 'error',
    },
  },
  // Disable typedef for theme-config.service.ts as it has explicit types
  {
    files: ['projects/ui-lib-custom/src/lib/theming/theme-config.service.ts'],
    rules: {
      '@typescript-eslint/typedef': 'off',
    },
  },
  // Demo example files — user-facing code that intentionally uses relaxed conventions.
  {
    files: ['**/examples/*.example.ts'],
    rules: {
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
      '@typescript-eslint/typedef': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'jsdoc/require-jsdoc': 'off',
      'jsdoc/require-description': 'off',
    },
  },
  // Angular HTML template rules — accessibility and best practices.
  // Full rationale: docs/standards/HTML-STANDARDS.md
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin,
    },
    rules: {
      // ── Accessibility errors ────────────────────────────────────────────
      // <img> must have alt text — HTML-STANDARDS.md §6
      '@angular-eslint/template/alt-text': 'error',
      // Interactive elements must not be empty (buttons need visible labels) — §4
      '@angular-eslint/template/elements-content': 'error',
      // <label> must be associated with a form control — §5
      '@angular-eslint/template/label-has-associated-control': 'error',
      // tabindex > 0 breaks natural tab order — §4
      '@angular-eslint/template/no-positive-tabindex': 'error',
      // ARIA attributes must be valid — §4
      '@angular-eslint/template/valid-aria': 'error',
      // ARIA roles must include all required props — §4
      '@angular-eslint/template/role-has-required-aria': 'error',

      // ── Angular template best-practice errors ───────────────────────────
      // Enforce @if / @for / @switch block syntax — never *ngIf / *ngFor — §3
      '@angular-eslint/template/prefer-control-flow': 'error',

      // ── Accessibility warnings ──────────────────────────────────────────
      // Click events must have keyboard equivalents — §4
      '@angular-eslint/template/click-events-have-key-events': 'warn',
      // Mouse events must have keyboard equivalents — §4
      '@angular-eslint/template/mouse-events-have-key-events': 'warn',
      // Interactive roles must be focusable — §4
      '@angular-eslint/template/interactive-supports-focus': 'warn',
      // autofocus is a11y-disruptive — §4
      '@angular-eslint/template/no-autofocus': 'warn',

      // ── Angular template best-practice warnings ─────────────────────────
      // @for must have a track expression — §8
      '@angular-eslint/template/use-track-by-function': 'warn',
      // Prefer self-closing tags: <uilib-button /> not <uilib-button></uilib-button> — §3
      '@angular-eslint/template/prefer-self-closing-tags': 'warn',
    },
  },
  // NestJS controller heuristics: keep business logic out of controllers.
  {
    files: ['**/*controller*.ts', '**/*.controller.ts'],
    rules: {
      // Heuristic 1: avoid direct ORM imports in controllers; move data access to services.
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'typeorm',
              message: 'Do not access repositories in controllers; use a service.',
            },
            {
              name: '@prisma/client',
              message: 'Do not access Prisma in controllers; use a service.',
            },
            { name: 'mongoose', message: 'Do not access models in controllers; use a service.' },
            { name: 'sequelize', message: 'Do not access models in controllers; use a service.' },
          ],
        },
      ],
      // Heuristic 2: block @InjectRepository usage in controllers.
      'no-restricted-syntax': [
        'error',
        {
          selector: "Decorator > CallExpression[callee.name='InjectRepository']",
          message: 'Inject repositories in services, not controllers.',
        },
        {
          selector:
            "Identifier:not([typeAnnotation]):has(Decorator > CallExpression[callee.name='Body'])",
          message:
            '@Body() parameters must use a DTO type annotation (e.g., createDto: CreateUserDto).',
        },
      ],
    },
  },
];
