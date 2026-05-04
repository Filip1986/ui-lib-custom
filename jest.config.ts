import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.jest.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  moduleNameMapper: {
    '^ui-lib-custom$': '<rootDir>/projects/ui-lib-custom/src/public-api.ts',
    '^ui-lib-custom/theme$': '<rootDir>/projects/ui-lib-custom/src/lib/theming/index.ts',
    '^ui-lib-custom/tokens$': '<rootDir>/projects/ui-lib-custom/src/lib/design-tokens.ts',
    '^ui-lib-custom/(.*)$': '<rootDir>/projects/ui-lib-custom/src/lib/$1',
    '^@demo/shared/(.*)$': '<rootDir>/projects/demo/src/app/shared/$1',
    '^@demo/pages/(.*)$': '<rootDir>/projects/demo/src/app/pages/$1',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/tmp/',
    '<rootDir>/.angular/',
    // Separator-agnostic patterns — required on Windows where paths use backslashes
    // but <rootDir>-prefixed patterns resolve with mixed separators and fail to match.
    'projects[/\\\\]ui-lib-custom[/\\\\]package\\.json$',
    'ui-lib-custom[/\\\\]tokens[/\\\\]package\\.json',
    'ui-lib-custom[/\\\\]tokens[/\\\\]dist',
    '[/\\\\]dist[/\\\\]ui-lib-custom[/\\\\]package\\.json',
  ],
  watchPathIgnorePatterns: ['<rootDir>/tmp/', '<rootDir>/.angular/'],
  collectCoverageFrom: [
    '<rootDir>/projects/ui-lib-custom/src/lib/**/*.ts',
    '!<rootDir>/projects/ui-lib-custom/src/lib/**/index.ts',
    '!<rootDir>/projects/ui-lib-custom/src/lib/**/public-api.ts',
    '!<rootDir>/projects/ui-lib-custom/src/lib/**/*.module.ts',
    '!<rootDir>/projects/ui-lib-custom/src/lib/**/*.stories.ts',
    '!<rootDir>/projects/ui-lib-custom/src/lib/**/*.spec.ts',
    '!<rootDir>/projects/ui-lib-custom/src/lib/**/*.a11y.spec.ts',
  ],
  coverageReporters: ['text', 'lcov'],
  testMatch: ['**/*.spec.ts'],
  testPathIgnorePatterns: ['<rootDir>/e2e/'],
};

export default config;
