import { getCookie } from "cookies-next/client";
import { API_URL } from "../Config/globalConfig";
import { cleanCookie } from "../Cookie/cleanCookie";

export const verifyToken = async (
  userId: number,
  requesterAppName: string,
): Promise<boolean> => {
  const response = await fetch(`${API_URL}token/verify`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("rfToken")}`,
    },
    body: JSON.stringify({ userId, requesterAppName }),
  });

  if (!response.ok) {
    cleanCookie();
    throw new Error(
      `Failed to verify token: ${response.status} ${response.statusText}`,
    );
  }
  return await response.json();
};
