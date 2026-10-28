/* kit/kit_lists.jsx: the Lists specimen: the three list kinds (unordered, ordered, description), styled by prose_x. */
import { Fragment } from 'react';
import { lorem } from '../lib/index.js';

export const kit_lists = () => (
  <div className="prose_x grid gap-8 md:grid-cols-3"><ul>{[0, 1, 2].map(i => <li key={i}>{lorem.s(4, 7)}</li>)}</ul>
    <ol>{[0, 1, 2].map(i => <li key={i}>{lorem.s(4, 7)}</li>)}</ol>
