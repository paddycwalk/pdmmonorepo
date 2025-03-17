import "./Label.scss";

export interface LabelProps {
  htmlFor: string;
  label: string;
  className?: string;
  id?: string;
}

export const Label = ({ htmlFor, label, className, id }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={`Label ${className}`} id={id}>
      {label}
    </label>
  );
};
