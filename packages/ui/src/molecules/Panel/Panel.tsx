"use client";

import "./Panel.scss";
import { ReactNode, useState } from "react";
import clsx from "clsx";
import { Headline } from "../../atoms/Headline/Headline";
import { Button } from "../../atoms/Button/Button";
import { AddIcon, MinusIcon } from "../../..";

export interface PanelProps {
  children: ReactNode;
  hdl?: string;
  shadow?: boolean;
  collapsible?: boolean;
  noPadding?: boolean;
}

export const Panel = ({
  children,
  hdl,
  shadow,
  collapsible,
  noPadding,
}: PanelProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const togglePanel = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <article
      className={clsx("Panel", { "Panel-shadow": shadow })}
      aria-expanded={collapsible ? isExpanded : undefined}
    >
      {hdl && (
        <div className="Panel_head">
          <Headline tag="h3">{hdl}</Headline>
          {collapsible && (
            <Button
              className="Panel_toggle"
              onClick={togglePanel}
              icon={isExpanded ? <MinusIcon /> : <AddIcon />}
              ariaLabel="Toggle panel"
            ></Button>
          )}
        </div>
      )}
      <div
        className={clsx("Panel_body", { "Panel_body-collapsed": !isExpanded })}
      >
        <div
          className={clsx("Panel_content", {
            "Panel_content-noPadding": noPadding,
          })}
        >
          {children}
        </div>
      </div>
    </article>
  );
};
