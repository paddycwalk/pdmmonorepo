"use client";

import { PlacesType, Tooltip as ReactTooltip } from "react-tooltip";
import "./Tooltip.scss";

export interface TooltipProps {
  id: string;
  place: PlacesType;
  content: string;
  children: React.ReactNode;
}

export const Tooltip = ({ id, place, content, children }: TooltipProps) => {
  return (
    <span data-tooltip-id={id} className="Tooltip_wrapper">
      <ReactTooltip
        id={id}
        place={place}
        content={content}
        className="Tooltip"
        noArrow
      />
      {children}
    </span>
  );
};
