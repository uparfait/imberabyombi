# O-Doc Sign: data and code

The technical side of [O-Doc Sign](o_doc_sign.md): where its records and files live, the libraries it loads, and what
each file in [`src/sign/`](../src/sign/) does.

## Data
| Where | What |
|---|---|
| collection `sign_docs` (localStorage, `db`) | each document: title, file name, page sizes, owner, status, signers, fields, activity |
| IndexedDB `<ns>sign`, `pdf:<id>` | the uploaded PDF |
