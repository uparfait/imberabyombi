/* sign/prep_state.js: the draft being prepared (P): a working copy of its record (doc), the signer whose fields are being
   placed (rid), the selected field (sel), unsaved changes (dirty) and whether the
   form that adds a signer is open (adding: always, while there is no signer).
   prep_save() keeps the copy. It also saves itself a moment after each change, and when the page is left (another page
   draws, the tab closes), so nothing is lost. */
