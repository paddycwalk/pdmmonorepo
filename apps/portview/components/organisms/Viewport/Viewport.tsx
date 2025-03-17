"use client";

import {
  Button,
  DocumentDownloadIcon,
  Dropdown,
  DropdownOption,
  LoadingSpinner,
  notifier,
  Panel,
} from "@repo/ui";
import React, { useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import { FieldProps } from "formik/dist/Field";
import {
  ViewportCsoData,
  ViewportCsoVariables,
  ViewportDownloadParams,
  ViewportDownloadResult,
} from "../../../types/viewport.type";
import { ViewportGridColumn } from "../../molecules/ViewportGrid/types/viewportGrid.types";
import { useLabels } from "../../../hooks/useLabels";
import { useAppContext } from "../../../hooks/useAppContext";
import { GET_VIEWPORT_CSOS } from "../../../queries/queries";
import { TRIGGER_VIEWPORT_DOWNLOAD } from "../../../mutations/mutations";
import ViewportGrid from "../../molecules/ViewportGrid/ViewportGrid";

import "./Viewport.scss";

const convertViewportCsoDataToDropdownItems = (
  data: ViewportCsoData,
): DropdownOption[] => {
  return data.viewportCsos.map((cso) => {
    return {
      value: cso.csoId,
      label: cso.csoName,
    };
  });
};

interface ViewportProps {}

const Viewport: React.FC<ViewportProps> = (): React.ReactElement => {
  let storageColumnString: string | null = null;
  if (typeof window !== "undefined" && window.localStorage) {
    storageColumnString = localStorage.getItem("viewportGridColumns");
  }
  const columnsFromLocalStorage: ViewportGridColumn[] =
    storageColumnString != null ? JSON.parse(storageColumnString) : [];

  const label = useLabels();
  const errorToast = notifier["error"];
  const infoToast = notifier["info"];
  const { state } = useAppContext();
  const [selectedCso, setSelectedCso] = useState<string>("");
  const [viewportGridColumns, setViewportGridColumns] = useState<
    ViewportGridColumn[]
  >(columnsFromLocalStorage);
  const viewportCsoVariables: ViewportCsoVariables = {
    uiClId: Number(state.applicationLocale.clId),
  };
  const { data, loading: loadingViewportCso } = useQuery<
    ViewportCsoData,
    ViewportCsoVariables
  >(GET_VIEWPORT_CSOS, {
    variables: viewportCsoVariables,
  });
  const [triggerViewportDownload, { loading: downloadTriggerLoading }] =
    useMutation<ViewportDownloadResult, ViewportDownloadParams>(
      TRIGGER_VIEWPORT_DOWNLOAD,
    );

  return (
    <div className={"Viewport"}>
      <div className={"Viewport_introText"}>
        <h1>
          {label(
            "organisms.Viewport.headline",
            "##Welcome to Portfolio Viewer",
          )}
        </h1>
        <p className={"Viewport_hint"}>
          {label(
            "organisms.Viewport.subheadline",
            "##Here you can find the active portfolio of a country or publication....",
          )}
        </p>
      </div>
      <Panel>
        {loadingViewportCso ? (
          <LoadingSpinner />
        ) : (
          <>
            <Formik initialValues={{ selectedCso }} onSubmit={() => {}}>
              {({ values, setFieldValue }) => (
                <Form>
                  {data && (
                    <>
                      <div className={"Viewport_csoSelect"}>
                        <p>
                          {label(
                            "organisms.Viewport.select.cso",
                            "##Please select the brand, country and use case...",
                          )}
                        </p>
                        <div className={"Viewport_downloadButton"}>
                          <Button
                            disabled={!selectedCso}
                            theme={"primary"}
                            icon={<DocumentDownloadIcon />}
                            onClick={async () => {
                              const variables: ViewportDownloadParams = {
                                csoId: Number(selectedCso),
                                cols: viewportGridColumns,
                              };
                              const result = await triggerViewportDownload({
                                variables,
                              });
                              if (result.data?.downloadViewport) {
                                infoToast(
                                  label(
                                    "organisms.Viewport.download.success",
                                    "##Ihre Download Anfrage wurde erfolgreich bearbeitet.",
                                  ),
                                );
                              } else {
                                errorToast(
                                  label(
                                    "organisms.Viewport.download.error",
                                    "##Es gab ein Problem mit Ihrer Anfrage.",
                                  ),
                                );
                              }
                            }}
                          >
                            {downloadTriggerLoading ? (
                              <LoadingSpinner />
                            ) : (
                              label(
                                "organisms.Viewport.download",
                                "##Selected Portfolio",
                              )
                            )}
                          </Button>
                        </div>
                      </div>
                      <Field name={"selectedCso"}>
                        {(props: FieldProps) => (
                          <Dropdown
                            options={convertViewportCsoDataToDropdownItems(
                              data,
                            )}
                            value={selectedCso}
                            label={label("common.cso", "##Marke/Land")}
                            showLabel={true}
                            placeholder={label(
                              "common.placeholder.select",
                              "##Select...",
                            )}
                            onValueChange={(newValue) => {
                              props.form.setFieldValue(
                                "selectedCso",
                                newValue[0],
                              );
                              setFieldValue("selectedCso", newValue);
                              setSelectedCso(newValue as string);
                            }}
                            className={"Viewport_csoDropdown"}
                          />
                        )}
                      </Field>
                      {selectedCso && (
                        <ViewportGrid
                          csoId={selectedCso}
                          columnsChanged={(selectedColumns) =>
                            setViewportGridColumns(selectedColumns)
                          }
                        />
                      )}
                    </>
                  )}
                </Form>
              )}
            </Formik>
          </>
        )}
      </Panel>
    </div>
  );
};

export default Viewport;
