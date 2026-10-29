/* sign/bg_cut.js: background removal for an uploaded signature or stamp. The paper's colour is read from the picture's
   edges (their median, so a little ink at the border does not matter); every pixel close to it becomes transparent, and a
