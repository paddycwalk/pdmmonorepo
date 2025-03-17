export let VIEWPORT_API_URL: string;

const env = process.env.CUSTOM_ENV || "unknown";

console.log("env", env);

switch (env) {
  case "production":
    VIEWPORT_API_URL = "";
    break;
  case "review":
    VIEWPORT_API_URL = "https://bosch-hc-viewport-backend.kittelberger.net/";
    break;
  case "remote":
    VIEWPORT_API_URL = "https://bosch-hc-viewport-backend.kittelberger.net/";
    break;
  case "development":
    VIEWPORT_API_URL = "https://bosch-hc-viewport-backend.kittelberger.net/";
    break;
  default:
    throw new Error(`ERROR matching server config - ${env}`);
}
