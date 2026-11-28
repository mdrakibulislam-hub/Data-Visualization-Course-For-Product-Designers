# ![Graphnotes](apps/web/public/graphnotes-logo.svg)

Graphnotes offers self-paced Data Visualization and Human–Computer Interaction courses for product designers. Both include lessons, questions with feedback, flashcards, quizzes, reading sources, and browser-saved progress. Data Visualization includes Chart Lab, its 49-entry atlas, and chart capstones. HCI includes 40 lessons in ten modules, 16 interface experiments, a plain-language glossary, saved predictions, and two independent capstone workspaces. All teaching observations and lab transactions are clearly fictional.

## Local development

Install Bun 1.4.2 or newer. From the project root, run the web app.

```bash
bun install
[ -f apps/web/.env ] || cp apps/web/.env.example apps/web/.env
bun run dev:web
```

Open [the course](http://localhost:5173). Lesson progress, quiz answers and scores, flashcard progress, capstone drafts and checklists, and appearance are saved in the browser for this site address. The course is open to everyone. Clearing this site's data clears saved progress.

### Run the starter API and authentication

The Hono and Better Auth starter routes can run with the full workspace. Generate a local secret and apply the SQLite migration.

```bash
[ -f apps/server/.env ] || sed "s/^BETTER_AUTH_SECRET=$/BETTER_AUTH_SECRET=$(openssl rand -hex 32)/" apps/server/.env.example > apps/server/.env
bun run db:migrate
bun run dev
```

The [Hono API](http://localhost:3000) uses SQLite at `local.db` in the project root. The starter sign-in screen is at `/login`.

## Course content

Data Visualization lesson copy and questions live in `apps/web/src/course/curriculum.ts`. HCI content, sources, activities, glossary, and project state live in `apps/web/src/course/hci/`. See `docs/hci-course-implementation.md` for HCI routes, learning behavior, and validation. The original learning datasets and chart variants live in `apps/web/src/course/lab-data.ts`. Reading notes live in `apps/web/src/course/sources.ts` and appear on the Sources page. Lesson IDs also key browser progress, so keep them stable when revising content.

## Project layout

| Workspace | Purpose |
| --- | --- |
| `apps/web` | React, Vite, TanStack Router, and Astryx |
| `apps/server` | Hono server with tRPC and Better Auth endpoints |
| `packages/api` | tRPC routers and procedure definitions |
| `packages/auth` | Better Auth configuration |
| `packages/db` | Drizzle schema, SQLite connection, and migrations |
| `packages/ui` | Shared shadcn/ui components and styles |
| `packages/config` | Shared TypeScript configuration |

## Astryx design system

The web app extends Astryx's Neutral theme with its expressive motion setting, Inter for reading and controls, and Inter Display for headings. App icons use Reicon. Astryx AppShell and SideNav provide the desktop sidebar and mobile navigation drawer. The appearance segments offer Default, Sepia, and Dark. The lesson reader and chart exercise controls are working examples in `apps/web/src/course`.

Import components from their individual package paths. The app already loads the theme and styles for every route.

```tsx
import { Button } from "@astryxdesign/core/Button";

export function ContinueButton({ onContinue }: { onContinue: () => void }) {
  return <Button label="Continue" variant="primary" onClick={onContinue} />;
}
```

Run the local CLI from the project root with Node.js 22.13 or newer.

```bash
bun run astryx component                 # List components
bun run astryx component Button          # Show imports, props, and usage
bun run astryx docs tokens/tokens-data   # Discover chart color tokens
bun run astryx theme list                 # Browse themes
bun run astryx doctor                    # Check the app's Astryx setup
```

Use Astryx component props and theme tokens for styling. Tailwind utilities are available for layout and the existing shared UI. Keep Core, the theme package, and the CLI on the same Astryx release. [Astryx documentation](https://astryx.atmeta.com/docs/getting-started)

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
