# Grand Line Tools (Expo)

Mobile companion for the notes-app / Grand Line Tools ship. Talks to the same Express API with Bearer auth (`client: "mobile"`).

## Requirements

- Node 20+
- **Expo Go** on your phone (recommended for local use)
- Ship server running (`npm start` in the repo root)
- Phone and computer on the **same Wi‑Fi**

## Local-first with Expo Go (tunnel)

LAN often fails on locked Wi‑Fi (“can’t download the remote update”). Use Expo’s **ngrok tunnel** instead:

```bash
# terminal 1 — ship API
npm start

# terminal 2 — Metro via tunnel
cd mobile
npm start   # runs: expo start --tunnel
```

In **Expo Go**, enter the `exp://…exp.direct` URL printed by Metro (or shown below when the agent starts it).

Keep `EXPO_PUBLIC_API_URL=metro` so login goes through the **same Metro tunnel** (`/api` is proxied to the local ship on `:4173`). No second public API tunnel needed.

| Mode | Command |
| --- | --- |
| Tunnel (recommended) | `npm start` / `npx expo start --tunnel` |
| LAN | `npm run start:lan` |

| Where you run the app | Typical API URL |
| --- | --- |
| Physical device + tunnel for Metro | `http://<your-lan-ip>:4173` |
| Android emulator | `http://10.0.2.2:4173` |
| iOS simulator | `http://127.0.0.1:4173` |

Restart Expo after changing `EXPO_PUBLIC_API_URL`.

## Toolkit screens

Bottom tabs: **Overview**, **Logbook**, **Berries**, **Watchtower**, **More**.

From More: Vault, Quests, Charts, Snippets, Focus (live timer), Profile (wanted poster), Settings (API override + ping).

Every list supports search, create/edit sheets (PUT), and delete. Berries show month income/spend. Focus auto-logs on countdown complete.

## EAS preview build (Android APK)

Project: [@adhikareeprayush/grand-line-tools](https://expo.dev/accounts/adhikareeprayush/projects/grand-line-tools)

Only rebuild after setting a reachable `EXPO_PUBLIC_API_URL`. Profiles live in `eas.json`: `development`, `preview`, `production`.
