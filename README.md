# Data Visualization Course for Product Designers

A TypeScript monorepo with React and TanStack Router on the web, Hono and tRPC on Bun, SQLite with Drizzle, and email/password authentication with Better Auth. Bun manages dependencies and Turborepo runs workspace tasks.

## Local development

Install Bun 1.4.2 or newer and run `bun install` from the project root. On a fresh checkout, create the local environment files and generate a secret for Better Auth.

```bash
[ -f apps/server/.env ] || sed "s/^BETTER_AUTH_SECRET=$/BETTER_AUTH_SECRET=$(openssl rand -hex 32)/" apps/server/.env.example > apps/server/.env
[ -f apps/web/.env ] || cp apps/web/.env.example apps/web/.env
```

Apply the initial migration and start both apps.

```bash
bun run db:migrate
bun run dev
```

Open [the web app](http://localhost:5173). The home page checks the [Hono API](http://localhost:3000) via tRPC. Use the login page to create a local account and open the protected dashboard. SQLite stores data in `local.db` at the project root.

## Project layout

| Workspace | Purpose |
| --- | --- |
| `apps/web` | React, Vite, and TanStack Router |
| `apps/server` | Hono server with tRPC and Better Auth endpoints |
| `packages/api` | tRPC routers and procedure definitions |
| `packages/auth` | Better Auth configuration |
| `packages/db` | Drizzle schema, SQLite connection, and migrations |
| `packages/ui` | Shared shadcn/ui components and styles |
| `packages/config` | Shared TypeScript configuration |

## Commands

| Command | Purpose |
| --- | --- |
| `bun run dev:web` / `bun run dev:server` | Start one app in development mode |
| `bun run check-types` | Check TypeScript across the workspace |
| `bun run build` | Build both apps |
| `bun run db:generate` | Generate a migration from schema changes |
| `bun run db:migrate` | Apply pending migrations |
| `bun run db:push` | Apply the schema directly to a disposable SQLite database |
| `bun run db:studio` | Inspect the database with Drizzle Studio |
| `bun run auth:generate` | Regenerate the Drizzle schema for Better Auth |
| `bun run env:generate` | Regenerate TypeScript types after editing a `.env.schema` file |

Keep environment values in the ignored `.env` files. Varlock validates them against each app's `.env.schema` and generates types during `bun install`. Set `CORS_ORIGIN` to the web app's origin to allow browser requests to the API.
