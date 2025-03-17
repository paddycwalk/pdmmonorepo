"use client";

import { cleanCookie } from "@repo/global-functions/Cookie/cleanCookie";
import { Button, KeysIcon, LogoutIcon } from "@repo/ui";
import { useLabels } from "../../../hooks/useLabels";
import { useState } from "react";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";

export const ProfileSettings = () => {
  const label = useLabels();
  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);

  const openChangePasswordModal = (): void => {
    setIsOpenChangePassword(true);
  };

  return (
    <>
      <Button onClick={openChangePasswordModal} icon={<KeysIcon />}>
        {label("molecules.profileMenu.changePassword", "Passwort ändern")}
      </Button>
      <Button
        icon={<LogoutIcon />}
        onClick={() => {
          cleanCookie();
        }}
      >
        {label("molecules.profileMenu.logout", "Abmelden")}
      </Button>
      <ChangePasswordModal
        isOpenChangePassword={isOpenChangePassword}
        setIsOpenChangePassword={setIsOpenChangePassword}
      />
    </>
  );
};
