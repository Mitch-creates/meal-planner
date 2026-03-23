# Implementation Tickets (Execution Baseline)

Each ticket references MVP contract scope and release gates.

## MP-001 Monorepo Scaffold

- **Goal:** establish `apps/mobile`, `apps/api`, and `packages/shared` with TypeScript strict mode.
- **Acceptance criteria:**
  - Root workspaces configured.
  - Mobile and API have runnable dev scripts.
  - Shared package provides typed contracts.
- **Docs references:** `plan/03-architecture.md`, `rules/20-developer-rules.md`

## MP-002 Data Model to Drizzle Schema

- **Goal:** map MVP entities into Drizzle schema and migration files.
- **Acceptance criteria:**
  - Core tables from `plan/04-data-model.md` present.
  - Partial unique index for one current weekly plan.
  - Membership max-5 enforcement path documented in service layer.
- **Docs references:** `plan/04-data-model.md`, `rules/60-release-gates.md` (Gate D)

## MP-003 Auth Foundation (Better Auth)

- **Goal:** integrate passwordless auth adapters and provisional session model.
- **Acceptance criteria:**
  - Magic link + Google + Apple paths available.
  - Restricted actions require verified user.
  - App-facing `AuthService` abstraction implemented.
- **Docs references:** `plan/01-mvp-contract.md`, `plan/03-architecture.md`, `rules/60-release-gates.md` (Gate B)

## MP-004 Onboarding and Preferences

- **Goal:** build onboarding flow capturing diet, dislikes, restrictions, and planning preferences.
- **Acceptance criteria:**
  - Required preference payload persisted.
  - Completion emits onboarding analytics events.
  - Fallback English copy and typed translation keys used.
- **Docs references:** `plan/01-mvp-contract.md`, `plan/08-localization-foundation.md`

## MP-005 Weekly Planning Core

- **Goal:** implement weekly generation, locking, randomizer, and confirmation behavior.
- **Acceptance criteria:**
  - Weekly planning is default meals view.
  - Lock selected recipes and randomize remaining.
  - Only confirmation consumes free quota.
  - Prior plans are visible via history.
- **Docs references:** `plan/01-mvp-contract.md`, `plan/07-monetization-and-entitlements.md`, `rules/60-release-gates.md` (Gate A/C)

## MP-006 Daily Inspiration

- **Goal:** build separate daily inspiration section with recipe detail entry.
- **Acceptance criteria:**
  - Daily section is separate from weekly flow.
  - Inspiration usage is unlimited regardless of free/pro status.
  - Instrument `daily_inspiration_viewed` and `daily_recipe_opened`.
- **Docs references:** `plan/01-mvp-contract.md`, `plan/06-ab-testing-and-analytics.md`

## MP-007 Groceries Generation and Normalization

- **Goal:** generate grocery list from confirmed plan with aggregation and normalized units.
- **Acceptance criteria:**
  - Consolidated ingredient rows across plan recipes.
  - Manual add supported.
  - Sync model supports household owner mode.
- **Docs references:** `plan/01-mvp-contract.md`, `plan/04-data-model.md`, `rules/60-release-gates.md` (Gate D)

## MP-008 Favorites and Cooking Mode

- **Goal:** implement recipe/plan favorites and cooking mode navigation.
- **Acceptance criteria:**
  - Favorite recipe and plan actions persist.
  - Cooking mode supports swipe + next/prev buttons.
  - Step-specific ingredient amounts shown.
- **Docs references:** `plan/01-mvp-contract.md`, `rules/60-release-gates.md` (Gate E)

## MP-009 RevenueCat Entitlements + Paywall

- **Goal:** wire Pro entitlement with restore purchases and paywall visibility logic.
- **Acceptance criteria:**
  - Free cap enforced server-side for weekly confirmations.
  - Pro unlocks unlimited confirmations + sharing + trend packs.
  - Restore purchases path in Settings updates server shadow state.
- **Docs references:** `plan/07-monetization-and-entitlements.md`, `rules/60-release-gates.md` (Gate C)

## MP-010 Analytics + Experiment Assignments

- **Goal:** implement event contract and experiment assignment map for paywall/planning experiments.
- **Acceptance criteria:**
  - All required events from analytics plan are typed and emitted via service layer.
  - Event payload includes session/platform/version/experiment assignments.
  - Experiment assignment is deterministic per user.
- **Docs references:** `plan/06-ab-testing-and-analytics.md`, `rules/00-global-rules.md`

## MP-011 Offline Read-only Cache

- **Goal:** support offline read-only loading for current plan and favorites.
- **Acceptance criteria:**
  - Cached current plan and favorites are readable when offline.
  - Mutations fail gracefully with clear feedback.
- **Docs references:** `plan/01-mvp-contract.md`, `rules/60-release-gates.md` (Gate F)

## MP-012 Release Gate Verification

- **Goal:** run release-gate checklist with evidence.
- **Acceptance criteria:**
  - Gate A-F checklist documented with pass/fail evidence.
  - Any waiver is explicitly documented by Safety Agent role.
- **Docs references:** `rules/60-release-gates.md`, `rules/50-definition-of-done.md`
