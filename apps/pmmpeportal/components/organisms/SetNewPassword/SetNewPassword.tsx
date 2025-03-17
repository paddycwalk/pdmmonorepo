"use client";

import {
  Panel,
  Notifier,
  Button,
  LoadingSpinner,
  LayoutBottomLinks,
} from "@repo/ui";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLabels } from "../../../hooks/useLabels";
import "../Login/Login.scss";
import { getBottomLinks } from "../Login/functions/getBottomLinks.function";
import ChangePassword from "../../molecules/ChangePassword/ChangePassword";
import { handleChangePassword } from "../../molecules/ChangePassword/functions/passwordChangeHandler.function";
import { ConfMapData } from "../../molecules/ChangePassword/types/changePassword.types";

export const SetNewPassword = (): React.ReactElement => {
  const router = useRouter();
  const label = useLabels();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [configMapData, setConfigMapData] = useState<ConfMapData[]>([]);
  const [redirectToLogin, setRedirectToLogin] = useState<boolean>(false);

  const bottomLinks = getBottomLinks(label);

  useEffect(() => {
    if (redirectToLogin) {
      router.push("/login");
    }
  }, [redirectToLogin, router]);

  return (
    <>
      <Notifier />
      <div className="Login">
        <div className="Login_container">
          <Panel
            hdl={label(
              "organisms.login.setNewPassword.panel.title",
              "Neues Passwort setzen",
            )}
            shadow
          >
            <Formik
              initialValues={{
                currentPassword: "",
                newPassword: "",
                repeatNewPassword: "",
              }}
              onSubmit={async (values, { setSubmitting }) => {
                if (values) {
                  handleChangePassword(
                    values,
                    configMapData,
                    label,
                    setIsLoading,
                    undefined,
                    setRedirectToLogin,
                  );
                }
                setSubmitting(false);
              }}
            >
              {({ submitForm }) => (
                <>
                  <ChangePassword setConfigMapData={setConfigMapData} />
                  <div className="Login_buttons">
                    <Button
                      outline
                      onClick={() => setRedirectToLogin(true)}
                      type="button"
                      disabled={isLoading}
                    >
                      {label("common.abort", "Abort")}
                    </Button>
                    <Button
                      type="submit"
                      theme="primary"
                      disabled={isLoading}
                      onClick={submitForm}
                    >
                      {isLoading ? (
                        <LoadingSpinner size="tiny" />
                      ) : (
                        label("common.confirm", "Bestätigen")
                      )}
                    </Button>
                  </div>
                </>
              )}
            </Formik>
          </Panel>
        </div>
        <div className="Layout_links">
          <LayoutBottomLinks bottomLinks={bottomLinks} />
        </div>
      </div>
    </>
  );
};

export default SetNewPassword;
