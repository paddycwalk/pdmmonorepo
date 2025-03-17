export let API_PUB: string;
export let API_TEXT: string;
export let API_DQT: string;
export let API_LIS: string;
export let API_COMPGEN: string;
export let API_VIEWPORT: string;
export let MEDIAPOOL_URL: string;

const env = process.env.CUSTOM_ENV || "unknown";

console.log("env", env);

switch (env) {
  case "production":
    API_PUB = "https://mpe-pubgen.bosch-homecomfort.com/";
    API_TEXT = "https://mpe-texted.bosch-homecomfort.com/";
    API_DQT = "https://mpe-dqt.bosch-homecomfort.com/";
    API_LIS = "https://mpe-pmlis.bosch-homecomfort.com/";
    API_COMPGEN = "https://mpe-compgen.bosch-homecomfort.com/";
    API_VIEWPORT = "https://mpe-viewport.bosch-homecomfort.com/";
    MEDIAPOOL_URL = "https://mpe-pmp.bosch-homecomfort.com/pdm-mediapool/";
    break;
  case "development":
    API_PUB = "http://localhost:3003/";
    API_TEXT = "http://localhost:3004/";
    API_DQT = "http://localhost:8001/";
    API_LIS = "http://localhost:3006/";
    API_VIEWPORT = "http://localhost:3007/";
    API_LIS = "http://localhost:3006/";
    API_COMPGEN =
      "https://bosch-hc-composing-generator-frontend.kittelberger.net/";
    MEDIAPOOL_URL = "https://localhost:8443/pdm-mediapool-rvw/";
    break;
  case "review":
    API_PUB =
      "https://bosch-hc-publication-generator-frontend.kittelberger.net/";
    API_TEXT = "https://bosch-hc-text-editor-frontend.kittelberger.net/";
    API_DQT = "https://bosch-hc-data-quality-tool-frontend.kittelberger.net/";
    API_LIS = "https://bosch-hc-pm-lis-frontend.kittelberger.net/";
    API_COMPGEN =
      "https://bosch-hc-composing-generator-frontend.kittelberger.net/";
    API_VIEWPORT = "https://bosch-hc-viewport-frontend.kittelberger.net/";
    MEDIAPOOL_URL =
      "https://rvw-advastamediapool.kittelberger.net/pdm-mediapool-rvw/";
    break;
  default:
    throw new Error(`ERROR matching server config - ${env}`);
}
