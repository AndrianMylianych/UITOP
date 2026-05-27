import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['list']],
  use: {
    baseURL: process.env.BASE_URL ?? 'http://127.0.0.1:4173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run build && npm run preview -- --host 127.0.0.1',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    // API tests run once on a single project
    {
      name: 'api',
      testMatch: '**/api.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },

    // Desktop browsers (UI tests only)
    {
      name: 'chromium',
      testIgnore: '**/api.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testIgnore: '**/api.spec.ts',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testIgnore: '**/api.spec.ts',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile devices (UI tests only)
    {
      name: 'mobile-iphone13',
      testIgnore: '**/api.spec.ts',
      use: { ...devices['iPhone 13'] },
    },
    {
      name: 'mobile-pixel5',
      testIgnore: '**/api.spec.ts',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'tablet-ipad-pro',
      testIgnore: '**/api.spec.ts',
      use: { ...devices['iPad Pro 11'] },
    },
  ],
});
