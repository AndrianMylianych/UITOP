import { expect, test } from '../fixtures';

const SEEDED_PROJECT_NAME = 'Garage Addition';
const SEEDED_PROJECT_COUNT = 3;

test.describe('Projects', () => {
  test('TC-PROJ-E2E-001: create project with all fields and verify complete details', async ({
    authenticatedDashboard,
    projectsPage,
    createProjectPage,
  }) => {
    await authenticatedDashboard.goToProjects();
    await expect.soft(projectsPage.pageContainer).toBeVisible();
    await expect.soft(projectsPage.projectCards).toHaveCount(SEEDED_PROJECT_COUNT);
    await expect.soft(projectsPage.page.getByText('Garage Addition')).toBeVisible();
    await expect.soft(projectsPage.page.getByText('Retail Renovation')).toBeVisible();
    await expect.soft(projectsPage.page.getByText('Site Improvement')).toBeVisible();

    // Open create form via Projects page button
    await projectsPage.openCreateForm();
    await expect.soft(createProjectPage.heading).toBeVisible();

    // Fill all optional and required fields
    await createProjectPage.fill({
      jurisdiction: 'Example County',
      name: 'Full Details Project',
      address: '42 Sample Street',
      unit: 'Unit 3B',
      description: 'Optional notes for this demo project.',
    });
    await createProjectPage.submit();

    // Verify the new project appears at the top with all expected details
    const card = projectsPage.projectCards.first();
    await expect.soft(projectsPage.pageContainer).toBeVisible();
    await expect.soft(projectsPage.projectCards).toHaveCount(SEEDED_PROJECT_COUNT + 1);
    await expect.soft(card).toContainText('Full Details Project');
    await expect.soft(card).toContainText('Example County');
    await expect.soft(card).toContainText('42 Sample Street, Unit 3B');
    await expect.soft(card).toContainText('Draft');
    await expect.soft(card).toContainText('0%');
    await expect.soft(card).toContainText(/Created \w+ \d+, \d{4}/);
    await expect(card).toContainText('Optional notes for this demo project.');
  });

  test('TC-PROJ-E2E-002: create project via topbar button with required fields only', async ({
    authenticatedDashboard,
    projectsPage,
    createProjectPage,
  }) => {
    // Open form from the topbar without navigating to Projects page first
    await authenticatedDashboard.openCreateProjectFromTopbar();
    await expect.soft(createProjectPage.heading).toBeVisible();

    await createProjectPage.fill({
      jurisdiction: 'Sample City',
      name: 'Topbar Created Project',
      address: '100 Example Ave',
    });
    await createProjectPage.submit();

    await expect.soft(projectsPage.pageContainer).toBeVisible();
    await expect(projectsPage.page.getByText('Topbar Created Project')).toBeVisible();
  });

  test('TC-PROJ-E2E-003: progressive form validation through all error states then successful submission', async ({
    authenticatedDashboard,
    projectsPage,
    createProjectPage,
  }) => {
    await authenticatedDashboard.goToProjects();
    await projectsPage.openCreateForm();

    // Empty form — first validation fires on name (checked first by the app)
    await createProjectPage.submit();
    await expect.soft(createProjectPage.alertMessage).toBeVisible();
    await expect.soft(createProjectPage.errorMessage).toContainText('Project name is required.');

    // Name filled, jurisdiction still empty
    await createProjectPage.fill({ name: 'Validation Test Project' });
    await createProjectPage.submit();
    await expect.soft(createProjectPage.errorMessage).toContainText('Jurisdiction is required.');

    // Jurisdiction filled, address still missing
    await createProjectPage.fill({ jurisdiction: 'Sample City' });
    await createProjectPage.submit();
    await expect.soft(createProjectPage.errorMessage).toContainText('Address line is required.');

    // Address added but name changed to a duplicate
    await createProjectPage.fill({ address: '100 Example Ave', name: SEEDED_PROJECT_NAME });
    await createProjectPage.submit();
    await expect.soft(createProjectPage.errorMessage).toContainText('Project name already exists.');

    // Fix name to unique value — all fields now valid
    await createProjectPage.fill({ name: 'Validation Test Project' });
    await createProjectPage.submit();

    await expect(projectsPage.pageContainer).toBeVisible();
    await expect(projectsPage.page.getByText('Validation Test Project')).toBeVisible();
  });

  test('TC-PROJ-E2E-004: cancel preserves list, created project persists across navigation, reset restores seed data', async ({
    authenticatedDashboard,
    projectsPage,
    createProjectPage,
  }) => {
    await authenticatedDashboard.goToProjects();
    await expect.soft(projectsPage.projectCards).toHaveCount(SEEDED_PROJECT_COUNT);

    // Cancel should not add the project to the list
    await projectsPage.openCreateForm();
    await createProjectPage.fill({ name: 'Cancelled Project' });
    await createProjectPage.cancel();
    await expect.soft(projectsPage.pageContainer).toBeVisible();
    await expect.soft(projectsPage.page.getByText('Cancelled Project')).not.toBeVisible();
    await expect.soft(projectsPage.projectCards).toHaveCount(SEEDED_PROJECT_COUNT);

    // Create a project to test persistence
    await projectsPage.openCreateForm();
    await createProjectPage.fill({
      jurisdiction: 'Sample City',
      name: 'Persistence Test Project',
      address: '100 Example Ave',
    });
    await createProjectPage.submit();
    await expect.soft(projectsPage.projectCards).toHaveCount(SEEDED_PROJECT_COUNT + 1);
    await expect.soft(projectsPage.page.getByText('Persistence Test Project')).toBeVisible();

    // Navigate away and return to confirm project is retained in state
    await authenticatedDashboard.goToDashboard();
    await expect.soft(authenticatedDashboard.heading).toBeVisible();
    await authenticatedDashboard.goToProjects();
    await expect.soft(projectsPage.page.getByText('Persistence Test Project')).toBeVisible();

    // Reset demo data and verify only the three seeded projects remain
    await projectsPage.resetDemoData();
    await expect.soft(projectsPage.projectCards).toHaveCount(SEEDED_PROJECT_COUNT);
    await expect.soft(projectsPage.page.getByText('Garage Addition')).toBeVisible();
    await expect.soft(projectsPage.page.getByText('Retail Renovation')).toBeVisible();
    await expect.soft(projectsPage.page.getByText('Site Improvement')).toBeVisible();
    await expect(projectsPage.page.getByText('Persistence Test Project')).not.toBeVisible();
  });
});
