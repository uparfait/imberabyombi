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
| `/admin/sign/new` | upload a PDF (PDF only, up to 20 MB; the file is checked to really be a PDF) |
| `/admin/sign/edit/<id>` | prepare a draft: signers on the left, the pages in the middle, the field tools on the right |
| `/admin/sign/doc/<id>` | follow a sent document: progress, each signer's state, note and certificate, activity, download |
| `/admin/sign/sign/<id>` | sign it (the link the sender copies points here) |
| `/admin/sign/done/<id>` | "Signing complete" |

The top bar: Back, the O-Doc Sign name, then one rounded group, like the admin header's tools: the lists menu (the same
tile menu as nested systems: All, Drafts, Waiting, Completed, Archived and To sign, each with its count and a fixed
colour), light / dark, and the account menu. A page's actions (Send, Save, Download, Finish) are never in the top bar:
they are in the page's right column. Page titles carry their explanation in a help icon (`help_tip`). A document opened at
the wrong address moves to the right one (a sent draft to its page, someone else's to signing). No document is seeded:
every account starts empty.

## Preparing
