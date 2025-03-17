import { notifier } from "@repo/ui";
import { ConfMapData, PasswordForm } from "../types/changePassword.types";
import { deleteCookie, getCookie } from "cookies-next";
import { changePassword } from "./changePassword.function";

export const handleChangePassword = (
  values: PasswordForm,
  configMapData: ConfMapData[],
  label: (key: string, defaultText: string) => string,
  setIsLoading: (value: boolean) => void,
  setIsOpenChangePassword?: (value: boolean) => void,
  setRedirectToLogin?: (value: boolean) => void,
) => {
  const isValid = configMapData.every(
    (i: ConfMapData) => i.value.isValidate === true,
  );
  if (!isValid) {
    notifier.error(
      label(
        "molecules.profileMenu.changePassword.errorToastFollowRules",
        "Please follow the password rules.",
      ),
    );
    return;
  }

  if (values.newPassword !== values.repeatNewPassword && isValid) {
    notifier.error(
      label(
        "molecules.profileMenu.changePassword.errorToastMatchesPassword",
        "Passwords don't match.",
      ),
    );
    return;
  }

  if (getCookie("userId") && isValid && values) {
    setIsLoading(true);

    const change = async () => {
      const userId = Number(getCookie("userId"));
      if (userId) {
        try {
          const response = await changePassword(userId, values);
          if (response) {
            notifier.success(
              label(
                "molecules.profileMenu.changePassword.successToast",
                "Ihr Passwort wurde erfolgreich geändert.",
              ),
            );
            if (setIsOpenChangePassword) {
              setIsOpenChangePassword(false);
            }
            if (setRedirectToLogin) {
              deleteCookie("isMustChangePassword");
              setTimeout(function () {
                setRedirectToLogin(true);
              }, 2000);
            }
          } else {
            notifier.error(
              label(
                "molecules.profileMenu.changePassword.errorToast",
                "Es gab einen Fehler, bitte versuchen Sie es erneut.",
              ),
            );
          }
        } catch (error) {
          notifier.error(
            label(
              "molecules.profileMenu.changePassword.errorToast",
              "Es gab einen Fehler, bitte versuchen Sie es erneut.",
            ),
          );
        } finally {
          setIsLoading(false);
        }
      }
    };
    change();
  } else {
    setIsLoading(false);
  }
};
