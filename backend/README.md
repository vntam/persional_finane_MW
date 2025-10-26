# Backend Structure

- `src/modules`: Domain-driven folders (auth, users, transactions, categories, budgets, goals, ai).
- `src/config`: Shared env/prisma helpers.
- `src/routes`: Aggregates module routers into the Express app.
- `prisma/schema.prisma`: Data model for PostgreSQL via Prisma.

Use this as a starting point for controllers/services; keep business logic inside each module, not the router aggregator.
