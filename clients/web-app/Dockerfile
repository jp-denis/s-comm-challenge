FROM node:alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@s-communication/web-app --docker


# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer
RUN apk add --no-cache libc6-compat curl
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock

RUN yarn install --frozen-lockfile

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# ON PRODUCTION SETUP PASS THIS ENV AS ARGUMENT
ENV NEXT_PUBLIC_API_HOST="http://localhost:3000"

RUN yarn turbo run build --filter=@s-communication/web-app

FROM node:alpine AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/clients/web-app/next.config.js .
COPY --from=installer /app/clients/web-app/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/clients/web-app/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/clients/web-app/public/ ./clients/web-app/public
COPY --from=installer --chown=nextjs:nodejs /app/clients/web-app/.next/static ./clients/web-app/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/node_modules ./node_modules

ENV NODE_ENV production
CMD ["node", "clients/web-app/server.js"]