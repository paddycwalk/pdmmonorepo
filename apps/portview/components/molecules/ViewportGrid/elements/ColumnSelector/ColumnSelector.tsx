"use client";

import { useQuery } from "@apollo/client";

import React, { useEffect, useState } from "react";
import { GET_GRID_COLUMNS } from "../../queries/viewportGrid.query";
import {
  ViewportGridColumn,
  ViewportProductMasterColsResult,
} from "../../types/viewportGrid.types";
import { Button, LoadingSpinner, Modal } from "@repo/ui";
import { useLabels } from "../../../../../hooks/useLabels";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import ColumnContainer from "./elements/ColumnContainer";
import type { DragEndEvent } from "@dnd-kit/core/dist/types";

import "./ColumnSelector.scss";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import ColumnItem from "./elements/ColumnItem";

export interface ColumnSelectorProps {
  selectedColumns: ViewportGridColumn[] | undefined;
  defaultColumns: ViewportGridColumn[];
  applyColumnSelection: (selectedColumns: ViewportGridColumn[]) => void;
}

function moveAndSortColumns(
  sourceId: string,
  shownCols: string,
  destinationId: string,
  newIndex: number,
  editedColumns: ViewportGridColumn[],
  oldIndex: number,
  setEditedColumns: (
    value:
      | ((prevState: ViewportGridColumn[]) => ViewportGridColumn[])
      | ViewportGridColumn[],
  ) => void,
  allCols: string,
  viewportProductMasterCols: ViewportGridColumn[] | undefined,
  draggableId: string | number,
  allColumns: ViewportGridColumn[],
  setAllColumns: (
    value:
      | ((prevState: ViewportGridColumn[]) => ViewportGridColumn[])
      | ViewportGridColumn[],
  ) => void,
) {
  // //wenn droppableId von source und destination gleich ist und die droppableId === shownCols ist dann sortiere die editedColumns entsprechend der neuen reihenfolge
  if (
    sourceId === shownCols &&
    destinationId === shownCols &&
    newIndex !== undefined
  ) {
    const newEditedColumns: ViewportGridColumn[] = [...editedColumns];
    const [removed] = newEditedColumns.splice(oldIndex, 1);
    if (removed) {
      newEditedColumns.splice(newIndex, 0, removed);
      setEditedColumns(newEditedColumns);
    }
  }
  //wenn droppableId von source shownCols ist verschiebe die Column aus editedColumns in allColumns und sortiere dort entsprechend der neuen reihenfolge
  else if (
    sourceId === shownCols &&
    destinationId === allCols &&
    newIndex !== undefined
  ) {
    const column = viewportProductMasterCols?.find(
      (col) => col.key === draggableId,
    );
    if (column) {
      const newAllColumns = [...allColumns];
      newAllColumns.push(column);
      setAllColumns(newAllColumns);
      const newEditedColumns = editedColumns.filter(
        (col) => col.key !== draggableId,
      );
      setEditedColumns(newEditedColumns);
    }
  }
  //wenn droppableId von source allCols ist verschiebe die Column aus allColumns in editedColumns und sortiere dort entsprechend der neuen reihenfolge
  else if (
    sourceId === allCols &&
    destinationId === shownCols &&
    newIndex !== undefined
  ) {
    const column = viewportProductMasterCols?.find(
      (col) => col.key === draggableId,
    );
    if (column) {
      const newEditedColumns = [...editedColumns];
      newEditedColumns.splice(newIndex, 0, column);
      setEditedColumns(newEditedColumns);
      const newAllColumns = allColumns.filter((col) => col.key !== draggableId);
      setAllColumns(newAllColumns);
    }
  }
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({
  selectedColumns,
  defaultColumns,
  applyColumnSelection,
}) => {
  const allCols = "allCols";
  const shownCols = "shownCols";
  const label = useLabels();
  const [openColumnSelect, setOpenColumnSelect] = useState(false);
  const [editedColumns, setEditedColumns] = useState<ViewportGridColumn[]>(
    selectedColumns ? selectedColumns : [],
  );
  const [allColumns, setAllColumns] = useState<ViewportGridColumn[]>([]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeColumn, setActiveColumn] = useState<ViewportGridColumn | null>(
    null,
  );

  const { data, loading } = useQuery<ViewportProductMasterColsResult>(
    GET_GRID_COLUMNS,
    {},
  );

  useEffect(() => {
    if (data) {
      const allCols = data.viewportProductMasterCols.filter(
        (col) =>
          !editedColumns.find((selectedCol) => col.key === selectedCol.key) &&
          !defaultColumns.find((selectedCol) => col.key === selectedCol.key),
      );
      setAllColumns(allCols);
    }
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragEnd = (droppedColumn: DragEndEvent): boolean => {
    const { active, over } = droppedColumn;
    const { id: draggableId } = active;
    const { containerId: sourceId, index: oldIndex } =
      active.data.current?.sortable;

    let destinationId: string = "";
    let newIndex: number = 0;
    if (over != null) {
      if (over.data && over.data.current) {
        destinationId = over.data.current?.sortable.containerId;
        newIndex = over.data.current?.sortable.index;
      } else {
        destinationId = over.id.toString();
      }
    }

    moveAndSortColumns(
      sourceId,
      shownCols,
      destinationId,
      newIndex,
      editedColumns,
      oldIndex,
      setEditedColumns,
      allCols,
      data?.viewportProductMasterCols,
      draggableId,
      allColumns,
      setAllColumns,
    );
    return true;
  };

  return (
    <>
      <div className={"ColumnSelector"}>
        <Button theme={"primary"} onClick={() => setOpenColumnSelect(true)}>
          {label("organisms.ColumnSelector.button", "##Spalten bearbeiten")}
        </Button>
      </div>
      <Modal
        isOpen={openColumnSelect}
        onClose={() => setOpenColumnSelect(false)}
        closeLabel={label("common.abort", "##Schließen")}
        title={label(
          "organisms.ColumnSelector.modal.headline",
          "##Spalten auswählen",
        )}
        onApplyLabel={label("common.save", "##Speichern")}
        onApply={() => {
          applyColumnSelection(editedColumns);
          setOpenColumnSelect(false);
        }}
      >
        {loading ? (
          <>
            <LoadingSpinner />
          </>
        ) : (
          <div className={"ColumnSelector_Modal_main"}>
            <div className={"ColumnSelector_Modal_header"}>
              <h4>
                {label("organisms.ColumnSelector.allCols", "##All Columns")}
              </h4>
              <h4>
                {label(
                  "organisms.ColumnSelector.selectedCols",
                  "##Selected Columns",
                )}
              </h4>
            </div>
            <div className={"ColumnSelector_Modal_content"}>
              <DndContext
                onDragEnd={onDragEnd}
                onDragStart={({ active }) => {
                  setActiveId(active.id);
                  const containerId = active.data.current?.sortable.containerId;

                  if (allCols === containerId) {
                    setActiveColumn(
                      allColumns.find((col) => col.key === active.id) || null,
                    );
                  } else {
                    setActiveColumn(
                      editedColumns.find((col) => col.key === active.id) ||
                        null,
                    );
                  }
                }}
                onDragOver={({
                  active,
                  over,
                  delta,
                  collisions,
                  activatorEvent,
                }) => {
                  const { containerId: sourceId } =
                    active.data.current?.sortable;

                  let destinationId: string | undefined;

                  if (over != null) {
                    destinationId = over.data.current?.sortable.containerId;
                  }

                  if (
                    !sourceId ||
                    !destinationId ||
                    destinationId === "" ||
                    sourceId === destinationId
                  ) {
                    return;
                  }

                  let overIndex;
                  let activeIndex;
                  let overItemsLength;

                  if (allCols === destinationId) {
                    overIndex = allColumns.findIndex((col, index) => {
                      return col.key === over?.id;
                    });
                    activeIndex = editedColumns.findIndex((col, index) => {});
                    overItemsLength = allColumns.length;
                  } else {
                    overIndex = editedColumns.findIndex((col, index) => {
                      return col.key === over?.id;
                    });
                    activeIndex = allColumns.findIndex((col, index) => {});
                    overItemsLength = editedColumns.length;
                  }

                  const isBelowOverItem =
                    over &&
                    overIndex === overItemsLength - 1 &&
                    active.rect.current.translated &&
                    active.rect.current.translated.top >
                      over.rect.top + over.rect.height;
                  const modifier = isBelowOverItem ? 1 : 0;

                  const newIndex =
                    overIndex >= 0 ? overIndex + modifier : overItemsLength + 1;

                  moveAndSortColumns(
                    sourceId,
                    shownCols,
                    destinationId,
                    newIndex,
                    editedColumns,
                    activeIndex,
                    setEditedColumns,
                    allCols,
                    data?.viewportProductMasterCols,
                    active.id,
                    allColumns,
                    setAllColumns,
                  );
                }}
                collisionDetection={closestCorners}
                sensors={sensors}
              >
                <ColumnContainer
                  columns={allColumns}
                  id={allCols}
                  className={"ColumnSelector_Modal_left"}
                />
                <div className={"ColumnSelector_Modal_separator"}></div>
                <ColumnContainer
                  columns={editedColumns}
                  id={shownCols}
                  className={"ColumnSelector_Modal_right"}
                />
                <DragOverlay>
                  {activeColumn ? <ColumnItem column={activeColumn} /> : null}
                </DragOverlay>
              </DndContext>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ColumnSelector;
