import { ReactNode } from "react";

interface MaintenanceLayoutProps {
  children: ReactNode;
}

export default function MaintenanceLayout({
  children,
}: MaintenanceLayoutProps) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
