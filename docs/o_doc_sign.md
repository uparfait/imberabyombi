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
