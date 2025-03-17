import React, { CSSProperties } from "react";

const Add: React.FC = (): React.ReactElement => {
  const style: CSSProperties = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  return (
    <svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
      <path style={style} d="M24 44V4M4 24h40" />
    </svg>
  );
};

export default Add;
