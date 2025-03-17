import { getCookie } from "cookies-next/client";
import { API_URL } from "../Config/globalConfig";
import { cleanCookie } from "../Cookie/cleanCookie";

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const getRefreshAccessToken = async (): Promise<TokenResponse> => {
  console.log("getRefreshAccessToken");

  const response = await fetch(`${API_URL}token/refresh`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${getCookie("rfToken")}`,
    },
  });

  if (!response.ok) {
    cleanCookie();
    throw new Error(
      `Failed to refresh token: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  };
};
