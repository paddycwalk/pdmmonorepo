"use client";

import React, { useState } from "react";
import { useLabels } from "../../../hooks/useLabels";
import "./NewsletterRegistry.scss";
import { Button, Headline, LoadingSpinner, Panel, notifier } from "@repo/ui";
import { useMutation, useQuery } from "@apollo/client";
import {
  NewsletterData,
  NewsletterRegistrationInput,
  RegisterVariables,
  Variables,
} from "./types/newsletter.types";
import { REGISTER_FOR_NEWSLETTER } from "./mutations/register.mutation";
import { GET_NEWSLETTER_INFORMATIONS } from "./queries/newsletterInformations.query";
import { DEREGISTER_FROM_NEWSLETTER } from "./mutations/deregister.mutation";
import { Form, Formik } from "formik";

import { useAppContext } from "../../../hooks/useAppContext";
import clsx from "clsx";
import DropdownSelector from "./elements/DropdownSelector";

const NewsletterRegistry = (): React.ReactElement => {
  const label = useLabels();
  const { applicationLocale } = useAppContext();

  const [isDeregister, setIsDeregister] = useState<boolean>(false);
  const [registerNewsletter, { loading: registerLoading }] = useMutation<
    NewsletterData,
    RegisterVariables
  >(REGISTER_FOR_NEWSLETTER);

  const [deregisterFromNewsletter, { loading: deregisterLoading }] =
    useMutation<NewsletterData, RegisterVariables>(DEREGISTER_FROM_NEWSLETTER);

  const variables: Variables = {
    clId: Number(applicationLocale.clId),
  };

  const { data, loading: loadingNewsletterInformation } = useQuery<
    NewsletterData,
    Variables
  >(GET_NEWSLETTER_INFORMATIONS, {
    variables,
    fetchPolicy: "no-cache",
  });

  const deregister = (): void => {
    deregisterFromNewsletter()
      .then(() => {
        notifier.success(
          label(
            "organisms.newsletterRegistry.deregister.success",
            "##Sie haben sich erfolgreich abgemeldet",
          ),
        );
        setIsDeregister(true);
      })
      .catch((error) => {
        notifier.error(
          label("common.error.occured", "##Irgendwas funktioniert nicht") +
            " " +
            error,
        );
      });
  };

  const onsubmit = (values: Record<string, any>): void => {
    const newsletterRegisterInput: NewsletterRegistrationInput = {
      registeredCsos: [],
      registeredUseCases: [],
    };
    const errorObject: { errorFields: string[] } = { errorFields: [] };
    if (values["Cso"]) {
      if ((values["Cso"] as string) === "") {
        errorObject.errorFields.push(label("common.cso", "##Cso"));
      } else {
        newsletterRegisterInput.registeredCsos = values["Cso"];
      }
    } else {
      errorObject.errorFields.push(label("common.cso", "##Cso"));
    }
    if (values["UseCase"]) {
      if ((values["UseCase"] as string) === "") {
        errorObject.errorFields.push(label("common.useCase", "##UseCase"));
      } else {
        newsletterRegisterInput.registeredUseCases = values["UseCase"];
      }
    } else {
      errorObject.errorFields.push(label("common.useCase", "##UseCase"));
    }

    if (errorObject.errorFields.length > 0) {
      notifier.error(
        label(
          "organisms.newsletterRegistry.form.validation.error",
          "Bitte füllen Sie folgende Felder aus",
        ) +
          " " +
          errorObject.errorFields.join(", "),
      );
    } else {
      const variables: RegisterVariables = {
        newsletterRegistrationInput: newsletterRegisterInput,
      };
      registerNewsletter({
        variables,
      })
        .then(() => {
          notifier.success(
            label(
              "organisms.newsletterRegistry.form.submit.success",
              "##Sie haben sich erfolgreich angemeldet",
            ),
          );
        })
        .catch((error) => {
          notifier.error(
            label("common.error.occured", "##Irgendwas funktioniert nicht") +
              " " +
              error,
          );
        });
    }
  };

  return (
    <div className={clsx("NewsletterRegistry")}>
      <div className={clsx("NewsletterRegistry_introText")}>
        <Headline tag="h1" size="large" bold>
          {label(
            "organisms.newsletterRegistry.headline",
            "##Newsletter Anmeldung",
          )}
        </Headline>
        <p className={clsx("NewsletterRegistry_hint")}>
          {label(
            "organisms.newsletterRegistry.general.hint",
            "##Bitte wählen Sie Ihre Interessen aus",
          )}
        </p>
        <p className={clsx("NewsletterRegistry_hint")}>
          {label(
            "organisms.newsletterRegistry.select.all.hint",
            "##Mit alle auswählen können Sie alle auswählen",
          )}
        </p>
        <p className={clsx("NewsletterRegistry_hint")}>
          {label(
            "organisms.newsletterRegistry.update.hint",
            "##Bitte wählen Sie Ihre Interessen aus",
          )}
        </p>
      </div>
      <Panel>
        {loadingNewsletterInformation ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <LoadingSpinner size="small" />
          </div>
        ) : (
          <>
            <Formik initialValues={{}} onSubmit={onsubmit}>
              {() => (
                <Form>
                  {data && (
                    <DropdownSelector
                      newsletterData={data}
                      isDeregister={isDeregister}
                      setIsDeregister={setIsDeregister}
                    />
                  )}
                  <div className={clsx("NewsletterRegistry_content-bottom")}>
                    {registerLoading ? (
                      <LoadingSpinner size="tiny" />
                    ) : (
                      <Button theme="primary" type="submit">
                        {label(
                          "organisms.newsletterRegistry.button.submit",
                          "##Submit",
                        )}
                      </Button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
            <div className={clsx("NewsletterRegistry_deregister")}>
              <hr></hr>
              <p>
                {label(
                  "organisms.newsletterRegistry.deregister.hint",
                  "##Deregister hint",
                )}
              </p>
              {deregisterLoading ? (
                <LoadingSpinner size="tiny" />
              ) : (
                <Button theme="primary" type="button" onClick={deregister}>
                  {label(
                    "organisms.newsletterRegistry.button.deregister",
                    "##Deregister",
                  )}
                </Button>
              )}
            </div>
          </>
        )}
      </Panel>
    </div>
  );
};

export default NewsletterRegistry;
