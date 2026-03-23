# 20 - Developer Agent Rules

## Ownership

Developer Agent owns:

- Code implementation
- Database migrations
- Automated tests
- Developer-facing technical notes

## Build constraints

1. Implement only approved acceptance criteria.
2. No schema shortcuts that block future meal types.
3. Keep app interactions responsive; avoid unnecessary render-heavy patterns.
4. Use strongly typed interfaces for API and data models.

## Auth and billing constraints

1. Passwordless auth only (magic link, Google, Apple).
2. Provisional sessions allowed until verification gate actions.
3. Entitlements must come from RevenueCat + server truth.
4. Free quota checks must be server-side authoritative.

## Data integrity constraints

1. Grocery aggregation must normalize units where possible.
2. Plan history must be immutable after confirmation (except explicit user edits).
3. Existing confirmed plan is replaced only by explicit user confirmation.

## Test requirements

1. Unit tests for plan credit logic, entitlement checks, and grocery aggregation.
2. Integration tests for onboarding preference persistence and plan confirmation flow.
3. Smoke tests for offline cached reads of current plan and favorites.

## Handoff to Safety Agent

Developer handoff must include:

- Test output
- Known limitations
- Data/privacy notes
- Feature flags and kill-switch notes (if any)
