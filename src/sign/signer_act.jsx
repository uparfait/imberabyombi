/* sign/signer_act.jsx: the signing page's buttons (data-act). A field of yours opens "Add your signature / stamp" (or takes
   the one you just made, in one tap); Next field scrolls to the next empty one and opens it; Finish asks you to agree,
   (and, when the sender asks for it, your digital certificate and its password, checked first: cert_pick.jsx), then
   keeps your marks, records your signature and completes the document once everyone has signed. */
import { qs } from '../lib/index.js';
import { rerender } from '../store/index.js';
import { notify, form_msg } from '../feedback/index.js';
import { modal } from '../overlays/index.js';
import { go } from '../router/index.js';
import { find_doc, my_rec, KINDS, log, save_doc } from './sign_store.js';
import { marks_get, file_set } from './sign_idb.js';
import { S, own_fields, left_of } from './signer_state.js';
import { Mark_pad, PAD } from './sign_pad.jsx';
import { agree_body } from './signer_side.jsx';
import { Cert_pick, verify } from './cert_pick.jsx';
import { P } from './prep_state.js';

function apply(d, f, url) {
  const first = !S.adopted[f.type], [l] = KINDS[f.type];
  S.pending[f.id] = url; S.adopted[f.type] = url; rerender(); qs(`[data-fid="${f.id}"]`)?.classList.add('sf_new');
  if (first && left_of(d).some(x => x.type === f.type)) notify(`Tap your next ${l.toLowerCase()} field to place it there too.`, 'ok', `${l} adopted`);
}

function open_pad(d, f) {
  const [l] = KINDS[f.type], what = l.toLowerCase(); PAD.get = async () => null;
  modal({ title: `Add your ${what}`, help: f.type === 'stamp' ? 'Create a stamp, or upload a picture of yours.' : 'Draw it, type it, or upload a picture of it.',
    body: <Mark_pad key={f.id} kind={f.type} name={my_rec(d).name} />, submit: `Use this ${what}`,
    on_submit: async () => { const url = await PAD.get();
      if (!url) { form_msg(qs('#modal form'), 'warn', `No ${what} yet`, `Make your ${what} first.`); return false; }
      apply(d, f, url); } });
}

async function finish() {
  const d = find_doc(S.id), r = my_rec(d), now = Date.now(), own = d?.status === 'draft' && d.owner === r?.email;   /* your own draft */
  if (!r || !(d.status === 'sent' || own) || r.status === 'signed') return go(`/admin/sign/sign/${S.id}`);
  if (!await file_set('marks:' + d.id, { ...await marks_get(d.id), ...S.pending })) {
    notify('Free some space in this browser, then try again.', 'bad', 'Your signature could not be saved'); return false; }
  d.fields.forEach(f => { if (S.pending[f.id]) { f.done = true; f.at = now; } });
  Object.assign(r, { status: 'signed', signed_at: now }); log(d, `${r.name} signed`, 'sign', r.email);
  if (!own && d.recipients.every(x => x.status === 'signed')) { Object.assign(d, { status: 'completed', completed_at: now }); log(d, 'Everyone signed: the document is complete', 'done'); }
  if (own) { save_doc(d); S.pending = {}; notify('Add other signers and send it, or preview it and download your copy.', 'ok', 'You signed it');
    return go(`/admin/sign/edit/${d.id}`); }
  save_doc(d); S.pending = {}; go(`/admin/sign/done/${d.id}`);
}

export const SIGNER_ACT = {
  sign_fill: t => { const d = find_doc(S.id), f = d?.fields.find(x => x.id === t.dataset.id); if (!f) return;
    if (!S.pending[f.id] && S.adopted[f.type]) return apply(d, f, S.adopted[f.type]);
    open_pad(d, f); },
  sign_next: () => { const d = find_doc(S.id), f = d && left_of(d)[0]; if (!f) return;
    const el = qs(`[data-fid="${f.id}"]`); el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el?.classList.remove('flash'); void el?.offsetWidth; el?.classList.add('flash');
    setTimeout(() => SIGNER_ACT.sign_fill({ dataset: { id: f.id } }), 550); },
  sign_finish: () => { const d = find_doc(S.id), r = my_rec(d);
    if (!own_fields(d).length || left_of(d).length) return notify('Fill every field marked for you first.', 'warn', 'Not finished yet');
    modal({ title: 'Sign this document?', body: <>{agree_body(d, r)}{r.cert ? <Cert_pick /> : null}</>, submit: r.cert ? 'Verify and sign' : 'Sign document',
      on_submit: !r.cert ? finish : async (v, form) => { const file = await verify(form); if (!file) return false;
        const d2 = find_doc(S.id), me = my_rec(d2); Object.assign(me, { cert_file: file, cert_at: Date.now() });
        log(d2, `${me.name} verified their digital certificate (${file})`, 'cert', me.email); save_doc(d2); return finish(); } }); }
};
