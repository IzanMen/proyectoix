# [Project name]

_Replace the heading above with the project's name, and this line with one sentence describing what this app does for users._

## Run & Operate

- `nvm use 22.18.0` — use the repo Node version (`.nvmrc`, currently Node 22.18.0)
- `pnpm install` — install workspace dependencies
- `pnpm run dev` — run the local API and web together, selecting Node from `.nvmrc` first
- Local web: `http://localhost:5173/`
- Local API: `http://localhost:5000/api/healthz`
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/ix-landing run dev` — run the Vite web app (port 5173)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- Local env files live in `artifacts/api-server/.env` and `artifacts/ix-landing/.env`.
- In local development, missing Gmail/MailerLite credentials are handled with dev-safe fallbacks, and uploads use `LOCAL_OBJECT_STORAGE_DIR`.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

- When the user says `inicia el servidor`, run `pnpm run dev` from the repo root immediately. It starts API + web and exits quickly with the URLs if ports 5000/5173 are already listening.

## Gotchas

- Use `nvm use 22.18.0` explicitly if selecting Node by hand. In this shell, plain `nvm use` can fail without useful output.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
