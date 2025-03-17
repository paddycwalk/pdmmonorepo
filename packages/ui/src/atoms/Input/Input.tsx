import React from "react";
import "./Input.scss";

export interface InputProps {
  id?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}

export const Input = ({
  id,
  value,
  onChange,
  placeholder,
  type,
  autoComplete,
}: InputProps) => {
  return (
    <input
      id={id}
      className="Input"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
    />
  );
};
