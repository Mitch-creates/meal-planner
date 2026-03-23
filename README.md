# Meal Planner - Agentic Build Workspace

This repository is planning-first. It contains the rules and product documents that govern implementation by multiple agents.

## Current status

- Planning and guardrails are defined.
- Implementation has not started.
- All development should follow the role-based rules in `rules/`.

## Agent roles

- **Planner Agent**: owns scope, user stories, acceptance criteria, and backlog sequencing.
- **Developer Agent**: owns implementation, tests, and technical delivery.
- **Safety Agent**: owns privacy, security, abuse-prevention, policy checks, and release gates.

## Document map

- `rules/`: non-negotiable behavior and delivery constraints.
- `plan/`: product specification, architecture, data model, backlog, metrics, and experimentation plan.

## Product snapshot

MVP is a React Native meal planner focused on:

- Dinner-first weekly planning
- Daily inspiration feed
- Grocery list generation and aggregation
- Favorites and cooking mode
- Passwordless auth (magic link + Google/Apple)
- Free plan with one-time weekly generation quota, plus subscription upgrades

See `plan/01-mvp-contract.md` for the locked contract.
