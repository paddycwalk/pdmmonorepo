"use client";

import clsx from "clsx";
import "./List.scss";
import { ListItem } from "./elements/ListItem";

export interface ListProps {
  children: React.ReactNode;
}

export const List = ({ children }: ListProps) => {
  return <ul className={clsx("List")}>{children}</ul>;
};

List.Item = ListItem;
