import "./Paragraph.scss";
import clsx from "clsx";

export interface ParagraphProps {
  label: string | undefined;
  size?: "small" | "medium" | "large";
  color?: "black" | "white" | "gray" | "error";
  className?: string;
  bold?: boolean;
}

export const Paragraph = ({
  label,
  size,
  color = "black",
  className,
  bold,
}: ParagraphProps) => {
  return (
    <p
      className={clsx(
        "Paragraph",
        size && `Paragraph-${size}`,
        `Paragraph-${color}`,
        bold && `Paragraph-bold`,
        className,
      )}
    >
      {label}
    </p>
  );
};
