module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier"
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "warn"
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
