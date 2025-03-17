"use client";

import { forwardRef, ReactNode } from "react";

export interface TreeBranchProps {
  children: ReactNode;
  maxHeight: string | number;
}

const TreeBranch = forwardRef<HTMLDivElement, TreeBranchProps>(
  ({ children, maxHeight }, ref) => (
    <div
      className={`Tree_TreeBranch TreeBranch`}
      style={{ maxHeight }}
      ref={ref}
    >
      {children}
    </div>
  ),
);

TreeBranch.displayName = "TreeBranch";

export default TreeBranch;
