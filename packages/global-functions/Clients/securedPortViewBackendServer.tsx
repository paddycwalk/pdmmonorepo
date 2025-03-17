import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getCookie } from "cookies-next/client";
import { VIEWPORT_API_URL } from "./portview/config";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";
import { errorLink } from "../Token/errorLink";

const httpLink = createHttpLink({
  uri: `${VIEWPORT_API_URL}graphql`,
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

const removeTypenameLink = removeTypenameFromVariables();

const client = new ApolloClient({
  link: errorLink.concat(authLink).concat(removeTypenameLink).concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
