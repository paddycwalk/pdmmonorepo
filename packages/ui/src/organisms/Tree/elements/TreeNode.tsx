"use client";

import React from "react";

import { NodeProps } from "../NodeProps";
import { TreeSelectionMode } from "../Tree.enums";
import { ContextMenuEntry } from "./ContextMenuEntry";
import { ControlProps } from "../../../atoms/Control/Control";
import { Contexify } from "../../../atoms/Contexify/Contexify";

export type TreeNodeProps<TNodeIdField extends string> = {
  onClick?: (node: NodeProps<TNodeIdField>) => void;
  onRenderContextMenu?: (
    node: NodeProps<TNodeIdField>,
    contextFunctions?: ContextMenuEntry<TNodeIdField>[],
  ) => void;
  onCheckboxClick: () => void;
  active: boolean;
  controls?: React.ReactElement<ControlProps>[];
  controlsLeft?: React.ReactElement<ControlProps>[];
  contextMenuId?: string;
  contextFunctions?: ContextMenuEntry<TNodeIdField>[];
  selectionMode: TreeSelectionMode;
  setCheckedNodes: (checkedNodes: NodeProps<TNodeIdField>[]) => void;
  node: NodeProps<TNodeIdField>;
  checked: boolean;
};

const TreeNode = <TNodeIdField extends string>({
  onClick,
  onRenderContextMenu,
  onCheckboxClick,
  active,
  controls,
  controlsLeft,
  selectionMode,
  contextMenuId,
  contextFunctions,
  node: nodeProps,
  checked,
}: TreeNodeProps<TNodeIdField>): React.ReactElement => {
  const hasVisibleNonDividerEntries = (): boolean => {
    if (!contextFunctions || contextFunctions.length === 0) {
      return true;
    }

    return contextFunctions.some(
      (elem) =>
        elem &&
        (elem.visible === undefined || elem.visible === true) &&
        elem.text !== "divider",
    );
  };

  const { displayText } = nodeProps;

  return (
    <Contexify
      menuId={contextMenuId ?? "empty"}
      clickType="right"
      menuItems={contextFunctions}
    >
      <div
        className={`Tree_TreeNode TreeNode
           ${active ? "TreeNode-active" : ""}
           ${nodeProps.overrideStyle ?? ""}`}
      >
        {controlsLeft && controlsLeft.length > 0 && (
          <div className="TreeNode_controls TreeNode_controls-left">
            {controlsLeft}
          </div>
        )}
        <button
          className="TreeNode_display-text"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.(nodeProps);
          }}
        >
          {displayText}
        </button>
        {controls && controls.length > 0 && (
          <div className="TreeNode_controls">{controls}</div>
        )}
      </div>
    </Contexify>
  );
};

export default TreeNode;
