import "./ProgressBar.scss";

export interface ProgressBarProps {
  value?: number;
  max?: number;
}

export const ProgressBar = ({ value, max }: ProgressBarProps) => {
  return <progress className="ProgressBar" value={value} max={max}></progress>;
};
