/* editor/content/comment_cards.js: the comment cards in #comment_list (rendered empty by the chrome, filled here) in
   the order of their text in the page: draft (Comment / Cancel, Ctrl+Enter saves), saved (Resolve, Delete, replies). */
import { ic_html } from '../../icons/index.js';
import { qs, qsa, el, toast, state, pages_el, save_soon } from '../core/index.js';
import { remove_comment, activate_comment, fmt_time } from './comments.js';

const icon_btn = (x, tip, icon, cls) => `<button type="button" class="icon_btn h-7 w-7" data-x="${x}" data-tip="${tip}" aria-label="${tip}">`
  + `${ic_html(icon, 'h-[1.125rem] w-[1.125rem] ' + cls)}</button>`;
const DRAFT = '<textarea class="c_input mt-2" rows="2" placeholder="Comment" aria-label="Comment"></textarea>'
  + '<div class="mt-2 flex justify-end gap-2"><button type="button" class="btn btn_ghost btn_sm" data-x="cancel">Cancel</button>'
  + '<button type="button" class="btn btn_primary btn_sm" data-x="save">Comment</button></div>';
const REPLY = '<input class="c_input mt-2" placeholder="Reply" aria-label="Reply">';
const card_html = (c, orphan) => '<div class="flex items-center gap-2"><span class="c_avatar">Y</span><div class="min-w-0 flex-1">'
  + `<div class="font-medium">You</div><div class="text-xs text-muted">${fmt_time(c.time)}</div></div>`
  + `${c.draft ? '' : icon_btn('resolve', 'Resolve', 'check', 'text-accent') + icon_btn('delete', 'Delete', 'delete', '')}</div>`
  + `<div class="c_quote"></div>${orphan ? '<div class="text-xs text-muted">The commented text was deleted.</div>' : ''}`
  + '<div class="c_text mt-1 whitespace-pre-wrap"></div><div class="c_replies"></div>' + (c.draft ? DRAFT : REPLY);
const reply_html = r => `<div class="text-xs font-medium">You <span class="font-normal text-muted">${fmt_time(r.time)}</span></div>`
  + '<div class="whitespace-pre-wrap"></div>';

function on_card_click(e, c, card) {
  const x = e.target.closest('[data-x]');
  if (!x) {
    if (e.target.closest('input,textarea')) return;
    activate_comment(c.id); const sp = qs(`.cmt[data-cid="${c.id}"]`, pages_el); if (sp) sp.scrollIntoView({ block: 'center', behavior: 'smooth' });
    return;
  }
  if (x.dataset.x === 'save') {
    const v = qs('textarea', card).value.trim(); if (!v) { toast('Write a comment first'); return; }
    c.text = v; c.draft = false; save_soon(); render_comments();
  }
  else if (x.dataset.x === 'cancel' || x.dataset.x === 'resolve' || x.dataset.x === 'delete') { remove_comment(c.id); if (x.dataset.x === 'resolve') toast('Comment resolved'); }
}
function card_of(c) {
  const card = el('div', { class: 'c_card', 'data-id': c.id }), orphan = !qs(`.cmt[data-cid="${c.id}"]`, pages_el);
  card.innerHTML = card_html(c, orphan);
  qs('.c_quote', card).textContent = c.quote; qs('.c_text', card).textContent = c.text;
  const rep = qs('.c_replies', card);
  c.replies.forEach(r => { const d = el('div', { class: 'mt-2 border-t border-line pt-2' }, reply_html(r)); d.lastChild.textContent = r.text; rep.appendChild(d); });
  card.addEventListener('click', e => on_card_click(e, c, card));
  const inp = qs('input.c_input', card);
  if (inp) inp.addEventListener('keydown', e => {
    if (e.key === 'Enter' && inp.value.trim()) { c.replies.push({ text: inp.value.trim(), time: Date.now() }); save_soon(); render_comments(); activate_comment(c.id); }
  });
  const ta = qs('textarea', card);
  if (ta) ta.addEventListener('keydown', e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) qs('[data-x="save"]', card).click(); });
  return card;
}

export function render_comments() {
