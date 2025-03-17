import React, { CSSProperties } from "react";

const Info: React.FC = (): React.ReactElement => {
  const cls1: CSSProperties = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
  };
  return (
    <svg
      id="Ebene_1"
      data-name="Ebene 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
    >
      <circle style={cls1} cx="24" cy="24" r="22" />
      <line style={cls1} x1="24" y1="36" x2="24" y2="21" />
      <line style={cls1} x1="24" y1="15" x2="24" y2="12" />
    </svg>
  );
};

export default Info;
