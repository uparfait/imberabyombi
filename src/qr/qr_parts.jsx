/* qr/qr_parts.jsx: Qr-scan's pieces: Install (an icon: the browser's offer; on an iPhone a tip: Share, then Add to Home
   Screen; gone once installed) and what a scan found (a secure link, opened in a new tab; an http link, which does not
   open from here; any other text, to copy). */
import { useState } from 'react';
import { ic } from '../icons/index.js';
import { secure } from './qr_engine.js';
import { can_install, install, apple, installed, standalone } from './qr_install.js';

export function Install() {
  const [tip, set_tip] = useState(false), add = can_install() ? install : !standalone() && !installed() && apple() ? () => set_tip(!tip) : null;
  if (!add) return null;
  return <span className="relative"><button type="button" className="qr_round sm qr_install" onClick={add} aria-label="Install Qr-scan" title="Install"
    aria-expanded={can_install() ? undefined : tip}>{ic('download', 'h-5 w-5')}</button>
    {tip ? <p className="qr_tip" role="status">{ic('upload', 'h-4 w-4 shrink-0')}Tap Share, then Add to Home Screen</p> : null}</span>;
}

function Copy({ text, cls }) {
  const [ok, set] = useState(false);
  const copy = () => navigator.clipboard?.writeText(text).then(() => { set(true); setTimeout(() => set(false), 1500); }, () => {});
  return <button type="button" className={cls} onClick={copy}>{ic(ok ? 'check' : 'copy', 'h-4 w-4')}{ok ? 'Copied' : 'Copy'}</button>;
}

export const top_bar = () => <header className="qr_top">
  <span className="qr_brand" aria-hidden="true">{ic('qr', 'h-5 w-5')}</span><h1 className="qr_name">Qr-scan</h1>
  <div className="ml-auto flex items-center gap-1">
    {can_install() ? <button type="button" className="btn btn_primary btn_sm" onClick={install}>{ic('download', 'h-4 w-4')}Install</button>
      : !standalone() && apple() ? <span className="qr_hint" title="Share, then Add to Home Screen">{ic('download', 'h-4 w-4')}Add to Home Screen</span> : null}
    <button type="button" className="icon_btn" onClick={theme} aria-label="Light or dark" title="Light or dark">{ic('moon')}</button>
    {standalone() ? null : <a href={import.meta.env.BASE_URL} className="icon_btn" aria-label={`Back to ${cfg.name}`} title={cfg.name}>{ic('home')}</a>}</div></header>;

/* what was found */
export function found_card(text) {
  const link = secure(text), web = !link && /^http:\/\//i.test(text.trim());
  return <section className={`qr_found ${link ? 'is_link' : web ? 'is_warn' : ''}`} aria-live="polite">
    <p className="qr_kind">{ic(link ? 'shield' : web ? 'alert' : 'note', 'h-4 w-4')}{link ? 'Secure link' : web ? 'Not a secure link' : 'Text'}</p>
    {link ? <><p className="qr_host truncate">{new URL(link).host}</p><p className="qr_text truncate" title={link}>{link}</p></>
      : <p className="qr_text qr_plain">{text}</p>}
    {web ? <p className="qr_note">Only links that start with https open from here.</p> : null}
    <div className="qr_acts">{link ? <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn_primary">{ic('external', 'h-4 w-4')}Open link</a> : null}
      <Copy text={link || text} cls={`btn ${link ? 'btn_outline' : 'btn_primary'}`} /></div></section>;
}

/* the last scans, kept in this browser */
export const recent_list = (items, clear) => items.length ? <section className="qr_recent" aria-label="Recent scans">
  <div className="flex items-center justify-between"><h2 className="qr_cap">Recent</h2>
    <button type="button" className="text-xs text-muted hover:text-fg" onClick={clear}>Clear</button></div>
  <ul>{items.map(x => { const link = secure(x.t);
    return <li key={x.at}>{ic(link ? 'link' : 'note', 'h-4 w-4 shrink-0 text-muted')}<span className="min-w-0 flex-1 truncate" title={x.t}>{x.t}</span>
      {link ? <a href={link} target="_blank" rel="noopener noreferrer" className="icon_btn h-8 w-8" aria-label="Open link" title="Open link">{ic('external', 'h-4 w-4')}</a>
        : <Copy text={x.t} label="" cls="icon_btn h-8 w-8" />}</li>; })}</ul></section> : null;
