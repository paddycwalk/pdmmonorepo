"use client";

import {
  Panel,
  Paragraph,
  Textfield,
  Button,
  LoadingSpinner,
  Notifier,
  notifier,
  LayoutBottomLinks,
} from "@repo/ui";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLabels } from "../../../hooks/useLabels";
import "../Login/Login.scss";
import { getBottomLinks } from "../Login/functions/getBottomLinks.function";
import { forgotPassword } from "./functions/forgotPassword.function";

export const ForgotPassword = (): React.ReactElement => {
  const router = useRouter();
  const label = useLabels();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [redirectToLogin, setRedirectToLogin] = useState<boolean>(false);

  const bottomLinks = getBottomLinks(label);

  useEffect(() => {
    if (redirectToLogin) {
      router.push("/login");
    }
  }, [redirectToLogin, router]);

  const handleRequest = async (values: { email: string }): Promise<void> => {
    setIsLoading(true);
    if (values.email) {
      try {
        const response = await forgotPassword(values.email);

        if (response) {
          notifier.success(
            label(
              "organisms.login.forgotPassword.successToast",
              "[Your request was sucessfull. An E-Mail with a one time password will be sent to you. You will be now redirected to login page]",
            ),
          );
          setTimeout(function () {
            setRedirectToLogin(true);
          }, 5000);
        } else {
          notifier.error(
            label(
              "organisms.login.setNewPassword.errorToast",
              "[An error occured. Please try again]",
            ),
          );
        }
      } catch (error) {
        notifier.error(
          label(
            "organisms.login.setNewPassword.errorToast",
            "[An error occured. Please try again]",
          ),
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Notifier />
      <div className="Login">
        <div className="Login_container">
          <Panel
            hdl={label("organisms.login.forgotPassword", "Passwort vergessen")}
            shadow
          >
            <Formik
              initialValues={{ email: "" }}
              onSubmit={async (values, { setSubmitting }) => {
                await handleRequest(values);
                setSubmitting(false);
              }}
            >
              {() => (
                <Form className="Form">
                  <Paragraph
                    label={label(
                      "organisms.login.forgotPassword.intro",
                      "[Introtext]",
                    )}
                    className="Login_intro"
                  ></Paragraph>
                  <Textfield
                    htmlFor="email"
                    id="email"
                    label={label(
                      "organisms.login.forgotPassword.field.email",
                      "E-Mail-Adresse eingeben",
                    )}
                    name="email"
                    type="email"
                    placeholder={label(
                      "organisms.login.forgotPassword.field.email.placeholder",
                      "lorem@lorem.de",
                    )}
                    onChange={() => {}}
                  ></Textfield>

                  <div className="Login_buttons">
                    <Button
                      theme="primary"
                      outline
                      type="button"
                      onClick={() => setRedirectToLogin(true)}
                      disabled={isLoading}
                    >
                      {label("common.abort", "[Abort]")}
                    </Button>
                    <Button theme="primary" type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <LoadingSpinner size="tiny" />
                      ) : (
                        label(
                          "organisms.login.forgotPassword.request",
                          "[Request]",
                        )
                      )}
                    </Button>
                  </div>
                </Form>
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

export default ForgotPassword;
