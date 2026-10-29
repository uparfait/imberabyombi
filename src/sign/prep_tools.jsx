/* sign/prep_tools.jsx: the prepare page's tools. Desktop: a right column ("Placing for": whose fields; the field tools,
   which add a field on click or drop one where they are dragged; what is placed so far). Phones: a bar at the bottom
   with the signer (it opens the signers' sheet) and the tools. */
import { ic } from '../icons/index.js';
import { KINDS, rec_of } from './sign_store.js';
import { P } from './prep_state.js';

const tool = (type, c = '') => { const [l, i] = KINDS[type];
  return <button key={type} type="button" className={`sign_tool ${c}`} data-act="sign_tool" data-type={type} draggable
