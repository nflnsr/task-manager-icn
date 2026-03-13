FROM node:22-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN pnpm install
COPY . .
EXPOSE 4000
RUN pnpm run build
CMD ["pnpm", "start"]

FROM node:22-alpine as production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 4000
CMD ["node", "dist/index.js"]