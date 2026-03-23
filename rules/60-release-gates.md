# 60 - Release Gates

All gates must pass unless explicitly waived and documented by Safety Agent.

## Gate A - Product correctness

- Onboarding captures diet, dislikes, allergies/restrictions.
- Weekly vs daily planning distinction works as specified.
- Plan confirmation updates current plan and preserves prior plans in history.

## Gate B - Auth and access

- Passwordless auth paths work (magic link, Google, Apple).
- Provisional access is allowed.
- Verification is enforced for share household/pro/subscribe actions.
- Recipe sharing works without household membership.

## Gate C - Billing and quotas

- One-time free weekly plan quota = 3 confirmed plan generations.
- Daily inspiration is unlimited.
- Randomizer and plan editing do not consume weekly credits.
- RevenueCat entitlement sync and restore purchases are reliable.

## Gate D - Data and sync

- Grocery list ingredient aggregation works with unit normalization.
- Household grocery list sync works across devices.
- Plan history retention is stable and retrievable.

## Gate E - Performance and UX

- Weekly feed default load is fast and stable.
- Bottom nav transitions are snappy.
- Cooking mode swipe + button navigation is smooth.
- Animations are minimal and short (sign-up + plan generation only).

## Gate F - Offline behavior

- Cached current plan and favorites load in read-only mode when offline.
- Mutations fail gracefully with clear user feedback.
