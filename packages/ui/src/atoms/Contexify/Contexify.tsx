"use client";

import "react-contexify/ReactContexify.css";
import "./Contexify.scss";

import React, { ReactNode, useCallback } from "react";
import { useContextMenu, Menu, Item } from "react-contexify";
import clsx from "clsx";
import { ContextMenuEntry } from "../../organisms/Tree/elements/ContextMenuEntry";
import { NodeProps } from "../../organisms/Tree/NodeProps";

interface ContextMenuProps {
  menuId: string;
  menuItems?: {
    key?: string;
    text: string;
    submenu?: ContextMenuEntry<any>[];
    icon?: ReactNode;
    action?: (node: NodeProps<any>) => void;
    visible?: boolean;
  }[];
  customComponent?: React.ReactNode;
  children: React.ReactNode;
  clickType?: "right" | "left";
  defaultClass?: boolean;
}

export const Contexify: React.FC<ContextMenuProps> = ({
  menuId,
  menuItems = [],
  customComponent,
  children,
  clickType,
  defaultClass,
}) => {
  const { show } = useContextMenu({ id: menuId });

  const displayMenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      show({ event: e });
    },
    [show],
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (clickType === "left" && e.button === 0) {
      displayMenu(e);
    } else if (clickType === "right" && e.button === 2) {
      displayMenu(e);
    }
  };

  // console.log("menuItems", menuItems);

  return (
    <div
      onClick={handleClick}
      onContextMenu={handleClick}
      className={clsx("Contexify", {
        "Contexify-default": defaultClass,
      })}
    >
      {children}
      {customComponent && (
        <Menu
          id={menuId}
          disableBoundariesCheck={false}
          className="Contexify_menu"
        >
          <Item closeOnClick={false} className="Contexify_item">
            {customComponent}
          </Item>
        </Menu>
      )}
      {menuItems.length > 0 && (
        <Menu id={menuId} key={menuId} className="Contexify_menu">
          {menuItems?.map((item, index) => (
            <Item
              className="Contexify_item"
              key={item.key || `${item.text}-${index}`}
              id={item.key}
              onClick={({ props }) => item.action && item.action(props)}
            >
              {item.text}
            </Item>
          ))}
        </Menu>
      )}
    </div>
  );
};
