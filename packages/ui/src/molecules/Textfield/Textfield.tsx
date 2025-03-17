"use client";

import React from "react";
import { FormikField, Label } from "../../..";
import "./Textfield.scss";
import clsx from "clsx";

export interface TextfieldProps {
  label: string;
  type: string;
  placeholder?: string;
  className?: string;
  id: string;
  htmlFor: string;
  value?: string;
  autoComplete?: string;
  // key?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
}

export const Textfield = ({
  id,
  label,
  placeholder,
  type,
  className,
  htmlFor,
  value,
  autoComplete,
  // key,
  name,
  onChange,
  maxLength,
}: TextfieldProps) => {
  return (
    <div className={clsx("Textfield", className)}>
      <FormikField
        name={name}
        label={label}
        placeholder={placeholder}
        type={type}
        value={value}
        // key={key}
        id={id}
        autoComplete={autoComplete}
        onChange={onChange}
        maxLength={maxLength}
      ></FormikField>
      <Label
        htmlFor={htmlFor}
        label={label}
        className="Textfield_label"
      ></Label>
    </div>
  );
};
