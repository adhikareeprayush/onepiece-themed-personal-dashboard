# Grand Line Tools — production image (web UI + API)
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4173

RUN addgroup -S glt && adduser -S glt -G glt

COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY auth.js env.js profile.js quests.js server.js storage.js toolkit.js vault.js ./
COPY public ./public

RUN mkdir -p data notes && chown -R glt:glt /app
USER glt

EXPOSE 4173
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:4173/api/health || exit 1

CMD ["node", "server.js"]
