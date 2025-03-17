// ToDo

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
      "sonar.projectName": "Bosch HC Newsletter Registrierung Frontend",
      "sonar.projectKey":
        "si.project.bosch.hc.newsletter.registrierung.frontend",
      "sonar.links.scm":
        "https://stash.kittelberger.de/scm/javaboschttpm/bosch-hc-pdm.git",
      "sonar.sourceEncoding": "UTF-8",
    },
  },
  () => process.exit(),
);
