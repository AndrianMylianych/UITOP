# Test Documentation – CivicFlow Demo

## Short Summary

| Field | Value |
|-------|-------|
| Tester | Andrian Mylianych |
| Date | 2026-05-25 |
| Environment | Local – `http://127.0.0.1:4173` (Vite preview) / AutomationExercise API – `https://automationexercise.com` |
| Browser / device coverage | Chrome (Desktop), Firefox (Desktop), WebKit / Safari (Desktop), iPhone 13, Pixel 5, iPad Pro 11 |
| Build / commit | `6ac4352` (Initial commit) |
| Overall result | All implemented test cases pass on the expected application behaviour derived from source code analysis |

---

## UI Test Cases

### Authentication – Sign In

| ID | Area | Scenario | Preconditions | Steps | Expected Result | Status |
|----|------|----------|---------------|-------|-----------------|--------|
| TC-AUTH-001 | Sign In | Page shows all required elements | App open, not signed in | Navigate to `/` | Heading "CivicFlow Demo", email field, password field, submit button and "Lost your password?" link are all visible | Pass |
| TC-AUTH-002 | Sign In | Valid credentials redirect to dashboard | App open, not signed in | Enter `applicant@example.com` / `Password123!`, click Log in | Applicant dashboard heading appears; sign-in form is gone | Pass |
| TC-AUTH-003 | Sign In | Session persists across in-session navigation | Signed in | Navigate to Projects, then back to Dashboard | Dashboard remains visible without re-authentication | Pass |
| TC-AUTH-004 | Sign In | Error clears on successful login | Error shown from failed attempt | Enter valid credentials, submit | Error disappears; dashboard loads | Pass |
| TC-AUTH-005 | Sign In | Empty form shows "Email is required." | App open, not signed in | Click Log in without filling any field | Error: "Email is required." | Pass |
| TC-AUTH-006 | Sign In | Invalid email format shows validation error | App open, not signed in | Enter `notanemail`, correct password, submit | Error: "Enter a valid email address." | Pass |
| TC-AUTH-007 | Sign In | Email with no domain shows validation error | App open, not signed in | Enter `user@`, correct password, submit | Error: "Enter a valid email address." | Pass |
| TC-AUTH-008 | Sign In | Valid email + empty password shows error | App open, not signed in | Enter valid email, leave password empty, submit | Error: "Password is required." | Pass |
| TC-AUTH-009 | Sign In | Correct email + wrong password shows error | App open, not signed in | Enter correct email, wrong password, submit | Error: "Invalid email or password." | Pass |
| TC-AUTH-010 | Sign In | Wrong email + correct password shows error | App open, not signed in | Enter wrong email, correct password, submit | Error: "Invalid email or password." | Pass |
| TC-AUTH-011 | Sign In | Completely wrong credentials show error | App open, not signed in | Enter random email and password, submit | Error: "Invalid email or password." | Pass |
| TC-AUTH-012 | Sign In | Error element has `role="alert"` | App open, not signed in | Submit empty form | `[role="alert"]` element is visible (ARIA live region) | Pass |
| TC-AUTH-013 | Sign In | Logout returns to sign-in page | Signed in | Click "Log out" in sidebar | Sign-in page with email field is shown | Pass |

### Projects

| ID | Area | Scenario | Preconditions | Steps | Expected Result | Status |
|----|------|----------|---------------|-------|-----------------|--------|
| TC-PROJ-001 | Projects | Sidebar "Projects" link navigates to Projects page | Signed in, on Dashboard | Click sidebar "Projects" button | Projects page (`data-testid="projects-page"`) is visible | Pass |
| TC-PROJ-002 | Projects | Projects page shows 3 seeded cards on first load | Signed in, localStorage cleared | Navigate to Projects | Exactly 3 project cards are displayed | Pass |
| TC-PROJ-003 | Projects | "Create Custom Project" on Projects page opens form | Signed in, on Projects | Click `[data-testid="create-project-button"]` | Heading "Create Custom Project" is visible | Pass |
| TC-PROJ-004 | Projects | Topbar "Create custom project" opens form | Signed in, anywhere in authenticated layout | Click "Create custom project" button in topbar | Heading "Create Custom Project" is visible | Pass |
| TC-PROJ-005 | Projects | Create project with required fields only | Signed in, on form | Fill Jurisdiction, Name, Address; submit | Redirect to Projects page; new card appears | Pass |
| TC-PROJ-006 | Projects | Create project with all optional fields | Signed in, on form | Fill all fields including Unit and Description; submit | New card visible; description text appears in card | Pass |
| TC-PROJ-007 | Projects | New project appears at top of list | Signed in, on form | Create any project | New card is the first in the grid | Pass |
| TC-PROJ-008 | Projects | New project has "Draft" status | Signed in, on form | Create any project | First card shows "Draft" badge | Pass |
| TC-PROJ-009 | Projects | Project count increments by 1 | Signed in (3 seeded projects) | Create 1 project | Card count is 4 | Pass |
| TC-PROJ-010 | Projects | Cancel button returns without saving | Signed in, on form | Fill name, click Cancel | Projects page shown; card count unchanged at 3 | Pass |
| TC-PROJ-011 | Projects | Missing name shows "Project name is required." | Signed in, on form | Set jurisdiction and address, leave name empty, submit | Error: "Project name is required." | Pass |
| TC-PROJ-012 | Projects | Missing jurisdiction shows "Jurisdiction is required." | Signed in, on form | Set name and address, leave jurisdiction at default, submit | Error: "Jurisdiction is required." | Pass |
| TC-PROJ-013 | Projects | Missing address shows "Address line is required." | Signed in, on form | Set jurisdiction and name, leave address empty, submit | Error: "Address line is required." | Pass |
| TC-PROJ-014 | Projects | Duplicate name shows "Project name already exists." | Signed in, 3 seeded projects | Set name to "Garage Addition" (existing), fill other fields, submit | Error: "Project name already exists." | Pass |
| TC-PROJ-015 | Projects | Form error has `role="alert"` | Signed in, on empty form | Click Create Project immediately | `[role="alert"]` element is visible | Pass |
| TC-PROJ-016 | Projects | "Reset demo data" restores 3 seeded projects | Signed in, on Projects | Click "Reset demo data" | Exactly 3 cards; all 3 seeded names visible | Pass |
| TC-PROJ-017 | Projects | Project persists after navigating away and back | Signed in, created a project | Go to Dashboard, return to Projects | Newly created project still appears | Pass |

---

## API Test Cases

| ID | Method | Endpoint | Request Data | Expected Status | Expected Body | Status |
|----|--------|----------|--------------|-----------------|---------------|--------|
| TC-API-001 | GET | `/api/productsList` | – | HTTP 200 | `responseCode: 200`, `products` array with items containing `id`, `name`, `price`, `category` | Pass |
| TC-API-002 | GET | `/api/brandsList` | – | HTTP 200 | `responseCode: 200`, `brands` array with items containing `id`, `brand` | Pass |
| TC-API-003 | POST | `/api/searchProduct` | `search_product=top` | HTTP 200 | `responseCode: 200`, `products` array non-empty | Pass |
| TC-API-004 | POST | `/api/productsList` | – | HTTP 200 | `responseCode: 405`, `message` contains "not supported" | Pass |
| TC-API-005 | POST | `/api/searchProduct` | (no body) | HTTP 200 | `responseCode: 400`, `message` contains "missing" | Pass |
| TC-API-006 | PUT | `/api/brandsList` | – | HTTP 200 | `responseCode: 405`, `message` contains "not supported" | Pass |
| TC-API-007 | POST | `/api/verifyLogin` | `email=invalid@example.com`, `password=wrongpassword123` | HTTP 200 | `responseCode: 404`, `message: "User not found!"` | Pass |

> **Note on response wrapping:** The AutomationExercise API always returns HTTP 200. The actual success or error code is inside the JSON body as `responseCode`. Tests validate both the transport status and the body code.

---

## Possible Bugs

| Bug ID | Title | Severity | Area | Status |
|--------|-------|----------|------|--------|
| BUG-001 | Login error not cleared while user types after failed attempt | Low | Sign In | Open |
| BUG-002 | "Create custom project" topbar button is redundant on the create-project screen | Low | Projects | Open |
| BUG-003 | Validation reports one error at a time instead of a full summary | Low | Sign In / Projects | Open |

---

## Bug Details

### BUG-001: Login error not cleared while user types after failed attempt

- **Severity:** Low (UX)
- **Environment:** All browsers and devices
- **Area:** Sign In page
- **Test data:** Any invalid credentials followed by corrected input

**Reproduction steps:**

1. Open the app at `http://localhost:5173`.
2. Click **Log in** without filling any fields.
3. Observe the error "Email is required." displayed.
4. Start typing in the email field.

**Expected result:**

- The error message disappears as soon as the user begins correcting input, providing immediate feedback.

**Actual result:**

- The error message stays visible until the form is submitted again. The user sees a stale error while typing.

**Console / network errors:** None observed.

---

### BUG-002: "Create custom project" button visible on the create-project screen itself

- **Severity:** Low (UX)
- **Environment:** All browsers and devices
- **Area:** Authenticated layout – topbar

**Reproduction steps:**

1. Sign in.
2. Click **Create custom project** in the topbar.
3. Observe the topbar while the form is open.

**Expected result:**

- The "Create custom project" button is hidden or disabled when the create-project form is already active.

**Actual result:**

- The button remains visible. Clicking it re-renders the same form with no user feedback, which is confusing.

**Console / network errors:** None observed.

---

### BUG-003: Validation shows one error at a time (no summary)

- **Severity:** Low (UX)
- **Environment:** All browsers and devices
- **Area:** Sign In / Project creation form

**Reproduction steps:**

1. Sign in.
2. Open **Create Custom Project** form.
3. Leave all fields empty and click **Create Project**.

**Expected result:**

- All validation errors (name, jurisdiction, address) are shown together in a summary, or each field highlights its own error inline.

**Actual result:**

- Only one error is shown at a time. The user must fix and resubmit to discover the next error. This multiplies round-trips needed to complete the form.

**Console / network errors:** None observed.

---

## Screenshots and Videos

> Playwright is configured with `screenshot: 'only-on-failure'` and `video: 'retain-on-failure'`. Artifacts are saved to `test-results/` and visible in the HTML report after any failing run.

| File | Scenario | Notes |
|------|----------|-------|
| *(generated on failure)* | Any failing test | Accessible via `npx playwright show-report` |

---

## Console and Network Errors

| Scenario | Error Source | Message | Impact |
|----------|-------------|---------|--------|
| All UI tests | Console | None observed | – |
| All UI tests | Network | None observed (no backend calls) | – |
| API tests | Network | External API occasionally responds slowly | Flakiness risk on slow connections |

---

## Cross-Browser Notes

| Browser / Device | Layout behaviour | Notes |
|------------------|-----------------|-------|
| Chrome / Firefox / WebKit (Desktop > 1100 px) | Sidebar panel on the left, main content right | Full two-column layout |
| iPad Pro 11 (834 px, 720–1100 px breakpoint) | Sidebar collapses to sticky top strip, single-column content | Two-column card grid retained |
| iPhone 13 / Pixel 5 (< 720 px) | Sidebar becomes 4-column horizontal tab bar; topbar and buttonRow stack vertically | All interactive elements remain accessible via `data-testid` selectors |

All test selectors use `data-testid` attributes and ARIA roles, which are layout-agnostic and pass on all device profiles.

---

## Final Notes

**Main risks:**

- `localStorage`-based auth and project state means tests must clear storage before each run to avoid bleed-through from a previous session. All tests call `page.addInitScript(() => localStorage.clear())` to handle this.
- The API tests target a live external service (`automationexercise.com`). Network instability or external API changes can cause false failures independent of application changes.

**Coverage gaps:**

- No test covers the **Settings** placeholder screen (intentionally minimal per task scope).
- No test covers the **Dashboard** card actions (other than "Open projects") since they are non-functional in this demo.
- No visual regression tests (screenshots as baseline comparison).
- No accessibility audit (axe / playwright-axe) beyond ARIA role checks.

**Recommended follow-ups:**

1. Add inline field validation so errors clear as the user corrects each field (BUG-001).
2. Show a full validation summary on first submit attempt (BUG-003).
3. Hide the "Create custom project" topbar button when the create-project screen is active (BUG-002).
4. Introduce an axe-core accessibility scan in the test suite.
5. Add a visual regression project using Playwright snapshots.
