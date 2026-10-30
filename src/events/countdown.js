/* events/countdown.js: the time left until an event starts (or ends, while it is live) in short units, leading empty ones
   left out: "1y 2mo 3d 4h 5m 6s", "12h 32m 23s", "23s". count_to(e, state) is [label, moment] or null (past, cancelled, no
