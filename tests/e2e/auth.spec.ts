import { CREDENTIALS } from '../helpers/auth';
import { expect, test } from '../fixtures';

test.describe('Authentication', () => {
  test('TC-AUTH-E2E-001: complete sign-in, app navigation, and sign-out flow', async ({
    loginPage,
    dashboardPage,
    projectsPage,
  }) => {
    // Verify all required login page elements are present
    await expect.soft(loginPage.heading).toBeVisible();
    await expect.soft(loginPage.emailInput).toBeVisible();
    await expect.soft(loginPage.passwordInput).toBeVisible();
    await expect.soft(loginPage.submitButton).toBeVisible();
    await expect.soft(loginPage.lostPasswordButton).toBeVisible();

    // Sign in with valid credentials
    await loginPage.signIn();
    await expect.soft(dashboardPage.heading).toBeVisible();
    await expect.soft(loginPage.emailInput).not.toBeVisible();

    // Navigate to Projects and back to Dashboard to verify session integrity
    await dashboardPage.goToProjects();
    await expect.soft(projectsPage.pageContainer).toBeVisible();
    await dashboardPage.goToDashboard();
    await expect.soft(dashboardPage.heading).toBeVisible();

    // Sign out and verify redirect to login page
    await dashboardPage.logout();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.heading).toBeVisible();
  });

  test('TC-AUTH-E2E-002: progressive form validation errors and recovery to successful sign-in', async ({
    loginPage,
    dashboardPage,
  }) => {
    // Submit completely empty form
    await loginPage.submitButton.click();
    await expect.soft(loginPage.errorMessage).toContainText('Email is required.');
    await expect.soft(loginPage.alertMessage).toBeVisible();

    // Invalid email format
    await loginPage.emailInput.fill('notanemail');
    await loginPage.passwordInput.fill(CREDENTIALS.password);
    await loginPage.submitButton.click();
    await expect.soft(loginPage.errorMessage).toContainText('Enter a valid email address.');

    // Email with missing domain
    await loginPage.emailInput.fill('user@');
    await loginPage.submitButton.click();
    await expect.soft(loginPage.errorMessage).toContainText('Enter a valid email address.');

    // Valid email format but empty password
    await loginPage.emailInput.fill(CREDENTIALS.email);
    await loginPage.passwordInput.clear();
    await loginPage.submitButton.click();
    await expect.soft(loginPage.errorMessage).toContainText('Password is required.');

    // Correct email, wrong password
    await loginPage.passwordInput.fill('WrongPassword!');
    await loginPage.submitButton.click();
    await expect.soft(loginPage.errorMessage).toContainText('Invalid email or password.');

    // Wrong email, correct password
    await loginPage.emailInput.fill('wrong@example.com');
    await loginPage.passwordInput.fill(CREDENTIALS.password);
    await loginPage.submitButton.click();
    await expect.soft(loginPage.errorMessage).toContainText('Invalid email or password.');

    // Valid credentials — error clears and redirects to dashboard
    await loginPage.signIn();
    await expect(dashboardPage.heading).toBeVisible();
    await expect(loginPage.errorMessage).not.toBeVisible();
  });
});
