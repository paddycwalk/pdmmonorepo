"use client";

import React, { forwardRef } from "react";
import { Icon } from "../Icon/Icon";

export interface ControlProps {
  svg?: React.ReactNode;
  onClick?: () => void;
  tooltip?: string;
  visible?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

export const Control = forwardRef<HTMLButtonElement, ControlProps>(
  ({ onClick, svg, tooltip, visible = true }, ref): React.ReactElement => {
    return (
      <button
        className={`Control Control-${visible ? "visible" : "hidden"}`}
        onClick={onClick}
        title={tooltip}
        ref={ref}
      >
        {svg && <Icon svg={svg} />}
      </button>
    );
  },
);
