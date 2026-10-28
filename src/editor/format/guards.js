/* editor/format/guards.js: helpers around core's live preview and the template modal. Core already keeps previews out
   of the undo stack and holds their toasts back (shown if the preview is kept), so the format commands call begin_op /
