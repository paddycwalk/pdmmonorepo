import { AutocompleteField } from "../../../../PortViewAutocomplete/types/autocomplete.type";
import { ViewportProductMaster } from "../../../types/viewportGrid.types";
import ApplicationLocale from "@repo/global-functions/Types/applicationLocale";

export const searchFilter: Record<
  AutocompleteField,
  (product: ViewportProductMaster, searchValue: string) => boolean
> = {
  [AutocompleteField.PRODUCT_CATEGORY]: (product, searchValue) =>
    product.extProductCategory !== undefined &&
    product.extProductCategory !== null &&
    product.extProductCategory.toString() === searchValue.toString(),
  [AutocompleteField.PRODUCT_MASTER]: (product, searchValue) => {
    if (
      product.extProductName !== undefined &&
      product.extProductName !== null
    ) {
      return product.extProductName.toString() === searchValue.toString();
    }
    return false;
  },
  [AutocompleteField.SNR]: (product, searchValue) =>
    product.articleNumber !== undefined &&
    product.articleNumber !== null &&
    product.articleNumber.toString() === searchValue.toString(),
};

export const searchIdFilter: Record<
  AutocompleteField,
  (
    product: ViewportProductMaster,
    searchValue: string,
    applicationLocale: ApplicationLocale,
  ) => boolean
> = {
  [AutocompleteField.PRODUCT_CATEGORY]: (product, searchValue) =>
    product.extProductCategory !== undefined &&
    product.extProductCategory !== null &&
    product.extProductCategory.toString() === searchValue.toString(),
  [AutocompleteField.PRODUCT_MASTER]: (product, searchValue) => {
    if (
      product.productMasterId !== undefined &&
      product.productMasterId !== null
    ) {
      return product.productMasterId.toString() === searchValue;
    }
    return false;
  },
  [AutocompleteField.SNR]: (product, searchValue) => {
    if (
      product.articleNumberId !== undefined &&
      product.articleNumberId !== null
    ) {
      return product.articleNumberId.toString() === searchValue;
    }
    return false;
  },
};

export const autocompleteFilter: Record<
  AutocompleteField,
  (
    product: ViewportProductMaster,
    searchValue: string,
    applicationLocale: ApplicationLocale,
  ) => boolean
> = {
  [AutocompleteField.PRODUCT_CATEGORY]: (product, searchValue) =>
    product.extProductCategory !== undefined &&
    product.extProductCategory !== null &&
    product.extProductCategory
      .toString()
      .toLowerCase()
      .includes(searchValue.toString().toLowerCase()),
  [AutocompleteField.PRODUCT_MASTER]: (
    product,
    searchValue,
    applicationLocale,
  ) => {
    if (
      product.extProductName !== undefined &&
      product.extProductName !== null
    ) {
      if (product.extProductName.toString().indexOf("|") === -1) {
        return product.extProductName
          .toString()
          .toLowerCase()
          .includes(searchValue.toString().toLowerCase());
      }

      const values: string[] = product.extProductName.toString().split("|");
      const valueDE: string = values[0] as string;
      const valueEN: string = values[1] as string;
      const filterValue: string =
        applicationLocale.locale === "en-GB" ? valueEN.trim() : valueDE.trim();
      return filterValue
        .toString()
        .toLowerCase()
        .includes(searchValue.toString().toLowerCase());
    }
    return false;
  },
  [AutocompleteField.SNR]: (product, searchValue) =>
    product.articleNumber !== undefined &&
    product.articleNumber !== null &&
    product.articleNumber
      .toString()
      .toLowerCase()
      .includes(searchValue.toString().toLowerCase()),
};

export const autocompleteIdFilter: Record<
  AutocompleteField,
  (product: ViewportProductMaster, searchValue: string) => boolean
> = {
  [AutocompleteField.PRODUCT_CATEGORY]: (product, searchValue) =>
    product.extProductCategory !== undefined &&
    product.extProductCategory !== null &&
    product.extProductCategory.toString().startsWith(searchValue.toString()),
  [AutocompleteField.PRODUCT_MASTER]: (product, searchValue) => {
    if (
      product.productMasterId !== null &&
      product.productMasterId !== undefined
    ) {
      return product.productMasterId
        .toString()
        .toString()
        .startsWith(searchValue);
    }
    return false;
  },
  [AutocompleteField.SNR]: (product, searchValue) => {
    if (
      product.articleNumberId !== null &&
      product.articleNumberId !== undefined
    ) {
      return product.articleNumberId
        .toString()
        .toString()
        .startsWith(searchValue);
    }
    return false;
  },
};

export const autocompleteUniqueFilter: Record<
  AutocompleteField,
  (first: ViewportProductMaster, second: ViewportProductMaster) => boolean
> = {
  [AutocompleteField.PRODUCT_CATEGORY]: (first, second) =>
    first.extProductCategory !== undefined &&
    first.extProductCategory !== null &&
    first.extProductCategory === second.extProductCategory,
  [AutocompleteField.PRODUCT_MASTER]: (first, second) =>
    first.extProductName !== undefined &&
    first.extProductName !== null &&
    first.extProductName === second.extProductName &&
    first.productMasterId === second.productMasterId,
  [AutocompleteField.SNR]: (first, second) =>
    first.articleNumber !== undefined &&
    first.articleNumber !== null &&
    first.articleNumber === second.articleNumber &&
    first.articleNumberId === second.articleNumberId,
};
