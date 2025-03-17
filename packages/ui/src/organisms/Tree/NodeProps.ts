export type NodeProps<TNodeIdField extends string> = {
  [nodeIdField in TNodeIdField]: string;
} & {
  parentId: string | null;
  displayText: string;
  overrideStyle?: string;
};
