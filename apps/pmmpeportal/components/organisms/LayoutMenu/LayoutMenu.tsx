"use client";
import { Layout, ProfileMenu, ServerConnectivityIcon } from "@repo/ui";
import React from "react";
import { useLabels } from "../../../hooks/useLabels";
import { LanguageSwitch } from "../../molecules/LanguageSwitch/LanguageSwitch";
import { ProfileSettings } from "../../molecules/ProfileSettings/ProfileSettings";
import { useAppContext } from "../../../hooks/useAppContext";
import { getBottomLinks } from "../Login/functions/getBottomLinks.function";

interface LayoutMenuProps {
  children: React.ReactNode;
  pageTitleKey?: string;
}

export const LayoutMenu = ({ children, pageTitleKey }: LayoutMenuProps) => {
  const label = useLabels();
  const { user } = useAppContext();

  const pageTitle = pageTitleKey ? label(pageTitleKey, "") : "";

  const links = [
    {
      href: "/",
      label: label("common.tool.pm.mpe.portal", "PM-MPE Portal"),
      icon: <ServerConnectivityIcon />,
    },
  ];

  const bottomLinks = getBottomLinks(label);

  return (
    <Layout
      appTitle={label("navigation.title.portal", "##PM-MPE Portal")}
      links={links}
      bottomLinks={bottomLinks}
      languageSelector={false}
      surfaceLanguage={false}
      pageTitle={pageTitle}
      profileMenu={
        <ProfileMenu
          meData={{
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
          }}
          leftContent={<LanguageSwitch />}
          rightContent={<ProfileSettings />}
        />
      }
    >
      {children}
    </Layout>
  );
};
