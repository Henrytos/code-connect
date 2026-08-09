# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

pnpm-workspace monorepo with two apps (single git repo — there is intentionally no nested `.git`):

- `apps/frontend` — React 19 + Vite 8 (JavaScript, no TypeScript)
- `apps/backend` — NestJS 11 (TypeScript)

Workspace is defined by `pnpm-workspace.yaml` glob `apps/*`. There are no shared packages yet — each app is self-contained with its own `package.json`. All commands are run from the repo root via `pnpm --filter <name>`.

Note: Tailwind, Vitest, and the atomic-design `src/components/` tree are **conventions to adopt** (below) — they are not installed/scaffolded yet.

Stack versions: Node 22, pnpm 11.

## Commands (run from repo root)

```bash
pnpm dev              # both apps in parallel
pnpm dev:front        # Vite dev server → http://localhost:5173
pnpm dev:back         # NestJS watch mode  → http://localhost:3000 (override with PORT)

pnpm build            # both apps
pnpm build:front      # vite build → apps/frontend/dist
pnpm build:back       # nest build → apps/backend/dist

pnpm --filter frontend lint   # oxlint (NOT eslint) — config: apps/frontend/.oxlintrc.json
pnpm --filter backend lint    # eslint --fix — config: apps/backend/eslint.config.mjs
pnpm --filter backend format  # prettier --write on src/ and test/ — config: apps/backend/.prettierrc

# Tests exist only in the backend
pnpm --filter backend test          # unit tests (*.spec.ts, ts-jest)
pnpm --filter backend test:e2e      # e2e tests (test/jest-e2e.json, supertest)
pnpm --filter backend test:cov      # unit tests with coverage (jest --coverage)
pnpm --filter backend test -- test/app.controller.spec.ts   # single test file
```

## Frontend conventions (`apps/frontend`)

### Atomic Design
Components follow the Atomic Design hierarchy under `src/components/`, one folder per level:

```
src/components/
  atoms/       # smallest building blocks — Button, Input, Icon (no state, no business logic)
  molecules/   # composites of atoms — SearchBar, FormField
  organisms/   # composites of molecules — Header, ProductCard
  templates/   # page-level layout only, no data fetching
  pages/       # route-level — composes organisms, owns data fetching
```

Each component lives in a self-contained folder:

```
src/components/atoms/Button/
  Button.jsx
  Button.test.jsx
```

### Styling — Tailwind CSS
- All styling uses Tailwind CSS (utility-first). No CSS modules, styled-components, or ad-hoc CSS files for component styling.
- Tailwind is **not installed yet** — run `pnpm --filter frontend add tailwindcss @tailwindcss/vite` when starting frontend work, wire the plugin into `vite.config.js`, and reference `tailwind.config.js`.

### Component tests
- **Every component requires a test** (Vitest + React Testing Library — setup pending, mirrors backend's ts-jest convention).
- Each test covers the component's **essential use**: render, the key user interactions, and its props variations (all states the component can be in).
- Test files are colocated as `*.test.jsx` next to the component.

## Backend conventions (`apps/backend`)

The API must be adherent to REST principles:

- **Resources as plural nouns** in URLs (`/users`, `/orders`), no verbs in paths.
- **Correct HTTP verb per operation**: `GET` read · `POST` create · `PATCH`/`PUT` partial/full update · `DELETE` remove.
- **Correct status codes**: `200` OK · `201` Created · `204` No Content · `400` Bad Request · `401` Unauthorized · `403` Forbidden · `404` Not Found · `409` Conflict · `422` Unprocessable Entity (validation) · `500` Internal Server Error. Use NestJS's `HttpException` / built-in exceptions rather than throwing bare errors.
- **NestJS decorators map verbs**: `@Get()`, `@Post()`, `@Patch()`, `@Put()`, `@Delete()` in controllers; `@Param()`, `@Query()`, `@Body()` for input.
- **Thin controllers, fat services**: controllers handle routing + input validation only; business logic lives in services (`@Injectable`), which stay unit-testable.
- **DTOs for payloads** — define request/response shapes with DTO classes and `class-validator` for validation instead of ad-hoc `any` bodies.
- **Stateless**: no server-side session state; use standard auth (e.g., JWT via `Authorization` header) when auth is added.
- **Version the API** once it grows — NestJS `setGlobalPrefix('v1')` in `main.ts`.

## Git conventions

**Conventional Commits** — every commit message follows `<type>(<scope>): <description>`:

- `feat` — new feature
- `fix` — bug fix
- `refactor` — neither a fix nor a feature
- `docs` — documentation only
- `test` — adding/updating tests
- `chore` — maintenance (deps, tooling)
- `build` — build-system changes
- `ci` — CI configuration
- `perf` — performance improvement
- `style` — formatting, no behavior change

Scopes identify the app: `front` or `back` — e.g. `feat(front): add Button atom`, `fix(back): return 404 on missing user`.

Breaking changes: append `!` to the type/scope (`feat(front)!: ...`) and add a `BREAKING CHANGE:` footer.

## Architecture notes

- **Root `package.json` scripts** are thin wrappers over `pnpm --filter`. The `dev` shortcut (`pnpm -r --parallel dev`) requires every workspace package to expose a `dev` script — the backend aliases `dev` → `nest start --watch` (alongside the NestJS default `start:dev`). Keep that alias if you rename scripts.
- **Backend port** is `process.env.PORT ?? 3000` in `apps/backend/src/main.ts`. Frontend runs on Vite's default 5173.
- **Frontend linting is oxlint**, not ESLint — `apps/frontend/.oxlintrc.json` enables the `react` and `oxc` plugins (rules-of-hooks, only-export-components). Don't reach for ESLint config there.
- **Native build approval**: `pnpm-workspace.yaml` sets `allowBuilds.unrs-resolver: false` (postinstall blocked). This is intentional — the package is a transitive dep of the oxc/oxlint stack and build/lint/dev all work without it. Re-enable via `pnpm approve-builds` only if a runtime error appears.
- `.gitignore` is layered: root ignores `node_modules/` workspace-wide; each app has its own `.gitignore` (frontend from the Vite template, backend hand-created) so apps stay self-contained. `pnpm-lock.yaml` is committed.
