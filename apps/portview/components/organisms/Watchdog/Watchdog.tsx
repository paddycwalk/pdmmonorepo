"use client";

import React, { useEffect, useState } from "react";

interface Props {
  backendServers: string[];
}

interface ServerStatus {
  url: string;
  status: string;
}

const Watchdog: React.FC<Props> = ({ backendServers }): React.ReactElement => {
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

  const stati = serverStati.map((status, index) => (
    <div key={index}>
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
