"use client";

import dynamic from "next/dynamic";
import { useState, useMemo, useRef } from "react";
import "./Dropdown.scss";
import { Label } from "../Label/Label";
import clsx from "clsx";

const Select = dynamic(() => import("react-select"), { ssr: false });

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string | string[];
  onValueChange?: (newValue: string | string[]) => void;
  className?: string;
  menuIsOpen?: boolean;
  isDisabled?: boolean;
  isMulti?: boolean;
  placeholder?: string;
  closeMenuOnSelect?: boolean;
  autoFocus?: boolean;
  isSearchable?: boolean;
  hideSelectedOptions?: boolean;
  showLabel?: boolean;
  label?: string;
  selectAllLabel?: string;
  deselectAllLabel?: string;
}

export const Dropdown = ({
  options,
  value = "",
  onValueChange,
  menuIsOpen,
  isDisabled,
  isMulti = false,
  placeholder,
  closeMenuOnSelect,
  autoFocus,
  isSearchable,
  hideSelectedOptions,
  showLabel,
  label = "Dropdown Label",
  selectAllLabel = "Select all",
  deselectAllLabel = "Deselect all",
  className,
}: DropdownProps) => {
  const [selectedValue, setSelectedValue] = useState<string | string[]>(value);
  const selectRef = useRef<any>(null);

  const selectAllOption = useMemo(() => {
    if (isMulti) {
      const isAllSelected =
        Array.isArray(selectedValue) && selectedValue.length === options.length;
      return {
        value: "toggle-select",
        label: isAllSelected ? deselectAllLabel : selectAllLabel,
      };
    }
    return null;
  }, [isMulti, selectedValue, options]);

  const enhancedOptions = useMemo(
    () =>
      isMulti && selectAllOption ? [selectAllOption, ...options] : options,
    [isMulti, selectAllOption, options],
  );

  const handleChange = (selectedOption: any) => {
    if (isMulti) {
      if (selectedOption.some((opt: any) => opt.value === "toggle-select")) {
        const isAllSelected =
          (selectedValue as string[]).length === options.length;
        const newSelectedValues = isAllSelected
          ? []
          : options.map((opt) => opt.value);
        setSelectedValue(newSelectedValues);
        if (onValueChange) onValueChange(newSelectedValues);
      } else {
        const values = selectedOption.map((opt: any) => opt.value);
        setSelectedValue(values);
        if (onValueChange) onValueChange(values);
      }
    } else {
      setSelectedValue(selectedOption?.value || "");
      if (onValueChange) onValueChange(selectedOption?.value || "");
    }
  };

  return (
    <div className={clsx("Dropdown", className)}>
      {showLabel && (
        <Label htmlFor="" label={label} className="Dropdown_label"></Label>
      )}
      <Select
        options={enhancedOptions}
        value={
          isMulti
            ? enhancedOptions.filter((option) =>
                (selectedValue as string[]).includes(option.value),
              )
            : enhancedOptions.find((option) => option.value === selectedValue)
        }
        onChange={handleChange}
        className="Dropdown"
        classNamePrefix="Dropdown"
        menuIsOpen={typeof window !== "undefined" && menuIsOpen}
        isDisabled={isDisabled}
        isMulti={isMulti}
        placeholder={placeholder}
        closeMenuOnSelect={closeMenuOnSelect}
        autoFocus={autoFocus}
        isSearchable={isSearchable}
        hideSelectedOptions={hideSelectedOptions}
        ref={selectRef}
        noOptionsMessage={() => "No options"}
      />
    </div>
  );
};
