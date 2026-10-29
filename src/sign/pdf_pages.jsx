/* sign/pdf_pages.jsx: <Pdf_pages doc layer/>, a document's pages one under the other, as wide as their column. Each page
   keeps its shape from the first draw (its size is in the record), so the fields sit in place before the PDF has opened;
   a page is painted when it comes near the screen and again when its width changes. layer(i) = the fields over page i. */
import { useEffect, useRef, useState } from 'react';
import { spinner } from '../feedback/index.js';
import { empty } from '../ui/index.js';
