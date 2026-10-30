/* sign/sign_store.js: O-Doc Sign's data. A document is a record in the 'sign_docs' collection: title, file name, page sizes,
   owner, status (draft · sent · completed), signers (name, email, a note for each, colour, signed or not) and the fields
   placed for them (signature or stamp, page, position as fractions of the page). The PDF and the marks drawn on it live in
   IndexedDB (sign_idb.js). Nothing is seeded: each person sees the documents they prepared and the ones sent to them. */
