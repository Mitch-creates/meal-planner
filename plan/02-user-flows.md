# 02 - Primary User Flows

## Flow A - First-run onboarding (provisional user)

1. User opens app.
2. User enters email (or chooses Google/Apple).
3. Provisional session starts immediately.
4. User completes onboarding:
   - diet type
   - dislikes
   - allergies/restrictions
   - planning preferences (time, budget, difficulty, servings, variety)
5. App lands on Meals tab (weekly default).
6. Paywall is shown at onboarding end, with skip path for free usage.

## Flow B - Weekly plan generation and confirmation

1. User opens Meals (weekly view by default).
2. User taps "Generate weekly plan."
3. App produces plan proposal based on preferences and restrictions.
4. User may:
   - lock specific recipes
   - randomize remaining slots
   - swap individual meals
5. User confirms plan.
6. Confirmed plan becomes current plan.
7. Prior current plan moves to history list.

## Flow C - Daily inspiration

1. User switches to Daily Inspiration section.
2. App shows dinner ideas based on preferences and restrictions.
3. User can favorite recipes or open detail.
4. Daily inspiration remains available even when weekly free quota is exhausted.

## Flow D - Grocery list generation and editing

1. User opens Groceries tab after confirming weekly plan.
2. App generates grocery list by aggregating recipe ingredients.
3. Unit normalization is applied where possible.
4. User manually adds custom items if needed.
5. In household mode, list updates sync across devices.

## Flow E - Favorites

1. User favorites recipes from Meals or Daily Inspiration.
2. User can also favorite full weekly plans.
3. Favorites tab displays both recipes and plans.
4. Favorites are available offline from cache in read-only mode.

## Flow F - Household sharing

1. User tries to share household.
2. If user is unverified provisional account, app prompts verification.
3. User verifies email and (if needed) upgrades to Pro.
4. User invites members via email or invite code/link.
5. Members join and share groceries/plans (max 5).

## Flow G - Subscription restore

1. User reinstalls app or changes device.
2. User signs in.
3. User opens Settings > Subscription > Restore Purchases.
4. RevenueCat sync restores active entitlement.
