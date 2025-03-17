"use client";

import clsx from "clsx";
import { Field, FieldAttributes, useField } from "formik";
import "./FormikField.scss";

export interface FormikFieldProps extends FieldAttributes<any> {
  name: string;
  label?: string;
  type: string;
  placeholder?: string;
  className?: string;
  id: string;
  value?: string;
  autoComplete?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
}

export const FormikField = ({
  label,
  name,
  type,
  placeholder,
  className,
  id,
  value,
  autoComplete,
  onChange,
  maxLength,
}: FormikFieldProps) => {
  const [field, meta] = useField(name);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }

    field.onChange(e);
  };
  return (
    <Field
      className={clsx("FormikField Input", className)}
      label={label}
      name={name}
      id={id}
      placeholder={placeholder}
      type={type}
      value={value}
      autoComplete={autoComplete}
      onChange={handleChange}
      maxLength={maxLength}
    ></Field>
  );
};
