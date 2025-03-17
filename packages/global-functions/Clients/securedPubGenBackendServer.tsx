import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getCookie } from "cookies-next/client";
import { PUBGEN_API_URL } from "./pubgen/config";
import { errorLink } from "../Token/errorLink";

const httpLink = createHttpLink({
  uri: `${PUBGEN_API_URL}graphql`,
  fetch,
});

const authLink = setContext((_, { headers }) => {
  const token = getCookie("token");

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: errorLink.concat(authLink).concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
