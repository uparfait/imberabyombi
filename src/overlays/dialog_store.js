/* overlays/dialog_store.js: what React draws inside the four shared dialogs of index.html (#modal, #confirm, #drawer,
   #viewer). set_dialog() stores a dialog's content and redraws <Dialog_hosts/> at once (flushSync), so code right
   after modal() / show_in_dialog() can already query the new DOM, as after the reference's innerHTML. */
