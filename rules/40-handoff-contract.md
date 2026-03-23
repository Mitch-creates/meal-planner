# 40 - Inter-Agent Handoff Contract

## Status model

- `draft`: planning in progress
- `ready_for_build`: Planner handoff complete
- `in_build`: Developer implementing
- `ready_for_safety`: Developer handoff complete
- `blocked`: Safety found release blocker(s)
- `approved`: Safety pass
- `done`: merged and documented

## Required handoff payload

Every handoff includes:

1. Task ID and title
2. Current status
3. Scope summary
4. Acceptance criteria checklist
5. Evidence links (tests/screens)
6. Risks and assumptions

## Planner -> Developer

Must include:

- Final acceptance criteria
- Out-of-scope
- Required telemetry events
- Test expectations

## Developer -> Safety

Must include:

- Commit references
- Test results
- Data model impact
- Auth/billing impact
- Known deviations

## Safety -> Planner

Must include:

- Pass/block verdict
- Blocking issues (if any)
- Required remediations
- Residual risks accepted
