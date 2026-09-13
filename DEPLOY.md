# Production deploy — Grand Line Tools
# Domain: https://onepiece.prayushadhikari.com.np

## What runs in Docker

| Service | Role |
|--------|------|
| `app` | Express API + web UI (notes, berries, vault, …) |
| `caddy` | HTTPS reverse proxy + Let's Encrypt for your domain |

Mobile (Expo) and the Firefox extension are **client apps** that talk to this API — they are built separately, not as long-running containers.

## 1. DNS

Point `onepiece.prayushadhikari.com.np` at your server:

- **A** record → server IPv4
- optional **AAAA** → IPv6

Open ports **80** and **443**.

## 2. Production env

```bash
cp .env.production.example .env.production
# edit NOTES_PASSWORD and SESSION_SECRET to strong unique values
```

## 3. Launch

```bash
docker compose up -d --build
docker compose ps
curl -fsS https://onepiece.prayushadhikari.com.np/api/health
```

Data persists in Docker volumes `glt-data` and `glt-notes`.

## 4. Mobile (production API)

`EXPO_PUBLIC_API_URL` / `app.json` `extra.apiUrl` are set to:

`https://onepiece.prayushadhikari.com.np`

```bash
cd mobile
npx eas-cli build --platform android --profile production
# or iOS:
npx eas-cli build --platform ios --profile production
```

Local preview APK profile also injects the same API URL (`preview`).

## 5. Firefox extension

```bash
./scripts/pack-extension.sh
```

Install `dist/grand-line-tools-extension.zip` in Firefox (`about:debugging` → Load Temporary Add-on, or publish to AMO). Default server URL is the production domain.

## Useful commands

```bash
docker compose logs -f app
docker compose logs -f caddy
docker compose down
```
