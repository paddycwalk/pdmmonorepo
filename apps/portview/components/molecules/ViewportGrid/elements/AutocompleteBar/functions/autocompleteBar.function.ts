import {
  AutocompleteField,
  AutocompleteGridFilter,
  SuggestionFetchType,
} from "../../../../PortViewAutocomplete/types/autocomplete.type";
import { SearchInput } from "../../../types/viewportGrid.types";
import {
  autocompleteFilter,
  autocompleteIdFilter,
  searchFilter,
  searchIdFilter,
} from "../constants/autocompleteBar.constant";

export const createGridFilter = (
  filterValue: string,
  autocompleteField: AutocompleteField,
  suggestionFetchType: SuggestionFetchType,
): AutocompleteGridFilter => {
  return {
    filterFunction:
      SuggestionFetchType.GRID === suggestionFetchType
        ? searchFilter[autocompleteField]
        : searchIdFilter[autocompleteField],
    filterValue: filterValue,
    field: autocompleteField,
  };
};

export const createAutocompleteFilter = (
  filterValue: string,
  autocompleteField: AutocompleteField,
  suggestionFetchType: SuggestionFetchType,
): AutocompleteGridFilter => {
  return {
    filterFunction:
      SuggestionFetchType.GRID === suggestionFetchType
        ? autocompleteFilter[autocompleteField]
        : autocompleteIdFilter[autocompleteField],
    filterValue: filterValue,
    field: autocompleteField,
  };
};

export const calculateAutocompleteInitialValue = (
  autocompleteField: AutocompleteField,
  databaseSearchInputs: Record<AutocompleteField, SearchInput[]>,
  gridSearchInputs: Record<AutocompleteField, AutocompleteGridFilter>,
): string => {
  if (databaseSearchInputs[autocompleteField]) {
    return databaseSearchInputs[autocompleteField]
      .map((searchInput) => searchInput.searchTerm)
      .join(" ");
  } else if (gridSearchInputs[autocompleteField]) {
    return gridSearchInputs[autocompleteField].filterValue;
  }
  return "";
};
