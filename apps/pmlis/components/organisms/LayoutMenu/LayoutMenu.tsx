"use client";
import { Layout, NewsletterIcon, ProfileMenu } from "@repo/ui";
import React from "react";
import { useLabels } from "../../../hooks/useLabels";
import { LanguageSwitch } from "../../molecules/LanguageSwitch/LanguageSwitch";

import { ProfileSettings } from "../../molecules/ProfileSettings/ProfileSettings";
import { useAppContext } from "../../../hooks/useAppContext";

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
      label: label("common.tool.pmlis", "##PM-MPE Portal"),
      icon: <NewsletterIcon />,
    },
  ];

  const bottomLinks = [
    {
      href: label(
        "molecules.layout.menu.link.imprintLink",
        "https://www.bosch-homecomfortgroup.com/en/impressum/",
      ),
      label: label("molecules.layout.menu.link.imprint", "Imprint"),
    },
    {
      href: "/privacyPolicy",
      label: label(
        "molecules.layout.menu.link.privacyPolicy",
        "Privacy Policy",
      ),
    },
    {
      href: label(
        "molecules.layout.menu.link.legalNoteLink",
        "[https://www.bosch-homecomfortgroup.com/de/rechtshinweise/]",
      ),
      label: label("molecules.layout.menu.link.legalNote", "Legal"),
    },
  ];

  return (
    <Layout
      appTitle={label("navigation.title.pm_lis", "##PM-LIS")}
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
