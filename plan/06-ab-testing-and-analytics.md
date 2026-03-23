# 06 - A/B Testing and Analytics Plan

## Objectives

1. Improve conversion from free to Pro.
2. Improve weekly plan confirmation rate.
3. Improve retained usage without harming user trust.

## Tooling

- **Product analytics**: PostHog
- **Subscription analytics/entitlements**: RevenueCat
- **Experiment assignment**:
  - Preferred: RevenueCat Experiments for paywall variants
  - Fallback: PostHog feature flags + server-side variant assignment

## Experiment governance rules

1. Every experiment must define:
   - hypothesis
   - primary metric
   - guardrail metrics
   - minimum run conditions
2. No more than one major monetization experiment active per user at a time.
3. Experiments that increase short-term conversion but reduce retention beyond guardrail thresholds are rejected.

## Event taxonomy (minimum)

### Onboarding events

- `onboarding_started`
- `onboarding_completed`
- `diet_selected`
- `restrictions_saved`

### Planning events

- `weekly_plan_generate_clicked`
- `weekly_plan_generated`
- `weekly_plan_confirmed`
- `weekly_plan_randomized`
- `weekly_plan_recipe_locked`
- `daily_inspiration_viewed`
- `daily_recipe_opened`

### Grocery events

- `grocery_list_generated`
- `grocery_item_manual_added`
- `grocery_item_checked`

### Favorites events

- `favorite_recipe_added`
- `favorite_plan_added`

### Subscription events

- `paywall_viewed`
- `paywall_cta_clicked`
- `subscription_started`
- `subscription_trial_started`
- `subscription_restored`
- `entitlement_activated`

## Core metrics

### Primary metrics

1. Weekly plan confirmation rate
   - `weekly_plan_confirmed / weekly_plan_generated`
2. Paywall conversion rate
   - `subscription_started / paywall_viewed`
3. D7 retained planner usage
   - users with at least one weekly or daily planning action on day 7

### Guardrail metrics

1. Onboarding completion rate
2. Crash-free session rate
3. Plan generation latency p95
4. Refund/cancel rate

## Initial experiment backlog

### EXP-001 - Paywall headline framing

- **Hypothesis**: benefit-oriented copy improves conversions.
- Variant A: "Unlock unlimited weekly plans"
- Variant B: "Never run out of dinner ideas"
- Primary metric: paywall conversion
- Guardrails: onboarding completion, D7 retention

### EXP-002 - Paywall presentation timing (phase 2)

- Variant A: show at onboarding end (current default)
- Variant B: show after first confirmed weekly plan
- Primary metric: trial/subscription start rate
- Guardrails: first-session drop-off, D1 retention

### EXP-003 - Quota progress visibility

- Variant A: subtle "free plans left" badge
- Variant B: explicit counter card in Meals weekly view
- Primary metric: weekly plan confirmation before quota exhaustion
- Guardrails: support tickets/negative feedback rate

### EXP-004 - Annual vs monthly card emphasis

- Variant A: annual card highlighted
- Variant B: monthly card highlighted
- Primary metric: ARPPU and conversion rate
- Guardrails: early cancellation rate

## Statistical and operational guidance

1. Minimum sample size required before declaring winners.
2. Run experiments across complete weekly usage cycles where applicable.
3. Freeze experiment settings during app release weeks with major UX changes.
4. Maintain experiment changelog with:
   - start/end date
   - winning variant
   - metric deltas
   - decision and follow-up actions

## Data contracts

1. Every event includes:
   - `user_id` (or anonymous id before account linkage)
   - `session_id`
   - `app_version`
   - `platform`
   - `experiment_assignments` map (if active)
2. No raw PII in analytics payloads.
3. Entitlement state transitions should be mirrored from RevenueCat webhooks into analytics.
