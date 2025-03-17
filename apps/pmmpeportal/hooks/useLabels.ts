import { LABELS } from "../constants";
import { useAppContext } from "./useAppContext";

const warn = (message: string): void => {
  process.env.NODE_ENV === "development" && console.warn(message);
};

const error = (message: string): void => {
  process.env.NODE_ENV === "development" && console.error(message);
};

/**
 * Enables usage of labels from within
 * @param lang The desired language, will draw from LocaleContext if not specified
 */
export const useLabels = (
  lang?: string,
): ((key: string, defaultText: string) => string) => {
  const { applicationLocale } = useAppContext();

  const localeString = applicationLocale.locale;

  return (key: string, defaultValue?: string): string => {
    if (LABELS?.[localeString]?.[key]) {
      return LABELS[localeString][key];
    } else if (defaultValue) {
      warn(
        `Label fallback to default value for key "${key}" in locale ${localeString}, consider adding it to the label constants as: "${key}": "${defaultValue}"`,
      );
      return defaultValue;
    } else {
      error(`Label not found for key "${key}" in locale ${localeString}`);
      return `LL::${localeString}::${key}`;
    }
  };
};
