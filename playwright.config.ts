import { defineConfig } from '@playwright/test';

const isCI: boolean = Boolean(process.env.CI);

// The demo app runs on 4321 (not 4200) to avoid colliding with other local apps
// (e.g. the operator-hq dashboard, which occupies :4200 in development).
// reuseExistingServer is always false so the suite always talks to the real
// component-demo, never an unrelated app that happens to be listening on the port.
const DEMO_PORT: number = 4321;

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/a11y-results.json' }],
  ],
  use: {
    baseURL: `http://localhost:${DEMO_PORT}`,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: `ng serve demo --port ${DEMO_PORT}`,
    url: `http://localhost:${DEMO_PORT}`,
    reuseExistingServer: false,
    timeout: 120000,
  },
});
