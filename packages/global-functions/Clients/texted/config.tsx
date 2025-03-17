export let securedTTTeMaBackendServer: string;
export let securedAdvastaBackendServer: string;
export let rootProductMasterPtypeId: string;
export let dbCode: string;

const env = process.env.CUSTOM_ENV || "unknown";

console.log("env", env);

switch (env) {
  case "production":
    securedAdvastaBackendServer = "https://backend-mpe.bosch-homecomfort.com/";
    securedTTTeMaBackendServer =
      "https://backend-mpe-texted.bosch-homecomfort.com/";
    rootProductMasterPtypeId = "200";
    dbCode = "BBTMDB6";
    break;
  case "review":
    securedAdvastaBackendServer =
      "https://advasta-r6-wmc-backend.kittelberger.net/";
    // securedTTTeMaBackendServer = 'http://localhost:3005/';
    securedTTTeMaBackendServer =
      "https://bosch-hc-text-editor-backend.kittelberger.net/";
    rootProductMasterPtypeId = "200";
    dbCode = "BBTTST";
    break;
  default:
    throw new Error(`ERROR matching server config - ${env}`);
}

export const securedTTTeMaBackendUploadUrl =
  securedTTTeMaBackendServer + "factsheet/upload";
