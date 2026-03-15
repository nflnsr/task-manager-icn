FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable

COPY package*.json ./
RUN pnpm install

COPY . .
RUN pnpm run build

EXPOSE 4000
CMD ["pnpm", "start"]


FROM node:22-alpine AS production
WORKDIR /app

RUN corepack enable

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 4000
CMD ["node", "dist/index.js"]