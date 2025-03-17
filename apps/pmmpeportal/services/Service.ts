import { API_URL, DOMAIN } from "@repo/global-functions/Config/globalConfig";
import { setCookie } from "cookies-next";

export default class Service {
  // static async getPasswordRule(
  //   userId: string | null,
  // ): Promise<AxiosResponse<IPasswordRule>> {
  //   return $api.get<IPasswordRule>(`/passwordRule/${userId}`);
  // }
  // static async changePassword(
  //   userId: number,
  //   oldPassword: string | null,
  //   newPassword: string | null,
  //   newPasswordConfirm: string | null,
  // ): Promise<AxiosResponse<boolean>> {
  //   return $api.put<boolean>(`/changePassword/${userId}`, {
  //     oldPassword,
  //     newPassword,
  //     newPasswordConfirm,
  //   });
  // }
  // static async forgotPassword(email: string): Promise<AxiosResponse<boolean>> {
  //   return $insecureApi.post<boolean>("/forgotPassword", { email });
  // }
  // static async getMaintenanceInfo(): Promise<AxiosResponse<IMaintenanceData>> {
  //   return $rootRequest.get<IMaintenanceData>(`/maintenance-date`);
  // }
}
