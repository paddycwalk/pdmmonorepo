"use client";

import { useState } from "react";
import "./Layout.scss";
import {
  BoschLogoIcon,
  Button,
  Contexify,
  Headline,
  Icon,
  LayoutBottomLinks,
  Link,
  Notifier,
  Titlebar,
  UserIcon,
} from "@repo/ui";
import { usePathname } from "next/navigation";
import Close from "../../../assets/icons/Close";
import NavigationMenu from "../../../assets/icons/NavigationMenu";

export interface LayoutProps {
  children: React.ReactNode;
  links: { href: string; label: string; icon: React.ReactNode }[];
  bottomLinks?: { href: string; label: string }[];
  profileMenu?: React.ReactNode;
  appTitle?: string;
  goBack?: boolean;
  pageTitle?: string;
  languageSelector?: boolean;
  surfaceLanguage?: boolean;
}

export const Layout = ({
  children,
  links,
  bottomLinks,
  profileMenu,
  appTitle,
  goBack,
  pageTitle,
  languageSelector,
  surfaceLanguage,
}: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <html lang="de">
      <body>
        <div
          className={`Layout ${isMenuOpen ? "Layout-open" : "Layout-closed"}`}
        >
          <div className="Layout_supergraphic"></div>
          <aside className="Layout_aside">
            <nav className="Layout_nav">
              <div>
                <Button
                  icon={isMenuOpen ? <Close /> : <NavigationMenu />}
                  onClick={toggleMenu}
                  className="Layout_toggleBtn"
                  ariaLabel="Toggle menu"
                />
                <ul>
                  {links.map((link, index) => (
                    <li
                      key={index}
                      className={`Layout_asideItem ${
                        pathname === link.href ? "Layout_asideItem-active" : ""
                      }`}
                    >
                      <Link href={link.href} icon={link.icon}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {bottomLinks && <LayoutBottomLinks bottomLinks={bottomLinks} />}
            </nav>
          </aside>
          <header className="Layout_header">
            <Headline tag="h2" bold size="large">
              {appTitle}
            </Headline>
            <div className="Layout_box">
              <Contexify
                menuId="profileMenu"
                customComponent={profileMenu}
                clickType="left"
                defaultClass
              >
                <Button
                  icon={<UserIcon />}
                  ariaLabel="ProfileMenu"
                  integrated
                ></Button>
              </Contexify>
              <Icon svg={<BoschLogoIcon />} className="Layout_logo"></Icon>
            </div>
          </header>
          <Titlebar
            goBack={goBack}
            pageTitle={pageTitle}
            languageSelector={languageSelector}
            surfaceLanguage={surfaceLanguage}
          ></Titlebar>
          <Notifier />
          <main className="Layout_main">{children}</main>
        </div>
      </body>
    </html>
  );
};
