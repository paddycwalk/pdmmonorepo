"use client";

import React, { useState } from "react";
import Autosuggest, {
  ChangeEvent,
  RenderInputComponentProps,
  RenderSuggestionParams,
  SuggestionSelectedEventData,
  SuggestionsFetchRequestedParams,
} from "react-autosuggest";
import "./Autocomplete.scss";
import { Label } from "../Label/Label";
import { Icon } from "../Icon/Icon";
import { LoadingSpinner, SearchIcon } from "../../..";

export interface AutocompleteProps<T> {
  // suggestions: T[];
  getSuggestionValue: (suggestion: T) => string;
  renderSuggestion: (
    suggestion: T,
    params: RenderSuggestionParams,
  ) => React.ReactNode;
  label: string;
  customOnSuggestionFetchRequested: (
    params: SuggestionsFetchRequestedParams,
  ) => Promise<T[]>;
  placeholder?: string;
  onSuggestionSelected?: (
    event: React.FormEvent<HTMLElement>,
    data: SuggestionSelectedEventData<T>,
  ) => Promise<string>;
  showLabel?: boolean;
  isLoading?: boolean;
  id?: string;
  name?: string;
  customOnChange?: (
    event: React.FormEvent<HTMLElement>,
    params: ChangeEvent,
  ) => void;
  initialValue?: string;
}

export const Autocomplete = <T,>({
  // suggestions,
  getSuggestionValue,
  renderSuggestion,
  label,
  customOnSuggestionFetchRequested,
  placeholder = "Type to search...",
  onSuggestionSelected,
  showLabel,
  isLoading,
  id,
  name,
  customOnChange,
  initialValue,
}: AutocompleteProps<T>) => {
  const [value, setValue] = useState<string>(initialValue ? initialValue : "");
  const [filteredSuggestions, setfilteredSuggestions] = useState<T[]>([]);

  const onChange = (
    event: React.FormEvent<HTMLElement>,
    params: ChangeEvent,
  ) => {
    if (customOnChange) {
      customOnChange(event, params);
    }
    setValue(params.newValue);
  };

  const onSuggestionsClearRequested = () => {
    setfilteredSuggestions([]);
  };

  const suggestionSelected = async (
    event: React.FormEvent<HTMLElement>,
    data: SuggestionSelectedEventData<T>,
  ) => {
    if (onSuggestionSelected) {
      const selectedValue = await onSuggestionSelected(event, data);
      setValue(selectedValue);
    }
  };

  const onSuggestionsFetchRequested = async (
    params: SuggestionsFetchRequestedParams,
  ) => {
    const suggestions = await customOnSuggestionFetchRequested(params);
    setValue(params.value);
    setfilteredSuggestions(suggestions);
  };

  return (
    <div className="Autocomplete">
      {showLabel && (
        <Label htmlFor="" label={label} className="Autocomplete_label"></Label>
      )}
      <Autosuggest
        suggestions={filteredSuggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={suggestionSelected}
        inputProps={{
          placeholder,
          value,
          onChange,
          id,
          name,
        }}
        renderInputComponent={(
          inputProps: RenderInputComponentProps & { key?: React.Key },
        ) => {
          // need key - console error
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { key, className, ...restProps } = inputProps;

          return (
            <>
              <input
                {...restProps}
                className={`Input Autocomplete_input ${className || ""}`}
              />
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <Icon
                  svg={<SearchIcon />}
                  className="Autocomplete_searchIcon"
                />
              )}
            </>
          );
        }}
      />
    </div>
  );
};
