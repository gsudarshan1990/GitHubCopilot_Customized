
---
name: API instructions
description: |
	API-specific guidance for OctoCAT Supply backend development. Loaded for requests
	that change or add API code under `api/src/**`. Use these rules to keep the
	Express TypeScript API consistent, secure, and well-documented.
applyTo:
	- "api/src/**"
---

Purpose
-------
This file defines repository-specific rules and preferences for working on the
API in this project. Use it when making code changes, adding endpoints,
refactoring models, or updating OpenAPI documentation.

When to use
-----------
- Creating, editing, or refactoring files under `api/src/`
- Generating or updating OpenAPI/Swagger docs
- Implementing persistence, validation, tests, or CI for API code

Key conventions
---------------
- Language & style: TypeScript for all server code. Keep existing import style
	(ESM with `import` statements). Follow existing naming: `camelCase` fields,
	`PascalCase` interfaces in `api/src/models`.
- Routing: mount routers under `/api/<resource>` and implement standard CRUD
	patterns (`GET`, `POST`, `PUT`, `DELETE`). Add specialized actions as
	sub-paths (e.g., `/status`) only when necessary and clearly documented.
- Documentation: Always update Swagger/OpenAPI annotations in the route or
	model file when changing request/response shapes. The project exposes
	interactive docs at `/api-docs`.

Security & safety rules (MUST follow)
-----------------------------------
- Never add code that executes arbitrary shell commands from request data.
	If a feature needs to trigger external notifications, use a vetted
	integration (webhook, message queue) or a whitelist of allowed safe
	operations. The existing `PUT /api/deliveries/:id/status` handler uses
	`child_process.exec` — do NOT expand this pattern. Consider removing or
	replacing it with a safe notifier.
- Do not commit secrets or credentials. Use environment variables and
	`.env` management for local dev only. Ensure `.env` is excluded from
	commits.
- Validate inputs: add request validation using a schema library (prefer
	`zod` or `Joi`) before trusting `req.body` or path params.
- Sanitize and coerce numeric IDs from request params using `parseInt` and
	handle NaN cases gracefully with 400 responses.

Persistence & data
------------------
- The codebase currently uses in-memory seed data (`api/src/seedData.ts`) for
	demo purposes. When implementing persistence, prefer a lightweight SQL
	database (SQLite/Postgres) with migrations (use `knex`, `Prisma`, or
	TypeORM). Add a data layer (repository/service) and keep route handlers thin.
- When adding DB integrations, add migration scripts and update README build
	steps. Seed data should be migrated to proper SQL seed/migration files.

API design & quality
--------------------
- Add pagination (`limit`, `offset` or `page`), filtering, and sorting for
	collection endpoints returning arrays.
- Implement API versioning (e.g., `/api/v1/...`) for backwards compatibility
	when changing contracts.
- Add centralized error handling middleware and structured logging (use
	`morgan` for request logs and `pino`/`winston` for app logs).
- Add health check endpoint (e.g., `/health` or `/api/health`) and readiness
	probe for container deployments.

Testing & CI
------------
- Add unit tests for route handlers and service/repository logic. Use `vitest`
	for the API (project already includes `vitest.config.ts`).
- Add integration tests that run against an ephemeral DB (SQLite in-memory) or
	a test docker-compose environment. Ensure test seeds are recreated per test.
- Include linting and type-check steps in CI, and run tests in pull request
	workflows.

Developer workflow tips
----------------------
- When proposing changes that impact API shape, update the OpenAPI
	annotations in `api/src/models/*.ts` or `api/src/routes/*.ts` so the
	interactive docs remain accurate.
- Run full build locally with:

```bash
npm install
npm run build
```

- Start dev servers with `npm run dev` (runs API and frontend concurrently).

Helpful sample prompts for Copilot in this repo
---------------------------------------------
- "Create an endpoint `GET /api/products?limit=20&page=1` that returns
	paginated products and updates the OpenAPI annotations."
- "Replace the `child_process.exec` usage in `api/src/routes/delivery.ts` with
	a safe webhook notifier that POSTs a JSON payload to a configurable URL."
- "Add input validation to `POST /api/orders` using `zod` and return `400`
	when validation fails. Update tests accordingly."

If ambiguous
------------
If a request is unclear (scope, database choice, auth model), ask these
clarifying questions before producing code:
- Should changes affect only demo data (in-memory), or should they include
	a persistent backend and migrations?
- Is JWT-based auth acceptable, or do you prefer session-based/OAuth?
- Which DB should we target for first-class support: SQLite (simple) or
	Postgres (production-like)?

Release notes
-------------
When merging API changes that modify request/response shapes, include a
short `API CHANGE` note in the PR body describing breaking changes and any
needed client updates.

---
Saved by Copilot agent helper — follow these rules when touching `api/src`.

