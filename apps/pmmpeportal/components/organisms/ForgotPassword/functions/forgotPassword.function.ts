import { API_URL } from "@repo/global-functions/Config/globalConfig";

export const forgotPassword = async (email: string): Promise<boolean> => {
  const response = await fetch(`${API_URL}forgotPassword`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  return response.json();
};
