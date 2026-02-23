module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts', '<rootDir>/setup-a11y.ts'],
  testMatch: ['**/*.a11y.spec.ts'],
  moduleNameMapper: {
    '^ui-lib-custom$': '<rootDir>/projects/ui-lib-custom/src/public-api.ts',
    '^ui-lib-custom/(.*)$': '<rootDir>/projects/ui-lib-custom/$1/public-api.ts',
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
