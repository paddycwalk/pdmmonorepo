import { setCookie } from "cookies-next/client";
import { API_URL, DOMAIN } from "@repo/global-functions/Config/globalConfig";
import { notifier } from "@repo/ui";

export const login = async (
  userName: string,
  password: string,
): Promise<boolean> => {
  if (!userName || !password) {
    return false;
  } else {
    try {
      const response = await fetch(`${API_URL}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });
      if (!response.ok) {
        console.error("Login fehlgeschlagen:", response.statusText);
        return false;
      }
      const data = await response.json();

      setCookie("token", data.access_token, { domain: DOMAIN });
      setCookie("rfToken", data.refresh_token, { domain: DOMAIN });
      setCookie("userId", data.userId, { domain: DOMAIN });

      if (data.mustChangePassword) {
        setCookie("isMustChangePassword", "true");
        location.assign("/setNewPassword");
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
};

export const handleLogin = async (
  values: {
    username: string;
    password: string;
  },
  router: any,
  label: (key: string, defaultText: string) => string,
) => {
  const success = await login(values.username, values.password);

  if (success) {
    router.push("/");
  } else {
    notifier.error(
      label("organisms.login.invalid", "Invalid username or password!"),
    );
  }
};
