module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts', '<rootDir>/setup-a11y.ts'],
  testMatch: ['**/*.a11y.spec.ts'],
  moduleNameMapper: {
    '^ui-lib-custom$': '<rootDir>/projects/ui-lib-custom/src/public-api.ts',
    '^ui-lib-custom/theme$': '<rootDir>/projects/ui-lib-custom/src/lib/theming/index.ts',
    '^ui-lib-custom/testing$': '<rootDir>/projects/ui-lib-custom/src/lib/testing/index.ts',
    '^ui-lib-custom/tokens$': '<rootDir>/projects/ui-lib-custom/src/lib/design-tokens.ts',
    '^ui-lib-custom/(.*)$': '<rootDir>/projects/ui-lib-custom/src/lib/$1',
  },
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/projects/.*/dist/'],
  watchPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/projects/.*/dist/'],
  transform: {
    '^.+\\.(ts|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.a11y.json',
        stringifyContentPathRegex: '\\.html$',
      },
    ],
  },
  coverageDirectory: '<rootDir>/coverage/a11y',
};
