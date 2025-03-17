import { AppProvider } from "../../hooks/useAppContext";
import { LayoutMenu } from "../../components/organisms/LayoutMenu/LayoutMenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <LayoutMenu pageTitleKey="common.tool.pm.mpe.portal">
        {children}
      </LayoutMenu>
    </AppProvider>
  );
}
