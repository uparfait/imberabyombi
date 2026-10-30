/* events/org_act.jsx: ORG_ACT, the organisers table's buttons (ev_tables.jsx): add a co-organiser, edit one (or remove
   them), edit the organiser (their part of the form), and Transfer ownership: a co-organiser or someone new becomes the
   organiser, and the one before stays on as a co-organiser; everyone keeps their phone. An email is on the list once. */
import { qs } from '../lib/index.js';
import { db, rerender } from '../store/index.js';
import { notify, show_err } from '../feedback/index.js';
import { modal, ask } from '../overlays/index.js';
import { field } from '../fields/index.js';
import { field_spec } from '../schemas/index.js';
import { open_form, sync_when } from '../table/index.js';

const lc = s => String(s || '').trim().toLowerCase();
const put = (c, e, d, title, text) => { db.upsert(c, { id: e.id, ...d }); rerender(); notify(text, 'ok', title); };
const get = t => [t.dataset.c, db.find(t.dataset.c, t.dataset.id), +t.dataset.i];
const who = (p = {}, x = {}) => [field(field_spec('p_name', 'Name', 'text', 0, 1, x), p.name), field(field_spec('p_email', 'Email', 'email', 0, 1, x), p.email),
  field(field_spec('p_tel', 'Phone', 'tel', 0, 0, x), p.tel)];
const one = d => ({ name: d.p_name.trim(), email: lc(d.p_email), tel: (d.p_tel || '').trim() });
/* the email is on the list already (the person at index skip aside; -1: the organiser) */
const taken = (e, mail, skip) => [[-1, e.org_email], ...(e.co_orgs || []).map((o, i) => [i, o.email])].some(([i, m]) => i !== skip && lc(m) === lc(mail));
const twice = (f, k) => { show_err(f.elements[k], 'Already one of the organisers.'); return false; };

function co_form(c, e, i = -2) {
  const co = e.co_orgs || [], p = co[i];
  modal({ title: p ? 'Edit co-organiser' : 'Add co-organiser', body: who(p), submit: p ? 'Save changes' : 'Add',
    actions: p ? <button type="button" className="btn btn_warn" data-act="ev_co_del" data-c={c} data-id={e.id} data-i={i}>Remove</button> : null,
    on_submit: (d, f) => { if (taken(e, d.p_email, i)) return twice(f, 'p_email');
      const nu = one(d);
}

export const ORG_ACT = {
  ev_co_add: t => { const [c, e] = get(t); if (e) co_form(c, e); },
  ev_org_edit: t => { const [c, e, i] = get(t); if (!e) return; i < 0 ? open_form(c, e.id, {}, ['Edit organiser', ['org_name', 'org_email', 'org_tel']]) : co_form(c, e, i); },
  ev_co_del: t => { const [c, e, i] = get(t), p = e?.co_orgs?.[i]; if (!p) return;
    ask(`Remove ${p.name} from the co-organisers? They can no longer manage it.`, () =>
      put(c, e, { co_orgs: e.co_orgs.filter((_, j) => j !== i) }, 'Co-organiser removed', `${p.name} is no longer a co-organiser.`), 'Remove', true); },
  ev_transfer: t => { const [c, e] = get(t); if (!e) return; const co = e.co_orgs || [], fresh = { when: 'to=new' };
    modal({ title: 'Transfer ownership', help: 'They become the organiser and own it from now on. The current organiser stays on as a co-organiser.',
      body: [field(field_spec('to', 'New organiser', 'select', [...co.map((o, i) => [String(i), `${o.name} · ${o.email}`]), ['new', 'Someone new']], 1), co.length ? '0' : 'new'),
        ...who({}, fresh), field(field_spec('p_tel', 'Phone', 'tel', 0, 0, fresh), '')],
      submit: 'Transfer', on_submit: (d, f) => {
        const nu = d.to === 'new' ? { name: d.p_name.trim(), email: lc(d.p_email), tel: d.p_tel || '' } : { ...co[+d.to], tel: '' };
        if (d.to === 'new' && taken(e, nu.email, -2)) return twice(f, 'p_email');
        const was = e.org_email ? [{ name: e.org_name || e.org_email, email: lc(e.org_email) }] : [];
        put(c, e, { org_name: nu.name, org_email: nu.email, org_tel: nu.tel, co_orgs: [...was, ...co.filter((_, i) => String(i) !== d.to)] },
          'Ownership transferred', `${nu.name} is now the organiser.`); } });
    sync_when(qs('#modal form')); }
};
