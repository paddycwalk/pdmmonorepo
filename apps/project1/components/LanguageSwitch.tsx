"use client";

import { Button, CustomLabel } from "@repo/ui";
import { useAppContext } from "../hooks/useAppContext";
import applicationLocales from "@repo/global-functions/Constants/applicationLocales";

export const LanguageSwitch = () => {
  const { switchLocale } = useAppContext();

  return (
    <>
      <Button
        onClick={() => {
          switchLocale(applicationLocales["de-DE"]);
        }}
      >
        <CustomLabel labelKey="common.german" />
      </Button>
      <Button
        onClick={() => {
          switchLocale(applicationLocales["en-GB"]);
        }}
      >
        <CustomLabel labelKey="common.english" />
      </Button>
    </>
  );
};
