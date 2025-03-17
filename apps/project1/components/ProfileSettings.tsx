"use client";

import { cleanCookie } from "@repo/global-functions/Cookie/cleanCookie";
import { Button, KeysIcon, LogoutIcon } from "@repo/ui";

export const ProfileSettings = () => {
  return (
    <>
      <Button
        // onClick={() => window.open("/Manual.pdf", "_blank")}
        icon={<KeysIcon />}
      >
        Passwort ändern
      </Button>
      <Button icon={<LogoutIcon />} onClick={cleanCookie}>
        Logout
      </Button>
    </>
  );
};
