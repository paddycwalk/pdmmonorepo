"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Icon } from "../Icon/Icon";
import { DragdropIcon } from "../../..";
import { UniqueIdentifier } from "@dnd-kit/core";

export interface SortableItemProps {
  id: UniqueIdentifier;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const SortableItem = ({ id, children, onClick }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging && onClick) {
      onClick(event);
    }
  };

  return (
    <div ref={setNodeRef} style={style} className="SortableItem">
      <span
        {...listeners}
        {...attributes}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        className={`DragHandle ${isDragging ? "is-dragging" : ""}`}
      >
        <Icon svg={<DragdropIcon />} />
      </span>

      <div onClick={handleClick}>{children}</div>
    </div>
  );
};
