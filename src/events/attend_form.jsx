/* events/attend_form.jsx: <Attend_form/>, signing in to an event or activity: full name, email, telephone, organisation
   or unit, position and a signature, drawn (the O-Doc Sign pad) or digital (name, email and time, signed with a
   certificate id). Saved to attendees, once per email; then a large tick. demo: the design system's copy (saves nothing). */
import { useState } from 'react';
import { hash_str } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { db } from '../store/index.js';
import { field_spec } from '../schemas/fields.js';
import { field } from '../fields/index.js';
import { validate } from '../feedback/index.js';
import { Pad_draw } from '../sign/pad_draw.jsx';
import { PAD } from '../sign/pad_state.js';

const F = [field_spec('name', 'Full name', 'text', 0, 1), field_spec('email', 'Email', 'email', 0, 1), field_spec('tel', 'Telephone', 'tel'),
  field_spec('org', 'Organisation or unit'), field_spec('position', 'Position')];
const MODES = [['Drawn', 'Draw'], ['Digital', 'Digital']];
