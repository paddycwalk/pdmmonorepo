import React from "react";
import clsx from "clsx";
import "./Hint.scss";
import { Icon } from "../Icon/Icon";

export interface HintProps {
  text?: string;
  icon?: React.ReactNode;
  theme?: "info" | "success" | "warning" | "error";
}

export const Hint = ({ text, icon, theme }: HintProps) => {
  return (
    <div className={clsx("Hint", { [`Hint-${theme}`]: theme })}>
      {icon && <Icon svg={icon}></Icon>}
      {text}
    </div>
  );
};
