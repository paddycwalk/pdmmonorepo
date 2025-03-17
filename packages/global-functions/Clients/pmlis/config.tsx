export let NEWSLETTER_API_URL: string;

const env = process.env.CUSTOM_ENV ?? "unknown";

console.log("env", env);

switch (env) {
  case "production":
    NEWSLETTER_API_URL = "https://backend-mpe-pmlis.bosch-homecomfort.com/";
    break;
  case "review":
    NEWSLETTER_API_URL = "https://pm-lis-backend.kittelberger.net/";
    break;
  case "remote":
    NEWSLETTER_API_URL = "https://pm-lis-backend.kittelberger.net/";
    break;
  case "development":
    NEWSLETTER_API_URL = "https://pm-lis-backend.kittelberger.net/";
    // NEWSLETTER_API_URL ="http://localhost:8080/newsletter-registration-backend-dev/";
    break;
  default:
    throw new Error(`ERROR matching server config - ${env}`);
}
