import { Button, Headline, Paragraph, WarningIcon } from "../../..";
import { Icon } from "../../atoms/Icon/Icon";
import "./ErrorBoundary.scss";

export const ErrorBoundary = () => {
  return (
    <div className="ErrorBoundary">
      <Icon svg={<WarningIcon />} />
      <Paragraph label="Oops..!" bold />
      <Headline tag="h1" size="large">
        Page not found...
      </Headline>
      <Button
        theme="primary"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Back to Dashboard
      </Button>
    </div>
  );
};
