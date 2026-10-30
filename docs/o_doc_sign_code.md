# O-Doc Sign: data and code

The technical side of [O-Doc Sign](o_doc_sign.md): where its records and files live, the libraries it loads, and what
each file in [`src/sign/`](../src/sign/) does.

## Data
| Where | What |
|---|---|
| collection `sign_docs` (localStorage, `db`) | each document: title, file name, page sizes, owner, status, signers, fields, activity |
| IndexedDB `<ns>sign`, `pdf:<id>` | the uploaded PDF |
| IndexedDB `<ns>sign`, `marks:<id>` | the signatures and stamps (PNG) by field |

Files of deleted documents are cleaned up the next time O-Doc Sign opens. Everything stays in this browser: to share
documents between people and devices, keep these records and files on a server (see
[connecting a backend](connecting_a_backend.md)); `sign_store.js` and `sign_idb.js` are the only files that read them.

## Libraries and fonts
- **pdf.js** (shows the pages) is the copy the document editor loads from the CDN on first use.
- **pdf-lib** (writes the signed PDF) loads from the CDN the first time someone downloads.
- The five handwriting fonts are served with the site (`src/assets/fonts/`, open font licence) and load only when shown.

## Files
| File | What it does |
|---|---|
| `sign_page.jsx`, `sign_top.jsx` | the window, its top bar and lists menu, the page for each address |
| `sign_list.jsx`, `sign_new.jsx`, `sign_done.jsx` | the lists, the upload, "Signing complete" |
| `prep_*.js(x)` | the prepare page: state and autosave, panels, tools, dialogs, adding fields, dragging |
| `owner_page.jsx`, `activity.jsx`, `doc_act.js` | the sender's page, its activity and its buttons (copy link, download, delete, archive, restore) |
| `self_sign.jsx` | signing your own draft (Sign it myself, Sign my fields), Preview with Download a copy |
| `signer_bits.jsx`, `cert_pick.jsx` | a signer's Note and certificate chips; the certificate step of signing |
| `signer_*.js(x)` | the signing page, its guide and its buttons (fill, next field, finish) |
| `sign_pad.jsx`, `pad_*.js(x)`, `stamp_*.js(x)`, `bg_cut.js` | the signature and stamp dialog |
| `pdf_lib.js`, `pdf_pages.jsx`, `sign_fields.jsx` | reading and drawing pages, the fields over them |
| `sign_export.js`, `sign_cert.js` | the signed PDF and its certificate |
| `sign_store.js`, `sign_idb.js`, `use_marks.js`, `sign_act.js` | data, files, saved marks, the buttons' registration |
