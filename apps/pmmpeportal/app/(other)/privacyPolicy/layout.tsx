import { AppProvider } from "../../../hooks/useAppContext";
import { LayoutMenu } from "../../../components/organisms/LayoutMenu/LayoutMenu";

export default function PrivacyPolicyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <LayoutMenu pageTitleKey="molecules.layout.menu.link.privacyPolicy">
        {children}
      </LayoutMenu>
    </AppProvider>
  );
}
