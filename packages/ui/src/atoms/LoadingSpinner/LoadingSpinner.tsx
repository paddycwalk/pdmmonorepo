import clsx from "clsx";
import "./LoadingSpinner.scss";

export interface LoadingSpinnerProps {
  size?: "tiny" | "small" | "medium" | "large" | "default";
}

export const LoadingSpinner = ({ size }: LoadingSpinnerProps) => {
  return (
    <div
      className={clsx("LoadingSpinner", size && `LoadingSpinner-size-${size}`)}
    ></div>
  );
};
