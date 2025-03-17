import { useEffect, useState } from "react";
import { useAppContext } from "../../../hooks/useAppContext";
import {
  BarChartSearchDetailIcon,
  ContractIcon,
  DesktopUserHeadsetIcon,
  Headline,
  Hint,
  InfoIcon,
  Link,
  LoadingSpinner,
  MediapoolIcon,
  MoleculeIcon,
  NewsletterIcon,
  PaperplaneIcon,
  ViewportIcon,
} from "@repo/ui";
import { useLabels } from "../../../hooks/useLabels";
import "./Startpage.scss";
import {
  API_COMPGEN,
  API_DQT,
  API_LIS,
  API_PUB,
  API_TEXT,
  API_VIEWPORT,
  MEDIAPOOL_URL,
} from "@repo/global-functions/Clients/pmmpeportal/config";

import { App } from "./types/app.types";
import { useRouter } from "next/navigation";
import AppTile from "./elements/AppTile";
import { getMaintenanceDate } from "./functions/getMaintenanceDate.function";
import DockPrivacySettings from "../../molecules/DockPrivacySettings/DockPrivacySettings";

const Startpage = (): React.ReactElement => {
  const router = useRouter();
  const label = useLabels();
  const { applicationLocale, user, maintenanceData } = useAppContext();

  const [isLoading, setIsLoading] = useState(false);
  const [filteredApps, setFilteredApps] = useState<App[]>([]);

  const apps: App[] = [
    {
      id: "APP$PDM$EXTPRODCAT",
      title: label("common.tool.pubgen", "Publication Generator"),
      icon: <PaperplaneIcon />,
      link: API_PUB,
      target: "_blank",
    },
    {
      id: "APP$PDM$DQT",
      title: label("common.tool.dqt", "Data Quality Tool"),
      icon: <BarChartSearchDetailIcon />,
      link: API_DQT,
      target: "_blank",
    },
    {
      id: "APP$PDM$TEXTED",
      title: label("common.tool.texted", "Text Editor"),
      icon: <ContractIcon />,
      link: API_TEXT,
      target: "_blank",
    },
    {
      id: "APP$PDM$VIEWPORT",
      title: "Portfolio Viewer",
      icon: <ViewportIcon />,
      link: API_VIEWPORT,
      target: "_blank",
    },
    {
      id: "APP$PDM$LIS",
      title: label("common.tool.pmlis", "PM Lifecycle Info Service"),
      icon: <NewsletterIcon />,
      link: API_LIS,
      target: "_blank",
    },
    {
      id: "APP$PDM$COMPGEN",
      title: label("common.tool.compgen", "Composing Generator"),
      icon: <MoleculeIcon />,
      link: API_COMPGEN,
      target: "_blank",
    },
    {
      id: "APP$PDM$SERVICE_DESK",
      title: label("common.tool.service.desk", "PDM Service Desk"),
      icon: <DesktopUserHeadsetIcon />,
      link: "https://kittelberger.atlassian.net/servicedesk/customer/portal/1",
      target: "_blank",
    },
    {
      id: "APP$PDM$MEDIAPOOL",
      title: label("common.tool.product.mediapool", "Product & Media Pool"),
      icon: <MediapoolIcon />,
      link: MEDIAPOOL_URL,
      target: "_blank",
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    if (user && filteredApps.length === 0) {
      const filteredApp = apps.filter((app) => {
        return user.availableApps?.includes(app.id);
      });
      setFilteredApps(filteredApp);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [apps]);

  let content;

  if (isLoading) {
    content = <LoadingSpinner size="small" />;
  } else if (filteredApps?.length) {
    content = (
      <div className="projectsList">
        {filteredApps.map((app: App) => (
          <AppTile
            router={router}
            key={app.id}
            title={app.title}
            icon={app.icon}
            link={app.link}
            target={app.target}
          />
        ))}
      </div>
    );
  } else {
    content = (
      <div className="projectsEmptyList">
        <p className="projectsEmptyList_text">
          {label(
            "organisms.Startpage.textFirst",
            "[You do not yet have access to an application. You can request to the individual applications via the Service-Desk]",
          )}{" "}
          <Link href="https://support.kittelberger.de/servicedesk/customer/portal/6">
            {label("organisms.Startpage.ServiceDesk", "Service-Desk")}
          </Link>
          {label(
            "organisms.Startpage.textSecond",
            "[ or the following mail address:]",
          )}{" "}
          <Link
            href={`mailto:${label("common.mail", "[Mailbox.PM-MPE@de.bosch.com]")}`}
          >
            {label("common.mail", "[Mailbox.PM-MPE@de.bosch.com]")}
          </Link>
        </p>
      </div>
    );
  }

  return (
    <>
      <DockPrivacySettings locale={applicationLocale.locale} />
      <div className="Startpage">
        <Headline tag="h1" size="large" bold>
          {label(
            "organisms.startPage.welcome",
            "[Welcome to the PM-MPE Portal]",
          )}
        </Headline>

        <Hint
          theme="info"
          text={
            getMaintenanceDate(maintenanceData, applicationLocale, label) +
            label(
              "organisms.maintenance.text",
              ", planned maintenance work will take place for the PM-MPE Portal including the microservices.",
            )
          }
          icon={<InfoIcon />}
        />
        {content}
      </div>
    </>
  );
};

export default Startpage;
