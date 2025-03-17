"use client";

import { useState, useEffect } from "react";
import { Panel } from "../../../../molecules/Panel/Panel";
import { Modal } from "../../../Modal/Modal";
import { Grid } from "../../Grid";
import "./TableEditor.scss";
import { ICellEditorParams } from "ag-grid-enterprise";

export interface TableEditorProps extends ICellEditorParams {
  title?: string;
  rowData: unknown[];
  columns: { field: string; headerName: string }[];
  closeLabel: string;
  labelFunction: (key: string, defaultValue: string) => string;
}

export const TableEditor = (props: TableEditorProps) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (!isModalOpen) {
      props.stopEditing();
    }
  }, [isModalOpen, props]);

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Modal
      title={props.colDef.headerName}
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      closeLabel={props.closeLabel}
    >
      {props.title && <h1>{props.title}</h1>}
      <Panel>
        <Grid rowData={props.rowData} labelFunction={props.labelFunction}>
          {props.columns.map((col) => (
            <Grid.Column key={col.field} field={col.field} />
          ))}
        </Grid>
      </Panel>
    </Modal>
  );
};
