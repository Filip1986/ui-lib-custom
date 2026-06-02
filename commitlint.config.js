module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'lib', // core library code
        'demo', // demo application
        'minimal', // minimal host application
        'theme', // theme / visual changes
        'tokens', // design token changes
        'a11y', // accessibility fixes/improvements
        'storybook', // Storybook stories and config
        'deps', // dependency updates
        'ci', // CI/CD workflow changes
        'release', // release commits
        'workspace', // workspace-level config
      ],
    ],
    'scope-case': [2, 'always', 'kebab-case'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'body-max-line-length': [1, 'always', 100],
  },
};
