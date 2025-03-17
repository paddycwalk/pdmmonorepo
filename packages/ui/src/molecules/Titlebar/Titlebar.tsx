import clsx from "clsx";
import "./Titlebar.scss";
import { Link } from "../../atoms/Link/Link";
import { ArwNodeLIcon, Button, Headline } from "../../..";

interface TitlebarProps {
  className?: string;
  goBack?: boolean;
  pageTitle?: string;
  languageSelector?: boolean;
  surfaceLanguage?: boolean;
  steps?: React.ReactNode;
}

export const Titlebar = ({
  className,
  goBack,
  pageTitle,
  languageSelector,
  surfaceLanguage,
  steps,
}: TitlebarProps) => {
  return (
    <div className={clsx("Titlebar", className)}>
      <div className="Titlebar_left">
        {goBack && (
          <div className="Titlebar_goBack">
            <Link
              href="#"
              icon={<ArwNodeLIcon />}
              onClick={() => window.history.back()}
              ariaLabel="Go back"
            ></Link>
          </div>
        )}
        {pageTitle && (
          <Headline tag="h2" bold>
            {pageTitle}
          </Headline>
        )}
        {languageSelector && <Button>Language</Button>}
      </div>
      <div className="Titlebar_right">
        {surfaceLanguage && <Button>SurfaceLang</Button>}
        {steps}
      </div>
    </div>
  );
};
