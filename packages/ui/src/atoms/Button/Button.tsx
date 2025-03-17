"use client";

import { ReactNode } from "react";
import "./Button.scss";
import clsx from "clsx";
import { Icon } from "../Icon/Icon";

export interface ButtonProps {
  ariaLabel?: string;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  outline?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
  title?: string;
  type?: "button" | "submit" | "reset";
  theme?: "primary" | "success" | "warning" | "error";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  size?: "small" | "tiny";
  onContextMenu?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  style?: React.CSSProperties;
  onMouseDown?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMouseMove?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  integrated?: boolean;
}

export const Button = ({
  ariaLabel,
  children,
  className,
  disabled,
  onClick,
  outline,
  ref,
  title,
  type,
  theme,
  icon,
  iconPosition = "left",
  size,
  onContextMenu,
  style,
  onMouseDown,
  onMouseUp,
  onMouseMove,
  integrated,
}: ButtonProps) => {
  const isIconOnly = icon && !children;

  return (
    <button
      className={clsx("Button", className, {
        "Button-outline": outline,
        "Button-icon": icon,
        "Button-icononly": isIconOnly,
        "Button-disabled": disabled,
        [`Button-${theme}`]: theme,
        [`Button-icon-${iconPosition}`]: icon,
        [`Button-${size}`]: size,
        "Button-integrated": integrated,
      })}
      onClick={onClick}
      aria-label={ariaLabel}
      title={title}
      type={type}
      ref={ref}
      disabled={disabled}
      onContextMenu={onContextMenu}
      style={style}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {icon && iconPosition === "left" && <Icon svg={icon} />} {children}
      {icon && iconPosition === "right" && <Icon svg={icon} />}
    </button>
  );
};
