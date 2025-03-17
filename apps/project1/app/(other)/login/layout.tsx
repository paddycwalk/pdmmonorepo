import { ReactNode } from "react";
import { AppProvider } from "../../../hooks/useAppContext";
import ApolloProviderWrapper from "../../ApolloProviderWrapper";

interface LoginLayoutProps {
  children: ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <ApolloProviderWrapper>
      <AppProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </AppProvider>
    </ApolloProviderWrapper>
  );
}
