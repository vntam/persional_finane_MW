# Personal Finance Management Web App

Monorepo skeleton for a three-person team (FE, BE, AI/DevOps). Each folder holds minimal scaffolding and comments to explain expected responsibilities.

- `frontend/`: React + TypeScript + Vite + Tailwind workspace organized by feature domain (auth, dashboard, transactions, AI insights, settings).
- `backend/`: Node.js/Express API with Prisma ORM. Modules mirror business domains (auth, users, transactions, categories, budgets, goals, AI insights).
- `infra/`: Docker, database bootstrap, deployment notes, and future IaC definitions.
- `scripts/`: Repeatable operational helpers (deploy, migrate, backup). Extend as needed for CI/CD.
- `docker-compose.yml`: Local orchestration for frontend, backend, and PostgreSQL services.

Use this scaffolding to align responsibilities quickly before implementing actual business logic.
