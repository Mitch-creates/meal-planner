# 03 - Architecture Baseline

## High-level stack

- **Mobile app**: React Native (Expo)
- **API/backend**: Node service (Hono or Next API routes)
- **Database**: Postgres (Supabase-hosted Postgres acceptable)
- **ORM/migrations**: Drizzle
- **Auth**: Better Auth
- **Subscriptions**: RevenueCat
- **Analytics/experiments telemetry**: PostHog
- **Localization**: i18next + react-i18next + expo-localization
- **Client data/cache**: TanStack Query + MMKV (or SecureStore for auth/session artifacts)

## Why this architecture

1. Supports relational entities (plans, recipes, users, households, groceries, favorites, entitlements).
2. Enables server-authoritative free quota checks and billing integrity.
3. Keeps app responsive with local cache and selective network fetches.
4. Allows future expansion to breakfast/lunch without data model rewrite.

## Auth architecture details

- Passwordless-first flows:
  - email magic link
  - Google OAuth
  - Apple OAuth
- Provisional session state:
  - user can use app before verification
  - restricted actions require verification (household and subscription-sensitive actions)
- Auth abstraction layer in app:
  - `AuthService` interface decouples app screens from provider specifics
  - reduces migration risk if provider behavior changes

## Subscription architecture details

- RevenueCat as source for store entitlements.
- Backend maintains entitlement shadow state for authorization checks.
- Client reads entitlement state via backend APIs.
- Restore purchases entrypoint in Settings.

## Data access patterns

- Weekly plans and plan history: server-backed, cached client-side.
- Favorites and current plan: aggressively cached for read-only offline behavior.
- Grocery list: server-backed with real-time-ish sync polling or push refresh.

## Trend recipe ingestion (MVP-safe)

- No direct social scraping/ingestion in runtime.
- Curated internal trend dataset imported via admin pipeline.
- Recipe and media sources must be licensed/approved.

## Offline policy

- Read-only offline for:
  - current confirmed plan
  - favorites
- No write queue in MVP.

## Performance considerations

- Keep payloads lean and endpoint-specific.
- Prefer server-side filtering over heavy client transforms.
- Keep animation complexity low.
- Use list virtualization for long histories/favorites.
