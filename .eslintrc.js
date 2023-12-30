module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react-hooks", "sonarjs", "prettier"],
  extends: ["plugin:@typescript-eslint/recommended"],
  rules: {
    "no-undef": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-ts-comment": 1,
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/prefer-as-const": "off",
  },
  env: {
    jest: true,
  },
};
