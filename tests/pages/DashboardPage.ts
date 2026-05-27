import type { Locator, Page } from '@playwright/test';

export class DashboardPage {
  readonly heading: Locator;
  readonly logoutButton: Locator;
  readonly sidebarProjectsLink: Locator;
  readonly dashboardButton: Locator;
  readonly createCustomProjectButton: Locator;

  constructor(readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Applicant dashboard' });
    this.logoutButton = page.getByTestId('logout-button');
    this.sidebarProjectsLink = page.getByTestId('sidebar-projects');
    this.dashboardButton = page.getByRole('button', { name: 'Dashboard' });
    this.createCustomProjectButton = page.getByRole('button', { name: 'Create custom project' });
  }

  async goToProjects() {
    await this.sidebarProjectsLink.click();
  }

  async goToDashboard() {
    await this.dashboardButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }

  async openCreateProjectFromTopbar() {
    await this.createCustomProjectButton.click();
  }
}
