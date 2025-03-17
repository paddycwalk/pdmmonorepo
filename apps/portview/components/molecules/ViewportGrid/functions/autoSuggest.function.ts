import { SearchSuggestion } from "../types/viewportGrid.types";

export const getSuggestionValue = (suggestion: SearchSuggestion): string =>
  suggestion.value;
