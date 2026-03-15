# Task Manager ICN

## Getting Started with the Express.js Typescript Backend

### Run Via Host Machine

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
5. **Run**: `pnpm dev` for development or `pnpm build && pnpm start` for production mode
6. **API Access**: The API will be available at `http://localhost:4000` (or the port you specified).

### Run Via Docker
1. **Prerequisites**: Docker installed and running. Ensure PostgreSQL is available and reachable.
2. **Environment**: Copy `.env.example` to `.env` and fill values:
   - `NODE_ENV` (e.g., `development` or `production`)
   - `PORT` (default `4000` if unset)
   - `DATABASE_URL` (PostgreSQL connection string)
   - `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `JWT_ACCESS_EXPIRATION`, `JWT_REFRESH_EXPIRATION`
3. **Build and run**: `docker compose up --build`
4. **Stop**: `docker compose down`

## Getting Started with the Next.js Typescript Frontend
1. **Prerequisites**: Node.js ≥ 18 and pnpm installed (`corepack enable` or `npm i -g pnpm`).
2. **Environment**: Copy `.env.example` to `.env` and fill values:
   - `NEXT_PUBLIC_BASE_API_URL` (e.g., `http://localhost:4000`)
3. **Install dependencies**: `pnpm install`
4. **Run locally**: `pnpm dev`
5. **Run in production mode**: `pnpm build && pnpm start`
6. **Access**: Open `http://localhost:3000` in your browser

# Live Deployment
- Backend API Hosted with Azure Docker : https://task-manager-icn-feh2haa4b5epfxc5.indonesiacentral-01.azurewebsites.net/health
- Database Service via Prisma Console Postgres
- Frontend Hosted at: https://task-manager-icn.vercel.app 