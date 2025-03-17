"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCookie, setCookie } from "cookies-next";
import ApplicationLocale from "@repo/global-functions/Types/applicationLocale";
import defaultLocale from "@repo/global-functions/Constants/defaultLocale";
import applicationLocales from "@repo/global-functions/Constants/applicationLocales";
import { MaintenanceData } from "@repo/global-functions/Maintenance/maintenanceData";
import { getMaintenanceData } from "@repo/global-functions/Maintenance/getMaintenanceData";
import { PortalUser } from "@repo/global-functions/User/portalUser";
import { getPortalUser } from "@repo/global-functions/User/getPortalUser";

// 1. Typen für den Context-Wert definieren
interface AppContextType {
  applicationLocale: ApplicationLocale;
  switchLocale: (locale: ApplicationLocale | undefined) => void;
  user: PortalUser | null;
  setUser: (user: PortalUser | null) => void;
  maintenanceData: MaintenanceData | null;
}

// 2. Context erstellen
const AppContext = createContext<AppContextType | undefined>(undefined);

// 3. Provider-Komponente
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Zustand aus Cookies lesen und als Initialwert setzen
  const [applicationLocale, setApplicationLocale] = useState<ApplicationLocale>(
    () => {
      if (
        getCookie("locale") &&
        getCookie("locale") === applicationLocales["en-GB"]?.locale
      ) {
        return applicationLocales["en-GB"] ?? defaultLocale;
      } else {
        return defaultLocale;
      }
    },
  );

  const [user, setUser] = useState<PortalUser | null>(() => {
    const userId = getCookie("userId") as string;
    if (userId) {
      getPortalUser(userId).then((meUser) => setUser(meUser));
    }
    return null;
  });

  const [maintenanceData, setMaintenanceData] =
    useState<MaintenanceData | null>(() => {
      if (getCookie("rfToken")) {
        getMaintenanceData().then((data) => setMaintenanceData(data));
      }
      return null;
    });

  // Locale in Cookies speichern, wenn es sich ändert
  useEffect(() => {
    setCookie("locale", applicationLocale.locale, { path: "/" });
  }, [applicationLocale]);

  const switchLocale = (applicationLocale: ApplicationLocale | undefined) => {
    setApplicationLocale(applicationLocale || defaultLocale);
  };

  // maintenance redirect
  useEffect(() => {
    if (
      maintenanceData?.maintenanceTime &&
      location.pathname !== "/maintenance"
    ) {
      location.assign("/maintenance");
    }
  }, [maintenanceData]);

  return (
    <AppContext.Provider
      value={{
        applicationLocale,
        switchLocale,
        user,
        setUser,
        maintenanceData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 5. Custom Hook für einfacheren Zugriff
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
