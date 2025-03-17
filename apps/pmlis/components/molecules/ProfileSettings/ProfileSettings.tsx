"use client";

import { cleanCookie } from "@repo/global-functions/Cookie/cleanCookie";
import { ArwNodeLIcon, Button, LogoutIcon } from "@repo/ui";
import { PORTAL_URL } from "@repo/global-functions/Config/globalConfig";
import { useLabels } from "../../../hooks/useLabels";

export const ProfileSettings = () => {
  const label = useLabels();

  return (
    <>
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
