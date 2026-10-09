# Image produksi (Next.js standalone + Payload). Migrasi database berjalan otomatis
# saat Payload pertama diinisialisasi (request pertama) lewat `prodMigrations`.

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat && corepack enable

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Halaman statis membawa URL kanonis dan status indeks sejak build; staging mengisi keduanya.
ARG SITE_URL=https://rise-reformia.id
ARG SITE_NOINDEX=false
ENV SITE_URL=$SITE_URL SITE_NOINDEX=$SITE_NOINDEX
RUN pnpm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# robots.txt, sitemap, dan halaman yang dirender saat diminta membaca nilai ini saat berjalan.
ARG SITE_URL=https://rise-reformia.id
ARG SITE_NOINDEX=false
ENV SITE_URL=$SITE_URL SITE_NOINDEX=$SITE_NOINDEX

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Unggahan Media; di VPS dipasang sebagai volume agar tidak hilang saat deploy ulang.
RUN mkdir -p media && chown nextjs:nodejs media

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
