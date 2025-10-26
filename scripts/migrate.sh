#!/usr/bin/env bash
set -euo pipefail

# Run Prisma migrations inside the backend container or locally if tools available.
# Usage: ./scripts/migrate.sh [--local]

MODE="${1:-docker}"
case "${MODE}" in
  --local)
    echo "[migrate] Running migrations locally..."
    (cd backend && npx prisma migrate dev)
    ;;
  *)
    echo "[migrate] Running migrations via docker-compose..."
    docker compose run --rm backend npx prisma migrate deploy
    ;;
esac
