/* lib/repeat.js: repeat rules (recurring activities and events) and the days they fall on. A rule:
   { freq: 'daily' | 'weekdays' | 'weekly' | 'monthly' | 'yearly', every: n (each n days, weeks, months or years),
     days: weekdays for weekly (0 Sunday … 6 Saturday), months: 1–12 for yearly,
     by: 'date' (dates: 1–31, -1 = the last day) or 'week' (weeks: 1–4, -1 = the last; wdays: weekdays) for monthly and yearly,
     end: 'never' | 'on' (until 'YYYY-MM-DD') | 'after' (count times) }.
