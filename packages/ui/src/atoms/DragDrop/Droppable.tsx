"use client";

import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  id: string;
  children?: React.ReactNode;
}

export const Droppable = (props: DroppableProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    color: isOver ? "setYourColor" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="Droppable">
      {typeof props.children === "function"
        ? (props.children as Function)({ isOver })
        : props.children}
    </div>
  );
};
