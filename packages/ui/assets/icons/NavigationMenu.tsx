import React, { CSSProperties } from "react";

const NavigationMenu: React.FC = (): React.ReactElement => {
  const cls1: CSSProperties = {
    clipRule: "evenodd",
  };

  const cls2: CSSProperties = {
    fillRule: "evenodd",
  };

  const cls3: CSSProperties = {
    clipPath: "url(#clip-path)",
  };

  const cls4: CSSProperties = {
    isolation: "isolate",
  };

  const cls5: CSSProperties = {
    clipPath: "url(#clip-path-2)",
  };

  const cls6: CSSProperties = {
    clipPath: "url(#clip-path-2)",
  };

  return (
    <svg
      id="Ebene_1"
      data-name="Ebene 1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 48 48"
    >
      <defs>
        <clipPath id="clip-path">
          <path
            style={cls1}
            d="M42,11a1,1,0,0,1,0,2H6a1,1,0,0,1,0-2Zm0,12a1,1,0,0,1,0,2H6a1,1,0,0,1,0-2Zm0,12a1,1,0,0,1,0,2H6a1,1,0,0,1,0-2Z"
          />
        </clipPath>
        <clipPath id="clip-path-2">
          <rect y="5" width="48" height="37" />
        </clipPath>
        <clipPath id="clip-path-3">
          <rect x="5" y="11" width="38" height="26" />
        </clipPath>
      </defs>
      <path
        style={cls2}
        d="M42,11a1,1,0,0,1,0,2H6a1,1,0,0,1,0-2Zm0,12a1,1,0,0,1,0,2H6a1,1,0,0,1,0-2Zm0,12a1,1,0,0,1,0,2H6a1,1,0,0,1,0-2Z"
      />
      <g style={cls3}>
        <g style={cls4}>
          <rect y="5" width="48" height="37" />
          <g style={cls5}>
            <rect x="5" y="11" width="38" height="26" />
            <g style={cls6}>
              <rect y="6" width="48" height="36" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default NavigationMenu;
