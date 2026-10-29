/* actions: what every [data-act] button and [data-form] form does (ACT, REQ, FORMS), plus the helpers other areas call
   (menus, theme and tokens, range fill, media player, <details> animation, command palette). Import from here. */
export * from './pops.js';
export * from './theme.js';
export * from './media.js';
export * from './open_cmd.jsx';
export { ACT, REQ, add_act } from './act.js';
export * from './forms.js';
