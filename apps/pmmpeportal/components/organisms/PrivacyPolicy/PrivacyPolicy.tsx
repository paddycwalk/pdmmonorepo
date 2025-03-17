"use client";

import axios from "axios";
import parse from "html-react-parser";
import React, { JSX, useEffect, useState } from "react";
import { useAppContext } from "../../../hooks/useAppContext";
import { useLabels } from "../../../hooks/useLabels";
import { Panel, notifier } from "@repo/ui";
import "./PrivacyPolicy.scss";
import { API_URL } from "@repo/global-functions/Config/globalConfig";

const PrivacyPolicy = (): React.ReactElement => {
  const { applicationLocale } = useAppContext();

  const label = useLabels();

  const [data, setData] = useState<string | JSX.Element | JSX.Element[]>();

  useEffect(() => {
    let dataUrl;
    const dataUrlDE = `${API_URL}privacyPolicy/de-DE?app=portal`;
    const dataUrlEN = `${API_URL}privacyPolicy/en-GB?app=portal`;

    if (applicationLocale.locale === "en-GB") {
      dataUrl = dataUrlEN;
    } else dataUrl = dataUrlDE;

    axios
      .get(dataUrl)
      .then((response) => {
        const htmlData = parse(response.data);
        setData(htmlData);
        return null;
      })
      .catch((error) => {
        notifier.error(
          label("common.errorBoundary.errorMessage", "##Something get wrong") +
            " " +
            error,
        );
      });
  }, [applicationLocale.locale]);

  return (
    <div className="PrivacyPolicy">
      <Panel>{data}</Panel>
    </div>
  );
};

export default PrivacyPolicy;
