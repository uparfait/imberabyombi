# Qr-scan

A small app of its own on the site, at `/qr-scan/`: it scans a QR code and, when the code is a secure link (it starts
with `https`), shows it with **Open link**, which opens it in a new tab. Code: [`src/qr/`](../src/qr/); its page:
[`qr-scan/index.html`](../qr-scan/index.html); its install files: [`public/qr-scan/`](../public/qr-scan/).

## Using it
- The camera fills the whole page, on every screen, like a scanner app; it uses the back camera.
- As it opens: allowed already, the camera starts at once; not asked yet, a sheet says why it needs the camera ("Nothing
  is recorded or sent") and **Allow camera** brings the browser's own prompt; blocked, it says how to allow it, with
  **Try again** (it starts by itself once the camera is allowed in the browser's settings).
- Over the camera: the site's mark at the top left (in the browser, back to the site; the name beside it, not on a
  phone) and **Install** (an icon) at the top right; a large scan window in the middle, the rest dimmed, with the brand's
  rounded corners and a sweeping line; "Point at a QR code"; and **Light** where the camera has one.
- It stops once it finds a code; what it found comes up in a sheet from the bottom: a **secure link** (green: its site,
  the whole link, **Open link** in a new tab and Copy); an `http` link (orange: "Not a secure link", Copy only: it does
  not open from here); any other text (Copy). **Scan again** goes back to the camera.

## Installing it
It wears the site's own icon and the colours set in Settings ([`qr_brand.js`](../src/qr/qr_brand.js)): the brand
colour, radius, spacing and font on the page; and, when the brand colour is not the default, the manifest is made in the
page (theme colour = the brand; icons, tab and home-screen icon: the site's 3D mark in that colour) in place of the
default files in `public/qr-scan/`. Only Qr-scan installs, never the site's other pages: it has its own manifest (`manifest.webmanifest`, scope
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
