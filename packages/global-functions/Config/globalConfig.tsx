export let API_URL: string;
export let PORTAL_URL: string;
export let DOMAIN: string;

const env = process.env.CUSTOM_ENV || "unknown";

console.log("env", env);

switch (env) {
  case "production":
    API_URL = "https://backend-pm-mpe.bosch-homecomfort.com/";
    PORTAL_URL = "https://pm-mpe-portal.bosch-homecomfort.com";
    DOMAIN = ".bosch-homecomfort.com";
    break;
  case "review":
    API_URL = "https://backend-pm-mpe-portal.kittelberger.net/";
    PORTAL_URL = "https://bosch-hc-pm-mpe-portal-frontend.kittelberger.net";
    DOMAIN = ".kittelberger.net";
    break;
  case "remote":
    API_URL = "https://backend-pm-mpe-portal.kittelberger.net/";
    PORTAL_URL = "http://localhost:3000";
    DOMAIN = "localhost";
    break;
  case "development":
    // VIEWPORT_API_URL = "http://localhost:8080/viewport-backend-dev/";
    API_URL = "https://backend-pm-mpe-portal.kittelberger.net/";
    PORTAL_URL = "http://localhost:3000";
    DOMAIN = "localhost";
    break;
  default:
    throw new Error(`ERROR matching server config - ${env}`);
}
