import { test as base } from '@playwright/test';
import { trackConsoleErrors } from '../helpers/consoleErrors';
import { CreateProjectPage } from '../pages/CreateProjectPage';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { ProjectsPage } from '../pages/ProjectsPage';

type PageFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  projectsPage: ProjectsPage;
  createProjectPage: CreateProjectPage;
  authenticatedDashboard: DashboardPage;
  consoleErrors: string[];
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await page.addInitScript(() => localStorage.clear());
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  projectsPage: async ({ page }, use) => {
    await use(new ProjectsPage(page));
  },

  createProjectPage: async ({ page }, use) => {
    await use(new CreateProjectPage(page));
  },

  authenticatedDashboard: async ({ page }, use) => {
    await page.addInitScript(() => localStorage.clear());
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.signIn();
    await use(new DashboardPage(page));
  },

  consoleErrors: [
    async ({ page }, use) => {
      await use(trackConsoleErrors(page));
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
