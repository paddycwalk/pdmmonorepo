import { WatchQueryFetchPolicy } from "@apollo/client/core/watchQueryOptions";
import {
  LazyQueryExecFunction,
  QueryResult,
} from "@apollo/client/react/types/types";
import {
  AutocompleteField,
  AutocompleteGridFilter,
  SuggestionFetchType,
} from "../../PortViewAutocomplete/types/autocomplete.type";
import ViewportGridCellRenderer from "../elements/ViewportGridCellRenderer/ViewportGridCellRenderer";
import {
  SearchInput,
  SearchSuggestion,
  ViewportGridColumn,
  ViewportGridPmVariables,
  ViewportProductMaster,
  ViewportProductMasterResult,
} from "../types/viewportGrid.types";
import { ColDef, ColGroupDef, ValueFormatterParams } from "ag-grid-enterprise";
import ApplicationLocale from "@repo/global-functions/Types/applicationLocale";

const filterUnique = <T>(
  items: T[],
  predicate: (first: T, second: T) => boolean,
): T[] =>
  items.reduce<T[]>(
    (acc, cur) => (!acc.some((x) => predicate(x, cur)) ? [...acc, cur] : acc),
    [],
  );

export const filterProductList = (
  gridSearchFilter: AutocompleteGridFilter[] | undefined,
  productList: ViewportProductMaster[],
  applicationLocale: ApplicationLocale,
  uniquePredicate?: (
    first: ViewportProductMaster,
    second: ViewportProductMaster,
  ) => boolean,
): ViewportProductMaster[] => {
  const filteredProducts: ViewportProductMaster[] = [];
  if (gridSearchFilter && gridSearchFilter.length > 0) {
    filteredProducts.push(
      ...productList.filter((product) =>
        gridSearchFilter.every((filter) =>
          filter.filterFunction(product, filter.filterValue, applicationLocale),
        ),
      ),
    );
  } else {
    filteredProducts.push(...productList);
  }
  if (uniquePredicate) {
    return filterUnique(filteredProducts, uniquePredicate);
  }
  return filteredProducts;
};

export const loadProductMasters = async (
  gridColumns: ViewportGridColumn[],
  csoId: string,
  searchInputs: SearchInput[] | undefined,
  fetchProductMasters: LazyQueryExecFunction<
    ViewportProductMasterResult,
    ViewportGridPmVariables
  >,
  fetchPolicy?: WatchQueryFetchPolicy,
): Promise<
  QueryResult<ViewportProductMasterResult, ViewportGridPmVariables>
> => {
  const cols: ViewportGridColumn[] =
    gridColumns.map((col) => {
      return {
        fieldName: col.fieldName,
        key: col.key,
        displayColumn: col.displayColumn,
      };
    }) || [];
  const variables: ViewportGridPmVariables = {
    csoId: Number(csoId),
    startRowNum: 0,
    endRowNum: 50,
    cols,
  };
  if (searchInputs && searchInputs.length > 0) {
    variables.searchFields = searchInputs;
  }
  return await fetchProductMasters({
    variables,
    fetchPolicy: fetchPolicy ? fetchPolicy : "no-cache",
  });
};

export const reloadViewportGrid = async (
  gridColumns: ViewportGridColumn[],
  csoId: string,
  setIsLoading: (arg: boolean) => void,
  setProductList: (arg: ViewportProductMaster[]) => void,
  fetchProductMasters: LazyQueryExecFunction<
    ViewportProductMasterResult,
    ViewportGridPmVariables
  >,
  applicationLocale: ApplicationLocale,
  fetchPolicy?: WatchQueryFetchPolicy,
  searchInputs?: SearchInput[],
  gridSearchFilter?: AutocompleteGridFilter[],
) => {
  setIsLoading(true);
  const productMasterResult = await loadProductMasters(
    gridColumns,
    csoId,
    searchInputs,
    fetchProductMasters,
    fetchPolicy,
  );
  if (
    productMasterResult.data &&
    productMasterResult.data.viewportProductMasters != null
  ) {
    setProductList(
      filterProductList(
        gridSearchFilter,
        productMasterResult.data.viewportProductMasters.productMasters,
        applicationLocale,
      ),
    );
  }
  setIsLoading(false);
};

export const checkColumnsHaveChanges = (
  viewportGridColumns: ViewportGridColumn[] | undefined,
  storageColumnString: string | null,
): boolean => {
  let boolColChanged = false;
  if (storageColumnString != null) {
    if (viewportGridColumns && viewportGridColumns.length > 0) {
      const colFromStateString: string = JSON.stringify(viewportGridColumns);
      boolColChanged = colFromStateString !== storageColumnString;
    } else {
      boolColChanged = true;
    }
  }
  return boolColChanged;
};

export const transformViewportGridColumnsToColDefinitions = (
  columns: ViewportGridColumn[] | undefined,
  defaultColumns: ViewportGridColumn[],
  labelFunction: (key: string, defaultValue: string) => string,
  applicationLocale: ApplicationLocale,
): (ColDef | ColGroupDef)[] => {
  const columnDefinitions: (ColDef | ColGroupDef)[] = defaultColumns
    .filter((column) => column.displayColumn)
    .map((column) => {
      const columnType =
        column.fieldName.includes("useCase") ||
        column.fieldName === "centralContent"
          ? "Check"
          : "Text";

      return createNewColumn(
        columnType,
        column,
        labelFunction,
        applicationLocale,
      );
    });

  if (columns !== undefined && columns.length > 0) {
    columns.forEach((column) => {
      const columnType =
        column.fieldName.includes("useCase") ||
        column.fieldName === "centralContent"
          ? "Check"
          : "Text";

      columnDefinitions.push(
        createNewColumn(columnType, column, labelFunction, applicationLocale),
      );
    });
  }
  return columnDefinitions;
};

export const transformProductMastersToSearchSuggestions = (
  productMaster: ViewportProductMaster,
  valueColumn: ViewportGridColumn,
  idColumn: ViewportGridColumn,
  autocompleteField: AutocompleteField,
  suggestionType: SuggestionFetchType,
  applicationLocale: ApplicationLocale,
): SearchSuggestion => {
  const suggestionValue = productMaster[
    valueColumn.fieldName as keyof ViewportProductMaster
  ]
    ? (productMaster[
        valueColumn.fieldName as keyof ViewportProductMaster
      ] as string)
    : "";
  return {
    value: suggestionValue,
    id: productMaster[idColumn.fieldName as keyof ViewportProductMaster]
      ? (productMaster[
          idColumn.fieldName as keyof ViewportProductMaster
        ] as string)
      : "",
    productMasterId: productMaster.productMasterId,
    autocompleteField,
    suggestionType,
    applicationLocaleClCode: applicationLocale.locale,
  };
};

export const getColumnNameKey = (columnKey: string): string => {
  switch (columnKey) {
    case "NAME":
      return "common.pm.name";
    case "ID":
    case "ARTIKELNUMMER":
      return `common.attribute.${columnKey}`;
    case "PRODUCT_MASTER_ID":
      return `organisms.productDetail.productStage.attribute.${columnKey}`;
    case "PM$LEADS":
      return "organisms.productDetail.productStage.attribute.PM_LEADS";
    case "B2B$ARGE":
    case "B2B$CATALOG":
    case "B2B$ESHOP":
    case "B2B$WEBSITE":
    case "B2C$WEBSITE":
      return `organisms.ProductList.panel.grid.productMasterStatus.${columnKey}`;
    default:
      return `organisms.ViewportGrid.column.${columnKey}`;
  }
};

const createNewColumn = (
  columnType: "Check" | "Text",
  viewportGridColumn: ViewportGridColumn,
  labelFunction: (key: string, defaultValue: string) => string,
  applicationLocale: ApplicationLocale,
): ColDef | ColGroupDef => {
  const valueFormatterTranslatableColumns = (params: ValueFormatterParams) => {
    const values: string[] = params.value.split("|");
    return applicationLocale.locale === "en-GB" ? values[1] : values[0];
  };

  return {
    headerName: labelFunction(
      getColumnNameKey(viewportGridColumn.key),
      viewportGridColumn.key,
    ),
    field: viewportGridColumn.fieldName,
    autoHeight: true,
    suppressSizeToFit: true,
    editable: false,
    cellRenderer: ViewportGridCellRenderer,
    cellRendererParams: {
      type: columnType,
    },
    valueFormatter: checkColumnIsTranslatable(viewportGridColumn)
      ? valueFormatterTranslatableColumns
      : ({ value }: ValueFormatterParams) => value,
    suppressHeaderContextMenu: true,
    suppressHeaderMenuButton: true,
    resizable: false,
    headerClass: "ViewportGrid_headerCell",
    // headerComponent: GridHeaderCell,
  };
};

const checkColumnIsTranslatable = (column: ViewportGridColumn): boolean => {
  const translatableColumnKeys = ["PM_EXT_PRODUCT_NAME", "PM_COMPONENTGROUP"];

  return translatableColumnKeys.includes(column.key);
};
