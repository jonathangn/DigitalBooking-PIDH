# Digital Booking — Frontend

## Code conventions

- **Identifiers** (variables, functions, files, folders) are written in **English**.
- **UI strings** shown to the user remain in **Spanish** (the product is Spanish).
- ESLint (9 flat config, `eslint.config.mjs`) and Prettier are enforced via:
  - `npm run lint`
  - `npm run format:check` (use `npm run format` to auto-fix)
  - Both run on CI before deploy.

## Folder structure

- `src/utils/` — shared helpers (`navigation.js`, `Modal.jsx`, `Portal.js`, `scrollTo.js`)
- `src/Helpers/` — API/auth helpers
- `src/components/` — reusable UI components
- `src/pages/` — route-level views
- `src/context/` — React context providers
- `src/routing/` — route definitions
- `src/jsons/` — static data
