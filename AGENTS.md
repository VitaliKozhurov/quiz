# Project guidance

## Stack

- NestJS 12 application written in TypeScript.
- PostgreSQL accessed through TypeORM.
- Configuration uses `@nestjs/config` and Zod.
- CQRS, Passport/JWT, `class-validator`, and `class-transformer` are available.
- Package manager: pnpm. Use the scripts declared in `package.json`.

## Source layout

```text
src/
  main.ts                 Application entry point
  app.module.ts           Root Nest module
  bootstrap/              Application setup: pipes, global prefix, app options
  config/                 Environment schema and typed configuration service
  core/                   Shared modules, database base entity, exceptions
  modules/
    database/             TypeORM configuration and database health check
    users/                User module: controller, service, repository, domain
```

Domain entities are kept under `src/modules/<module>/domain/`. `BaseDbEntity`
provides the common UUID primary key and audit columns for persistent entities.

## Required collaboration workflow

Do not change application code, configuration, database schemas, migrations,
dependencies, or tests immediately when asked to inspect, explain, diagnose, or
review something.

1. First inspect the relevant code and report the findings.
2. Propose a concrete solution, including relevant trade-offs or risks.
3. Wait for the user's explicit approval before making changes. Examples of
   approval: "implement it", "make the changes", "fix it", or "go ahead".
4. After approval, make only the agreed changes and run proportionate
   verification.

Do not treat a review request, a question, or a request for an explanation as
approval to edit files. Read-only checks are allowed. Do not run write-oriented
commands such as `format`, `lint --fix`, migration generation/application, or
dependency installation without explicit approval.

## Mandatory engineering skills

For every task in this repository, the agent must load and apply both of these
skills before analysing, reviewing, or implementing a solution:

- `nestjs-best-practices` — NestJS architecture, dependency injection,
  validation, security, error handling, testing, and API conventions.
- `typeorm` — entities, relations, repositories, transactions, migrations, and
  PostgreSQL/TypeORM persistence practices.

Use both skills even when the request appears to concern only one of the two
areas. If a skill is unavailable, state that fact and follow the remaining
project guidance.

## Implementation notes

- Preserve the modular NestJS structure; keep module-specific code inside its
  module rather than placing it in `core` without a clear cross-module reason.
- Use TypeORM relations and database constraints deliberately. For user-facing
  identifiers such as login and email, enforce required uniqueness in the
  database, not only in application code.
- Keep business construction logic free of repository or database calls. Put
  persistence orchestration and transactions in services/handlers.
- Treat authentication and verification values as sensitive. Prefer storing
  hashes of one-time tokens and keep expiration and cleanup behavior explicit.
