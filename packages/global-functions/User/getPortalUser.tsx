import { PortalUser } from "./portalUser";
import { API_URL } from "../Config/globalConfig";
import { getCookie } from "cookies-next/client";
import { cleanCookie } from "../Cookie/cleanCookie";

export const getPortalUser = async (userId: string): Promise<PortalUser> => {
  const userResponse = await fetch(`${API_URL}users/${userId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${getCookie("rfToken")}`,
    },
  });

  if (!userResponse.ok) {
    cleanCookie();
    throw new Error(
      `Failed to refresh token: ${userResponse.status} ${userResponse.statusText}`,
    );
  }

  return await userResponse.json();
};
