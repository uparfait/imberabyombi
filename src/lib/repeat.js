/* lib/repeat.js: repeat rules (recurring activities and events) and the days they fall on. A rule:
   { freq: 'daily' | 'weekdays' | 'weekly' | 'monthly' | 'yearly', every: n (each n days, weeks, months or years),
     days: weekdays for weekly (0 Sunday … 6 Saturday), months: 1–12 for yearly,
