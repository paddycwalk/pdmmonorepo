import "./Headline.scss";
import React from "react";
import clsx from "clsx";

export interface HeadlineProps {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  bold?: boolean;
  size?: "tiny" | "small" | "medium" | "large";
  className?: string;
}

export const Headline: React.FC<HeadlineProps> = ({
  tag: Tag = "h1",
  children,
  bold = false,
  size = "medium",
  className,
}) => {
  return (
    <Tag
      className={clsx(
        "Headline",
        `Headline-${size}`,
        {
          "Headline-bold": bold,
        },
        className,
      )}
    >
      {children}
    </Tag>
  );
};
