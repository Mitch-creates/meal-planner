# 70 - Performance Budgets

Performance is a first-class requirement for this product.

## Target budgets

- Cold start (mid-range device): under 2.0s to first usable screen
- Bottom tab switch: under 150ms perceived
- Weekly plan generation feedback: under 700ms perceived to first response state
- Recipe screen open: under 300ms perceived

## UX policy

- Keep animations minimal and purposeful.
- Avoid long blocking spinners; prefer progressive rendering.
- Use skeleton states over blank loading screens.

## Technical policy

- Cache read-heavy screens (current plan, favorites).
- Keep payloads small and query only required fields.
- Virtualize long lists.
- Debounce expensive filter operations.

## Monitoring

- Capture performance telemetry for app start, tab switch, and plan generation latency.
- Regressions above 20% from baseline trigger a blocked release unless waived.
