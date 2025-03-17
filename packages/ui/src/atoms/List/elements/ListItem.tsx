import clsx from "clsx";
import "./ListItem.scss";

export interface ListItemProps {
  readonly children: React.ReactNode;
  readonly style?: "default" | "error";
}

export const ListItem = ({
  children,
  style,
}: ListItemProps): React.ReactElement => {
  return (
    <li className={clsx("List_item", { [`List_item-${style}`]: style })}>
      <div className={clsx("List_text", { [`List_text-${style}`]: style })}>
        {children}
      </div>
    </li>
  );
};
