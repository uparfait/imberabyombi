/* sign/prep_page.jsx: preparing a draft (/admin/sign/edit/<id>): signers on the left, the PDF in the middle with the fields
   being placed, the tools on the right. Phones: the document, a bar at the bottom and the signers in a sheet that slides
   up. prep_btns() are its top-bar buttons: Save and Send for signing. */
import { useEffect, useRef } from 'react';
import { ic } from '../icons/index.js';
import { Pdf_pages } from './pdf_pages.jsx';
import { fields_on } from './sign_fields.jsx';
import { P } from './prep_state.js';
import { prep_pointer } from './prep_drag.js';
import { prep_panel } from './prep_panel.jsx';
import { prep_tools, prep_bar } from './prep_tools.jsx';

/* the pages with the fields being placed; the pointer and keys work on them while the page is open */
function Prep_doc({ d }) {
