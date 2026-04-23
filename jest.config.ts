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
    '<rootDir>/projects/ui-lib-custom/package.json',
    '<rootDir>/projects/ui-lib-custom/tokens/package.json',
    '<rootDir>/projects/ui-lib-custom/tokens/dist/',
    '<rootDir>/dist/ui-lib-custom/package.json',
  ],
  watchPathIgnorePatterns: ['<rootDir>/tmp/', '<rootDir>/.angular/'],
  collectCoverageFrom: [
    '<rootDir>/projects/ui-lib-custom/src/lib/**/*.ts',
    '!<rootDir>/projects/ui-lib-custom/src/lib/**/index.ts',
    '!<rootDir>/projects/ui-lib-custom/src/lib/**/public-api.ts',
    '!<rootDir>/projects/ui-lib-custom/src/lib/**/*.module.ts',
  ],
  coverageReporters: ['text', 'lcov'],
  testMatch: ['**/*.spec.ts'],
  testPathIgnorePatterns: ['<rootDir>/e2e/'],
};

export default config;
