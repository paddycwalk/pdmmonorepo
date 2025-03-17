"use client";

import { Button, CheckIcon } from "@repo/ui";
import applicationLocales from "@repo/global-functions/Constants/applicationLocales";
import { useAppContext } from "../../../hooks/useAppContext";
import { useLabels } from "../../../hooks/useLabels";

export const LanguageSwitch = () => {
  const { switchLocale } = useAppContext();
  const { applicationLocale } = useAppContext().state;
  const label = useLabels();

  return (
    <>
      <Button
        onClick={() => {
          switchLocale(applicationLocales["de-DE"]);
        }}
        icon={
          applicationLocale.clId == applicationLocales["de-DE"]?.clId ? (
            <CheckIcon />
          ) : null
        }
        iconPosition="right"
        style={
          applicationLocale.clId == applicationLocales["de-DE"]?.clId
            ? { fontWeight: "bold" }
            : {}
        }
      >
        {label("molecules.profileMenu.systemLanguage.german", "German")}
      </Button>
      <Button
        onClick={() => {
          switchLocale(applicationLocales["en-GB"]);
        }}
        icon={
          applicationLocale.clId == applicationLocales["en-GB"]?.clId ? (
            <CheckIcon />
          ) : null
        }
        iconPosition="right"
        style={
          applicationLocale.clId == applicationLocales["en-GB"]?.clId
            ? { fontWeight: "bold" }
            : {}
        }
      >
        {label("molecules.profileMenu.systemLanguage.english", "English")}
      </Button>
    </>
  );
};
