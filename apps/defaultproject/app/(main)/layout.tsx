import type { Metadata } from "next";
import {
  FlagIcon,
  HelpBox,
  Layout,
  PaperplaneIcon,
  Paragraph,
  ProfileMenu,
} from "@repo/ui";
import ApolloProviderWrapper from "../../configs/ApolloProviderWrapper";
import { AppProvider } from "../../hooks/useAppContext";
// import { LanguageSwitch } from "../components/LanguageSwitch";
// import { AppProvider } from "../hooks/useAppContext";
// import { ProfileSettings } from "../components/ProfileSettings";

export const metadata: Metadata = {
  title: "dummyproject",
  description: "dummyproject",
};

const links = [
  { href: "/", label: "Home", icon: <PaperplaneIcon /> },
  { href: "/dashboard", label: "Dashboard", icon: <FlagIcon /> },
];

const bottomLinks = [
  { href: "/", label: "Corporate Information" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/legal", label: "Legal" },
];
console.log("RootLayout rendered");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloProviderWrapper>
      <AppProvider>
        <Layout
          links={links}
          bottomLinks={bottomLinks}
          profileMenu={
            <ProfileMenu
              role="Administrator"
              meData={{
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
              }}
              // leftContent={<LanguageSwitch />}
              // rightContent={<ProfileSettings />}
            />
          }
        >
          {children}
          <HelpBox>
            <Paragraph label="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, modi." />
          </HelpBox>
        </Layout>
      </AppProvider>
    </ApolloProviderWrapper>
  );
}
