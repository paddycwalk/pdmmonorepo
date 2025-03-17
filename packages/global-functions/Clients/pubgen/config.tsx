export let PUBGEN_API_URL: string;
export let dbCode: string;

const env = process.env.CUSTOM_ENV ?? "unknown";

console.log("env:", env);

switch (env) {
  case "production":
    PUBGEN_API_URL = "https://backend-mpe-pubgen.bosch-homecomfort.com/";
    break;
  case "review":
    PUBGEN_API_URL = "https://pm-lis-backend.kittelberger.net/";
    break;
  case "remote":
    PUBGEN_API_URL = "https://pm-lis-backend.kittelberger.net/";
    break;
  case "development":
    PUBGEN_API_URL =
      "https://bosch-hc-publication-generator-backend.kittelberger.net/";
    break;
  default:
    throw new Error(`ERROR matching server config - ${env}`);
}
