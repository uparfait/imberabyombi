/* sign/bg_cut.js: background removal for an uploaded signature or stamp. The paper's colour is read from the picture's
   edges (their median, so a little ink at the border does not matter); every pixel close to it becomes transparent, and a
   soft band after that keeps the ink's edges smooth. amount (0–100): how far from the paper a colour may be and still go.
   A picture whose edges are already transparent is left as it is. */
