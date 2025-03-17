"use client";

import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  AutocompleteField,
  AutocompleteGridFilter,
} from "../PortViewAutocomplete/types/autocomplete.type";
import AutocompleteBar from "./elements/AutocompleteBar/AutocompleteBar";
import { autocompleteUniqueFilter } from "./elements/AutocompleteBar/constants/autocompleteBar.constant";
import ColumnSelector from "./elements/ColumnSelector/ColumnSelector";
import {
  checkColumnsHaveChanges,
  filterProductList,
  loadProductMasters,
  reloadViewportGrid,
  transformViewportGridColumnsToColDefinitions,
} from "./functions/viewportGrid.function";
import {
  GET_DEFAULT_GRID_COLUMNS,
  GET_VIEWPORT_PRODUCTMASTER,
} from "./queries/viewportGrid.query";
import {
  SearchInput,
  ViewportDefaultColumnResult,
  ViewportGridColumn,
  ViewportGridPmVariables,
  ViewportProductMaster,
  ViewportProductMasterResult,
} from "./types/viewportGrid.types";
import { Grid, LoadingSpinner } from "@repo/ui";
import { useLabels } from "../../../hooks/useLabels";
import { useAppContext } from "../../../hooks/useAppContext";
import ApplicationLocale from "@repo/global-functions/Types/applicationLocale";
import { ColDef, ColGroupDef } from "ag-grid-enterprise";

import "./ViewportGrid.scss";
import useLocaleText from "../../../hooks/useLocaleText";

export interface ViewportGridProps {
  csoId: string;
  columnsChanged?: (selectedColumns: ViewportGridColumn[]) => void;
}

const ViewportGrid: React.FC<ViewportGridProps> = ({
  csoId,
  columnsChanged,
}: ViewportGridProps): React.ReactElement => {
  const [controller] = useState(new AbortController());
  const label = useLabels();
  const getLocaleText = useLocaleText();
  const { state } = useAppContext();
  const [productList, setProductList] = useState<ViewportProductMaster[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gridSearchInputs, setGridSearchInputs] = useState<SearchInput[]>([]);
  const [gridSearchFilters, setGridSearchFilters] = useState<
    AutocompleteGridFilter[]
  >([]);
  const [displayedGridColums, setDisplayedGridColumns] = useState<
    (ColDef | ColGroupDef)[]
  >([]);
  const [additionalViewportGridColumns, setAdditionalViewportGridColumns] =
    useState<ViewportGridColumn[]>();
  const [defaultViewportGridColumns, setDefaultViewportGridColumns] = useState<
    ViewportGridColumn[]
  >([]);
  const [fetchDefaultColumns] = useLazyQuery<ViewportDefaultColumnResult>(
    GET_DEFAULT_GRID_COLUMNS,
  );
  const [fetchProductMasters] = useLazyQuery<
    ViewportProductMasterResult,
    ViewportGridPmVariables
  >(GET_VIEWPORT_PRODUCTMASTER);
  const [destroyed, setDestroyed] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      const defaultColumnsResult = await fetchDefaultColumns();
      const defaultColumns =
        defaultColumnsResult.data?.viewportDefaultCols || [];
      setDefaultViewportGridColumns(defaultColumns);
      const storageColumnString = window.localStorage.getItem(
        "viewportGridColumns",
      );
      const boolColChanged = checkColumnsHaveChanges(
        additionalViewportGridColumns,
        storageColumnString,
      );

      if (boolColChanged && storageColumnString != null) {
        const columnsFromLocalStorage: ViewportGridColumn[] =
          JSON.parse(storageColumnString);
        setAdditionalViewportGridColumns(columnsFromLocalStorage);
        if (columnsFromLocalStorage) {
          const columnDefinitions =
            transformViewportGridColumnsToColDefinitions(
              columnsFromLocalStorage,
              defaultColumns,
              label,
              state.applicationLocale,
            );
          setDisplayedGridColumns(columnDefinitions);
        }
      } else if (
        additionalViewportGridColumns &&
        additionalViewportGridColumns.length > 0
      ) {
        const mergedColumns = [
          ...defaultColumns,
          ...additionalViewportGridColumns,
        ];
        await reloadViewportGrid(
          mergedColumns,
          csoId,
          setIsLoading,
          setProductList,
          fetchProductMasters,
          state.applicationLocale,
          "cache-first",
        );
      } else {
        if (columnsChanged) {
          columnsChanged(defaultColumnsResult.data?.viewportDefaultCols || []);
        }
        const columnDefinitions = transformViewportGridColumnsToColDefinitions(
          [],
          defaultColumns,
          label,
          state.applicationLocale,
        );
        setDisplayedGridColumns(columnDefinitions);
        await reloadViewportGrid(
          defaultColumnsResult.data?.viewportDefaultCols || [],
          csoId,
          setIsLoading,
          setProductList,
          fetchProductMasters,
          state.applicationLocale,
          "cache-first",
        );
      }
    };
    initialize();
  }, [csoId]);

  useEffect(() => {
    const reloadGrid = async () => {
      if (
        defaultViewportGridColumns &&
        defaultViewportGridColumns.length > 0 &&
        additionalViewportGridColumns
      ) {
        const mergedColumns = [...defaultViewportGridColumns];
        if (additionalViewportGridColumns.length > 0) {
          mergedColumns.push(...additionalViewportGridColumns);
        }
        await reloadViewportGrid(
          mergedColumns,
          csoId,
          setIsLoading,
          setProductList,
          fetchProductMasters,
          state.applicationLocale,
          "cache-first",
          gridSearchInputs,
          gridSearchFilters,
        );
      }
    };

    reloadGrid();
  }, [JSON.stringify(additionalViewportGridColumns)]);

  useEffect(() => {
    setDestroyed(true);
    const columnDefinitions = transformViewportGridColumnsToColDefinitions(
      additionalViewportGridColumns && additionalViewportGridColumns.length > 0
        ? additionalViewportGridColumns
        : [],
      defaultViewportGridColumns,
      label,
      state.applicationLocale,
    );
    setDisplayedGridColumns(columnDefinitions);
    requestAnimationFrame(() => setDestroyed(false));
  }, [state.applicationLocale.locale]);

  useEffect(() => {
    setDestroyed(true);
    requestAnimationFrame(() => setDestroyed(false));
  }, [JSON.stringify(productList)]);

  const reloadGridAfterSearch = async (
    searchInputs: SearchInput[],
    gridSearchFilter: AutocompleteGridFilter[],
  ): Promise<ViewportProductMaster[]> => {
    const mergedColumns = [...defaultViewportGridColumns];
    if (
      additionalViewportGridColumns &&
      additionalViewportGridColumns.length > 0
    ) {
      mergedColumns.push(...additionalViewportGridColumns);
    }
    setIsLoading(true);
    const prResult = await loadProductMasters(
      mergedColumns,
      csoId,
      searchInputs,
      fetchProductMasters,
      "cache-first",
    );
    setIsLoading(false);
    if (prResult.data && prResult.data.viewportProductMasters != null) {
      return prResult.data.viewportProductMasters.productMasters;
    } else {
      return [];
    }
  };

  const fetchSuggestions = async (
    autocompleteField: AutocompleteField,
    autocompleteFilter: AutocompleteGridFilter[],
    applicationLocale: ApplicationLocale,
  ): Promise<ViewportProductMaster[]> => {
    controller.abort();
    return filterProductList(
      autocompleteFilter,
      productList,
      applicationLocale,
      autocompleteUniqueFilter[autocompleteField],
    );
  };

  return (
    <div className={"ViewportGrid"}>
      <AutocompleteBar
        productList={productList}
        onProductListChange={(
          productList: ViewportProductMaster[],
          searchInputs: SearchInput[],
          gridSearchFilter: AutocompleteGridFilter[],
        ) => {
          setProductList(productList);
          setGridSearchInputs(searchInputs);
          setGridSearchFilters(gridSearchFilter);
        }}
        csoId={csoId}
        reloadFromDb={reloadGridAfterSearch}
        fetchSuggestions={fetchSuggestions}
      />
      {destroyed ? (
        <></>
      ) : isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <LoadingSpinner />
        </div>
      ) : (
        displayedGridColums &&
        displayedGridColums.length > 0 &&
        defaultViewportGridColumns &&
        defaultViewportGridColumns.length > 0 && (
          <>
            <div className={"ViewportGrid_head"}>
              <h3>
                {label(
                  "organisms.ViewportGrid.headline",
                  "## Product Assignements",
                )}
              </h3>
              <ColumnSelector
                selectedColumns={additionalViewportGridColumns}
                defaultColumns={defaultViewportGridColumns}
                applyColumnSelection={(selectedColumns) => {
                  setDestroyed(true);
                  requestAnimationFrame(() => setDestroyed(false));
                  setAdditionalViewportGridColumns(selectedColumns);
                  if (columnsChanged) {
                    const mergedColumns = [
                      ...defaultViewportGridColumns,
                      ...selectedColumns,
                    ];
                    columnsChanged(mergedColumns);
                  }
                  const columnDefinitions =
                    transformViewportGridColumnsToColDefinitions(
                      selectedColumns,
                      defaultViewportGridColumns,
                      label,
                      state.applicationLocale,
                    );
                  setDisplayedGridColumns(columnDefinitions);
                  window.localStorage.setItem(
                    "viewportGridColumns",
                    JSON.stringify(selectedColumns),
                  );
                }}
              />
            </div>
            <Grid
              rowData={productList}
              columnDefinitions={displayedGridColums}
              height={600}
              labelFunction={label}
              getLocaleText={getLocaleText}
            />
          </>
        )
      )}
    </div>
  );
};

export default ViewportGrid;
