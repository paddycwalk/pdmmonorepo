import { ReactNode } from "react";
import { NodeProps } from "../NodeProps";

export interface ContextMenuEntry<TNodeIdField extends string> {
  key?: string;
  text: string;
  submenu?: ContextMenuEntry<any>[];
  icon?: ReactNode;
  action?: (node: NodeProps<any>) => void;
  visible?: boolean;
}
