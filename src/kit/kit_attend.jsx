/* kit/kit_attend.jsx: the "Attendance" section of the design system: the form an event's QR code opens
   (events/attend_form.jsx), as a demo: it checks the fields and shows the tick, and saves nothing. */
import { Attend_form } from '../events/index.js';

export const kit_attend = () => <div className="att_card card"><p className="att_kind">Event</p><h3 className="att_title">Lorem meeting</h3>
  <p className="att_when">Fri, Oct 30 · 10:00 · Room 4</p><Attend_form demo /></div>;
