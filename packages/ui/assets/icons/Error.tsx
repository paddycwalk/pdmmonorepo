import React, { CSSProperties } from "react";

const Error: React.FC = (): React.ReactElement => {
  const style: CSSProperties = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2px",
  };
  return (
    <svg
      id="Ebene_1"
      data-name="Ebene 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
    >
      <circle style={style} cx="24" cy="24" r="22" />
      <line style={style} x1="14" y1="14" x2="34" y2="34" />
      <line style={style} x1="34" y1="14" x2="14" y2="34" />
    </svg>
  );
};

export default Error;
