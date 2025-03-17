"use client";

import React, { useRef } from "react";

import PortViewAutocomplete from "../../../PortViewAutocomplete";
import {
  AutocompleteField,
  AutocompleteGridFilter,
  SuggestionFetchType,
  SuggestionSelectedEvent,
} from "../../../PortViewAutocomplete/types/autocomplete.type";
import {
  SearchInput,
  SearchSuggestion,
  ViewportGridColumn,
  ViewportProductMaster,
} from "../../types/viewportGrid.types";
import {
  calculateAutocompleteInitialValue,
  createAutocompleteFilter,
  createGridFilter,
} from "./functions/autocompleteBar.function";
import { useAppContext } from "../../../../../hooks/useAppContext";
import ApplicationLocale from "@repo/global-functions/Types/applicationLocale";
import { useLabels } from "../../../../../hooks/useLabels";
import "./AutocompleteBar.scss";

export interface AutocompleteBarProps {
  productList: ViewportProductMaster[];
  onProductListChange: (
    productList: ViewportProductMaster[],
    searchInputs: SearchInput[],
    gridSearchFilter: AutocompleteGridFilter[],
  ) => void;
  reloadFromDb: (
    searchInputs: SearchInput[],
    gridSearchFilter: AutocompleteGridFilter[],
  ) => Promise<ViewportProductMaster[]>;
  csoId: string;
  fetchSuggestions: (
    autocompleteField: AutocompleteField,
    autocompleteFilter: AutocompleteGridFilter[],
    applicationLocale: ApplicationLocale,
  ) => Promise<ViewportProductMaster[]>;
}

function createUpdatedSearchFields(
  databaseSearchInputs: React.RefObject<
    Record<AutocompleteField, SearchInput[]>
  >,
  searchValue: string,
  autocompleteField: AutocompleteField,
) {
  const searchFields: SearchInput[] = [];
  databaseSearchInputs.current[autocompleteField].forEach((searchInput) => {
    searchFields.push({
      searchTerm: searchValue,
      searchColumn: searchInput.searchColumn,
    });
  });
  return searchFields;
}

const AutocompleteBar: React.FC<AutocompleteBarProps> = ({
  productList,
  onProductListChange,
  reloadFromDb,
  csoId,
  fetchSuggestions,
}) => {
  const databaseSearchInputs = useRef(
    {} as Record<AutocompleteField, SearchInput[]>,
  );
  const gridSearchInputs = useRef(
    {} as Record<AutocompleteField, AutocompleteGridFilter>,
  );
  const label = useLabels();
  const { state } = useAppContext();

  const onSuggestionCleared = async (
    autoCompleteField: AutocompleteField,
  ): Promise<void> => {
    delete databaseSearchInputs.current[autoCompleteField];
    delete gridSearchInputs.current[autoCompleteField];

    const newProducts = await reloadFromDb(
      Object.values(databaseSearchInputs.current).flat(),
      Object.values(gridSearchInputs.current).flat(),
    );
    onProductListChange(
      newProducts,
      Object.values(databaseSearchInputs.current).flat(),
      Object.values(gridSearchInputs.current).flat(),
    );
  };

  const handleSuggestionSelected = async (
    productFilter: (product: ViewportProductMaster) => boolean,
    data: SearchSuggestion,
  ): Promise<SuggestionSelectedEvent | undefined> => {
    if (data.id) {
      const selectedProduct = productList.filter(productFilter);
      const newProductList = [...selectedProduct];
      return {
        productList: newProductList,
        searchInputs: Object.values(databaseSearchInputs.current).flat(),
        gridSearchFilter: Object.values(gridSearchInputs.current).flat(),
      };
    }

    return undefined;
  };

  const fetchAutocompleteSuggestions = async (
    searchTerm: string,
    suggestionType: SuggestionFetchType,
    autocompleteField: AutocompleteField,
    searchColumns: ViewportGridColumn[],
  ): Promise<ViewportProductMaster[]> => {
    const searchFields: SearchInput[] = [];
    searchColumns.forEach((col) => {
      searchFields.push({ searchTerm: searchTerm, searchColumn: col });
    });
    databaseSearchInputs.current[autocompleteField] = searchFields;
    gridSearchInputs.current[autocompleteField] = createAutocompleteFilter(
      searchTerm,
      autocompleteField,
      suggestionType,
    );
    return fetchSuggestions(
      autocompleteField,
      Object.values(gridSearchInputs.current).flat(),
      state.applicationLocale,
    );
  };

  return (
    <div className={"AutocompleteBar"}>
      <hr className="AutocompleteBar_separator" />
      <div className={"AutocompleteBar_elements"}>
        <PortViewAutocomplete
          id={"prodCatSuggestion"}
          name={"prodCatSuggestion"}
          label={label(
            "molecules.autocomplete.prodCat.label",
            "##Product Category",
          )}
          placeholder={label(
            "molecules.autocomplete.prodCat.placeholder",
            "##Product Category",
          )}
          autoCompleteField={AutocompleteField.PRODUCT_CATEGORY}
          onSuggestionSelected={async (data: SearchSuggestion) => {
            gridSearchInputs.current[AutocompleteField.PRODUCT_CATEGORY] =
              createGridFilter(
                data.value,
                AutocompleteField.PRODUCT_CATEGORY,
                data.suggestionType,
              );

            databaseSearchInputs.current[AutocompleteField.PRODUCT_CATEGORY] =
              createUpdatedSearchFields(
                databaseSearchInputs,
                data.value,
                AutocompleteField.PRODUCT_CATEGORY,
              );

            const autocompleteFinishEvent = await handleSuggestionSelected(
              (product) => product.extProductCategory === data.value,
              data,
            );
            if (autocompleteFinishEvent) {
              onProductListChange(
                autocompleteFinishEvent.productList,
                autocompleteFinishEvent.searchInputs,
                autocompleteFinishEvent.gridSearchFilter,
              );
            }
          }}
          fetchSuggestions={fetchAutocompleteSuggestions}
          initialValue={calculateAutocompleteInitialValue(
            AutocompleteField.PRODUCT_CATEGORY,
            databaseSearchInputs.current,
            gridSearchInputs.current,
          )}
          onSuggestionCleared={() => {
            onSuggestionCleared(AutocompleteField.PRODUCT_CATEGORY);
          }}
        />
        <PortViewAutocomplete
          id={"pmSuggestion"}
          name={"pmSuggestion"}
          label={label("molecules.autocomplete.pm.label", "##PM")}
          placeholder={label("molecules.autocomplete.pm.placeholder", "##PM")}
          autoCompleteField={AutocompleteField.PRODUCT_MASTER}
          onSuggestionSelected={async (data: SearchSuggestion) => {
            gridSearchInputs.current[AutocompleteField.PRODUCT_MASTER] =
              createGridFilter(
                data.value,
                AutocompleteField.PRODUCT_MASTER,
                data.suggestionType,
              );
            databaseSearchInputs.current[AutocompleteField.PRODUCT_MASTER] =
              createUpdatedSearchFields(
                databaseSearchInputs,
                data.value,
                AutocompleteField.PRODUCT_MASTER,
              );
            const autocompleteFinishEvent = await handleSuggestionSelected(
              (product) =>
                product.productMasterId.toString() === data.id.toString(),
              data,
            );
            if (autocompleteFinishEvent) {
              onProductListChange(
                autocompleteFinishEvent.productList,
                autocompleteFinishEvent.searchInputs,
                autocompleteFinishEvent.gridSearchFilter,
              );
            }
          }}
          fetchSuggestions={fetchAutocompleteSuggestions}
          initialValue={calculateAutocompleteInitialValue(
            AutocompleteField.PRODUCT_MASTER,
            databaseSearchInputs.current,
            gridSearchInputs.current,
          )}
          onSuggestionCleared={() => {
            onSuggestionCleared(AutocompleteField.PRODUCT_MASTER);
          }}
        />
        <PortViewAutocomplete
          id={"snrSuggestion"}
          name={"snrSuggestion"}
          label={label("molecules.autocomplete.snr.label", "##SNR")}
          placeholder={label("molecules.autocomplete.snr.placeholder", "##SNR")}
          autoCompleteField={AutocompleteField.SNR}
          onSuggestionSelected={async (data: SearchSuggestion) => {
            gridSearchInputs.current[AutocompleteField.SNR] = createGridFilter(
              data.value,
              AutocompleteField.SNR,
              data.suggestionType,
            );
            databaseSearchInputs.current[AutocompleteField.SNR] =
              createUpdatedSearchFields(
                databaseSearchInputs,
                data.value,
                AutocompleteField.SNR,
              );
            const autocompleteFinishEvent = await handleSuggestionSelected(
              (product) => product.articleNumberId === data.id,
              data,
            );
            if (autocompleteFinishEvent) {
              onProductListChange(
                autocompleteFinishEvent.productList,
                autocompleteFinishEvent.searchInputs,
                autocompleteFinishEvent.gridSearchFilter,
              );
            }
          }}
          fetchSuggestions={fetchAutocompleteSuggestions}
          initialValue={calculateAutocompleteInitialValue(
            AutocompleteField.SNR,
            databaseSearchInputs.current,
            gridSearchInputs.current,
          )}
          onSuggestionCleared={() => {
            onSuggestionCleared(AutocompleteField.SNR);
          }}
        />
      </div>
    </div>
  );
};

export default AutocompleteBar;
