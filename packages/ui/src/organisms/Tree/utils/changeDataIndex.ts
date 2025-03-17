import { NodeProps } from "../NodeProps";
import { DragDirection } from "../Tree.enums";
import { arrayMoveImmutable } from "./arrayMove";

const updateNodesOfParent = <TNodeIdField extends string>(
  parentId: string | null,
  nodesInNewOrder: NodeProps<TNodeIdField>[],
  data: NodeProps<TNodeIdField>[],
) => {
  const nodesWithoutFromParent = data.filter(
    (node) => node.parentId !== parentId,
  );
  return [...nodesWithoutFromParent, ...nodesInNewOrder];
};

interface ChangeDataIndexOptions<TNodeIdField extends string> {
  oldParentId: string | null;
  newParentId: string | null;
  oldIndex: number;
  newIndex: number;
  movedNodeId: string | null;
  data: NodeProps<TNodeIdField>[];
  nodeIdField: TNodeIdField;
}

export const changeDataIndex = <TNodeIdField extends string>({
  oldParentId,
  newParentId,
  oldIndex,
  newIndex,
  movedNodeId,
  data,
  nodeIdField,
}: ChangeDataIndexOptions<TNodeIdField>): NodeProps<TNodeIdField>[] => {
  let updatedData = [...data];

  const direction =
    oldParentId === newParentId
      ? DragDirection.VERTICAL
      : DragDirection.HORIZONTAL;
  const nodesOfOldParent = updatedData.filter(
    (node) => node.parentId === oldParentId,
  );

  if (direction === DragDirection.VERTICAL) {
    const nodesInNewOrder = arrayMoveImmutable(
      nodesOfOldParent,
      oldIndex,
      newIndex,
    );
    updatedData = updateNodesOfParent(
      oldParentId,
      nodesInNewOrder,
      updatedData,
    );
  } else {
    const movedNode = updatedData.find(
      (node) => node[nodeIdField] === movedNodeId,
    );
    if (!movedNode) return updatedData;

    // Update old parent:
    const nodesOfOldParentWithoutMovedNode = nodesOfOldParent.filter(
      (node) => node[nodeIdField] !== movedNodeId,
    );
    updatedData = updateNodesOfParent(
      oldParentId,
      nodesOfOldParentWithoutMovedNode,
      updatedData,
    );

    // Update new parent:
    movedNode.parentId = newParentId;
    const nodesOfNewParentWithoutMovedNode = updatedData.filter(
      (node) => node.parentId === newParentId,
    );
    const nodesOfNewParent = arrayMoveImmutable(
      [movedNode, ...nodesOfNewParentWithoutMovedNode],
      0,
      newIndex,
    );
    updatedData = updateNodesOfParent(
      newParentId,
      nodesOfNewParent,
      updatedData,
    );
  }

  return updatedData;
};
