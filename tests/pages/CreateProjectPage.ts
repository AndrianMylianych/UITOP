import type { Locator, Page } from '@playwright/test';

export interface ProjectFormData {
  jurisdiction?: string;
  name?: string;
  address?: string;
  unit?: string;
  description?: string;
}

export class CreateProjectPage {
  readonly heading: Locator;
  readonly jurisdictionSelect: Locator;
  readonly nameInput: Locator;
  readonly addressInput: Locator;
  readonly unitInput: Locator;
  readonly descriptionInput: Locator;
  readonly submitButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
  readonly alertMessage: Locator;

  constructor(readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Create Custom Project' });
    this.jurisdictionSelect = page.getByTestId('project-jurisdiction');
    this.nameInput = page.getByTestId('project-name');
    this.addressInput = page.getByTestId('project-address');
    this.unitInput = page.getByTestId('project-unit');
    this.descriptionInput = page.getByTestId('project-description');
    this.submitButton = page.getByTestId('project-submit');
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.errorMessage = page.getByTestId('project-form-error');
    this.alertMessage = page.getByRole('alert');
  }

  async fill(data: ProjectFormData) {
    if (data.jurisdiction) await this.jurisdictionSelect.selectOption(data.jurisdiction);
    if (data.name) await this.nameInput.fill(data.name);
    if (data.address) await this.addressInput.fill(data.address);
    if (data.unit) await this.unitInput.fill(data.unit);
    if (data.description) await this.descriptionInput.fill(data.description);
  }

  async submit() {
    await this.submitButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }
}
