/* actions/act_records.jsx: data-act handlers of the module pages: check in / out (attendance), a student's bulletin,
   library returns and reservations, parking check-in and check-out. */
import { qs, ymd, hm, fmt_d, money, now_dt } from '../lib/index.js';
import { ui, db, rerender } from '../store/index.js';
import { cfg } from '../config/index.js';
import { me } from '../auth/index.js';
import { SUBJECTS, TERMS, slot_ids } from '../schemas/index.js';
import { notify, show_msg } from '../feedback/index.js';
import { modal, ask } from '../overlays/index.js';
import { open_form } from '../table/index.js';

/* a student's average per subject and term, and per term over every subject */
const bulletin = n => { const rows = db.list('bulletins').filter(b => b.student === n);
  const sc = (s, tm) => { const x = rows.filter(r => r.subject === s && r.term === tm).map(r => +r.score); return x.length ? Math.round(x.reduce((a, b) => a + b) / x.length) : null; };
  const avg = tm => { const v = SUBJECTS.map(s => sc(s, tm)).filter(v => v != null); return v.length ? Math.round(v.reduce((a, b) => a + b) / v.length) : '—'; };
  return (
    <div className="overflow-x-auto sm:col-span-2"><table><caption>{n}</caption><colgroup><col /><col span={3} className="hl" /></colgroup>
      <thead><tr><th scope="col">Subject</th>{TERMS.map(x => <th scope="col" key={x}>{x}</th>)}</tr></thead>
      <tbody>{SUBJECTS.map(s => <tr key={s}><th scope="row" className="bg-transparent text-sm text-fg">{s}</th>{TERMS.map(tm => <td className="tabular-nums" key={tm}>{sc(s, tm) ?? '—'}</td>)}</tr>)}</tbody>
      <tfoot><tr><th scope="row">Average</th>{TERMS.map(tm => <td key={tm}>{avg(tm)}</td>)}</tr></tfoot></table></div>
  );
};

export const RECORD_ACT = {
  clock: t => { const n = me(), td = ymd(), rows = db.list('attendance'), mine = rows.find(r => r.person === n && r.date === td);
    if (t.dataset.v === 'in') db.upsert('attendance', { person: n, kind: 'Staff', date: td, in: hm(), out: '', status: hm() > cfg.work_start ? 'Late' : 'Present' });
    else if (mine) db.upsert('attendance', { id: mine.id, out: hm() });
    rerender(); notify(`Recorded at ${hm()}, ${fmt_d(td)}.`, 'ok', t.dataset.v === 'in' ? 'Checked in' : 'Checked out'); },
  report: t => modal({ title: 'Student bulletin', body: bulletin(t.dataset.name) }),
