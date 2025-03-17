"use client";

import { useState } from "react";
import { CustomCellEditorProps } from "ag-grid-react";
import {
  Button,
  EraserIcon,
  FullEditorIcon,
  FullsizeTextEditor,
  Paragraph,
  Textfield,
} from "@repo/ui";
import "./CustomTextEditor.scss";
import { Form, Formik } from "formik";

interface CustomTextEditorProps extends CustomCellEditorProps {
  closeLabel?: string;
}

export const CustomTextEditor = ({
  value: initialValue,
  onValueChange,
  stopEditing,
  closeLabel = "Close",
}: CustomTextEditorProps) => {
  const [value, setValue] = useState(initialValue || "");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    if (stopEditing) {
      setValue(initialValue || "");
      stopEditing(false);
    }
  };

  const handleSave = () => {
    if (stopEditing) {
      stopEditing(true);
    }
  };

  const handleClear = () => {
    setValue("");
    onValueChange(null);
  };

  const handleInputChange = (newValue: string) => {
    setValue(newValue);
    onValueChange(newValue === "" ? null : newValue);
  };

  const openFullSizeEditor = () => {
    setModalOpen(true);
  };

  const maxCharacters = 120;

  return (
    <Formik
      initialValues={{ value }}
      onSubmit={async (values, { setSubmitting }) => {
        console.log("CustomTextEditor Formik value:", values);
        handleSave();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, errors, touched, values, setFieldValue }) => (
        <Form>
          <div className="CustomTextEditor">
            <div className="CustomTextEditor_box">
              <Textfield
                htmlFor="CustomTextEditor"
                id="CustomTextEditor"
                label="CustomTextEditor"
                name="CustomTextEditor"
                type="text"
                value={value}
                onChange={({ target: { value } }) => handleInputChange(value)}
                maxLength={maxCharacters}
              ></Textfield>
              <div className="CustomTextEditor_btns">
                <Button outline icon={<EraserIcon />} onClick={handleClear} />
                <Button
                  outline
                  icon={<FullEditorIcon />}
                  onClick={openFullSizeEditor}
                  type="button"
                />
              </div>
            </div>
            <Paragraph
              size="small"
              label={`${value.length}/${maxCharacters}`}
            />

            <div className="CustomTextEditor_toolbar">
              <Paragraph label="Lorem ipsum text" />
              <div className="CustomTextEditor_btns">
                <Button outline onClick={handleClose}>
                  Close
                </Button>
                <Button theme="primary" type="submit">
                  Save
                </Button>
              </div>
            </div>
          </div>
          <FullsizeTextEditor
            closeLabel={closeLabel}
            isModalOpen={isModalOpen}
            setModalOpen={setModalOpen}
            value={value}
            onChange={(newValue) => {
              setFieldValue("value", newValue);
              handleInputChange(newValue);
            }}
          />
        </Form>
      )}
    </Formik>
  );
};
