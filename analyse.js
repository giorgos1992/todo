const sonarqubeScanner = require("sonarqube-scanner");

const exclusions = () =>
  [
    "**/android/**",
    "**/ios/**",
    "**/node_modules/**",
    "**/__test__/**",
    "**/__tests__/**",
    "**/__mocks__/**",
    "**/*.spec.*",
    "**/*.test.*",
    "**/__mocks__/**",
    "**/src/api/**",
    "**/assets/**",
  ].join(",");

const tests = () =>
  ["**/__test__/**", "**/__tests__/**", "**/*.spec.*", "**/*.test.*"].join(",");

const coverageExlusions = () =>
  [
    "analyze.js",
    "aws-exports.js",
    "babel.config.js",
    "index.js",
    "jest.config.js",
    "jest.setup.js",
    "metro.config.js",
    "react-native.config.js",
    "svgTransform.js",
    "transformer.js",
    "src/index.tsx",
  ].join(",");

const baseConfig = {
  serverUrl: "http://localhost:9000",
  token: process.env.SONAR_TOKEN_LOCAL,
  options: {
    "sonar.projectName": "Todo",
    "sonar.projectKey": "todo",
    "sonar.sources": "./src",
    "sonar.tests": "./src",
    "sonar.coverage.exclusions": coverageExlusions(),
    "sonar.exclusions": exclusions(),
    "sonar.javascript.lcov.reportPaths": "./coverage/lcov.info",
    "sonar.test.inclusions": tests(),
    "sonar.testExecutionReportPaths": "./test-report.xml",
    "sonar.cpd.exclusions": tests(),
  },
};

const sonarConf = baseConfig;

sonarqubeScanner(sonarConf, () => {
  process.exit();
});
