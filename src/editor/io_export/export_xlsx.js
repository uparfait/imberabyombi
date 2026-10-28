/* editor/io_export/export_xlsx.js: Excel (.xlsx): each table becomes its own worksheet, named after the heading above it
   (unique, at most 31 characters, no \ / ? * [ ] :). Written as Office Open XML with no external library. */
import { download } from '../core/index.js';
import { export_data } from './export_data.js';
