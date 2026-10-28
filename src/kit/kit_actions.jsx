/* kit/kit_actions.jsx: the Actions specimen: every button style, status badges and a tag, a segmented control,
   stacked faces and the tab strip. */
import { Fragment } from 'react';
import { ic } from '../icons/index.js';
import { badge, tag, tabs } from '../ui/index.js';
import { cfg } from '../config/index.js';

export const kit_actions = () => (
  <>
    <div className="flex flex-wrap items-center gap-3"><button className="btn btn_primary">Primary</button><button className="btn btn_ink">Ink</button>
      <button className="btn btn_outline">Outline</button><button className="btn btn_soft">Soft</button><button className="btn btn_ghost">Ghost</button>
