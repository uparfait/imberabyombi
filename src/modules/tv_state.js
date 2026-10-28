/* modules/tv_state.js: the bridge between the task view's data-act handlers and its React state. <Task_view/> ties its
   API to its root element ([data-task]); tv_api(any element inside) finds it: { id, st, put(patch | s => patch) }. */
const H = new WeakMap();
export const tv_tie = api => el => { if (el) H.set(el, api); };
export const tv_api = el => H.get(el?.closest?.('[data-task]'));
