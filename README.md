# Private Notes

A small, private notes app that saves every note as a Markdown (`.md`) file.
SQLite is used only to make search fast. Your writing remains in the `notes`
folder and can be opened with any text editor.

## What you need

- A computer with Node.js version 22.5 or newer
- A terminal (the app called Terminal on macOS/Linux, or PowerShell on Windows)

You can check your Node.js version by running:

```bash
node --version
```

## First-time setup

1. Open a terminal and move into this folder. On this computer, run:

   ```bash
   cd /home/astrocat/Projects/personal-projects/notes-app
   ```

2. Install the app's small set of supporting packages:

   ```bash
   npm install
   ```

3. Start the app with a password of your choice. Replace
   `choose-a-password` below with your own password:

   ```bash
   NOTES_PASSWORD='choose-a-password' npm start
   ```

4. Open this address in your browser:

   <http://localhost:4173>

5. Enter the same password you used in the terminal command.

Keep the terminal window open while using the app. Press `Ctrl+C` in that
terminal when you want to stop it.

## Starting it again later

Each time you want to use the app, open a terminal and run:

```bash
cd /home/astrocat/Projects/personal-projects/notes-app
NOTES_PASSWORD='choose-a-password' npm start
```

Use the same password unless you intentionally want to change it. Changing the
password does not change or encrypt your notes; it only changes what unlocks the
web app. This app defaults to port 4173 because port 3000 is already in use by
another program on this computer.

For development, this command automatically restarts the server after you edit a
backend file:

```bash
NOTES_PASSWORD='choose-a-password' npm run dev
```

## Where your notes are stored

- `notes/` contains one readable Markdown file per note. This is the source of truth.
- `data/search.sqlite` is the search index. The app recreates it from the Markdown
  files whenever it starts, so it is safe to delete while the app is stopped.

A note file begins with a small header containing its title, tags, ID, and dates.
The rest is ordinary Markdown. Keep that header intact if you edit a file by hand.
Restart the app afterward so search sees your manual changes.

## Using it on an Android phone during local testing

Your phone and computer must be on the same Wi-Fi network. `localhost` on your
phone means the phone itself, so you will need your computer's local IP address.
That setup depends on your operating system and browser security rules, and the
basic app does not need it for computer testing. Local phone access can be the
next step after the app works for you at `localhost`.

The app includes a web manifest and service worker for "Add to Home Screen."
Browsers require a secure connection for installation except at `localhost`, so
full phone installation is best completed when you later put the app on your
own HTTPS server.

## Important privacy note

The password gate prevents casual browser access, but the Markdown files are not
encrypted on disk. Anyone who can access this computer account or server files
can read them. When you deploy later, use HTTPS so the password and notes are
encrypted while traveling between your phone and server.

## Project map

- `server.js` starts the web server, checks the password, and provides the API.
- `storage.js` reads and writes Markdown files and maintains SQLite search.
- `public/index.html` contains the app screen.
- `public/styles.css` controls the phone-first layout and dark mode.
- `public/app.js` handles buttons, editor behavior, search, and preview.
- `public/manifest.json` and `public/service-worker.js` make it a basic PWA.

There is no build or compile step. Edit these files directly, stop the server
with `Ctrl+C`, and start it again to see server-side changes. Browser files may
need a refresh.
