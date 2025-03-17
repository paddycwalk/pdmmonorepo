"use client";

import { useCallback } from "react";
import { useLabels } from "./useLabels";

const useLocaleText = () => {
  const label = useLabels();
  return useCallback(
    (params: { key: string; defaultValue: string }) => {
      return label("common.grid." + params.key, params.defaultValue);
    },
    [label],
  );
};

export default useLocaleText;
