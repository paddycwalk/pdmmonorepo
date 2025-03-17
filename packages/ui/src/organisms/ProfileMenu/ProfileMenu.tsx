"use client";

import { Headline, Paragraph } from "../../..";
import "./ProfileMenu.scss";

export interface MeData {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface ProfileMenuProps {
  meData?: MeData;
  role?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

export const ProfileMenu = ({
  meData,
  role,
  leftContent,
  rightContent,
}: ProfileMenuProps) => {
  return (
    <div className="ProfileMenu">
      <div className="ProfileMenu_infos">
        <div className="ProfileMenu_avatar">PS</div>
        <div className="ProfileMenu_names">
          <Paragraph label={role} size="small" color="gray"></Paragraph>
          <Headline tag="h3" bold>
            {(meData?.firstName || "") + " " + (meData?.lastName || "")}
          </Headline>
          <Paragraph label={meData?.email || ""}></Paragraph>
        </div>
      </div>
      <div className="ProfileMenu_actions">
        <div className="ProfileMenu_left">
          <Paragraph
            label="System language"
            size="small"
            color="gray"
          ></Paragraph>
          {leftContent}
        </div>
        <div className="ProfileMenu_right">
          <Paragraph label="User account" size="small" color="gray"></Paragraph>
          {rightContent}
        </div>
      </div>
    </div>
  );
};
