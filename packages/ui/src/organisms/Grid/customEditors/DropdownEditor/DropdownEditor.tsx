"use client";

import { useState, useEffect } from "react";
import { Dropdown } from "../../../../atoms/Dropdown/Dropdown";
import { Button } from "../../../../atoms/Button/Button";
import { CheckIcon, CloseIcon } from "../../../../..";
import "./DropdownEditor.scss";
import { Form, Formik } from "formik";
import { ICellEditorParams } from "ag-grid-enterprise";

export interface DropdownEditorProps extends ICellEditorParams {
  options: { value: string; label: string }[];
  value: string;
  api: any; // AG Grid API
  node: any; // AG Grid Node
  column: any; // AG Grid Column
  stopEditing: () => void;
}

export const DropdownEditor = ({
  options,
  value = "",
  api,
  node,
  column,
  stopEditing,
}: DropdownEditorProps) => {
  const [selectedValue, setSelectedValue] = useState<string | string[]>(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleSave = () => {
    api.stopEditing();
    node.setDataValue(column.colId, selectedValue);
  };

  const handleClose = () => {
    stopEditing();
  };

  return (
    <Formik
      initialValues={{ selectedValue }}
      onSubmit={(values) => {
        handleSave();
        console.log("DropdownEditor onSubmit", values);
      }}
    >
      {({ setFieldValue }) => (
        <Form className="Form">
          <div className="DropdownEditor">
            <Dropdown
              options={options}
              value={selectedValue}
              onValueChange={(newValue) => {
                console.log("DropdownEditor Formik value:", newValue);
                setSelectedValue(newValue);
                setFieldValue("selectedValue", newValue);
              }}
            />
            <div className="DropdownEditor_btns">
              <Button
                icon={<CloseIcon />}
                outline
                onClick={handleClose}
              ></Button>
              <Button
                icon={<CheckIcon />}
                theme="primary"
                type="submit"
              ></Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
