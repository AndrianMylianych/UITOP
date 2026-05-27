# CivicFlow Demo – AQA Test Suite

CivicFlow Demo is a local React/Vite applicant portal used for AQA candidate exercises. All data is fake and stored only in `localStorage`; there is no real backend.

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 20 or newer |
| npm | bundled with Node |
| Docker (optional) | 24 or newer |

---

## Install

```bash
npm install
npx playwright install --with-deps
```

---

## Fake Credentials

| Field | Value |
|-------|-------|
| Email | `applicant@example.com` |
| Password | `Password123!` |
| Role | Applicant |

---

## Run the App (manual exploration)

```bash
npm run dev
```

App is available at **http://localhost:5173**

---

## Run Tests

### All tests (all browsers + mobile + API)

```bash
npm run test:e2e
```

The Playwright config builds the app and starts a preview server automatically before running tests.

### Interactive UI mode

```bash
npm run test:e2e:ui
```

### Specific browser / device

```bash
# Desktop browsers
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Mobile devices
npx playwright test --project=mobile-iphone13
npx playwright test --project=mobile-pixel5
npx playwright test --project=tablet-ipad-pro

# API tests only
npx playwright test --project=api
```

### Specific test file

```bash
npx playwright test tests/e2e/auth.spec.ts
npx playwright test tests/e2e/projects.spec.ts
npx playwright test tests/e2e/api.spec.ts
```

### View the HTML report after a run

```bash
npx playwright show-report
```

---

## Run Tests in Docker

```bash
docker compose up --exit-code-from playwright
```

The report is written to `./playwright-report/` and can be opened in a browser.

---

## Project Structure

```
tests/
  e2e/
    helpers/
      auth.ts          # shared sign-in helper and credentials
    auth.spec.ts       # sign-in positive/negative/validation tests
    projects.spec.ts   # project navigation, creation, and validation tests
    api.spec.ts        # API tests against automationexercise.com
    app.spec.ts        # original smoke test (kept for reference)
.github/
  workflows/
    playwright.yml         # standard CI (Node + Playwright)
    playwright-docker.yml  # Docker CI with GitHub Pages report publishing
Dockerfile
docker-compose.yml
playwright.config.ts
TEST_DOCUMENTATION.md
```

---

## CI / CD

### Standard GitHub Actions

`.github/workflows/playwright.yml` runs on every push to `main` or `develop` and on pull requests targeting `main`. The HTML report is uploaded as a workflow artifact.

### Docker + GitHub Pages

`.github/workflows/playwright-docker.yml` runs on push to `main`. Tests run inside the Docker container and the report is published to GitHub Pages.

> **Note:** Enable GitHub Pages in your repository settings (*Settings → Pages → Source: GitHub Actions*) before the Pages deployment step will succeed.

---

## CI / CD Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `CI` | – | Set to `true` in CI; disables server reuse and sets retries to 2 |
| `BASE_URL` | `http://127.0.0.1:4173` | Override the app URL for the test run |

---

## Local Data

Projects are seeded on first load and stored in `localStorage`. Use the **Reset demo data** button on the Projects page to restore the three seeded examples, or clear `localStorage` manually in DevTools.
