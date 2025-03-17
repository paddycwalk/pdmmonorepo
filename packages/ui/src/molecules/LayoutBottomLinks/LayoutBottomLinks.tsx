"use client";

import { Link } from "@repo/ui";
import "./LayoutBottomLinks.scss";

export interface LayoutBottomLinksProps {
  bottomLinks?: { href: string; label: string }[];
}

export const LayoutBottomLinks = ({ bottomLinks }: LayoutBottomLinksProps) => {
  return (
    bottomLinks && (
      <ul className="Layout_bottomLinks">
        {bottomLinks.map((link) => (
          <li
            key={link.href}
            // className={`Layout_asideItem ${
            //   pathname === link.href ? "Layout_asideItem-active" : ""
            // }`}
          >
            <Link href={link.href} size="small">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    )
  );
};
