"use client";

import "./BooleanEditor.scss";
import { Checkbox } from "../../../../atoms/Checkbox/Checkbox";
import { useEffect } from "react";
import { ICellEditorParams } from "ag-grid-enterprise";
import { Formik, Field, Form } from "formik";

interface BooleanEditorProps extends ICellEditorParams {}

export const BooleanEditor = (props: BooleanEditorProps) => {
  const initialValues = { checked: !!props.value };

  useEffect(() => {
    initialValues.checked = !!props.value;
  }, [props.value]);

  return (
    <div className="BooleanEditor">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          props.api.stopEditing();
          console.log("BooleanEditor Formik value:", values);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <Field name="checked">
              {({ field, form }: any) => (
                <Checkbox
                  id={`Checkbox-${props.node.id}`}
                  checked={field.value}
                  onChange={(checked: boolean) => {
                    setFieldValue("checked", checked);
                    form.submitForm();
                  }}
                />
              )}
            </Field>
          </Form>
        )}
      </Formik>
    </div>
  );
};
