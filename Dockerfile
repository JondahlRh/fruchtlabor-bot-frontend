# dependency stage
FROM node:20-alpine AS dependency-stage

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json .
RUN npm ci

# build stage
FROM dependency-stage AS build-stage

WORKDIR /app

ENV NODE_ENV=production

COPY --from=dependency-stage /app/node_modules node_modules

COPY package*.json .

COPY next.config.mjs .
COPY tsconfig.json .
COPY tailwind.config.ts .
COPY postcss.config.mjs .

COPY public public
COPY src src
RUN npm run build


# production stage
FROM dependency-stage AS prod-stage

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build-stage /app/public public
COPY --from=build-stage --chown=nextjs:nodejs /app/.next/standalone .
COPY --from=build-stage --chown=nextjs:nodejs /app/.next/static .next/static

USER nextjs

ENV PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]