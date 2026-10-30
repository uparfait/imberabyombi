/* admin/notices.js: what the bell tells the signed-in person now, worked out from the data each time: tasks due within a
   day or overdue, cars parked longer than cfg.overstay_hours, events they are invited to, run or present (starting soon,
   postponed, cancelled), and for those who manage them: overdue books, reservations to review, items low on stock. Each
   notice has a stable id; the ones read are kept in this browser (db 'notices_read'). Most urgent first. */
import { ymd, fmt_d, fmt_time } from '../lib/index.js';
import { db } from '../store/index.js';
import { cfg } from '../config/index.js';
import { auth, me } from '../auth/index.js';
import { at } from '../schemas/index.js';
import { my_role } from '../events/my_role.js';

const H = 3600e3, RANK = { bad: 0, warn: 1, info: 2, ok: 3 };
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

function events_for_me(now) {
  return db.list('events').flatMap(e => {
    const role = my_role(e); if (!role) return [];
    const s = e.date ? at(e.date, e.start, e.tz) : 0, href = '/admin/events/' + e.id, n = { at: s, href, text: e.title };
    if (e.status === 'Cancelled') return [{ ...n, id: `ev:${e.id}:x`, icon: 'x', tone: 'bad', title: 'Event cancelled' }];
    if (e.status === 'Postponed') return [{ ...n, id: `ev:${e.id}:p:${e.date}`, icon: 'clock', tone: 'warn', title: 'Event postponed' }];
    if (s > now && s - now < 24 * H) return [{ ...n, id: `ev:${e.id}:s:${e.date}`, icon: 'star', tone: 'info', title: `Starts at ${fmt_time(e.start)}` }];
    if (role === 'Invited' && s > now) return [{ ...n, id: `ev:${e.id}:i`, icon: 'mail', tone: 'info', title: 'You are invited', text: `${e.title} · ${fmt_d(e.date)}` }];
