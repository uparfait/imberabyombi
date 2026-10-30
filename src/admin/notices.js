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
    return [];
  });
}

export function notices(now = Date.now()) {
  const out = [], td = ymd(), can = (m, l) => auth.can(m, l);
  if (can('tasks')) db.list('tasks').filter(t => t.assignee === me() && t.status !== 'Done' && t.due).forEach(t => { const d = new Date(t.due).getTime();
    if (d - now < 24 * H) out.push({ id: `task:${t.id}:${t.due}`, icon: 'tasks', tone: d < now ? 'bad' : 'warn', title: d < now ? 'Task overdue' : 'Task due soon', text: t.title, at: d, href: '/admin/tasks' }); });
  if (can('parking')) db.list('parking').filter(p => p.status === 'Parked' && now - new Date(p.in) > cfg.overstay_hours * H).forEach(p =>
    out.push({ id: `park:${p.id}`, icon: 'car', tone: 'warn', title: 'Car overstaying', text: `${p.plate} · ${p.slot} · ${Math.floor((now - new Date(p.in)) / H)} h`, at: new Date(p.in).getTime(), href: '/admin/parking' }));
  if (can('events')) out.push(...events_for_me(now));
  const late = can('library') ? db.list('rentals').filter(r => r.status === 'Rented' && r.due < td).length : 0;
  if (late) out.push({ id: `lib:${td}:${late}`, icon: 'book', tone: 'warn', title: 'Books overdue', text: plural(late, 'book is', 'books are') + ' past due', at: now, href: '/admin/library' });
  const res = can('inventory', 2) ? db.list('reservations').filter(r => r.status === 'Pending').length : 0;
  if (res) out.push({ id: `res:${res}`, icon: 'calendar', tone: 'info', title: 'Reservations to review', text: plural(res, 'request waits', 'requests wait'), at: now, href: '/admin/inventory' });
  const low = can('inventory') ? db.list('inventory').filter(i => +i.qty <= +(i.min || 0)).length : 0;
  if (low) out.push({ id: `low:${low}`, icon: 'box', tone: 'warn', title: 'Low on stock', text: plural(low, 'item', 'items'), at: now, href: '/admin/inventory' });
  return out.sort((a, b) => RANK[a.tone] - RANK[b.tone] || a.at - b.at);
