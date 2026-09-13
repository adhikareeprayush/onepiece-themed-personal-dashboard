# Grand Line Tools — companion extension

Firefox-first companion for **Charts**, **Berries**, **Logbook**, **Watchtower**, and account actions.

## Features

- Auth required (Bearer token via `POST /api/auth/login` + `client: "extension"`)
- Save current tab as a Sea Chart
- Quick log income/expense
- Quick logbook note
- Set a reminder/alarm
- Open ship / sign out

## Load in Firefox

1. Run `npm start` in the project root
2. Open http://127.0.0.1:4173 and confirm it loads
3. `about:debugging#/runtime/this-firefox` → **Load Temporary Add-on…** → `extension/manifest.json`
4. Sign in with server URL `http://127.0.0.1:4173`

## Notes

- Manifest V2 so localhost host access is granted on install
- API calls go through the background script
- For a deployed ship, add that origin to `permissions` in `manifest.json` and set `APP_PUBLIC_URL` on the server
