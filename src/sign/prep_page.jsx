/* sign/prep_page.jsx: preparing a draft (/admin/sign/edit/<id>): signers on the left, the PDF in the middle with the fields
   being placed, the tools on the right (Save and Send for signing at their top). */
import { useEffect, useRef } from 'react';
import { Pdf_pages } from './pdf_pages.jsx';
import { fields_on } from './sign_fields.jsx';
import { P } from './prep_state.js';
import { prep_pointer } from './prep_drag.js';
import { prep_panel } from './prep_panel.jsx';
import { prep_tools } from './prep_tools.jsx';
import { use_marks } from './use_marks.js';

/* the pages with the fields being placed; the pointer and keys work on them while the page is open */
function Prep_doc({ d }) {
  const root = useRef(null), marks = use_marks(d.id, d.updated);   /* your own marks, once you have signed your fields */
  useEffect(() => prep_pointer(root.current), []);
  return <div ref={root}><Pdf_pages doc={d} layer={i => fields_on(d, i, { mode: 'edit', sel: P.sel })} /></div>;
}

export const prep_page = d => <div className="sign_work">
  <aside className="sign_left" aria-label="Document and signers">{prep_panel(d)}</aside>
  <section className="sign_center" aria-label="Pages"><Prep_doc d={d} /></section>
  <aside className="sign_right" aria-label="Fields">{prep_tools(d)}</aside>
</div>;
