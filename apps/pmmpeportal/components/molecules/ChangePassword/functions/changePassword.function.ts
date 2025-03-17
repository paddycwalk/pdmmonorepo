import { API_URL } from "@repo/global-functions/Config/globalConfig";
import { PasswordForm, PasswordRule } from "../types/changePassword.types";
import { getCookie } from "cookies-next/client";

export const changePassword = async (
  userId: number,
  passwordForm: PasswordForm,
): Promise<Response> => {
  const response = await fetch(`${API_URL}changePassword/${userId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("rfToken")}`,
    },
    body: JSON.stringify({
      oldPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
      newPasswordConfirm: passwordForm.repeatNewPassword,
    }),
  });
  return response;
};

export const getPasswordRule = async (
  userId: number,
): Promise<PasswordRule> => {
  const response = await fetch(`${API_URL}passwordRule/${userId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("rfToken")}`,
    },
  });
  return response.json();
};
