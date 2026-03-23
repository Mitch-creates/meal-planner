# 04 - Data Model (MVP + Expansion-Ready)

## Goals

1. Support MVP dinner-only planning.
2. Keep schema extensible for breakfast/lunch later.
3. Enforce quotas and entitlements server-side.

## Core entities

### users

- `id` (pk)
- `email` (nullable for social-first until normalized)
- `display_name`
- `is_verified`
- `created_at`

### auth_identities

- `id` (pk)
- `user_id` (fk -> users.id)
- `provider` (`magic_link`, `google`, `apple`)
- `provider_user_id`
- `created_at`

### user_preferences

- `user_id` (pk/fk -> users.id)
- `diet_type` (enum/string)
- `time_to_cook_pref`
- `budget_pref`
- `difficulty_pref`
- `servings_pref`
- `variety_pref`
- `locale`
- `unit_system` (`metric`, `imperial`)

### user_dislikes

- `id` (pk)
- `user_id` (fk)
- `ingredient_id` (fk)

### user_restrictions

- `id` (pk)
- `user_id` (fk)
- `restriction_type` (`allergy`, `dietary`, etc.)
- `ingredient_id` (nullable for non-ingredient restrictions)

### households

- `id` (pk)
- `created_by_user_id` (fk)
- `created_at`

### household_members

- `household_id` (fk)
- `user_id` (fk)
- composite unique `(household_id, user_id)`

### household_invites

- `id` (pk)
- `household_id` (fk)
- `invite_type` (`email`, `code`)
- `email` (nullable)
- `invite_code` (nullable)
- `expires_at`
- `created_by_user_id`

### meal_types

- `id` (pk)
- `slug` (`breakfast`, `lunch`, `dinner`)
- `display_name`
- `is_active`

> MVP plan generation uses `dinner`, but table supports future activation of other meal types.

### ingredients

- `id` (pk)
- `name`
- `base_unit` (for normalization)

### recipes

- `id` (pk)
- `title`
- `description`
- `image_url`
- `prep_time_minutes`
- `cook_time_minutes`
- `difficulty`
- `is_trending` (boolean)
- `trend_source` (nullable, curated metadata)
- `is_active`

### recipe_steps

- `id` (pk)
- `recipe_id` (fk)
- `step_order`
- `instruction_text`

### recipe_step_ingredients

- `id` (pk)
- `recipe_step_id` (fk)
- `ingredient_id` (fk)
- `amount`
- `unit`

> Used to show ingredient amounts per cooking step.

### recipe_ingredients

- `id` (pk)
- `recipe_id` (fk)
- `ingredient_id` (fk)
- `amount`
- `unit`

### weekly_plans

- `id` (pk)
- `user_id` (fk)
- `is_current` (boolean)
- `confirmed_at`
- `created_at`

### weekly_plan_items

- `id` (pk)
- `weekly_plan_id` (fk)
- `day_of_week` (1-7)
- `meal_type_id` (fk -> meal_types.id)
- `recipe_id` (fk)
- `is_locked` (boolean)

### daily_inspirations

- `id` (pk)
- `user_id` (fk)
- `date`
- `recipe_id` (fk)
- `created_at`

### plan_generation_ledger

- `id` (pk)
- `user_id` (fk)
- `generation_type` (`weekly_confirmed`)
- `consumed` (boolean)
- `reason` (e.g., `confirmed_plan`)
- `created_at`

> Server computes free quota as count of consumed weekly confirmations for non-pro users.

### favorites_recipes

- `user_id` (fk)
- `recipe_id` (fk)
- `created_at`
- composite unique `(user_id, recipe_id)`

### favorites_plans

- `user_id` (fk)
- `weekly_plan_id` (fk)
- `created_at`
- composite unique `(user_id, weekly_plan_id)`

### grocery_lists

- `id` (pk)
- `owner_type` (`user`, `household`)
- `owner_id`
- `source_weekly_plan_id` (fk)
- `created_at`

### grocery_list_items

- `id` (pk)
- `grocery_list_id` (fk)
- `ingredient_id` (nullable for manual custom rows)
- `custom_label` (nullable)
- `amount`
- `unit`
- `is_checked`
- `sort_order`

### subscriptions

- `id` (pk)
- `user_id` (fk)
- `provider` (`revenuecat`)
- `entitlement` (`pro`)
- `status` (`active`, `inactive`, `grace`, `expired`)
- `expires_at`
- `last_synced_at`

## Key constraints

1. Weekly free quota enforced by server from `plan_generation_ledger`.
2. Household membership max 5 enforced by service layer.
3. One current weekly plan per user (`is_current` unique partial index).
4. Ingredient aggregation and normalization occurs when writing grocery list items.
