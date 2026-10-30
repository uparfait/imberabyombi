# Qr-scan

A small app of its own on the site, at `/qr-scan/`: it scans a QR code and, when the code is a secure link (it starts
with `https`), shows it with **Open link**, which opens it in a new tab. Code: [`src/qr/`](../src/qr/); its page:
[`qr-scan/index.html`](../qr-scan/index.html); its install files: [`public/qr-scan/`](../public/qr-scan/).

## Using it
- **Start camera**: the back camera, in a square viewfinder; it stops by itself once it finds a code. **Stop**, and
  **Flip** (front / back) when there are two cameras.
- **Scan a picture**: a photo or screenshot of a code, from the gallery or the files.
- What it found: a **secure link** (green: its site, the whole link, Open link and Copy); an `http` link (orange: "Not a
  secure link", Copy only: it does not open from here); any other text (Copy).
- **Recent**: the last six scans, kept in this browser (Clear empties it).
- Light or dark follows the site's choice; the top bar switches it. Back to the site (the home icon) shows in the browser,
  not in the installed app.

## Installing it
Only Qr-scan installs, never the site's other pages: it has its own manifest (`manifest.webmanifest`, scope
`/qr-scan/`) and service worker (`sw.js`, the same scope; the site itself has neither). **Install** shows in the top bar
when the browser offers it (Chrome, Edge, Android); on an iPhone or iPad it says Share, then Add to Home Screen. Installed,
it opens in its own window, also offline (its files are kept by the service worker where the browser allows).

## Where it is linked
- The admin sidebar (group Overview): **Qr-scan** (`app` in [`src/auth/mods.js`](../src/auth/mods.js)); a full page load,
  not a route of the app (`data-reload`, skipped by `behaviors/link_clicks.js`). `/admin/qr` goes there too.
- The public footer: the **Get the app · Qr-scan** badge.

## How it reads codes
The browser's own `BarcodeDetector` where it reads QR codes (Chrome on Android, macOS, ChromeOS); elsewhere (Chrome on
Windows, Firefox, Safari) **jsQR**, loaded from the CDN the first time ([`qr_engine.js`](../src/qr/qr_engine.js)). The
camera needs a secure page (https, or localhost while developing).

## Build and hosting
`vite.config.js` builds two pages (`index.html` and `qr-scan/index.html`). On Vercel, `vercel.json` sends `/qr-scan` to
`/qr-scan/` and serves its page before the site's catch-all; `sw.js` is never cached by the browser.
