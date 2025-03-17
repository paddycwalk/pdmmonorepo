import { Headline } from "../../atoms/Headline/Headline";
import { Image } from "../../atoms/Image/Image";
import { Paragraph } from "../../atoms/Paragraph/Paragraph";
import "./Maintenance.scss";
import maintenanceImage from "../../../assets/images/maintenance.png";
import { Icon } from "../../atoms/Icon/Icon";
import { AlertWarningIcon, BoschLogoIcon } from "../../..";

export const Maintenance = () => {
  return (
    <>
      <div className="Supergraphic" />
      <div className="Maintenance">
        <Icon svg={<BoschLogoIcon />} className="Maintenance_logo"></Icon>
        <div className="Maintenance_content">
          <Icon svg={<AlertWarningIcon />} />
          <div className="Maintenance_text">
            <Headline tag="h1" size="large" bold>
              Maintenance work
            </Headline>
            <Paragraph label="This page is temporarily not available due to scheduled service operations. Sorry for any inconveniences. Please try again later!"></Paragraph>
            <hr />
            <Headline tag="h1" size="large" bold>
              Wartungsarbeiten
            </Headline>
            <Paragraph label="Diese Seite ist aufgrund geplanter Wartungsarbeiten derzeit leider nicht verfügbar. Bitte entschuldigen Sie evtl. Unannehmlichkeiten und versuchen es zu einem späteren Zeitpunkt erneut!"></Paragraph>
          </div>
          <div className="Maintenance_img">
            <Image
              alt="Maintenance"
              height={250}
              width={450}
              src={maintenanceImage}
            ></Image>
          </div>
        </div>
      </div>
    </>
  );
};
