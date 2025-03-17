import NextLink from "next/link";
import clsx from "clsx";
import "./Link.scss";
import { Icon } from "../Icon/Icon";

export interface LinkProps {
  href: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  underline?: boolean;
  size?: "default" | "small";
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  ariaLabel?: string;
  ref?: React.Ref<HTMLAnchorElement>;
  className?: string;
}

export const Link = ({
  href,
  children,
  icon,
  underline,
  size = "default",
  onClick,
  ariaLabel,
  ref,
  className,
}: LinkProps) => {
  return (
    <NextLink
      href={href}
      passHref
      className={clsx("Link", className, {
        "Link-icon": icon,
        "Link-underline": underline,
        "Link-small": size === "small",
        "Link-default": size === "default",
      })}
      target={href.startsWith("http") ? "_blank" : undefined}
      onClick={onClick}
      aria-label={ariaLabel}
      ref={ref}
    >
      {icon && <Icon svg={icon}></Icon>}
      <span>{children}</span>
    </NextLink>
  );
};
