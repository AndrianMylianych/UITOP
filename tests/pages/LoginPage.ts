import type { Locator, Page } from '@playwright/test';

import { CREDENTIALS } from '../helpers/auth';

export class LoginPage {
  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly alertMessage: Locator;
  readonly lostPasswordButton: Locator;

  constructor(readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'CivicFlow Demo' });
    this.emailInput = page.getByTestId('login-email');
    this.passwordInput = page.getByTestId('login-password');
    this.submitButton = page.getByTestId('login-submit');
    this.errorMessage = page.getByTestId('login-error');
    this.alertMessage = page.getByRole('alert');
    this.lostPasswordButton = page.getByRole('button', { name: 'Lost your password?' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async signIn(email = CREDENTIALS.email, password = CREDENTIALS.password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
