module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["module:@react-native/babel-preset"],
    plugins: [
      "@babel/plugin-transform-runtime",
      "react-native-reanimated/plugin",
      "react-native-paper/babel",
      [
        require.resolve("babel-plugin-module-resolver"),
        {
          root: ["."],
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".android.js",
            ".android.tsx",
            ".ios.js",
            ".ios.tsx",
          ],
          alias: {
            "@utils": "./src/utils",
            "@assets": "./src/assets",
            "@constants": "./src/constants",
          },
        },
      ],
    ],
  };
};
