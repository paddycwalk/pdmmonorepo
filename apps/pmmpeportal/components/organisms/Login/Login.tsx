"use client";

import {
  Panel,
  Headline,
  Paragraph,
  Textfield,
  Button,
  Link,
  LoadingSpinner,
  Notifier,
  LayoutBottomLinks,
} from "@repo/ui";
import { Formik, Form } from "formik";
import React from "react";
import { useRouter } from "next/navigation";
import { useLabels } from "../../../hooks/useLabels";
import "./Login.scss";
import { handleLogin } from "./functions/loginHandler.function";
import { useAppContext } from "../../../hooks/useAppContext";
import { getBottomLinks } from "./functions/getBottomLinks.function";

export const Login = (): React.ReactElement => {
  const router = useRouter();
  const { user } = useAppContext();
  const label = useLabels();

  if (user) {
    router.push("/");
  }

  const bottomLinks = getBottomLinks(label);

  return (
    <>
      <Notifier />
      <div className="Login">
        <div className="Login_container">
          <Panel
            hdl={label("organisms.login.panelTitle", "[Login with IDM]")}
            shadow
          >
            <Formik
              initialValues={{ username: "", password: "" }}
              onSubmit={async (values, { setSubmitting }) => {
                await handleLogin(values, router, label);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, errors, touched, values }) => (
                <Form className="Form">
                  <Headline tag="h1" size="large" bold className="Login_hdl">
                    {label(
                      "organisms.login.name",
                      "[Product Master MPE Portal]",
                    )}
                  </Headline>
                  <Paragraph
                    label={label(
                      "organisms.login.subtitle.title",
                      "[your central access point to maintain your product. Information and use case specifications]",
                    )}
                    className="Login_subHdl"
                  ></Paragraph>
                  <Textfield
                    htmlFor="username"
                    id="username"
                    label={label(
                      "organisms.login.field.username",
                      "Benutzername",
                    )}
                    name="username"
                    type="text"
                    placeholder={label(
                      "organisms.login.field.username.placeholder",
                      "Ihr Benutzername",
                    )}
                    onChange={() => {}}
                  ></Textfield>
                  {touched.username && errors.username && (
                    <div className="error">{errors.username}</div>
                  )}

                  <Textfield
                    htmlFor="password"
                    id="password"
                    label={label("organisms.login.field.password", "Passwort")}
                    name="password"
                    type="password"
                    placeholder={label(
                      "organisms.login.field.password.placeholder",
                      "Ihr Passwort",
                    )}
                    onChange={() => {}}
                  ></Textfield>
                  {touched.password && errors.password && (
                    <div className="error">{errors.password}</div>
                  )}

                  <div className="Login_bottom">
                    <Link href="/forgotPassword">
                      {label(
                        "organisms.login.forgotPassword",
                        "[Forgot password]",
                      )}
                    </Link>
                    <Button
                      theme="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <LoadingSpinner size="tiny" />
                      ) : (
                        <>{label("organisms.login.button.login", "[Login]")}</>
                      )}
                    </Button>
                  </div>
                  <div className="Login_footer">
                    <p>
                      {label(
                        "organisms.login.subtitle.footer",
                        "[For access contact]",
                      )}

                      <Link
                        href={`mailto:${label("common.mail", "[Mailbox.PM-MPE@de.bosch.com]")}`}
                        underline
                        size="small"
                      >
                        {label("common.mail", "[Mailbox.PM-MPE@de.bosch.com]")}
                      </Link>
                    </p>
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

export default Login;
