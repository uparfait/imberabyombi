/* fields/agenda_field.jsx: an agenda in a form (field type 'agenda'): items, each with a time from and to, a title, a
   description and its presenter (name, email, title); "Add item" and × to remove one. agenda_from(form) reads the items
   back, agenda_ok(form) checks each ends after it starts. */
import { useState } from 'react';
import { uid } from '../lib/index.js';
