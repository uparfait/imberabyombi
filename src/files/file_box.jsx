/* files/file_box.jsx: <File_box/>, a file field inside its .filebox (attachments row + waiting spinner + the input): the
   DOM the reference's fileBox() + fileTiles() built around <input type=file>. The chosen files and the "picking" state
   (the system file dialog is open) are React state; the input keeps the real FileList (forms read it, x rewrites it). */
import { useEffect, useRef, useState } from 'react';
