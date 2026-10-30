/* events/my_role.js: the signed-in person's part in an activity or event, found by their email: Organiser, Co-organiser,
   Presenter (of an agenda item) or Invited; null when they have none. */
import { auth } from '../auth/index.js';

const same = (a, m) => !!a && String(a).trim().toLowerCase() === m;
export function my_role(r) {
  const m = (auth.user?.email || '').toLowerCase(); if (!m || !r) return null;
  if (same(r.org_email, m)) return 'Organiser';
  if ((r.co_orgs || []).some(p => same(p.email, m))) return 'Co-organiser';
  if ((r.agenda || []).some(a => same(a.p_email, m))) return 'Presenter';
  if ((r.invites || []).some(i => same(i.e, m))) return 'Invited';
