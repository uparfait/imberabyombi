/* events/conflicts.js: activities and events that clash with one being saved: the same venue or the same organiser at an
   overlapping time. Times are compared as instants, each in its own time zone (9:00 in Kigali is 8:00 in London). A
   recurring one is compared on each of its days for six months. Cancelled events and dates not set yet are left out.
