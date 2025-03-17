import type { Metadata } from "next";
import ApolloProviderWrapper from "../../configs/ApolloProviderWrapper";
import { AppProvider } from "../../hooks/useAppContext";
import { LayoutMenu } from "../../components/organisms/LayoutMenu/LayoutMenu";

export const metadata: Metadata = {
  title: "Portfolio Viewer | PortView",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloProviderWrapper>
      <AppProvider>
        <LayoutMenu pageTitleKey={"organisms.Viewport.title"}>
          {children}
        </LayoutMenu>
      </AppProvider>
    </ApolloProviderWrapper>
  );
}
