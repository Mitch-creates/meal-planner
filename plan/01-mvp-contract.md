# 01 - MVP Contract (Locked)

## Product thesis

Build a snappy React Native meal planner that reduces dinner decision fatigue with guided weekly planning, daily inspiration, and practical grocery execution.

## Platforms and design

- Platform: React Native app
- Design style: Neo-brutalism
- Animation policy: very limited, short, and snappy

## Core navigation

Bottom nav tabs:

1. Meals
2. Groceries
3. Favorites
4. Settings

## Onboarding and identity

### Onboarding sequence

- Preferences are collected before full account verification flow.
- Required onboarding data:
  - diet/menu type
  - ingredient dislikes
  - allergies/restrictions
  - planning preference settings

### Supported diet/menu types

- Keto
- Low carb
- Classic
- Flexitarian
- Vegetarian
- Vegan
- Pescatarian

### Auth model

- Passwordless only:
  - Email magic link
  - Google
  - Apple
- User can enter app immediately after email entry (provisional session).
- Email verification required only for:
  - household sharing actions
  - subscription/upgrade actions

### Household model

- One profile per user
- Household sharing supported (Pro)
- Household member roles are equal
- Invite methods:
  - email invite
  - invite link/code
- Max household size: 5 members

## Planning scope

### Meal scope

- Dinner-only for plan generation in MVP
- Designed to add breakfast/lunch later without schema rewrite

### Modes

- Default mode: weekly planning
- Separate tab/section for daily inspiration

### Weekly plan behavior

- User can generate weekly plan
- User confirms to make it the current plan
- User can generate a new plan at any time
- Previous plans remain visible:
  - recent prior plan preview at bottom
  - "See all" to full plan history list

### Randomizer behavior

- Weekly randomizer supported
- User can lock selected recipes and randomize remaining slots
- Randomizer does not consume free weekly generation quota

## Free vs Pro monetization

### Free

- 3 one-time weekly plan confirmations (lifetime cap)
- Unlimited daily inspiration
- Favorites always free
- Recipe browsing always free

### Pro

- Unlimited weekly plan confirmations
- Household sharing
- Trend recipe packs ("social-inspired curated set")

### Billing behavior

- RevenueCat for subscription and entitlement handling
- Restore purchases available in Settings
- Paywall visible at onboarding end and discoverable in app
- Paywall hidden when user is actively subscribed

## Groceries

- Auto-generated from confirmed plan
- Ingredient entries aggregated across recipes
- Unit normalization enabled
- Manual grocery item add supported
- Household sync supported across devices
- No per-item "who checked it" tracking in MVP

## Recipes and cooking mode

- Recipe detail includes ingredients and step list
- Cooking mode:
  - swipe and button navigation
  - manual next/previous only
  - each step includes amounts for used ingredients
  - adaptive larger typography for readability

## Localization

- Initial language: English
- Architecture must support future localization expansion
- Units and locale formatting support required in foundation
- RTL support deferred (not in MVP)

## Offline behavior

- Read-only offline support for:
  - cached current plan
  - favorites
- No offline mutations in MVP

## Explicit non-goals

- Pantry input/tracking
- Notifications
- Breakfast/lunch plan generation
- Direct social platform ingestion/parsing in production flow
