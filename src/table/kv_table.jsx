/* table/kv_table.jsx: Details table: COLUMN NAME | VALUE, with a category row before each group.
   groups = [[title, [[name, value (JSX or text)], …]], …]; an empty value shows a dash. */
import { Fragment } from 'react';
import { dash } from '../ui/index.js';

const blank = v => v === '' || v == null || v === false;

export const kv_table = groups => (
  <div className="kv_wrap relative rounded-2xl border border-line sm:col-span-2">
    <table className="kv"><thead><tr><th scope="col">Column name</th><th scope="col">Value</th></tr></thead><tbody>{groups.map(([g, rows], gi) => (
      <Fragment key={gi}>
        {g ? <tr className="kv_group"><th scope="colgroup" colSpan={2}>{g}</th></tr> : null}
        {rows.map(([n, v], i) => <tr key={i}><th scope="row">{n}</th><td>{blank(v) ? dash() : v}</td></tr>)}
      </Fragment>
    ))}</tbody></table>
  </div>
);
