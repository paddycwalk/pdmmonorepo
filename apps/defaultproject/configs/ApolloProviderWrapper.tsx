"use client";

import { ApolloProvider } from "@apollo/client";
import client from "@repo/global-functions/Clients/securedPubGenBackendServer";

export default function ApolloProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
