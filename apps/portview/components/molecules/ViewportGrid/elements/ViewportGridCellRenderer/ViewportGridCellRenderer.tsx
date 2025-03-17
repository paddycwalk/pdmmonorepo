import React from "react";
import { CheckIcon, Icon } from "@repo/ui";
import { ICellRendererParams } from "ag-grid-enterprise";

export interface ViewportGridCellRendererProps extends ICellRendererParams {
  type: "Check" | "Text";
}

const ViewportGridCellRenderer: React.FC<ViewportGridCellRendererProps> = ({
  value,
  valueFormatted,
  type,
}: ViewportGridCellRendererProps) => {
  if (type === "Check") {
    if (value && (value === true || value === "+")) {
      return (
        <div className={"Grid_GridCell GridCell"}>
          <Icon svg={<CheckIcon />} />
        </div>
      );
    } else {
      return <div className={"Grid_GridCell GridCell"}></div>;
    }
  }

  return (
    <div className={"Grid_GridCell GridCell ViewportGrid_cellRenderer"}>
      {valueFormatted}
    </div>
  );
};

export default ViewportGridCellRenderer;
