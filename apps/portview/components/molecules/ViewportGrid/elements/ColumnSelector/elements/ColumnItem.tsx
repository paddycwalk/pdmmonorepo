"use client";

import React from "react";
import { ViewportGridColumn } from "../../../types/viewportGrid.types";
import { useSortable } from "@dnd-kit/sortable";
import { useLabels } from "../../../../../../hooks/useLabels";
import { getColumnNameKey } from "../../../functions/viewportGrid.function";
import { CSS } from "@dnd-kit/utilities";

import "./ColumnItem.scss";

export interface ColumnItemProps {
  column: ViewportGridColumn;
}

const ColumnItem: React.FC<ColumnItemProps> = ({ column }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: column.key,
    });
  const label = useLabels();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <p
      className={"ColumnItem"}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {label(getColumnNameKey(column.key), column.key)}
    </p>
  );
};

export default ColumnItem;
