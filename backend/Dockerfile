# Backend container for Express + Prisma API server.
FROM node:20-slim AS base
WORKDIR /app

# Install dependencies first to leverage Docker layer caching.
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm install || true

# Copy source code after dependencies are cached.
COPY . .

EXPOSE 4000
CMD ["npm", "run", "dev"]
