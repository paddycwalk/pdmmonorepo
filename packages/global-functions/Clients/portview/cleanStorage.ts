import Cookies from "js-cookie";
import { DOMAIN } from "../../Config/globalConfig";

export const cleanStorage = (): void => {
  localStorage.clear();
  Cookies.remove("isUseCookie", { domain: `${DOMAIN}` });
  Cookies.remove("userId", { domain: `${DOMAIN}` });
  Cookies.remove("token", { domain: `${DOMAIN}` });
  Cookies.remove("rfToken", { domain: `${DOMAIN}` });
};
