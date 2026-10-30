/* fields/people_field.jsx: a list of people in a form (field type 'people', such as co-organisers): a name and an email
   each, "Add" and × to remove one. people_from(form, key) reads them back. */
import { useState } from 'react';
import { uid } from '../lib/index.js';
import { ic } from '../icons/index.js';

function People_editor({ k, v, add }) {
  const [rows, set] = useState(() => (v || []).map(x => ({ ...x, i: uid() })));
