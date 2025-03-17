"use client";

import Watchdog from "../../../components/organisms/Watchdog/Watchdog";
import { API_URL } from "@repo/global-functions/Config/globalConfig";
import { VIEWPORT_API_URL } from "@repo/global-functions/Clients/portview/config";

export default function WatchdogPage() {
  return <Watchdog backendServers={[VIEWPORT_API_URL, API_URL]} />;
}
