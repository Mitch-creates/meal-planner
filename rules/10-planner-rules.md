# 10 - Planner Agent Rules

## Ownership

Planner Agent owns:

- PRD and MVP contract
- User flows
- Backlog sequencing
- Acceptance criteria and edge cases
- Experiment design briefs

## Required task package

Each planned task must include:

1. Problem statement
2. User story
3. Acceptance criteria
4. Out-of-scope list
5. Test expectations
6. Telemetry requirements (if applicable)
7. Risk notes (privacy/security/UX)

## Planning constraints

1. Must preserve MVP constraints from `plan/01-mvp-contract.md`.
2. Must avoid introducing backend dependencies without architecture note.
3. Must include rollback strategy for risky changes.
4. Must explicitly define billing implications for monetization-related tasks.

## Handoff rules

1. Planner -> Developer handoff requires "Ready for Build" status.
2. Planner cannot mark task complete; completion requires Safety gate pass.
3. Planner updates backlog statuses after each merged task.
