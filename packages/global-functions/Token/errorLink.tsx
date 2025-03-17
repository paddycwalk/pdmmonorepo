import { fromPromise } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setCookie } from "cookies-next/client";
import { getRefreshAccessToken } from "./getRefreshAccessToken";
import { DOMAIN, PORTAL_URL } from "../Config/globalConfig";

type TokenResponse = {
  refreshToken: string;
  accessToken: string;
};

export const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    // Handle GraphQL Errors
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.message.includes("Refresh token expired")) {
          location.assign(`${PORTAL_URL}/login`);
          return;
        }
        if (err.message.includes("ORA-12518")) {
          location.assign("/maintenance");
          return;
        }
      }
    }

    // Handle Network Errors
    if (networkError) {
      console.error(`[Network error]:`, networkError);

      return fromPromise(
        getRefreshAccessToken()
          .catch(() => {
            location.assign(`${PORTAL_URL}/login`);
            return;
          })
          .then((newToken: void | TokenResponse) => {
            if (newToken) {
              console.log("set new access token & refresh token");

              setCookie("token", newToken.accessToken, { domain: DOMAIN });
              setCookie("rfToken", newToken.refreshToken, { domain: DOMAIN });
              operation.setContext({
                headers: {
                  ...operation.getContext().headers,
                  Authorization: `Bearer ${newToken.accessToken}`,
                },
              });
            }
          }),
      ).flatMap(() => forward(operation));

      // if (networkError.message.includes("other-specific-error")) {
      //   location.assign("/maintenance");
      // }
    }
  },
);
