import { setCookie } from "cookies-next/client";
import * as Yup from "yup";
import { API_URL, DOMAIN } from "@repo/global-functions/Config/globalConfig";

export const LoginHandling = async (
  userName: string,
  password: string,
): Promise<boolean> => {
  console.log("api url:", API_URL);

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
      console.log("Passwort muss geändert werden");
      // router.push("/setNewPassword");
    }

    return true;
  } catch (error) {
    setCookie("isMustChangePassword", "true");
    console.error("Es gab ein Problem mit der Login Anfrage:", error);
    return false;
  }
};

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Benutzername ist ein Pflichtfeld")
    .min(3, "Der Benutzername muss mindestens 3 Zeichen lang sein"),
  password: Yup.string()
    .required("Passwort ist ein Pflichtfeld")
    .min(6, "Das Passwort muss mindestens 6 Zeichen lang sein"),
});

export const handleLogin = async (
  values: {
    username: string;
    password: string;
  },
  router: any,
  showError: () => void,
) => {
  console.log("values test in handle login:", values);

  const success = await LoginHandling(values.username, values.password);

  if (success) {
    router.push("/dashboard");
  } else {
    showError();
  }
};
