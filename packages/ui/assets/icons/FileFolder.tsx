import React, { CSSProperties } from "react";

const FileFolder: React.FC = (): React.ReactElement => {
  const st0: CSSProperties = {
    fill: "none",
    stroke: "currentColor",
    strokeLinejoin: "round",
    strokeMiterlimit: 10,
    strokeWidth: 2,
  };

  return (
    <svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
      <path style={st0} d="M10 36V5c0-1.1.9-2 2-2h18l10 11v11" />
      <path
        style={st0}
        d="M30 3v11h10M9 10H4c-1.1 0-2 .9-2 2v30.6C2 43.9 3.1 45 4.4 45c1 0 1.8-.6 2.2-1.4l7.8-17.4c.3-.7 1-1.2 1.8-1.2h28.2c.7 0 1.2.7.9 1.4l-6.7 16.7c-.3 1.2-1.4 1.9-2.6 1.9H4M15 15h8M15 20h16"
      />
    </svg>
  );
};

export default FileFolder;
