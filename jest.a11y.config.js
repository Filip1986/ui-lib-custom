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
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/projects/.*/dist/',
    '<rootDir>/tmp/',
    '<rootDir>/.angular/',
    // Exclude Claude AI worktrees — these contain duplicate package.json name fields
    // that cause jest-haste-map collisions locally. GitHub Actions never has this folder.
    '<rootDir>/.claude/',
    // Separator-agnostic fallback required on Windows (backslash paths)
    '[/\\\\]\\.claude[/\\\\]',
  ],
  watchPathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/projects/.*/dist/',
    '<rootDir>/tmp/',
    '<rootDir>/.angular/',
    '<rootDir>/.claude/',
  ],
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
