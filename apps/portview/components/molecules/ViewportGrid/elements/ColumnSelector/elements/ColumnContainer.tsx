"use client";

import { ViewportGridColumn } from "../../../types/viewportGrid.types";
import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import ColumnItem from "./ColumnItem";

export interface GridColumnContainerProps {
  id: string;
  className: string;
  columns?: ViewportGridColumn[];
}

const ColumnContainer: React.FC<GridColumnContainerProps> = ({
  id,
  className,
  columns,
}) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext
      id={id}
      items={columns?.map((column) => column.key) || []}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef} className={className}>
        {columns?.map((column) => {
          return (
            <ColumnItem
              key={column.key + "-" + column.fieldName}
              column={column}
            />
          );
        })}
      </div>
    </SortableContext>
  );
};

export default ColumnContainer;
