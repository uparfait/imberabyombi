/* events/event_cards.jsx: an event's details as cards, one per section of its schema (Details, When, Location, Organiser,
   Audience): label and value rows, and an Edit button that changes that section only (ev_edit). */
import { Fragment } from 'react';
import { fmt_d, fmt_time, zone_short, page_tz, repeat_text, repeat_next, ymd } from '../lib/index.js';
import { ic } from '../icons/index.js';
import { bar_cell, dash, tag } from '../ui/index.js';
import { KINDS } from '../schemas/index.js';
