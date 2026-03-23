# 07 - Monetization and Entitlements

## Free plan

- 3 one-time weekly plan confirmations
- Unlimited daily inspiration
- Favorites always free
- Recipe browsing always free

## Pro plan

- Unlimited weekly plan confirmations
- Household sharing (max 5 members)
- Curated trend recipe packs

## Entitlement model

### Source of truth

- RevenueCat store entitlement state
- Backend shadow state for authorization checks

### Why server enforcement matters

Client-only limits can be bypassed by reinstalling app or clearing storage.  
Quota checks and entitlement checks must run on backend APIs.

## Quota accounting rules

1. Credit consumed only when weekly plan is confirmed.
2. Credit not consumed for:
   - randomizer usage
   - plan edits/swaps
   - daily inspiration interactions
3. Quota is one-time (lifetime free cap), not periodic reset.

## Paywall behavior

1. Show at end of onboarding.
2. Keep discoverable entry in app (Settings and strategic CTA points).
3. Hide paywall for active subscribers.

## Restore purchases

- Settings includes "Restore Purchases."
- On success, entitlement and server state must sync before UI unlocks Pro features.
