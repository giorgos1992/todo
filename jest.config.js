module.exports = {
  preset: "react-native",
  collectCoverage: true,
  coverageDirectory: "./coverage",
  coverageReporters: ["json-summary", "json", "html", "lcov"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testResultsProcessor: "jest-sonar-reporter",
  setupFiles: [
    "./jest.setup.tsx",
    "./node_modules/react-native-gesture-handler/jestSetup.js",
  ],
  // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
  moduleNameMapper: {
    uuid: require.resolve("uuid"),
  },
  moduleDirectories: [
    "node_modules",
    // add the directory with the test-utils.js file, for example:
    "utils", // a utility folder
    __dirname, // the root directory
  ],
  transform: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "./svgTransform.js",
  },
  transformIgnorePatterns: [
    "./node_modules/(?!(jest-)?@?react-native|react-redux|@react-navigation/*)",
  ],
};
