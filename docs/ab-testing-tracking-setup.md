# A/B Tracking Setup (Initial Implementation)

## Scope

Implements the first analytics and experimentation baseline from `plan/06-ab-testing-and-analytics.md`.

## Implemented artifacts

1. Mobile analytics event names and context contract:
   - `apps/mobile/src/types/analytics.ts`
   - `apps/mobile/src/services/analytics.ts`
2. API experiment definitions and deterministic assignment:
   - `apps/api/src/modules/experiments/definitions.ts`
   - `apps/api/src/modules/experiments/service.ts`
3. API endpoint for assignment fetch:
   - `GET /v1/experiments/assignments/:userId`

## Event payload contract

Every analytics event must include:

- `user_id` (nullable before identity linking)
- `session_id`
- `app_version`
- `platform`
- `experiment_assignments` map

## Integration sequence

1. Resolve user identity and session in app bootstrap.
2. Fetch experiment assignments from backend.
3. Initialize analytics service with baseline context.
4. Emit events from onboarding, meals, grocery, favorites, and paywall flows.

## Next implementation tasks

1. Add concrete PostHog sink implementation for API and mobile.
2. Mirror RevenueCat entitlement transitions into analytics stream.
3. Add dashboards for:
   - weekly plan confirmation rate
   - paywall conversion rate
   - D7 retained planner usage
4. Add guardrail monitors:
   - onboarding completion
   - crash-free sessions
   - plan generation p95 latency
   - refund/cancel rate
