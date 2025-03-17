import {
  AutocompleteField,
  SuggestionFetchType,
} from "../../PortViewAutocomplete/types/autocomplete.type";

export interface ViewportGridColumn {
  fieldName: string;
  key: string;
  displayColumn: boolean;
}

export interface SearchInput {
  searchTerm: string;
  searchColumn: ViewportGridColumn;
}

export interface ViewportGridPmVariables {
  csoId: number;
  startRowNum: number;
  endRowNum: number;
  cols: ViewportGridColumn[];
  searchFields?: SearchInput[];
}

export interface ViewportProductMaster {
  articleNumber: string;
  articleNumberId: string;
  centralContent: string;
  componentGroup: string;
  countryCategory: string;
  csoId: number;
  extProductCategory: string;
  extProductName: string;
  extProductNameTrans: string;
  factsheetOwnerGlobal: string;
  factsheetOwnerRegional: string;
  id: string | undefined;
  leads: string;
  mainProductImage: string;
  maktx: string;
  mstae: string;
  name: string;
  productBrand: string;
  productCategory: string;
  productImages: string;
  productLine: string;
  productName: string;
  productMasterId: number;
  salesBrand: string;
  sapMarketGenericDescription: string;
  sapProductBrand: string;
  sapProductLine: string;
  sapProductName: string;
  useCaseB2CWebsite: boolean;
  useCaseCatalog: boolean;
  useCaseEshop: boolean;
}

export interface ViewportProductMasterResultContainer {
  productMasters: ViewportProductMaster[];
  moreDataAvailable: boolean;
}

export interface ViewportProductMasterColsResult {
  viewportProductMasterCols: ViewportGridColumn[];
}

export interface ViewportDefaultColumnResult {
  viewportDefaultCols: ViewportGridColumn[];
}

export interface ViewportProductMasterResult {
  viewportProductMasters: ViewportProductMasterResultContainer;
}

export interface SearchSuggestion {
  value: string;
  id: string;
  productMasterId: number;
  autocompleteField: AutocompleteField;
  suggestionType: SuggestionFetchType;
  applicationLocaleClCode: string;
}
