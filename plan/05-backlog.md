# 05 - MVP Backlog (Planner Baseline)

## Phase 0 - Foundations

1. Project bootstrap (Expo + TypeScript + linting + folder conventions)
2. Backend scaffold (auth, plans, groceries, favorites, subscriptions)
3. Database migrations for core schema
4. Localization foundation (English + typed keys + fallback strategy)

## Phase 1 - Auth and onboarding

1. Passwordless auth integration (magic link + Google + Apple)
2. Provisional session support
3. Verification gating for share/pro/subscribe actions
4. Onboarding flow for preferences and restrictions

## Phase 2 - Meals tab

1. Weekly view default shell
2. Daily inspiration section
3. Weekly plan generation (guided filters)
4. Lock + randomizer behavior
5. Confirm plan flow and current plan update
6. Plan history list with "see all"

## Phase 3 - Groceries tab

1. Grocery generation from confirmed plan
2. Ingredient aggregation across recipes
3. Unit normalization
4. Manual item add
5. Household sync behavior

## Phase 4 - Favorites and cooking mode

1. Favorite recipes
2. Favorite plans
3. Recipe detail
4. Cooking mode (swipe + button nav, amount-aware steps)

## Phase 5 - Subscription and limits

1. Free weekly confirmation quota enforcement (one-time 3)
2. RevenueCat entitlement integration
3. Paywall placement and visibility logic
4. Restore purchases in Settings

## Phase 6 - Performance, safety, and release readiness

1. Caching for current plan/favorites read-only offline
2. Performance instrumentation and budget checks
3. Safety gate checklist pass
4. App store metadata and policy alignment
