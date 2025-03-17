import { deleteCookie } from "cookies-next/client";
import { PORTAL_URL } from "../Config/globalConfig";

export const cleanCookie = () => {
  console.log("cleanCookies");

  deleteCookie("token");
  deleteCookie("rfToken");
  deleteCookie("userId");

  deleteCookie("isMustChangePassword");

  // own
  deleteCookie("locale");

  localStorage.clear();

  location.assign(`${PORTAL_URL}/login`);
};
