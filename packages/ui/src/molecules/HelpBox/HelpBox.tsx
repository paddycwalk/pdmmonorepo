"use client";

import React, { useState, useEffect, useRef } from "react";
import "./HelpBox.scss";
import { Button } from "../../atoms/Button/Button";
import { CaretDownIcon } from "../../..";

export interface HelpBoxProps {
  helpLabel?: string;
  children: React.ReactNode;
}

export const HelpBox = ({ helpLabel = "Help", children }: HelpBoxProps) => {
  const helpBoxRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        helpBoxRef.current &&
        !helpBoxRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={helpBoxRef} className={`HelpBox ${open ? "HelpBox-open" : ""}`}>
      <div className="HelpBox_content">{children}</div>
      <Button
        theme="primary"
        className={`HelpBox_toggleBtn ${open ? "HelpBox_toggleBtn-open" : ""}`}
        icon={<CaretDownIcon />}
        iconPosition="right"
        onClick={() => setOpen((prev) => !prev)}
      >
        {helpLabel}
      </Button>
    </div>
  );
};
