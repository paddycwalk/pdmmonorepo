"use client";

import React from "react";
import {
  ChangeEvent,
  RenderSuggestionParams,
  SuggestionSelectedEventData,
  SuggestionsFetchRequestedParams,
} from "react-autosuggest";
import { getSuggestionValue } from "../ViewportGrid/functions/autoSuggest.function";
import { transformProductMastersToSearchSuggestions } from "../ViewportGrid/functions/viewportGrid.function";
import {
  SearchSuggestion,
  ViewportGridColumn,
  ViewportProductMaster,
} from "../ViewportGrid/types/viewportGrid.types";
import {
  AutocompleteField,
  SuggestionFetchType,
} from "./types/autocomplete.type";
import { Autocomplete } from "@repo/ui";
import { useAppContext } from "../../../hooks/useAppContext";

import "./PortViewAutocomplete.scss";

export const fieldColumnMapping: Record<
  AutocompleteField,
  ViewportGridColumn[]
> = {
  PRODUCT_CATEGORY: [
    {
      key: "SAP$CLFMAS$Z14_EXT_PRODUCT_CATEGORY",
      fieldName: "extProductCategory",
      displayColumn: true,
    },
  ],
  PRODUCT_MASTER: [
    {
      key: "PM_EXT_PRODUCT_NAME",
      fieldName: "extProductName",
      displayColumn: true,
    },
    {
      key: "PM_EXT_PRODUCT_TRANS_NAME",
      fieldName: "extProductNameTranslations",
      displayColumn: false,
    },
  ],
  SNR: [
    { key: "ARTIKELNUMMER", fieldName: "articleNumber", displayColumn: true },
  ],
};

export const idColumnMapping: Record<AutocompleteField, ViewportGridColumn> = {
  PRODUCT_CATEGORY: {
    key: "PRODUCT_MASTER_ID",
    fieldName: "productMasterId",
    displayColumn: false,
  },
  PRODUCT_MASTER: {
    key: "PRODUCT_MASTER_ID",
    fieldName: "productMasterId",
    displayColumn: false,
  },
  SNR: {
    key: "ARTIKELNUMMER_ID",
    fieldName: "articleNumberId",
    displayColumn: false,
  },
};

const renderSuggestion = (
  suggestion: SearchSuggestion,
  params: RenderSuggestionParams,
): React.ReactNode => {
  const { value, id, autocompleteField, applicationLocaleClCode } = suggestion;
  const { query } = params;
  let valueToDisplay: string | undefined;
  if (AutocompleteField.PRODUCT_MASTER === autocompleteField) {
    const values: string[] = value.split("|");
    valueToDisplay =
      applicationLocaleClCode === "en-GB" ? values[1] : values[0];
  } else {
    valueToDisplay = value;
  }

  const parts = valueToDisplay
    ? valueToDisplay.split(new RegExp(`(${query})`, "gi"))
    : [];
  return (
    <div>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <strong key={index}>{part}</strong>
        ) : (
          part
        ),
      )}{" "}
      ({id})
    </div>
  );
};

export interface Props {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  autoCompleteField: AutocompleteField;
  fetchSuggestions: (
    searchTerm: string,
    suggestionType: SuggestionFetchType,
    autocompleteField: AutocompleteField,
    searchColumns: ViewportGridColumn[],
  ) => Promise<ViewportProductMaster[]>;
  initialValue?: string;
  onSuggestionSelected?: (data: SearchSuggestion) => Promise<void>;
  onSuggestionCleared?: () => void;
}

const PortViewAutocomplete = <SuggestionType,>(
  props: Props,
): React.ReactElement => {
  const { state } = useAppContext();

  const suggestionSelected = async (
    event: React.FormEvent<HTMLElement>,
    data: SuggestionSelectedEventData<SearchSuggestion>,
  ) => {
    if (props.onSuggestionSelected) {
      await props.onSuggestionSelected(data.suggestion);
    }
    if (
      AutocompleteField.PRODUCT_MASTER === data.suggestion.autocompleteField
    ) {
      if (data.suggestion.value.toString().indexOf("|") === -1) {
        return data.suggestion.value;
      }

      const values: string[] = data.suggestion.value.toString().split("|");
      const valueDe = values[0] ? values[0] : "";
      const valueEn = values[1] ? values[1] : "";
      const valueForSuggestion: string =
        state.applicationLocale.locale === "en-GB"
          ? valueEn.trim()
          : valueDe.trim();
      return valueForSuggestion;
    } else {
      return data.suggestion.value;
    }
  };

  const onChange = (
    event: React.FormEvent<HTMLElement>,
    params: ChangeEvent,
  ) => {
    const { newValue } = params;
    if (props.onSuggestionCleared && newValue === "") {
      props.onSuggestionCleared();
    }
  };

  const onSuggestionFetchRequested = async (
    params: SuggestionsFetchRequestedParams,
  ) => {
    const filteredSuggestions: SearchSuggestion[] = [];
    if (params.value.length >= 3) {
      //Implement search against DB here
      const searchColumns: ViewportGridColumn[] = [];
      let suggestionType: SuggestionFetchType;
      if (params.value.startsWith("#")) {
        searchColumns.push(idColumnMapping[props.autoCompleteField]);
        suggestionType = SuggestionFetchType.ID;
      } else {
        searchColumns.push(...fieldColumnMapping[props.autoCompleteField]);
        suggestionType = SuggestionFetchType.GRID;
      }
      const suggestedProducts = await props.fetchSuggestions(
        params.value,
        suggestionType,
        props.autoCompleteField,
        searchColumns,
      );
      suggestedProducts.forEach((suggestedProduct) => {
        filteredSuggestions.push(
          transformProductMastersToSearchSuggestions(
            suggestedProduct,
            searchColumns[0] as ViewportGridColumn,
            idColumnMapping[props.autoCompleteField],
            props.autoCompleteField,
            suggestionType,
            state.applicationLocale,
          ),
        );
      });
    }

    return filteredSuggestions;
  };

  return (
    <Autocomplete
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      onSuggestionSelected={suggestionSelected}
      customOnSuggestionFetchRequested={onSuggestionFetchRequested}
      label={props.label}
      customOnChange={onChange}
      initialValue={props.initialValue}
      placeholder={props.placeholder}
      id={props.id}
      name={props.name}
    />
  );
};

export default PortViewAutocomplete;
