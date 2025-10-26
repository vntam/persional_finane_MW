#!/usr/bin/env bash
set -euo pipefail

# Simple PostgreSQL backup using docker exec. Customize storage target as needed.
# Usage: ./scripts/backup.sh <output_path>

OUTPUT_PATH="${1:-./infra/database/backups}"
TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
mkdir -p "${OUTPUT_PATH}"
FILE="${OUTPUT_PATH}/pfm_${TIMESTAMP}.sql"

echo "[backup] Dumping database to ${FILE}"
docker exec pfm_db pg_dump -U ${POSTGRES_USER:-finance_user} ${POSTGRES_DB:-finance_db} > "${FILE}"
