# O-Doc Sign

O-Doc Sign gets PDFs signed: upload a PDF, add the people who sign it (a note for each), place their signature and stamp
fields, and send. Each signer signs from their own account. It opens from the sidebar ("O-Doc Sign", group Overview) in
the whole window, like the document editor: its own top bar, no admin header or sidebar. Code: [`src/sign/`](../src/sign/),
styles in `src/styles/sign/`. It loads the first time someone opens it (its own file in the build).

**Made for computers.** O-Doc Sign has one layout, at every width: never a phone layout and never a sideways scroll. Below
1280 px it is laid out 1280 px wide and scaled down to fit: phones and tablets through the viewport (`width=1280` while
O-Doc Sign is open), a narrow computer window through a zoom (`--sign_z`, `sign_page.jsx`, `01_layout.css`).

## Pages (`/admin/sign/…`)
| Address | Page |
|---|---|
| `/admin/sign` · `/drafts` · `/waiting` · `/completed` | your documents: all, not sent yet, waiting for signatures, signed by everyone |
| `/admin/sign/archived` | **Archived**: documents you put away (out of the other lists; their signers still see them) |
| `/admin/sign/inbox` | **To sign**: documents sent to your email, waiting first, then the ones you signed |
