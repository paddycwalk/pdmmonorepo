/* eslint-disable react/prop-types */
"use client";

import "./Grid.scss";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  CellClassFunc,
  CellClickedEvent,
  ColDef,
  GetLocaleTextParams,
  ICellRendererParams,
  ModuleRegistry,
  RowDoubleClickedEvent,
  SelectionChangedEvent,
  ValueFormatterParams,
} from "ag-grid-community";
import StatusBar from "./elements/StatusBar/StatusBar";
import { AllEnterpriseModule, ColGroupDef } from "ag-grid-enterprise";
import AGGridLicense from "./AGGridLicense";
import React, { ReactElement, ReactNode, useMemo } from "react";
import { LoadingSpinner } from "../../atoms/LoadingSpinner/LoadingSpinner";
import { DragdropIcon, Icon } from "../../..";
import ReactDOMServer from "react-dom/server";

ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);
AGGridLicense();

export interface GridProps {
  rowData: unknown[];
  children?: ReactNode;
  onSelectionChanged?: (event: SelectionChangedEvent) => void;
  singleClickEdit?: boolean;
  height?: number;
  onCellValueChanged?: (event: { newValue: any }) => void;
  onRowDoubleClicked?: (event: RowDoubleClickedEvent) => void;
  suppressCellSelection?: boolean;
  columnDefinitions?: (ColDef<any, any> | ColGroupDef<any>)[];
  labelFunction: (key: string, defaultValue: string) => string;
  localeText?: any;
  getLocaleText?: (params: GetLocaleTextParams) => string;
}

export interface GridColumnProps {
  field: string;
  editable?: boolean;
  width?: number;
  sortable?: boolean;
  resizable?: boolean;
  rowDrag?: boolean;
  suppressHeaderMenuButton?: boolean;
  cellRenderer?: unknown;
  cellRendererParams?: ICellRendererParams;
  cellEditor?: unknown;
  cellEditorPopup?: boolean;
  cellEditorPopupPosition?: "over" | "under";
  cellEditorParams?: unknown;
  cellStyle?: any;
  cellClass?: string | CellClassFunc<any, any>;
  onCellValueChanged?: (event: { newValue: any }) => void;
  suppressSizeToFit?: boolean;
  autoHeight?: boolean;
  valueFormatter?: ((params: ValueFormatterParams) => string) | string;
  valueSetter?: (params: { newValue: any }) => boolean;
  hide?: boolean;
  headerName?: string;
  autoHeaderHeight?: boolean;
  wrapText?: boolean;
  onCellClicked?: (event: CellClickedEvent) => void;
  singleClickEdit?: boolean;
  rowGroup?: boolean;
  pinned?: "left" | "right";
}

const GridColumn = (_: GridColumnProps) => null;

export const Grid = ({
  rowData,
  children,
  onSelectionChanged,
  singleClickEdit = false,
  height,
  onCellValueChanged,
  onRowDoubleClicked,
  suppressCellSelection = false,
  columnDefinitions,
  localeText,
  getLocaleText,
}: GridProps) => {
  const columnDefs = useMemo<ColDef[] | ColGroupDef[]>(() => {
    console.log("children", children);
    console.log("columnDefinitions", columnDefinitions);
    if (children) {
      return React.Children.toArray(children)
        .filter(
          (child): child is ReactElement<GridColumnProps> =>
            React.isValidElement(child) && child.type === GridColumn,
        )
        .map(({ props }) => {
          const {
            field,
            editable = false,
            width,
            sortable = false,
            resizable = false,
            rowDrag = false,
            suppressHeaderMenuButton = true,
            cellRenderer,
            cellRendererParams,
            cellEditor,
            cellEditorPopup,
            cellEditorPopupPosition = "under",
            cellEditorParams,
            cellStyle,
            cellClass,
            onCellValueChanged,
            suppressSizeToFit,
            autoHeight,
            valueFormatter,
            valueSetter,
            hide,
            headerName,
            autoHeaderHeight,
            wrapText,
            onCellClicked,
            singleClickEdit,
            rowGroup,
            pinned,
          } = props;

          const colDef: ColDef = {
            field,
            editable,
            width,
            sortable,
            resizable,
            rowDrag,
            suppressHeaderMenuButton,
            cellRenderer,
            cellRendererParams,
            cellEditor,
            cellEditorPopup,
            cellEditorPopupPosition,
            cellEditorParams,
            cellStyle,
            cellClass,
            onCellValueChanged,
            flex: width ? undefined : 1,
            suppressSizeToFit,
            autoHeight,
            valueFormatter,
            valueSetter,
            hide,
            headerName,
            autoHeaderHeight,
            wrapHeaderText: autoHeaderHeight ? true : undefined,
            wrapText,
            onCellClicked,
            singleClickEdit,
            rowGroup,
            pinned,
          };

          return colDef;
        });
    } else if (columnDefinitions) {
      console.log("return column Definitions");
      return columnDefinitions;
    } else {
      return [];
    }
  }, [children, columnDefinitions]);

  console.log("render grid", columnDefs);

  return (
    <div className="Grid" style={{ height: `${height}px` }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onSelectionChanged={onSelectionChanged}
        onRowDoubleClicked={onRowDoubleClicked}
        singleClickEdit={singleClickEdit}
        suppressMovableColumns
        rowHeight={50}
        headerHeight={50}
        statusBar={StatusBar}
        suppressContextMenu
        suppressCellFocus={suppressCellSelection}
        domLayout={height ? undefined : "autoHeight"}
        suppressScrollOnNewData
        localeText={localeText}
        getLocaleText={getLocaleText}
        loadingOverlayComponent={LoadingSpinner}
        enableCellTextSelection
        // onGridReady={(params) => console.log("Grid ready", params)}
        rowDragManaged
        // onRowDragEnter={(params) => console.log("Row drag enter", params)}
        // onRowDragMove={(params) => console.log("Row drag move", params)}
        // onRowDragEnd={(params) => console.log("Row drag end", params)}
        // onRowDataUpdated={(params) => console.log("Row data updated", params)}
        // onViewportChanged={(params) => console.log("Viewport changed", params)}
        onCellValueChanged={onCellValueChanged}
        groupDefaultExpanded={-1}
        groupDisplayType="groupRows"
        groupRowRendererParams={(params: any) => {
          console.log("Group row renderer params", params);
        }}
        gridOptions={{
          icons: {
            rowDrag: ReactDOMServer.renderToStaticMarkup(
              <Icon svg={<DragdropIcon />}></Icon>,
            ),
          },
        }}
      />
    </div>
  );
};

Grid.Column = GridColumn;
