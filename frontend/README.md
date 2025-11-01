# Personal Finance Manager Frontend

Auth module is ready to demo without a backend. The UI uses React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui primitives, React Hook Form, Zod, React Query, Axios, and MSW.

## Getting started

1. Install dependencies

   ```bash
   npm install
   ```

2. Copy environment template

   ```bash
   cp .env.example .env
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

   Navigate to `http://localhost:5173/login` to try the mock auth flow.

## Mock backend

- MSW (Mock Service Worker) intercepts Axios calls to `/auth/login` and `/auth/register` while `VITE_ENABLE_MSW` is not set to `false` and Vite is running in development.
- Demo credentials: `user@test.com` / `12345678`.
- Registering any other email succeeds and stores the fake user only in memory.
- When the real backend is ready, set `VITE_ENABLE_MSW=false` in `.env` (or remove the variable) and plug Axios interceptors/tokens as needed.

## Structure highlights

- `src/app/providers.tsx` wires React Query, toast notifications, and the MSW bootstrap.
- `src/app/router.tsx` defines `/login`, `/register`, and `/dashboard` routes.
- `src/api` encapsulates Axios calls.
- `src/components/auth` contains shared auth layout + forms.
- `src/lib` houses token helpers, validators, and misc utilities.
- `src/mocks` stores MSW handlers.
- `src/ui` includes the shadcn/ui-inspired primitives used by the forms.
