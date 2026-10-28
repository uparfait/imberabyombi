/* modules/tv_state.js: the bridge between the task view's data-act handlers and its React state. <Task_view/> ties its
   API to its root element ([data-task]); tv_api(any element inside) finds it: { id, st, put(patch | s => patch) }. */
const H = new WeakMap();
