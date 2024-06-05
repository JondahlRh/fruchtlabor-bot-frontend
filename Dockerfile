# dependency stage
FROM node:20-alpine AS dependency-stage
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json .
RUN npm ci


# build stage
FROM node:20-alpine AS build-stage
RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV NODE_ENV=production

ARG MONGODB_CONNECT
ARG MONGODB_DBNAME
ARG NEXT_PUBLIC_TEAMSPEAK_API_URL

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
FROM node:20-alpine AS prod-stage
RUN apk add --no-cache libc6-compat

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build-stage /app/public public
COPY --from=build-stage --chown=nextjs:nodejs /app/.next/standalone .
COPY --from=build-stage --chown=nextjs:nodejs /app/.next/static .next/static

USER nextjs

ARG INTERNAL_PORT

ENV PORT=${INTERNAL_PORT}
EXPOSE ${INTERNAL_PORT}

CMD ["node", "server.js"]