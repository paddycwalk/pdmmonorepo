import moment from "moment";

import { MaintenanceData } from "@repo/global-functions/Maintenance/maintenanceData";
import ApplicationLocale from "@repo/global-functions/Types/applicationLocale";

export const getMaintenanceDate = (
  maintenanceInfo: MaintenanceData | null,
  applicationLocale: ApplicationLocale,
  label: (key: string, defaultText: string) => string,
): string => {
  const locale = applicationLocale.locale;
  moment.locale(locale === "en-GB" ? "en-nz" : "de-DE");

  const start = moment(maintenanceInfo?.startMaintenanceTime);
  const end = moment(maintenanceInfo?.endMaintenanceTimeTo);

  let stringTime = "";

  if (locale === "en-GB") {
    stringTime =
      label("organisms.maintenance.from", "from") +
      start.format("D") +
      " " +
      start.format("MMMM") +
      " " +
      start.format("YYYY") +
      label("organisms.maintenance.startingAt", " starting at ") +
      start.format("hh:mm") +
      label("organisms.maintenance.until", " until ") +
      end.format("D") +
      " " +
      end.format("MMMM") +
      " " +
      end.format("YYYY") +
      " " +
      end.format("hh:mm a") +
      " (CET)";
  } else {
    stringTime =
      label("organisms.maintenance.from", " from ") +
      start.format("DD") +
      ". " +
      start.locale("de").format("MMMM") +
      " " +
      start.format("YYYY") +
      label("organisms.maintenance.ab", " ab ") +
      start.format("HH:mm") +
      label("organisms.maintenance.clock", " clock") +
      label("organisms.maintenance.until", " until ") +
      end.format("DD") +
      ". " +
      end.locale("de").format("MMMM") +
      " " +
      end.format("YYYY") +
      " " +
      end.format("HH:mm") +
      label("organisms.maintenance.clock", " clock") +
      " (CET) ";
  }
  return stringTime;
};
