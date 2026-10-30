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
