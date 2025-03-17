"use client";

import "./Checkbox.scss";
import React from "react";
import clsx from "clsx";

export interface CheckboxProps {
  id: string;
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}

export const Checkbox = ({
  id,
  label,
  checked,
  onChange,
  className,
  disabled = false,
  onClick,
}: CheckboxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div
      className={clsx("Checkbox", className, {
        "Checkbox-disabled": disabled,
      })}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="Checkbox_input"
        onClick={onClick}
      />
      <label htmlFor={id} className="Checkbox_label">
        {label}
      </label>
    </div>
  );
};
