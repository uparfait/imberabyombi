/* events/track_full.jsx: the agenda on the whole screen (the browser's own full screen; Esc or × closes it), from the
   "now" card of Open This Event: one item at a time, in the middle: its time, its title, then its description (smaller,
   apart), its presenter and, while it runs, the time it has left; the event's title on top, its time left bottom right. Back and
   Next (the arrow keys, the dots) step through the items; on its own it slides to the item running now (else the next):
   the page redraws every 30 seconds and when a countdown ends, and a picked item holds until the running one changes or
