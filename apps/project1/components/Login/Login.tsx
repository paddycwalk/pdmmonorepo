"use client";

import {
  Panel,
  Headline,
  Paragraph,
  Textfield,
  Button,
  notifier,
  Link,
} from "@repo/ui";
import { Formik, Form } from "formik";
import React from "react";
import { handleLogin, validationSchema } from "./functions/LoginHandling";
import { useRouter } from "next/navigation";
import { useLabels } from "../../hooks/useLabels";
import "./Login.scss";

export const Login = () => {
  const router = useRouter();
  const label = useLabels();
  const showError = () => notifier.error(label("common.error", ""));

  return (
    <div className="Login">
      <div className="Login_container">
        <Panel hdl="Login with IDM" shadow>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={async (values, { setSubmitting }) => {
              console.log("login formik values:", values);
              await handleLogin(values, router, showError);
              setSubmitting(false);
            }}
            validationSchema={validationSchema}
          >
            {({ isSubmitting, errors, touched, values }) => (
              <Form className="Form">
                <Headline tag="h1" size="large" bold className="Login_hdl">
                  Product Master MPE Portal
                </Headline>
                <Paragraph
                  label="your central access point to maintain your product. Information and
            use case specifications"
                  className="Login_subHdl"
                ></Paragraph>
                <Textfield
                  htmlFor="username"
                  id="username"
                  label="User name"
                  name="username"
                  type="text"
                  placeholder="Your user name"
                  onChange={(e) => {
                    console.log("Username changed to:", e.target.value);
                  }}
                ></Textfield>
                {touched.username && errors.username && (
                  <div className="error">{errors.username}</div>
                )}

                <Textfield
                  htmlFor="password"
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Your password"
                  onChange={(e) => {
                    console.log("Password changed to:", e.target.value);
                  }}
                ></Textfield>
                {touched.password && errors.password && (
                  <div className="error">{errors.password}</div>
                )}

                <div className="Login_footer">
                  <Link href="/forgot-password">Forgot password</Link>
                  <Button theme="primary" type="submit" disabled={isSubmitting}>
                    Login
                  </Button>
                </div>
                <Link href="mailto:Mailbox.PM-MPE@de.bosch.com" underline>
                  Mailbox.PM-MPE@de.bosch.com
                </Link>
              </Form>
            )}
          </Formik>
        </Panel>
      </div>
    </div>
  );
};
