import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  { extends: ["airbnb-base"] },
  {
    rules: {
      "no-console": "off",
      "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    },
  },
];
