"use client";

import { cleanCookie } from "@repo/global-functions/Cookie/cleanCookie";
import { ArwNodeLIcon, Button, LogoutIcon } from "@repo/ui";

import { useLabels } from "../../../hooks/useLabels";
import { PORTAL_URL } from "@repo/global-functions/Config/globalConfig";

export const ProfileSettings = () => {
  const label = useLabels();

  return (
    <>
      {/* todo setUser to null, clean storage in case we still use localstorage,
      redirect to login page in case cleaning the cookie is not enough */}
      <Button
        icon={<LogoutIcon />}
        onClick={() => {
          cleanCookie();
        }}
      >
        {label("molecules.profileMenu.logout", "Abmelden")}
      </Button>
      <Button
        icon={<ArwNodeLIcon />}
        onClick={(): void => {
          window.location.href = `${PORTAL_URL}`;
        }}
      >
        {label(
          "Layout.UserSettings.SystemLanguage.backTo",
          "##Back to MPE Portal",
        )}
      </Button>
    </>
  );
};
