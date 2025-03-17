import ApolloProviderWrapper from "../../../configs/ApolloProviderWrapper";

export default function WatchdogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ApolloProviderWrapper>{children}</ApolloProviderWrapper>;
}
