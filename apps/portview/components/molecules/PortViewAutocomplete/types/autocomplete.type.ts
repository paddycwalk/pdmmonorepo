import {
  SearchInput,
  ViewportProductMaster,
} from "../../ViewportGrid/types/viewportGrid.types";
import ApplicationLocale from "@repo/global-functions/Types/applicationLocale";

export enum AutocompleteField {
  PRODUCT_CATEGORY = "PRODUCT_CATEGORY",
  PRODUCT_MASTER = "PRODUCT_MASTER",
  SNR = "SNR",
}

export enum SuggestionFetchType {
  GRID = "GRID",
  ID = "ID",
}

export interface AutocompleteGridFilter {
  filterFunction: (
    product: ViewportProductMaster,
    searchValue: string,
    applicationLocale: ApplicationLocale,
  ) => boolean;
  filterValue: string;
  field: AutocompleteField;
}

export interface SuggestionSelectedEvent {
  productList: ViewportProductMaster[];
  searchInputs: SearchInput[];
  gridSearchFilter: AutocompleteGridFilter[];
}
