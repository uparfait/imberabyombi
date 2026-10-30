/* fields/people_field.jsx: a list of people in a form (field type 'people', such as co-organisers): a name and an email
   each, "Add" and × to remove one. people_from(form, key) reads them back. */
import { useState } from 'react';
import { uid } from '../lib/index.js';
