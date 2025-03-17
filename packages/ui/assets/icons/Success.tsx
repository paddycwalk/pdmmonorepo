import React, { CSSProperties } from "react";

const Success: React.FC = (): React.ReactElement => {
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
      <polyline style={cls1} points="12 24 21 34 36 16" />
    </svg>
  );
};

export default Success;
