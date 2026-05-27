import type { Page } from '@playwright/test';

export function trackConsoleErrors(page: Page): string[] {
  const errors: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  page.on('requestfailed', (req) => {
    errors.push(`Network error: ${req.url()} - ${req.failure()?.errorText ?? 'unknown'}`);
  });

  return errors;
}
