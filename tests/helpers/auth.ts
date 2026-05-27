import type { Page } from '@playwright/test';

export const CREDENTIALS = {
  email: 'applicant@example.com',
  password: 'Password123!',
};

export async function signIn(
  page: Page,
  email = CREDENTIALS.email,
  password = CREDENTIALS.password,
) {
  await page.getByTestId('login-email').fill(email);
  await page.getByTestId('login-password').fill(password);
  await page.getByTestId('login-submit').click();
}
