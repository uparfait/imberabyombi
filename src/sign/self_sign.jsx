/* sign/self_sign.jsx: signing your own draft. Under Save draft: Sign it myself, which adds you to the signers as "You"
   (picked under Placing for, so the fields you place are yours) and then goes. At the foot of the right column: Preview
   and sign, the document in an overlay with your fields to fill (your signature drawn, typed or uploaded, your stamp
   made or uploaded), Next field and Finish and sign (the agreement and, if forced, the certificate); signed, the same
   overlay has Download a copy and Add other signers. Your fields stay as signed, and the draft goes on: add others and
   send it. Once you have signed (or anyone has), the foot has Preview: the marks so far and Download a copy. */
import { ic } from '../icons/index.js';
import { rerender } from '../store/index.js';
import { notify } from '../feedback/index.js';
import { show_in_dialog } from '../overlays/index.js';
import { qs } from '../lib/index.js';
import { find_doc, who, add_rec } from './sign_store.js';
import { P, prep_dirty, prep_save } from './prep_state.js';
import { S, signer_start } from './signer_state.js';
import { Pdf_pages } from './pdf_pages.jsx';
import { fields_on } from './sign_fields.jsx';
import { use_marks } from './use_marks.js';
import { steps_card } from './signer_side.jsx';

const mine = d => d.recipients.find(r => r.email === who().email);

/* under Save draft, in ink (apart from Send and Save), until you are a signer */
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
    Object.assign(P, { rid: r.id, adding: false }); prep_dirty(); rerender();
    notify('Place your signature or stamp on the document, then sign them.', 'ok', 'You sign it too'); },
  sign_self_go: () => { prep_save(); go(`/admin/sign/sign/${P.doc.id}`); },
  sign_preview: t => { if (P.doc) prep_save(); show_in_dialog('viewer', () => <Preview id={t.dataset.id} />); }
};
