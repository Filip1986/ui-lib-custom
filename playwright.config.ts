import { defineConfig } from '@playwright/test';

});
  },
    timeout: 120000,
    reuseExistingServer: !process.env.CI,
    url: 'http://localhost:4200',
    command: 'npm run serve:demo',
  webServer: {
  },
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    baseURL: 'http://localhost:4200',
  use: {
  ],
    ['json', { outputFile: 'test-results/a11y-results.json' }],
    ['html', { outputFolder: 'playwright-report' }],
  reporter: [
  workers: process.env.CI ? 1 : undefined,
  retries: process.env.CI ? 2 : 0,
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  testMatch: '**/*.spec.ts',
  testDir: './e2e',
export default defineConfig({

