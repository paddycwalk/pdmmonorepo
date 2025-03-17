/* eslint-disable @next/next/no-sync-scripts */
"use client";
import Head from "next/head";
import React from "react";

interface Props {
  locale?: string;
}

const DockPrivacySettings = ({ locale }: Props): React.ReactElement => {
  return (
    <>
      <Head>
        <script
          type="module"
          src="https://dock.ui.bosch.tech/releases/4-latest/build/dock-privacy-settings.esm.js"
        />
        <script src="https://dock.ui.bosch.tech/releases/4-latest/build/dock-privacy-settings.js" />
      </Head>
      {/* @ts-ignore */}
      <dock-privacy-settings
        consent-categories="disable-consent-convenience, disable-consent-marketing, disable-consent-analysis"
        link-url-policy="/privacyPolicy"
        locale={locale}
      />
    </>
  );
};

export default DockPrivacySettings;
