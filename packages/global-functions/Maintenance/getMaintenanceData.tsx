import { API_URL } from "../Config/globalConfig";
import { getCookie } from "cookies-next/client";
import { MaintenanceData } from "./maintenanceData";

export const getMaintenanceData = async (): Promise<MaintenanceData> => {
  const maintenanceResponse = await fetch(`${API_URL}maintenance-date`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${getCookie("rfToken")}`,
    },
  });

  return await maintenanceResponse.json();
};
