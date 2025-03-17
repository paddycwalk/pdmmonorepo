import React, { CSSProperties } from "react";

const ArwNodeL: React.FC = (): React.ReactElement => {
  const style: CSSProperties = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeMiterlimit: 10,
  };
  return (
    <svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
      <path style={style} d="M30 37.9c6.6 0 12-5.4 12-12s-5.4-12-12-12H8" />
      <path style={style} d="M15.9 5L7 13.9l8.9 8.8" />
    </svg>
  );
};

export default ArwNodeL;
