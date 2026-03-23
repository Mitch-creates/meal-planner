# 00 - Global Rules

These rules apply to every agent, task, and deliverable.

## Source of truth

1. `plan/01-mvp-contract.md` is the canonical MVP scope.
2. Any scope change must be written in the contract before implementation.
3. If docs and code conflict, code is considered invalid until docs are reconciled.

## Change control

1. No feature work starts without acceptance criteria.
2. No hidden scope expansion. Additive ideas go to backlog.
3. Every completed task must reference a backlog item.

## Quality and reliability

1. Every production change includes tests or a written test waiver approved by Safety Agent.
2. No "TODO fix later" in security, auth, or billing paths.
3. No logging of secrets, auth tokens, or PII.

## Security and privacy

1. Least-privilege permissions only.
2. Server-side enforcement for all plan limits and entitlement checks.
3. Data collection must be minimal and justified in docs.

## Product constraints (MVP)

1. Dinner-only planning for generated plans.
2. No pantry tracking in MVP.
3. No notifications in MVP.
4. Offline mode is read-only for cached current plan and favorites.

## Delivery behavior

1. Keep architecture simple and reversible.
2. Prioritize app snappiness over visual complexity.
3. All analytics events must map to a documented metric or experiment.
