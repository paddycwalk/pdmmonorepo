"use client";

import { ErrorBoundary } from "@repo/ui";
import Error from "next/error";

export default function NotFound() {
  return (
    <html lang="de">
      <body>
        <ErrorBoundary />
        {/* <Error statusCode={404} /> */}
      </body>
    </html>
  );
}
