import Cookies from "js-cookie";
import React from "react";
import { useAppContext } from "../../../../hooks/useAppContext";
import { getCookie, setCookie } from "cookies-next";
import { verifyToken } from "@repo/global-functions/Token/verifyToken";
import { DOMAIN } from "@repo/global-functions/Config/globalConfig";

interface Props {
  router: any;
  title: string;
  icon: React.ReactNode;
  link: string;
  target: string;
}

const AppTile: React.FC<Props> = ({
  router,
  title,
  icon,
  link,
  target,
}): React.ReactElement => {
  const { applicationLocale } = useAppContext();

  const clickEvent = async () => {
    setCookie("appUiLocale", applicationLocale.locale, { domain: DOMAIN }); // TODO brauchen wir den noch?
    if (getCookie("userId")) {
      try {
        const userId = Number(Cookies.get("userId"));
        const requesterAppName = "PDM Authentication Server";
        const data = await verifyToken(userId, requesterAppName);

        if (!data) {
          router.push("/login");
        }

        const finalUrl = link + "?lang=" + applicationLocale.locale;
        window.open(finalUrl, target);
      } catch (error) {
        console.error(error);
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="project" onClick={clickEvent}>
      <div className="project_icon">{icon}</div>
      <div className="project_title">{title}</div>
    </div>
  );
};

export default AppTile;
