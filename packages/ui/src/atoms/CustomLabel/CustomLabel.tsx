import React from "react";
import { useLabels } from "../../../../../apps/project1/hooks/useLabels";

export interface Props {
  labelKey: string;
  lang?: string;
  className?: string;
}

export const CustomLabel: React.FC<Props> = ({
  labelKey,
  lang,
  className,
}): React.ReactElement => {
  const label = useLabels(lang);

  return <span className={className}>{label(labelKey, `[${labelKey}]`)}</span>;
};
