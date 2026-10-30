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
