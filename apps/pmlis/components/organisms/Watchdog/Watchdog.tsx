"use client";
import { NEWSLETTER_API_URL } from "@repo/global-functions/Clients/pmlis/config";

import React, { useEffect, useState } from "react";
import { API_URL } from "@repo/global-functions/Config/globalConfig";

interface ServerStatus {
  url: string;
  status: string;
}

const Watchdog = (): React.ReactElement => {
  const backendServers = [NEWSLETTER_API_URL, API_URL];
  const [serverStati, setServerStati] = useState<ServerStatus[]>([]);

  const getServerStatus = async (url: string) => {
    const backendWatchdog = `${url}watchdog`;
    return await fetch(backendWatchdog)
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          throw Error(`Server ${url} not okay`);
        }
      })
      .then((json) => {
        const status: ServerStatus = {
          url,
          status: json.ok === true ? "OK" : "ERROR",
        };

        return status;
      })
      .catch(() => {
        const status: ServerStatus = {
          url,
          status: "ERROR",
        };

        return status;
      });
  };

  const getServerStati = async () => {
    const serverStati = await Promise.all(backendServers.map(getServerStatus));
    return serverStati;
  };

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      const stati = await getServerStati();
      setServerStati(stati);
    };
    initialize();
  }, []);

  let overallStatus = "OK";
  if (serverStati.some((status) => status.status !== "OK")) {
    overallStatus = "ERROR";
  }

  const stati = serverStati.map((status) => (
    <div key={status.url}>
      {status.url}: {status.status}
      <br />
      --------------------------------
      <br />
    </div>
  ));

  return (
    <html lang="de">
      <body>
        <pre>
          {overallStatus}
          <br />
          --------------------------------
          <br />
          {stati}
        </pre>
      </body>
    </html>
  );
};

export default Watchdog;
