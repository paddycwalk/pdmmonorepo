import React, { ReactNode, MouseEvent } from "react";
import clsx from "clsx";
import "./Icon.scss";

export interface IconProps {
  svg?: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  id?: string;
}

export const Icon: React.FC<IconProps> = ({ svg, className, onClick, id }) => {
  return (
    <i id={id} className={clsx("Icon", className)} onClick={onClick}>
      {svg}
    </i>
  );
};
