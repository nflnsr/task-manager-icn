# Task Manager ICN

## Getting Started with the Express.js Backend

1. **Prerequisites**: Node.js ≥ 18 and pnpm installed (`corepack enable` or `npm i -g pnpm`). Ensure PostgreSQL is available and reachable.
2. **Environment**: Copy `.env.example` to `.env` and fill values:
   - `NODE_ENV` (e.g., `development` or `production`)
   - `PORT` (default `4000` if unset)
   - `DATABASE_URL` (PostgreSQL connection string)
   - `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `JWT_ACCESS_EXPIRATION`, `JWT_REFRESH_EXPIRATION`
3. **Install dependencies**: `pnpm install`
4. **Database setup**: Apply migrations and generate Prisma client
   - Generate prisma client: `pnpm dlx prisma generate`
   - Local/dev: `pnpm dlx prisma migrate dev`
5. **Run locally**: `pnpm dev`
