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
  // Angular HTML template parsing (add template rules here when needed).
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin,
    },
    rules: {},
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
