// code comes from old kit-components

"use client";
import "./Tree.scss";

import React, { useEffect, useRef, useState } from "react";
import { useUpdateEffect } from "react-use";
import scrollIntoView from "scroll-into-view-if-needed";
import { ContextMenuEntry } from "./elements/ContextMenuEntry";
import TreeBranch from "./elements/TreeBranch";
import TreeNode from "./elements/TreeNode";
import { NodeProps } from "./NodeProps";
import {
  DragDirection,
  TreeDragDropMode,
  TreeSelectionMode,
} from "./Tree.enums";
import { changeDataIndex } from "./utils/changeDataIndex";
import { Control, ControlProps } from "../../atoms/Control/Control";
import { DndContext } from "@dnd-kit/core";
import { SortableItem } from "../../..";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

// The Droppable components expects a string as the droppableId prop.
// The root branch does not have an id.
// Therefore we are using this string to identify this branch.
const NO_PARENT = "NoParent";

export interface TreeProps<TNodeIdField extends string> {
  data: NodeProps<TNodeIdField>[];
  initiallyActive?: NodeProps<TNodeIdField>[];
  onNodeClick?: (node: NodeProps<TNodeIdField>) => void;
  onRenderContextMenu?: (
    node: NodeProps<TNodeIdField>,
    contextFunction?: ContextMenuEntry<TNodeIdField>[],
    treeData?: NodeProps<TNodeIdField>[],
  ) => void;
  maxHeight?: string | number;
  treeControls?: (
    node: NodeProps<TNodeIdField>,
  ) => React.ReactElement<ControlProps>[];
  treeControlsLeft?: (
    node: NodeProps<TNodeIdField>,
  ) => React.ReactElement<ControlProps>[];
  branchControls?: {
    [index: number]: (
      node: NodeProps<TNodeIdField>,
    ) => React.ReactElement<ControlProps>[];
  };
  leafControls?: {
    [nodeId: string]: (
      node: NodeProps<TNodeIdField>,
    ) => React.ReactElement<ControlProps>[];
  };
  selectionMode?: TreeSelectionMode;
  selectionReturnsPath?: boolean;
  rootNode?: NodeProps<TNodeIdField>;
  suppressContextMenu?: ((node: NodeProps<TNodeIdField>) => boolean) | boolean;
  dragDropMode?: TreeDragDropMode;
  dragDropDisabledInBranch?: (branchData: NodeProps<TNodeIdField>[]) => boolean;
  onDragDropChange?: (
    newData: NodeProps<TNodeIdField>[],
    movedNodeId: string,
    oldIndex: string,
    newIndex: string,
  ) => void;
  contextFunctions?: ContextMenuEntry<TNodeIdField>[];
  returnSelected?: (
    selected: NodeProps<TNodeIdField> | NodeProps<TNodeIdField>[],
  ) => void;
  nodeIdField: TNodeIdField;
}

export const Tree = <TNodeIdField extends string = "id">({
  data,
  initiallyActive,
  onNodeClick,
  onRenderContextMenu,
  maxHeight = "none",
  treeControls,
  treeControlsLeft,
  branchControls,
  leafControls,
  selectionMode = TreeSelectionMode.SINGLE,
  selectionReturnsPath = false,
  rootNode,
  suppressContextMenu = true,
  dragDropMode = TreeDragDropMode.NONE,
  dragDropDisabledInBranch = () => TreeDragDropMode.NONE === dragDropMode,
  onDragDropChange,
  contextFunctions,
  returnSelected,
  nodeIdField,
}: TreeProps<TNodeIdField>): React.ReactElement => {
  const [activeNodes, setActiveNodes] = useState<NodeProps<TNodeIdField>[]>(
    initiallyActive ?? [],
  );
  const [checkedNodes, setCheckedNodes] = useState<NodeProps<TNodeIdField>[]>(
    initiallyActive ?? [],
  );

  const treeContainerRef = useRef<HTMLDivElement>(null);
  const lastBranchRef = useRef<HTMLDivElement>(null);

  useUpdateEffect((): void => {
    if (selectionMode === TreeSelectionMode.MULTIPLE) {
      returnSelected?.(checkedNodes);
    } else {
      returnSelected?.(
        selectionReturnsPath
          ? activeNodes
          : (activeNodes[activeNodes.length - 1] ?? []),
      );
    }
  }, [
    selectionMode,
    returnSelected,
    checkedNodes,
    selectionReturnsPath,
    activeNodes,
  ]);

  useUpdateEffect((): void => {
    if (initiallyActive) {
      setActiveNodes(initiallyActive);
    }
  }, [initiallyActive]);

  const rootId: string | null = rootNode?.[nodeIdField] ?? null;
  const branchIds = [
    rootId,
    ...activeNodes.map((activeNode) => activeNode[nodeIdField]),
  ];
  const treeData = branchIds
    .map((branchId) => data.filter((node) => node.parentId === branchId))
    .filter((branchNodes) => branchNodes.length > 0);

  // console.log("treeData", treeData);

  const handleNodeClick = (
    clickedNode: NodeProps<TNodeIdField>,
    branchIndex: number,
  ): void => {
    console.log("clickedNode", clickedNode);

    const activeNodesInPreviousBranches = activeNodes.slice(0, branchIndex);
    const isClickedNodeActive = activeNodes.some(
      (activeNode): boolean =>
        activeNode[nodeIdField] === clickedNode[nodeIdField],
    );

    if (isClickedNodeActive) {
      setActiveNodes(activeNodesInPreviousBranches);
    } else {
      setActiveNodes([...activeNodesInPreviousBranches, clickedNode]);
    }

    onNodeClick?.(clickedNode);
    // setTimeout(() => lastBranchRef.current?.scrollIntoView({ behavior: 'smooth' }));
  };

  useEffect(() => {
    if (treeContainerRef.current && lastBranchRef.current) {
      scrollIntoView(lastBranchRef.current, {
        scrollMode: "if-needed",
        block: "nearest",
        inline: "nearest",
        behavior: "smooth",
        boundary: treeContainerRef.current,
      });
    }
  }, [activeNodes]);

  const checkIsAncestor = (
    nodeId: string | null,
    potentialAncestorId: string | null,
  ): boolean => {
    const node = data.find((node) => node[nodeIdField] === nodeId);
    if (!node) return false;

    if (node.parentId === potentialAncestorId) {
      return true;
    }

    return checkIsAncestor(node.parentId, potentialAncestorId);
  };

  const onDragEnd = (droppedNode: any): boolean => {
    console.log("onDragEnd droppedNode", droppedNode);

    const { source, destination } = droppedNode;

    if (!destination) return false;

    const oldParentId =
      source.droppableId === NO_PARENT ? null : source.droppableId;
    const newParentId =
      destination.droppableId === NO_PARENT ? null : destination.droppableId;
    const nodeId =
      droppedNode.draggableId === NO_PARENT ? null : droppedNode.draggableId;
    const oldIndex = source.index;
    const newIndex = destination.index;

    const direction =
      oldParentId === newParentId
        ? DragDirection.VERTICAL
        : DragDirection.HORIZONTAL;

    const isMovementForbidden =
      (dragDropMode === TreeDragDropMode.VERTICAL &&
        direction === DragDirection.HORIZONTAL) ||
      (dragDropMode === TreeDragDropMode.HORIZONTAL &&
        direction === DragDirection.VERTICAL);
    const isPositionUnchanged =
      oldParentId === newParentId && oldIndex === newIndex;
    const isNodeMovedIntoItself = newParentId === nodeId;
    const isNodeAncestorOfNewParent = checkIsAncestor(newParentId, nodeId);

    if (
      isMovementForbidden ||
      isPositionUnchanged ||
      isNodeMovedIntoItself ||
      isNodeAncestorOfNewParent
    ) {
      return false;
    }

    const updatedData = changeDataIndex({
      oldParentId,
      newParentId,
      oldIndex,
      newIndex,
      movedNodeId: nodeId,
      data,
      nodeIdField,
    });
    onDragDropChange?.(
      updatedData,
      droppedNode.draggableId,
      oldIndex.toString(),
      newIndex.toString(),
    );
    console.log("updatedData", updatedData);

    return true;
  };

  return (
    <div className="Tree">
      <div className="Tree_scroll-container">
        <div className="Tree_main" ref={treeContainerRef}>
          <DndContext
            onDragEnd={onDragEnd}
            // onDragStart={onDragStart}
            // onDragOver={onDragOver}
            // sensors={sensors}
            // collisionDetection={collisionDetectionStrategy}
          >
            <SortableContext
              items={treeData.flatMap((branch) =>
                branch.map((node) => node[nodeIdField]),
              )}
              strategy={verticalListSortingStrategy}
            >
              {treeData
                .filter((branch) => branch.length > 0)
                .map((branch, branchIndex) => {
                  const isLastBranch = branchIndex === treeData.length - 1;
                  const branchId = branch[0]?.parentId ?? NO_PARENT;

                  const isDragDropDisabled =
                    dragDropMode === TreeDragDropMode.NONE ||
                    dragDropDisabledInBranch(branch);

                  return (
                    <div
                      key={branchId}
                      ref={isLastBranch ? lastBranchRef : null}
                    >
                      <TreeBranch maxHeight={maxHeight}>
                        {branch.map((node, nodeIndex) => {
                          const treeControlElements =
                            treeControls?.(node) ?? [];
                          const treeControlElementsLeft =
                            treeControlsLeft?.(node) ?? [];
                          const branchControlElements =
                            branchControls?.[nodeIndex]?.(node) ?? [];
                          const leaveControlElements =
                            leafControls?.[node[nodeIdField]]?.(node) ?? [];
                          const suppressContext =
                            typeof suppressContextMenu === "function"
                              ? suppressContextMenu(node)
                              : suppressContextMenu;

                          const isNodeChecked = checkedNodes.some(
                            (checkedNode) =>
                              checkedNode[nodeIdField] === node[nodeIdField],
                          );

                          const handleCheckboxClick = () => {
                            setCheckedNodes(
                              isNodeChecked
                                ? checkedNodes.filter(
                                    (checkedNode) =>
                                      checkedNode[nodeIdField] !==
                                      node[nodeIdField],
                                  )
                                : [...checkedNodes, node],
                            );
                          };

                          return (
                            <SortableItem
                              key={node[nodeIdField]}
                              id={node[nodeIdField]}
                              onClick={() => handleNodeClick(node, branchIndex)}
                            >
                              <TreeNode
                                key={node[nodeIdField]}
                                node={node}
                                selectionMode={selectionMode}
                                setCheckedNodes={setCheckedNodes}
                                active={activeNodes.some(
                                  (activeNode): boolean =>
                                    activeNode[nodeIdField] ===
                                    node[nodeIdField],
                                )}
                                onClick={(): void =>
                                  handleNodeClick(node, branchIndex)
                                }
                                onRenderContextMenu={(
                                  node: NodeProps<TNodeIdField>,
                                  contextFunctions?: ContextMenuEntry<TNodeIdField>[],
                                ) =>
                                  onRenderContextMenu?.(
                                    node,
                                    contextFunctions,
                                    data,
                                  )
                                }
                                controls={[
                                  ...treeControlElements,
                                  ...branchControlElements,
                                  ...leaveControlElements,
                                ]}
                                controlsLeft={treeControlElementsLeft}
                                contextMenuId={node[nodeIdField]}
                                contextFunctions={contextFunctions}
                                onCheckboxClick={handleCheckboxClick}
                                checked={isNodeChecked}
                              />
                            </SortableItem>
                          );
                        })}
                      </TreeBranch>
                    </div>
                  );
                })}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

Tree.Control = Control;

export default Tree;
