# 09 - KptnCook Inspiration Reference (MVP Input)

## Purpose

Capture inspiration patterns from KptnCook-style meal products while staying within the locked MVP contract and release gates.

## What we borrow (MVP-safe)

1. **Fast dinner decision flow**  
   Users should be able to move from "I do not know what to cook" to a concrete dinner plan in a few taps.
2. **Strong visual recipe discovery**  
   Daily inspiration cards should prioritize image, title, and quick metadata (time + difficulty).
3. **Progressive commitment**  
   Weekly generation remains low-friction; confirmation is explicit and is the only quota-consuming action.
4. **Execution continuity**  
   Cooking mode must reduce context switching by providing step navigation and ingredient amounts per step.

## Explicit boundaries

1. No direct social scraping or runtime ingestion.
2. No pantry, no notifications, no breakfast/lunch generation in MVP.
3. No offline write queue in MVP.

## UX guidance for implementation

1. **Meals tab default = weekly** with visible entry to daily inspiration.
2. **Daily inspiration card anatomy**:
   - image
   - recipe title
   - prep + cook time summary
   - dietary tags
3. **Weekly planner card anatomy**:
   - day label
   - dinner recipe
   - lock state affordance
   - swap/randomize affordance
4. **Quota transparency**:
   - free users can always see remaining confirmations
   - randomizer actions never decrement quota

## Data and analytics impact

1. Ensure `daily_inspiration_viewed` and `daily_recipe_opened` instrumentation on inspiration interactions.
2. Add experiment variant context to all planning and paywall events.
3. Track plan confirmation as the authoritative quota-consumption trigger.

## Acceptance criteria linkage

- Aligns with `plan/01-mvp-contract.md` sections: planning scope, monetization, and cooking mode.
- Must pass `rules/60-release-gates.md` Gate A, C, and E conditions.
