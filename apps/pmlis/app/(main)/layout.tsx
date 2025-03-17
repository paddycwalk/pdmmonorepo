import ApolloProviderWrapper from "../../configs/ApolloProviderWrapper";
import { AppProvider } from "../../hooks/useAppContext";
import { LayoutMenu } from "../../components/organisms/LayoutMenu/LayoutMenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloProviderWrapper>
      <AppProvider>
        <LayoutMenu>{children}</LayoutMenu>
      </AppProvider>
    </ApolloProviderWrapper>
  );
}
