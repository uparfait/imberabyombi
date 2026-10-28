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
      <button className="btn btn_danger">Danger</button><button className="btn btn_primary" disabled>Disabled</button>
      <button className="icon_btn" aria-label="Notifications">{ic('bell')}</button></div>
    <div className="mt-6 flex flex-wrap gap-2">{['Active', 'Pending', 'Overdue', 'Planned', 'Closed'].map(v => <Fragment key={v}>{badge(v)}</Fragment>)}{tag('Lorem')}</div>
    <div className="mt-6 flex flex-wrap items-center gap-4"><div className="seg">{['Day', 'Week', 'Month'].map((v, i) => (
      <label key={v}><input type="radio" className="sr-only" name="kseg" defaultChecked={i === 1} /><span>{v}</span></label>
