import type { Locator, Page } from '@playwright/test';

export class ProjectsPage {
  readonly pageContainer: Locator;
  readonly projectCards: Locator;
  readonly createProjectButton: Locator;
  readonly resetDemoDataButton: Locator;

  constructor(readonly page: Page) {
    this.pageContainer = page.getByTestId('projects-page');
    this.projectCards = page.getByTestId('project-card');
    this.createProjectButton = page.getByTestId('create-project-button').first();
    this.resetDemoDataButton = page.getByRole('button', { name: 'Reset demo data' });
  }

  async openCreateForm() {
    await this.createProjectButton.click();
  }

  async resetDemoData() {
    await this.resetDemoDataButton.click();
  }
}
