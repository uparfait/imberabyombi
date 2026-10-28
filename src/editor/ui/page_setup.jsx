/* editor/ui/page_setup.jsx: File / Format › Page setup (source pageSetupDialog) in the template's modal: pages or
   pageless, orientation, paper size, margins, header / footer / page numbers and the page colour. The new setup is one
   step of history and is applied once the dialog has closed. */
import { useState } from 'react';
import { state, PAPER, clamp, begin_op, commit, save_soon } from '../core/index.js';
import { num_props } from '../format/index.js';
import { modal } from '../../overlays/index.js';
import { form_msg } from '../../feedback/index.js';
import { apply_setup } from './view.js';
import { after_close } from './dialogs.jsx';

const SIDES = ['top', 'bottom', 'left', 'right'];
const cap = s => s[0].toUpperCase() + s.slice(1);

/* a segmented choice (the template's .seg) */
function seg(name, opts, cur, on) {
  return <div className="seg">{opts.map(([v, l]) => <label key={v}>
    <input type="radio" className="sr-only" name={name} value={v} defaultChecked={cur === v} onChange={on} /><span>{l}</span></label>)}</div>;
}
const check = (name, label, on) => (
  <label className="flex cursor-pointer items-center gap-2 text-sm"><input type="checkbox" name={name} defaultChecked={on} /> {label}</label>
);

function Page_setup_body() {
  const s = state.setup, [pageless, set_pageless] = useState(!!s.pageless);
  return <>
    <fieldset className="border-0 p-0 sm:col-span-2"><legend className="mb-2 px-0 text-sm">Format</legend>
      {seg('fmt', [['pages', 'Pages'], ['pageless', 'Pageless']], s.pageless ? 'pageless' : 'pages', e => set_pageless(e.target.value === 'pageless'))}</fieldset>
    <div id="ps_pages" className="grid gap-5 transition-opacity sm:col-span-2 sm:grid-cols-2" style={{ opacity: pageless ? 0.45 : 1 }}>
      <fieldset className="border-0 p-0"><legend className="mb-2 px-0 text-sm">Orientation</legend>
        {seg('ori', [['portrait', 'Portrait'], ['landscape', 'Landscape']], s.orientation, null)}</fieldset>
      <div className="field"><label htmlFor="ps_paper">Paper size</label>
        <select id="ps_paper" name="paper" defaultValue={s.paper}>{Object.entries(PAPER).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select></div>
      {SIDES.map(k => <div className="field" key={k}><label htmlFor={'ps_' + k}>{cap(k)} margin (inches)</label>
        <input id={'ps_' + k} name={'ps_' + k} type="number" placeholder=" " {...num_props(s.margins[k], 0, 5, 0.05)} /></div>)}
      <fieldset className="border-0 p-0 sm:col-span-2"><legend className="mb-2 px-0 text-sm">Headers, footers and page numbers</legend>
        <div className="flex flex-wrap gap-x-5 gap-y-1">{check('header', 'Header', s.header)}{check('footer', 'Footer', s.footer)}{check('page_numbers', 'Page numbers', s.page_numbers)}</div>
      </fieldset>
    </div>
    <div className="field"><label htmlFor="ps_color">Page color</label><input id="ps_color" name="page_color" type="color" defaultValue={s.page_color || '#ffffff'} /></div>
  </>;
}

export function page_setup_dialog() {
  modal({
