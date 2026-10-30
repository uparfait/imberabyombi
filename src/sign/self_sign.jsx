/* sign/self_sign.jsx: signing your own draft. In the prepare page's right column, under Save draft: Sign it myself (you
   join the signers as "You", picked under Placing for, so the fields you place are yours), then Sign my fields (the
   signing page, with every step: your signature or stamp drawn, typed, uploaded or made, the agreement and, if forced,
   the certificate; it brings you back to the draft), then "Signed by you". You can go on adding other signers and send
   it to them; your fields stay as signed. Preview (at the bottom of the column, once someone has signed): the document
   with the marks so far, and Download a copy. SELF_ACT: its buttons. */
import { ic } from '../icons/index.js';
import { rerender } from '../store/index.js';
import { notify } from '../feedback/index.js';
import { show_in_dialog } from '../overlays/index.js';
import { go } from '../router/index.js';
import { find_doc, who, add_rec } from './sign_store.js';
import { P, prep_dirty, prep_save } from './prep_state.js';
import { Pdf_pages } from './pdf_pages.jsx';
import { fields_on } from './sign_fields.jsx';
import { use_marks } from './use_marks.js';

const mine = d => d.recipients.find(r => r.email === who().email);

/* under Save draft, in ink (apart from Send and Save): Sign it myself → Sign my fields → Signed by you */
export function self_part(d) {
  const r = mine(d), n = r ? d.fields.filter(f => f.rid === r.id).length : 0;
  if (!r) return <button type="button" className="btn btn_ink btn_sm w-full" data-act="sign_self">{ic('signature', 'h-4 w-4')}Sign it myself</button>;
  if (r.status === 'signed') return <p className="sign_self_done">{ic('check', 'h-4 w-4 shrink-0')}Signed by you</p>;
  return <span className="sign_send_wrap" data-tip={n ? undefined : 'Place your signature or stamp first.'}>
    <button type="button" className="btn btn_ink btn_sm w-full" data-act="sign_self_go" disabled={!n}>{ic('signature', 'h-4 w-4')}Sign my fields</button></span>;
}

/* the column's foot: Preview, once someone has signed */
export const preview_foot = d => d.recipients.some(r => r.status === 'signed')
  ? <div className="sign_foot"><button type="button" className="btn btn_outline btn_sm w-full" data-act="sign_preview" data-id={d.id}>{ic('eye', 'h-4 w-4')}Preview</button></div> : null;

function Preview({ id }) {
  const d = find_doc(id), marks = use_marks(id, d?.updated);
  if (!d) return null;
  return <><header className="flex items-center gap-2 py-2 pl-4 pr-2"><h2 className="min-w-0 flex-1 truncate font-sans text-base font-medium">{d.title}</h2>
    <button type="button" className="btn btn_primary btn_sm" data-act="sign_dl" data-id={id}>{ic('download', 'h-4 w-4')}Download a copy</button>
    <button type="button" className="icon_btn" data-act="close_viewer" aria-label="Close" data-tip="Close">{ic('x')}</button></header>
    <div className="sign_preview min-h-0 flex-1 overflow-auto"><Pdf_pages doc={d} layer={i => fields_on(d, i, { mode: 'view', marks })} /></div></>;
}

export const SELF_ACT = {
  sign_self: () => { const me = who(); if (!me.email) return;
    const r = mine(P.doc) || add_rec(P.doc, me.name || me.email, me.email, '', false);
