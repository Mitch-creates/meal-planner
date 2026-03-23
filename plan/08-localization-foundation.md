# 08 - Localization Foundation

## MVP requirements

- Ship in English.
- Build a translation system that is easy to extend.
- Support locale-aware units and formatting from day one.

## Recommended setup

- `i18next`
- `react-i18next`
- `expo-localization`

## Key implementation rules

1. Keep translation keys typed and grouped by domain:
   - `onboarding.*`
   - `meals.*`
   - `groceries.*`
   - `favorites.*`
   - `settings.*`
2. Do not hardcode user-facing strings in components.
3. Use fallback language (`en`) when key missing.
4. Keep ICU-style interpolation for dynamic values.

## Formatting

- Centralize formatters:
  - numbers
  - dates
  - units
- Unit preferences are user-configurable (`metric`, `imperial`).

## Deferred items

- RTL support is explicitly out of MVP.
- Multi-language recipe content is out of MVP.
