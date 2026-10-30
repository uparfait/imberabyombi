/* admin/notices.js: what the bell tells the signed-in person now, worked out from the data each time: tasks due within a
   day or overdue, cars parked longer than cfg.overstay_hours, events they are invited to, run or present (starting soon,
   postponed, cancelled), and for those who manage them: overdue books, reservations to review, items low on stock. Each
   notice has a stable id; the ones read are kept in this browser (db 'notices_read'). Most urgent first. */
import { ymd, fmt_d, fmt_time } from '../lib/index.js';
import { db } from '../store/index.js';
import { cfg } from '../config/index.js';
import { auth, me } from '../auth/index.js';
import { at } from '../schemas/index.js';
