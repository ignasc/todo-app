import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";

const ruleNewLine = {"@stylistic/eol-last": ["warn", "always"]};
const ruleIndent = {"@stylistic/indent": ["warn", 4],};

const commonRules =  {...ruleNewLine, ...ruleIndent};

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js, "@stylistic": stylistic }, extends: ["js/recommended"], rules: { ...commonRules } },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/gfm", extends: ["markdown/recommended"] },
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
]);
