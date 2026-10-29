# O-Doc Sign

O-Doc Sign gets PDFs signed: upload a PDF, add the people who sign it (a note for each), place their signature and stamp
fields, and send. Each signer signs from their own account. It opens from the sidebar ("O-Doc Sign", group Overview) in
the whole window, like the document editor: its own top bar, no admin header or sidebar. Code: [`src/sign/`](../src/sign/),
styles in `src/styles/sign/`. It loads the first time someone opens it (its own file in the build).

## Pages (`/admin/sign/…`)
| Address | Page |
|---|---|
| `/admin/sign` · `/drafts` · `/waiting` · `/completed` | your documents: all, not sent yet, waiting for signatures, signed by everyone |
| `/admin/sign/inbox` | **To sign**: documents sent to your email, waiting first, then the ones you signed |
| `/admin/sign/new` | upload a PDF (PDF only, up to 20 MB; the file is checked to really be a PDF) |
| `/admin/sign/edit/<id>` | prepare a draft: signers on the left, the pages in the middle, the field tools on the right |
| `/admin/sign/doc/<id>` | follow a sent document: progress, each signer's state and note, activity, download |
| `/admin/sign/sign/<id>` | sign it (the link the sender copies points here) |
| `/admin/sign/done/<id>` | "Signing complete" |

The top bar's menu (the same tile menu as nested systems) lists All, Drafts, Waiting, Completed and To sign, each with
its count. A document opened at the wrong address moves to the right one (a sent draft to its page, someone else's to
signing). No document is seeded: every account starts empty.

## Preparing
- **Signers**: name, email and an optional **note for that signer** (they read it before signing; edit it later with the
  note button). People already in the system are suggested as you type a name. Each signer gets a colour.
- **Fields**: Signature and Stamp. Click a tool to add one on the page on screen, or drag it onto a page. Drag a field to
  move it, its corner to resize it (a stamp stays square); arrow keys nudge the selected field, Delete removes it.
- Changes save a moment after each one (and on Save, and when you leave). **Send** checks that every signer has a field.

## Signing
- The signer sees the sender's note, their own fields (pulsing) and the others' places. **Next field** goes to the next
  one; a mark made once is placed on the next field of its kind with one tap.
- **Signature**: draw it, type it (five handwriting styles), or upload a picture. **Stamp**: create one (organisation,
  centre text, today's date, ink, round or square) or upload a picture.
- **Remove background** (uploads): the paper colour becomes transparent, with a soft edge so the ink stays smooth. It starts
  at 30% for a picture with paper around it; slide right until only the ink is left (the checkerboard shows what is
  transparent). Code: `src/sign/bg_cut.js`.
- **Finish** asks the signer to agree to sign electronically. When everyone has signed, the document is Completed.

## Download
**Download PDF** writes every mark placed so far into the file's pages (rotated pages included). A completed document's
download ends with a **signing certificate** page: the document, its id, who sent it, each signer with their email, when
they opened and signed it, and the activity.

## Who can do what
The permission key is `sign`. Every role may use it at level 2 (roles saved before it existed get it too, see
`FOR_ALL` in `src/auth/roles.jsx`). Level 2: upload, prepare, send, delete. Level 1: sign what is sent to you.

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
