import { GridOptions } from "ag-grid-community";

const StatusBar: GridOptions["statusBar"] = {
  statusPanels: [
    {
      statusPanel: "agTotalAndFilteredRowCountComponent",
      align: "left",
    },
    { statusPanel: "agSelectedRowCountComponent", align: "left" },
  ],
};

export default StatusBar;
