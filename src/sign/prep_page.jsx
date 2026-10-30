/* sign/prep_page.jsx: preparing a draft (/admin/sign/edit/<id>): signers on the left, the PDF in the middle with the fields
   being placed, the tools on the right (Save and Send for signing at their top). */
import { useEffect, useRef } from 'react';
import { Pdf_pages } from './pdf_pages.jsx';
import { fields_on } from './sign_fields.jsx';
import { P } from './prep_state.js';
import { prep_pointer } from './prep_drag.js';
import { prep_panel } from './prep_panel.jsx';
import { prep_tools } from './prep_tools.jsx';
