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

// 1. Typen für den State definieren
interface AppState {
  applicationLocale: ApplicationLocale;
}

// 2. Typen für den Context-Wert definieren
interface AppContextType {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  switchLocale: (locale: ApplicationLocale | undefined) => void;
}

// 3. Context erstellen
const AppContext = createContext<AppContextType | undefined>(undefined);

// 4. Provider-Komponente
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Zustand aus Cookies lesen und als Initialwert setzen
    const [state, setState] = useState<AppState>(() => {
      if (
        getCookie("locale") &&
        getCookie("locale") === applicationLocales["en-GB"]
      ) {
        return {
          applicationLocale: applicationLocales["en-GB"] ?? defaultLocale,
        };
      } else {
        return { applicationLocale: defaultLocale };
      }
    });

  // Locale in Cookies speichern, wenn es sich ändert
  useEffect(() => {
    setCookie("locale", state.applicationLocale.locale, { path: "/" });
  }, [state.applicationLocale]);

  const switchLocale = (applicationLocale: ApplicationLocale | undefined) => {
    setState({
      applicationLocale: applicationLocale || defaultLocale,
    });
  };

  return (
    <AppContext.Provider value={{ state, setState, switchLocale }}>
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
