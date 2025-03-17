// WICHTIG: Bitte keine Änderungen vornehmen
// AUSSER in scanner.options
const scanner = require("sonarqube-scanner");

if (!process.env.CI) {
  console.log("skipping SonarQube scan due to local script run");
  return;
}

scanner(
  {
    serverUrl: process.env.SONAR_HOST_URL,
    token: process.env.SONAR_AUTH_TOKEN,
    options: {
      "sonar.projectName": "Bosch TT PDM Portal Frontend",
      "sonar.projectKey": "si.project.bosch.tt.pdm-portal.frontend",
      "sonar.links.scm":
        "https://stash.kittelberger.de/scm/javaboschttpm/bosch-tt-pdm-portal-frontend.git",
      "sonar.sourceEncoding": "UTF-8",
    },
  },
  () => process.exit(),
);
