// import moment, { locale } from "moment";

// import { useLabels } from "../components/hooks";
// import { IMaintenanceData } from "../models/IMaintenanceData";
// import { DefaultApplicationLocale } from "./defaultApplicationLocale";

// export const getMaintenanceDate = (
//   maintenanceInfo: IMaintenanceData | null,
// ): string => {
//   const label = useLabels();

//   const appLocaleString = localStorage.getItem("appLocale");
//   const initialAppLocale =
//     appLocaleString != null && appLocaleString.length > 0
//       ? JSON.parse(appLocaleString)
//       : DefaultApplicationLocale;

//   initialAppLocale.countryLanguageLangtag === "en-GB"
//     ? locale("en-nz")
//     : locale("de");

//   const start = moment(maintenanceInfo?.startMaintenanceTime);
//   const end = moment(maintenanceInfo?.endMaintenanceTimeTo);

//   let stringTime;

//   if (initialAppLocale.countryLanguageLangtag === "en-GB") {
//     stringTime =
//       label("organisms.maintenance.from", "from") +
//       start.format("D") +
//       " " +
//       start.format("MMMM") +
//       " " +
//       start.format("YYYY") +
//       label("organisms.maintenance.startingAt", " starting at ") +
//       start.format("hh:mm") +
//       label("organisms.maintenance.until", " until ") +
//       end.format("D") +
//       " " +
//       end.format("MMMM") +
//       " " +
//       end.format("YYYY") +
//       " " +
//       end.format("hh:mm a") +
//       " (CET)";
//   } else {
//     stringTime =
//       label("organisms.maintenance.from", " from ") +
//       start.format("DD") +
//       ". " +
//       start.locale("de").format("MMMM") +
//       " " +
//       start.format("YYYY") +
//       label("organisms.maintenance.ab", " ab ") +
//       start.format("HH:mm") +
//       label("organisms.maintenance.clock", " clock") +
//       label("organisms.maintenance.until", " until ") +
//       end.format("DD") +
//       ". " +
//       end.locale("de").format("MMMM") +
//       " " +
//       end.format("YYYY") +
//       " " +
//       end.format("HH:mm") +
//       label("organisms.maintenance.clock", " clock") +
//       " (CET) ";
//   }

//   return stringTime;
// };
