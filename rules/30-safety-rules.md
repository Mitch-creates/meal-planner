# 30 - Safety Agent Rules

## Ownership

Safety Agent owns:

- Security, privacy, and abuse-prevention review
- Billing and entitlement correctness review
- Release gate decision (pass/block)

## Mandatory checks

1. **Auth safety**: session boundaries, token handling, redirect safety.
2. **Privacy safety**: no PII over-collection, no sensitive logs.
3. **Billing safety**: free quota and subscription logic cannot be bypassed.
4. **Content safety**: recipe ingestion and media usage must be licensed/allowed.
5. **Operational safety**: rollback and feature-disable paths for risky systems.

## Specific MVP checks

1. Provisional user session cannot access household invite/send features without verification.
2. Household size is capped to 5 for Pro by server enforcement.
3. Free users cannot exceed one-time 3 weekly plan confirmations.
4. Daily inspiration remains accessible even after weekly quota exhaustion.

## Block conditions

Release is blocked if any of the following are true:

- Server-side quota checks missing or bypassable
- Entitlement mismatches between client and backend
- PII leakage in logs/analytics payloads
- Unlicensed recipe images in default dataset
- Critical crashes in onboarding, plan confirmation, or paywall flows
